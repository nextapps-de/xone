/**!
 * @preserve Xone Javascript Framework
 * Copyright (c) 2017 NextApps, All rights reserved.
 */

goog.provide('INTERFACE');

/**
 * ActiveModel Interface
 * @interface
 * @template ActiveModel
 * @const
 */

function _active_model(){}
/** @export @type {Function} */
_active_model.prototype.register;
/** @export @type {Function} */
_active_model.prototype.new;
/** @export @type {Function} */
_active_model.prototype.create;

/**
 * ModelHelper Interface
 * @interface
 * @template ModelHelper
 * @const
 */

function _model_helper(){}
/** @export @type {Function} */
_model_helper.prototype.new;
/** @export @type {Function} */
_model_helper.prototype.create;
/** @export @type {Function} */
_model_helper.prototype.newFromList;
/** @export @type {Function} */
_model_helper.prototype.createFromList;
/** @export @type {Function} */
_model_helper.prototype.parse;
/** @export @type {Function} */
_model_helper.prototype.find;
/** @export @type {Function} */
_model_helper.prototype.all;
/** @export @type {Function} */
_model_helper.prototype.range;
/** @export @type {Function} */
_model_helper.prototype.count;
/** @export @type {Function} */
_model_helper.prototype.findBy;
/** @export @type {Function} */
_model_helper.prototype.each;
/** @export @type {Function} */
_model_helper.prototype.where;
/** @export @type {Function} */
_model_helper.prototype.like;
/** @export @type {Function} */
_model_helper.prototype.saveAll;
/** @export @type {Function} */
_model_helper.prototype.deleteAll;
/** @export @type {Function} */
_model_helper.prototype.updateAll;

/**
 * ModelClass Interface
 * @interface
 * @template ModelClass
 * @param {Object<string, *>} data
 * @const
 */

function _model_class(data){}
/** @export @type {Function} */
_model_class.prototype.save;
/** @export @type {_storage_interface} */
_model_class.prototype.data;
/** @export @type {Function} */
_model_class.prototype.cache;
/** @export @type {Function} */
//_model_class.prototype.session;
/** @export @type {Function} */
_model_class.prototype.update;
/** @export @type {Function} */
_model_class.prototype.restore;
/** @export @type {Function} */
_model_class.prototype.delete;
/** @export @type {string} */
_model_class.prototype.modelName;
/** @export @type {Function} */
_model_class.constructor.prototype.mapToView;
/** @export @type {Function} */
_model_class.constructor.prototype.mapToPayload;
/** @export @type {Function} */
_model_class.constructor.prototype.mapToData;
/** @export @type {Function} */
_model_class.constructor.prototype.beforeUpdate;
/** @export @type {Function} */
_model_class.constructor.prototype.beforeCreate;
/** @export @type {Function} */
_model_class.constructor.prototype.beforeSave;
/** @export @type {Function} */
_model_class.constructor.prototype.onCreate;
/** @export @type {Function} */
_model_class.constructor.prototype.onUpdate;
/** @export @type {Function} */
_model_class.constructor.prototype.onSave;

/**
 * Controller Interface
 * @interface
 * @template Controller
 * @this {_controller_struct}
 * @const
 */

function _controller_struct(){}
/** @export @type {Function} */
_controller_struct.prototype.render;
/** @export @type {Function} */
_controller_struct.prototype.build;
/** @export @type {Function} */
_controller_struct.prototype.request;
/** @export @type {Function} */
_controller_struct.prototype.requestBatch;
/** @export @type {Function} */
_controller_struct.prototype.requestSync;

/**
 * Route Interface
 * @typedef {_route_struct}
 * @const
 */

var _route_struct = {

    /** @export @type {string} */
    to: '',

    /** @export @type {string} */
    action: '',

    /** @export @type {string} */
    type: '',

    /** @export @type {string} */
    field: '',

    /** @export @type {number} */
    limit: 0,

    /** @export @type {number} */
    last: 0,

    /** @export @type {Object<string, string|number|boolean>} */
    params: {},

    /** @export @type {Object<string, string>} */
    header: {},

    /** @export @type {boolean} */
    cache: false,

    /** @export @type {boolean} */
    clear: false,

    /** @export @type {boolean} */
    async: true,

    /** @export @type {Function} */
    default: function(){},

    /** @export @type {Function} */
    error: function(){},

    /** @export @type {Function} */
    filter: function(){},

    /** @export @type {Function} */
    arrayfilter: function(){},

    /** @export @type {Function} */
    sort: function(){},

    /** @export @type {Function} */
    map: function(){},

    /** @export @type {Function} */
    arraymap: function(){}
};

