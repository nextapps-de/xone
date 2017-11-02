goog.provide('PLUGIN.Transition');
goog.require('INTERFACE.Transition');
goog.require('APP');
goog.require('CONFIG');
goog.require('CORE');

/**
 * @name APP.PLUGIN.Transition
 * @namespace APP.PLUGIN
 * @type {_transition_struct}
 */

APP.PLUGIN.Transition = (function(){

    /**
     * @constructor
     * @implements {_transition_struct}
     */

    function Transition(){}

    /**
     * @returns {boolean}
     */

    Transition.prototype.supported = function(){

        return !!(window['plugins'] && window['plugins']['nativepagetransitions']);
    };

    /**
     * @param {Object<string, string|number>} options
     * @param {Function|string=} href_or_callback
     * @param {Function=} fallback
     */

    Transition.prototype.slide = function(options, href_or_callback, fallback){

        this.callTransition(

            'slide',
            options,
            href_or_callback,
            fallback
        );
    };

    /**
     * @param {Object<string, string|number>} options
     * @param {Function|string=} href_or_callback
     * @param {Function=} fallback
     */

    Transition.prototype.flip = function(options, href_or_callback, fallback){

        this.callTransition(

            'flip',
            options,
            href_or_callback,
            fallback
        );
    };

    /**
     * @param {Object<string, string|number>} options
     * @param {Function|string=} href_or_callback
     * @param {Function=} fallback
     */

    Transition.prototype.fade = function(options, href_or_callback, fallback){

        this.callTransition(

            'fade',
            options,
            href_or_callback,
            fallback
        );
    };

    /**
     * @param {Object<string, string|number>} options
     * @param {Function|string=} href_or_callback
     * @param {Function=} fallback
     */

    Transition.prototype.drawer = function(options, href_or_callback, fallback){

        this.callTransition(

            'drawer',
            options,
            href_or_callback,
            fallback
        );
    };

    // iOS only:

    /**
     * @param {Object<string, string|number>} options
     * @param {Function|string=} href_or_callback
     * @param {Function=} fallback
     */

    Transition.prototype.curl = function(options, href_or_callback, fallback){

        this.callTransition(

            'curl',
            options,
            href_or_callback,
            fallback
        );
    };

    /**
     * @param {Function=} callback
     * @param {Function=} fallback
     */

    Transition.prototype.execute = function(callback, fallback){

        if(PLATFORM === 'cordova'){

            window['plugins']['nativepagetransitions']['executePendingTransition'](

                // called when the animation has finished
                function(msg){

                    if(CONFIG.DEBUG) CORE.console.log("Success: " + msg);

                    if(callback) callback();
                },

                // called in case you pass in weird values
                function(msg){

                    if(CONFIG.DEBUG) CORE.console.err(msg);
                }
            );
        }
        else{

            if(fallback) fallback(callback);
            else if(callback) callback();
        }
    };

    /**
     * @param {Function=} callback
     * @param {Function=} fallback
     */

    Transition.prototype.cancel = function(callback, fallback){

        if(PLATFORM === 'cordova'){

            window['plugins']['nativepagetransitions']['cancelPendingTransition'](

                // called when the screenshot was hidden (almost instantly)
                function(msg){

                    if(CONFIG.DEBUG) CORE.console.log("Success: " + msg);

                    if(callback) callback();
                }
            );
        }
        else{

            if(fallback) fallback(callback);
            else if(callback) callback();
        }
    };

    /**
     * @param {!string} type
     * @param {Object<string, string|number>|string=} options
     * @param {Function|string=} href_or_callback
     * @param {Function=} fallback
     */

    Transition.prototype.callTransition = function(type, options, href_or_callback, fallback){

        if(PLATFORM === 'cordova'){

            if(typeof options === 'string'){

                href_or_callback = options;
                options = {};
            }

            if(typeof href_or_callback === 'string'){

                options["href"] = href_or_callback;
            }

            window['plugins']['nativepagetransitions'][type](

                options,

                // called when the animation has finished
                function(msg){

                    if(CONFIG.DEBUG) CORE.console.log("Success: " + msg);

                    if(typeof href_or_callback === 'function'){

                        href_or_callback();
                    }
                },

                // called in case you pass in weird values
                function(msg){

                    if(CONFIG.DEBUG) CORE.console.err(msg);
                }
            );
        }
        else{

            if(fallback) fallback(href_or_callback);
            else if(typeof href_or_callback === 'function') href_or_callback();
        }
    };

    return new Transition();

})();

/*
    Examples:
    ---------------------------------------------------------------------------------------------------------

    APP.PLUGIN.Transition.slide({

        "direction"        : "left", // 'left|right|up|down', default 'left' (which is like 'next')
        "duration"         :  350,   // in milliseconds (ms), default 400
        "slowdownfactor"   :    4,   // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
        //"slidePixels"    :   20,   // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
        "iosdelay"         :    0,   // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"     :    0,   // same as above but for Android, default 70
        "winphonedelay"    :    0,   // same as above but for Windows Phone, default 200,
        "fixedPixelsTop"   :   Math.round(CORE.getById('navigation').clientHeight * APP.VIEWPORT.ZOOM),   // the number of pixels of your fixed header, default 0 (iOS and Android)
        "fixedPixelsBottom":    0    // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
    });

    APP.PLUGIN.Transition.flip({

        "direction"      : "up", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
        "duration"       :  600, // in milliseconds (ms), default 400
        "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"   :  100, // same as above but for Android, default 70
        "winphonedelay"  :  150  // same as above but for Windows Phone, default 200
    });


    APP.PLUGIN.Transition.fade({

        "duration"       :  600, // in milliseconds (ms), default 400
        "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"   :  100
    });

    APP.PLUGIN.Transition.drawer({

        "origin"         : "left", // 'left|right', open the drawer from this side of the view, default 'left'
        "action"         : "open", // 'open|close', default 'open', note that close is not behaving nicely on Crosswalk
        "duration"       :    300, // in milliseconds (ms), default 400
        "iosdelay"       :     50  // ms to wait for the iOS webview to update before animation kicks in, default 60
    });


    APP.PLUGIN.Transition.curl({

        "direction"      : "up", // 'up|down', default 'up'
        "duration"       :  600, // in milliseconds (ms), default 400
        "iosdelay"       :   50  // ms to wait for the iOS webview to update before animation kicks in, default 60
    });

 */
