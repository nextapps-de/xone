goog.provide('APP.WORKER.TEST');
goog.require('APP.WORKER');
goog.require('APP');
goog.require('CORE');

(function(){

    APP.WORKER.register(

        // name:
        'test',

        // worker:
        function(){

            this.onmessage = function(event){

                this.postMessage(event.data);
            };
        },

        // callback:
        function(event){

            if(DEBUG) CORE.console.log(event.data);
        }
    );

    APP.WORKER['test'].postMessage('Worker Test');

})();
