goog.provide('CONFIG');
goog.require('INTERFACE');

/** @define {boolean} */
var DEBUG = false;

/** @const */
var CONFIG = {};

/** @define {string} */
CONFIG.ENV = 'production';

/** @define {string} */
CONFIG.RACK = 'default';

/** @define {boolean} */
CONFIG.NO_SCRIPT = false;

/** @define {boolean} */
CONFIG.DEBUG = DEBUG;

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

/** @define {boolean} */
CONFIG.DOM_CACHE_ENABLED = true;

/** @define {number} */
CONFIG.MAX_CACHE_TIME = 300000;

/** @define {string} */
CONFIG.SERVER_HOST = "localhost";

/** @define {number} */
CONFIG.EVENT_DEFAULT_DELAY = 0;
