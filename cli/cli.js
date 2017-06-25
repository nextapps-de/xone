#!/usr/bin/env node

var parameter = process.argv[2] || 'help';

switch(parameter){

    case '-h':
    case '--h':
    case '--help':
    case '-help':
    case 'help':

    case '-i':
    case '--i':
    case '--info':
    case '-info':
    case 'info':

        parameter = 'help';
        break;

    case '-v':
    case '--v':
    case '--version':
    case '-version':
    case 'version':

        parameter = 'version';
        break;

    case '-c':
    case '--c':
    case '--compile':
    case '-compile':
    case 'compile':

        parameter = 'compile';
        break;

    case '-r':
    case '--r':
    case '--refresh':
    case '-refresh':
    case 'refresh':

        parameter = 'refresh';
        break;

    case '-b':
    case '--b':
    case '--build':
    case '-build':
    case 'build':

        parameter = 'build';
        break;

    case '-d':
    case '--d':
    case '--docs':
    case '-docs':
    case 'docs':

        parameter = 'docs';
        break;

    case '--update':
    case '-update':
    case 'update':

    case '--install':
    case '-install':
    case 'install':

        parameter = 'install';
        break;

    case '--init':
    case '-init':
    case 'init':

        parameter = 'init';
        break;

    case '--new':
    case '-new':
    case 'new':

    case '--create':
    case '-create':
    case 'create':

        parameter = 'create';
        break;

    case '-t':
    case '--t':
    case '--test':
    case '-test':
    case 'test':

    case '-s':
    case '--s':
    case '--specs':
    case '-specs':
    case 'specs':

        parameter = 'specs';
        break;

    default:

        console.warn("The passed parameter '" + String(parameter) + "' is not supported.");
        parameter = 'help';
        break;
}

var use_global = false;
var use_local = false;
var use_current = false;

if(parameter === 'version' || parameter === 'help'){

    switch(process.argv[3]){

        case '--g':
        case '-g':
        case '--global':
        case '-global':
        case 'global':
            use_global = true;
            break;

        case '-l':
        case '--l':
        case '--local':
        case '-local':
        case 'local':
            use_local = true;
            break;

        case '--c':
        case '-c':
        case '--current':
        case '-current':
        case 'current':
        case '--i':
        case '-i':
        case '--installed':
        case '-installed':
        case 'installed':
        case void 0:
            use_current = true;
            break;

        default:
            use_current = true;
            break;
    }
}

var fs = require('fs');
var path = require('path');
var lib = require('../task/lib.js');

if(['help', 'version'].indexOf(parameter) !== -1) {

    if(use_current){

        if(fs.existsSync(path.resolve('./app/lib/xone/task/',  parameter + '.js'))){

            lib.exec('node "' + path.resolve('./app/lib/xone/task/',  parameter + '.js') + '" ' + (process.argv[3] || '') + ' ' + (process.argv[4] || ''));
        }
        else{

            console.warn("Warning: There was no local xone project found in '" + path.resolve('.') + "'");
        }
    }
    else if(use_local){

        if(fs.existsSync(path.resolve('./node_modules/xone/task/',  parameter + '.js'))){

            lib.exec('node "' + path.resolve('./node_modules/xone/task/',  parameter + '.js') + '" ' + (process.argv[3] || '') + ' ' + (process.argv[4] || ''));
        }
        else{

            console.warn("Warning: There are no local xone installation found in '" + path.resolve('./node_modules/xone/') + "'");
        }
    }
    else if(use_global){

        lib.exec('node "' + path.resolve(__dirname, '..', 'task', parameter + '.js') /*__dirname.substring(0, __dirname.lastIndexOf('/cli')) + '/task/'*/ + '" ' + (process.argv[3] || '') + ' ' + (process.argv[4] || ''));
    }
}
else if(['create', 'install', 'init'].indexOf(parameter) !== -1 && !use_global){

    lib.exec('node "' + path.resolve(__dirname, parameter + '.js') + '" ' + (process.argv[3] || '') + ' ' + (process.argv[4] || ''));
}
else {

    if(['version',
        'help',
        'compile',
        'build',
        'refresh',
        'platform',
        'docs',
        'specs',
        'deploy',
        'server',
        'deps',
        'env'].indexOf(parameter) !== -1){

        var fs = require('fs');
        var dir = 'app/lib/xone/task/' + parameter + '.js';

        if(!fs.existsSync(path.normalize('./xone.json')) || !fs.existsSync(path.normalize(dir))){

            console.log("Error: The current directory is not a valid xone project!");
        }
        else{

            lib.exec('node ' + (parameter === "build" ? '--max-old-space-size=8192 ' : '') + '"' + path.normalize(dir) + '" ' + (process.argv[3] || '') + ' ' + (process.argv[4] || '') + ' ' + (process.argv[5] || ''));
        }
    }
    else{

        console.log("Error: An unknown parameter was passed!");
    }
}
