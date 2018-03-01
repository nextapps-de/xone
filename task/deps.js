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
var require_count = {};
var file_map = {};
var files = {};
var order = [];
var updates = [];
var externs = [];

var parse_dependencies = function(filePath, js, is_update){

    filePath = path.normalize(filePath);
    js = js.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');

    if(!js.length) return false;

    var pos = 0;
    var start = 0;
    var valid = true;
    var update = false;

    while(((js.indexOf("goog.require(", start)) > -1) || ((js.indexOf(" require(", start)) > -1)){

        var pos_a = js.indexOf("goog.require(", start);
        var pos_b = js.indexOf(" require(", start);

        pos = ((pos_b === -1) || ((pos_a < pos_b) && (pos_a > -1)) ? pos_a : pos_b);

        var is_require = (pos === pos_b);

        if(is_require){

            pos += 10;
        }
        else{

            pos += 14;
        }

        start = pos;


        var key = js.substring(pos, js.indexOf(")", pos) - 1);
        var old_key = key;

        if(is_require){

            if(key.lastIndexOf('\/') !== -1){

                key = key.substring(key.lastIndexOf('\/') + 1);
            }

            key = key.replace('.js', '');
        }

        if(!manifest[key]){

            valid = false;

            if(!is_update) {

                updates.push({

                    filePath: filePath,
                    js: js
                });
            }

            if(is_require && (old_key.indexOf('node_modules/') !== -1)){

                externs.push(old_key.substring(0, old_key.lastIndexOf('/') + 1));
            }

            break;
        }

        if(file_map[key]) {

            require_count[file_map[key]] ? require_count[file_map[key]]++ : require_count[file_map[key]] = 1;
        }
    }

    if(valid){

        pos = 0;
        start = 0;

        while(((js.indexOf("goog.provide(", start)) > -1) || (js.indexOf(" provide(", start)) > -1){

            var pos_a = js.indexOf("goog.provide(", start);
            var pos_b = js.indexOf(" provide(", start);

            pos = ((pos_b === -1) || ((pos_a < pos_b) && (pos_a > -1)) ? pos_a : pos_b);

            var is_require = (pos === pos_b);
            var key;

            if(is_require){

                pos += 10;
                key = js.substring(pos, js.indexOf(",", pos) - 1);
            }
            else{

                pos += 14;
                key = js.substring(pos, js.indexOf(")", pos) - 1);
            }

            start = pos;

            if(is_require){

                key = key.toLowerCase();
            }

            file_map[key] = filePath;

            if(!manifest[key]){

                manifest[key] = true;
                update = true;

                if(!files[filePath]){

                    files[filePath] = true;
                    order.push(filePath);
                }
            }
        }
    }

    if(update && !is_update){

        for(var i = 0; i < updates.length; i++){

            if(parse_dependencies(updates[i].filePath, updates[i].js, true)){

                // updates.splice(i--, 1);

                // TODO start from beginning really required when recursive?
                updates.splice(i, 1);
                i = -1;
            }
        }
    }

    return valid;
};

console.log('Calculating Dependencies...');
console.log('-----------------------------------------------------');

var xone_manifest = lib.loadJSON('app/manifest.js', 'MANIFEST');
var status = true;
var loose = true;

manifest.PLATFORM = xone_manifest.platform;
manifest.CONFIG = true;
manifest.ENV = true;
manifest.INIT = true;

//parse_dependencies(path.normalize('app/config/' + xone_manifest.env + '.js'), fs.readFileSync(path.normalize('app/config/' + xone_manifest.env + '.js'), 'utf8'));
//parse_dependencies(path.normalize('app/lib/xone/local/env.js'), fs.readFileSync(path.normalize('app/lib/xone/local/env.js'), 'utf8'));
//parse_dependencies('app/config/production.js', fs.readFileSync('app/config/production.js', 'utf8'));

walkSync(path.normalize("./app/" + xone_manifest.dependencies.xone + 'interface'), function(filePath){

    parse_dependencies(filePath, fs.readFileSync(filePath, 'utf8'));
});

walkSync(path.normalize("./app/" + xone_manifest.dependencies.xone + 'core'), function(filePath){

    parse_dependencies(filePath, fs.readFileSync(filePath, 'utf8'));
});

walkSync(path.normalize("./app/" + xone_manifest.dependencies.xone + 'lib'), function(filePath){

    parse_dependencies(filePath, fs.readFileSync(filePath, 'utf8'));
});

parse_dependencies(path.normalize('app/tmp/layout.js'), fs.readFileSync(path.normalize('app/tmp/layout.js'), 'utf8'));
parse_dependencies(path.normalize('app/tmp/view.js'), fs.readFileSync(path.normalize('app/tmp/view.js'), 'utf8'));

walkSync('./app/js/', function(filePath){

    /*if(filePath.indexOf('app/js/main.js') === -1 && filePath.indexOf('app\\js\\main.js') === -1) */
    parse_dependencies(filePath, fs.readFileSync(filePath, 'utf8'));
});

for(var i = 0; i < externs.length; i++){

    var tmp_path = path.normalize("./app/" + xone_manifest.dependencies.xone + externs[i]);

    if((tmp_path.indexOf('app/lib/xone/node_modules') === -1) && (tmp_path.indexOf('app\\lib\\xone\\node_modules') === -1)){

        tmp_path = path.normalize("./" + tmp_path.replace('xone/node_modules/', '').replace('xone\\node_modules\\', ''));
    }

    if(!fs.existsSync(tmp_path)){

        tmp_path = path.normalize("./" + externs[i]);
    }

    walkSync(tmp_path, function(filePath){

        parse_dependencies(filePath, fs.readFileSync(filePath, 'utf8'));
    });
}

//parse_dependencies(path.normalize('app/js/main.js'), fs.readFileSync(path.normalize('app/js/main.js'), 'utf8'));

for(var i = 0; i < updates.length; i++){

    if(!loose){

        order.push(updates[i].filePath);
        updates.splice(i--, 1);
    }
    else{

        console.warn("Unused dependency skipped: " + updates[i].filePath);
    }
}

order = order.filter(function(value){

    if(!require_count[value]){

        console.warn("Unused dependency skipped: " + value);
    }

    return !!require_count[value];
});

order = order.map(function(value){

    return path.relative("./app/", value).replace("app//", "").replace("app\\", "").replace(/\\\\/g, "/").replace(/\\/g, "/");//.replace("node_modules", "../node_modules");
});

//console.log(order);

fs.writeFileSync('app/tmp/deps.js', (

    "/**\n" +
    " * DEPS\n" +
    " * @const\n" +
    " * @type {JSON}\n" +
    " */\n\n" +
    "var DEPS = " + JSON.stringify(order, null, "\t") + ";"

), 'utf8');

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
