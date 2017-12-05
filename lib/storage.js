goog.provide('CORE.STORAGE');
goog.require('CORE');
goog.require('INTERFACE');

// TODO: models has its own cache, change to passing a configuration object
// TODO: types of storage: 'local', 'filesystem', 'memory', 'cache' (perishable ApplicationCache)
// TODO: generate random storage index if not defined (also required for clean tests, and required for xone sandbox app)

/**
 * Persistent Storage Controller
 * @const
 * @struct
 */

CORE.Storage = (function(){

    "use strict";

    /**
     * @constructor
     * @implements {_storage_interface}
     * @this {StorageAdapter}
     * @param {!string} store_id
     * @const
     */

    function StorageAdapter(store_id){

        /** @type {!string} */
        this.store = (CONFIG.STORAGE_PREFIX || '') + store_id;

        /** @type {Object<string, *>|null} */
        this.cache = null;

        // TODO:
        // /** @type {_cache_struct} */
        // this.cache = new Util.Cache(60 * 1000);

        /** @type {Array<string>|null} */
        this.index = null;
    }

    /**
     * @param {!string} store_id
     * @returns {_storage_interface}
     */

    StorageAdapter.register =
    StorageAdapter.create =
    StorageAdapter.new = function(store_id){

        return new this(store_id);
    };

    /**
     * @param {!string=} index
     * @param {Function=} callback
     */

    StorageAdapter.prototype.get = function(index, callback){

        if(typeof index === 'number') {

            index = String(index);
        }

        var data;

        if(this.cache){

            if(DEBUG) Console.log("Storage.get: " + this.store + " (Cache)");

            data = this.cache;
        }
        else {

            if(DEBUG) Console.log("Storage.get: " + this.store + " (Read)");

            if(data = window.localStorage.getItem(this.store)){

                if(APP.CONFIG.GZIP){

                    if(callback){

                        var self = this;

                        APP.STORAGE.decompress(data, function(data){

                            data = /** @type {Object<string, *>} */ (JSON.parse(data));

                            self.cache = data;

                            if(!CONFIG.ENABLE_STORAGE_CACHE){

                                releaseTemporaryCache(self);
                            }

                            callback(data);

                            self =
                            callback = void 0;
                        });

                        return;
                    }
                    else{

                        data = APP.STORAGE.decompress(data);
                        data = /** @type {Object<string, *>} */ (JSON.parse(data));

                        this.cache = data;

                        if(!CONFIG.ENABLE_STORAGE_CACHE){

                            releaseTemporaryCache(this);
                        }
                    }
                }
                else{

                    data = /** @type {Object<string, *>} */ (JSON.parse(data));

                    this.cache = data;

                    if(!CONFIG.ENABLE_STORAGE_CACHE){

                        releaseTemporaryCache(this);
                    }

                    if(callback) {

                        callback(data);
                    }
                }
            }
        }

        if(data && index) {

            return /** @type {*} */ (data[index]);
        }

        return /** @type {string|Object<string, *>} */ (data);
    };

    /**
     * @param {!string|Object<string, *>} index
     * @param {*=} value
     * @param {Function=} callback
     */

    StorageAdapter.prototype.set = function(index, value, callback){

        if(typeof index === 'number') {

            index = String(index);
        }

        if((typeof index !== 'string') && (typeof value === 'function')){

            callback = value;
            value = null;
        }

        var data = this.cache || this.get() || {};
        //var store = this.store;
        var hasUpdate = false;

        if(typeof index === 'string'){

            if(data[index] !== value){

                data[index] = value;
                hasUpdate = true;
            }
        }
        else{

            //if(data !== index){

                data = index;
                hasUpdate = true;
            //}
        }

        if(hasUpdate){

            var self = this;

            this.index = null;

            // Update Cache
            this.cache = data;

            if(!CONFIG.ENABLE_STORAGE_CACHE){

                releaseTemporaryCache(this);
            }

            CORE.queue(function(){

                if(DEBUG) Console.log("Storage.set: " + self.store);

                // Save To Persistent Storage
                saveToStorage(self.store, self.cache, callback);

                self =
                //data =
                //store =
                callback = void 0;

            }, 200, 'store-set:' + this.store)
        }
        else{

            if(DEBUG) Console.log("Storage not updated: " + this.store);
        }

        return value;
    };

	/**
	 * @param {!string} index
	 */

    StorageAdapter.prototype.remove = function(index){

		if(DEBUG) Console.log("Storage.remove: " + this.store);

        if(typeof index === 'number') {

            index = String(index);
        }

		if(index) {

			// fetch
			var data = this.get();

			if(data){

                if(typeof data[index] !== 'undefined'){

                    var value = data[index];

                    // delete
                    data[index] = null;
                    delete data[index];

                    // write
                    this.set(data);

                    return value;
                }
            }
		}
	};

    /**
     * @param {!string} index
     */

    StorageAdapter.prototype.del = function(index){

        if(DEBUG) Console.log("Storage.del: " + this.store);

        this.remove(index);
    };

    /**
     * @param {!string|Object<string, *>} index
     * @param {!*} value
     */

    StorageAdapter.prototype.update = function(index, value){

        var data = this.get() || {};
        var hasUpdate = false;

        if(typeof index === 'number') {

            index = String(index);
        }

        if(typeof index === 'string') {

            if(typeof value === 'object'){

                for(var key in value){

                    if(value.hasOwnProperty(key)){

                        if(value[key] !== data[index][key]) {

                            data[index][key] = value[key];
                            hasUpdate = true;
                        }
                    }
                }
            }
            else{

                if(data[index] !== value) {

                    data[index] = value;
                    hasUpdate = true;
                }
            }
        }
        else {

            for(var key in index){

                if(index.hasOwnProperty(key)){

                    if(data[key] !== index[key]) {

                        data[key] = index[key];
                        hasUpdate = true;
                    }
                }
            }
        }

        if(hasUpdate) {

            if(DEBUG) Console.log("Storage.update: " + this.store);

            this.set(data);
        }
        else{

            if(DEBUG) Console.log("Storage.update: " + this.store + " (Cache)");
        }
    };

    StorageAdapter.prototype.clear = function(){

        this.cache = null;
        this.index = null;

        window.localStorage.removeItem(this.store);
    };

	/**
	 * @returns {Array<string>}
	 */

	StorageAdapter.prototype.keys = function(){

        return (

            this.index && this.index.length ?

                this.index
            :
                (this.index = CORE.getKeys(this.get()))
        );
    };

	if(DEBUG){

        /**
         * @type {function(number=)|null}
         */

        StorageAdapter.prototype.info = function(error){

            var localStorage = window.localStorage;

            if(localStorage){

                var minimalFound = APP.SETTINGS.get('localStorageMaxSize');

                if(minimalFound){

                    APP.VARS.MAX_STORAGE = parseInt(minimalFound, 10);

                    var t = 0, len;

                    for(var x in localStorage){

                        if(localStorage.hasOwnProperty(x)){

                            len = localStorage[x].length;

                            if(len) t += (x.length + len) * 2;
                        }
                    }

                    APP.VARS.USED_STORAGE = t;

                    if(DEBUG) Console.log("Current Storage Usage: " +

                        (((APP.VARS.USED_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' / ' +
                        (((APP.VARS.MAX_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' Mb (' +
                        (((100 / APP.VARS.MAX_STORAGE * APP.VARS.USED_STORAGE * 100) | 0) / 100) + '%)'
                    );

                    if(APP.VARS.USED_STORAGE >= APP.VARS.MAX_STORAGE){

                        if(DEBUG) Console.warn('WARNING: Max storage limit was reached!');
                        //localStorage.clear();
                    }

                    return;
                }
                else{

                    minimalFound = 0;
                    //progress_mult++;
                }

                //APP.CONFIG.PROC ? APP.CONFIG.PROC++ : APP.CONFIG.PROC = 1;

                var max = 10 * 1024 * 1024,
                    i = 64,
                    string1024 = '',
                    string = '',
                    // generate a random key
                    testKey = 'size-test-' + Math.random().toString();

                error || (error = 25e4);

                // fill a string with 1024 symbols / bytes
                while(i--) string1024 += 1e16;

                i = max / 1024;

                // fill a string with 'max' amount of symbols / bytes
                while(i--) string += string1024;

                i = max;

                // binary search implementation

                (function procLocalStorageMaxSize(localStorage, testKey, string, minimalFound, i, error){

                    if(i > 1 && (minimalFound < i - error)){

                        try{

                            localStorage.setItem(testKey, string.substr(0, i));
                            localStorage.removeItem(testKey);

                            if(minimalFound < i - error){

                                minimalFound = i;
                                i = i * 1.5;
                            }
                            //else break;

                        } catch(e){

                            localStorage.removeItem(testKey);
                            i = minimalFound + (i - minimalFound) / 2;
                        }

                        CORE.queue(function(){

                            procLocalStorageMaxSize(localStorage, testKey, string, minimalFound, i, error);
                        });
                    }

                    else{

                        //APP.CONFIG.PROC--;
                        APP.VARS.MAX_STORAGE = minimalFound;
                        APP.SETTINGS.set('localStorageMaxSize', '' + minimalFound);
                        if(DEBUG) Console.log("Determine LocalStorage Capacity: " + (((APP.VARS.MAX_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' Mb');
                    }

                    if(APP.VARS.USED_STORAGE >= APP.VARS.MAX_STORAGE){

                        if(DEBUG) Console.warn('WARNING: Max storage limit was reached!');
                        //localStorage.clear();
                    }

                })(localStorage, testKey, string, minimalFound, i, error);
            }
        };
    }

    // HELPER

	function saveToStorage(store, data, callback){

	    if(DEBUG){

	        try{

                var json = JSON.stringify(data);
            }
            catch(e){

                Console.err(e, data);

                if(callback) {

                    callback(data);
                }

                return;
            }
        }
        else{

            var json = JSON.stringify(data);
        }

	    if(APP.CONFIG.GZIP){

	        if(callback){

                APP.STORAGE.compress(json, function(data){

                    window.localStorage.setItem(store, data);

                    callback(data);

                    callback =
                    store = void 0;
                });
            }
            else{

                data = APP.STORAGE.compress(json);

                window.localStorage.setItem(store, data);
            }
        }
        else{

            window.localStorage.setItem(store, json);

            if(callback) {

                callback(json);
            }
        }
	}

    function releaseTemporaryCache(self){

        CORE.queue(function(){

            if(DEBUG) Console.log('Release Temporary Cache.');

            self.cache = null;
            self = void 0;

        }, 1000, 'store-cache:' +  self.store)
    }

    return StorageAdapter;

})();
