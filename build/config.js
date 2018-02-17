goog.provide('CONFIG');
//goog.require('INTERFACE');
//goog.require('AMD');

/** @const */
var CONFIG = {};

/** @define {boolean} */
CONFIG.DEBUG = false;

/** @define {string} */
//CONFIG.RACK = 'default';

/** @define {boolean} */
CONFIG.NO_SCRIPT = false;

/** @define {boolean} */
CONFIG.SHOW_DEBUG = false;

/** @define {boolean} */
CONFIG.DESKTOP = true;

/** @define {string} */
CONFIG.FORCE_ORIENTATION = 'none';

/** @define {number} */
CONFIG.MIN_DIMENSION = 1024;

/** @define {number} */
CONFIG.MAX_DIMENSION = 1024;

/** @define {number} */
CONFIG.MIN_ASPECT_RATIO = 0.7;

/** @define {number} */
CONFIG.MAX_ASPECT_RATIO = 1.35;

/** @define {boolean} */
CONFIG.HIDE_STATUSBAR = true;

/** @define {number} */
CONFIG.SETTINGS_VERSION = 0.0;

/** @define {number} */
CONFIG.CORE_VERSION = 0.6;

/** @define {number} */
CONFIG.MAX_CACHE_TIME = 300000;

/** @define {string} */
CONFIG.SERVER_HOST = "localhost";

/** @define {number} */
CONFIG.EVENT_DEFAULT_DELAY = 0;

/** @define {string} */
CONFIG.STORAGE_PREFIX = '';

// todo
/** @define {boolean} */
CONFIG.STORE_VIEWS_OFFLINE = true;

// Optimizations

/** @define {boolean} */
CONFIG.ENABLE_DOM_CACHE = true;

/** @define {boolean} */
CONFIG.ENABLE_STYLE_CACHE = true;

/** @define {boolean} */
CONFIG.ENABLE_CLASS_CACHE = true;

/** @define {boolean} */
CONFIG.ENABLE_HTML_CACHE = true;

/** @define {boolean} */
CONFIG.ENABLE_EVENT_CACHE = true;

/** @define {boolean} */
CONFIG.ENABLE_MODEL_CACHE = true;

/** @define {boolean} */
CONFIG.ENABLE_STORAGE_CACHE = true;

/** @define {boolean} */
CONFIG.ENABLE_MAPPER_CACHE = true;

// todo
/** @define {boolean} */
CONFIG.ENABLE_ROUTE_CACHE = false;

// todo
/** @define {boolean} */
CONFIG.ENABLE_VIEW_CACHE = false;

var Debugger = function(){};
