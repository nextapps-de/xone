var fs = require('fs');
var path = require('path');
//var lib = require('../task/lib.js');

module.exports = function(request, response, parameters, ws) {

    //console.log(request);
    //console.log(response);

    var fn = parameters.fn;
    var payload = parameters.payload ? JSON.parse(parameters.payload) : {};

    return JSON.stringify({

        json: modules[fn](payload)
    });
};

var routes = {

    get: {

        'overlay': function(payload){

            if(fs.existsSync('./app/lib/xone/gui/' + payload.shtml + '.shtml')){

                return {

                    shtml: fs.readFileSync('./app/lib/xone/gui/' + payload.shtml + '.shtml', 'utf8')
                };
            }
            else if(fs.existsSync('./node_modules/xone/gui/' + payload.shtml + '.shtml')){

                return {

                    shtml: fs.readFileSync('./node_modules/xone/gui/' + payload.shtml + '.shtml', 'utf8')
                };
            }

            return {};
        }
    }
};

var modules = {

    test: function(payload){

        return payload;
    },

    get: function(payload){

        return routes.get[payload.shtml](payload);
    }
};
