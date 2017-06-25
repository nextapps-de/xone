goog.provide('PLUGIN.StatusBar');
goog.require('APP');
goog.require('CONFIG');
goog.require('CORE');

/**
 * @name APP.PLUGIN.StatusBar
 * @namespace APP.PLUGIN
 */

APP.PLUGIN.StatusBar = new(

    /**
     * @constructor
     */

    function StatusBarAdapter(){

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

                        if(DEBUG) CORE.console.log('Show Statusbar');

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

                    if(DEBUG) CORE.console.log('Hide Statusbar');
                }
        );
    }
)();
