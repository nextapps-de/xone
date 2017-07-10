goog.provide('CONFIG');

//:= ENVIRONMENTS SETTINGS:=

/**
 * CONFIG
 * @struct
 * @const
 */

var CONFIG = {

    /**
     * Sets the environment type:
     * @type {string}
     */

    RACK: 'webapp', //'cordova' //'alpha' //'stage' //'local'

    /**
     * Turn on/off debug infos to the console:
     * @type {boolean}
     */

    DEBUG: true,

    /**
     * Turn on/off debug infos to be displayed:
     * @type {boolean}
     */

    SHOW_DEBUG: false,

    /**
     * Turn on/off JavaScript:
     * @type {boolean}
     */

    NO_SCRIPT: false,

    /**
     * Turn on/off desktop support:
     * @type {boolean}
     */

    DESKTOP: true,

    /**
     * Force orientation:
     * @type {string}
     */

    FORCE_ORIENTATION: 'landscape', // 'portrait', 'none'

    /**
     * Set minimum Dimension (biggest length):
     * @type {number}
     */

    MIN_DIMENSION: 1024,

    /**
     * Set maximum Dimension (biggest length):
     * @type {number}
     */

    MAX_DIMENSION: 1024,

    /**
     * Set minimum Aspect Ratio:
     * @type {number}
     */

    MIN_ASPECT_RATIO: 0.7,

    /**
     * Set maximum Aspect Ratio:
     * @type {number}
     */

    MAX_ASPECT_RATIO: 1.35,

    /**
     * Turn on/off visibility of StatusBar:
     * @type {boolean}
     */

    HIDE_STATUSBAR: true,

    /**
     * Maximum time which the cache is valid (in ms)
     * @type {number}
     */

    MAX_CACHE_TIME: 300000,

    /**
     * Maximum reserved file storage (in Mb)
     * @type {number}
     */

    MAX_FILE_STORAGE_MB: 25,

    /**
     * @type {string}
     */

    APP_VERSION: '01.00.00',

    /**
     * CONFIG VERSION FOR COMPATIBILTY CHECK
     * @type {number}
     */

    SETTINGS_VERSION: 0.0,

    /**
     * CORE VERSION FOR COMPATIBILTY CHECK
     * @type {number}
     */

    CORE_VERSION: 0.6,

    /**
     * SERVER_HOST
     * @type {string}
     */

    SERVER_HOST: "",

    /**
     * EVENT_DEFAULT_DELAY
     * @type {number}
     */

    EVENT_DEFAULT_DELAY: 0,

    /**
     * START_DELAY
     * @type {number}
     */

    START_DELAY: 500,

    /**
     * DISPLAY_MESSAGE_TIME
     * @type {number}
     */

    DISPLAY_MESSAGE_TIME: 2000,

    /**
     * EMAIL_FEEDBACK
     * @type {string}
     */

    EMAIL_FEEDBACK: 'info@company.com'
};


