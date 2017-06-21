#!/usr/bin/env node

var lib = require('./lib.js');
var fs = require('fs');
var path = require('path');

// sync version
function walkSync(dir, callback) {

    fs.readdirSync(dir).forEach(function(name) {

        var filePath = path.join(dir, name);
        var stat = fs.statSync(filePath);

        if(stat.isFile()) {

            if(filePath.indexOf('.js') === filePath.length - 3) {

                callback(filePath, stat);
            }
        }
        else if(stat.isDirectory()) {

            walkSync(filePath, callback);
        }
    });
}

// async version with basic error handling
function walkAsync(currentDirPath, callback) {

    fs.readdir(currentDirPath, function (err, files) {

        if(err) throw new Error(err);

        files.forEach(function(name) {

            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);

            if(stat.isFile()) {

                if(filePath.indexOf('.js') === filePath.length - 3) {

                    callback(filePath, stat);
                }
            }
            else if(stat.isDirectory()) {

                walkAsync(filePath, callback);
            }
        });
    });
}

var manifest = {};
var files = {};
var order = [];
var updates = [];

var parse_depedencies = function(filePath, js, is_update){

    //console.log("File: " + filePath);

    filePath = path.normalize(filePath);
    js = js.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');

    if(!js.length) return false;

    var pos = 0;
    var valid = true;
    var update = false;

    while((pos = js.indexOf("goog.require(", pos)) > -1){

        pos += 14;

        //console.log(js.substring(pos, js.indexOf(")", pos) - 1));

        if(!manifest[js.substring(pos, js.indexOf(")", pos) - 1)]){

            valid = false;

            if(!is_update) {

                //console.log(filePath + ' requires: ' + js.substring(pos, js.indexOf(")", pos) - 1));

                updates.push({

                    filePath: filePath,
                    js: js,
                });
            }
            else{

                //console.log(filePath + ' requires: ' + js.substring(pos, js.indexOf(")", pos) - 1));
            }

            break;
        }
    }

    if(valid){

        pos = 0;

        while((pos = js.indexOf("goog.provide(", pos)) > -1){

            pos += 14;

            if(!manifest[js.substring(pos, js.indexOf(")", pos) - 1)]){

                manifest[js.substring(pos, js.indexOf(")", pos) - 1)] = true;
                update = true;

                if(!files[filePath]){

                    files[filePath] = true;
                    order.push(path.normalize(filePath).replace("app//", "").replace("app\\", ""));
                }
            }
        }
    }

    if(update && !is_update){

        for(var i = 0; i < updates.length; i++){

            if(parse_depedencies(updates[i].filePath, updates[i].js, true)){

                // TODO start from beginning really required when recursive?
                //updates.splice(i--, 1);
                updates.splice(i, 1);
                i = -1;
            }
        }
    }

    if(!is_update){

        //console.log('-------------------------');
    }

    return valid;
};

console.log('Calculating Dependencies...');
console.log('-----------------------------------------------------');

var xone_manifest = lib.loadJSON('app/manifest.js', 'MANIFEST');
var status = true;
var loose = true;

manifest.PLATFORM = xone_manifest.platform;
//manifest.CONFIG = true;

parse_depedencies(path.normalize('app/config/' + xone_manifest.env + '.js'), fs.readFileSync(path.normalize('app/config/' + xone_manifest.env + '.js'), 'utf8'));
parse_depedencies(path.normalize('app/lib/xone/local/env.js'), fs.readFileSync(path.normalize('app/lib/xone/local/env.js'), 'utf8'));

//parse_depedencies('app/config/production.js', fs.readFileSync('app/config/production.js', 'utf8'));

walkSync('./app/lib/xone/core/', function(filePath){

    if(filePath.indexOf('lib/xone/env.js') === -1 && filePath.indexOf('lib\\xone\\env.js') === -1) parse_depedencies(filePath, fs.readFileSync(filePath, 'utf8'));
});

walkSync('./app/lib/xone/lib/', function(filePath){

    parse_depedencies(filePath, fs.readFileSync(filePath, 'utf8'));
});

walkSync('./app/js/', function(filePath){

    if(filePath.indexOf('app/js/main.js') === -1 && filePath.indexOf('app\\js\\main.js') === -1) parse_depedencies(filePath, fs.readFileSync(filePath, 'utf8'));
});

parse_depedencies(path.normalize('app/layout/layout.js'), fs.readFileSync(path.normalize('app/layout/layout.js'), 'utf8'));
parse_depedencies(path.normalize('app/view/view.js'), fs.readFileSync(path.normalize('app/view/view.js'), 'utf8'));
parse_depedencies(path.normalize('app/js/main.js'), fs.readFileSync(path.normalize('app/js/main.js'), 'utf8'));

for(var i = 0; i < updates.length; i++){

    if(!loose){

        order.push(path.normalize(updates[i].filePath).replace("app//", "").replace("app\\", ""));
        updates.splice(i--, 1);
    }
    else{

        console.warn("Dependecy skipped: " + updates[i].filePath);
    }
}

fs.writeFileSync('app/deps.js', "var DEPS = " + JSON.stringify(order, null, "\t") + ";", 'utf8');

if(order.length){

    switch(process.argv[2]){

        case 'log':
        case '--l':
        case '-l':
        case void 0:

            console.log(Object.keys(manifest));
            console.log('-----------------------------------------------------');

            console.log(order);
            console.log('-----------------------------------------------------');

            break;
    }
}

console.log(

    status ?

        "Process Complete.\n"
    :
        "Error on calculating dependencies!"
);
