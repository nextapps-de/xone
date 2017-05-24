#!/usr/bin/env node

var platform = process.argv[2];
var lib = require('./lib.js');
var fs = require('fs');

if(platform) {

    if(!lib.checkPlatform(platform)) {

        return;
    }
}

var xone_manifest = lib.loadJSON('app/manifest.js', 'MANIFEST');
var dependencies = xone_manifest.dependencies.build;

for(var i = 0; i < dependencies.length; i++){

    if(dependencies[i].indexOf('.') === -1) {

        if(platform){

            lib.copyFolderRecursiveSync('app/' + dependencies[i], 'bin/' + platform, true);
        }
        else{

            lib.copyFolderRecursiveSync('app/' + dependencies[i], 'bin/www/', true);
        }
    }
    else {

        if(platform){

            lib.copyFileSync('app/' + dependencies[i], 'bin/' + platform + '/' + dependencies[i], true);
        }
        else{

            lib.copyFileSync('app/' + dependencies[i], 'bin/www/' + dependencies[i], true);
        }
    }
}
