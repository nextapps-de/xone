goog.provide('INTERFACE.Reminder');

/**
 * Reminder Interface
 * @interface
 */

function _reminder_struct(){}

/** @type {function():boolean} */
_reminder_struct.prototype.supported;

/** @type {Function} */
_reminder_struct.prototype.schedule;

/** @type {Function} */
_reminder_struct.prototype.getScheduledIds;

/** @type {Function} */
_reminder_struct.prototype.cancel;

/** @type {Function} */
_reminder_struct.prototype.cancelAll;
