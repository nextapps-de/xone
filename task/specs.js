#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var lib = require('./lib.js');

if(fs.existsSync('doc/api/')){

    lib.deleteFiles('doc/api/');
}

var xone_manifest = lib.loadJSON('app/manifest.js', 'MANIFEST');

var path_to_folder = lib.getModule('jasmine');

lib.exec('node "' + path_to_folder + '/bin/jasmine"' + (fs.existsSync('jasmine.json') ? ' --config=jasmine.json' : ''));
