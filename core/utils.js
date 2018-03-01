/**!
 * Utils
 * ----------------------------------------------------------
 * https://github.com/nextapps-de/utils
 * @version: 0.1.2
 * @author: Thomas Wilkerling
 * @license: Apache 2.0 Licence
 */

(function(){

    provide('Utils', (function(){

        "use strict";

        return{

            clone: clone,
            queue: queue()
        };

        //(CORE && CORE.clone) ||

        /**
         * @param {*} val
         * @param {number=} max_level
         * @param {number=} _current_level
         * @returns {*}
         * @const
         */

        function clone(val, max_level, _current_level){

            if(val && (typeof val === 'object')){

                if(val.cloneNode){

                    return val.cloneNode(true);
                }

                var constructor = val.constructor;

                if(constructor === Array){

                    var length = val.length;

                    if(length){

                        var type = typeof val[0];

                        if((type === 'number') ||
                            (type === 'string') ||
                            (type === 'boolean')){

                            return val.slice();
                        }

                        _current_level || (_current_level = 0);

                        if((max_level || (max_level === 0)) && (_current_level >= max_level)){

                            return null;
                        }

                        var copy = new Array(length);
                        var i = 0;

                        while(i < length){

                            copy[i] = clone(val[i++], max_level, _current_level + 1);
                        }

                        return copy;
                    }

                    return [];
                }
                else if(constructor === Object){

                    if(val instanceof Date){

                        return new Date(val);
                    }

                    var keys = Object.keys(/** @type {!Object} */ (val));
                    var length = keys.length;
                    var copy = {};

                    if(length){

                        _current_level || (_current_level = 0);

                        var i = 0;
                        var key, type, item;

                        while(i < length){

                            key = keys[i++];
                            item = val[key];
                            type = typeof item;

                            if((type === 'number') ||
                                (type === 'string') ||
                                (type === 'boolean')){

                                copy[key] = item;
                            }
                            else{

                                if((max_level || (max_level === 0)) && (_current_level >= max_level)){

                                    continue;
                                }

                                copy[key] = clone(item, max_level, _current_level + 1);
                            }
                        }
                    }

                    return copy;
                }
            }

            return val;
        }

        function queue(){

            var stack = {};

            return function(fn, delay, id){

                var timer = stack[id];

                if(timer){

                    clearTimeout(timer);
                }

                return (

                    stack[id] = setTimeout(fn, delay)
                );
            };
        }
    })());

    /** --------------------------------------------------------------------------------------
     * UMD Wrapper for Browser and Node.js
     * @param {!string} name
     * @param {!Function|Object} factory
     * @param {!Function|Object=} root
     * @const
     */

    function provide(name, factory, root){

        var prop;

        root || (root = this);

        // AMD (RequireJS)
        if((prop = root['define']) && prop['amd']){

            prop([], function(){

                return factory;
            });
        }
        // Closure (Xone)
        else if((prop = root['modules'])){

            prop[name.toLowerCase()] = factory;
        }
        // CommonJS (Node.js)
        else if(typeof module !== 'undefined'){

            module.exports = factory;
        }
        // Global (window)
        else{

            root[name] = factory;
        }
    }
})();
