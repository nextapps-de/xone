goog.provide('CORE.EVENT');
goog.require('CORE');
goog.require('INTERFACE');
goog.require('CONFIG');

/**
 * This is an exclusive extraction of the JS Pro Tools library "UTILS.js" as an
 * exclusive standalone version (without ASAP/AMD).
 */

(function() {

    "use strict";

    // == PRIVATE MEMBERS ==

    //var EVENT_STACK = {};

    var skip_touchmove = false;
    var skip_touchend = false;

    /**
     * @param {Event} event
     * @param {boolean=} prevent
     * @param {boolean=} stop
     * @return {boolean}
     * @const
     */

    CORE.preventEvent = function(event, prevent, stop) {

        if(stop) {

            if(event.stopImmediatePropagation) event.stopImmediatePropagation();
            event.stopPropagation();
            event['cancelBubble'] = true;
        }

        if(prevent) {

            //if(event.stopImmediatePropagation) event.stopImmediatePropagation();
            event.preventDefault();
            event['returnValue'] = false;
        }

        return !prevent;
    };

    CORE.handleEvent = function(event, elem, fn, preventDefault, stopBubble){

        // TODO: dont use global events
        //if(elem === window.document) return;

        event || (event = window.event);

        if(DEBUG){

            Console.log('Event: ' + elem.id || elem.className || elem.tagName || elem);
        }

        // set the this pointer same as addEventListener when fn is called
        fn.call(elem, event);

        CORE.preventEvent(event, preventDefault, stopBubble);
    };

    var registered_dispatcher = {};
    var initial_touch_element = null;

    // TODO: Re-Code this Method :)
    var event_dispatcher = function(event) {

        var event_type = event.type;

        // if(event_type === 'touchstart') {
        //
        //     initial_touch_element || (initial_touch_element = document);
        // }

        // Optimization:
        // FIX: has issues with pull to refresh touchstart/touchmove
        if(CONFIG.ENABLE_EVENT_CACHE){

            if(event_type === 'touchmove') {

                if(skip_touchmove && !APP.VARS.force_touchmove){

                    if(DEBUG) APP.STATS.count_event_cache++;

                    return; //CORE.preventEvent(event, false, true)
                }
                else if(!APP.VARS.force_touchmove) {

                    skip_touchmove = true;
                    skip_touchend = true;
                }
            }
        }

        var target = /*initial_touch_element ||*/ /** @type {Node|Element|HTMLDocument|Window|null|string} */ (event.target || event.srcElement);

        // Optimization:
        // FIX: has issues with pull to refresh touchstart/touchmove
        if(CONFIG.ENABLE_EVENT_CACHE){

            if(event_type === 'touchend'){

                skip_touchmove = false;
                initial_touch_element = null;

                if(skip_touchend && !APP.VARS.force_touchmove){

                    skip_touchend = false;

                    if(DEBUG) APP.STATS.count_event_cache++;

                    return; //CORE.preventEvent(event, true, true)
                }

                APP.VARS.force_touchmove = false;
            }
        }

        // if(target === this){
        //
        //     APP.STATS.count_event_cache++;
        //     return;
        // }

        //console.log(skip_touchend);
        //console.log(event_type);
        //console.log(target);

        if(DEBUG) {

            APP.STATS.count_event++;
        }

        /* Climbs up the node chain, until either the first suitable target is found,
         * or the container (this) is reached */

        var bubble_stack = [];
        var stopBubble = false;
        //var tmp_count = 0;

        if(DEBUG) {

            var debug_time = CORE.time.now();
        }

        while(!stopBubble && target /*&& (target !== this)*/  /* node */) {

            // Optimization:
            // FIX: has issues with pull to refresh touchstart/touchmove
            if(CONFIG.ENABLE_EVENT_CACHE){

                if(target === document && !APP.VARS.force_touchmove && event_type === 'touchmove'){

                    skip_touchmove = true;
                    skip_touchend = true;

                    // if(DEBUG) {
                    //
                    //     APP.STATS.time_event += CORE.time.now() - debug_time;
                    //     APP.STATS.count_bubble_cache += bubble_stack.length;
                    // }

                    //return /*CORE.preventEvent(event, false, stopBubble)*/;
                }
            }

            if(DEBUG) {

                APP.STATS.count_bubble++;
            }

            //tmp_count++;

            var preventDefault = false;

            bubble_stack[bubble_stack.length] = target;

            //console.log(bubble_stack);
            //console.log(target);

            if(target._event && target._event[event_type]){

                //console.log(event_type);
                //console.log(target._event[event_type]);

                for(var i = 0; i < target._event[event_type].length; i++){

                    var current = target._event[event_type][i];

                    //Bubble cache:
                    if(CONFIG.ENABLE_EVENT_CACHE){

                        if(target._event_src && target._event_src[event_type] && target._event_src[event_type][current.view]){

                            if(DEBUG){

                                APP.STATS.count_bubble_cache += bubble_stack.length;
                            }
                            target = target._event_src[event_type][current.view];
                            current = target._event[event_type][i];
                        }
                    }

                    var bubble_src = null;

                    //console.log(current);

                    if(current.tag || current.class) {

                        for(var x = 0; x < bubble_stack.length; x++) {

                            var current_bubble = bubble_stack[x];

                            var tag_name = current_bubble.tagName;

                            if(tag_name) {

                                if(current.tag && current.class) {

                                    if(tag_name.toLowerCase() === current.tag && CORE.hasClass(current_bubble, current.class)) {

                                        bubble_src = current_bubble;
                                    }
                                }
                                else if(current.tag) {

                                    if(tag_name.toLowerCase() === current.tag) {

                                        bubble_src = current_bubble;
                                    }
                                }
                                else if(current.class) {

                                    if(CORE.hasClass(current_bubble, current.class)) {

                                        bubble_src = current_bubble;
                                    }
                                }

                                if(bubble_src){

                                    //Bubble cache:
                                    if(CONFIG.ENABLE_EVENT_CACHE){

                                        bubble_src._event_src || (bubble_src._event_src = {});
                                        bubble_src._event_src[event_type] || (bubble_src._event_src[event_type] = {});
                                        bubble_src._event_src[event_type][current.view] || (bubble_src._event_src[event_type][current.view] = target);
                                    }

                                    if(!current.fn) {

                                        if(DEBUG) {

                                            APP.STATS.time_event += CORE.time.now() - debug_time;
                                            APP.STATS.count_bubble_cache += bubble_stack.length - x - 1;
                                        }

                                        CORE.preventEvent(event, preventDefault, stopBubble);
                                        return;
                                    }

                                    current.fn.call(bubble_src, event, current.target ? CORE.getClosest(bubble_src, current.target) : bubble_src);

                                    stopBubble || (stopBubble = current.stopBubble);
                                    preventDefault || (preventDefault = current.preventDefault);

                                    bubble_src = null;

                                    if(DEBUG) Console.log('Event: ' + event_type, target.id || target.className || target.tagName || target);
                                }

                                // if(stopBubble && preventDefault) return CORE.preventEvent(event, preventDefault, stopBubble);
                                if(preventDefault) i = target._event[event_type].length;
                                if(stopBubble) break;
                            }

                            if(CONFIG.ENABLE_EVENT_CACHE){

                                if(x === bubble_stack.length - 1 && !bubble_src){

                                    //Bubble cache:
                                    current_bubble._event_src || (current_bubble._event_src = {});
                                    current_bubble._event_src[event_type] || (current_bubble._event_src[event_type] = {});
                                    current_bubble._event_src[event_type][current.view] || (current_bubble._event_src[event_type][current.view] = target);
                                }
                            }
                        }
                    }

                    else {

                        //bubble_src = bubble_stack[0];

                        //Bubble cache:
                        if(CONFIG.ENABLE_EVENT_CACHE){
                            bubble_stack[0]._event_src || (bubble_stack[0]._event_src = {});
                            bubble_stack[0]._event_src[event_type] || (bubble_stack[0]._event_src[event_type] = {});
                            bubble_stack[0]._event_src[event_type][current.view] || (bubble_stack[0]._event_src[event_type][current.view] = target);
                        }

                        if(!current.fn) {

                            if(DEBUG) {

                                APP.STATS.time_event += CORE.time.now() - debug_time;
                                APP.STATS.count_bubble_cache++;
                            }

                            CORE.preventEvent(event, preventDefault, stopBubble);
                            return;
                        }

                        current.fn.call(target, event, current.target ? CORE.getClosest(target, current.target) : target);

                        stopBubble || (stopBubble = current.stopBubble);
                        preventDefault || (preventDefault = current.preventDefault);

                        if(DEBUG) Console.log('Event: ' + event_type, target.id || target.className || target.tagName || target);
                    }

                    //if(stopBubble && preventDefault) return CORE.preventEvent(event, preventDefault, stopBubble);
                    if(preventDefault || stopBubble) break;
                }
            }

            //console.log(target);

            // Optimization:
            if(CONFIG.ENABLE_EVENT_CACHE){

                if(target === document){

                    if(initial_touch_element === null && !APP.VARS.force_touchmove && event_type === 'touchstart'){

                        if(DEBUG) APP.STATS.count_event_cache += 2;

                        skip_touchmove = true;
                        skip_touchend = true;
                    }

                    break;
                }
            }

            //if(target === this) CORE.preventEvent(event, preventDefault, stopBubble);

            target = target.parentNode;
        }

        if(preventDefault || stopBubble) {

            CORE.preventEvent(event, preventDefault, stopBubble);
        }

        if(DEBUG) {

            APP.STATS.time_event += CORE.time.now() - debug_time;
        }
    };

    function register_dispatcher(elem, event_type){

        if(registered_dispatcher[event_type]) return;
        else registered_dispatcher[event_type] = true;

        if(DEBUG) Console.log('Register Event Dispatcher: ' + event_type);

        window.addEventListener(

            event_type,
            event_dispatcher,
            event_type === 'touchmove' ? APP.CONFIG.EVENT_OPTIONS || true : true /*false*/
        );
    }

    var touch_events_supported;
    /**
     * Add event cross browser
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} elem
     * @param {string} query
     * @param {string} event
     * @param {Function} _fn
     * @param {boolean=} preventDefault
     * @param {boolean=} stopBubble
     * @param {string=} target
     * @param {string=} key
     * @return {Function}
     */

    CORE.on = function on(elem, query, event, _fn, preventDefault, stopBubble, target, key) {

        var fn;

        if(CONFIG.EVENT_DEFAULT_DELAY){

            fn = function(event){

                var _this = this;

                CORE.async(function(){

                    _fn.call(_this, event);

                }, CONFIG.EVENT_DEFAULT_DELAY);
            };
        }
        else{

            fn = _fn;
        }

        if(typeof elem === 'string') elem = CORE.query(elem);

        if(elem.length >= 0){

            var i = 0;
            while(i < elem.length) CORE.on(elem[i++], query, event, _fn, preventDefault, stopBubble, target, key);
            return fn;
        }

        if(CORE.isArray(event)){

            var i = 0;
            while(i < event.length) CORE.on(elem, query, event[i++], _fn, preventDefault, stopBubble, target, key);
            return fn;
        }

        if(CORE.isArray(_fn)){

            var i = 0;
            while(i < _fn.length) CORE.on(elem, query, event, _fn[i++], preventDefault, stopBubble, target, key);
            return fn;
        }

        if(event === 'touchstart' || event === 'touchend' || event === 'touchmove'){

            if(typeof touch_events_supported === 'undefined'){

                try {

                    document.createEvent("TouchEvent");

                    touch_events_supported = true;
                }
                catch(e) {

                    touch_events_supported = false;
                }
            }

            /* Provide Desktop Mouse-Support-Fallback + Set Pointer Cursor */

            if(!touch_events_supported){

                if(event === 'touchstart') {

                    event = 'mousedown';

                    // if(elem !== document) {
                    //
                    //     if(query) {
                    //
                    //         var elements;
                    //
                    //         if(query.charAt(0) === '.') {
                    //
                    //             elements = CORE.getByClass(query.substr(1), elem);
                    //         }
                    //         else {
                    //
                    //             elements = CORE.getByTag(query, elem);
                    //         }
                    //
                    //         if(elements.length) {
                    //
                    //             CORE.setStyle(elements, 'cursor', 'pointer');
                    //         }
                    //     }
                    //     else {
                    //
                    //         CORE.setStyle(elem, 'cursor', 'pointer');
                    //     }
                    // }
                }
                if(event === 'touchend') {

                    // if(elem !== document){
                    //
                    //     CORE.on(elem, query, 'mousedown', function(){
                    //
                    //         elem.onmouseout = function(event){
                    //
                    //             fn.call(this, event);
                    //             this.onmouseout = null;
                    //         };
                    //
                    //         //CORE.on(elem, query, 'mouseout', fn, preventDefault, stopBubble, key);
                    //
                    //     }, false, false, key);
                    // }

                    event = 'mouseup';
                }
                if(event === 'touchmove') {

                    event = 'mousemove';
                }
            }
        }

        if(event === 'click'){

            CORE.on(elem, query, 'touchstart', function(event){

                initial_touch_element || (initial_touch_element = this);
                skip_touchmove = true;
                skip_touchend = true;

                APP.VARS.force_touchmove = false;

                fn.call(this, event);

            }, preventDefault, stopBubble, target, key);

            //CORE.on(elem, query, 'touchmove', null, preventDefault, stopBubble);

            // CORE.on(elem, query, 'touchend', function(event){
            //
            //     skip_touchmove = false;
            //
            // }, preventDefault, stopBubble);

            // TODO: disable gestures + disable initial waiting time
            //if(elem !== window && elem !== window.document) CORE.setStyle(/** @type {Node|NodeList|Array<Node>|string|null} */ (elem), 'touchAction', 'manipulation');

            //return CORE.addTouchEvent(elem, fn, preventDefault, stopBubble);

            return fn;
        }

        var timer = null;

        if(event === 'doubletap'){

            var last_tap_time = 0;

            CORE.on(elem, query, 'touchstart', function(event){

                skip_touchmove = false;
                skip_touchend = false;

                APP.VARS.force_touchmove = false;

                var now = CORE.time.now();

                if(last_tap_time && (now - last_tap_time < 300)){

                    CORE.preventEvent(event, true, true);

                    if(timer){

                        timer = CORE.clear(timer);
                    }

                    fn.call(this, event);
                }

                else {

                    last_tap_time = now;
                }

            }, preventDefault, stopBubble, target, key);

            return fn;
        }

        if(event === 'touchhold'){

            CORE.on(elem, query, 'touchstart', function(event){

                initial_touch_element || (initial_touch_element = this);
                skip_touchmove = false;
                skip_touchend = false;

                APP.VARS.force_touchmove = false;

                this.ontouchmove = function(){

                    if(CORE.System.isIOS){

                        timer = 0;
                    }
                    else{

                        if(timer){

                            timer = CORE.clear(timer);
                        }
                    }
                };

                if(CORE.System.isIOS){

                    timer = CORE.time.now();
                }
                else{

                    if(timer){

                        CORE.clear(timer);
                    }

                    var self = this;

                    timer = CORE.async(function(){

                        timer = null;

                        CORE.preventEvent(event, true, true);

                        if(target){

                            fn.call(self, event, CORE.getClosest(self, target));
                        }
                        else{

                            fn.call(self, event, self);
                        }

                    }, 500, 'touchhold');
                }

            }, preventDefault, stopBubble, target, key);

            CORE.on(elem, query, 'touchend', function(event){

                this.ontouchmove = null;

                if(CORE.System.isIOS){

                    if(CORE.time.now() - timer > 500){

                        CORE.preventEvent(event, true, true);

                        if(target){

                            fn.call(this, event, CORE.getClosest(this, target));
                        }
                        else{

                            fn.call(this, event, self);
                        }
                    }

                    timer = 0;
                }
                else{

                    if(timer){

                        timer = CORE.clear(timer);
                    }
                }

                skip_touchmove = false;

            }, preventDefault, stopBubble);

            return fn;
        }

        if(event === 'clickmove'){

            // TODO: disable gestures + disable initial waiting time
            //if(elem !== window && elem !== window.document) CORE.setStyle(/** @type {Node|NodeList|Array<Node>|string|null} */ (elem), 'touchAction', 'manipulation');

            return CORE.addTouchMoveEvent(elem, fn, preventDefault, stopBubble, query, target, key);
        }

        if(event === 'wheelscroll'){

            return CORE.addMouseWheelScroll(elem, fn/*, preventDefault, stopBubble*/);
        }

        var delegateByClass = '';
        var delegateByTag = '';

        if(query){

            if(query.charAt(0) === '.') {

                delegateByClass = query.substring(1);
            }
            else if(query.indexOf('.') > 0) {

                delegateByTag = query.split('.')[0];
                delegateByClass = query.split('.')[1];
            }
            else{

                delegateByTag = query;
            }
        }

        if(CORE.contains(event, ':')){

            var parts = event.split(':');

            event = parts[0];

            if(parts[1]){

                if(CORE.contains(parts[0], 'key')) fn = (function(fn){

                    return function(event, target){

                        var payload = {};
                        var self = this;

                        payload[parts[1]] = function(){

                            fn.call(self, event, target);
                        };

                        CORE.switchKeyCode(event, payload);
                    }

                })(fn);
            }
        }

        elem._event || (elem._event = {});
        if(!elem._event[event]) {

            register_dispatcher(elem, event);
        }
        elem._event[event] || (elem._event[event] = []);
        elem._event[event].push({

            tag: delegateByTag,
            class: delegateByClass,
            fn: fn,
            preventDefault: preventDefault,
            stopBubble: stopBubble,
            view: key,
            target: target || false
        });

        return fn;
    };

    /**
     * Add event cross browser
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} elem
     * @param {string} event
     * @param {Function} fn
     * @param {boolean=} preventDefault
     * @param {boolean=} stopBubble
     * @return {Function}
     */

    CORE.addEvent = function addEvent(elem, event, fn, preventDefault, stopBubble) {

        return CORE.on(elem, '', event, fn, preventDefault, stopBubble);

        // elem = CORE.getNode(elem);
        //
        // if(event === 'click'){
        //
        //     // disable gestures + disable initial waiting time
        //     if(elem != window.document) CORE.setStyle(elem, 'touchAction', 'manipulation');
        //
        //     return CORE.addTouchEvent(elem, fn, preventDefault, stopBubble);
        // }
        //
        // if(event === 'clickmove'){
        //
        //     // disable gestures + disable initial waiting time
        //     if(elem != window.document) CORE.setStyle(elem, 'touchAction', 'manipulation');
        //
        //     return CORE.addTouchMoveEvent(elem, fn, preventDefault, stopBubble, '');
        // }
        //
        // if(event === 'wheelscroll'){
        //
        //     return CORE.addMouseWheelScroll(elem, fn/*, preventDefault, stopBubble*/);
        // }
        //
        // /*
        // window.Gator(elem).on(event, function(e) {
        //     CORE.handleEvent(e, this, fn, preventDefault, stopBubble);
        // });
        // */
        //
        // /* Scope-Save Execution Context */
        //
        // (function(fn, elem, preventDefault, stopBubble){
        //
        //     if(elem.addEventListener) {
        //
        //         elem.addEventListener(event, function(e) {
        //
        //             CORE.handleEvent(e, this, fn, preventDefault, stopBubble);
        //
        //         }, false);
        //     }
        //     // MSIE
        //     else if(elem.attachEvent){
        //
        //         elem.attachEvent("on" + event, function(e) {
        //
        //             CORE.handleEvent(e, this, fn, preventDefault, stopBubble);
        //         });
        //     }
        //     // FALLBACK
        //     else {
        //
        //         (function(old_fn){
        //
        //             elem["on" + event] = function(e) {
        //
        //                 if(old_fn) old_fn.call(this, e);
        //
        //                 CORE.handleEvent(e, this, fn, preventDefault, stopBubble);
        //             };
        //
        //          })(elem["on" + event]);
        //     }
        //
        // })(fn, elem, preventDefault, stopBubble);
        //
        // return fn;
    };

    /**
     * Set touch-friendly fast click events
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} node
     * @param {Function} fn
     * @param {boolean=} preventDefault
     * @param {boolean=} stopBubble
     * @return {Function}
     */

    CORE.addTouchEvent = function addTouchEvent(node, fn, preventDefault, stopBubble){

        //(node = CORE.getNode(node));

        //CORE.addEvent(node, 'mousedown',
        CORE.addEvent(node, 'touchstart', fn, preventDefault, stopBubble);//, preventDefault, stopBubble);

        /*
         (function(fn, preventDefault, stopBubble){

         (node = CORE.getNode(node));

         CORE.addEvent(node, 'mousedown',
         CORE.addEvent(node, 'touchstart', function(event){

         //return CORE.handleEvent(event, this, fn, preventDefault, stopBubble);

         fn.call(this, event);
         //CORE.preventEvent(event, preventDefault, stopBubble);

         }));

         })(fn, preventDefault, stopBubble);
         */

        return fn;
    };

    var skip_callback = false;

    /**
     * @param {Event} event
     * @this {Node}
     */

    function touch_move_listener(event){

        skip_touchmove = true;
        skip_callback = true;
        skip_touchend = true;

        this.ontouchmove = null;

        CORE.preventEvent(event, false, true);
    }

    /**
     * Set touch-move-friendly click events
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} node
     * @param {Function} fn
     * @return {Function}
     */

    CORE.addTouchMoveEvent = function addTouchMoveEvent(node, fn, preventDefault, stopBubble, query, target, key){

        // CORE.on(node, query, 'touchend', function(event){
        //
        //     if(target){
        //
        //         fn.call(this, event, CORE.getClosest(this, target));
        //     }
        //     else{
        //
        //         fn.call(this, event, this);
        //     }
        //
        //     //initial_touch_element = null;
        //
        //     //if(stopBubble && event.stopImmediatePropagation) event.stopImmediatePropagation();
        //
        //     //CORE.preventEvent(event, preventDefault, stopBubble);
        //
        // }, preventDefault, stopBubble, target, key);//);
        //
        // return fn;

        //(node = CORE.getNode(node));

        //(function(fn, preventDefault, stopBubble){

        CORE.on(node, query, 'touchstart', function(event){

            //skip_touchmove = false;
            //skip_touchend = false;
            skip_callback = false;
            initial_touch_element || (initial_touch_element = this);

            // TODO: stop bubble can increase performance?
            //CORE.preventEvent(event, preventDefault, stopBubble);

            this.ontouchmove = touch_move_listener;

        }, false, false, target, key);

        // CORE.on(node, query, 'touchmove', function(event){
        //
        //     skip_touchmove = true;
        //     skip_callback = true;
        //     skip_touchend = true;
        //
        //     APP.VARS.force_touchmove = false;
        //
        //     // TODO: stop bubble can increase performance?
        //     //CORE.preventEvent(event, preventDefault, stopBubble);
        //
        // }, false, stopBubble, key);

        //CORE.addEvent(node, 'mousedown',
        CORE.on(node, query, 'touchend', function(event){

            this.ontouchmove = null;

            if(skip_callback){

                //todo remove async
                CORE.async(function(){

                    skip_callback = false;
                    skip_touchmove = false;

                }, 1)
            }
            else {

                if(target){

                    fn.call(this, event, CORE.getClosest(this, target));
                }
                else{

                    fn.call(this, event, this);
                }
            }

            initial_touch_element = null;

            //if(stopBubble && event.stopImmediatePropagation) event.stopImmediatePropagation();

            //CORE.preventEvent(event, preventDefault, stopBubble);

        }, preventDefault, stopBubble, target, key);//);

        //CORE.on(node, query, 'touchend', fn, preventDefault, stopBubble);

        //})(fn, preventDefault, stopBubble);

        return fn;
    };

    /**
     * Set touch-friendly slider events (MSIE requires 'onchange')
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} node
     * @param {Function} fn
     * @param {boolean=} preventDefault
     * @return {Function}
     */

    CORE.addInputEvent = function addInputEvent(node, fn, preventDefault){

        if(typeof node === 'string') node = CORE.query(node);

        CORE.addEvent(node, 'input',
            CORE.addEvent(node, 'change', fn));

        return fn;
    };

    /**
     * Set mouse wheel scroll events
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} node
     * @param {Function} fn
     * @return {Function}
     */

    CORE.addMouseWheelScroll = function addMouseWheelScroll(node, fn){

        //(node = CORE.getNode(node));

        (function(fn){

            var scroll_left = 0;

            CORE.addEvent(node, 'mousewheel', function(event){

                if(this['doScroll']) {

                    this['doScroll'](event.wheelDelta > 0 ? "left" : "right");
                }
                else if((event.wheelDelta || event.detail) > 0){

                    this.scrollLeft = (scroll_left -= (this.offsetWidth / 35));

                }else{

                    this.scrollLeft = (scroll_left += (this.offsetWidth / 35));
                }

                CORE.handleEvent(event, this, fn, /* preventDefault */ false, /* stopBubble */ true);
            });

        })(fn);

        return fn;
    };

    /**
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} node
     * @param {string} eventType
     */

    CORE.triggerMouseEvent = function triggerMouseEvent(node, eventType) {

        var clickEvent = document.createEvent('MouseEvents');

        if(clickEvent) {

            clickEvent.initEvent(eventType, true, true);
            clickEvent.eventName = eventType;
            node.dispatchEvent(clickEvent);
        }
        else{

            if(clickEvent = node[eventType] || node["on" + eventType]) {

                clickEvent();
            }
        }
    };

    /**
     * @param {boolean=} preventDefault
     * @param {boolean=} stopBubble
     */

    CORE.delegateByClass = function delegateByClass(node, classname, event, fn, preventDefault, stopBubble){

        /** @type {Node|Element|HTMLDocument|Window|null|string} */
        (node = CORE.getNode(node));

        (function(classname, fn, preventDefault, stopBubble){

            CORE.addEvent(node, event, function(e){

                var target = e.target || e.srcElement;

                /* Climbs up the node chain, until either the first suitable target is found,
                 * or the container (this) is reached */

                while(target && (target !== this)  /* node */) {

                    //if(target === this) return CORE.preventEvent(e, true, true);

                    if(CORE.hasClass(target, classname)) {

                        //if(e.stopImmediatePropagation) e.stopImmediatePropagation();

                        fn.call(target, e);
                        CORE.preventEvent(e, preventDefault, stopBubble);
                        return;

                        //return CORE.handleEvent(e, target, fn, preventDefault, stopBubble);
                    }

                    target = target.parentNode;
                }
            });

        })(classname, fn, preventDefault, stopBubble);

        return fn;
    };

    /**
     * @param {boolean=} preventDefault
     * @param {boolean=} stopBubble
     */

    CORE.delegateByTag = function delegateByTag(node, tag, event, fn, preventDefault, stopBubble){

        /** @type {Node|Element|HTMLDocument|Window|null|string} */
        (node = CORE.getNode(node));

        (function(tag, fn, preventDefault, stopBubble){

            CORE.addEvent(node, event, function(e){

                var target = e.target || e.srcElement;

                /* Climbs up the node chain, until either the first suitable target is found,
                 * or the container (this) is reached */

                while(target && target != this /* node */) {

                    if(target.tagName.toLowerCase() === tag) {

                        //if(e.stopImmediatePropagation) e.stopImmediatePropagation();

                        fn.call(target, e);
                        CORE.preventEvent(e, preventDefault, stopBubble);

                        //return CORE.handleEvent(e, target, fn, preventDefault, stopBubble);
                    }

                    target = target.parentNode;
                }

            }, /* preventDefault */ false, /* stopBubble */ false);

        })(tag, fn, preventDefault, stopBubble);

        return fn;
    };

    /**
     * @param {boolean=} preventDefault
     * @param {boolean=} stopBubble
     */

    CORE.delegateByTagClass = function delegateByTagClass(node, tag, classname, event, fn, preventDefault, stopBubble){

        /** @type {Node|Element|HTMLDocument|Window|null|string} */
        (node = CORE.getNode(node));

        (function(tag, classname, fn, preventDefault, stopBubble){

            CORE.addEvent(node, event, function(e){

                var target = e.target || e.srcElement;

                /* Climbs up the node chain, until either the first suitable target is found,
                 * or the container (this) is reached */

                while(target && target != this /* node */) {

                    if(target.tagName.toLowerCase() === tag && CORE.hasClass(target, classname)) {

                        if(e.stopImmediatePropagation) e.stopImmediatePropagation();

                        fn.call(target, e);
                        CORE.preventEvent(e, preventDefault, stopBubble);

                        //return CORE.handleEvent(e, target, fn, preventDefault, stopBubble);
                    }

                    target = target.parentNode;
                }

            }, /* preventDefault */ false, /* stopBubble */ false);

        })(tag, classname, fn, preventDefault, stopBubble);

        return fn;
    };

})();
