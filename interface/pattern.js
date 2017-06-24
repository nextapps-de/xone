goog.provide('INTERFACE.PATTERN');

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
