#!/usr/bin/env node

var parameter = process.argv[2];
var env = process.argv[3];
var lib = require('./lib.js');

switch(parameter){

    case '--delete':
    case '-delete':
    case 'delete':
    case '--d':
    case '-d':

    case '--remove':
    case '-remove':
    case 'remove':
    case '--r':
    case '-r':

    case '--uninstall':
    case '-uninstall':
    case 'uninstall':
    case '--u':
    case '-u':

        parameter = 'delete';
        break;

    case '--add':
    case '-add':
    case 'add':
    case '--a':
    case '-a':

    case '--install':
    case '-install':
    case 'install':
    case '--i':
    case '-i':

    case '--create':
    case '-create':
    case 'create':
    case '--c':
    case '-c':

    case '--new':
    case '-new':
    case 'new':
    case '--n':
    case '-n':

        parameter = 'add';
        break;

    case '--list':
    case '-list':
    case 'list':
    case '--l':
    case '-l':
    case void 0:

        parameter = 'list';
        break;

    default:

        console.warn("The passed parameter '" + String(parameter) + "' is not supported.");
        console.warn(["add", "list"].join('\n'));

        return;
        break;
}

if(parameter === 'list'){

    console.log("Current environments:\n----------------------\n" + lib.getFiles('app/config', 'js').map(

        function(value){

            return value.substring(value.indexOf('config') + 7, value.lastIndexOf('.'))
                        .replace(/\//g, '')
                        .replace(/\\/g, '');
        }

    ).join("\n"));
}
else if(env && parameter === 'delete') {

    if(!lib.checkEnvironment(env)) {

        return;
    }
    else{

        //lib.deleteFiles('app/config/' + env + '.js');

        console.log('Note: Deleting environments is currently not supported.');
    }
}
else if(env && parameter === 'add') {

    if(env === 'production' || env === 'development' || env === 'benchmark' || env === 'test'){

        console.log('Error: The environment name "' + env + '" is not allowed.');

        return;
    }

    var fs = require('fs');

    if(fs.existsSync('app/config/development.js')){

        lib.copyFileSync('app/config/development.js', 'app/config/' + env + '.js', true);
    }
    else{

        lib.copyFileSync('app/lib/xone/project/app/config/development.js', 'app/config/' + env + '.js', true);
    }

    console.log('The environment "' + env + '" was successfully created in "app/config/".');
}
