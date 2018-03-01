goog.provide('INTERFACE');
goog.provide('Util');
goog.require('INTERFACE.MODEL');
goog.require('INTERFACE.ROUTE');
goog.require('INTERFACE.EVENT');
goog.require('INTERFACE.PATTERN');
goog.require('INTERFACE.AJAX');
goog.require('INTERFACE.STORAGE');
goog.require('INTERFACE.TEMPLATE');
goog.require('INTERFACE.VIEW');

/** @const */
var Util = {};

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
 * Console Interface
 * @interface
 * @template Console
 * @this {_console_interface}
 * @const
 */

function _console_interface(){}
/** @type {Function} */
_console_interface.prototype.log;
/** @type {Function} */
_console_interface.prototype.warn;
/** @type {Function} */
_console_interface.prototype.err;
/** @type {Function} */
_console_interface.prototype.info;
/** @type {Function} */
_console_interface.prototype.flush;

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
 * CacheItemInterface
 * @name CacheItemInterface
 * @namespace FlexiCache
 * @interface
 */

function CacheItemInterface(){}

/** @type {!string} */
//CacheItemInterface.prototype.key;

/** @type {*} */
CacheItemInterface.prototype.data;

/** @type {!boolean|number} */
CacheItemInterface.prototype.expire;

/** @type {number} */
CacheItemInterface.prototype.count;

/** @type {function():CacheItemInterface} */
CacheItemInterface.prototype.clone;

/**
 * Cache Interface
 * @interface
 * @this {_cache_struct}
 * @param {number=} expiration
 * @const
 */

function _cache_struct(expiration) {}
/** @type {Function} */
_cache_struct.prototype.new;
/** @type {Function} */
_cache_struct.prototype.create;
/** @type {Function} */
_cache_struct.prototype.register;
/** @type {function(string, *, boolean=)} */
_cache_struct.prototype.set;
/** @type {function(string, boolean=):*} */
_cache_struct.prototype.get;
/** @type {function(string):*} */
_cache_struct.prototype.remove;
/** @type {function()} */
_cache_struct.prototype.clear;
/** @type {Function} */
_cache_struct.prototype.copy;
/** @type {Function} */
_cache_struct.prototype.add;
/** @type {Function} */
_cache_struct.prototype.clone;
/** @type {function()} */
_cache_struct.caches;

/**
 * Search Interface
 * @interface
 * @this {_search_struct}
 * @const
 */

function _search_struct(options) {}
/** @type {Function} */
_search_struct.prototype.create;
/** @type {Function} */
_search_struct.prototype.add;
/** @type {Function} */
_search_struct.prototype.update;
/** @type {Function} */
_search_struct.prototype.remove;
/** @type {Function} */
_search_struct.prototype.reset;
/** @type {Function} */
_search_struct.prototype.destroy;
/** @type {Function} */
_search_struct.prototype.search;

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
function _fatjob_interface(

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

){}

/**
 * @param {number} time
 * @this {_fatjob_interface}
 * @return {boolean}
 */
_fatjob_interface.prototype.animate;
/**
 * @param {string} tmp
 * @param {string} to
 */
_fatjob_interface.prototype.colorHandler;

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

){}

/**
 * @param {FAT_SHAPE_CLASS} obj
 */
FAT_CANVAS_CLASS.prototype.add;
/**
 * @param {number} time
 */
FAT_CANVAS_CLASS.prototype.render;

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
}

/** @type {Function} */
CSSJOB_CLASS.prototype.set;

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
){}

/**
 * @param {number} x
 * @param {number} y
 */
FAT_SHAPE_CLASS.prototype.moveTo;
/**
 * @param {number} x
 * @param {number} y
 */
FAT_SHAPE_CLASS.prototype.moveBy;
/**
 * @param {number} w
 * @param {number} h
 */
FAT_SHAPE_CLASS.prototype.resize;
/**
 * @param {CanvasRenderingContext2D} context
 */
FAT_SHAPE_CLASS.prototype.draw;
