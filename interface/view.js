goog.provide('INTERFACE.VIEW');

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
