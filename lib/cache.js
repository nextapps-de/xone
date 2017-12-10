goog.provide('Util.Cache');
goog.require('Util');
goog.require('INTERFACE');
goog.require('CONFIG');
goog.require("Util.Console");

/**
 * In-Memory Storage Controller
 * @public
 * @constructor
 * @implements {_cache_struct}
 * @param {boolean|number=} duration
 * @param {boolean|number=} length
 * @param {boolean=} auto
 */

Util.Cache = (function(){

    "use strict";

    /**
     * @type {Array<?FlexiCache>}
     */

    var caches = [];

    /**
     * @type {number}
     */

    var cache_id = 0;

    /**
     * CacheItem
     * @name CacheItem
     * @namespace FlexiCache
     * @constructor
     * @implements {CacheItemInterface}
     * @param {!*} data
     * @param {!boolean|number} duration
     */

    function CacheItem(data, duration){

        /** @type {*} */
        this.data = data;

        /** @type {!number} */
        this.time = CORE.time.now();

        /** @type {!boolean|number} */
        this.expire = duration && (this.time + duration);

        /** @type {number} */
        this.count = 0;
    }

    /**
     * @return {CacheItem}
     */

    CacheItem.prototype.clone = function(){

        this.count++;

        return CORE.clone(this.data);
    };

    /**
     * Application FlexiCache
     * @name FlexiCache
     * @namespace FlexiCache
     * @constructor
     * @implements {_cache_struct}
     * @param {boolean|number=} max_duration
     * @param {boolean|number=} max_length
     * @param {boolean=} enable_auto_cleanup
     */

    function FlexiCache(max_duration, max_length, enable_auto_cleanup){

        /** @type {!number} */
        this.id = cache_id++;

        /** @type {?Array<string>} */
        this.keys = [];

        /** @dict @private */
        this.data = {};

        /** @type {boolean|number} */
        this.duration = max_duration === false ? false : (max_duration || CONFIG.MAX_CACHE_TIME || (3 * 60 * 1000));

        /** @type {boolean|number} */
        this.size = max_length === false ? false : (max_length || 1000);

        /** @type {boolean} */
        this.auto = !!enable_auto_cleanup;

        /** @type {boolean} */
        this.init = false;

        Object.defineProperty(this, 'length', {

            /**
             * @this {FlexiCache}
             */

            get: function(){

                return this.keys.length;
            }
        });

        if(DEBUG){

            Console.log("Initialize Cache@" + this.id);

            caches[caches.length] = this;
        }
    }

    /**
     * @param {boolean|number=} max_duration
     * @param {boolean|number=} max_length
     * @param {boolean=} enable_auto_cleanup
     * @returns {_cache_struct}
     */

    FlexiCache.register =
    FlexiCache.create =
    FlexiCache.new = function(max_duration, max_length, enable_auto_cleanup){

        return new this(max_duration, max_length, enable_auto_cleanup);
    };

    /**
     * @param {string|number} key
     * @param {*} val
     * @param {boolean|number=} duration
     */

    FlexiCache.prototype.add =
    FlexiCache.prototype.set = function(key, val, duration){

        if(key = String(key)){

            var cache = this.data[key];

            if(!cache){

                if(DEBUG){

                    Console.log("Set Cache@" + this.id + " to: " + key);

                    APP.STATS.count_cache_update++;
                }

                var pos = this.keys.length;

                if(this.size && (pos >= this.size)){

                    this.del(this.keys[0]);
                    pos--;
                }

                this.data[key] = (

                    new CacheItem(val,

                        duration === false ?

                            false
                        :
                            (duration || this.duration)
                    )
                );

                this.keys[pos] = key;
            }
            else{

                if(DEBUG){

                    Console.log("Update Cache@" + this.id + " to: " + key);

                    APP.STATS.count_cache_set++;
                }

                cache.data = val;
                cache.time = CORE.time.now();
                cache.expire = duration === false ? false : (cache.time + (duration || this.duration));
                //cache.count = 0;
            }

            if(!this.init){

                registerScheduler.call(this);

                this.init = true;
            }

            return val;
        }
    };

    /**
     * @param {string|number} key
     * @param {*} val
     */

    FlexiCache.prototype.copy = function(key, val){

        APP.STATS.count_cache_clone++;

        return this.set(key, CORE.clone(val));
    };

    /**
     * @param {string} key
     * @param {boolean=} force
     * @return {*}
     */

    FlexiCache.prototype.get = function(key, force){

        if(key = String(key)){

            var cache = this.data[key];

            if(cache){

                if(DEBUG){

                    Console.log("Get Cache@" + this.id + " from: " + key);

                    APP.STATS.count_cache_get++;
                }

                if(force || !cache.expire || (CORE.time.now() < cache.expire)){

                    cache.count++;

                    return cache.data;
                }

                this.del(key);
            }
        }
    };

    /**
     * @param {string} key
     * @param {boolean=} force
     * @return {*}
     */

    FlexiCache.prototype.clone = function(key, force){

        APP.STATS.count_cache_clone++;

        return CORE.clone(this.get(key, force));
    };

    /**
     * @return {Object<string, *>}
     */

    FlexiCache.prototype.getAll =
    FlexiCache.prototype.all = function(){

        if(DEBUG){

            Console.log("Get All from Cache@" + this.id);
        }

        return this.data;
    };

    /**
     * @param {string} key
     * @return {*}
     */

    FlexiCache.prototype.remove =
    FlexiCache.prototype.rm = function(key){

        var val = this.data[key].data;

        this.del(key);

        return val;
    };

    /**
     * @param {string} key
     * @return {*}
     */

    FlexiCache.prototype.delete =
    FlexiCache.prototype.del = function(key){

        if(key = String(key)){

            if(this.data[key]){

                for(var i = 0; i < this.keys.length; i++){

                    if(this.keys[i] === key){

                        if(DEBUG){

                            Console.log("Delete from Cache@" + this.id + ": " + key);

                            APP.STATS.count_cache_del++;
                        }

                        this.keys.splice(i, 1);
                        break;
                    }
                }

                this.data[key].data = null;
                this.data[key] = null;
                delete this.data[key];
            }
        }
    };

    /**
     * @type {function()}
     */

    FlexiCache.prototype.reset =
    FlexiCache.prototype.clear = function(){

        if(DEBUG){

            Console.log("Clear Cache@" + this.id);
        }

        this.data = {};
        this.keys = [];
    };

    /**
     * @return {?number}
     */

    FlexiCache.prototype.count =
    FlexiCache.prototype.length = function(){

        return this.keys.length;
    };

    /**
     *
     */

    FlexiCache.prototype.clean =
    FlexiCache.prototype.cleanup = function(force){

        if(this.keys.length){

            if(DEBUG){

                Console.log("Cleanup Cache@" + this.id);

                APP.STATS.count_cache_clean++;
            }

            var current = CORE.time.now();

            for(var i = 0; i < this.keys.length; i++){

                var key = this.keys[i];
                var cache = this.data[key];

                if(cache.expire && (current > cache.expire)){

                    this.del(key);
                    i--;
                }
                else if(this.auto && (cache.count === 0) && (force || ((current - cache.time) > (ENV === 'test' ? 15 : 60 * 1000)))){

                    this.del(key);
                    i--;
                }
                else{

                    cache.count = 0;
                }
            }
        }

        if(this.keys.length){

            registerScheduler.call(this);
        }
        else{

            this.init = false;
        }
    };

    if(DEBUG){

        /**
         * @type {Array<?FlexiCache>}
         */

        FlexiCache.caches = caches;
    }

    return FlexiCache;

    // Private Helpers:
    // ------------------------------------------------------------------------------

    function registerScheduler(){

        if(this.duration || this.auto){

            var self = this;

            (CORE.queue || window.setTimeout)(function(){

                self.cleanup();
                self = void 0;

            }, this.auto ? (ENV === 'test' ? 15 : 60 * 1000) : this.duration, 'cache-cleanup-' + this.id);
        }
    }
})();
