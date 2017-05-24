goog.provide('APP.WORKER');
goog.require('CONFIG');
goog.require('APP');
goog.require('CORE');

APP.WORKER = (function(){

    return {

        /**
         * @param {!string} name
         * @param {!Function} worker
         * @param {!Function} callback
         */

        register: function(name, worker, callback){

            var worker_payload = (

                URL.createObjectURL ?

                    /* Load Inline Worker */

                    URL.createObjectURL(

                        new Blob(['(' + worker.toString() + ')()'], {

                            'type': 'text/javascript'
                        })
                    )
                :

                    /* Load Extern Worker (but also requires CORS) */

                    'worker/' + name + '.js'
            );

            APP.WORKER[name] = new Worker(worker_payload);
            APP.WORKER[name].onmessage = callback;

            if(DEBUG) CORE.console.log('Register Worker@' + name);
        }
    }

})();
