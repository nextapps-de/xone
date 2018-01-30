goog.provide('APP.VIEW.SIDEBAR');
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

    var style_current_view_header,
        style_current_view_section,
        style_last_view,
        style_last_view_header,
        style_tabbar;

    var is_reveal_state = false;

    var prefix_transform = /*CORE.prefix.css +*/ 'transform';

    // Register Event Handler

    (APP.EVENT['_document'] || (APP.EVENT['_document'] = [])).push({

        on: 'touchstart',
        if: 'xone-swipe-sidebar',
        do: function(e){

            CORE.preventEvent(e, true, true);

            var touchobj = e['changedTouches'] && e['changedTouches'][0];

            if(!touchobj) return;

            startX = lastX = touchobj['pageX'];
            width = APP.VIEWPORT.WIDTH;
            limit = (width / 100 * 80) | 0;

            CORE.addClass(document.body, 'no-transition');

            // sidebar
            style_current_view_header = CORE.getByTag('h1', 'main-sidebar')[0].style;
            style_current_view_section = CORE.getByTag('xone-main', 'main-sidebar')[0].style;

            if(CORE.hasClass(this.parentNode, 'reveal-sidebar')){

                is_reveal_state = true;

                var dom_view = CORE.getById(APP.VIEW.last_view() || APP.VIEW.current_view());

                startX = lastX = startX - limit;
            }
            else{

                is_reveal_state = false;

                CORE.setStyle('#main-sidebar', 'visibility', 'visible');

                var dom_view = CORE.getById(APP.VIEW.current_view());
            }

            // reveal view
            style_last_view = dom_view.style;
            style_last_view_header = CORE.getByTag('h1', dom_view)[0].style;

            // tabbar
            style_tabbar = CORE.getByTag('xone-tabbar')[0].style;

            // Inject Handlers

            window.addEventListener('touchmove', swipe_touchmove_handler, true);
            window.addEventListener('touchend', swipe_touchend_handler, true);
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

        var touchobj = e['changedTouches'] && e['changedTouches'][0];

        if(!touchobj) return;

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

        var touchobj = e['changedTouches'] && e['changedTouches'][0];

        if(!touchobj) return;

        if(init){

            init = CORE.clear(init);
        }

        distX = touchobj['pageX'] - startX;

        CORE.removeClass(document.body, 'no-transition');

        if(!is_reveal_state && (distX !== 0)){

            if(distX > (width / 100 * 38.2)){

                APP.VIEW.showSidebar('main-sidebar');
            }
        }
        else if(is_reveal_state && (distX < limit)){

            if(distX < (width / 100 * 61.8)){

                APP.VIEW.hideSidebar('main-sidebar');
            }
        }
        else if(is_reveal_state || (touchobj['pageY'] < 44)){

            var target = e.target || e.srcElement;

            CORE.triggerMouseEvent(CORE.getByTag('a', target.parentNode)[0], "touchend");
        }

        resetTransitionState();

        // Remove Handlers

        window.removeEventListener('touchmove', swipe_touchmove_handler, true);
        window.removeEventListener('touchend', swipe_touchend_handler, true);
    }

    function render(){

        init = null;

        if(distX !== lastX){

            var opacity = linearIn(distX, 0, 1, width / 100 * 80);
            var transform = 'translate3d(' + linearIn(distX, 0, 80, width / 100 * 80) + '%, 0, 0)';

            // sidebar
            style_current_view_header.opacity = opacity;
            style_current_view_section.opacity = opacity;

            opacity = linearOut(distX, 0, 1, width / 100 * 80);

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

        if(!is_reveal_state) {

            CORE.setStyle('main-sidebar', 'visibility', '');
        }

        CORE.paint(function(){

            // slide view
            style_current_view_header.opacity = "";
            style_current_view_section.opacity = "";

            // reveal view
            style_last_view[prefix_transform] = "";
            style_last_view_header.opacity = "";

            // tabbar
            style_tabbar[prefix_transform] = "";

            // cleanup
            style_current_view_header =
            style_current_view_section =
            style_last_view =
            style_last_view_header =
            style_tabbar = null;
        });
    }

    /* Easings */

    function linearIn(t, b, c, d){return t / d * c + b;}
    function linearOut(t, b, c, d){return c - (t / d * c + b);}

})();
