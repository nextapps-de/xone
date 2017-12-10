goog.provide('APP.VIEW.PULL');
goog.require('APP.VIEW');
goog.require('CORE');

APP.VIEW.PULL = (function(){

    "use strict";

    /** @const */
    var pulldown_height = 50;
    var pull_down = false;
    var scroll_start = 0;
    var scroll_pos = 0;
    var last_pos = 0;
    var loading_timer = null;
    var loading_animation = null;
    var pull_element = null;
    var section_element = null;
    var pull_element_style = null;
    var section_element_style = null;
    var init = null;

    var prefix_transform = /*CORE.prefix.css +*/ 'transform';

    /** @const */

    return {

        register: function(pull_element){

            pull_element.nextElementSibling.ontouchstart = pull_touchstart_handler;
        }
    };

    function pull_touchstart_handler(event){

        if(CORE.getByClass('default', this).length){

            CORE.preventEvent(event, true, true);
            return;
        }

        // break active pull request
        if(loading_timer && (section_element !== this)
                         && (this.scrollTop === 0)
                         && (!this.parentNode || (this.parentNode.scrollTop === 0))){

            stopPull();
        }

        if(!loading_timer && (this.scrollTop === 0)
                          && (!this.parentNode || (this.parentNode.scrollTop === 0))){

            // stop active pull animations
            if(loading_animation){

                loading_animation.stop();
            }

            section_element = this;
            pull_element = CORE.getPrevious(this, 'xone-pull');

            if(pull_element){

                pull_element_style = pull_element.style;
                section_element_style = section_element.style;

                //section_element_style.willChange = prefix_transform;
                //pull_element_style.willChange = prefix_transform + ', opacity';

                // pause auto spinner animation
                CORE.addClass(pull_element, 'pause');

                scroll_start = scroll_pos = event['changedTouches'][0]['pageY'];

                // attach handlers
                window.ontouchmove = pull_touchmove_handler;
                window.ontouchend = pull_touchend_handler;
            }
        }
    }

    function pull_touchmove_handler(event){

        scroll_pos = event['changedTouches'][0]['pageY'] - scroll_start;

        if(scroll_pos > 0){

            if(!init) {

                init = CORE.paint(render, 'xone-pull');
            }

            CORE.preventEvent(event, true, true);

            pull_down = true;
        }
        else if(!init){

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

        if(pull_down) {

            CORE.preventEvent(event, true, true);

            scroll_pos = event['changedTouches'][0]['pageY'] - scroll_start;

            if(scroll_pos > 0) {

                // has reached the threshold to request a pull

                if(scroll_pos >= pulldown_height) {

                    CORE.removeClass(pull_element, 'pause');

                    loading_animation = CORE.animate(section_element, {

                        'transform': 'translate3d(0, ' + pulldown_height + 'px, 0)'

                    }, 350, 'ease');

                    APP.CONTROLLER.request(pull_element.getAttribute('href'));

                    loading_timer = CORE.async(function(){

                        CORE.animate(section_element, {

                            'transform': 'translate3d(0, 0, 0)'

                        }, 350, 'ease');

                        loading_animation = CORE.animate(pull_element, {

                            'opacity': 0

                        }, 350, 'ease', stopPull);

                    }, 1000);
                }

                // pull request aborted
                // content container needs to be animate back to top

                else{

                    CORE.animate(section_element, {

                        'transform': 'translate3d(0, 0, 0)'

                    }, 350, 'ease');

                    loading_animation = CORE.animate(pull_element, {

                        'opacity': 0,
                        'transform': 'translate3d(0, 0, 0)'

                    }, 350, 'ease', stopPull);
                }
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

            if(scroll_pos > pulldown_height){

                section_element_style[prefix_transform] = 'translate3d(0, ' + (pulldown_height + Math.sqrt(scroll_pos - pulldown_height) * Math.sqrt(scroll_pos / pulldown_height)) + 'px, 0)';
                pull_element_style[prefix_transform] = 'translate3d(0, ' + pulldown_height + 'px, 0) rotate(' + (scroll_pos * 2) + 'deg)';
                pull_element_style.opacity = 1;
            }
            else if(scroll_pos < 0){

                section_element_style[prefix_transform] = 'translate3d(0, 0, 0)';
                pull_element_style[prefix_transform] = 'translate3d(0, 0, 0) rotate(' + (scroll_pos * 2) + 'deg)';
                pull_element_style.opacity = 0;
            }
            else{

                section_element_style[prefix_transform] = 'translate3d(0, ' + scroll_pos + 'px, 0)';
                pull_element_style[prefix_transform] = 'translate3d(0, ' + scroll_pos + 'px, 0) rotate(' + (scroll_pos * 2) + 'deg)';
                pull_element_style.opacity = CORE.Math.max(1 / pulldown_height / pulldown_height * scroll_pos * scroll_pos, 0);
            }

            // cache actual distance
            last_pos = scroll_pos;
        }
    }

    function stopPull(){

        if(loading_timer) {

            CORE.clear(loading_timer);
        }

        if(loading_animation){

            loading_animation.stop();
        }

        pull_element_style.opacity = '';
        pull_element_style[prefix_transform] = '';
        //pull_element_style.willChange = 'auto';

        section_element_style[prefix_transform] = '';
        //section_element_style.willChange = 'auto';

        CORE.addClass(pull_element, 'pause');

        pull_down = false;
        init = null;
        loading_timer = null;
        loading_animation = null;
        section_element = null;
        pull_element = null;
        pull_element_style = null;
        section_element_style = null;
        scroll_start = scroll_pos = 0;
    }

})();
