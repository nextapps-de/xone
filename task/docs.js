#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var lib = require('./lib.js');

console.log("Generate Docs ...");

if(fs.existsSync('doc/api/')){

    lib.deleteFiles('doc/api/');
}

var xone_config = lib.loadJSON('xone.json');
var path_to_folder;

if(fs.existsSync(path.resolve(xone_config.node_modules_path, 'jsdoc'))){

    path_to_folder = path.resolve(xone_config.node_modules_path, 'jsdoc');
}
else{

    path_to_folder = path.resolve(xone_config.node_modules_path, '..', '..', 'jsdoc');
}

lib.exec('node "' + path_to_folder + '/jsdoc" app/config/production.js app/js/ -d doc/api/ -e utf8' + (fs.existsSync('jsdoc.json') ? ' -c jsdoc.json' : '') + ' -p -r', function(){

    console.log("-----------------------------------------------------");
    console.log("Docs generated successfully.");
});
