goog.provide("ENV");
goog.require("CONFIG");
goog.require('PLATFORM');

/** @define {string} */
CONFIG.PLATFORM = PLATFORM;
/** @define {string} */
CONFIG.ENV = 'production';

/** @define {string} */
var ENV = CONFIG.ENV;
/** @define {boolean} */
var DEBUG = CONFIG.DEBUG;

//var RACK = CONFIG.RACK;
