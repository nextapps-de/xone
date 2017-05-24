#!/usr/bin/env node

var host = process.argv[2];
var port = process.argv[3];

var fs = require('fs');
var path = require('path');
var lib = require('./lib.js');

host || (host = 'localhost');

if(!port){

    if(/^win/.test(process.platform)){

        port = 80;
    }
    else{

        port = 8080;
    }
}

console.log("Server@" + host + ":" + port);
console.log("-----------------------------------------------------");
console.log("Hit CTRL-C to stop the server...");

var xone_config = lib.loadJSON('xone.json');
var path_to_folder;

if(fs.existsSync(path.resolve(xone_config.node_modules_path, 'http-server'))){

    path_to_folder = path.resolve(xone_config.node_modules_path, 'http-server');
}
else{

    path_to_folder = path.resolve(xone_config.node_modules_path, '..', '..', 'http-server');
}

require('./lib.js').exec('node "' + path_to_folder + '/bin/http-server" ./ -a ' + host + ' -p ' + port + ' -s -c-1 --cors --utc --gzip', function(){

    console.log("Server has stopped.");
});
