goog.provide('Debugger');
goog.require('CORE');
goog.require('CONFIG');
goog.require('APP');

if(DEBUG) {

    /** @const */

    var Debugger = (function() {

        "use strict";

        (function initDebugMode() {

            var performance = window['performance'] || {};
                performance = performance['memory'] || (performance['memory'] = {});

            APP.STATS = {

                heap_limit: performance['jsHeapSizeLimit'] || 0,
                heap_total: performance['totalJSHeapSize'] || 0,
                heap_used: performance['usedJSHeapSize'] || 0,

                count_model: 0,
                count_model_cache: 0,

                count_cache: 0,
                count_cache_get: 0,
                count_cache_set: 0,
                count_cache_del: 0,
                count_cache_clean: 0,
                count_cache_clone: 0,
                count_cache_update: 0,

                count_storage: 0,
                count_storage_cache: 0,

                count_draw: 0,
                count_draw_cache: 0,

                count_dom: 0,
                count_dom_cache: 0,

                count_paint: 0,
                count_paint_cache: 0,

                count_css: 0,
                count_css_cache: 0,

                count_class: 0,
                count_class_cache: 0,

                count_html: 0,
                count_html_cache: 0,

                count_render: 0,
                count_render_cache: 0,

                count_request: 0,
                count_request_cache: 0,

                count_event: 0,
                count_event_cache: 0,

                count_bubble: 0,
                count_bubble_cache: 0,

                count_mapper: 0,
                count_mapper_cache: 0,

                count_error: 0,

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
                    text: 'Size Cache: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-size-cache'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Size Storage: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-size-storage'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Size Model: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-size-model'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Cache: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-cache'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Get Cache: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-cache-get'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Set Cache: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-cache-set'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Del Cache: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-cache-del'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Clean Cache: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-cache-clean'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Clone Cache: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-cache-clone'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Update Cache: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-cache-update'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Storage: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-storage'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Count Model: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-count-model'
                    }
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
                    text: 'Queue Stack: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-queue-stack'
                    }
                },{
                    tag: 'br'
                },{
                    tag: 'span',
                    text: 'Callback Stack: '
                },{
                    tag: 'span',
                    attr: {
                        'id': 'debug-callback-stack'
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

        var dom_cache = {};

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

            updateStatistic: function(time, last_time) {

                if(CONFIG.SHOW_DEBUG || APP.CONFIG.SHOW_DEBUG) {

                    setText('debug-fps', (1000 / (time - last_time) + 0.5) | 0);

                    var debug_caches_stored = 0;
                    var debug_models_stored = 0;
                    var debug_models_cached = 0;

                    for(var model in APP.MODEL) {

                        if(APP.MODEL.hasOwnProperty(model)) {

                            debug_models_stored += CORE.getKeys(/** @type _model_class */ (APP.MODEL[model]).data).length;
                            debug_models_cached += CORE.getKeys(/** @type _model_class */ (APP.MODEL[model]).cache).length;
                        }
                    }

                    if(Util.Cache.caches) for(var i = 0; i < Util.Cache.caches.length; i++){

                        debug_caches_stored += Util.Cache.caches[i].length;
                    }

                    APP.STATS.paint_stack_len = CORE.getStackLength();

                    var stack_info = CORE.getFullStack();

                    setText('debug-count-cache', debug_caches_stored);
                    setText('debug-count-cache-get', APP.STATS.count_cache_get);
                    setText('debug-count-cache-set', APP.STATS.count_cache_set);
                    setText('debug-count-cache-del', APP.STATS.count_cache_del);
                    setText('debug-count-cache-clean', APP.STATS.count_cache_clean);
                    setText('debug-count-cache-clone', APP.STATS.count_cache_clone);
                    setText('debug-count-cache-update', APP.STATS.count_cache_update);

                    setText('debug-count-model', debug_models_stored);
                    setText('debug-count-storage', debug_models_cached);

                    if(Util.Cache.caches) setText('debug-size-cache', Util.Cache.caches.length);
                    setText('debug-size-model', debug_models_stored);
                    setText('debug-size-storage', 0);

                    setText('debug-count-dom', APP.STATS.count_dom + ' (-' + APP.STATS.count_dom_cache + ')');
                    setText('debug-count-paint', APP.STATS.count_paint + ' (-' + APP.STATS.count_paint_cache + ')');
                    setText('debug-count-css', APP.STATS.count_css + ' (-' + APP.STATS.count_css_cache + ')');
                    setText('debug-count-class', APP.STATS.count_class + ' (-' + APP.STATS.count_class_cache + ')');
                    setText('debug-count-html', APP.STATS.count_html + ' (-' + APP.STATS.count_html_cache + ')');
                    setText('debug-count-render', APP.STATS.count_render + ' (-' + APP.STATS.count_render_cache + ')');
                    setText('debug-count-mapper', APP.STATS.count_mapper + ' (-' + APP.STATS.count_mapper_cache + ')');
                    setText('debug-count-event', APP.STATS.count_event + ' (-' + APP.STATS.count_event_cache + ')');
                    setText('debug-count-bubble', APP.STATS.count_bubble + ' (-' + APP.STATS.count_bubble_cache + ')');
                    setText('debug-count-error', APP.STATS.count_error);

                    setText('debug-time-calc', (((APP.STATS.time_calc * 100) | 0) / 100) + ' ms (~0 ms)');
                    setText('debug-time-render', (((APP.STATS.time_render * 100) | 0) / 100) + ' ms (~' + (((APP.STATS.time_render / APP.STATS.count_render * 100) | 0) / 100) + ' ms)');
                    setText('debug-time-draw', (((APP.STATS.time_draw * 100) | 0) / 100) + ' ms (~' + (((APP.STATS.time_draw / APP.STATS.count_draw * 100) | 0) / 100) + ' ms)');
                    setText('debug-time-event', (((APP.STATS.time_event * 100) | 0) / 100) + ' ms (~' + (((APP.STATS.time_event / APP.STATS.count_event * 100) | 0) / 100) + ' ms)');
                    setText('debug-time-request', (((APP.STATS.time_request * 100) | 0) / 100) + ' ms (~' + (((APP.STATS.time_request / APP.STATS.count_request * 100) | 0) / 100) + ' ms)');

                    var paint_stack_len,
                        css_stack_len,
                        class_stack_len,
                        html_stack_len;

                    if(paint_stack_len = stack_info.paint_index.length) {

                        debug_paint_stack += paint_stack_len;

                        setTimeout(function () {

                            debug_paint_stack -= paint_stack_len;

                        }, 500);
                    }

                    if(css_stack_len = APP.STATS.css_stack_len) {

                        debug_css_stack += css_stack_len;

                        setTimeout(function () {

                            debug_css_stack -= css_stack_len;

                        }, 500);
                    }

                    if(class_stack_len = APP.STATS.class_stack_len) {

                        debug_class_stack += class_stack_len;

                        setTimeout(function () {

                            debug_class_stack -= class_stack_len;

                        }, 500);
                    }

                    if(html_stack_len = APP.STATS.html_stack_len) {

                        debug_html_stack += html_stack_len;

                        setTimeout(function () {

                            debug_html_stack -= html_stack_len;

                        }, 500);
                    }

                    setText('debug-css-stack', debug_css_stack);
                    setText('debug-class-stack', debug_class_stack);
                    setText('debug-html-stack', debug_html_stack);
                    setText('debug-async-stack', stack_info.async_timer.length);
                    setText('debug-paint-stack', debug_paint_stack);
                    setText('debug-queue-stack', stack_info.queue_index.length);
                    setText('debug-callback-stack', stack_info.callback_fn.length);

                    var performance = window['performance'] || {};
                        performance = performance['memory'] || (performance['memory'] = {});

                    setText('debug-heap-limit', /*'0 / ' +*/ (((performance['jsHeapSizeLimit'] / 1024 / 1024 * 100) | 0) / 100) + ' Mb' || '?'); //APP.STATS.heap_limit;
                    setText('debug-heap-total', /*'0 / ' +*/ (((performance['totalJSHeapSize'] / 1024 / 1024 * 100) | 0) / 100) + ' Mb' || '?'); //APP.STATS.heap_total;
                    setText('debug-heap-used', /*'0 / ' +*/ (((performance['usedJSHeapSize'] / 1024 / 1024 * 100) | 0) / 100) + ' Mb (' + (((100 / performance['totalJSHeapSize'] * performance['usedJSHeapSize'] * 100) | 0) / 100) + '%)' || '?'); //APP.STATS.heap_used;
                    setText('debug-storage', (((APP.VARS.USED_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' / ' + (((APP.VARS.MAX_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' Mb (' + (((100 / APP.VARS.MAX_STORAGE * APP.VARS.USED_STORAGE * 100) | 0) / 100) + '%)'); //APP.STATS.heap_limit;
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
                        else if(property && (typeof property === 'object')){

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

        function setText(id, text){

            (dom_cache[id] || (

                dom_cache[id] = document.getElementById(id)

            )).textContent = text;
        }

    })();
}
