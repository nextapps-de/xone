#!/usr/bin/env node

var parameter = process.argv[2];
var force = false;
var demo = false;

switch(parameter){

    case '-f':
    case '--force':
        force = true;
        parameter = '.';
        break;

    case '-d':
    case '--demo':
    case 'demo':
        demo = true;
        parameter = '.';
        break;
}

switch(process.argv[3]){

    case '-f':
    case '--force':
        force = true;
        break;

    case '-d':
    case '--demo':
    case 'demo':
        demo = true;
        break;
}

parameter || (parameter = '.');

var fs = require('fs');
var path = require('path');
var lib = require('../task/lib.js');

if(!force && fs.existsSync(parameter.toLowerCase() + '/xone.json')){

    console.log("Error: The " + (parameter === '.' ? 'current' : 'target') + " directory already include a xone project!");
    console.log("Append the '--force' parameter to force execution and overwrite existing project files!");
}
else if(!force && (fs.existsSync('app') || fs.existsSync('bin'))){

    console.log("Warning: The " + (parameter === '.' ? 'current' : 'target') + " directory is not empty!");
    console.log("Append the '--force' parameter to force execution and overwrite existing project files!");
}
else{

    var path_to_folder = path.resolve(__dirname, '..');

    if(!fs.existsSync(path.resolve(path_to_folder))){

        fs.mkdirSync(path.resolve(path_to_folder));
    }

    lib.copyFolderRecursiveSync(path_to_folder + '/project/./', path.normalize(parameter.toLowerCase()), force);
    lib.exec('node "' + path.resolve(__dirname, 'init.js') + '" remove_me_dummy ' + parameter);

    console.log("Project was successfully created.");
}
