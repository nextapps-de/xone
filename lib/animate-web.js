//goog.provide('CORE.ANIMATE');
goog.require('CORE.PAINT');
goog.require('CORE');
goog.require('INTERFACE');
goog.require('CONFIG');

/*
    // default usage:

    CORE.animate('#div', {

        'left': '2px',
        'top': '5px',

    }, 2000, 'ease-out', function(){

        // callback
    });

    // nodelist:

    CORE.animate([

        '#div1',
        document.body.firstElementChild,
        '#div3'
    ], {

        'left': '0px',
    });

    // from, to:

    CORE.animate('#div', [{

        'left': '100%',
    },{

        'left': '0%',
    }]);

    // control animations:

    var control = CORE.animate('#div', 'left', '0%');

    control.stop();
    control.pause();
    control.destroy();
    control.resume();
    control.reverse();
    control.finish();

    control.seek(0.5); // seek to 50%
    control.speed(0.5); // half the speed

 */

/**
 *
 * @param {string|Node|Array<Node>|NodeList} query_or_nodes
 * @param {!Object<string, number|string>|Array<Object<string, number|string>>} keyframes
 * @param {!Object<string, number|string>} properties
 * @param {Function=} callback
 */

CORE.animate = (function(){

    var animation_stack = [];

    return function(query_or_nodes, keyframes, properties, callback){

        if(typeof query_or_nodes === 'string'){

            query_or_nodes = CORE.queryAll(query_or_nodes);
        }

        if(!query_or_nodes.length){

            query_or_nodes = [query_or_nodes];
        }

        if(!keyframes.length){

            var initial_keyframes = {};

            for(var key in keyframes){

                if(keyframes.hasOwnProperty(key)){

                    initial_keyframes[key] = CORE.getStyle(query_or_nodes[0], key);
                }
            }

            keyframes = [initial_keyframes, keyframes];
        }

        properties || (properties = {});

        for(var i = 0; i < query_or_nodes.length; i++){

            //var controller = (function(node){

                var node = query_or_nodes[i];

                var controller = node['animate'](keyframes, {

                    'duration': properties.duration || CONFIG.TRANSITION_DEFAULT_TIME || 350,
                    'easing': properties.easing || 'cubic-bezier(0.1, 0.7, 0.1, 1)' || 'ease',
                    'fill': properties.fill || 'forwards',
                    'delay': properties.delay || 0,
                    'direction': properties.direction || 'normal',
                    'endDelay': properties.endDelay || 0
                });

                if(callback && (i === query_or_nodes.length - 1)) controller['onfinish'] = callback;

                /*
                if(callback){

                    controller['onfinish'] = function(){

                        CORE.setStyle(node, keyframes[1]);
                        CORE.paint(callback);
                    };
                }
                else{

                    controller['onfinish'] = function(){

                        console.log(keyframes[1]);

                        CORE.setStyle(node, keyframes[1]);
                    };
                }
                */

                //return controller;

            //})(query_or_nodes[i]);

            animation_stack.push(controller);
        }

        return{

            seek: function(time){

                for(var i = 0; i < animation_stack.length; i++){

                    animation_stack[i].currentTime = time;
                }
            },

            reset: function(){

                this.seek(0);
            },

            play: function(){

                control(animation_stack, 'play');
            },

            pause: function(){

                control(animation_stack, 'pause');
            },

            stop: function(){

                control(animation_stack, 'stop');
            },

            finish: function(){

                control(animation_stack, 'finish');
            }
        };

        function control(animations, method){

            for(var i = 0; i < animations.length; i++){

                animations[i][method]();
            }
        }


        /*
        var controller = window['Amo']['keyframes'](keyframes)['animate']({

            'mode': properties.mode || 'forwards',
            'duration': 350,
            'easing': 'ease-out',
            'time': properties.time || 1,
            'delay': 0,
            'direction': properties.direction || 'normal'
        });

        controller['run'](query_or_nodes, function(){

            if(callback) callback();
        });

        return controller;
        */
    };

})();


/**
 * @param {Array<(Node|null)>|Node|NodeList|string|null} obj
 * @param {string|Object} params
 * @param {string|number=} arg3
 * @param {number|string|Function=} arg4
 * @param {string|Function=} arg5
 * @param {Function=} arg6
 * @param {Function=} arg7
 */

// CORE.transition = function(obj, params, arg3, arg4, arg5, arg6, arg7){
//
//     if(DEBUG) {
//
//         GRAPH.register('CORE.transition');
//     }
//
//     if(params.delay){
//
//         (function(obj, params){
//
//             var index = -1;
//
//             return (
//
//                 index = PROC_TIMER[PROC_TIMER.length] = /** @type {number} */ (
//
//                     CORE.async(function(){
//
//                         var i = PROC_TIMER.indexOf(index);
//
//                         if(i > -1) {
//
//                             PROC_TIMER.splice(i, 1);
//                         }
//
//                         params.delay = 0;
//
//                         CORE.transition(obj, params);
//
//                     }, params.delay)
//                 )
//             );
//
//         })(obj, params);
//     }
//
//     if(typeof obj === 'string') obj = CORE.query(obj);
//
//     var length = obj.length;
//
//     if(length){
//
//         for(var i = 0; i < length; i++){
//
//             CORE.transition(obj[i], params)
//         }
//
//         return;
//     }
//
//     if(params.from) CORE.setStyle(obj, params.style, params.from);
//
//     var css_animation = {
//
//         'transitionProperty': params.style,
//         'transitionDuration': params.duration || 350,
//         'transitionDelay': params.delay || 0,
//         'transitionTimingFunction': params.ease || 'ease-in'
//     };
//
//     var css_animation_prefixed = {};
//     //var prefix_normalized = prefix.replace(/-/g, '');
//
//     css_animation_prefixed[prefix_css + 'TransitionProperty'] = params.style;
//     css_animation_prefixed[prefix_css + 'TransitionDuration'] = params.duration || 350;
//     css_animation_prefixed[prefix_css + 'TransitionDelay'] = params.delay || 0;
//     css_animation_prefixed[prefix_css + 'TransitionTimingFunction'] = params.ease || 'ease-in';
//
//     CORE.setStyle(obj, css_animation_prefixed);
//     CORE.setStyle(obj, css_animation);
//
//     (function(obj, style, to){
//
//         CORE.paint(function(){
//
//             CORE.setStyle(obj, style, to);
//         });
//
//     })(obj, params.style, params.to);
//
//     if(params.callback){
//
//         (function(object, callback){
//
//             var index = -1;
//
//             return (
//
//                 index = PROC_TIMER[PROC_TIMER.length] = /** @type {number} */ (
//
//                     CORE.async(function(){
//
//                         var i = PROC_TIMER.indexOf(index);
//
//                         if(i > -1) {
//
//                             PROC_TIMER.splice(i, 1);
//                         }
//
//                         callback.call(object);
//
//                     }, params.duration || 3500)
//                 )
//             );
//
//         })(obj, params.callback);
//     }
// };
