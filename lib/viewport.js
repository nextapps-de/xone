goog.provide('APP.VIEWPORT');
goog.require('CORE');
goog.require('CONFIG');
/*goog.require('APP.LAYOUT');*/

/** @const */

APP.VIEWPORT = (function(){

    "use strict";

    /*
    var forceOrientation = function(){

        if(DEBUG) Console.log('Setup Orientation: ' + CONFIG.FORCE_ORIENTATION);

        var devicePixelRatio = window['devicePixelRatio'] || 1;
        var window_width = window.innerWidth / devicePixelRatio;
        //var window_height = window.innerHeight / devicePixelRatio;

        var window_height = screen.height - (screen.height - window.innerHeight);

        var orientation = (

            window.innerWidth > window.innerHeight ?

                'landscape'
            :
                window.innerHeight > window.innerWidth ?

                    'portrait'
                :
                    'square'
        );

        if(Math.abs(window['orientation']) === 90) { // Landscape

            //window.document.documentElement.style.width = screen.width + 'px';
            //window.document.documentElement.style.height = (value || screen.height) + 'px';

            CORE.setStyle(window.document.body, {

                width: screen.width + 'px',
                height: (screen.height) + 'px',
                margin: '0',
                maxWidth: 'auto',
                transform: 'rotate(90deg) translate(-' + ((screen.height - screen.width) / 2) + 'px, ' + ((screen.width - screen.height) / 2) + 'px' + ')'
            });
            //setDeviceStatusBarSize(true);
        }
        else{

            CORE.setStyle(window.document.body, {

                width: screen.width + 'px',
                height: (window_height) + 'px',
                transform: 'rotate(0deg) translate(0, 0)'
            });

            //window.document.documentElement.style.width = screen.width + 'px';
            // window.document.documentElement.style.height = (value || screen.height) + 'px';

            //setDeviceStatusBarSize(false);
        }
    };
    */

    var timer = null;

    var register_viewport_update = function(){

        // NOTE: workaround for lazy viewport rendering during orientation change

        CORE.paint(setupViewportAndZoom, 0);
        CORE.paint(setupViewportAndZoom, 100);
        CORE.paint(setupViewportAndZoom, 200);
        CORE.paint(setupViewportAndZoom, 500);
        CORE.paint(setupViewportAndZoom, 1000);
    };

    //CORE.paint(function(){

        /* TODO: Remove Initial execution (ACTUAL REQUIRES VIEWPORT PROPERTIES!!!!) */

        setupViewportAndZoom();

        if(CORE.System.isMobile) {

            if(CONFIG.FORCE_ORIENTATION && CONFIG.FORCE_ORIENTATION !== 'none') {

                /* Lock screen orientation */

                lock_orientation(CONFIG.FORCE_ORIENTATION);

                /* Define orientation event handler */

                //window.addEventListener('orientationchange', register_viewport_update); // forceOrientation

                /* Initial execution */

                //forceOrientation();
            }
        }

        /* Register orientation event trigger */

        //else{

            window.addEventListener('resize', register_viewport_update);
        //}

        /* Setup navigation header padding for iPhone/iOS */

        // if(!CONFIG.HIDE_STATUSBAR && CORE.System.isMobile && (screen.height === window.innerHeight)) {
        //
        //     //TODO: FIX Statusbar Height Calculation
        //
        //     var statusbar_height = CORE.Math.max(screen.height - screen.availHeight - 20 /*+ (window.navigator['standalone'] ? 40 : 0)*/, CONFIG.ENV === 'production' ? 20 : 0);
        //     var navbar_height = 69 - statusbar_height;
        //
        //     // NOTE: iOS 9.3.2 has currently a broken status bar handler
        //     //if(CORE.System.isIphone && (screen.height - screen.availHeight !== 0)) statusbar_height -= (screen.height - screen.availHeight);
        //
        //     if(statusbar_height > 0){
        //
        //         if(window['StatusBar']){
        //
        //             CORE.addCssRule('.navbar.status-bar', {
        //
        //                 'height': (navbar_height + statusbar_height) + 'pt',
        //                 'padding-top': statusbar_height + 'pt'
        //             });
        //
        //             CORE.addCssRule('.viewport.status-bar', 'top', (navbar_height + statusbar_height) + 'pt');
        //         }
        //         else{
        //
        //             CORE.addCssRule('.navbar', {
        //
        //                 'height': (navbar_height + statusbar_height) + 'pt',
        //                 'padding-top': statusbar_height + 'pt'
        //             });
        //
        //             CORE.addCssRule('.sticky', {
        //
        //                 'height': (navbar_height + statusbar_height) + 'pt',
        //                 'padding-top': statusbar_height + 'pt'
        //             });
        //
        //             CORE.addCssRule('.viewport', 'top', (navbar_height + statusbar_height) + 'pt');
        //         }
        //
        //         // CORE.setStyle(CORE.getByClass('navbar'), {
        //         //
        //         //     'height': (48 + statusbar_height) + 'px',
        //         //     'paddingTop': statusbar_height + 'px'
        //         // });
        //         //
        //         // CORE.setStyle(CORE.getByClass('viewport'), {
        //         //
        //         //     'top': (48 + statusbar_height) + 'px'
        //         // });
        //     }
        // }

        /*
         else if(CORE.System.isAndroid) {

         if(window['AndroidFullScreen']) {

         window['AndroidFullScreen']['immersiveHeight'](function(value){

         window['AndroidFullScreen']['immersiveMode'](function(){

        */

    //}, 200);

    function setupViewportAndZoom(){

        //if(ENV === 'test') return;

        if(DEBUG) Console.log('Setup Viewport');

        var window_width = window.innerWidth;
        var window_height = window.innerHeight;
        var newWidth = window_width;
        var newHeight = window_height;
        var zoom = 1;

        // CORE.forceStyle(window.document.body, {
        //
        //     width: '',
        //     height: '',
        //     transform: ''
        // });

        // AUTO-ZOOM: PORTRAIT MODE (HEIGHT-RELATED)

        if(CONFIG.FORCE_ORIENTATION === 'portrait'){

            // biggest length too small (force downscaling)

            if(newHeight < CONFIG.MIN_DIMENSION){

                newHeight = CONFIG.MIN_DIMENSION;
                newWidth = Math.round(newHeight * (window_width / window_height));
            }

            // biggest length too big (force upscaling)

            else if(newHeight > CONFIG.MAX_DIMENSION){

                newHeight = CONFIG.MAX_DIMENSION;
                newWidth = Math.round(newHeight * (window_width / window_height));
            }

            // adjust minimum aspect ratio

            if((newHeight / newWidth) < CONFIG.MIN_ASPECT_RATIO) {

                newWidth = Math.round(newHeight / CONFIG.MIN_ASPECT_RATIO);
            }

            // determine zoom level

            zoom = window_height / newHeight;

            // adjust maximum aspect ratio

            if((newHeight / newWidth) > CONFIG.MAX_ASPECT_RATIO) {

                newWidth = Math.round(newHeight / CONFIG.MAX_ASPECT_RATIO);

                // determine new zoom level

                zoom = window_width / newWidth;
            }
        }

        // AUTO-ZOOM: LANDSCAPE MODE (WIDTH-RELATED)

        else if(CONFIG.FORCE_ORIENTATION === 'landscape'){

            // biggest length too small (force downscaling)

            if(newWidth < CONFIG.MIN_DIMENSION){

                newWidth = CONFIG.MIN_DIMENSION;
                newHeight = Math.round(newWidth * (window_height / window_width));
            }

            // biggest length too big (force upscaling)

            if(newWidth > CONFIG.MAX_DIMENSION){

                newWidth = CONFIG.MAX_DIMENSION;
                newHeight = Math.round(newWidth * (window_height / window_width));
            }

            // adjust minimum aspect ratio

            if((newWidth / newHeight) < CONFIG.MIN_ASPECT_RATIO) {

                newHeight = Math.round(newWidth / CONFIG.MIN_ASPECT_RATIO);
            }

            // determine zoom level

            zoom = window_width / newWidth;

            // adjust maximum aspect ratio

            if((newWidth / newHeight) > CONFIG.MAX_ASPECT_RATIO) {

                newHeight = Math.round(newWidth / CONFIG.MAX_ASPECT_RATIO);

                // determine new zoom level

                zoom = window_height / newHeight;
            }
        }

        APP.VARS.ZOOM = zoom;
        APP.VARS.WIDTH = newWidth;
        APP.VARS.HEIGHT = newHeight;

        if((newHeight !== window_height) || (newWidth !== window_width)) {

            CORE.setStyle(window.document.body, {

                'width': newWidth + 'px',
                'height': newHeight + 'px',
                'transform': 'scale(' + zoom + ') translate(' + ((window_width - newWidth) / zoom / 2) + 'px, ' + ((window_height - newHeight) / zoom / 2) + 'px)'
            });
        }
        else{

            CORE.setStyle(window.document.body, {

                'width': '',
                'height': '',
                'transform': ''
            });
        }

        if(DEBUG) Console.log('Resolution (W/H): ' + window_width + ' x ' + window_height + ' --> ' + newWidth + ' x ' + newHeight + ' (Zoom: ' + zoom + ')');
    }

    function lock_orientation(lock_orientation){

        if(DEBUG) Console.log("Lock Orientation: " + lock_orientation);

        try {

            /* Lock orientation through Cordova plugin */

            if(window['plugins'] && window['plugins']['orientationLock']) {

                window['plugins']['orientationLock']['lock'](lock_orientation).catch(function(){});
            }

            /* Lock orientation through HTML5 natives */

            var orientation = window.screen['orientation'];
            var prefix = CORE.prefix.lowercase;

            if(orientation['lock']) {

                orientation['lock'](lock_orientation).catch(function(){});
            }
            else if(window['lockOrientation']) {

                window['lockOrientation'](lock_orientation + '-primary').catch(function(){});
            }
            else if(window[prefix + 'LockOrientation']) {

                window[prefix + 'LockOrientation'](lock_orientation + '-primary').catch(function(){});
            }
            else if(window['lockOrientationUniversal']) {

                window['lockOrientationUniversal'](lock_orientation + '-primary').catch(function(){});
            }
            else if(orientation && orientation['lock']) {

                orientation['lock'](lock_orientation + '-primary').catch(function(){});
            }
            else {

                orientation = window.screen[prefix + 'Orientation'];

                if(orientation && orientation['lock']) {

                    orientation['lock'](lock_orientation + '-primary').catch(function(){});
                }
            }
        }
        catch(e){}
    }

    return {

        /* Read-only constants */

        WIDTH: APP.VARS.WIDTH,
        HEIGHT: APP.VARS.HEIGHT,
        ZOOM: APP.VARS.ZOOM,
        SCALE: APP.VARS.ZOOM,
        // TODO
        ASPECT_RATIO: "unsupported",
        // TODO
        ORIENTATION: "unsupported",

        /* Helper methods */

        update: register_viewport_update,
        lockOrientation: lock_orientation
    };

})();
