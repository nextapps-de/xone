goog.provide('INTERFACE.VIEW');

/**
 * View Model Interface
 * @interface {_view_model}
 * @const
 */

function _view_model(){}

/** @type {Function} */
_view_model.prototype.show;
/** @type {Function} */
_view_model.prototype.hide;
/** @type {Function} */
_view_model.prototype.fadeIn;
/** @type {Function} */
_view_model.prototype.fadeOut;
/** @type {Function} */
_view_model.prototype.slideIn;
/** @type {Function} */
_view_model.prototype.slideOut;
/** @type {Function} */
_view_model.prototype.slideInLeft;
/** @type {Function} */
_view_model.prototype.slideOutLeft;

/**
 * View Parameter Interface
 * @typedef {_view_params}
 * @const
 */

var _view_params = {

    /** @type {Array<*>} */
    data: [],

    /** @type {string} */
    target: '',

    /** @type {string} */
    view: '',

    /** @type {string|_view_params} */
    default: '',

    /** @type {string|Function} */
    callback: ''
};
