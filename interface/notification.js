goog.provide('INTERFACE.Notification');

/**
 * Notification Interface
 * @interface
 */

function _notification_struct(){}

/** @type {function():boolean} */
_notification_struct.prototype.supported;

/** @type {Function} */
_notification_struct.prototype.alert;

/** @type {Function} */
_notification_struct.prototype.confirm;

/** @type {Function} */
_notification_struct.prototype.prompt;

/** @type {Function} */
_notification_struct.prototype.beep;

/** @type {Function} */
_notification_struct.prototype.vibrate;
