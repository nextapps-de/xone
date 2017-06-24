goog.provide('INTERFACE.AJAX');

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
