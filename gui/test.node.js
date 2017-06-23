// to return HTML, we use module.exports
module.exports = function(request, response, parameters, ws) {

    //console.log(request);
    //console.log(response);

    var fn = parameters.fn;
    var payload = parameters.payload ? JSON.parse(parameters.payload) : {};

    return (

        "{" +
            '"json": "' + modules[fn](payload) + '"' +
        "}"
    );
};

var modules = {

    test: function(payload){

        return JSON.stringify(payload).replace(/"/g, '\\"');
    }
};
