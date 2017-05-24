#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var lib = require('./lib.js');

if(fs.existsSync('doc/api/')){

    lib.deleteFiles('doc/api/');
}

var xone_config = lib.loadJSON('xone.json');
var path_to_folder;

if(fs.existsSync(path.resolve(xone_config.node_modules_path, 'jasmine'))){

    path_to_folder = path.resolve(xone_config.node_modules_path, 'jasmine');
}
else{

    path_to_folder = path.resolve(xone_config.node_modules_path, '..', '..', 'jasmine');
}

lib.exec('node "' + path_to_folder + '/bin/jasmine"' + (fs.existsSync('jasmine.json') ? ' --config=jasmine.json' : ''));
