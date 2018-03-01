goog.provide('INTERFACE.Filesystem');

/**
 * Filesystem Interface
 * @interface
 * @template Filesystem
 * @this {_filesystem_struct}
 * @param {boolean=} is_consistent
 */

function _filesystem_struct(is_consistent){}

/** @type {Function} */
_filesystem_struct.prototype.init;

/** @type {Function} */
_filesystem_struct.prototype.load;

/** @type {Function} */
_filesystem_struct.prototype.save;

/** @type {Function} */
_filesystem_struct.prototype.saveAsBlob;

/** @type {Function} */
_filesystem_struct.prototype.delete;

/** @type {Function} */
_filesystem_struct.prototype.exist;

/** @type {Function} */
_filesystem_struct.prototype.resolve;

/** @type {Function} */
_filesystem_struct.prototype.getPath;

/** @type {Function} */
_filesystem_struct.prototype.getFile;

/** @type {Function} */
_filesystem_struct.prototype.info;