/**
 * Mapping Interface
 * @typedef {_mapping_struct}
 * @const
 */

var _mapping_struct = {

    /** @dict */
    mapToView: {},

    /** @dict */
    mapToPayload: {},

    /** @dict */
    mapToData: {}
};

/**
 * Template Interface
 * @typedef {_template_struct}
 * @const
 */

var _template_struct = {

    /** @export @type {Array<string|number>} */
    data: [],

    /** @export @type {Array<string>} */
    map: [],

    /** @export @type {function(*):boolean} */
    if: function(){},

    /** @export @type {string} */
    loop: '',

    /** @export @type {string} */
    include: '',

    /** @export @type {string} */
    else: ''
};

/**
 * View Model Interface
 * @typedef {_view_model}
 * @const
 */

var _view_model = {

    /** @export @type {Array<*>} */
    data: [],

    /** @export @type {string} */
    target: '',

    /** @export @type {string} */
    view: '',

    /** @export @type {string|_view_model} */
    default: '',

    /** @export @type {string|Function} */
    callback: ''
};

/**
 * Cache Interface
 * @interface
 * @template CACHE
 * @this {_cache_struct}
 * @const
 */

function _cache_struct() {}
/** @export @type {function(string, *, boolean=)} */
_cache_struct.prototype.set;
/** @export @type {function(string, boolean=):*} */
_cache_struct.prototype.get;
/** @export @type {function(string):*} */
_cache_struct.prototype.remove;
/** @export @type {function()} */
_cache_struct.prototype.clear;

/**
 * Build Pattern Interface
 * @typedef {_pattern_struct}
 * @const
 */

var _pattern_struct = {

    /** @export @type {string} */
    tag: '',

    /** @export @type {Object<string, string>|Array<Object<string, string>>} */
    attr: {},

    /** @export @type {string} */
    text: '',

    /** @export @type {Array<_pattern_struct>} */
    child: [],

    /** @export @type {number} */
    length: 0
};

/**
 * Application Storage Interface
 * @typedef {_storage_struct}
 * @const
 */

var _storage_struct = {

    VIEW: '',
    DATA: {},
    SESSION: '',
    CACHE: []
};

/**
 * Event Interface
 * @typedef {_event_struct}
 * @const
 */

var _event_struct = {

    /** @export @type {string} */
    on: '',

    /** @export @type {string} */
    if: '',

    /** @export @type {string} */
    to: '',

    /** @export @type {Object<string, string|number>} */
    //params: {},

    /** @export @type {Function} */
    do: function(){},

    /** @export @type {string} */
    go: '',

    /** @export @type {boolean} */
    stopBubble: true,

    /** @export @type {boolean} */
    preventDefault: true
};

/**
 * AJAX Request Object Interface
 * @typedef {_ajax_struct}
 * @const
 */

var _ajax_struct = {

    /** @export @type {string} */
    type: '',

    /** @export @type {string} */
    url: '',

    /** @export @type {Object<string, string|number>} */
    params: {},

    /** @export @type {Function} */
    success: function(){},

    /** @export @type {Function} */
    error: function(){},

    /** @export @type {Object<string, string>} */
    header: {},

    /** @export @type {boolean} */
    async: true,

    /** @export @type {boolean} */
    clear: true,

    /** @export @type {boolean} */
    cache: true
};

/**
 * Storage Interface
 * @interface
 * @template Storage
 * @this {_storage_interface}
 * @param {!string} store_id
 * @const
 */

function _storage_interface(store_id) {}
/** @export @type {Function} */
_storage_interface.prototype.get;
/** @export @type {Function} */
_storage_interface.prototype.set;
/** @export @type {Function} */
_storage_interface.prototype.update;
/** @export @type {Function} */
_storage_interface.prototype.del;
/** @export @type {Function} */
_storage_interface.prototype.clear;
/** @export @type {Function} */
_storage_interface.prototype.keys;
