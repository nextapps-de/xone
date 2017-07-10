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
    },

    toBeAnyOf: function(){

        return {

            compare: function(actual, expected){

                for(var i = 0, l = expected.length; i < l; i++){

                    if(actual === expected[i]){

                        return true;
                    }
                }

                return false;
            }
        };
    },

    toContainAnyOf: function(){

        return {

            compare: function(actual, expected){

                var found;

                for(var i = 0; i < expected.length; i++){

                    found = false;

                    for(var a = 0; a < actual.length; a++){

                        if(actual[a] === expected[i]){

                            found = true;
                            break;
                        }
                    }

                    if(!found) break;
                }

                return {

                    pass: found, // true || false
                    message: "Expected " + actual + " to contain any of '" + expected + "'"
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
        'APP',
        'AMD'
    ]);
});

function register_names(namespaces){

    for(var i = 0; i < namespaces.length; i++){

        if(window[namespaces[i]]) {

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
        else{

            console.warn('Namespace "' + namespaces[i] + '" was not found.');
        }
    }
};
