#!/usr/bin/env node

//var host = process.argv[2];
var port = process.argv[2];

var fs = require('fs');
var path = require('path');

//host || (host = 'localhost');

if(!port){

    if(/^win/.test(process.platform)){

        port = 80;
    }
    else{

        port = 8080;
    }
}

var path_to_folder = require('./lib.js').getModule('web-servo');

if(path_to_folder){

    var ws = require(path_to_folder);
    ws.config('./server.json');
    ws.setConfigVar('server.port', port);
    ws/*.silent()*/.start();

    //console.log("http://localhost:" + port);
    console.log("-----------------------------------------------------");
    //console.log("Hit CTRL-C to stop the server...");
}

// require('./lib.js').exec('node "' + path_to_folder + '/bin/http-server" ./ -a ' + host + ' -p ' + port + ' -s -c-1 --cors --utc --gzip', function(){
//
//     console.log("Server has stopped.");
// });
