goog.provide('INTERFACE.Transition');

/**
 * Transition Interface
 * @interface
 */

function _transition_struct(){}

/** @type {function():boolean} */
_transition_struct.prototype.supported;

/** @type {Function} */
_transition_struct.prototype.slide;

/** @type {Function} */
_transition_struct.prototype.flip;

/** @type {Function} */
_transition_struct.prototype.fade;

/** @type {Function} */
_transition_struct.prototype.drawer;

/** @type {Function} */
_transition_struct.prototype.curl;

/** @type {Function} */
_transition_struct.prototype.execute;

/** @type {Function} */
_transition_struct.prototype.cancel;

