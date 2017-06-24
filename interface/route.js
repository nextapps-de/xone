goog.provide('INTERFACE.ROUTE');

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
