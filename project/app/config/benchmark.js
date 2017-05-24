goog.provide('CONFIG');

// == ENVIRONMENTS SETTINGS ==

/**
 * The main config descriptor
 * @struct
 * @name CONFIG
 * @namespace CONFIG Application
 */

var CONFIG = {};

/**
 * Sets the environment type:
 * @define {string}
 */

CONFIG.RACK = 'local'; //'alpha' //'stage' //'local'

/**
 * Turn on/off debug infos to the console:
 * @define {boolean}
 */

CONFIG.DEBUG = true;

/**
 * Turn on/off debug infos to be displayed:
 * @define {boolean}
 */

CONFIG.SHOW_DEBUG = false;

/**
 * Turn on/off JavaScript:
 * @define {boolean}
 */

CONFIG.NO_SCRIPT = false;

/**
 * Turn on/off desktop support:
 * @define {boolean}
 */

CONFIG.DESKTOP = true;

/**
 * Force orientation:
 * @define {string}
 */

CONFIG.FORCE_ORIENTATION = 'landscape'; // 'portrait', 'none'

/**
 * Set minimum Dimension (biggest length):
 * @define {number}
 */

CONFIG.MIN_DIMENSION = 1024;

/**
 * Set maximum Dimension (biggest length):
 * @define {number}
 */

CONFIG.MAX_DIMENSION = 1024;

/**
 * Set minimum Aspect Ratio:
 * @define {number}
 */

CONFIG.MIN_ASPECT_RATIO = 0.7;

/**
 * Set maximum Aspect Ratio:
 * @define {number}
 */

CONFIG.MAX_ASPECT_RATIO = 1.35;

/**
 * Turn on/off visibility of StatusBar:
 * @define {boolean}
 * @const
 */

CONFIG.HIDE_STATUSBAR = true;

/**
 * Maximum time which the cache is valid (in ms)
 * @define {number}
 */

CONFIG.MAX_CACHE_TIME = 300000;

/**
 * Maximum reserved file storage (in Mb)
 * @define {number}
 */

CONFIG.MAX_FILE_STORAGE_MB = 5;

/**
 * @define {string}
 */

CONFIG.APP_VERSION = '01.00.00';

/**
 * CONFIG VERSION FOR COMPATIBILTY CHECK
 * @define {number}
 */

CONFIG.SETTINGS_VERSION = 0.0;

/**
 * CORE VERSION FOR COMPATIBILTY CHECK
 * @define {number}
 */

CONFIG.CORE_VERSION = 0.6;

/**
 * SERVER_HOST
 * @define {string}
 */

CONFIG.SERVER_HOST = "";

/**
 * EVENT_DEFAULT_DELAY
 * @define {number}
 */

CONFIG.EVENT_DEFAULT_DELAY = 0;

/**
 * START_DELAY
 * @define {number}
 */

CONFIG.START_DELAY = 500;

/**
 * DISPLAY_MESSAGE_TIME
 * @define {number}
 */

CONFIG.DISPLAY_MESSAGE_TIME = 2000;

/**
 * EMAIL_FEEDBACK
 * @define {string}
 */

CONFIG.EMAIL_FEEDBACK = 'info@company.com';

/**
 * DOM_CACHE_ENABLED
 * @define {boolean}
 */

CONFIG.DOM_CACHE_ENABLED = true;
