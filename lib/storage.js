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
     * @param {Function=} callback
     */

    StorageAdapter.prototype.get = function(index, callback){

        var data;

        if(this.cache && CONFIG.ENABLE_STORAGE_CACHE){

            if(DEBUG) CORE.console.log("Storage.get (Cache)");

            data = this.cache;
        }
        else {

            if(DEBUG) CORE.console.log("Storage.get (Read)");

            if(data = window.localStorage.getItem(this.store)){

                data = /** @type {Object<string, *>} */ (JSON.parse(

                    APP.CONFIG.GZIP ?

                        APP.STORAGE.decompress(data, callback)
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
     * @param {Function=} callback
     */

    StorageAdapter.prototype.set = function(index, value, callback){

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

            if(DEBUG) CORE.console.log("Storage.set");

            this.index = null;

            if(CONFIG.ENABLE_STORAGE_CACHE){

                // Update Cache
                this.cache = data;
            }

            CORE.queue(function(){

                // Save To Persistent Storage
                saveToStorage(store, data, callback);

            }, 'store:' + store)
        }
        else{

            if(DEBUG) CORE.console.log("Storage not updated");
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

                    if(DEBUG) CORE.console.log("Current Storage Usage: " +

                        (((APP.VARS.USED_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' / ' +
                        (((APP.VARS.MAX_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' Mb (' +
                        (((100 / APP.VARS.MAX_STORAGE * APP.VARS.USED_STORAGE * 100) | 0) / 100) + '%)'
                    );

                    if(APP.VARS.USED_STORAGE >= APP.VARS.MAX_STORAGE){

                        if(DEBUG) CORE.console.warn('WARNING: Max storage limit was reached!');
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
                        if(DEBUG) CORE.console.log("Determine LocalStorage Capacity: " + (((APP.VARS.MAX_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' Mb');
                    }

                    if(APP.VARS.USED_STORAGE >= APP.VARS.MAX_STORAGE){

                        if(DEBUG) CORE.console.warn('WARNING: Max storage limit was reached!');
                        //localStorage.clear();
                    }

                })(localStorage, testKey, string, minimalFound, i, error);
            }
        };
    }

    // HELPER

	function saveToStorage(store, data, callback){

	    var json = JSON.stringify(data);

	    if(APP.CONFIG.GZIP){

            APP.STORAGE.compress(json, function(data){

                window.localStorage.setItem(store, data);

                if(callback) callback(data);
            });
        }
        else{

            window.localStorage.setItem(store, json);
        }
	}

    return StorageAdapter;

})();
