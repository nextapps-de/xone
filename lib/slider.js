goog.provide('APP.VIEW.SLIDER');
goog.require('APP.VIEW');
goog.require('APP.EVENT');
goog.require('CORE');

(function(){

    "use strict";

    var startX,
        distX,
        lastX,
        width,
        init = null;

    var dom_current_view,
        style_current_view,
        current_animation;

    var current_index = 0,
        page_limit = 1;

    var prefix_transform = /*CORE.prefix.css +*/ 'transform';

    // Register Event Handler

    (APP.EVENT['_document'] || (APP.EVENT['_document'] = [])).push({

        on: 'touchstart',
        if: 'xone-slider',
        do: function(e){

            if(current_animation){

                current_animation.stop();
            }

            var touchobj = e['changedTouches'][0];

            startX = lastX = touchobj['pageX'];
            width = APP.VIEWPORT.WIDTH;
            page_limit = this.firstElementChild.childElementCount;

            dom_current_view = this;
            style_current_view = dom_current_view.style;

            //style_current_view.willChange = prefix_transform;

            // Inject Handlers

            window.addEventListener('touchmove', slider_touchmove_handler, true);
            window.addEventListener('touchend', slider_touchend_handler, true);
            // window.ontouchmove = slider_touchmove_handler;
            // window.ontouchend = slider_touchend_handler;
        },
        stopBubble: true,
        preventDefault: true
    });

    /* Animation Controller */

    function slider_touchmove_handler(e){

        if(!init) {

            init = CORE.paint(render, 'xone-slider');
        }

        CORE.preventEvent(e, true, true);

        var touchobj = e['changedTouches'][0];

        distX = touchobj['pageX'] - startX;

        // left bound:
        if((distX > 0) && (current_index === 0)){

            distX = Math.sqrt(distX) * 3;
        }
        // right bound:
        else if((distX < 0) && (current_index === page_limit - 1)){

            distX = Math.sqrt(distX * -1) * 3 * -1;
        }
    }

    function slider_touchend_handler(e){

        CORE.preventEvent(e, true, true);

        var touchobj = e['changedTouches'][0];

        if(init){

            init = CORE.clear(init);
        }

        CORE.setStyle(dom_current_view, {

            'transform': 'translate3d(' + (-current_index * width + distX) + 'px, 0, 0)'
        });

        distX = touchobj['pageX'] - startX;

        if(distX !== 0){

            if(dom_current_view){

                // left swipe:
                if(distX > (width / 100 * 15)){

                    if(current_index > 0) current_index--;
                }
                // right swipe:
                else if(distX < -(width / 100 * 15)){

                    if(current_index < (page_limit - 1)) current_index++;
                }

                current_animation = CORE.animate(dom_current_view, {

                    'transform': 'translate3d(' + (-current_index * 100) + '%, 0, 0)'

                }, 800, 'cubic', resetTransitionState);

                var pager = CORE.getByClass('page', dom_current_view);

                if(!pager.length){

                    pager = CORE.getByClass('page', dom_current_view.parentNode);
                }

                if(pager.length){

                    CORE.removeClass(pager, 'active');
                    CORE.addClass(pager[current_index], 'active');
                }
            }
        }
        else{

            CORE.paint(resetTransitionState);
        }

        // Remove Handlers

        window.removeEventListener('touchmove', slider_touchmove_handler, true);
        window.removeEventListener('touchend', slider_touchend_handler, true);
        // window.ontouchmove = null;
        // window.ontouchend = null;
    }

    function render(){

        init = null;

        if(distX !== lastX){

            // slide view
            if(style_current_view){

                style_current_view[prefix_transform] = 'translate3d(' + (-current_index * width + distX) + 'px, 0, 0)';
            }

            // cache actual distance
            lastX = distX;
        }
    }

    function resetTransitionState(){

        CORE.paint(function(){

            // slide view
            style_current_view[prefix_transform] = 'translate3d(' + (-current_index * 100) + '%, 0, 0)';
            //style_current_view.willChange = 'auto';

            // cleanup
            dom_current_view =
            style_current_view =
            current_animation = null;
        });
    }
})();
