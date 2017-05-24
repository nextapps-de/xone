#!/usr/bin/env node

var parameter = process.argv[2] || 'help';
var skip_global = false;
var skip_local = false;

switch(parameter){

    case '-h':
    case '--help':
        parameter = 'help';
        break;

    case '-i':
    case '--info':
    case 'info':
    case '-v':
    case '--version':
        parameter = 'version';
        break;

    case '-c':
    case '--compile':
        parameter = 'compile';
        break;

    case '-r':
    case '--refresh':
        parameter = 'refresh';
        break;

    case '-b':
    case '--build':
        parameter = 'build';
        break;

    case '-d':
    case '--docs':
        parameter = 'docs';
        break;

    case '-u':
    case '--update':
        parameter = 'install';
        break;

    case '-t':
    case '--test':
    case 'test':
        parameter = 'specs';
        break;
}

if(parameter === 'version' || parameter === 'help'){

    switch(process.argv[3]){

        case '-g':
        case '--global':
        case 'global':
            skip_local = true;
            break;

        case '-l':
        case '--local':
        case 'local':
            skip_global = true;
            break;

        case '-c':
        case '--current':
        case 'current':
            skip_global = true;
            skip_local = true;
            break;

        case void 0:
            skip_local = true;
            break;
    }
}

var path = require('path');
var lib = require('../task/lib.js');

if(['help', 'version'].indexOf(parameter) !== -1) {

    if(!skip_local){

        lib.exec('node "' + path.resolve('./node_modules/xone/task/',  parameter + '.js') + '" ' + (process.argv[3] || '') + ' ' + (process.argv[4] || ''));
    }
    else{

        lib.exec('node "' + path.resolve(__dirname, '..', 'task', parameter + '.js') /*__dirname.substring(0, __dirname.lastIndexOf('/cli')) + '/task/'*/ + '" ' + (process.argv[3] || '') + ' ' + (process.argv[4] || ''));
    }
}
else if(['create', 'install'].indexOf(parameter) !== -1 && !skip_global){

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
        'server'].indexOf(parameter) !== -1){

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
