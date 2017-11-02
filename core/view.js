goog.provide('APP.VIEW');
goog.require('INTERFACE.VIEW');
goog.require('APP');
goog.require('CORE');

/**
 * Xone View Model & Layout Controller
 * @implements _view_model
 * @const
 */

APP.VIEW = (function(){

    var current_animation = null;
    var current_view = "";
    var view_index = [];
    var popup_index = [];
    var history = [];

    return {

        current_view: function(){

            return current_view;
        },

        last_view: function(){

            return current_view === view_index[0] ? view_index[1] : view_index[0];
        },

        history: function(){

            return history;
        },

        remove: function(view_id){

            var node = CORE.getById(view_id);
            var index;

            node.parentNode.removeChild(node);

            if((index = view_index.indexOf(view_id)) !== -1){

                view_index.splice(index, 1);
            }

            if((index = popup_index.indexOf(view_id)) !== -1){

                popup_index.splice(index, 1);
            }

            while((index = history.indexOf(view_id)) !== -1){

                history.splice(index, 1);
            }

            if(current_view === view_id){

                current_view = "";
            }

            APP.VIEW[view_id] = null;
        },

        /**
         * @param {!string} source_view
         * @param {!string=} target_view
         */

        show: function(source_view, target_view){

            if(DEBUG) CORE.console.log('Current View: ' + current_view);

            if(source_view === 'tabbar'){

                CORE.setStyle('xone-tabbar', 'visibility', 'visible');
                return;
            }

            if(!target_view){

                target_view = source_view;
                source_view = current_view;
            }

            if(DEBUG) CORE.console.log('Show View: ' + source_view + ' > ' + target_view);

            if(target_view){

                //if(target_view !== current_view){

                    CORE.addClass('#' + target_view, 'show');

                    var is_popup = CORE.getById(target_view).getAttribute('role') !== 'main';
                    var target_index = is_popup ? popup_index : view_index;
                    var index = target_index.indexOf(target_view);

                    if(index !== -1){

                        if(index > 0){

                            CORE.move(target_index, index, 0);
                            index = 0;
                        }
                    }
                    else{

                        target_index.unshift(target_view);
                        index = 0;
                    }

                    //updateViewIndex(target_index, is_popup ? 10 : 0);

                    CORE.setStyle('#' + target_view, {

                        'visibility': 'visible'
                        //'pointerEvents': 'auto',
                        //'zIndex': target_index.length - index + (is_popup ? 10 : 0)
                    });

                    var sections = CORE.queryAll('#' + target_view + ' xone-section');

                    for(var i = 0; i < sections.length; i++){

                        sections[i].scrollTop = 0;
                        sections[i].scrollLeft = 0;
                    }

                    history.push(current_view = target_view);

                    if(source_view){

                        is_popup = CORE.getById(source_view).getAttribute('role') !== 'main';
                        target_index = is_popup ? popup_index : view_index;
                        index = target_index.indexOf(source_view);

                        //updateViewIndex(target_index, is_popup ? 10 : 0);

                        // CORE.setStyle('#' + source_view, {
                        //
                        //     //'pointerEvents': 'none',
                        //     //'zIndex': target_index.length - index + (is_popup ? 10 : 0)
                        // });
                    }
                }
        },

        hide: function(view){

            if(view === 'tabbar'){

                CORE.setStyle('xone-tabbar', 'visibility', 'hidden');
                return;
            }

            var is_popup = CORE.getById(view).getAttribute('role') !== 'main';
            var target_index = is_popup ? popup_index : view_index;
            var index = target_index.indexOf(view);

            if(index !== -1){

                if(index < target_index.length - 1){

                    CORE.move(target_index, index, index + 1);
                    //updateViewIndex(target_index, is_popup ? 10 : 0);
                    index += 1;
                }
            }
            else{

                target_index.push(view);
                //updateViewIndex(target_index, is_popup ? 10 : 0);
                index = target_index.length - 1;
            }

            CORE.removeClass('#' + view, 'show');

            CORE.setStyle('#' + view, {

                //'visibility': 'hidden',
                //'pointerEvents': 'none',
                //'zIndex': target_index.length - index + (is_popup ? 10 : 0)
                //'transform': 'translate3d(100%, 0, 0)'
            });

            if(is_popup){

                history.splice(history.lastIndexOf(current_view), 1);
            }

            current_view = view_index[0];

            if(DEBUG) CORE.console.log('Hide View: ' + view + ' > ' + current_view);
        },

        slideIn: function(from_view, to_view){

            if(!to_view){

                to_view = from_view;
                from_view = view_index[0];
            }

            CORE.addClass('#' + from_view, 'hide');

            this.show(from_view, to_view);
        },

        slideOut: function(from_view, to_view){

            if(!to_view){

                to_view = view_index[0];
            }

            CORE.removeClass('#' +  to_view, 'hide');

            this.hide(from_view, to_view);
        },

        slideInBottom: function(from_view, to_view){

            if(!to_view){

                to_view = from_view;
                from_view = view_index[0];
            }

            this.show(from_view, to_view);
        },

        slideOutBottom: function(from_view, to_view){

            if(!to_view){

                to_view = view_index[0];
            }

            this.hide(from_view, to_view);
        }
    };

    /* Helper */

    // TODO: remove this lazy fix
    function updateViewIndex(target_index, offset){

        for(var i = 0; i < target_index.length; i++){

            CORE.setStyle('#' + target_index[i], 'zIndex', target_index.length - i + (offset || 0));
        }
    }

    // ----------------------------------------------------------
    // Native Transition Helpers

    /**
     * @const
     */

    function slideDetails(current_tab){

        if(APP.PLUGIN.Transition.supported()){

            APP.PLUGIN.Transition.slide({

                "direction"        : "left",
                "duration"         :  350,
                "slowdownfactor"   :    4,
                "iosdelay"         :    0,
                "androiddelay"     :    0,
                "winphonedelay"    :    0,
                "fixedPixelsTop"   :   Math.round(CORE.queryOne('header').clientHeight * APP.VIEWPORT.ZOOM),
                "fixedPixelsBottom":    0
            });
        }
    }

    /**
     * @const
     */

    function closeDetails(current_tab){

        if(APP.PLUGIN.Transition.supported()){

            APP.PLUGIN.Transition.slide({

                "direction": "right",
                "duration": 300,
                "slowdownfactor": 4,
                "iosdelay": 0,
                "androiddelay": 0,
                "winphonedelay": 0,
                "fixedPixelsTop": Math.round(CORE.getById('navigation').clientHeight * APP.VIEWPORT.ZOOM),
                "fixedPixelsBottom": 0
            });
        }
    }

    /**
     * @const
     */

    function popupInfo(){

        if(APP.PLUGIN.Transition.supported()){

            APP.PLUGIN.Transition.drawer({

                "origin": "left",
                "action": "open",
                "duration": 350,
                "iosdelay": 0,
                "androiddelay": 0,
                "winphonedelay": 0
            });
        }
    }

    /**
     * @const
     */

    function closeInfo(){

        APP.PLUGIN.Transition.drawer({

            "origin"           : "left",
            "action"           : "close",
            "duration"         :  350,
            "iosdelay"         :    0,
            "androiddelay"     :    0,
            "winphonedelay"    :    0
        });
    }

})();

/* Exports */

APP.VIEW.slideOutLeft = APP.VIEW.slideOut;
APP.VIEW.slideInLeft = APP.VIEW.slideInRight = APP.VIEW.slideInTop = APP.VIEW.slideIn;
