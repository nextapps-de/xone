goog.provide('CORE.STORAGE');
goog.require('CORE');
goog.require('INTERFACE');

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
        this.store = (CONFIG.STORAGE_PREFIX || '') + store_id;

        /** @type {Object<string, *>|null} */
        this.cache = null;

        /** @type {Array<string>|null} */
        this.index = null;
    }

    /**
     * @param {!string=} index
     */

    StorageAdapter.prototype.get = function(index){

		if(DEBUG) CORE.console.log("Storage.get");

        var data;

        if(this.cache && CONFIG.ENABLE_STORAGE_CACHE){

            data = this.cache;
        }
        else {

            if(data = window.localStorage.getItem(this.store)){

                data = /** @type {Object<string, *>} */ (JSON.parse(

                    APP.CONFIG.GZIP ?

                        APP.STORAGE.decompress(data)
                    :
                        data
                ));

                if(CONFIG.ENABLE_STORAGE_CACHE) this.cache = data;
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
     */

    StorageAdapter.prototype.set = function(index, value){

		if(DEBUG) CORE.console.log("Storage.set");

        var data;
        var store = this.store;
        var hasUpdate = false;

        if(typeof index === 'string') {

            data = this.get() || {};

            if(data[index] !== value) {

                data[index] = value;
                hasUpdate = true;
            }
        }
        else {

            data = index || {};
            hasUpdate = true;
        }

        if(hasUpdate){

            // Update Cache
            if(CONFIG.ENABLE_STORAGE_CACHE) this.cache = data;
            this.index = null;

            // Save To Persistent Storage
            if(CONFIG.ENABLE_STORAGE_CACHE){

                CORE.async(function(){

                    saveToStorage(store, data);
                });
            }
            else{

                saveToStorage(store, data);
            }
        }
    };

	/**
	 * @param {!string} index
	 */

	StorageAdapter.prototype.del = function(index){

		if(DEBUG) CORE.console.log("Storage.del");

		if(index) {

			// fetch
			var data = this.get() || {};

            if(typeof data[index] !== 'undefined'){

                // delete
                data[index] = null;
                delete data[index];

                // write
                this.set(data);
            }
		}
	};

    /**
     * @param {!string|Object<string, *>} index
     * @param {!*} value
     */

    StorageAdapter.prototype.update = function(index, value){

		if(DEBUG) CORE.console.log("Storage.update");

        var data = this.get() || {};
        var hasUpdate = false;

        if(typeof index === 'string') {

            if(data[index] !== value) {

                data[index] = value;
                hasUpdate = true;
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

            this.set(data);
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

        return this.index || (

            this.index = CORE.getKeys(this.get() || {})
        );
    };

    // HELPER

	function saveToStorage(store, data){

		window.localStorage.setItem(store,

			APP.CONFIG.GZIP ?

				APP.STORAGE.compress(JSON.stringify(data))
			:
				JSON.stringify(data)
		);
	}

    return StorageAdapter;

})();
