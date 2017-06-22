goog.provide('DIST.INTERFACE');
goog.require('INTERFACE');

/** @export */
_active_model.prototype.register;
/** @export */
_active_model.prototype.new;
/** @export */
_active_model.prototype.create;



/** @export */
_model_helper.prototype.new;
/** @export */
_model_helper.prototype.create;
/** @export */
_model_helper.prototype.newFromList;
/** @export */
_model_helper.prototype.createFromList;
/** @export */
_model_helper.prototype.parse;
/** @export */
_model_helper.prototype.find;
/** @export */
_model_helper.prototype.all;
/** @export */
_model_helper.prototype.range;
/** @export */
_model_helper.prototype.count;
/** @export */
_model_helper.prototype.findBy;
/** @export */
_model_helper.prototype.each;
/** @export */
_model_helper.prototype.where;
/** @export */
_model_helper.prototype.like;
/** @export */
_model_helper.prototype.saveAll;
/** @export */
_model_helper.prototype.deleteAll;
/** @export */
_model_helper.prototype.updateAll;



/** @export */
_model_class.prototype.save;
/** @export */
_model_class.prototype.data;
/** @export */
_model_class.prototype.cache;
/** @export */
//_model_class.prototype.session;
/** @export */
_model_class.prototype.update;
/** @export */
_model_class.prototype.restore;
/** @export */
_model_class.prototype.delete;
/** @export */
_model_class.prototype.modelName;
/** @export */
_model_class.constructor.prototype.mapToView;
/** @export */
_model_class.constructor.prototype.mapToPayload;
/** @export */
_model_class.constructor.prototype.mapToData;
/** @export */
_model_class.constructor.prototype.beforeUpdate;
/** @export */
_model_class.constructor.prototype.beforeCreate;
/** @export */
_model_class.constructor.prototype.beforeSave;
/** @export */
_model_class.constructor.prototype.onCreate;
/** @export */
_model_class.constructor.prototype.onUpdate;
/** @export */
_model_class.constructor.prototype.onSave;



/** @export */
_controller_struct.prototype.render;
/** @export */
_controller_struct.prototype.build;
/** @export */
_controller_struct.prototype.request;
/** @export */
_controller_struct.prototype.requestBatch;
/** @export */
_controller_struct.prototype.requestSync;


/** @export */
_route_struct.to;
/** @export */
_route_struct.action;
/** @export */
_route_struct.type;
/** @export */
_route_struct.field;
/** @export */
_route_struct.limit;
/** @export */
_route_struct.last;
/** @export */
_route_struct.params;
/** @export */
_route_struct.header;
/** @export */
_route_struct.cache;
/** @export */
_route_struct.clear;
/** @export */
_route_struct.async;
/** @export */
_route_struct.default;
/** @export */
_route_struct.error;
/** @export */
_route_struct.filter;
/** @export */
_route_struct.arrayfilter;
/** @export */
_route_struct.sort;
/** @export */
_route_struct.map;
/** @export */
_route_struct.arraymap;


/** @export @dict */
_mapping_struct.mapToView;
/** @export @dict */
_mapping_struct.mapToPayload;
/** @export @dict */
_mapping_struct.mapToData;



/** @export */
_template_struct.data;
/** @export */
_template_struct.map;
/** @export */
_template_struct.if;
/** @export */
_template_struct.loop;
/** @export */
_template_struct.include;
/** @export */
_template_struct.else;



/** @export */
_view_model.data;
/** @export */
_view_model.target;
/** @export */
_view_model.view;
/** @export */
_view_model.default;
/** @export */
_view_model.callback;


/** @export */
_cache_struct.prototype.set;
/** @export */
_cache_struct.prototype.get;
/** @export */
_cache_struct.prototype.remove;
/** @export */
_cache_struct.prototype.clear;


/** @export */
_pattern_struct.tag;
/** @export */
_pattern_struct.attr;
/** @export */
_pattern_struct.text;
/** @export */
_pattern_struct.child;
/** @export */
_pattern_struct.length;



/** @export */
_event_struct.on;
/** @export */
_event_struct.if;
/** @export */
_event_struct.to;
/** @export */
_event_struct.do;
/** @export */
_event_struct.go;
/** @export */
_event_struct.stopBubble;
/** @export */
_event_struct.preventDefault;



/** @export */
_ajax_struct.type;
/** @export */
_ajax_struct.url;
/** @export */
_ajax_struct.params;
/** @export */
_ajax_struct.success;
/** @export */
_ajax_struct.error;
/** @export */
_ajax_struct.header;
/** @export */
_ajax_struct.async;
/** @export */
_ajax_struct.clear;
/** @export */
_ajax_struct.cache;



/** @export */
_storage_interface.prototype.get;
/** @export */
_storage_interface.prototype.set;
/** @export */
_storage_interface.prototype.update;
/** @export */
_storage_interface.prototype.del;
/** @export */
_storage_interface.prototype.clear;
/** @export */
_storage_interface.prototype.keys;



/** @export */
_fatjob_interface.prototype.animate;
/** @export */
_fatjob_interface.prototype.colorHandler;



/** @export */
FAT_CANVAS_CLASS.prototype.add;
/** @export */
FAT_CANVAS_CLASS.prototype.render;


/** @export */
CSSJOB_CLASS.prototype.set;


/** @export */
FAT_SHAPE_CLASS.prototype.moveTo;
/** @export */
FAT_SHAPE_CLASS.prototype.moveBy;
/** @export */
FAT_SHAPE_CLASS.prototype.resize;
/** @export */
FAT_SHAPE_CLASS.prototype.draw;
