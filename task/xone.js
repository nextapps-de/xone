#!/usr/bin/env node

/**
 * Replacement for env.js > app.js
 * @type {JSON}
 */

var APP_CONFIG = {

    "ENV": "development",
    "XONE_PATH": "lib/xone/",
    "JASMINE_PATH": "lib/jasmine/"
};

// if(process.argv[2]){
//
//     var xone_config = loadJSON(__dirname + '/../app/config/app.js', 'APP_CONFIG');
//
//     var child = require('child_process').exec('node "./app/' + xone_config.XONE_PATH + 'task/' + process.argv[2] + '.js" ' + (process.argv[3] || '') + ' ' + (process.argv[4] || '') + ' ' + (process.argv[5] || '') + ' ' + (process.argv[6] || '') + ' ' + (process.argv[7] || '') + ' ' + (process.argv[8] || ''));
//
//     child.stdout.pipe(process.stdout);
//     child.stderr.pipe(process.stderr);
//
//     function loadJSON(path_to_file, parse_from_js){
//
//         var json = require('fs').readFileSync(path_to_file, {
//
//             encoding: 'utf8'
//         });
//
//         if(parse_from_js){
//
//             json = json.substring(json.indexOf('var ' + parse_from_js));
//             json = json.substring(json.indexOf('{'), json.lastIndexOf('};') + 1);
//         }
//
//         return JSON.parse(json.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1'));
//     }
// }
