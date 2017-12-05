goog.provide('PLUGIN.ActionSheet');
goog.require('INTERFACE.ActionSheet');
goog.require('APP');
goog.require('CONFIG');
goog.require('CORE');

/**
 * @name APP.PLUGIN.ActionSheet
 * @namespace APP.PLUGIN
 * @type {_actionsheet_struct}
 */

APP.PLUGIN.ActionSheet = (function(){

    "use strict";

    /**
     * @constructor
     * @implements {_actionsheet_struct}
     */

    function ActionSheet(){}

    /**
     * @returns {boolean}
     */

    ActionSheet.prototype.supported = function(){

        return !!(window['plugins'] && window['plugins']['actionsheet']);
    };

    /**
     * @param {!Object<string, string|number>} options
     * @param {!function(number):void=} callback
     */

    ActionSheet.prototype.show = function(options, callback){

        if(PLATFORM === 'cordova'){

            window['plugins']['actionsheet']['show'](options, callback);
        }
        else{

            // TODO
        }
    };

    ActionSheet.prototype.hide = function(){

        if(PLATFORM === 'cordova'){

            window['plugins']['actionsheet']['hide']();
        }
        else{

            // TODO
        }
    };

    return new ActionSheet();

})();

/*
    Examples:
    ---------------------------------------------------------------------------------------------------------

    var options = {

        'androidTheme': window['plugins']['actionsheet']['ANDROID_THEMES']['THEME_DEVICE_DEFAULT_LIGHT'], // default is THEME_TRADITIONAL
        'title': 'What do you want with this image?',
        'subtitle': 'Choose wisely, my friend', // supported on iOS only
        'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
        'androidEnableCancelButton' : true, // default false
        'winphoneEnableCancelButton' : true, // default false
        'addCancelButtonWithLabel': 'Cancel',
        'addDestructiveButtonWithLabel' : 'Delete it',
        'position': [20, 40], // for iPad pass in the [x, y] position of the popover
        'destructiveButtonLast': true // you can choose where the destructive button is shown
    };

    APP.PLUGIN.ActionSheet.show(options, callback));
 */
