#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var lib = require('../task/lib.js');
var parameter = process.argv[2];
var path_to_folder;
var local = false;

switch(parameter){

    case '-l':
    case '--local':
    case 'local':
        parameter = false;
        path_to_folder = 'node_modules/xone';
        break;

    case '-g':
    case '--global':
    case 'global':
        parameter = false;
        path_to_folder = path.resolve(__dirname, '../');
        break;

    case void 0:
        parameter = false;
        path_to_folder = path.resolve(__dirname, '../'); //__dirname.substring(0, __dirname.lastIndexOf('/cli'));
        break;

    case "remove_me_dummy":
        parameter = process.argv[3];
        path_to_folder = path.resolve(__dirname, '../');
        break;

    default:
        parameter = false;
        break;
}

if(parameter && !path_to_folder){

    path_to_folder = parameter;
}

if(!fs.existsSync((parameter || '.') + '/xone.json')){

    console.log("Error: The target directory does not includes a valid xone project!");
}
else{

    if(fs.existsSync(path_to_folder + '/core')){

        parameter || (parameter = '.');

        lib.copyFolderRecursiveSync(path_to_folder + '/core', parameter + '/app/lib/xone', true);
        lib.copyFolderRecursiveSync(path_to_folder + '/css', parameter + '/app/lib/xone', true);
        lib.copyFolderRecursiveSync(path_to_folder + '/lib', parameter + '/app/lib/xone', true);
        lib.copyFolderRecursiveSync(path_to_folder + '/plugin', parameter + '/app/lib/xone', true);
        lib.copyFolderRecursiveSync(path_to_folder + '/build', parameter + '/app/lib/xone', true);
        lib.copyFolderRecursiveSync(path_to_folder + '/dist', parameter + '/app/lib/xone', true);
        lib.copyFolderRecursiveSync(path_to_folder + '/task', parameter + '/app/lib/xone', true);
        lib.copyFolderRecursiveSync(path_to_folder + '/local', parameter + '/app/lib/xone', true);
        lib.copyFolderRecursiveSync(path_to_folder + '/spec', parameter + '/app/lib/xone', true);
        lib.copyFileSync(path_to_folder + '/project/app/js/build.js', parameter + '/app/js/build.js', true);
        lib.copyFileSync(path_to_folder + '/package.json', parameter + '/app/lib/xone/package.json', true);

        if(/^win/.test(process.platform)){

            lib.copyFileSync(path_to_folder + '/bin/app.cmd', parameter + '/app.cmd', true);
        }
        else{

            lib.copyFileSync(path_to_folder + '/bin/app', parameter + '/xone', true);
            lib.exec("chmod +x " + parameter + '/xone');
        }

        if(!fs.existsSync(path.resolve(parameter + '/app/lib/jasmine'))){

            fs.mkdirSync(path.resolve(parameter + '/app/lib/jasmine'));
        }

        var path_to_jasmine;

        if(fs.existsSync(path.resolve('.', 'node_modules/jasmine-core/lib'))){

            path_to_jasmine = path.resolve('.', 'node_modules/jasmine-core/lib');
        }
        else if(fs.existsSync(path.resolve(__dirname, '..', 'node_modules/jasmine-core/lib'))){

            path_to_jasmine = path.resolve(__dirname, '..', 'node_modules/jasmine-core/lib');
        }
        else{

            path_to_jasmine = path.resolve(__dirname, '..', '..', 'jasmine-core/lib');
        }

        lib.copyFileSync(path.resolve(path_to_jasmine + '/jasmine-core/jasmine.css'), path.resolve(parameter + '/app/lib/jasmine/jasmine.css'), true);
        lib.copyFileSync(path.resolve(path_to_jasmine + '/jasmine-core/jasmine.js'), path.resolve(parameter + '/app/lib/jasmine/jasmine.js'), true);
        lib.copyFileSync(path.resolve(path_to_jasmine + '/jasmine-core/jasmine-html.js'), path.resolve(parameter + '/app/lib/jasmine/jasmine-html.js'), true);
        lib.copyFileSync(path.resolve(path_to_jasmine + '/jasmine-core/boot.js'), path.resolve(parameter + '/app/lib/jasmine/boot.js'), true);
        lib.copyFileSync(path.resolve(path_to_jasmine + '/console/console.js'), path.resolve(parameter + '/app/lib/jasmine/console.js'), true);
        lib.copyFileSync(path.resolve(path_to_jasmine + '/../images/jasmine_favicon.png'), path.resolve(parameter + '/app/lib/jasmine/jasmine_favicon.png'), true);

        var path_to_benchmark;

        if(fs.existsSync(path.resolve('.', 'node_modules/benchmark'))){

            path_to_benchmark = path.resolve('.', 'node_modules/benchmark');
        }
        else if(fs.existsSync(path.resolve(__dirname, '..', 'node_modules/benchmark'))){

            path_to_benchmark = path.resolve(__dirname, '..', 'node_modules/benchmark');
        }
        else{

            path_to_benchmark = path.resolve(__dirname, '..', '..', 'benchmark');
        }

        lib.copyFileSync(path.resolve(path_to_benchmark, 'benchmark.js'), path.resolve(parameter + '/app/lib/benchmark/benchmark.js'), true);

        var path_to_lodash;

        if(fs.existsSync(path.resolve('.', 'node_modules/lodash'))){

            path_to_lodash = path.resolve('.', 'node_modules/lodash');
        }
        else if(fs.existsSync(path.resolve(__dirname, '..', 'node_modules/lodash'))){

            path_to_lodash = path.resolve(__dirname, '..', 'node_modules/lodash');
        }
        else if(fs.existsSync(path.resolve('.', 'node_modules/benchmark/node_modules/lodash'))){

            path_to_lodash = path.resolve('.', 'node_modules/benchmark/node_modules/lodash');
        }
        else if(fs.existsSync(path.resolve(__dirname, '..', 'node_modules/benchmark/node_modules/lodash'))){

            path_to_lodash = path.resolve(__dirname, '..', 'node_modules/benchmark/node_modules/lodash');
        }
        else{

            path_to_lodash = path.resolve(__dirname, '..', '..', 'lodash');
        }

        lib.copyFileSync(path.resolve(path_to_lodash, 'lodash.min.js'), path.resolve(parameter + '/app/lib/benchmark/lodash.min.js'), true);
    }

    console.log("Project was successfully updated.");
}
