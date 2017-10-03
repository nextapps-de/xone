goog.provide('APP.LAYOUT');
goog.require('APP.CONTROLLER');
goog.require('APP.EVENT');

(function(LAYOUT, CONTROLLER, STORAGE, EVENT){

    /**
     * @param {string} _target
     */

    LAYOUT.update_menu_state = function update_menu_state(_target){

        LAYOUT.lastAction = _target || '';

        if(DEBUG) CORE.console.log("Update Menu State");

        var target = _target;
        var nodes;

        //TODO:
        if(target.indexOf('-') !== -1){

            target = target.split('-')[0];
        }

        /* TOOLBAR BUTTONS */

        if(CORE.getById('btn-view-' + target)) {

            nodes = CORE.getByTag('td', 'toolbar');

            for(var i = 0; i < nodes.length; i++) {

                if(nodes[i].id !== 'btn-view-' + target) CORE.removeClass(nodes[i], 'active');
            }

            CORE.addClass('#btn-view-' + target, 'active');
        }

        /* VIEW CONTAINERS */

        CORE.setStyle('#view-' + target, {
            'zIndex': 1,
            'visibility': 'visible'
        });

        nodes = CORE.getByClass('view');

        for(var i = 0; i < nodes.length; i++) {

            if(nodes[i].id !== 'view-' + target) {

                CORE.setStyle(nodes[i], {

                    'zIndex': -1,
                    'visibility': 'hidden'
                });
            }
        }

        /* Analytics */

        // if(APP.PLUGIN.Analytics) {
        //
        //     APP.PLUGIN.Analytics.view(target);
        // }
    };

    var spinner = {};

    /** @const */

    var opts = {

        'lines': 13, // The number of lines to draw
        'length': 28, // The length of each line
        'width': 14, // The line thickness
        'radius': 42, // The radius of the inner circle
        'scale': 0.3, // Scales overall size of the spinner
        'corners': 1, // Corner roundness (0..1)
        'color': '#aaa', // #rgb or #rrggbb or array of colors
        'opacity': 0.25, // Opacity of the lines
        'rotate': 0, // The rotation offset
        'direction': 1, // 1: clockwise, -1: counterclockwise
        'speed': 1, // Rounds per second
        'trail': 60, // Afterglow percentage
        'fps': 20, // Frames per second when using setTimeout() as a fallback for CSS
        'zIndex': 2e9, // The z-index (defaults to 2000000000)
        'className': 'spinner', // The CSS class to assign to the spinner
        'top': '50%', // Top position relative to parent
        'left': '50%', // Left position relative to parent
        'shadow': false, // Whether to render a shadow
        'hwaccel': true, // Whether to use hardware acceleration
        'position': 'absolute' // Element positioning
    };

    // TODO: remove
    LAYOUT.lastAction = ''; // initial first view if app starting

    /**
     * @param {string=} color
     */

    LAYOUT.add_preloader = function add_preloader(target, color){

        if(DEBUG) CORE.console.log("Add Preloader");

        target = target.target || target;

        if(color) opts['color'] = color;

        var target_dom = typeof target === 'string' ? CORE.queryOne(target) : target;

        // if(CORE.getHTML(target_dom) === '') spinner[target] = false;
        // else if(spinner[target]) {
        //
        //     LAYOUT.remove_preloader(target);
        //     CORE.setHTML(target_dom, '');
        // }

        CORE.setHTML(target_dom, '', function(){

            // TODO: fix touch issues on empty containers and remove this:
            //target_dom.innerHTML = '<div style="position: absolute; top:25%; bottom:25%; left:25%; right:25%; z-index: 99;" ontouchstart="return false;"></div>';

            // spinner[target] ?
            //     spinner[target]['spin']()
            // :
            //(spinner[target] = new APP.PLUGIN.Spinner(opts)['spin'](target_dom/*.firstElementChild*/));
        });
    };

    LAYOUT.remove_preloader = function remove_preloader(target){

        target = target.target || target;

        if(typeof target === 'string') target = CORE.queryOne(target);

        if(spinner[target]) {

            if(DEBUG) CORE.console.log("Remove Preloader");

            spinner[target]['stop']();
            spinner[target] = false;
        }

        //CORE.getById(target).innerHTML = '';
    };

    var toggle_state = false;

    LAYOUT.toggle_view = function toggle_view(left_action, right_action, callback){

        var content_left_action_layer = '#content-' + left_action + '-layer';
        var content_right_action_layer = '#content-' + right_action + '-layer';

        if(!CORE.hasClass(content_left_action_layer, 'slider-left')){

            toggle_state = !toggle_state;
            CORE.addClass(content_left_action_layer, 'slider-left');
        }
        else if(CORE.hasClass(content_right_action_layer, 'slider-left')){

            toggle_state = !toggle_state;
            CORE.removeClass(content_right_action_layer, 'slider-left');
        }

        if(toggle_state = !toggle_state) {

            CORE.setStyle('#nav-' + left_action, 'display', 'none');
            CORE.setStyle('#nav-' + right_action, 'display', 'block');
            CORE.addClass(content_left_action_layer, 'active');
            CORE.addClass(content_right_action_layer, 'active');
            //CORE.getById('content-' + right_action).scrollTop = 0;

            if(callback) {

                if(CORE.getHTML('#content-' + right_action) === '') {

                    LAYOUT.add_preloader('#content-' + right_action, '#ccc');
                }

                callback();
            }

            /* Analytics */

            // if(APP.PLUGIN.Analytics) {
            //
            //     APP.PLUGIN.Analytics.view(right_action);
            // }
        }
        else{

            CORE.setStyle('#nav-' + right_action, 'display', 'none');
            CORE.setStyle('#nav-' + left_action, 'display', 'block');
            CORE.removeClass(content_left_action_layer, 'active');
            CORE.removeClass(content_right_action_layer, 'active');
            //CORE.getById('content-' + left_action).scrollTop = 0;
        }
    };

    var last_popup = '';
    var last_popup_2 = '';
    var last_target = {};

    /**
     * @param _wrapper
     * @param {Element|string=} preloader_target
     * @param {boolean=} hideStatusbar
     */

    LAYOUT.show_popup = function(_wrapper, preloader_target, hideStatusbar){

        if(DEBUG) CORE.console.log("Show Popup");

        var wrapper = _wrapper;

        if(preloader_target) {

            CORE.setHTML(preloader_target, '');
            LAYOUT.add_preloader(preloader_target, '#ccc');
            last_target[wrapper] = preloader_target;
        }

        CORE.setStyle(wrapper, {

            'transition': 'none',
            'opacity': 0,
            'transform': 'scale(0.8)', // translateZ(0)
            'zIndex': 3,
            'display': 'block'
        });

        CORE.paint(function(){

            if(last_popup_2 && last_popup_2 !== last_popup){

                CORE.setStyle(last_popup_2, 'zIndex', 1);
            }

            if(last_popup){

                CORE.setStyle(last_popup, 'zIndex', 2);
            }

            CORE.setStyle(wrapper, {

                'transition': 'transform 0.2s ease-out, opacity 0.2s ease-out',
                'opacity': 1,
                'transform': 'scale(1)', // translateZ(0)
                'zIndex': 3
            });

            last_popup_2 = last_popup;
            last_popup = wrapper;
        });

        if(!CORE.isType(hideStatusbar)) hideStatusbar = !CORE.hasClass(CORE.getByTag('header', wrapper && wrapper.substring(1))[0] || wrapper, 'status-bar');
        //if(hideStatusbar) APP.PLUGIN.Statusbar.hide();

        /* Analytics */

        // if(APP.PLUGIN.Analytics) {
        //
        //     APP.PLUGIN.Analytics.view(wrapper);
        // }
    };

    LAYOUT.hide_popup = function(_wrapper, _showStatusbar){

        if(DEBUG) CORE.console.log("Hide Popup");

        var wrapper = _wrapper;
        var showStatusbar = _showStatusbar;

        CORE.setStyle(wrapper, {

            'transform': 'scale(0.8)', // translateZ(0)
            'opacity': 0
            //'zIndex': 2
        });

        CORE.paint(function(){

            CORE.setStyle(wrapper, {

                'display': 'none',
                'zIndex': 2
            });

            if(last_target[wrapper]) {

                CORE.setHTML(last_target[wrapper], '', true);
                last_target[wrapper] = false;
            }

            last_popup_2 = last_popup;
            last_popup = '';

            if(!CORE.isType(showStatusbar)) showStatusbar = !CORE.hasClass(CORE.getByTag('header', wrapper && wrapper.substring(1))[0] || wrapper, 'status-bar');
            //if(showStatusbar) APP.PLUGIN.Statusbar.show();

        }, 200);
    };

    /**
     * @param _wrapper
     * @param {Element|string=} preloader_target
     * @param {boolean=} hideStatusbar
     */

    LAYOUT.slide_popup = function(_wrapper, preloader_target, hideStatusbar){

        if(DEBUG) CORE.console.log("Slide-In Popup");

        var wrapper = _wrapper;

        if(preloader_target) {

            CORE.setHTML(preloader_target, '', function(){

                LAYOUT.add_preloader(preloader_target, '#ccc');
                last_target[wrapper] = preloader_target;
            });
        }

        CORE.setStyle(wrapper, {

            'transition': 'none',
            //'opacity': 0,
            'transform': 'translateY(100%)', // translateZ(0)
            'zIndex': 3,
            'display': 'block'
        });

        CORE.paint(function(){

            if(last_popup_2 && last_popup_2 !== last_popup){

                CORE.setStyle(last_popup_2, 'zIndex', 1);
            }

            if(last_popup){

                CORE.setStyle(last_popup, 'zIndex', 2);
            }

            CORE.setStyle(wrapper, {

                //'transition': 'transform 0.3s ease-out, opacity 0.3s ease-out',
                'transition': 'transform 0.3s ease-out',
                //'opacity': 1,
                'transform': 'translateY(0%)', // translateZ(0)
                //'transform': 'scale(1)'
                'zIndex': 3
            });

            last_popup_2 = last_popup;
            last_popup = wrapper;
        });

        if(!CORE.isType(hideStatusbar)) hideStatusbar = !CORE.hasClass(CORE.getByTag('header', wrapper && wrapper.substring(1))[0] || wrapper, 'status-bar');
        //if(hideStatusbar) APP.PLUGIN.Statusbar.hide();

        /* Analytics */

        // if(APP.PLUGIN.Analytics) {
        //
        //     APP.PLUGIN.Analytics.view(wrapper);
        // }
    };

    LAYOUT.slideout_popup = function(_wrapper, _showStatusbar){

        if(DEBUG) CORE.console.log("Slide-Out Popup");

        var wrapper = _wrapper;
        var showStatusbar = _showStatusbar;

        CORE.setStyle(wrapper, {

            //'transform': 'scale(0.8)',
            'transform': 'translateY(100%)' // translateZ(0)
            //'opacity': 0
            //'zIndex': 2
        });

        CORE.paint(function(){

            CORE.setStyle(wrapper, {

                'display': 'none',
                'zIndex': 0
            });

            if(last_target[wrapper]) {

                CORE.setHTML(last_target[wrapper], '', true);
                last_target[wrapper] = false;
            }

            last_popup_2 = last_popup;
            last_popup = '';

            if(!CORE.isType(showStatusbar)) showStatusbar = !CORE.hasClass(CORE.getByTag('header', wrapper && wrapper.substring(1))[0] || wrapper, 'status-bar');
            //if(showStatusbar) APP.PLUGIN.Statusbar.show();

        }, 200);
    };

    /**
     * @param _wrapper
     * @param {Element|string=} preloader_target
     * @param {boolean=} hideStatusbar
     */

    LAYOUT.toggle_popup = function(_wrapper, preloader_target, hideStatusbar){

        if(DEBUG) CORE.console.log("Toggle-In Popup");

        var wrapper = _wrapper;

        if(preloader_target) {

            CORE.setHTML(preloader_target, '', function(){

                LAYOUT.add_preloader(preloader_target, '#ccc');
                last_target[wrapper] = preloader_target;
            });
        }

        CORE.setStyle(wrapper, {

            'transition': 'none',
            //'opacity': 0,
            'transform': 'translateX(100%)', // translateZ(0)
            'zIndex': 3,
            'display': 'block'
        });

        CORE.paint(function(){

            if(last_popup_2 && last_popup_2 !== last_popup){

                CORE.setStyle(last_popup_2, 'zIndex', 1);
            }

            if(last_popup){

                CORE.setStyle(last_popup, 'zIndex', 2);
            }

            // CORE.setStyle('view-' + LAYOUT.lastAction, {
            //
            //     'transform': 'translateX(-15%) translateZ(1px) !important'
            // });

            CORE.addClass('#view-' + LAYOUT.lastAction, 'active');

            CORE.setStyle(wrapper, {

                //'transition': 'transform 0.3s ease-out, opacity 0.3s ease-out',
                'transition': 'transform 0.25s ease-out',
                //'opacity': 1,
                'transform': 'translateX(0%)', // translateZ(0)
                'zIndex': 3
                //'transform': 'scale(1)'
            });

            last_popup_2 = last_popup;
            last_popup = wrapper;
        });

        if(!CORE.isType(hideStatusbar)) hideStatusbar = !CORE.hasClass(CORE.getByTag('header', wrapper && wrapper.substring(1))[0] || wrapper, 'status-bar');
        //if(hideStatusbar) APP.PLUGIN.Statusbar.hide();

        /* Analytics */

        // if(APP.PLUGIN.Analytics) {
        //
        //     APP.PLUGIN.Analytics.view(wrapper);
        // }
    };

    LAYOUT.toggleout_popup = function(_wrapper, _showStatusbar){

        if(DEBUG) CORE.console.log("Toggle-Out Popup");

        var wrapper = _wrapper;
        var showStatusbar = _showStatusbar;

        CORE.removeClass('#view-' + LAYOUT.lastAction, 'active');
        CORE.setStyle('#view-' + LAYOUT.lastAction, 'transform', '');

        CORE.setStyle(wrapper, {

            //'transform': 'scale(0.8)',
            'transform': 'translateX(100%)' // translateZ(0)
            //'opacity': 0
            //'zIndex': 2
        });

        CORE.paint(function(){

            CORE.setStyle(wrapper, {

                'display': 'none',
                'zIndex': 2
            });

            if(last_target[wrapper]) {

                CORE.setHTML(last_target[wrapper], '', true);
                last_target[wrapper] = false;
            }

            last_popup_2 = last_popup;
            last_popup = '';

            if(!CORE.isType(showStatusbar)) showStatusbar = !CORE.hasClass(CORE.getByTag('header', wrapper && wrapper.substring(1))[0] || wrapper, 'status-bar');
            //if(showStatusbar) APP.PLUGIN.Statusbar.show();

        }, 200);
    };

    /**
     * @param {!string} message
     */

    LAYOUT.show_message = function(message){

        if(DEBUG) CORE.console.log("Show Message Box");

        CORE.setHTML('#message-content', message, function(){

            CORE.setStyle('#message-wrapper', 'display', 'block');

            CORE.paint(function(){

                CORE.setStyle('#message-wrapper', 'opacity', 1);
                CORE.setStyle('#message-inner', {

                    'opacity': 1,
                    'transform': 'scale(1)' // translateZ(0)
                });
            });
        });
    };

    LAYOUT.hide_message = function(){

        if(DEBUG) CORE.console.log("Hide Message Box");

        CORE.setStyle('#message-inner', {

            'transform': 'scale(0.8)', // translateZ(0)
            'opacity': 0
        });

        CORE.setStyle('#message-wrapper', 'opacity', 0);

        CORE.paint(function(){

            CORE.setStyle('#message-wrapper', 'display', 'none');
            CORE.setHTML('#message-content', '', true);

        }, 200);
    };

    /**
     * @param {!string} message
     * @param {!Function} fn_confirm
     */

    LAYOUT.show_confirmation = function(message, fn_confirm){

        if(DEBUG) CORE.console.log("Show Confirmation Box");

        CORE.setHTML('#confirmation-content', message, function(){

            CORE.setStyle('#confirmation-wrapper', 'display', 'block');

            CORE.paint(function(){

                CORE.setStyle('#confirmation-wrapper', 'opacity', 1);
                CORE.setStyle('#confirmation-inner', 'transform', 'scale(1)');
            });
        });

        CORE.getById('confirmation-yes').ontouchstart = fn_confirm;
    };

    LAYOUT.hide_confirmation = function(){

        if(DEBUG) CORE.console.log("Hide Confirmation Box");

        CORE.setStyle('#confirmation-wrapper', 'opacity', 0);
        CORE.setStyle('#confirmation-inner', 'transform', 'scale(0.9)');

        CORE.paint(function(){

            CORE.setStyle('#confirmation-wrapper', 'display', 'none');
            CORE.setHTML('#confirmation-content', '', true);

        }, 200);
    };

    /** @const */

    EVENT['confirmation-yes'] = {

        on: 'click',
        do: function(event){

            // NOTE: allow deep links quick fix

            if((this.firstElementChild && this.firstElementChild.href) === false){

                CORE.preventEvent(event, true, true);
            }
            else{

                CORE.async(function(){

                    CORE.setHTML('#confirmation-yes', 'Ja');

                }, 200);
            }

            this.ontouchstart.call(this, event);

            LAYOUT.hide_confirmation();
        },
        stopBubble: false,
        preventDefault: false
    };

    /** @const */

    EVENT['confirmation-no'] = {

        on: 'click',
        do: function(event){

            CORE.setHTML('#confirmation-yes', 'Ja');

            LAYOUT.hide_confirmation();
        },
        stopBubble: true,
        preventDefault: true
    };

    /**
     * @param {string} _key
     * @param {Function=} _callback
     * @param {boolean=} force
     */

    LAYOUT.handleCache = function handleCache(_key, _callback, force){

        var key = _key;
        var callback = _callback;

        var key_new = key;

        //TODO:
        if(key.indexOf('-') !== -1){

            key_new = key.split('-')[0];
        }

        if((LAYOUT.lastAction === key) || force) { // check if view has changed since request

            //CORE.paint(function(){

                if(DEBUG) CORE.console.log("Handle Layout Cache: " + _key);

                if(LAYOUT.lastAction === key) LAYOUT.update_menu_state(key_new);

                var target = CORE.getById('content-' + key);

                if(target){

                    var inner_html = CORE.getHTML(target);

                    // TODO: Fix

                    if(inner_html === ''){

                        var cache = STORAGE.VIEW.get(LAYOUT.lastAction = key);

                        if(cache && APP.CRC32['content-' + key] !== cache['crc']){

                            APP.CRC32['content-' + key] = cache['crc'];

                            CORE.setHTML(target, STORAGE.decompress(cache['cache']), true);
                        }
                        else{

                            if(callback) LAYOUT.add_preloader('#content-' + key);
                        }
                    }
                    else if(LAYOUT.lastAction === key){

                        var nodes = CORE.getByTag('main', /** @type {Element} */ (CORE.getById('content-' + key).parentNode.parentNode.parentNode));

                        for(var i = 0; i < nodes.length; i++){

                            CORE.scrollToTop(nodes[i]);
                        }
                    }

                    var fn_callback_wrapper = function(){

                        LAYOUT.remove_preloader('#content-' + key);

                        // TODO: Fix

                        var cache = CORE.getHTML(target);

                        if(cache){

                            CORE.async(function(){

                                STORAGE.VIEW.set(key_new, {

                                    'cache': STORAGE.compress(cache),
                                    'crc': APP.CRC32['content-' + key] || 1
                                });
                            });
                        }
                    };

                    /* ADD TO CACHE */

                    if(callback) callback(fn_callback_wrapper);
                    else fn_callback_wrapper();
                }
                else{

                    if(callback) callback(true);
                }
            //});
        }
    };

    var easeInQuint = function(t, b, c, d) {

        return c*(t/=d)*t*t*t*t*t + b;
    };

    /**
     * @param {HTMLElement|Element|string} el
     * @param {Object<string, Function|string|number|boolean>=} config
     */

    LAYOUT.addSwipe = function addSwipe(el, config){

        if(DEBUG) CORE.console.log("Add Swipe", el.id || el.parentNode.id || el);

        var touchsurface = el,
            startX,
            startY,
            distX,
            limit = config ? config.limit : false,
            touchstart = config ? config.start : false,
            touchmove = config ? config.move : false,
            touchend = config ? config.end : false,
            finish = config ? config.finish : false;

        var swipe_touch_move_handler = function(e){

            APP.VARS.force_touchmove = true;

            var touchobj = e['changedTouches'][0];

            distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface

            if(touchmove) touchmove.call(this, distX);

            else if(distX >= 0 && (!limit || (distX < screen.width / 100 * limit))) {

                CORE.setStyle(this.parentNode, 'transform', 'translateX(' + distX + 'px)')
                //e.preventDefault(); // prevent scrolling when inside DIV
            }

            if(this.parentNode.id && CORE.getById('view-' + LAYOUT.lastAction) !== this.parentNode) CORE.setStyle('#view-' + LAYOUT.lastAction, 'transform', 'translateX(-' + (25 - (distX / screen.width) * 25) + '%)');

            CORE.preventEvent(e, true, true);
        };

        //distY,
        //swipedir,
        //threshold = 150, //required min distance traveled to be considered swipe
        //restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        //allowedTime = 300, // maximum time allowed to travel that distance
        //elapsedTime,
        //startTime;
        //handleswipe = callback || function(swipedir){};

        CORE.on(touchsurface, '', 'touchstart', function(e){

            APP.VARS.force_touchmove = true;

            var touchobj = e['changedTouches'][0];
            //swipedir = 'none';
            distX = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            //startTime = new Date().getTime(); // record time when finger first makes contact with surface

            CORE.addClass([this.parentNode, '#view-' + LAYOUT.lastAction], 'no-transition');
            CORE.removeClass('#view-' + LAYOUT.lastAction, 'active');

            if(touchstart) touchstart.call(this, distX);

            this.addEventListener('touchmove', swipe_touch_move_handler, APP.CONFIG.PASSIVE_EVENTS);

            //e.preventDefault()

        }, true, true);

        // CORE.on(touchsurface, '', 'touchmove', function(e){
        //
        //     APP.VARS.force_touchmove = true;
        //
        //     var touchobj = e['changedTouches'][0];
        //
        //     distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        //
        //     if(touchmove) touchmove.call(this, distX);
        //
        //     else if(distX >= 0 && (!limit || (distX < screen.width / 100 * limit))) {
        //
        //         limit ?
        //
        //             CORE.setStyle(this.parentNode, 'transform', 'translateX(' + distX + 'px)')
        //         :
        //             CORE.setStyle(this.parentNode, {
        //
        //                 'transform': 'translateX(' + distX + 'px)',
        //                 'opacity': ((100 - easeInQuint(distX, 0, 100, screen.width)) | 0) / 100
        //             });
        //
        //         //e.preventDefault(); // prevent scrolling when inside DIV
        //     }
        //
        // }, true, true);

        CORE.on(touchsurface, '', 'touchend', function(e){

            APP.VARS.force_touchmove = false;

            var touchobj = e['changedTouches'][0];

            // get horizontal dist traveled by finger while in contact with surface
            distX = touchobj.pageX - startX;
            // get vertical dist traveled by finger while in contact with surface
            //distY = touchobj.pageY - startY;
            // get time elapsed
            //elapsedTime = new Date().getTime() - startTime;

            /*
             // first condition for swipe met
             if(elapsedTime <= allowedTime){
             // 2nd condition for horizontal swipe met
             if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
             // if dist traveled is negative, it indicates left swipe
             swipedir = (distX < 0) ? 'left' : 'right';
             }
             // 2nd condition for vertical swipe met
             else if(Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){
             // if dist traveled is negative, it indicates up swipe
             swipedir = (distY < 0) ? 'up' : 'down';
             }
             }
             */

            if(touchend) touchend.call(this, distX);

            else if(distX < screen.width / 3.1416) {

                CORE.setStyle(this.parentNode, 'transform', 'translateX(0px)');
                CORE.setStyle('#view-' + LAYOUT.lastAction, 'transform', 'translateX(-25%)');

                CORE.paint(function(){

                    CORE.setStyle('#view-' + LAYOUT.lastAction, 'transform', '');

                }, 200);
            }
            else{

                limit ?

                    CORE.setStyle(this.parentNode, {
                        'transform': 'translateX(' + limit + '%)'
                    })
                :
                    CORE.setStyle(this.parentNode, {
                        'transform': 'translateX(100%)'
                        //'opacity': '0'
                    });

                var _this = this;

                CORE.paint(function(){

                    CORE.setStyle(_this.parentNode, 'display', 'none');

                }, 200);

                // if(!limit) {
                //
                //     (function(parentNode){
                //
                //         CORE.paint(function(){
                //
                //             APP.LAYOUT.hide_popup(parentNode);
                //
                //         }, 200);
                //
                //     })(this.parentNode);
                // }

                CORE.setStyle('#view-' + LAYOUT.lastAction, 'transform', '');

                if(finish) finish.call(this, distX);

                // var _this = this;
                //
                // CORE.paint(function(){
                //
                //     CORE.setStyle(_this.parentNode, {
                //
                //         'opacity': 1
                //     });
                //
                // }, 400);
            }

            CORE.removeClass([this.parentNode, '#view-' + LAYOUT.lastAction], 'no-transition');

            this.removeEventListener('touchmove', swipe_touch_move_handler);

            //handleswipe(swipedir);
            //e.preventDefault()

        }, true, true)
    };

    var pull_down = false;
    var in_progress = false;
    var scroll_start = 0;
    var scroll_pos = 0;

    var pull_touch_move_handler = function(event){

        if(!in_progress && pull_down) {

            if(event.originalEvent) event = event.originalEvent;

            scroll_pos = (event.touches || event.changedTouches)[0].pageY;

            var scroll_height = CORE.Math.min(scroll_pos - scroll_start, 50);

            if(scroll_pos > scroll_start){

                APP.VARS.force_touchmove = true;

                CORE.preventEvent(event, true, true);

                CORE.setStyle(this.firstElementChild, {

                    'opacity': CORE.Math.max(1 / 50 / 50 * scroll_height * scroll_height, 0),
                    'transform': 'translateY(' + scroll_height + 'px)' // translateZ(0)
                });

                if(scroll_pos - scroll_start > 50){

                    CORE.setStyle(this.firstElementChild.nextElementSibling, 'transform', 'translateY(' + (50 + Math.sqrt(((scroll_pos - scroll_start) - 50) * 15) | 0) + 'px)'); // translateZ(0)
                }
                else{

                    CORE.setStyle(this.firstElementChild.nextElementSibling, 'transform', 'translateY(' + (scroll_pos - scroll_start) + 'px)'); // translateZ(0)
                }
            }
            else{

                APP.VARS.force_touchmove = false;

                pull_down = false;
            }
        }
        else if(!in_progress && this.scrollTop === 0 && this.firstElementChild.nextElementSibling.scrollTop === 0){

            if(event.originalEvent) event = event.originalEvent;

            scroll_start = (event.touches || event.changedTouches)[0].pageY;

            pull_down = true;

            //if(spinner) spinner['spin']();
            //else spinner = new APP.PLUGIN.Spinner(opts)['spin'](CORE.getById('pullDown'));
        }
        else{

            APP.VARS.force_touchmove = false;
        }
    };

    /**
     * @param {HTMLElement|Element|string} el
     */

    LAYOUT.initPullToRefresh = function initPullToRefresh(el, route){

        if(DEBUG) CORE.console.log("Init Pull To Refresh", el.id || el.parentNode.id || el);

        CORE.on(el, '', 'touchstart', function(event){

            if(!in_progress && this.scrollTop === 0 && this.firstElementChild.nextElementSibling.scrollTop === 0){

                APP.VARS.force_touchmove = true;

                if(event.originalEvent) event = event.originalEvent;

                scroll_start = scroll_pos = (event.touches || event.changedTouches)[0].pageY;

                pull_down = true;
            }

            this.addEventListener('touchmove', pull_touch_move_handler, APP.CONFIG.PASSIVE_EVENTS);

        }, false, false);

        // CORE.on(el, '', 'touchmove', function(event){
        //
        //     if(!in_progress && pull_down) {
        //
        //         if(event.originalEvent) event = event.originalEvent;
        //
        //         scroll_pos = (event.touches || event.changedTouches)[0].pageY;
        //
        //         var scroll_height = CORE.Math.min(scroll_pos - scroll_start, 50);
        //
        //         if(scroll_pos > scroll_start){
        //
        //             APP.VARS.force_touchmove = true;
        //
        //             CORE.preventEvent(event, true, true);
        //
        //             CORE.setStyle(el.firstElementChild, {
        //
        //                 'opacity': CORE.Math.max(1 / 50 / 50 * scroll_height * scroll_height, 0),
        //                 'transform': 'translateY(' + scroll_height + 'px) translateZ(0)'
        //             });
        //
        //             if(scroll_pos - scroll_start > 50){
        //
        //                 CORE.setStyle(el.firstElementChild.nextElementSibling, 'transform', 'translateY(' + (50 + Math.sqrt(((scroll_pos - scroll_start) - 50) * 15) | 0) + 'px) translateZ(0)');
        //             }
        //             else{
        //
        //                 CORE.setStyle(el.firstElementChild.nextElementSibling, 'transform', 'translateY(' + (scroll_pos - scroll_start) + 'px) translateZ(0)');
        //             }
        //         }
        //         else{
        //
        //             APP.VARS.force_touchmove = false;
        //
        //             pull_down = false;
        //         }
        //     }
        //     else if(!in_progress && this.scrollTop === 0 && this.firstElementChild.nextElementSibling.scrollTop === 0){
        //
        //         if(event.originalEvent) event = event.originalEvent;
        //
        //         scroll_start = (event.touches || event.changedTouches)[0].pageY;
        //
        //         pull_down = true;
        //
        //         //if(spinner) spinner['spin']();
        //         //else spinner = new APP.PLUGIN.Spinner(opts)['spin'](CORE.getById('pullDown'));
        //     }
        //     else{
        //
        //         APP.VARS.force_touchmove = false;
        //     }
        //
        // }, false, false);

        CORE.on(el, '', 'touchend', function(event){

            APP.VARS.force_touchmove = false;

            if(!in_progress && pull_down) {

                if(scroll_pos > scroll_start) {

                    CORE.preventEvent(event, true, true);

                    var scroll_height = CORE.Math.min(scroll_pos - scroll_start, 50);

                    if(scroll_height >= 50) {

                        CORE.setStyle(el.firstElementChild.nextElementSibling, 'transform', 'translateY(50px)'); // translateZ(0)

                        in_progress = true;

                        APP.CONTROLLER.request(route, {}, function (data) {

                            /* Call default request handler */
                            if(APP.ROUTE[route].to) APP.CONTROLLER[APP.ROUTE[route].to](data);
                            else if(APP.ROUTE[route].do) {
                                if(CORE.isType(APP.ROUTE[route].do, 'string')) APP.HANDLER[APP.ROUTE[route].do](data);
                                else APP.ROUTE[route].do(data);
                            }

                            CORE.setStyle(el.firstElementChild.nextElementSibling, 'transform', 'translateY(0px)'); // translateZ(0)
                            CORE.setStyle(el.firstElementChild, {

                                'opacity': 0,
                                'transform': 'translateY(0px)' // translateZ(0)
                            });

                            pull_down = false;
                            in_progress = false;

                            //if(spinner) spinner['stop']();
                            //spinner = null;
                        });
                    }
                    else{

                        CORE.setStyle(el.firstElementChild.nextElementSibling, 'transform', 'translateY(0px)'); // translateZ(0)
                        CORE.setStyle(el.firstElementChild, {

                            'opacity': 0,
                            'transform': 'translateY(0px)' // translateZ(0)
                        });

                        pull_down = false;
                    }
                }
                else{

                    pull_down = false;
                    in_progress = false;
                }
            }

            this.removeEventListener('touchmove', pull_touch_move_handler);

        }, false, false);
    };

})(
    APP.LAYOUT,
    APP.CONTROLLER,
    /** @type {_storage_struct} */
   (APP.STORAGE),
    APP.EVENT
);
