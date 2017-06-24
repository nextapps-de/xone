goog.provide('INTERFACE.Filesystem');

/**
 * Filesystem Interface
 * @interface
 * @template Filesystem
 * @this {_filesystem_struct}
 * @param {string=} consistent
 */

function _filesystem_struct(consistent){}

/** @type {Function} */
_filesystem_struct.prototype.init;

/** @type {Function} */
_filesystem_struct.prototype.load;

/** @type {Function} */
_filesystem_struct.prototype.save;

/** @type {Function} */
_filesystem_struct.prototype.delete;

/** @type {Function} */
_filesystem_struct.prototype.exist;
