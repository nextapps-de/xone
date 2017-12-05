goog.provide('PLUGIN.Reminder');
goog.require('INTERFACE.Reminder');
goog.require('APP');
goog.require('CONFIG');
goog.require('CORE');

/**
 * @name APP.PLUGIN.Reminder
 * @namespace APP.PLUGIN
 * @type {_reminder_struct}
 */

APP.PLUGIN.Reminder = (function(){

    "use strict";

    /**
     * @constructor
     * @implements {_reminder_struct}
     */

    function Reminder(){

        var cache;

        this.plugin = function(){

            return (

                cache || (

                    (cache = window['cordova']) &&
                    (cache = cache['plugins']) &&
                    (cache = cache['notification']) &&
                    cache['local']
                )
            );
        };
    }

    /**
     * @returns {boolean}
     */

    Reminder.prototype.supported = function(){

        return !!this.plugin();
    };

    /**
     * @param {!Object<string, string|number>} options
     */

    Reminder.prototype.schedule = function(options){

        if(PLATFORM === 'cordova'){

            this.plugin()['schedule'](options);
        }
        else{

            // unsupported
        }
    };

    /**
     * @param {!function(Array<string>):void} callback
     */

    Reminder.prototype.getScheduledIds = function(callback){

        if(PLATFORM === 'cordova'){

            this.plugin()['getScheduledIds'](callback);
        }
        else{

            // unsupported
        }
    };

    /**
     * @param {!string|Array<string>} id
     * @param {Function=} success
     */

    Reminder.prototype.cancel = function(id, success){

        if(PLATFORM === 'cordova'){

            if(CORE.isArray(id)){

                for(var i = 0; i < id.length; i++){

                    this.plugin()['cancel'](id[i], i === id.length - 1 ? success : false);
                }
            }
            else{

                this.plugin()['cancel'](id, success);
            }
        }
        else{

            // unsupported
        }
    };

    /**
     * @param {Function=} success
     */

    Reminder.prototype.cancelAll = function(success){

        if(PLATFORM === 'cordova'){

            this.plugin()['cancelAll'](success);
        }
        else{

            // unsupported
        }
    };

    return new Reminder();

})();

/*
    Examples:
    ---------------------------------------------------------------------------------------------------------

    var options = {
        id:         String,  // A unique id of the notification, best to use a numeric value
        at:         Date,    // This expects a date object
        text:       String,  // The message
        title:      String,  // The title of the message
        every:      String,  // 'minute', 'hour', 'day', 'week', 'month', 'year'
        badge:      Number,  // Displays a numerical badge
        sound:      String,  // The sound to be played (null means no sound)
        json:       String,  // Data to be passed through the notification to your app
        autoClear:  Boolean, // The notification is canceled when the user clicks it
        ongoing:    Boolean, // Prevent clearing the notification (Android only)
    };

    cordova.plugins.notification.local.schedule(options);

    cordova.plugins.notification.local.schedule({
        id         : 1,
        title      : 'I will bother you every minute',
        text       : '.. until you cancel all notifications',
        sound      : null,
        every      : 'minute',
        autoClear  : false,
        at         : new Date(new Date().getTime() + 10*1000)
    });

 */
