goog.provide('CORE.ANIMATE');
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

CORE.animate = (function(){

    "use strict";

    var timer = null;

    /**
     * @param timer
     * @param query_or_nodes
     * @param properties
     * @param callback
     * @constructor
     */

    function AnimationController(timer, query_or_nodes, properties, callback){

        this.callback = callback;
        this.properties = properties;
        this.query_or_nodes = query_or_nodes;
        this.timer = timer;
    }

    AnimationController.prototype.stop = function(){

        if(this.timer){

            CORE.clear(this.timer);

            this.timer = null;
        }

        CORE.setStyle(this.query_or_nodes, {

            'transition': ''
        });
    };

    AnimationController.prototype.finish = function(){

        this.stop();

        CORE.setStyle(

            this.query_or_nodes,
            /** @type {Object<string, number|string>} */
            (this.properties)
        );

        if(this.callback) this.callback();
    };

    AnimationController.prototype.destroy = function(){

        this.callback =
        this.properties =
        this.query_or_nodes =
        this.timer = null;
        this.old_style = null;
    };

    // TODO:
    // AnimationController.prototype.pause = function(){};
    // AnimationController.prototype.resume = function(){};
    // AnimationController.prototype.reverse = function(){};
    // AnimationController.prototype.seek = function(factor){};
    // AnimationController.prototype.speed = function(factor){};

    return (

        /**
         *
         * @param {string|Node|Array<Node>|NodeList} query_or_nodes
         * @param {!Object<string, number|string>|Array<Object<string, number|string>>} properties
         * @param {number=} duration
         * @param {string=} easing
         * @param {Function=} callback
         * @returns {AnimationController}
         */

        function(query_or_nodes, properties, duration, easing, callback){

            duration || (duration = CONFIG.TRANSITION_DEFAULT_TIME || 350);
            easing || (easing = 'ease');

            if(easing === 'cubic'){

                easing = 'cubic-bezier(0.2, 1, 0.2, 1)';
            }

            if(typeof query_or_nodes === 'string'){

                query_or_nodes = CORE.queryAll(query_or_nodes);
            }

            if(!query_or_nodes.length) {

                query_or_nodes = [query_or_nodes];
            }

            var prepare;

            if(CORE.isArray(properties)){

                prepare = properties[0];
                properties = properties[1];
            }
            else{

                prepare = {};
            }

            var keys = CORE.getKeys(properties);
            var join = ' ' + duration + 'ms' + ' ' + easing;
            var css = (keys.join(join + ',') + join);

            for(var i = 0; i < query_or_nodes.length; i++){

                var element = query_or_nodes[i];

                if(element['_animate']){

                    CORE.clear(element['_animate']);
                    element['_animate'] = null;
                }

                prepare['transition'] = css;

                (function(element, i, properties, duration, callback){

                    //var old_style_value = CORE.getStyle(element, 'will-change');
                    //var new_style_value = CORE.getKeys(properties).join(', ');

                    //if(new_style_value && (!old_style_value || (old_style_value === 'auto') || !CORE.contains(old_style_value, new_style_value))){

                    //    properties['will-change'] = (old_style_value ? old_style_value + ', ' : '') + new_style_value;
                    //}

                    CORE.prepareStyle(element, prepare, function(){

                        CORE.setStyle(

                            this,
                            /** @type {Object<string, number|string>} */
                            (properties)
                        );

                        properties = null;
                    });

                    if(i === query_or_nodes.length - 1) {

                        element['_animate'] = timer = CORE.paint(function(){

                            element['_animate'] = timer = null;

                            CORE.setStyle(query_or_nodes, {

                                'transition': ''
                                //'will-change': old_style_value
                            });

                            if(callback) callback.call(element);

                            query_or_nodes =
                            callback =
                            element = null;

                        }, duration);
                    }

                })(element, i, properties, duration, callback);
            }

            return new AnimationController(

                timer,
                query_or_nodes,
                properties,
                callback
            );
        }
    );

})();
