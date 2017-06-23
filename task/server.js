#!/usr/bin/env node

//var host = process.argv[2];
var port = process.argv[2];

var fs = require('fs');
var path = require('path');
var lib = require('./lib.js');

//host || (host = 'localhost');

if(!port){

    if(/^win/.test(process.platform)){

        port = 80;
    }
    else{

        port = 8080;
    }
}

console.log("http://localhost:" + port);
console.log("-----------------------------------------------------");
console.log("Hit CTRL-C to stop the server...");

var ws = require('web-servo');
ws.config('./server.json');
ws.setConfigVar('server.port', port);
ws/*.silent()*/.start();

// var xone_config = lib.loadJSON('xone.json');
// var path_to_folder;
//
// if(fs.existsSync(path.resolve(xone_config.node_modules_path, 'http-server'))){
//
//     path_to_folder = path.resolve(xone_config.node_modules_path, 'http-server');
// }
// else{
//
//     path_to_folder = path.resolve(xone_config.node_modules_path, '..', '..', 'http-server');
// }
//
// require('./lib.js').exec('node "' + path_to_folder + '/bin/http-server" ./ -a ' + host + ' -p ' + port + ' -s -c-1 --cors --utc --gzip', function(){
//
//     console.log("Server has stopped.");
// });
