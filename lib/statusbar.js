goog.provide('PLUGIN.Statusbar');
goog.require('APP');
goog.require('CONFIG');
goog.require('CORE');

/**
 * @name APP.PLUGIN.Statusbar
 * @namespace APP.PLUGIN
 */

APP.PLUGIN.Statusbar = new(

    /**
     * @constructor
     */

    function StatusbarAdapter(){

        "use strict";

        /**
         * @type {Function}
         */

        this.show = (

            window['StatusBar'] ?

                function(){

                    CORE.paint(function(){

                        window['StatusBar']['show']();

                    }, 200);
                }
            :
                function(){

                    CORE.paint(function(){

                        if(DEBUG) Console.log('Show Statusbar');

                    }, 200);
                }
        );

        /**
         * @type {Function}
         */

        this.hide = (

            window['StatusBar'] ?

                window['StatusBar']['hide']
            :
                function(){

                    if(DEBUG) Console.log('Hide Statusbar');
                }
        );
    }
)();
