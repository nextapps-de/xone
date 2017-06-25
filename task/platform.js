#!/usr/bin/env node

var parameter = process.argv[2];
var platform = process.argv[3];
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

    console.log("Current platforms:\n----------------------\n" + lib.getDirectories('app/platform').join("\n"));
}
else if(platform && parameter === 'delete') {

    if(!lib.checkPlatform(platform)) {

        return;
    }
    else{

        //lib.deleteFiles('app/platform/' + platform);

        console.log('Note: Deleting platforms is currently not supported.');
    }
}
else if(platform && parameter === 'add') {

    if(platform === 'www' || platform === 'bundle' || platform === 'lib'){

        console.log('Error: The platform name "' + platform + '" is not allowed.');

        return;
    }

    var fs = require('fs');

    if(!fs.existsSync('app/platform/' + platform)) {

        lib.buildFolders('app/platform/' + platform);
        fs.mkdirSync('app/platform/' + platform + '/css');
        fs.mkdirSync('app/platform/' + platform + '/js');
        fs.mkdirSync('app/platform/' + platform + '/img');
        fs.mkdirSync('app/platform/' + platform + '/font');
        fs.mkdirSync('app/platform/' + platform + '/asset');
        fs.mkdirSync('app/platform/' + platform + '/lib');
    }

    console.log('The platform "' + platform + '" was successfully created in "app/platform/".');
}
