goog.provide('Util.Console');
goog.require('CONFIG');

/**
 * @suppress {duplicate}
 */

var Console = (

    DEBUG ? (function(){

        "use strict";

        /** @type {?Element} */
        var dom_console;

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

            if(text){

                if(!dom_console){

                    dom_console = document.getElementById('debug-log');
                }

                if(dom_console){

                    dom_console.appendChild(document.createTextNode(text + '\n'));
                    dom_console.scrollTop = dom_console.scrollHeight;
                }
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

    info: function(param, obj){}
});
