goog.provide('INTERFACE');
goog.require('INTERFACE.MODEL');
goog.require('INTERFACE.ROUTE');
goog.require('INTERFACE.EVENT');
goog.require('INTERFACE.PATTERN');
goog.require('INTERFACE.AJAX');
goog.require('INTERFACE.STORAGE');
goog.require('INTERFACE.TEMPLATE');
goog.require('INTERFACE.VIEW');

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
