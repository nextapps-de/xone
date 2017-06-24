goog.provide('INTERFACE.TEMPLATE');

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
