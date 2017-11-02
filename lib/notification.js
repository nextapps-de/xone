goog.provide('PLUGIN.Notification');
goog.require('INTERFACE.Notification');
goog.require('APP');
goog.require('CONFIG');
goog.require('CORE');

/**
 * @name APP.PLUGIN.Notification
 * @namespace APP.PLUGIN
 * @type {_notification_struct}
 */

APP.PLUGIN.Notification = (function(){

    /**
     * @constructor
     * @implements {_notification_struct}
     */

    function Notifications(){}

    /**
     * @returns {boolean}
     */

    Notifications.prototype.supported = function(){

        return !!navigator['notification'];
    };

    /**
     * @param {!Object<string, string|number>} options
     * @param {!function():void=} callback
     */

    Notifications.prototype.alert = function(options, callback){

        if(PLATFORM === 'cordova'){

            navigator['notification']['alert'](

                options.message,
                options.title,
                callback,
                options.button
            );
        }
        else{

            alert(options.message);

            if(callback) callback();
        }
    };

    /**
     * @param {!Object<string, string|number>} options
     * @param {!function(number):void=} callback
     */

    Notifications.prototype.confirm = function(options, callback){

        if(PLATFORM === 'cordova'){

            navigator['notification']['confirm'](

                options.message,
                options.title,
                callback,
                options.buttons
            );
        }
        else{

            callback(

                confirm(options.message) ? 1 : 2
            );
        }
    };

    /**
     * @param {!Object<string, string|number>} options
     * @param {!function(string):void=} callback
     */

    Notifications.prototype.prompt = function(options, callback){

        if(PLATFORM === 'cordova'){

            navigator['notification']['prompt'](

                options.message,
                callback,
                options.title,
                options.buttons,
                options.default
            );
        }
        else{

            callback(

                prompt(options.message) || ''
            );
        }
    };

    /**
     * @param {number=} count
     */

    Notifications.prototype.beep = function(count){

        if(PLATFORM === 'cordova'){

            navigator['notification']['beep'](count || 1);
        }
        else{

            // unsupported
        }
    };

    /**
     * @param {number=} time
     */

    Notifications.prototype.vibrate = function(time){

        if(PLATFORM === 'cordova'){

            navigator['notification']['vibrate'](time || 200);
        }
        else{

            // unsupported
        }
    };

    return new Notifications();

})();

/*
    Examples:
    ---------------------------------------------------------------------------------------------------------

    APP.PLUGIN.Notification.alert({

        message: 'You are the winner!',
        title: 'Game Over',
        buttonName: 'Done'

    }, function(){

        // callback
    });

    APP.PLUGIN.Notification.confirm({

        message: 'You are the winner!',
        title: 'Game Over',
        buttonLabels: [
            'Ja',
            'Nein'
        ]

    }, function(index){

        // callback
    });

    APP.PLUGIN.Notification.prompt({

        message: 'Please enter your name',
        title: 'Registration',
        default: 'Jane Doe',
        buttonLabels: [
            'Ok',
            'Schließen'
        ]

    }, function(result){

        // callback
    });

    APP.PLUGIN.Notification.beep(1);
    APP.PLUGIN.Notification.vibrate(200);

 */
