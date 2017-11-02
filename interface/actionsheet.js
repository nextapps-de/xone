goog.provide('INTERFACE.ActionSheet');

/**
 * ActionSheet Interface
 * @interface
 */

function _actionsheet_struct(){}

/** @type {function():boolean} */
_actionsheet_struct.prototype.supported;

/** @type {Function} */
_actionsheet_struct.prototype.show;

/** @type {Function} */
_actionsheet_struct.prototype.hide;
