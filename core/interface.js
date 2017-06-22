goog.provide('INTERFACE');

/**
 * ActiveModel Interface
 * @interface
 * @template ActiveModel
 * @const
 */

function _active_model(){}
/** @type {Function} */
_active_model.prototype.register;
/** @type {Function} */
_active_model.prototype.new;
/** @type {Function} */
_active_model.prototype.create;

/**
 * ModelHelper Interface
 * @interface
 * @template ModelHelper
 * @const
 */

function _model_helper(){}
/** @type {Function} */
_model_helper.prototype.new;
/** @type {Function} */
_model_helper.prototype.create;
/** @type {Function} */
_model_helper.prototype.newFromList;
/** @type {Function} */
_model_helper.prototype.createFromList;
/** @type {Function} */
_model_helper.prototype.parse;
/** @type {Function} */
_model_helper.prototype.find;
/** @type {Function} */
_model_helper.prototype.all;
/** @type {Function} */
_model_helper.prototype.range;
/** @type {Function} */
_model_helper.prototype.count;
/** @type {Function} */
_model_helper.prototype.findBy;
/** @type {Function} */
_model_helper.prototype.each;
/** @type {Function} */
_model_helper.prototype.where;
/** @type {Function} */
_model_helper.prototype.like;
/** @type {Function} */
_model_helper.prototype.saveAll;
/** @type {Function} */
_model_helper.prototype.deleteAll;
/** @type {Function} */
_model_helper.prototype.updateAll;

/**
 * ModelClass Interface
 * @interface
 * @template ModelClass
 * @param {Object<string, *>} data
 * @const
 */

function _model_class(data){}
/** @type {Function} */
_model_class.prototype.save;
/** @type {_storage_interface} */
_model_class.prototype.data;
/** @type {Function} */
_model_class.prototype.cache;
/** @type {Function} */
//_model_class.prototype.session;
/** @type {Function} */
_model_class.prototype.update;
/** @type {Function} */
_model_class.prototype.restore;
/** @type {Function} */
_model_class.prototype.delete;
/** @type {string} */
_model_class.prototype.modelName;
/** @type {Function} */
_model_class.constructor.prototype.mapToView;
/** @type {Function} */
_model_class.constructor.prototype.mapToPayload;
/** @type {Function} */
_model_class.constructor.prototype.mapToData;
/** @type {Function} */
_model_class.constructor.prototype.beforeUpdate;
/** @type {Function} */
_model_class.constructor.prototype.beforeCreate;
/** @type {Function} */
_model_class.constructor.prototype.beforeSave;
/** @type {Function} */
_model_class.constructor.prototype.onCreate;
/** @type {Function} */
_model_class.constructor.prototype.onUpdate;
/** @type {Function} */
_model_class.constructor.prototype.onSave;

/**
 * Controller Interface
 * @interface
 * @template Controller
 * @this {_controller_struct}
 * @const
 */

function _controller_struct(){}
/** @type {Function} */
_controller_struct.prototype.render;
/** @type {Function} */
_controller_struct.prototype.build;
/** @type {Function} */
_controller_struct.prototype.request;
/** @type {Function} */
_controller_struct.prototype.requestBatch;
/** @type {Function} */
_controller_struct.prototype.requestSync;

/**
 * Route Interface
 * @typedef {_route_struct}
 * @const
 */

var _route_struct = {

    /** @type {string} */
    to: '',

    /** @type {string} */
    action: '',

    /** @type {string} */
    type: '',

    /** @type {string} */
    field: '',

    /** @type {number} */
    limit: 0,

    /** @type {number} */
    last: 0,

    /** @type {Object<string, string|number|boolean>} */
    params: {},

    /** @type {Object<string, string>} */
    header: {},

    /** @type {boolean} */
    cache: false,

    /** @type {boolean} */
    clear: false,

    /** @type {boolean} */
    async: true,

    /** @type {Function} */
    default: function(){},

    /** @type {Function} */
    error: function(){},

    /** @type {Function} */
    filter: function(){},

    /** @type {Function} */
    arrayfilter: function(){},

    /** @type {Function} */
    sort: function(){},

    /** @type {Function} */
    map: function(){},

    /** @type {Function} */
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

    /** @type {Array<string|number>} */
    data: [],

    /** @type {Array<string>} */
    map: [],

    /** @type {function(*):boolean} */
    if: function(){},

    /** @type {string} */
    loop: '',

    /** @type {string} */
    include: '',

    /** @type {string} */
    else: ''
};

/**
 * View Model Interface
 * @typedef {_view_model}
 * @const
 */

