goog.provide('INTERFACE.MODEL');

/**
 * ActiveModel Interface
 * @interface
 * @template ActiveModel
 * @const
 */

function _active_model(){}
/** @type {Function} */
_active_model.prototype.register;
/** @type {Function} */
_active_model.prototype.new;
/** @type {Function} */
_active_model.prototype.create;

/**
 * ModelHelper Interface
 * @interface
 * @template ModelHelper
 * @const
 */

function _model_helper(){}
/** @type {Function} */
_model_helper.prototype.new;
/** @type {Function} */
_model_helper.prototype.create;
/** @type {Function} */
_model_helper.prototype.newFromList;
/** @type {Function} */
_model_helper.prototype.createFromList;
/** @type {Function} */
_model_helper.prototype.parse;
/** @type {Function} */
_model_helper.prototype.find;
/** @type {Function} */
_model_helper.prototype.all;
/** @type {Function} */
_model_helper.prototype.range;
/** @type {Function} */
_model_helper.prototype.count;
/** @type {Function} */
_model_helper.prototype.findBy;
/** @type {Function} */
_model_helper.prototype.each;
/** @type {Function} */
_model_helper.prototype.where;
/** @type {Function} */
_model_helper.prototype.like;
/** @type {Function} */
_model_helper.prototype.saveAll;
/** @type {Function} */
_model_helper.prototype.deleteAll;
/** @type {Function} */
_model_helper.prototype.updateAll;

/**
 * ModelClass Interface
 * @interface
 * @template ModelClass
 * @param {Object<string, *>} data
 * @const
 */

function _model_class(data){}
/** @type {Function} */
_model_class.prototype.save;
/** @type {_storage_interface} */
_model_class.prototype.data;
/** @type {Function} */
_model_class.prototype.cache;
/** @type {Function} */
//_model_class.prototype.session;
/** @type {Function} */
_model_class.prototype.update;
/** @type {Function} */
_model_class.prototype.restore;
/** @type {Function} */
_model_class.prototype.delete;
/** @type {string} */
_model_class.prototype.modelName;
/** @type {Function} */
_model_class.constructor.prototype.mapToView;
/** @type {Function} */
_model_class.constructor.prototype.mapToPayload;
/** @type {Function} */
_model_class.constructor.prototype.mapToData;
/** @type {Function} */
_model_class.constructor.prototype.beforeUpdate;
/** @type {Function} */
_model_class.constructor.prototype.beforeCreate;
/** @type {Function} */
_model_class.constructor.prototype.beforeSave;
/** @type {Function} */
_model_class.constructor.prototype.onCreate;
/** @type {Function} */
_model_class.constructor.prototype.onUpdate;
/** @type {Function} */
_model_class.constructor.prototype.onSave;
