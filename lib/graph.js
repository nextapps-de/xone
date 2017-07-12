goog.provide('GRAPH');
goog.require("ENV");
goog.require('CONFIG');

if(DEBUG || ENV === 'test') {

    /**
     * NOTE: Do not use any extern functions or references here!
     */

    var GRAPH = (function() {

        var graph = {};
        var count = {};
        var stack = [];
        var timer = null;

        var reset = function(){

            if(typeof APP !== 'undefined' && APP.CONFIG.SHOW_GRAPH) {

                GRAPH.show_graph();
                GRAPH.show_count();
            }

            stack = [];
        };

        var timestamp = 0;

        return {

            /**
             * @param {!string} fn
             */

            register: function(fn){

                //if(timer) window.clearTimeout(timer);

                // Increment Counters
                count[fn] || (count[fn] = 0);
                count[fn]++;

                // Add New Path To Stack
                stack[stack.length] = fn;

                // Copy Reference
                var walker = graph;

                // Walk Through The Graph
                for(var i = 0; i < stack.length; i++){

                    if(graph[stack[i]]){

                        walker = graph;
                    }
                    else {

                        graph[stack[i]] = {};
                    }

                    walker = walker[stack[i]] || (walker[stack[i]] = {});
                }

                // Register Reset Timer
                //timer = window.setTimeout(reset);
            },

            /**
             * @param {!string} fn
             */

            checkin: function(fn){

                this.register(fn);

                if(CORE.time) timestamp = CORE.time.now();
            },

            /**
             * @param {!string} fn
             */

            checkout: function(fn){

                if(CORE.time) timestamp = CORE.time.now() - timestamp;

                console.log(timestamp);
            },

            show_graph: function(){

                var html = '', last_key = '';

                // Walk Through The Graph
                for(var key in graph){

                    if(graph.hasOwnProperty(key)){

                        html += key + ': ' + JSON.stringify(graph[key]).replace(/:{/g, "\n=>").replace(/{/g, "\n=>").replace(/}/g, '').replace(/"/g, '').replace(/,/g, '') + '<br><br>';
                    }
                }

                var node = document.getElementById('debug-graph-trace');

                node.innerHTML = html;
                node.scrollTop = node.scrollHeight;
            },

            show_count: function(){

                var html = '';

                // Walk Through The Graph
                for(var key in count){

                    if(count.hasOwnProperty(key)){

                        html += key + ': ' + count[key] + '<br>';
                    }
                }

                var node = document.getElementById('debug-graph-count');

                node.innerHTML = html;
                node.scrollTop = node.scrollHeight;
            }
        };

    })();
}
