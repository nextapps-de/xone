var customMatchers = {

    toHaveMethod: function(){

        return {

            compare: function(actual, expected){

                return {

                    pass: typeof actual[expected] === 'function', // true || false
                    message: "Expected " + actual.__name + " to have method '" + expected + "'"
                };
            }
        };
    },

    toHaveObject: function(){

        return {

            compare: function(actual, expected){

                return {

                    pass: typeof actual[expected] === 'object', // true || false
                    message: "Expected " + actual.__name + " to have object '" + expected + "'"
                };
            }
        };
    },

    toHaveArray: function(){

        return {

            compare: function(actual, expected){

                return {

                    pass: actual[expected].constructor === Array, // true || false
                    message: "Expected " + actual.__name + " to have array '" + expected + "'"
                };
            }
        };
    },

    toHaveProperty: function(){

        return {

            compare: function(actual, expected){

                return {

                    pass: actual.hasOwnProperty(expected), // true || false
                    message: "Expected " + actual.__name + " to have property '" + expected + "'"
                };
            }
        };
    }
};

beforeEach(function() {

    jasmine.addMatchers(customMatchers);

    // used for reflection:
    register_names([

        'CONFIG',
        'CORE',
        'APP'
    ]);
});

function register_names(namespaces){

    for(var i = 0; i < namespaces.length; i++){

        window[namespaces[i]].__name = namespaces[i];

        (function loop(obj){

            for(var key in obj){

                if(obj.hasOwnProperty(key)){

                    if((typeof obj[key] === 'object') || (typeof obj[key] === 'function')){

                        obj[key].__name = key;
                        loop(obj[key]);
                    }
                }
            }

        })(namespaces[i]);
    }
};
