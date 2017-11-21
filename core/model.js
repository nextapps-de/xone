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
     * @param {Array<string>|Object<string, boolean>|Function} model
     * @param {Object<string, boolean>=} map
     * @returns {_model_helper}
     */

    ACTIVE_MODEL.prototype.register = function(key, model, map){

        if(map || CORE.isObject(model)){

            model = CORE.getKeys(map || (map = /** @type Object<string, boolean> */ (model)));
        }

    	if(map || CORE.isArray(model)){

    		var str = "";

    		for(var i = 0; i < model.length; i++){

				str += "this." + model[i] + " = data." + model[i] + ";";
			}

			model = Function("data", str);
		}

        /* Register model to the storage controller */

        STORAGE.DATA[key] || (STORAGE.DATA[key] = /** @type _storage_struct */ (new CORE.Storage(key)));

        /* Register model to the session controller */

        //STORAGE.SESSION[key] || (STORAGE.SESSION[key] = ;

        /* Register model to the cache controller */

        STORAGE.CACHE[key] || (STORAGE.CACHE[key] = {});

        /* Create Helper Instance + Register the model */

        this[key] = new ModelHelper(key, model);

        /* Register custom mappings to the model */

        if(CONFIG.ENABLE_MAPPER_CACHE){

            this[key].Model.prototype.mapToView = MAPPER[key] ? MAPPER[key].mapToView : false;
        }

        if(map) {

            this[key].Model.prototype.mapToStorage = map;
        }

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

        this.keys = this.data.keys();
    }

    /**
     * Provides a factory method which is used to create new instances
     * @param {_model_class|Array<_model_class>|Object<string, *>|Array<Object<string, *>>} data
     * @param {boolean=} persistent
     * @param {boolean=} _batch
     * @returns {_model_class|Array<_model_class>}
     */

    ModelHelper.prototype.new = function(data, persistent, _batch){

        /* Set default data if missing */

        data || (data = {});

        /* Fallback: Handle passed array */

        if(data.constructor === Array){

            return this.newFromList(/** @type {Array<Object<string, *>>} */ (data), persistent);
        }

        /* Fallback: Handle passed Models */

        if(data instanceof ModelClass){

            return /** @type {_model_class} */ (data);
        }

        // if(init_persistent){
        //
        //     persistent = true;
        // }

        /* Get existing record */

        var record = data['id'] || (data['id'] === 0) ? this.parse(data['id']) : null;

        if(record) {

            /* Update an existing instance */

            var tmp_record = new this.Model(data);

            if(!tmp_record) return null;

            //TODO:
            delete tmp_record['id'];

            // var copy = {};
            // for(var key in data){
            //     if(data.hasOwnProperty(key)){
            //         copy[key] = tmp_record[key];
            //     }
            // }

            record.update(tmp_record, persistent, null, _batch); // update calls its own save method
        }
        else{

            /* Create a new instance of the related model type */

            record = new this.Model(data);

            if(!record) return null;

            if(record['id'] || (record['id'] === 0)){

                if(record.beforeCreate) record.beforeCreate();
                if(!_batch) {
                    if(this.beforeCreate) this.beforeCreate();
                }

                /* Saves a new created instance */

                record.save(persistent, _batch);

                /* Update model keys */

                if(!_batch) this.keys = this.data.keys();

                if(record.onCreate) record.onCreate();
                if(!_batch) {
                    if(this.onCreate) this.onCreate();
                }
            }
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

            // TODO: remove empty objects?
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

            data = APP.MODEL[data['_type']].parse(data['_id'], force);
        }

        for(var key in data) {

            if(data.hasOwnProperty(key)) {

                var data_key = data[key];

                if((data_key !== null) && (typeof data_key !== 'undefined')){

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
     * @param {!string} index
     * @param {boolean=} force
     * @param {boolean=} recursive
     * @this {_model_class|_model_helper}
     * @return {_model_class}
     */

    ModelHelper.prototype.parse = function(index, force, recursive){

        var data, model = null;

        if(typeof index === 'number') {

            index = String(index);
        }

        if(!CONFIG.ENABLE_MODEL_CACHE || force || !this.cache[index]){

            if(data = this.data.get(index)){

                model = new this.Model(extract_model_data(data, force));
            }
        }

        if(CONFIG.ENABLE_MODEL_CACHE || !data){

            if(model){

                this.cache[index] = model;
            }
            else{

                model = this.cache[index];
            }
        }

        return model;
    };

    /**
     * @param {Element|string} id
     * @return {_model_class|null}
     */

    ModelHelper.prototype.find = function(id){

        if(id){

            if(id.dataset){

                return this.parse(id.dataset.id);
            }
        }

        return this.parse(id);
    };

    /**
     * @param {Element|string|ModelClass} id
     */

    ModelHelper.prototype.delete = function(id){

        if(id){

            if(id instanceof ModelClass){

                id.delete();
            }

            else if(id.dataset){

                this.parse(id.dataset.id).delete();
            }

            else {

                this.parse(id).delete();
            }
        }
    };

    /**
     * @param {Element|string|ModelClass} id
     * @param {string|Object<string, *>} params
     * @param {*|boolean=} persistent
     * @param {boolean=} _persistent
     * @return {_model_class|null|undefined}
     */

    ModelHelper.prototype.update = function(id, params, persistent, _persistent){

        if(id){

            if(id instanceof ModelClass){

                return id.update(params, persistent, _persistent);
            }

            else if(id.dataset){

                return this.parse(id.dataset.id).update(params, persistent, _persistent);
            }
        }

        //return null;
        //return this.parse(/** @type {string} */ (id)).update(params, persistent, _persistent);
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

            array[len++] = this.parse(keys[start++]);
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
	 * @param {string|Object<string, *>} where
	 * @param {*|Function=} filter
	 * @param {Function=} _filter
	 * @return {number}
	 */

    ModelHelper.prototype.count =
    ModelHelper.prototype.countWhere = function(where, filter, _filter){

    	if(where){

			return this.where(where, filter, _filter).length;
		}
		else{

			return this.keys.length || (this.keys = this.data.keys()).length;
		}
    };

    /**
     * @param {string} field
     * @param {*} value
     */

    ModelHelper.prototype.findBy = function(field, value){

        this.keys.length || (this.keys = this.data.keys());

        var keys = this.keys;

        for(var i = 0; i < keys.length; i++) {

            var data = this.parse(keys[i]);

            if(data[field] === value) {

                return data;
            }
        }
    };

    /**
     * @param {Function|Object<string, *>} where
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

            var data = this.parse(keys[i]);
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
     * @param {string|Object<string, *>} where
     * @param {*|Function=} filter
	 * @param {Function=} _filter
     */

    ModelHelper.prototype.where = function(where, filter, _filter){

		if(typeof where === 'string'){

			var attribute = where;

			where = {};
			where[attribute] = filter;
			filter = _filter;
		}

        return this.each(where, /** @type {Function|null|undefined} */ (filter) || function(a, b){

            return a === b;
        });
    };

    /**
     * @param {Object<string, *>} where
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

		items || (items = this.all());

        var length;

        if(items && (length = items.length)) {

            for(var i = 0; i < length; i++){

                items[i].save(persistent, /* batch: */ i < length - 1);
            }
        }

        return items;
    };

    /**
     * @param {string|Object<string, *>|Array<_model_class>=} items
     * @param {*|Function=} filter
     * @param {Function=} _filter
     */

    ModelHelper.prototype.deleteAll = function(items, filter, _filter){

        if(filter){

            items = this.where(/** @type {string|Object<string, *>} */ (items), filter, _filter);
        }
        else{

            items || (items = this.all());
        }

		var length;

		if(items && (length = items.length)){

			for(var i = 0; i < length; i++){

				if(items[i]) {

				    items[i].delete(/* batch: */ i < length - 1);
                }
			}
		}
    };

    ModelHelper.prototype.deleteWhere = ModelHelper.prototype.deleteAll;

    var modelhelper_has_update;

    /**
     * ModelHelper.updateAll([items], {params}, save?);
     * ModelHelper.updateAll([items], key, value, save?);
     * ModelHelper.updateAll({params}, save?);
     * ModelHelper.updateAll(key, value, save?);
     *
     * @param {Array<_model_class>|Object<string, *>|string} items
     * @param {Object<string, *>|boolean|*} params
     * @param {boolean|*=} persistent
	 * @param {boolean|*=} _persistent
     */

    ModelHelper.prototype.updateAll = function(items, params, persistent, _persistent){

        if(!CORE.isArray(items)){

            _persistent = persistent;
            persistent = params;
            params = items;
            items = this.all();
        }

        modelhelper_has_update = false;

		var length;

        if(this.beforeUpdate) this.beforeUpdate();
        if(this.beforeSave) this.beforeSave();

		if(items && (length = items.length)){

			for(var i = 0; i < length; i++){

				items[i].update(params, persistent, _persistent, /* batch: */ true);
			}
		}

        if(modelhelper_has_update){

            if(this.onSave) this.onSave();
            if(this.onUpdate) this.onUpdate();
        }

        return items;
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

        // TODO bind on model helper
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

            if(data.hasOwnProperty(field) && (!data.mapToStorage || data.mapToStorage[field]) && (field !== 'mapToViewCache')) {

                if(field.charAt(0) === '_') continue;

                var data_field = data[field];

                //if(data_field || (data_field === 0 && field === 'id')) { // NOTE: do not skip zero IDs
                if(CORE.hasValue(data_field)) {

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

                            if(data_field_index instanceof ModelClass) {

                                data_field_index.save(persistent);

                                copy[field][i] = {

                                    '_id': '' + data_field_index['id'],
                                    '_type': data_field_index.modelName
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

                                //if(data_field_index) {

                                    copy[field][i] = data_field_index;
                                    has_object_keys = true;
                                //}
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
	 * @param {boolean=} _batch
     * @this _model_class
     */

    ModelClass.prototype.save = function(persistent, _batch){

    	//TODO:
		//persistent = true;

        var id = String(this['id']);

        if(!id && id !== '0'){

            if(DEBUG) CORE.console.warn('WARNING: Data without ID cannot be stored!', this);

            return this;
        }

        if(persistent) {

            if(this.beforeSave) this.beforeSave();
            if(!_batch){
                if(APP.MODEL[this.modelName].beforeSave) APP.MODEL[this.modelName].beforeSave();
            }

            var copy = compact_model_data(this, persistent);

            try {

                this.data.set(id, copy);
            }
            catch(e){

                if(DEBUG) CORE.console.err('ERROR: Cannot save model data (ID: ' + id + ')', this);
            }

            // TODO: maybe this line failes?
            if(!_batch) APP.MODEL[this.modelName].keys = this.data.keys();

            if(this.onSave) this.onSave();
            if(!_batch){
                if(APP.MODEL[this.modelName].onSave) APP.MODEL[this.modelName].onSave();
            }
        }
        else{

            this.cache['' + id] = this;
        }

        return (

            CONFIG.ENABLE_MODEL_CACHE ?

                this.cache['' + id] = this
            :
                this
        );
    };

    /**
     * @this _model_class
     */

    // ModelClass.prototype.save_to_cache = function(){
    //
    //     return this.save(/* persistent? */ false);
    // };

    /*
       Model.update(key, value, save?, batch?);
       Model.update({key: value}, save?, batch?);
     */

    /**
     * @param {string|Object<string, *>} params
     * @param {*|boolean=} persistent
	 * @param {boolean=} _persistent
	 * @param {boolean=} _batch
     * @this _model_class
     */

    ModelClass.prototype.update = function(params, persistent, _persistent, _batch){

        if(CORE.isType(params, 'string')){

            var attribute = params;

            params = {};
            params[attribute] = persistent;
            persistent = _persistent;
        }
        else{

            //_batch = _persistent;
        }

        if(this.beforeUpdate) this.beforeUpdate();
        if(!_batch){
            if(APP.MODEL[this.modelName].beforeUpdate) APP.MODEL[this.modelName].beforeUpdate();
        }

        var has_update = false;

        for(var key_1st in params) {

            if(params.hasOwnProperty(key_1st)) {

                var current_value = params[key_1st];

                //TODO
                // if(CORE.isType(this[key_1st])){
                //
                //     if((this[key_1st] !== current_value) && (
                //         !current_value || (
                //        (current_value.constructor !== Array || current_value.length) &&
                //        (current_value.constructor !== Object || Object.keys(/** @type {Object} */ (current_value)||{}).length)))){
                //
                //         this[key_1st] = current_value;
                //         has_update = true;
                //     }
                // }
                // else{

                    if(this[key_1st] !== current_value){

                        this[key_1st] = current_value;
                        has_update = true;
                    }
                //}
            }
        }

        if(has_update) {

            modelhelper_has_update = true;

            /* Delete View Mapper Cache */

            if(CONFIG.ENABLE_MAPPER_CACHE) this['mapToViewCache'] = false;

            /* Delete View Mapper Cache */

            this.save(persistent, _batch);

			if(this.onUpdate) this.onUpdate();
			if(!_batch){
				if(APP.MODEL[this.modelName].onUpdate) APP.MODEL[this.modelName].onUpdate();
			}
        }

        return this;
    };

    /**
     * @this _model_class
     */

    ModelClass.prototype.restore = function(){

        return APP.MODEL[this.modelName].parse.call(APP.MODEL[this.modelName], '' + this['id'], true);
    };

    /**
     * @param {boolean=} _batch
     * @this _model_class
     */

    ModelClass.prototype.delete = function(_batch){

		if(this.beforeDelete) this.beforeDelete();
		if(!_batch) {
			if(APP.MODEL[this.modelName].beforeDelete) APP.MODEL[this.modelName].beforeDelete();
		}

        APP.MODEL[this.modelName].data.del('' + this['id']);
        this.data.del('' + this['id']);

        delete APP.MODEL[this.modelName].cache['' + this['id']];
        delete this.cache['' + this['id']];

        if(!_batch) APP.MODEL[this.modelName].keys = this.data.keys();

		if(this.onDelete) this.onDelete();
		if(!_batch) {
			if(APP.MODEL[this.modelName].onDelete) APP.MODEL[this.modelName].onDelete();
		}
    };

    return /** @type {_active_model} */ (new ACTIVE_MODEL());

})(
    APP.MAPPER,
    /** @type {_storage_struct} */
    (APP.STORAGE)
);
