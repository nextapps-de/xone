goog.provide('Util.Console');
goog.require('CONFIG');

/**
 * @define {number}
 */

var CONSOLE_MAX_LINES = 1000;

/**
 * @implements {_console_interface}
 * @suppress {duplicate}
 */

var Console = (


    DEBUG ? (function(){

        "use strict";

        /**
         * @type {?Element}
         */

        var dom_console;

        /**
         * @type {string}
         */

        var buffer = "";

        return {

            /**
             * @param {string|number=} text
             * @param {*=} obj
             * @param {string=} color
             */

            log: log,

            /**
             * @param {string|number=} param
             * @param {*=} obj
             */

            warn: function(param, obj){

                log(param, obj, 'orange');
            },

            /**
             * @param {string|number=} param
             * @param {*=} obj
             */

            err: function(param, obj){

                log(param, obj, 'red');
            },

            /**
             * @param {string|number=} param
             * @param {*=} obj
             */

            info: function(param, obj){

                log(param, obj, 'green');
            },

            /**
             *
             */

            flush: function(){

                if(CONFIG.SHOW_DEBUG){

                    if(!dom_console){

                        dom_console = document.getElementById('debug-log');
                    }

                    if(dom_console){

                        if(dom_console.children.length > CONSOLE_MAX_LINES){

                            dom_console.removeChild(dom_console.firstChild);
                        }

                        dom_console.appendChild(document.createTextNode(buffer));
                        dom_console.scrollTop = dom_console.scrollHeight;
                    }

                    buffer = "";
                }
            }
        };

        /**
         * @param {string|number=} text
         * @param {*=} obj
         * @param {string=} color
         */

        function log(text, obj, color){

            if(color){

                if(typeof obj !== 'undefined') window.console.log('%c' + text, 'color: ' + color, obj);
                else window.console.log('%c' + text, 'color: ' + color);
            }
            else{

                if(typeof obj !== 'undefined') window.console.log(text, obj);
                else window.console.log(text);
            }

            if(CONFIG.SHOW_DEBUG){

                buffer += text + '\n';
            }
        }
    })()
:{
    /**
     * @param {string|number=} text
     * @param {*=} obj
     * @param {string=} color
     */

    log: function(text, obj, color){},

    /**
     * @param {string|number=} param
     * @param {*=} obj
     */

    warn: function(param, obj){},

    /**
     * @param {string|number=} param
     * @param {*=} obj
     */

    err: function(param, obj){},

    /**
     * @param {string|number=} param
     * @param {*=} obj
     */

    info: function(param, obj){},

    /**
     *
     */

    flush: function(){}
});
