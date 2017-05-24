goog.provide("ENV");
goog.require("CONFIG");

/** @define {string} */
CONFIG.PLATFORM = MANIFEST.platform;
/** @define {string} */
var ENV = CONFIG.ENV = MANIFEST.env;
/** @define {boolean} */
var DEBUG = CONFIG.DEBUG;
/** @define {string} */
var RACK = CONFIG.RACK;
