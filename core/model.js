goog.provide('APP.MODEL');
goog.require('APP.MAPPER');
goog.require('APP');

/**
 * @type {_active_model}
 * @const
 */

APP.MODEL = (function(MAPPER, STORAGE){

    /**
     * ACTIVE MODEL
     * @implements _active_model
     * @constructor
     */

    function ACTIVE_MODEL(){}

    /**
     * @param {string} key
     * @param {Function} model
     * @returns {_model_helper}
     */

    ACTIVE_MODEL.prototype.register = function(key, model){

        /* NOTE: old workaround to catch bug of rhaboo is commented out */

        //var init = true;
        //while(init){
            //try {

                /* Register model to the storage controller */

                STORAGE.DATA[key] || (STORAGE.DATA[key] = /** @type _storage_struct */ (new CORE.Storage(key))); //window['Rhaboo']['persistent'](key));

                /* Register model to the session controller */

                //STORAGE.SESSION[key] || (STORAGE.SESSION[key] = window['Rhaboo']['perishable'](key));

                //init = false;
            //}
            //catch(e){
                //if(DEBUG) CORE.console.log('WARNING: Rhaboo has a problem with the store: ' + key);
                //init = false;
                //window.localStorage.removeItem(key);
            //}
        //}

        /* Register model to the cache controller */

        STORAGE.CACHE[key] || (STORAGE.CACHE[key] = {});

        /* Create Helper Instance + Register the model */

        this[key] = new ModelHelper(key, model);

        /* Register custom mappings to the model */

        this[key].Model.prototype.mapToView = MAPPER[key] ? MAPPER[key].mapToView : false;

        // TODO: Improve Mapping Integration
        //var mapper = MAPPER[key];
        //MODEL[key].Model.prototype.mapToPayload = mapper ? mapper.mapToPayload : false;
        //MODEL[key].Model.prototype.mapToModel = mapper ? mapper.mapToModel : false;

        return this[key];
    };

    /**
     * @param {string} model
     * @param {Object<string, *>} data
     * @param {boolean=} persistent
     * @returns {_model_class}
     */

    ACTIVE_MODEL.prototype.new = function(model, data, persistent){

        return this[model].new(data, persistent);
    };

    /**
     * @param {string} model
     * @param {Object<string, *>} data
     * @returns {_model_class}
     */

    ACTIVE_MODEL.prototype.create = function(model, data){

        return this[model].create(data);
    };

    /**
     * @param {string} key
     * @constructor
     * @implements _model_helper
     */

    function ModelHelper(key, model) {

        /**
         * @type {function(new:_model_class, Object<string, *>)} data
         */

        this.Model = model;

        /* Inherits prototype chain from super class */

        this.Model.prototype = new ModelClass(key, model);

        /* Set constructor to its corresponding model type */

        this.Model/*.prototype*/.constructor = model;

        /* Points to the persistent storage of this model */

        this.data = STORAGE.DATA[key];

        /* Points to the session storage of this model */

        //this.session = STORAGE.SESSION[key];

        /* Points to the cache storage of this model */

        this.cache = STORAGE.CACHE[key];

        /* Creates a key map for faster loops through all model instances */

        this.keys = (this.data.keys());
    }

    /**
     * Provides a factory method which is used to create new instances
     * @param {_model_class|Array<_model_class>|Object<string, *>|Array<Object<string, *>>} data
     * @param {boolean=} persistent
     * @param {boolean=} batch
     * @returns {_model_class|Array<_model_class>}
     */

    ModelHelper.prototype.new = function(data, persistent, batch){

        /* Set default data if missing */

        data || (data = {});

        /* Fallback: Handle passed array */

        if(data.constructor === Array){

            return this.newFromList(/** @type {Array<Object<string, *>>} */ (data), persistent);
        }

        /* Fallback: Handle passed Models */

        if(data.constructor.prototype instanceof ModelClass){

            return /** @type {_model_class} */ (data);
        }

        // if(init_persistent){
        //
        //     persistent = true;
        // }

        /* Get existing record */

        var record = data['id'] ? this.parse('' + data['id']) : null;

        if(record) {

            if(record.beforeUpdate) record.beforeUpdate(data);

            /* Update an existing instance */

            var tmp_record = new this.Model(data);

            if(!tmp_record) return null;

            tmp_record['id'] = null; // delete tmp_record['id'];

            // var copy = {};
            // for(var key in data){
            //     if(data.hasOwnProperty(key)){
            //         copy[key] = tmp_record[key];
            //     }
            // }

            record.update(tmp_record, persistent); // update calls its own save method

            if(record.onUpdate) record.onUpdate();
        }
        else{

            /* Create a new instance of the related model type */

            record = new this.Model(data);

            if(!record) return null;

            if(record.beforeCreate) record.beforeCreate();
            if(record.beforeUpdate) record.beforeUpdate();
            if(record.beforeSave) record.beforeSave();

            /* Saves a new created instance */

            record.save(persistent);

            if(record.onCreate) record.onCreate();
            if(record.onUpdate) record.onUpdate();
            if(record.onSave) record.onSave();

            /* Update model keys */

            this.keys = this.data.keys();
        }

        // if(init_persistent){
        //
        //     persistent = false;
        // }

        return record;
    };

    /**
     * @param {Object<string, *>} data
     * @returns {Array<_model_class>|_model_class}
     */

    ModelHelper.prototype.create = function(data){

        return this.new(data, /* persistent? */ true);
    };

    /**
     * @param {Array<Object<string, *>>} data
     * @param {boolean=} persistent
     * @returns {Array<_model_class|null>}
     */

    ModelHelper.prototype.newFromList = function(data, persistent){

        /* Return default data if missing */

        if(!data) return [];

        var length = data.length;
        var models = new Array(length);
        var pos = 0;

        /* Create Instances */

        for(var i = 0; i < length; i++){

            var item = this.new(data[i], persistent, /* batch? */ i < length - 1);

            if(item && Object.keys(item).length) models[pos++] = item;
        }

        /* Returns model instances */

        return (

            pos === length ?

                models
            :
                models.splice(0, pos)
        );
    };

    /**
     * @param {Array<Object<string, *>>} data
     * @returns {Array<_model_class|null>}
     */

    ModelHelper.prototype.createFromList = function(data){

        return this.newFromList(data, /* persistent? */ true);
    };

    /**
     * @param {Object<string, *>} data
     * @param {boolean=} force
     */

    function extract_model_data(data, force){

        if(data['_id']){

            data = APP.MODEL[data['_type']].parse('' + data['_id'], force);
        }

        for(var key in data) {

            if(data.hasOwnProperty(key)) {

                var data_key = data[key];

                if(data_key !== null){

                    if(data_key.constructor === Object){

                        data[key] = extract_model_data(data_key, force);
                    }
                    else if(data_key.constructor === Array){

                        for(var i = 0; i < data_key.length; i++){

                            if(data_key[i]['_id']){

                                data_key[i] = extract_model_data(data_key[i], force);
                            }
                        }
                    }
                    else {

                        data[key] = data_key;
                    }
                }
            }
        }

        return data;
    }

    /**
     * @param {string} index
     * @param {boolean=} force
     * @param {boolean=} recursive
     * @this {_model_class|_model_helper}
     * @return {_model_class}
     */

    ModelHelper.prototype.parse = function(index, force, recursive){

        var data;

        index = '' + index;

        if((force || !this.cache[index]) && (data = this.data.get(index))) {

            // data = /** @type {Object<string, *>} */ (JSON.parse(
            //
            //     APP.CONFIG.GZIP ?
            //
            //         STORAGE.decompress(data)
            //     :
            //         data
            // ));

            return (this.cache[index] = new this.Model(extract_model_data(data, force)));
        }

        return this.cache[index] || null;
    };

    /**
     * @param {string} id
     * @return {_model_class|null}
     */

    ModelHelper.prototype.find = function(id){

        return this.parse('' + id);
    };

    /**
     * @param {number=} from
     * @param {number=} to
     * @return {Array<_model_class>}
     */

    ModelHelper.prototype.range = function(from, to){

        this.keys.length || (this.keys = this.data.keys());

        var keys = this.keys;
        var len = keys.length;
        var start = to ? from || 0 : 0;
        var end = to || from || len;

        if(end > len) end = len;

        var array = new Array(end - start);

        len = 0;

        while(start < end) {

            array[len++] = this.parse('' + keys[start++]);
        }

        return array;
    };

    /**
     * @return {Array<_model_class>}
     */

    ModelHelper.prototype.all = function(){

        return this.range();
    };

    /**
     * @return {number}
     */

    ModelHelper.prototype.count = function(){

        return this.keys.length || (this.keys = this.data.keys()).length;
    };

    /**
     * @param {string} field
     * @param {*} value
     */

    ModelHelper.prototype.findBy = function(field, value){

        this.keys.length || (this.keys = this.data.keys());

        var keys = this.keys;

        for(var i = 0; i < keys.length; i++) {

            var data = this.parse('' + keys[i]);

            if(data[field] === value) {

                return data;
            }
        }
    };

    /**
     * @param {Function|Array<string, *>} where
     * @param {Function=} fn_compare
     */

    ModelHelper.prototype.each = function(where, fn_compare){

        this.keys.length || (this.keys = this.data.keys());

        var keys = this.keys;
        var array = [];
        var where_keys = [];
        var where_keys_length = 0;
        var array_keys_length = 0;
        var found;

        for(var i = 0; i < keys.length; i++) {

            var data = this.parse('' + keys[i]);
            var key;

            found = true;

            if(fn_compare){

                // if(where_keys_length) {
                //
                //     for(var x = 0; x < where_keys_length; x++) {
                //
                //         key = where_keys[x];
                //         found = fn_compare(data[key], where[key]);
                //
                //         if(!found) break;
                //     }
                // }
                // else {

                    for(key in where) {

                        if(where.hasOwnProperty(key)) {

                            found = fn_compare(data[key], where[key]);
                            //where_keys[where_keys_length++] = key;

                            if(!found) break;
                        }
                    }
                //}
            }
            else{

                found = where.call(data);
            }

            if(found) array[array_keys_length++] = data;
        }

        return array;
    };

    /**
     * @param {Array<string, *>} where
     * @param {Function=} filter
     */

    ModelHelper.prototype.where = function(where, filter){

        return this.each(where, filter || function(a, b){

            return a === b;
        });
    };

    /**
     * @param {Array<string, *>} where
     * @param {Function=} filter
     */

    ModelHelper.prototype.like = function(where, filter){

        return this.each(where, filter || function(a, b){

            return ('' + a).replace(/ /g, '').toLowerCase()
               === ('' + b).replace(/ /g, '').toLowerCase();
        });
    };

    /**
     * @param {Array<_model_class>} items
     */

    ModelHelper.prototype.saveAll = function(items, persistent){

        var length;

        if(items && (length = items.length)) {

            var i = 0;

            for(; i < length; i++){

                items[i].save(persistent);
            }
        }
    };

    /**
     * @param {Array<_model_class>=} items
     */

    ModelHelper.prototype.deleteAll = function(items){

        items || (items = this.all());

        for(var i = 0, length = items.length; i < length; i++){

            items[i].delete(/* batch? */ i < length - 1);
        }
    };

    /**
     * @param {Array<_model_class>} items
     * @param {Array<string, *>} params
     * @param {boolean=} persistent
     */

    ModelHelper.prototype.updateAll = function(items, params, persistent){

        var length;

        if(items && (length = items.length)) {

            var i = 0;

            for(; i < length; i++){

                items[i].update(params, persistent);
            }
        }
    };

    // ---------------------------------------------------------------------
    // ACTIVE MODEL PROTOTYPES
    // ---------------------------------------------------------------------

    /**
     * @constructor
     * @param {string} key
     * @param {_model_class} model
     * @implements _model_class
     */

    function ModelClass(key, model) {

        this.modelName = key;

        /* Bind References from ModelHelper */

        this.data = STORAGE.DATA[key];
        //this.session = STORAGE.SESSION[key];
        this.cache = STORAGE.CACHE[key];

        /* Bind References from ModelCallbacks */

        var prototype = model.prototype;

        for(var field in prototype){

            if(prototype.hasOwnProperty(field)){

                this[field] = prototype[field];
            }
        }
    }

    function compact_model_data(data, persistent){

        var copy = {};
        var has_object_keys = false;

        for(var field in data) {

            if(field !== 'mapToViewCache' && data.hasOwnProperty(field)) {

                if(field.charAt(0) === '_') continue;

                var data_field = data[field];

                if(data_field || (data_field === 0 && field === 'id')) { // NOTE: do not skip zero IDs

                    var data_field_constructor = data_field.constructor;

                    /* Force temporary array notation to simplify handling, this may have a tiny performance impact */

                    if(data_field_constructor !== Array) {

                        data_field = [data_field];
                    }

                    var length = data_field.length;

                    if(length) {

                        copy[field] = new Array(length);

                        for(var i = 0; i < length; i++) {

                            var data_field_index = data_field[i];

                            if(data_field_index.constructor.prototype instanceof ModelClass) {

                                data_field_index.save(persistent);

                                copy[field][i] = {

                                    '_id': '' + data_field_index['id'],
                                    '_type': data_field_index.constructor.prototype.modelName
                                };

                                has_object_keys = true;
                            }
                            else if(data_field_index.constructor === Object) {

                                var recursive_value = compact_model_data(data_field_index, persistent);

                                if(recursive_value) {

                                    copy[field][i] = recursive_value;
                                    has_object_keys = true;
                                }
                            }
                            else{

                                if(data_field_index) {

                                    copy[field][i] = data_field_index;
                                    has_object_keys = true;
                                }
                            }
                        }
                    }

                    /* Remove temporary forced array notation */

                    if(data_field_constructor !== Array) {

                        copy[field] = copy[field][0];
                    }
                }
            }
        }

        return has_object_keys ? copy : null;
    }

    /**
     * @param {boolean=} persistent
     * @this _model_class
     */

    ModelClass.prototype.save = function(persistent){

        var id = this['id'];

        if(!CORE.isType(id)){

            if(DEBUG) CORE.console.warn('WARNING: Data without ID cannot be stored!', this);

            return this;
        }

        if(persistent) {

            (function(self){

                CORE.stack(function(){

                    var copy = compact_model_data(self, persistent);

                    try {

                        self.data.set(

                            '' + self['id'],

                            copy

                            // APP.CONFIG.GZIP ?
                            //
                            //     STORAGE.compress(JSON.stringify(copy))
                            // :
                            //     JSON.stringify(copy)
                        );

                        // TODO: maybe this line failes
                        APP.MODEL[self.modelName].keys = self.data.keys();
                    }
                    catch(e){

                        if(DEBUG) CORE.console.err('ERROR: Cannot save model data (ID: ' + self['id'] + ')', self);
                    }
                });

            })(this);
        }

        id = '' + id;

        //NOTE: points through references
        //if(this.cache[id]) console.log(this.cache[id] === this);

        // /* Update cache */
        //
        // if(this.cache[id]) {
        //
        //     for(var field in this) {
        //
        //         if(this.hasOwnProperty(field)) {
        //
        //             this.cache[id][field] = this[field];
        //         }
        //     }
        // }
        //
        // /* Create cache */
        //
        // else {
        //
        //     this.cache[id] = this;
        // }

        return this.cache[id] || (this.cache[id] = this);
    };

    /**
     * @this _model_class
     */

    ModelClass.prototype.save_to_cache = function(){

        return this.save(/* persistent? */ false);
    };

    /**
     * @param {Object<string, *>} params
     * @param {boolean=} persistent
     * @this _model_class
     */

    ModelClass.prototype.update = function(params, persistent){

        var has_update = false;

        for(var key_1st in params) {

            if(params.hasOwnProperty(key_1st)) {

                var current_value = params[key_1st];

                //TODO
                if(CORE.isType(this[key_1st])){

                    if(this[key_1st] !== current_value &&
                      (current_value || (current_value === 0 || current_value === false || current_value === "")) &&
                      (current_value.constructor !== Array || current_value.length) &&
                      (current_value.constructor !== Object || Object.keys(/** @type {Object} */ (current_value)||{}).length)){

                        this[key_1st] = current_value;
                        has_update = true;
                    }
                }
                else{

                    this[key_1st] = current_value;
                    has_update = true;
                }
            }
        }

        if(has_update) {

            /* Delete View Mapper Cache */

            this['mapToViewCache'] = void 0;

            /* Delete View Mapper Cache */

            if(persistent) this.save(persistent);
        }

        return this;
    };

    /**
     * @this _model_class
     */

    ModelClass.prototype.restore = function(){

        return this.prototype.parse.call(this, '' + this['id'], true);
    };

    /**
     * @param {boolean=} batch
     * @this _model_class
     */

    ModelClass.prototype.delete = function(batch){

        APP.MODEL[this.modelName].data.del('' + this['id']);
        //delete APP.MODEL[this.modelName].data['' + this['id']];
        delete APP.MODEL[this.modelName].cache['' + this['id']];
        if(!batch) APP.MODEL[this.modelName].keys = this.data.keys();
    };

    return /** @type {_active_model} */ (new ACTIVE_MODEL());

})(
    APP.MAPPER,
    /** @type {_storage_struct} */
    (APP.STORAGE)
);
