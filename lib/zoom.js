goog.provide('APP.VIEW.ZOOM');
goog.require('APP.VIEW');
goog.require('CORE');

APP.VIEW.ZOOM = (function(){

    var pull_down = false;
    var scroll_start = 0;
    var scroll_pos = 0;
    var last_pos = 0;
    var init = null;

    var section_element = null;
    var section_element_style = null;
    var pull_element = null;
    var pull_element_style = null;
    var loading_animation = null;

    var height = APP.VIEWPORT.HEIGHT;
    var prefix_transform = CORE.prefix.css + 'transform';

    var is_cordova_ios = (PLATFORM === 'cordova') && CORE.System.isIOS;

    /** @const */

    return {

        register: function(pull_element){

            pull_element.parentNode.parentNode.ontouchstart = pull_touchstart_handler;
        }
    };

    function pull_touchstart_handler(event){

        if(this.scrollTop === 0){

            pull_element = this.firstElementChild.firstElementChild.nextElementSibling;
            pull_element_style = pull_element.style;

            section_element = pull_element.nextElementSibling;
            section_element_style = section_element.style;

            scroll_start = scroll_pos = event['changedTouches'][0]['pageY'];

            // attach handlers
            window.ontouchmove = pull_touchmove_handler;
            window.ontouchend = pull_touchend_handler;
        }
    }

    function pull_touchmove_handler(event){

        scroll_pos = event['changedTouches'][0]['pageY'] - scroll_start;

        if(scroll_pos > 0){

            if(!init) {

                init = CORE.paint(render, 0, 'zoom');
            }

            if(!is_cordova_ios) {

                CORE.preventEvent(event, true, true);
            }

            pull_down = true;
        }
        else if(!is_cordova_ios && !init){

            stopPull();

            window.ontouchmove = null;
            window.ontouchend = null;
        }
        else{

            pull_down = false;
        }
    }

    function pull_touchend_handler(event){

        if(init){

            init = CORE.clear(init);
        }

        if(pull_down && pull_element_style) {

            CORE.preventEvent(event, true, true);

            scroll_pos = event['changedTouches'][0]['pageY'] - scroll_start;

            if(scroll_pos > 0) {

                loading_animation = CORE.animate([pull_element, section_element], {

                    'transform': 'translate3d(0, 0, 0) scale(1)'

                }, 800, 'cubic', stopPull);
            }
            else{

                stopPull();
            }
        }
        else{

            stopPull();
        }

        window.ontouchmove = null;
        window.ontouchend = null;
    }

    function render(){

        init = null;

        if(pull_element_style){

            if(scroll_pos !== last_pos){

                var delta = Math.sqrt(scroll_pos / 2);
                    delta *= delta;

                if(is_cordova_ios){

                    pull_element_style[prefix_transform] = 'translate3d(0, -' + (delta / 2) + 'px, 0) scale(' + (1 + delta / (height / 2.6)) + ')';
                }
                else{

                    pull_element_style[prefix_transform] = 'translate3d(0, ' + (delta / 2) + 'px, 0) scale(' + (1 + delta / (height / 2.6)) + ')';
                    section_element_style[prefix_transform] = 'translate3d(0, ' + delta + 'px, 0)';
                }

                // cache actual distance
                last_pos = scroll_pos;
            }
        }
    }

    function stopPull(){

        if(loading_animation){

            loading_animation.stop();
        }

        CORE.forceStyle(section_element, {

            'transform': ''
        });

        CORE.forceStyle(pull_element, {

            'transform': ''
        });

        pull_down = false;
        init = null;
        loading_animation = null;
        pull_element = null;
        pull_element_style = null;
        section_element = null;
        section_element_style = null;
        scroll_start = scroll_pos = 0;
    }

})();
