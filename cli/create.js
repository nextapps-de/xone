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
    lib.exec('node "' + path.resolve(__dirname, 'install.js') + '" remove_me_dummy ' + parameter);

    if(demo) lib.copyFolderRecursiveSync(path_to_folder + '/demo/./', parameter.toLowerCase(), true);

    var xone_config = lib.loadJSON(path.resolve(path_to_folder, 'project/xone.json'));

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
        console.log("Project was successfully created.");

        // if(!(/^win/.test(process.platform))){
        //
        //     lib.exec("chmod +x " + parameter.toLowerCase() + "/app.sh");
        // }

    //}, 100);
}
