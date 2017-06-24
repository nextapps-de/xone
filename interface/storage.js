goog.provide('INTERFACE.STORAGE');

/**
 * Storage Interface
 * @interface
 * @template Storage
 * @this {_storage_interface}
 * @param {!string} store_id
 * @const
 */

function _storage_interface(store_id) {}
/** @type {Function} */
_storage_interface.prototype.get;
/** @type {Function} */
_storage_interface.prototype.set;
/** @type {Function} */
_storage_interface.prototype.update;
/** @type {Function} */
_storage_interface.prototype.del;
/** @type {Function} */
_storage_interface.prototype.clear;
/** @type {Function} */
_storage_interface.prototype.keys;
