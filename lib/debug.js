goog.provide('DEBUGGER');
goog.require('CORE');
goog.require('CONFIG');
goog.require('APP');

if(DEBUG) {

    var DEBUGGER = (function() {

        "use strict";

        // /** @type {?Node} */
        // var dom_console;
        //
        // /**
        //  * @const
        //  * @final
        //  */
        //
        // CORE.console = {
        //
        //     /**
        //      * @param {string|number=} text
        //      * @param {*=} obj
        //      * @param {string=} color
        //      */
        //
        //     log: function(text, obj, color){
        //
        //         if(color){
        //
        //             if(CORE.isType(obj)) window.console.log('%c' + text, 'color: ' + color, obj);
        //             else window.console.log('%c' + text, 'color: ' + color);
        //         }
        //         else{
        //
        //             if(CORE.isType(obj)) window.console.log(text, obj);
        //             else window.console.log(text);
        //         }
        //
        //         if(text){
        //
        //             if(!dom_console){
        //
        //                 dom_console = CORE.getById('debug-log');
        //             }
        //
        //             if(dom_console){
        //
        //                 dom_console.appendChild(document.createTextNode(text + '\n'));
        //                 dom_console.scrollTop = dom_console.scrollHeight;
        //             }
        //         }
        //     },
        //
        //     /**
        //      * @param {string|number=} param
        //      * @param {*=} obj
        //      */
        //
        //     warn: function(param, obj){
        //
        //         Console.log(param, obj, 'orange');
        //     },
        //
        //     /**
        //      * @param {string|number=} param
        //      * @param {*=} obj
        //      */
        //
        //     err: function(param, obj){
        //
        //         Console.log(param, obj, 'red');
        //     },
        //
        //     /**
        //      * @param {string|number=} param
        //      * @param {*=} obj
        //      */
        //
        //     info: function(param, obj){
        //
        //         Console.log(param, obj, 'green');
        //     }
        // };

        (function initDebugMode() {

            var performance = window['performance'] || {};

            performance = performance['memory'] || (performance['memory'] = {});

            APP.STATS = {

                heap_limit: performance['jsHeapSizeLimit'] || 0,
                heap_total: performance['totalJSHeapSize'] || 0,
                heap_used: performance['usedJSHeapSize'] || 0,

                count_draw: 0,
                count_dom: 0,
                count_paint: 0,
                count_css: 0,
                count_class: 0,
                count_html: 0,
                count_render: 0,
                count_request: 0,
                count_event: 0,
                count_bubble: 0,
                count_error: 0,
                count_dom_cache: 0,
                count_css_cache: 0,
                count_class_cache: 0,
                count_html_cache: 0,
                count_render_cache: 0,
                count_mapper_cache: 0,
                count_event_cache: 0,
                count_bubble_cache: 0,
                count_mapper: 0,

                time_calc: 0,
                time_render: 0,
                time_draw: 0,
                time_request: 0,
                time_event: 0
            };

            // TODO: change into html template

            CORE.buildPattern(/** @type {Array<_pattern_struct>} */ ([{

                tag: 'div',
                attr: {
                    'id': 'debug-log'
                }
            },{

                tag: 'div',
                attr: {
                    'id': 'debug-graph'
                },
                child: [{
                    tag: 'div',
                    attr: {
                        'id': 'debug-graph-count'
                    }
                },{
                    tag: 'div',
                    attr: {
                        'id': 'debug-graph-trace'
                    }
                }]
            },{
                tag: 'div',
                attr: {
                    'id': 'debug-stats'
                },
                child: [{
                    tag: 'span',
                    text: 'FPS: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-fps'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Models Stored: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-models-stored'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Models Cached: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-models-cached'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count DOM: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-dom'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Paint: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-paint'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count CSS: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-css'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Class: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-class'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count HTML: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-html'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Render: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-render'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Mapper: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-mapper'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Events: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-event'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Bubble: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-bubble'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Error: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-error'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Time Calc: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-time-calc'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Time Render: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-time-render'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Time Draw: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-time-draw'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Time Event: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-time-event'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Time Server: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-time-request'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Paint Stack: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-paint-stack'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'CSS Stack: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-css-stack'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Class Stack: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-class-stack'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'HTML Stack: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-html-stack'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Async Stack: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-async-stack'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Heap Limit: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-heap-limit'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Heap Total: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-heap-total'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Heap Used: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-heap-used'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Storage: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-storage'
                    }
                }]

            }]), window.document.body);

            /**
             * @param {string} errorMsg
             * @param {string} url
             * @param {number} lineNumber
             */

            window.onerror = function(errorMsg, url, lineNumber) {

                APP.STATS.count_error++;

                if(DEBUG) Console.log(errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
                //return true;
            };

        })();

        var timers = {};
        var calls = {};
        var obj = [];
        var trace = {};
        var exec = "";

        // else if(APP.PLUGIN.Analytics) {
        //
        //     /**
        //      * @param {string} errorMsg
        //      * @param {string} url
        //      * @param {number} lineNumber
        //      */
        //
        //     window.onerror = function(errorMsg, url, lineNumber) {
        //
        //         /* Analytics */
        //
        //         APP.PLUGIN.Analytics.event(
        //             /* Category: */
        //             'Error',
        //             /* Event: */
        //             errorMsg + ' (@Line: ' + lineNumber + ')',
        //             /* Label: */
        //             'Hits',
        //             /* Integer Value: */
        //             1
        //         );
        //     };
        // }


        /** @type {number} */
        var debug_paint_stack = 0;
        /** @type {number} */
        var debug_css_stack = 0;
        /** @type {number} */
        var debug_class_stack = 0;
        /** @type {number} */
        var debug_html_stack = 0;
        /** @type {number} */
        var debug_async_stack = 0;

        return {

            showStatistic: function(time, last_time) {

                var count_dom = APP.STATS.count_dom;
                var count_dom_cache = APP.STATS.count_dom_cache;

                if(CONFIG.SHOW_DEBUG || APP.CONFIG.SHOW_DEBUG) {

                    CORE.getById('debug-fps').textContent = (1000 / (time - last_time) + 0.5) | 0;

                    var debug_models_stored = 0;
                    var debug_models_cached = 0;

                    for(var model in APP.MODEL) {

                        if(APP.MODEL.hasOwnProperty(model)) {

                            debug_models_stored += CORE.getKeys(/** @type _model_class */ (APP.MODEL[model]).data).length;
                            debug_models_cached += CORE.getKeys(/** @type _model_class */ (APP.MODEL[model]).cache).length;
                        }
                    }

                    APP.STATS.paint_stack_len = CORE.getStackLength();
                    //APP.STATS.async_stack_len = CORE.getFullStack();

                    // queue_index: QUEUE_INDEX.length,
                    // paint_index: PAINT_INDEX.length,
                    // queue_timer: CORE.getKeys(QUEUE_TIMER).length,
                    // stack_timer: CORE.getKeys(STACK_TIMER).length,
                    // async_timer: CORE.getKeys(ASYNC_TIMER).length,
                    // callback_fn: CORE.getKeys(CALLBACK).length

                    CORE.getById('debug-models-stored').textContent = debug_models_stored;
                    CORE.getById('debug-models-cached').textContent = debug_models_cached;

                    CORE.getById('debug-count-dom').textContent = /*'0 / ' +*/ count_dom + ' (-' + count_dom_cache + ')'; // CORE.DOM._length +
                    CORE.getById('debug-count-paint').textContent = /*PAINT_STACK.length + ' / ' +*/ APP.STATS.count_paint + ' (-0)';
                    CORE.getById('debug-count-css').textContent = /*CSS_STACK.length + ' / ' +*/ APP.STATS.count_css + ' (-' + APP.STATS.count_css_cache + ')';
                    CORE.getById('debug-count-class').textContent = /*CLASS_STACK.length + ' / ' +*/ APP.STATS.count_class + ' (-' + APP.STATS.count_class_cache + ')';
                    CORE.getById('debug-count-html').textContent = /*HTML_STACK.length + ' / ' +*/ APP.STATS.count_html + ' (-' + APP.STATS.count_html_cache + ')';
                    CORE.getById('debug-count-render').textContent = /*'0 / ' +*/ APP.STATS.count_render + ' (-' + APP.STATS.count_render_cache + ')';
                    CORE.getById('debug-count-mapper').textContent = /*'0 / ' +*/ APP.STATS.count_mapper + ' (-' + APP.STATS.count_mapper_cache + ')';
                    CORE.getById('debug-count-event').textContent = /*'0 / ' +*/ APP.STATS.count_event + ' (-' + APP.STATS.count_event_cache + ')';
                    CORE.getById('debug-count-bubble').textContent = /*'0 / ' +*/ APP.STATS.count_bubble + ' (-' + APP.STATS.count_bubble_cache + ')';
                    CORE.getById('debug-count-error').textContent = /*'0 / ' +*/ APP.STATS.count_error;

                    CORE.getById('debug-time-calc').textContent = (((APP.STATS.time_calc * 100) | 0) / 100) + ' ms (~0 ms)';
                    CORE.getById('debug-time-render').textContent = (((APP.STATS.time_render * 100) | 0) / 100) + ' ms (~' + (((APP.STATS.time_render / APP.STATS.count_render * 100) | 0) / 100) + ' ms)';
                    CORE.getById('debug-time-draw').textContent = (((APP.STATS.time_draw * 100) | 0) / 100) + ' ms (~' + (((APP.STATS.time_draw / APP.STATS.count_draw * 100) | 0) / 100) + ' ms)';
                    CORE.getById('debug-time-event').textContent = (((APP.STATS.time_event * 100) | 0) / 100) + ' ms (~' + (((APP.STATS.time_event / APP.STATS.count_event * 100) | 0) / 100) + ' ms)';
                    CORE.getById('debug-time-request').textContent = (((APP.STATS.time_request * 100) | 0) / 100) + ' ms (~' + (((APP.STATS.time_request / APP.STATS.count_request * 100) | 0) / 100) + ' ms)';

                    /*
                    var paint_stack_len;
                    var css_stack_len;
                    var class_stack_len;
                    var html_stack_len;
                    var async_stack_len;

                    if(paint_stack_len = APP.STATS.paint_stack_len) {

                        debug_paint_stack += paint_stack_len;

                        CORE.async(function () {

                            debug_paint_stack -= paint_stack_len;

                        }, 500);
                    }

                    if(css_stack_len = APP.STATS.css_stack_len) {

                        debug_css_stack += css_stack_len;

                        CORE.async(function () {

                            debug_css_stack -= css_stack_len;

                        }, 500);
                    }

                    if(class_stack_len = APP.STATS.class_stack_len) {

                        debug_class_stack += class_stack_len;

                        CORE.async(function () {

                            debug_class_stack -= class_stack_len;

                        }, 500);
                    }

                    if(html_stack_len = APP.STATS.html_stack_len) {

                        debug_html_stack += html_stack_len;

                        CORE.async(function () {

                            debug_html_stack -= html_stack_len;

                        }, 500);
                    }

                    if(async_stack_len = APP.STATS.async_stack_len) {

                        debug_async_stack += async_stack_len;

                        CORE.async(function () {

                            debug_async_stack -= async_stack_len;

                        }, 250);
                    }
                    */

                    CORE.getById('debug-paint-stack').textContent = debug_paint_stack + '';
                    CORE.getById('debug-css-stack').textContent = debug_css_stack + '';
                    CORE.getById('debug-class-stack').textContent = debug_class_stack + '';
                    CORE.getById('debug-html-stack').textContent = debug_html_stack + '';
                    CORE.getById('debug-async-stack').textContent = debug_async_stack + '';

                    var performance = window['performance'] || {};
                    performance = performance['memory'] || (performance['memory'] = {});

                    CORE.getById('debug-heap-limit').textContent = /*'0 / ' +*/ (((performance['jsHeapSizeLimit'] / 1024 / 1024 * 100) | 0) / 100) + ' Mb' || '?'; //APP.STATS.heap_limit;
                    CORE.getById('debug-heap-total').textContent = /*'0 / ' +*/ (((performance['totalJSHeapSize'] / 1024 / 1024 * 100) | 0) / 100) + ' Mb' || '?'; //APP.STATS.heap_total;
                    CORE.getById('debug-heap-used').textContent = /*'0 / ' +*/ (((performance['usedJSHeapSize'] / 1024 / 1024 * 100) | 0) / 100) + ' Mb (' + (((100 / performance['totalJSHeapSize'] * performance['usedJSHeapSize'] * 100) | 0) / 100) + '%)' || '?'; //APP.STATS.heap_used;
                    CORE.getById('debug-storage').textContent = (((APP.VARS.USED_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' / ' + (((APP.VARS.MAX_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' Mb (' + (((100 / APP.VARS.MAX_STORAGE * APP.VARS.USED_STORAGE * 100) | 0) / 100) + '%)'; //APP.STATS.heap_limit;

                    APP.STATS.count_dom = count_dom;
                    APP.STATS.count_dom_cache = count_dom_cache;
                }
            },

            registerCallListener: function(namespace, str){

                for(var key in namespace){

                    if(namespace.hasOwnProperty(key)){

                        var property = namespace[key];
                        var new_str = str + '.' + key;
                        var tmp;

                        // TODO:
                        // if(new_str === 'Console.log' ||
                        //    new_str === 'APP.PLUGIN.Filesystem'){
                        //
                        //     continue;
                        // }

                        // FIX: skip model instances
                        if((tmp = property) &&
                           (tmp = tmp.constructor) &&
                           (tmp = tmp.prototype) &&
                           (tmp = tmp.constructor) &&
                           (tmp.name === "ModelClass")){

                            obj.push(new_str);

                            continue;
                        }

                        if(typeof property === 'function'){

                            if(!calls[new_str]){

                                timers[new_str] = 0;
                                calls[new_str] = 0;
                                trace[new_str] = "";
                            }

                            namespace[key] = (function(new_str, fn){

                                return function(){

                                    var initial = false;

                                    if(!exec){

                                        exec = new_str;
                                        initial = true;
                                    }
                                    else {

                                        exec += ' > ' + new_str;
                                    }

                                    var start = CORE.time.now();
                                    var result = fn.apply(this, arguments);

                                    timers[new_str] += CORE.time.now() - start;
                                    calls[new_str]++;

                                    if(initial){

                                        trace[new_str] = exec;
                                        exec = "";
                                    }

                                    return result;
                                }

                            }).call(namespace, new_str, property);
                        }
                        else if(typeof property === 'string' || (property && property.constructor === Array)){

                            obj.push(new_str + '[' + property.length + ']');
                        }
                        else if(typeof property === 'object'){

                            obj.push(new_str);

                            this.registerCallListener(property, new_str);
                        }
                        else{

                            obj.push(new_str + ' = ' + property);
                        }
                    }
                }
            },

            getStackInfo: function(){

                var result = {};

                for(var str in calls){

                    if(calls.hasOwnProperty(str)){

                        result[str] = {

                            calls: calls[str],
                            time: timers[str],
                            ops: calls[str] ? timers[str] / calls[str] : 0,
                            trace: trace[str]
                        };
                    }
                }

                console.log(result);
            },

            getObjectInfo: function(){

                console.log(obj.join('\n'));
            }
        };

    })();
}
