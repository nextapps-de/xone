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

    /**
     * Async Model Timer IDs
     * @type {Object<string|undefined, TimeoutId>}
     * @private
     */

    var ASYNC_TIMER = {};

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

        MutationObserver || (MutationObserver = window['WebKitMutationObserver']);

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
     * @param {!Function} fn
     * @param {number=} delay
     * @param {string=} key
     * @return {string}
     */

    CORE.async = function(fn, delay, key){

        key || (key = 'async:' + (++ID_COUNT));
        key = /** @type {string} */ (key);

        CALLBACK[key] = fn;

        if(delay || !CORE.isDefined(ASYNC_TIMER[key])){

            if(delay && CORE.isDefined(ASYNC_TIMER[key])){

                clearTimeout(ASYNC_TIMER[key]);
            }

            ASYNC_TIMER[key] = setTimeout(function(){

                CURRENT_RECURSION = 0;

                key = /** @type {string} */ (key);

                var fn = CALLBACK[key];

                delete CALLBACK[key];
                delete ASYNC_TIMER[key];

                if(fn) fn();

            }, delay || 0);
        }

        return /** @type {string} */ (key);
    };

    /**
     * Creates dedicated task within the render event loop (macro task)
     * @param {!Function} fn
     * @param {number=} delay
     * @param {string=} key
     * @return {string}
     */

    CORE.paint = function(fn, delay, key){

        key || (key = 'paint:' + (++ID_COUNT));
        key = /** @type {!string} */ (key);

        if(delay){

            return CORE.async(function(){

                CORE.paint(fn, 0, key);

            }, delay, 'async:' + key);
        }

        CALLBACK[key] = fn;

        PAINT_EXEC || (

            PAINT_EXEC = requestAnimationFrame(runPaint)
        );

        CONFIG_PRIORITIZE_PAINT && (

            ASYNC_RUNNER.stop()
        );

        var index = CORE.indexOf(PAINT_INDEX, key);

        if(index !== -1){

            PAINT_INDEX[index] = key;
        }
        else{

            PAINT_INDEX[PAINT_INDEX.length] = key;
        }

        return key;
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
     * @param {string=} id
     * @return {string|Array<string>}
     */

    CORE.queue = function(fn, id){

        return registerJob('queue', fn, id);
    };

    /**
     * Stack job asynchronously
     * @param {Array<Function>|Function} fn
     * @param {string=} id
     * @return {string|Array<string>}
     */

    CORE.stack = function(fn, id){

        return registerJob('stack', fn, id);
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

                    delete CALLBACK[key];

                    if(ASYNC_TIMER[key] /*&& CORE.contains(key, 'async:')*/){

                        clearTimeout(ASYNC_TIMER[key]);

                        delete ASYNC_TIMER[key];
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

    // Private Helpers
    // -------------------------------------------------------

    /**
     * @param {!string} type
     * @param {!Array<Function>|Function} fn
     * @param {string=} id
     * @return {string|Array<string>}
     */

    function registerJob(type, fn, id){

        if(!PAINT_EXEC) {

            ASYNC_RUNNER.start();
        }

        var stack_length = QUEUE_INDEX.length;
        var key;

        if(CORE.isArray(fn)){

            var len = fn.length;
            var ids = new Array(len);

            while(len--){

                key = id || (type + ':' + (++ID_COUNT));

                CALLBACK[key] = /** @type {Function} */ (fn.pop());

                if(type === 'queue'){

                    QUEUE_INDEX[stack_length + len] = key;
                }
                else{

                    QUEUE_INDEX.unshift(key);
                }

                ids[len] = key;
            }

            return ids;
        }
        else{

            key = id || (type + ':' + (++ID_COUNT));

            CALLBACK[key] = /** @type {Function} */ (fn);

            if(type === 'queue'){

                QUEUE_INDEX[stack_length] = key;
            }
            else{

                QUEUE_INDEX.unshift(key);
            }

            return key;
        }
    }

    /**
     * Task Processor
     */

    function runStack(){

        CURRENT_RECURSION = 0;

        var time = CORE.time.now();
        var end = time;

        while(((end - time) <= CONFIG_TICK_PROCESS_TIME) && QUEUE_INDEX.length){

            var key = QUEUE_INDEX.shift();
            var fn = CALLBACK[key];

            if(fn) {

                delete CALLBACK[key];

                fn();
            }

            end = CORE.time.now();
        }

        if(!QUEUE_INDEX.length){

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
     * Draw Processor
     */

    function runPaint(){

        CURRENT_RECURSION = 0;

        var queue_length = PAINT_INDEX.length;

        if(CONFIG_PRIORITIZE_PAINT){

            if(queue_length){

                register_frames_idle_state = 1;
            }
            else{

                register_frames_idle_state--;
            }
        }

        if(queue_length || (register_frames_idle_state >= 0)){

            requestAnimationFrame(runPaint);

            var key, fn;

            if(CONFIG_SUCCESSIVE_PAINT){

                key = PAINT_INDEX.shift();
                fn = CALLBACK[key];

                if(fn) {

                    delete CALLBACK[key];

                    fn();
                }
            }
            else{

                var tasks = PAINT_INDEX.splice(0, queue_length),
                    length = tasks.length,
                    count = -1;

                while(++count < length){

                    key = tasks[count];
                    fn = CALLBACK[key];

                    if(fn) {

                        delete CALLBACK[key];

                        fn();
                    }
                }
            }
        }
        else{

            PAINT_EXEC = null;
            ASYNC_RUNNER.start();
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
