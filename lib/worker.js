goog.provide('APP.WORKER');
goog.require('CONFIG');
goog.require('APP');
goog.require('CORE');

APP.WORKER = (function(){

    var worker_stack = {};

    return {

        /**
         * @param {!string} _name
         * @param {!Function} _worker
         * @param {!Function} _callback
         * @param {number=} _cores
         */

        register: function(_name, _worker, _callback, _cores){

            var name = _name;
            var worker = _worker;
            var callback = _callback;
            var cores = _cores;
            var current_index = 0;
            var worker_payload;

            worker_payload = (

                window['Blob'] && window['URL'] && window['URL']['createObjectURL'] ?

                    /* Load Inline Worker */

                    window['URL']['createObjectURL'](

                        new window['Blob'](

                            ['(' + worker['toString']() + ')()'], {

                                'type': 'text/javascript'
                            }
                        )
                    )
                :

                    /* Load Extern Worker (but also requires CORS) */

                    'js/worker/' + name + '.js'
            );

            //
            // if(worker_payload === ('js/worker/' + name + '.js')){
            //
            //     return;
            // }

            cores || (cores = 1);

            worker_stack[name] = new Array(cores);

            for(var i = 0; i < cores; i++){

                worker_stack[name][i] = new Worker(worker_payload);
                worker_stack[name][i]['onmessage'] = callback;
            }

            APP.WORKER[name] = {

                'postMessage': function(data){

                    if(DEBUG) CORE.console.log('Worker@' + name + ':' + current_index);

                    worker_stack[name][current_index++]['postMessage'](data);

                    if(current_index === cores){

                        current_index = 0;
                    }
                }
            };

            if(DEBUG) CORE.console.log('Register Worker@' + name);

            return APP.WORKER[name];
        }
    }

})();
