/**
 * Closure Compiler Local Fallback
 */

(function(modules){

    var self = this;

    window.goog = {

        provide: function(a){

            modules[a] = true;
        },
        require: function(a){

            modules[a] || console.warn('WARNING: Dependency is missing: ' + a);
        },
        scope: function(fn){

            fn.call(self);
        }
        // exportSymbol: function(a, b){},
        // exportProperty: function(a, b){}
    };

})({});

/**
 * CommonJS Wrapper for Browser and Node.js
 * @param {!string} name
 */

var require = (function(){

    var modules = this['modules'] || (this['modules'] = {});

    return function(name){

        var pos;

        if((pos = name.lastIndexOf('/')) !== -1){

            name = name.substring(pos + 1);
        }

        return modules[name.replace('.js', '')];
    }
})();

// /**
//  * CommonJS Wrapper for Browser and Node.js
//  * @param {!string} name
//  * @param {!Function|Object=} root
//  */
//
// var require = function(name, root){
//
//     root || (root = this);
//
//     var modules = root['modules'] || (root['modules'] = {});
//     var pos;
//
//     if((pos = name.lastIndexOf('/')) !== -1){
//
//         name = name.substring(pos + 1);
//     }
//
//     return modules[name.replace('.js', '')];
// };

// Note: May this workaround is more Node-compatible:
// https://github.com/efacilitation/commonjs-require
