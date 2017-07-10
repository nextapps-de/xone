goog.provide('INTERFACE.EVENT');

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

    /** @type {Function} */
    do: function(){},

    /** @type {string} */
    at: '',

    /** @type {string} */
    in: '',

    /** @type {string} */
    by: '',

    /** @type {string} */
    go: '',

    /** @type {Object<string, string|number>} */
    params: {},

    /** @type {boolean} */
    stopBubble: true,

    /** @type {boolean} */
    preventDefault: true
};
