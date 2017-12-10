goog.provide('APP.VIEW.SWIPE');
goog.require('APP.VIEW');
goog.require('APP.EVENT');
goog.require('CORE');

(function(){

    "use strict";

    var startX,
        distX,
        lastX,
        width,
        limit = false,
        init = null;

    var style_current_view,
        style_current_view_header,
        style_current_view_shadow,
        style_last_view,
        style_last_view_header,
        style_tabbar;

    var prefix_transform = /*CORE.prefix.css +*/ 'transform';

    // Register Event Handler

    (APP.EVENT['_document'] || (APP.EVENT['_document'] = [])).push({

        on: 'touchstart',
        if: 'xone-swipe',
        do: function(e){

            CORE.preventEvent(e, true, true);

            var touchobj = e['changedTouches'][0];

            startX = lastX = touchobj['pageX'];
            width = APP.VIEWPORT.WIDTH;

            CORE.addClass(document.body, 'no-transition');
            //document.body.classList.add('no-transition');

            var dom_view = CORE.getById(APP.VIEW.current_view());
            var view_has_pull = CORE.getByTag('xone-pull', dom_view);

            // FIX: visible shadow when pull-to-refresh is active
            if(view_has_pull.length) {

                view_has_pull[0].nextElementSibling.style[prefix_transform] = '';
            }

            // slide view
            style_current_view = dom_view.style;
            style_current_view_header = CORE.getByTag('xone-header', dom_view)[0].style;
            style_current_view_shadow = CORE.getByTag('xone-shadow', dom_view)[0].style;

            dom_view = CORE.getById(APP.VIEW.last_view());

            // reveal view
            style_last_view = dom_view.style;
            style_last_view_header = CORE.getByTag('h1', dom_view)[0].style;

            // tabbar
            style_tabbar = CORE.getByTag('xone-tabbar')[0].style;

            // enable optimizations
            // style_current_view.willChange = prefix_transform;
            // style_current_view_header.willChange = prefix_transform + ', opacity';
            // style_current_view_shadow.willChange = prefix_transform;
            // style_last_view.willChange = prefix_transform;
            // style_last_view_header.willChange = 'opacity';
            // style_tabbar.willChange = prefix_transform;

            // Inject Handlers

            window.addEventListener('touchmove', swipe_touchmove_handler, true);
            window.addEventListener('touchend', swipe_touchend_handler, true);
            // window.ontouchmove = swipe_touchmove_handler;
            // window.ontouchend = swipe_touchend_handler;
        },
        stopBubble: true,
        preventDefault: true
    });

    /* Animation Controller */

    function swipe_touchmove_handler(e){

        if(!init) {

            init = CORE.paint(render, 'xone-swipe');
        }

        CORE.preventEvent(e, true, true);

        var touchobj = e['changedTouches'][0];

        distX = touchobj['pageX'] - startX;

        if(distX < 0){

            distX = 0;
        }
        else if(limit && (distX > limit)){

            distX = limit;
        }
        else if(distX > width){

            distX = width;
        }
    }

    function swipe_touchend_handler(e){

        CORE.preventEvent(e, true, true);

        var touchobj = e['changedTouches'][0];

        if(init){

            init = CORE.clear(init);
        }

        // Remove Handlers

        window.removeEventListener('touchmove', swipe_touchmove_handler, true);
        window.removeEventListener('touchend', swipe_touchend_handler, true);
        // window.ontouchmove = null;
        // window.ontouchend = null;

        CORE.removeClass(document.body, 'no-transition');
        //document.body.classList.remove('no-transition');

        distX = touchobj['pageX'] - startX;

        if(distX !== 0){

            if(distX > (width / 100 * 38.2)){

                APP.VIEW.slideOut(APP.VIEW.current_view());

                // var current_view = APP.VIEW.current_view();
                // var last_view = APP.VIEW.last_view();
                //
                // CORE.paint(function(){
                //
                //     distX = width;
                //
                //     render();
                //
                //     CORE.paint(function(){
                //
                //         APP.VIEW.slideOut(current_view, last_view);
                //         CORE.paint(resetTransitionState);
                //
                //     }, 800, 'xone-swipe');
                //
                // });
                //
                // return;
            }
        }
        else if(touchobj['pageY'] < 44){

            var target = e.target || e.srcElement;

            CORE.triggerMouseEvent(CORE.getByTag('a', target.parentNode)[0], "touchend");
        }

        CORE.paint(resetTransitionState);
    }

    function render(){

        init = null;

        if(distX !== lastX){

            var transform = 'translate3d(-' + linearOut(distX, 0, 33, width) + '%, 0, 0)';
            var opacity = easeInOutQuint(distX, 0, 1, width);

            // slide view
            style_current_view[prefix_transform] = 'translate3d(' + distX + 'px, 0, 0)';
            style_current_view_header.opacity = 1 - opacity;
            style_current_view_header[prefix_transform] = 'translate3d(-' + linearIn(distX, 0, 50, width) + '%, 0, 0)';
            style_current_view_shadow[prefix_transform] = 'translate3d(-' + linearOut(distX, 0, 44, width) + 'px, 0, 0)';

            // reveal view
            style_last_view_header.opacity = opacity;
            style_last_view[prefix_transform] = transform;

            // tabbar
            style_tabbar[prefix_transform] = transform;

            // cache actual distance
            lastX = distX;
        }
    }

    function resetTransitionState(){

        //CORE.paint(function(){

            // slide view
            style_current_view[prefix_transform] = "";
            style_current_view_header[prefix_transform] = "";
            style_current_view_shadow[prefix_transform] = "";
            style_current_view_header.opacity = "";

            // reveal view
            style_last_view[prefix_transform] = "";
            style_last_view_header.opacity = "";

            // tabbar
            style_tabbar[prefix_transform] = "";

            // unload optimizations
            // style_current_view.willChange = 'auto';
            // style_current_view_header.willChange = 'auto';
            // style_current_view_shadow.willChange = 'auto';
            // style_last_view.willChange = 'auto';
            // style_last_view_header.willChange = 'auto';
            // style_tabbar.willChange = 'auto';

            // cleanup
            style_current_view =
            style_current_view_header =
            style_current_view_shadow =
            style_last_view =
            style_last_view_header =
            style_tabbar = null;
        //});
    }

    /* Easings */

    // t: current time, b: begInnIng value, c: change In value, d: duration
    //function easeInQuint(t, b, c, d) {return c*(t/=d)*t*t*t*t*t + b;}
    //function easeOutQuint(t, b, c, d) {return c*((t=t/d-1)*t*t*t*t + 1) + b;}
    function easeInOutQuint(t, b, c, d) {return ((t/=d/2) < 1) ? (c/2*t*t*t*t*t + b) : (c/2*((t-=2)*t*t*t*t + 2) + b);}
    function linearIn(t, b, c, d){return t / d * c + b;}
    function linearOut(t, b, c, d){return c - (t / d * c + b);}

})();
