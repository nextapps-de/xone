goog.provide('APP.VIEW.BOUNCE');
goog.require('APP.VIEW');
goog.require('CORE');

APP.VIEW.BOUNCE = (function(){

    var pull_down = false;
    var scroll_start = 0;
    var scroll_pos = 0;
    var last_pos = 0;
    var loading_timer = null;
    var loading_animation = null;
    var section_element = null;
    var section_element_style = null;
    var init = null;

    var prefix_transform = CORE.prefix.css + 'transform';

    /** @const */

    return {

        register: function(section_element){

            section_element.ontouchstart = pull_touchstart_handler;
        }
    };

    function pull_touchstart_handler(event){

        // break active pull request
        // if(loading_timer && this.scrollTop === 0 && this.parentNode.scrollTop === 0){
        //
        //     stopPull();
        // }

        if(section_element.scrollTop === 0 && section_element.parentNode.scrollTop === 0){

            section_element = this;

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

                init = CORE.paint(render);
            }

            CORE.preventEvent(event, true, true);

            pull_down = true;
        }
        // else if(!init){
        //
        //     stopPull();
        //
        //     window.ontouchmove = null;
        //     window.ontouchend = null;
        // }
        else{

            pull_down = false;
        }
    }

    function pull_touchend_handler(event){

        if(init){

            init = CORE.clear(init);
        }

        if(pull_down) {

            CORE.preventEvent(event, true, true);

            scroll_pos = event['changedTouches'][0]['pageY'] - scroll_start;

            if(scroll_pos > 0) {

                // content container needs to be animate back to top

                CORE.animate(section_element, {

                    'transform': 'translate3d(0, 0, 0)'

                }, 350, 'ease');
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

        if(scroll_pos !== last_pos){

            if(scroll_pos > 0){

                section_element_style[prefix_transform] = 'translate3d(0, ' + Math.sqrt(scroll_pos) * Math.sqrt(scroll_pos) + 'px, 0)';
            }
            else {

                section_element_style[prefix_transform] = 'translate3d(0, 0, 0)';
            }

            // cache actual distance
            last_pos = scroll_pos;
        }
    }

    function stopPull(){

        CORE.forceStyle(section_element, {

            'transform': ''
        });

        pull_down = false;
        init = null;
        loading_timer = null;
        loading_animation = null;
        section_element = null;
        section_element_style = null;
        scroll_start = scroll_pos = 0;
    }

})();
