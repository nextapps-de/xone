goog.provide('CORE.EXEC');
goog.require('CORE');

(function(){

    /**
     * @type {Array<Function>|Array<Array<Function, number|null>>}
     */

    var EXEC_STACK = [];

    /**
     * @type {number|null}
     */

    var EXEC = null;

    /**
     * @param {Function} fn
     * @param {number=} delay
     * @return {number|null}
     */

    CORE.async = function(fn, delay){

        if(EXEC && !delay){

            // register to next call (can be aborted):
            //EXEC = CORE.clear(EXEC);
            //EXEC = window.setTimeout(runStack);
            //return window.setTimeout(fn);

            // place just in time (cannot be aborted):
            EXEC_STACK.unshift(fn);
            return null;
        }
        else{

            return window.setTimeout(fn, delay);
        }
    };

    /**
     * @param {Array<Function>|Function} fn
     * @param {number=} delay
     */

    CORE.queue = function(fn, delay){

        if(delay){

            return CORE.async(function(){

                CORE.queue(fn);

            }, delay);
        }

        var len = EXEC_STACK.length;

        if(CORE.isArray(fn)){

            for(var i = 0; i < fn.length; i++){

                EXEC_STACK[len++] = fn[i];
            }
        }
        else{

            EXEC_STACK[len] = fn;
        }

        if(!EXEC){

            EXEC = window.setTimeout(runStack);
        }
    };

    /**
     * @param {Array<Function>|Function} fn
     * @param {number=} delay
     */

    CORE.stack = function(fn, delay){

        if(delay){

            return CORE.async(function(){

                CORE.stack(fn);

            }, delay);
        }

        if(CORE.isArray(fn)){

            for(var i = 0; i < fn.length; i++){

                EXEC_STACK.unshift(fn[i]);
            }
        }
        else{

            EXEC_STACK.unshift(fn);
        }

        if(!EXEC){

            EXEC = window.setTimeout(runStack);
        }
    };

    if(DEBUG){

        CORE.getStackLength = function(){

            return EXEC_STACK.length;
        };
    }

    /**
     * Task Processor
     */

    function runStack(){

        if(EXEC_STACK.length){

            EXEC_STACK.splice(0, 1)[0]();
            EXEC = window.setTimeout(runStack);
        }
        else{

            EXEC = null;
        }
    }

})();
