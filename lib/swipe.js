goog.provide('APP.VIEW.SWIPE');
goog.require('APP.VIEW');
goog.require('APP.EVENT');
goog.require('CORE');

(function(){

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

    var prefix_transform = CORE.prefix.css + 'transform';

    // Register Event Handler

    (APP.EVENT['_document'] || (APP.EVENT['_document'] = [])).push({

        on: 'touchstart',
        if: '.swipe',
        do: function(e){

            var touchobj = e['changedTouches'][0];

            startX = lastX = touchobj['pageX'];
            width = APP.VIEWPORT.WIDTH;

            CORE.addClass(document.body, 'no-transition');

            var dom_view = CORE.getById(APP.VIEW.current_view());
            var view_has_pull = CORE.getByClass('pull', dom_view);

            // fix visible shadow when pull-to-refresh is active
            if(view_has_pull.length) view_has_pull[0].nextElementSibling.style[prefix_transform] = '';

            // slide view
            style_current_view = dom_view.style;
            style_current_view_header = CORE.getByTag('xone-header', dom_view)[0].style;
            style_current_view_shadow = CORE.getByClass('shadow', dom_view)[0].style;

            dom_view = CORE.getById(APP.VIEW.last_view());

            // reveal view
            style_last_view = dom_view.style;
            style_last_view_header = CORE.getByTag('xone-header', dom_view)[0].style;

            // tabbar
            style_tabbar = CORE.getByTag('xone-tabbar')[0].style;

            // Inject Handlers

            window.ontouchmove = swipe_touchmove_handler;
            window.ontouchend = swipe_touchend_handler;
        },
        stopBubble: true,
        preventDefault: true
    });

    /* Animation Controller */

    function swipe_touchmove_handler(e){

        if(!init) {

            init = CORE.paint(render, 0, 'swipe');
        }

        CORE.preventEvent(e, true, true);

        var touchobj = e['changedTouches'][0];

        distX = touchobj['pageX'] - startX;

        if(distX < 0){

            distX = 0;
        }
        else if(limit && (distX > width / 100 * limit)){

            distX = width / 100 * limit;
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

        distX = touchobj['pageX'] - startX;

        if(distX !== 0){

            if(distX > (width / 100 * 38.2)) {

                APP.VIEW.slideOut(APP.VIEW.current_view());
            }
        }
        else if(touchobj['pageY'] < 44){

            var target = e.target || e.srcElement;

            CORE.triggerMouseEvent(CORE.getByTag('a', target.parentNode)[0], "touchend");
        }

        CORE.paint(resetTransitionState);
        CORE.removeClass(document.body, 'no-transition');

        // Remove Handlers

        window.ontouchmove = null;
        window.ontouchend = null;
    }

    function render(){

        init = null;

        if(distX !== lastX){

            // slide view
            style_current_view[prefix_transform] = 'translate3d(' + distX + 'px, 0, 0)';
            style_current_view_header.opacity = 1 - easeOutQuint(distX, 0, 1, width);
            style_current_view_header[prefix_transform] = 'translate3d(-' + linearIn(distX, 0, 33, width) + '%, 0, 0)';
            style_current_view_shadow[prefix_transform] = 'translate3d(-' + linearOut(distX, 0, 44, width) + 'px, 0, 0)';

            // reveal view
            style_last_view_header.opacity = easeInOutQuint(distX, 0, 1, width);
            style_last_view[prefix_transform] = 'translate3d(-' + linearOut(distX, 0, 33, width) + '%, 0, 0)';

            // tabbar
            style_tabbar[prefix_transform] = 'translate3d(-' + linearOut(distX, 0, 33, width) + '%, 0, 0)';

            // cache actual distance
            lastX = distX;
        }
    }

    function resetTransitionState(){

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

        // collect garbage
        style_current_view =
        style_current_view_header =
        style_current_view_shadow =
        style_last_view =
        style_last_view_header =
        style_tabbar = null;
    }

    /* Easings */

    // t: current time, b: begInnIng value, c: change In value, d: duration
    function easeInQuint(t, b, c, d) {return c*(t/=d)*t*t*t*t*t + b;}
    function easeOutQuint(t, b, c, d) {return c*((t=t/d-1)*t*t*t*t + 1) + b;}
    function easeInOutQuint(t, b, c, d) {return ((t/=d/2) < 1) ? (c/2*t*t*t*t*t + b) : (c/2*((t-=2)*t*t*t*t + 2) + b);}
    function linearIn(t, b, c, d){return t / d * c + b;}
    function linearOut(t, b, c, d){return c - (t / d * c + b);}

})();
