goog.provide('APP');
goog.require('INTERFACE');
goog.require('CONFIG');
goog.require('CORE');

/**
 * Xone AppKit Framework 1.0
 * Main Application Interface and Namespaces
 * @name APP
 * @namespace APP
 * @struct
 */

var APP = {

    /**
     * @name APP.MODEL
     * @namespace APP
     */
    MODEL: {},

    /**
     * @name APP.VIEW
     * @namespace APP
     * @type {Object<string, Array<_model_helper>>}
     */
    VIEW: {},

    /**
     * @name APP.HTML
     * @namespace HTML
     * @type {Object<string, Array<_template_struct>>}
     */
    HTML: {},

    /**
     * @name APP.CONTROLLER
     * @namespace APP
     * @implements _controller_struct
     */
    CONTROLLER: {},

    /**
     * @name APP.ROUTE
     * @namespace APP
     */
    ROUTE: {},

    /**
     * @name APP.PAYLOAD
     * @namespace APP
     */
    PAYLOAD: {},

    /**
     * @name APP.EVENT
     * @namespace APP
     */
    EVENT: {},

    /**
     * @name APP.HANDLER
     * @namespace APP
     */
    HANDLER: {},

    /**
     * @name APP.HELPER
     * @namespace APP
     */
    HELPER: {},

    /**
     * @name APP.STORAGE
     * @namespace APP
     * @type {_storage_struct}
     */
    STORAGE: {

        /**
         * @name APP.STORAGE.DATA
         * @namespace APP
         */
        DATA: {},

        /**
         * @name APP.STORAGE.CACHE
         * @namespace APP
         */
        CACHE: {},

        /**
         * @name APP.STORAGE.SESSION
         * @namespace APP
         */
        SESSION: {},

        /**
         * @name APP.STORAGE.VIEW
         * @namespace APP
         */
        VIEW: /** @type _storage_struct */ ({}/*new CORE.Storage('View')*/), //window['Rhaboo']['persistent']('View'), //TODO: move to setup

        /**
         * @param {string} val
         * @returns {string}
         */
        compress: function(val){

            return val;
        },

        /**
         * @param {string} val
         * @returns {string}
         */
        decompress: function(val){

            return val;
        }
    },

    /**
     * @name APP.MAPPER
     * @namespace APP
     */
    MAPPER: {},

    /**
     * @name APP.LAYOUT
     * @namespace APP
     */
    LAYOUT: {},

    /**
     * @name APP.VIEWPORT
     * @namespace APP
     */
    VIEWPORT: {},

    /**
     * @name APP.WORKER
     * @namespace APP
     */
    WORKER: {},

    /**
     * @name APP.DEVICE
     * @namespace APP
     */
    DEVICE: {},

    /**
     * @name APP.LANG
     * @namespace APP
     */
    LANG: {},

    /**
     * @name APP.CONFIG
     * @namespace APP
     */
    CONFIG: {

        LANG: 'en',
        PROC: 0,
        GZIP: false,
        PASSIVE_EVENTS: false,
        EVENT_OPTIONS: false,
        SHOW_DEBUG: false,
        SHOW_GRAPH: false,
        SHOW_STATS: false,
        LAYOUT: []
    },

    /**
     * @name APP.VARS
     * @namespace APP
     */
    VARS: {

        CURRENT_USER: {},
        HEADER: {},
        AUTH: null,
        ZOOM: 1,
        WIDTH: 0,
        HEIGHT: 0,
        DPR: Math.max(1, Math.min(3, Math.round(window['devicePixelRatio'] || 1)))
    },

    /**
     * @name APP.STATS
     * @namespace APP
     */
    STATS: {},

    /**
     * @name APP.SETTINGS
     * @namespace APP
     */
    SETTINGS: /** @type _storage_struct */ ({}), //(new CORE.Storage('app_settings')),

    /**
     * @name APP.CACHE
     * @namespace APP
     */
    CACHE: {},

    /**
     * @name APP.CRC32
     * @namespace APP
     */
    CRC32: {},

    /**
     * @name APP.PLUGIN
     * @namespace APP
     */
    PLUGIN: {},

    /**
     * @name APP.INTERFACE
     * @namespace APP
     */
    INTERFACE: {},

    /**
     * @name APP.ADAPTER
     * @namespace APP
     */
    ADAPTER: {},

    /**
     * @name APP.SERVICE
     * @namespace APP
     */
    SERVICE: {},

    /**
     * @name APP.REQUIRE
     * @namespace APP
     */
    REQUIRE: {},

    /**
     * @name APP.CHANGELOG
     * @namespace APP
     */
    CHANGELOG: {},

    /**
     * @name APP.MIGRATE
     * @namespace APP
     */
    MIGRATE: {},

    /**
     * @name APP.INIT
     * @namespace APP
     */
    INIT: function(){},

    /**
     * @name APP.SETUP
     * @namespace APP
     */
    SETUP: function(){

        APP.MAIN();
    },

    /**
     * @name APP.MAIN
     * @namespace APP
     */
    MAIN: function(){

        if(DEBUG) CORE.console.log('Error: no main function found!');
    }
};

goog.provide('APP.EVENT');
goog.provide('APP.HANDLER');
goog.provide('APP.HELPER');
goog.provide('APP.MAPPER');
goog.provide('APP.PAYLOAD');
goog.provide('APP.ROUTE');
goog.provide('APP.INTERFACE');
goog.provide('APP.SERVICE');
goog.provide('APP.PLUGIN');
goog.provide('APP.LANG');
goog.provide('APP.ADAPTER');
