goog.provide('APP.VIEW.PULL');
goog.require('APP.VIEW');
goog.require('CORE');

APP.VIEW.PULL = (function(){

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
    var spinner = null;
    var init = null;

    var prefix_transform = CORE.prefix.css + 'transform';

    var spinner_opts = {

        'lines': 13, // The number of lines to draw
        'length': 28, // The length of each line
        'width': 14, // The line thickness
        'radius': 42, // The radius of the inner circle
        'scale': 0.15, // Scales overall size of the spinner
        'corners': 1, // Corner roundness (0..1)
        'color': '#555', // #rgb or #rrggbb or array of colors
        'opacity': 0.25, // Opacity of the lines
        'rotate': 0 ,// The rotation offset
        'direction': 1, // 1: clockwise, -1: counterclockwise
        'speed': 1, // Rounds per second
        'trail': 60, // Afterglow percentage
        'fps': 60, // Frames per second when using setTimeout() as a fallback for CSS
        'zIndex': 2, // The z-index (defaults to 2000000000)
        'className': 'spinner', // The CSS class to assign to the spinner
        'top': '50%', // Top position relative to parent
        'left': '50%', // Left position relative to parent
        'shadow': false, // Whether to render a shadow
        'hwaccel': true, // Whether to use hardware acceleration
        'position': 'absolute' // Element positioning
    };

    /** @const */

    return {

        register: function(pull_element){

            pull_element.nextElementSibling.ontouchstart = pull_touchstart_handler;
        }
    };

    function pull_touchstart_handler(event){

        // break active pull request
        if(loading_timer && (section_element !== this) && this.scrollTop === 0){

            stopPull();
        }

        if(!loading_timer && this.scrollTop === 0){

            // stop active pull animations
            if(loading_animation){

                loading_animation.stop();
            }

            section_element = this;
            pull_element = CORE.getPrevious(this, '.pull');

            if(pull_element){

                pull_element_style = pull_element.style;
                section_element_style = section_element.style;

                spinner || (spinner = new window['Spinner'](spinner_opts));
                spinner['spin'](pull_element);

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

            CORE.preventEvent(event, true, true);

            if(!init){

                render();
            }

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

                if(scroll_pos >= 50) {

                    CORE.removeClass(pull_element, 'pause');

                    loading_animation = CORE.animate(section_element, {

                        'transform': 'translate3d(0, 50px, 0)'

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

        init = window.requestAnimationFrame(function(){

            render();

            if(scroll_pos !== last_pos){

                if(scroll_pos > 50){

                    section_element_style[prefix_transform] = 'translate3d(0, ' + (50 + Math.sqrt((scroll_pos - 50) * 15) | 0) + 'px, 0)';
                    pull_element_style[prefix_transform] = 'translate3d(0, 50px, 0) rotate(' + (scroll_pos * 2) + 'deg)';
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
                    pull_element_style.opacity = CORE.Math.max(1 / 50 / 50 * scroll_pos * scroll_pos, 0);
                }

                // cache actual distance
                last_pos = scroll_pos;
            }
        });
    }

    function stopPull(){

        if(init){

            CORE.clear(init);
        }

        if(loading_timer) {

            CORE.clear(loading_timer);
        }

        if(loading_animation){

            loading_animation.stop();
        }

        spinner['stop']();

        CORE.forceStyle(pull_element, {

            'opacity': '',
            'transform': ''
        });

        CORE.forceStyle(section_element, {

            'transform': ''
        });

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
