/* CLOSURE COMPILER LOCAL FALLBACK */

(function(modules){

    window.goog = {

        provide: function(a){

            modules[a] = true;
        },
        require: function(a){

            modules[a] || console.warn('WARNING: Dependency is missing: ' + a);
        },
        scope: function(fn){

            //fn.call(window);
        },
        exportSymbol: function(a, b){},
        exportProperty: function(a, b){}
    };

})({});
