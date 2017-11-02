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

var path_to_folder = path.resolve(__dirname, '..');

lib.exec('node "' + path.resolve(__dirname, 'install.js') + '" remove_me_dummy ' + parameter);

if(demo) lib.copyFolderRecursiveSync(path_to_folder + '/demo/./', parameter.toLowerCase(), true);

var xone_config = lib.loadJSON(path.resolve(path_to_folder, 'project/xone.json'));
var xone_manifest = lib.loadJSON('app/manifest.js', 'MANIFEST');

if(fs.existsSync(path_to_folder + '/node_modules/')){

    xone_config.node_modules_path = path.resolve(path_to_folder + '/node_modules/');
}
else{

    xone_config.node_modules_path = path.resolve(__dirname, '..', 'node_modules/');
}

/*
 if(fs.existsSync(path_to_folder + '/node_modules/yuicompressor/')){
 xone_config.yui_compressor_path = path_to_folder + '/node_modules/yuicompressor/';
 }
 else{
 xone_config.yui_compressor_path = './node_modules/yuicompressor/';
 }
 */

if(fs.existsSync(path_to_folder + '/node_modules/google-closure-compiler-js/')){

    xone_config.closure_compiler_js.path = path.resolve(path_to_folder + '/node_modules/google-closure-compiler-js/');
}
else{

    xone_config.closure_compiler_js.path = path.resolve(__dirname, '..', '..', 'google-closure-compiler-js/');
}

if(fs.existsSync(path_to_folder + '/node_modules/google-closure-compiler/')){

    xone_config.closure_compiler_jar.path = path.resolve(path_to_folder + '/node_modules/google-closure-compiler/');
}
else{

    xone_config.closure_compiler_jar.path = path.resolve(__dirname, '..', '..', 'google-closure-compiler/');
}

if(/^win/.test(process.platform)){

    lib.copyFileSync(path_to_folder + '/bin/app.cmd', parameter.toLowerCase() + '/app.cmd');
}
else{

    lib.exec("chmod +x " + path_to_folder + "/bin/app");
}

// TODO: Async Fix
//setTimeout(function(){

fs.writeFileSync(parameter.toLowerCase() + '/xone.json', JSON.stringify(xone_config, null, "\t"), 'utf8');
console.log("Project was successfully initialized.");

// if(!(/^win/.test(process.platform))){
//
//     lib.exec("chmod +x " + parameter.toLowerCase() + "/app.sh");
// }

//}, 100);