var _view_model = {

    /** @type {Array<*>} */
    data: [],

    /** @type {string} */
    target: '',

    /** @type {string} */
    view: '',

    /** @type {string|_view_model} */
    default: '',

    /** @type {string|Function} */
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
/** @type {function(string, *, boolean=)} */
_cache_struct.prototype.set;
/** @type {function(string, boolean=):*} */
_cache_struct.prototype.get;
/** @type {function(string):*} */
_cache_struct.prototype.remove;
/** @type {function()} */
_cache_struct.prototype.clear;

/**
 * Build Pattern Interface
 * @typedef {_pattern_struct}
 * @const
 */

var _pattern_struct = {

    /** @type {string} */
    tag: '',

    /** @type {Object<string, string>|Array<Object<string, string>>} */
    attr: {},

    /** @type {string} */
    text: '',

    /** @type {Array<_pattern_struct>} */
    child: [],

    /** @type {number} */
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

    /** @type {string} */
    on: '',

    /** @type {string} */
    if: '',

    /** @type {string} */
    to: '',

    /** @type {Object<string, string|number>} */
    params: {},

    /** @type {Function} */
    do: function(){},

    /** @type {string} */
    go: '',

    /** @type {boolean} */
    stopBubble: true,

    /** @type {boolean} */
    preventDefault: true
};

/**
 * AJAX Request Object Interface
 * @typedef {_ajax_struct}
 * @const
 */

var _ajax_struct = {

    /** @type {string} */
    type: '',

    /** @type {string} */
    url: '',

    /** @type {Object<string, string|number>} */
    params: {},

    /** @type {Function} */
    success: function(){},

    /** @type {Function} */
    error: function(){},

    /** @type {Object<string, string>} */
    header: {},

    /** @type {boolean} */
    async: true,

    /** @type {boolean} */
    clear: true,

    /** @type {boolean} */
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
/** @type {Function} */
_storage_interface.prototype.get;
/** @type {Function} */
_storage_interface.prototype.set;
/** @type {Function} */
_storage_interface.prototype.update;
/** @type {Function} */
_storage_interface.prototype.del;
/** @type {Function} */
_storage_interface.prototype.clear;
/** @type {Function} */
_storage_interface.prototype.keys;


/**
 * @interface
 * @param {HTMLElement} obj
 * @param {string} style
 * @param {CSSStyleDeclaration|Object} css
 * @param {number} from
 * @param {number|string} to
 * @param {string} metric
 * @param {number} duration
 * @param {string} easeStr
 * @param {Array.<number>} ease
 * @param {number} RES
 * @param {number} start
 * @param {Function|undefined} callback
 * @param {Function|undefined} step
 * @public
 */
function FATJOB_CLASS(

    //id,
    obj,
    style,
    css,
    from,
    to,
    //val,
    metric,
    //metric_type,
    duration,
    easeStr,
    ease,
    RES,
    start,
    callback,
    step
    //checkkey,
    //DIFF,

){};
/**
 * @param {number} time
 * @this {FATJOB_CLASS}
 * @return {boolean}
 */
FATJOB_CLASS.prototype.animate = function(time){};
/**
 * @param {string} tmp
 * @param {string} to
 */
FATJOB_CLASS.prototype.colorHandler = function(tmp, to){};

//------------------------------------------------------------------------------

/**
 * @interface
 * @public
 */
function FAT_CLASS(){

    /**
     * @type {boolean}
     */
    this.isRender;
    /**
     * @type {boolean}
     */
    this.EXEC;
};


//------------------------------------------------------------------------------


/**
 * @interface
 * @param {HTMLCanvasElement=} canvas
 * @param {number=} width
 * @param {number=} height
 * @param {boolean=} useOffscreen
 * @public
 */

function FAT_CANVAS_CLASS(

    canvas,
    width,
    height,
    useOffscreen

){};
/**
 * @param {FAT_SHAPE_CLASS} obj
 */
FAT_CANVAS_CLASS.prototype.add = function(obj){};
/**
 * @param {number} time
 */
FAT_CANVAS_CLASS.prototype.render = function(time){};

//------------------------------------------------------------------------------

/**
 * @interface
 * @param {CSSStyleDeclaration} css
 * @param {string} style
 * @param {string|number} val
 * @public
 */
function CSSJOB_CLASS(css, style, val){
    /**
     * @type {CSSStyleDeclaration|Object}
     */
    this.css;
    /**
     * @type {string}
     */
    this.style;
    /**
     * @type {string|number}
     */
    this.val;
};

CSSJOB_CLASS.prototype.set = function(){};

//------------------------------------------------------------------------------

/**
 * @interface
 * @param {number=} x
 * @param {number=} y
 * @param {number=} width
 * @param {number=} height
 * @param {string=} fillStyle
 * @param {number=} lineWidth
 * @param {string=} strokeStyle
 * @param {boolean=} useBuffer
 * @public
 */

function FAT_SHAPE_CLASS(

    x,
    y,
    width,
    height,
    fillStyle,
    lineWidth,
    strokeStyle,
    useBuffer
){};
/**
 * @param {number} x
 * @param {number} y
 */
FAT_SHAPE_CLASS.prototype.moveTo = function(x, y){};
/**
 * @param {number} x
 * @param {number} y
 */
FAT_SHAPE_CLASS.prototype.moveBy = function(x, y){};
/**
 * @param {number} w
 * @param {number} h
 */
FAT_SHAPE_CLASS.prototype.resize = function(w, h){};
/**
 * @param {CanvasRenderingContext2D} context
 */
FAT_SHAPE_CLASS.prototype.draw = function(context){};
