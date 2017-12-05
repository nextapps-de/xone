goog.provide('CORE.ASYNC');
goog.require('CORE');

/**
 * @define {boolean}
 */

var CONFIG_SUCCESSIVE_PAINT = true;

/**
 * @define {boolean}
 */

var CONFIG_PRIORITIZE_PAINT = true;

/**
 * @define {number}
 */

var CONFIG_MAX_RECURSION = CONFIG_PRIORITIZE_PAINT ? 200 : 1000;

/**
 * @define {number}
 */

var CONFIG_TICK_PROCESS_TIME = 3;

/**
 * Xone Non-blocking Processing Module
 */

(function(){

    "use strict";

    /**
     * Async Model Timer IDs
     * @type {Object<string|undefined, number>}
     * @private
     */

    var ASYNC_TIMER = {};

    /**
     * Async Queue Timestamps
     * @type {Object<string, number>}
     * @private
     */

    var QUEUE_TIMER = {};

    /**
     * Async Stack Timestamps
     * @type {Object<string, number>}
     * @private
     */

    var STACK_TIMER = {};

    /**
     * Async Callback Register
     * @type {Object<string|undefined, Function>}
     * @private
     */

    var CALLBACK = {};

    /**
     * Queue Model Timer IDs
     * @type {Array<string>}
     * @private
     */

    var QUEUE_INDEX = [];

    /**
     * Draw Model Timer IDs
     * @type {Object<string|undefined, string>}
     * @private
     */

    var PAINT_INDEX = [];

    /**
     * Async Model Process Timer
     * @type {{start, stop, foobar}}
     * @private
     */

    var ASYNC_RUNNER = Runner(runStack, 0);

    /**
     * Draw Model Process Timer
     * @type {number|null}
     * @private
     */

    var PAINT_EXEC = null;

    /**
     * Timer UIDs
     * @type {number}
     * @private
     */

    var ID_COUNT = 0;

    /**
     * Timer UIDs
     * @type {number}
     * @private
     */

    var CURRENT_RECURSION = 0;

    /**
     * Creates dedicated sub-thread (micro task)
     * @param {Function} fn
     */

    CORE.asap = (function(){

        var stack = [];
        var targetNode = document.createTextNode('');
        var registered = false;

        MutationObserver || (

            MutationObserver = window['WebKitMutationObserver']
        );

        var toggle = 1;
        var observer = new MutationObserver(function(){

            var len = stack.length;
            var group = stack.splice(0, len),
                count = -1,
                fn;

            registered = false;

            while(++count < len){

                (fn = group[count]) && fn();
            }
        });

        observer.observe(targetNode, {

            characterData: true
        });

        return function(fn) {

            if(++CURRENT_RECURSION > CONFIG_MAX_RECURSION){

                CORE.async(fn);
            }
            else{

                stack[stack.length] = fn;

                if(!registered){

                    registered = true;

                    targetNode.data = String(toggle *= -1);
                }
            }

            fn = null;
        };
    })();

    /**
     * Creates dedicated sub-thread (micro task)
     * @param {!Function} fn
     * @param {Function=} callback
     */

    CORE.promise = function(fn, callback){

        /**
         * @type {Promise}
         */

        var promise = Promise.resolve(fn());

        if(callback) {

            return promise.then(callback());
        }
        else{

            return promise;
        }
    };

    /**
     * Creates dedicated task within the main thread (macro task)
     * @param {Function} fn
     * @param {number|string=} delay
     * @param {string=} key
     * @return {string}
     */

    CORE.async = function(fn, delay, key){

        if(typeof delay === 'string'){

            key = delay;
            delay = 0;
        }

        key || (key = 'async:' + (++ID_COUNT));
        key = /** @type {string} */ (key);

        CALLBACK[key] = fn;

        if(delay || !CORE.isDefined(ASYNC_TIMER[key])){

            if(delay && CORE.isDefined(ASYNC_TIMER[key])){

                clearTimeout(ASYNC_TIMER[key]);
            }

            ASYNC_TIMER[key] = setTimeout(function(){

                CURRENT_RECURSION = 0;

                execute(key = /** @type {string} */ (key));

                delete ASYNC_TIMER[key];
                key = void 0;

            }, delay || 0);
        }

        return /** @type {string} */ (key);
    };

    /**
     * Creates dedicated task within the render event loop (macro task)
     * @param {Function} fn
     * @param {number|string=} delay
     * @param {string=} key
     * @return {string}
     */

    CORE.paint = function(fn, delay, key){

        if(typeof delay === 'string'){

            key = delay;
            delay = 0;
        }

        key || (key = 'paint:' + (++ID_COUNT));
        key = /** @type {string} */ (key);

        CALLBACK[key] = fn;

        if(delay){

            return CORE.async(function(){

                CORE.paint(CALLBACK[key], 0, key);
                key = void 0;

            }, delay, 'async:' + key);
        }

        PAINT_EXEC || (

            PAINT_EXEC = requestAnimationFrame(runPaint)
        );

        CONFIG_PRIORITIZE_PAINT && (

            ASYNC_RUNNER.stop()
        );

        var index = CORE.indexOf(PAINT_INDEX, key);

        if(index !== -1){

            PAINT_INDEX[index] = /** @type {string} */ (key);
        }
        else{

            PAINT_INDEX[PAINT_INDEX.length] = /** @type {string} */ (key);
        }

        return /** @type {string} */ (key);
    };

    /**
     * Loops task within the render event loop (macro task)
     * @param {!Function} fn
     * @param {number=} delay
     * @return {{start, stop, foobar}}
     */

    CORE.run = function(fn, delay){

        return Runner(fn, delay);
    };

    /**
     * Queue job asynchronously
     * @param {Array<Function>|Function} fn
     * @param {number|string=} delay_or_id
     * @param {string=} id
     * @return {string|Array<string>}
     */

    CORE.queue = function(fn, delay_or_id, id){

        return registerJob('queue', fn, delay_or_id, id);
    };

    /**
     * Stack job asynchronously
     * @param {Array<Function>|Function} fn
     * @param {number|string=} delay_or_id
     * @param {string=} id
     * @return {string|Array<string>}
     */

    CORE.stack = function(fn, delay_or_id, id){

        return registerJob('stack', fn, delay_or_id, id);
    };

    /**
     * Clear job or task
     * @param {string|Array<string>|null=} id
     * @return {null}
     */

    CORE.clear = function(id){

        if(id){

            if(!CORE.isArray(id)) id = [id];

            var len = id.length,
                key;

            while(len--){

                if(key = id[len]){

                    CALLBACK[key] = null;
                    delete CALLBACK[key];
                    delete QUEUE_TIMER[key];
                    delete STACK_TIMER[key];

                    if(ASYNC_TIMER[key]){

                        clearTimeout(ASYNC_TIMER[key]);

                        delete ASYNC_TIMER[key];

                        if(CORE.contains(key, 'async:paint:')){

                            key = key.substring(6);

                            CALLBACK[key] = null;
                            delete CALLBACK[key];
                        }
                    }
                }
            }
        }

        return null;
    };

    /**
     * Clear all jobs and tasks
     */

    CORE.clearAll = function(){

        var keys = CORE.getKeys(ASYNC_TIMER), timer_stack = [], len = 0;

        for(var i = 0; i < keys.length; i++){

            var value = ASYNC_TIMER[keys[i]];

            if(value){

                timer_stack[len++] = value;
            }
        }

        CORE.clear(timer_stack);

        ASYNC_TIMER = {};
        CALLBACK = {};
        QUEUE_INDEX = [];
    };

    /**
     * @returns {number}
     */

    CORE.getStackLength = function(){

        return QUEUE_INDEX.length;
    };

    /**
     * @returns {Object<string, Array<string>>}
     */

    CORE.getFullStack = function(){

        return {

            queue_index: QUEUE_INDEX,
            paint_index: PAINT_INDEX,
            queue_timer: CORE.getKeys(QUEUE_TIMER),
            stack_timer: CORE.getKeys(STACK_TIMER),
            async_timer: CORE.getKeys(ASYNC_TIMER),
            callback_fn: CORE.getKeys(CALLBACK)
        };
    };

    // Private Helpers
    // -------------------------------------------------------

    /**
     * @param {!string} type
     * @param {!Array<Function>|Function} fn
     * @param {number|string=} delay
     * @param {string=} id
     * @return {string|Array<string>}
     */

    function registerJob(type, fn, delay, id){

        if(typeof delay === 'string'){

            id = delay;
            delay = 0;
        }

        if(!PAINT_EXEC) {

            ASYNC_RUNNER.start();
        }

        var time = delay && CORE.time.now();
        var stack_length = QUEUE_INDEX.length;
        var key;

        if(CORE.isArray(fn)){

            var len = fn.length;
            var ids = new Array(len);

            while(len--){

                key = id || (type + ':' + (++ID_COUNT));

                addJob(

                    fn.pop(),
                    type,
                    key,
                    delay && (time + delay),
                    stack_length + len
                );

                ids[len] = key;
            }

            return ids;
        }
        else{

            key = id || (type + ':' + (++ID_COUNT));

            addJob(

                fn,
                type,
                key,
                delay && (time + delay),
                stack_length
            );

            return key;
        }
    }

    function addJob(fn, type, key, delay, index){

        CALLBACK[key] = /** @type {Function} */ (fn);

        if(type === 'queue'){

            if(delay){

                QUEUE_TIMER[key] = delay;
            }
            else{

                QUEUE_INDEX[index] = key;
            }
        }
        else{

            if(delay){

                STACK_TIMER[key] = delay;
            }
            else{

                QUEUE_INDEX.unshift(key);
            }
        }
    }

    /**
     * Task Processor
     */

    function runStack(){

        CURRENT_RECURSION = 0;

        var time = CORE.time.now();
        var end = time;
        var stack_timer = CORE.getKeys(STACK_TIMER);
        var queue_timer = CORE.getKeys(QUEUE_TIMER);

        for(var i = stack_timer.length - 1; i >= 0; i--){

            if((end - time) > CONFIG_TICK_PROCESS_TIME){

                break;
            }

            if(STACK_TIMER[stack_timer[i]] < time){

                end = execute(

                    stack_timer.splice(i, 1)[0], true

                ) || time;
            }
        }

        for(var i = 0; i < queue_timer.length; i++){

            if((end - time) > CONFIG_TICK_PROCESS_TIME){

                break;
            }

            if(QUEUE_TIMER[queue_timer[i]] < time){

                end = execute(

                    queue_timer.splice(i--, 1)[0], true

                ) || time;
            }
        }

        while(((end - time) <= CONFIG_TICK_PROCESS_TIME) && QUEUE_INDEX.length){

            end = execute(

                QUEUE_INDEX.shift(), true

            ) || time;
        }

        if(!QUEUE_INDEX.length &&
           !stack_timer.length &&
           !queue_timer.length){

            ASYNC_RUNNER.stop();
        }
    }

    /**
     * When the paint queue is empty, asynchronous callbacks may be added some new tasks to the paint queue,
     * so we schedule 1 frame after passing idle state to test if no new tasks was added until next frame.
     * This workaround fixes some little flickering in paint intensive tasks when also async tasks runs in background.
     *
     * @type {number}
     */

    var register_frames_idle_state = -1;

    /**
     * @type {number|null}
     */

    var last_time = null;

    /**
     * Draw Processor
     */

    function runPaint(time){

        if(DEBUG) {

            var debug_time = CORE.time.now();
        }

        CURRENT_RECURSION = 0;

        var queue_length = PAINT_INDEX.length;

        if(CONFIG_PRIORITIZE_PAINT){

            if(queue_length){

                register_frames_idle_state = 2;
            }
            else{

                register_frames_idle_state--;
            }
        }

        if(queue_length || (register_frames_idle_state >= 0)){

            requestAnimationFrame(runPaint);

            if(CONFIG_SUCCESSIVE_PAINT){

                execute(PAINT_INDEX.shift());
            }
            else{

                var tasks = PAINT_INDEX.splice(0, queue_length),
                    length = tasks.length,
                    count = 0;

                while(count < length){

                    execute(tasks[count++]);
                }
            }
        }
        else{

            //TODO: move this into debug.js

            if(DEBUG && CONFIG.SHOW_DEBUG){

                requestAnimationFrame(runPaint);

                if(debug_time > 0) {

                    APP.STATS.time_draw += CORE.time.now() - debug_time;
                }

                APP.STATS.count_draw++;

                //TODO: move
                DEBUGGER.showStatistic(time, last_time);

                last_time = time;
            }
            else{

                PAINT_EXEC = null;
            }

            ASYNC_RUNNER.start();
        }
    }

    /**
     * @param {string} key
     * @param {boolean=} calc_time
     * @returns {number|undefined}
     */

    function execute(key, calc_time){

        var fn = CALLBACK[key];

        // delete first:
        CALLBACK[key] = null;
        delete CALLBACK[key];

        // callback may register again to the same key:
        if(fn) {

            fn();

            if(calc_time){

                return CORE.time.now();
            }
        }
    }

    /**
     * Loops task within the async loop
     * @param {!Function|null} fn
     * @param {number=} delay
     */

    function Runner(fn, delay){

        var timer = null;
        var pause_state = false;

        return {

            start: function(){

                pause_state = false;

                if(timer === null){

                    timer = window.setInterval(function(){

                        if(!pause_state){

                            fn();
                        }

                    }, delay || 0)
                }
            },

            stop: function(){

                if(timer !== null) {

                    window.clearInterval(timer);

                    timer = null;
                }
            },

            pause: function(){

                pause_state = true;
            },

            resume: function(){

                pause_state = false;
            },

            destroy: function(){

                fn = null;
            }
        };
    }
})();
