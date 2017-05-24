goog.provide('CORE.STORAGE');
goog.require('CORE');
goog.require('INTERFACE');
goog.require('CORE.COMPRESS');

/**
 * Persistent Storage Controller
 * @const
 * @struct
 */

CORE.Storage = (function(){

    /**
     * @constructor
     * @implements {_storage_interface}
     * @this {StorageAdapter}
     * @param {!string} store_id
     * @const
     */

    function StorageAdapter(store_id){

        /** @type {!string} */
        this.store = store_id;

        /** @type {Object<string, *>|null} */
        (this.cache = null);

        /** @type {Array<string>|null} */
        this.index = null;
    }

    /**
     * @param {!string=} index
     */

    StorageAdapter.prototype.get = function(index){

        var data;

        if(this.cache){

            data = this.cache;
        }
        else if(data = window.localStorage.getItem(this.store)){

            data = /** @type {Object<string, *>} */ (JSON.parse(

                APP.CONFIG.GZIP ?

                    APP.STORAGE.decompress(data)
                :
                    data
            ));

            this.cache = data;
        }

        if(data && index) {

            data = data[index];

            return /** @type {*} */(data);
        }

        return /** @type {string|Object<string, *>} */(data);
    };

    /**
     * @param {!string|Object<string, *>} index
     * @param {*=} value
     */

    StorageAdapter.prototype.set = function(index, value){

        var data;
        var store = this.store;

        if(typeof index === 'string') {

            data = this.get() || {};
            data[index] = value;
        }
        else {

            data = index || {};
        }

        // Update Cache
        this.cache = data;
        this.index = null;

        // Save To Persistent Storage (Async)
        CORE.stack(function(){

            window.localStorage.setItem(store,

                APP.CONFIG.GZIP ?

                    APP.STORAGE.compress(JSON.stringify(data))
                :
                    JSON.stringify(data)
            );
        });
    };

    /**
     * @param {!string|Object<string, *>} index
     * @param {!*} value
     */

    StorageAdapter.prototype.update = function(index, value){

        var data = this.get() || {};

        if(typeof index === 'string') {

            data[index] = value;
        }
        else {

            for(var key in index){

                if(index.hasOwnProperty(key)){

                    data[key] = index[key];
                }
            }
        }

        this.set(data);
    };

    /**
     * @param {!string} index
     */

    StorageAdapter.prototype.del = function(index){

        if(index) {

            // fetch
            var data = this.get() || {};

            // delete
            data[index] = null;
            delete data[index];

            // write
            this.set(data);
        }
    };

    StorageAdapter.prototype.clear = function(){

        this.cache = null;
        this.index = null;

        window.localStorage.removeItem(this.store);
    };

    StorageAdapter.prototype.keys = function(){

        return this.index || (

            this.index = CORE.getKeys(this.get() || {})
        );
    };

    return StorageAdapter;

})();
