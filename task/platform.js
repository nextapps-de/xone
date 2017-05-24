#!/usr/bin/env node

var parameter = process.argv[2];
var platform = process.argv[3];
var lib = require('./lib.js');

switch(parameter){

    case '--delete':
    case '--remove':
    case 'remove':
    case '--uninstall':
    case 'uninstall':
        parameter = 'delete';
        break;

    case '--add':
    case '--install':
    case 'install':
        parameter = 'add';
        break;

    case void 0:
        parameter = 'list';
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

        fs.mkdirSync('app/platform/' + platform);
        fs.mkdirSync('app/platform/' + platform + '/css');
        fs.mkdirSync('app/platform/' + platform + '/js');
        fs.mkdirSync('app/platform/' + platform + '/img');
        fs.mkdirSync('app/platform/' + platform + '/font');
        fs.mkdirSync('app/platform/' + platform + '/assets');
        fs.mkdirSync('app/platform/' + platform + '/lib');
    }
}
