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
