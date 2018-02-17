#!/usr/bin/env node

//var himalaya = require('himalaya'); // https://www.npmjs.com/package/himalaya
var platform = process.argv[2];
var lib = require('./lib.js');
var fs = require('fs');
var path = require('path');

if(platform) {

    if(!lib.checkPlatform(platform)) {

        return;
    }
}

console.log('Start Compile...');
console.log('-----------------------------------------------------');

function compile_view_to_json(view_src){

    /* IMPORT HTML FILE INTO JSON */

    var html = fs.readFileSync(view_src, 'utf8');
    var pos;

    /* PARSE INCLUDES */

    while((pos = html.indexOf('{{')) !== -1) {

        var tmp = html.substring(pos + 2, html.indexOf('}}', pos));
        var include = fs.readFileSync('./app/' + tmp.replace(/ /g, '') + '.shtml', 'utf8');

        html = html.replace('{{' + tmp + '}}', include);
    }

    /* REMOVE LINE BREAKS HTML */

    while(html.indexOf("\n ") !== -1) html = html.replace("\n ", "\n");
    while(html.indexOf("\n")  !== -1) html = html.replace("\n", '');

    var json = himalaya.parse(html);
    var text = JSON.stringify(json);

    /* REMOVE LINE BREAKS JSON */

    while(text.indexOf('\\n ')  !== -1) text = text.replace('\\n ', '\\n');
    while(text.indexOf('"\\n') !== -1)  text = text.replace('"\\n', '"');

    /* COMPACT ATTRIBUTES */

    text = text.replace(/"tagName"/g, '"tag"')
               .replace(/"children"/g, '"child"')
               .replace(/"attributes"/g, '"attr"')
               .replace(/"dataset"/g, '"data"')
               .replace(/,"type":"Element"/g, '')
               .replace(/,"child":\[\]/g, '');

    /* SIMPLE CHECK IF JSON IS VALID */

    JSON.stringify(JSON.parse(text));

    /* EXPO */

    fs.writeFileSync(view_src.replace('.shtml', '.json'), text, 'utf8');

    return true;
}

function compile_view_to_array(html, array, exp, not, loop){

    array || (array = []);
    exp || (exp = false);
    not || (not = false);
    loop || (loop = false);
    var data = [];
    var map = [];
    var pos = 0;
    var last = 0;

    /* PARSE INCLUDES */

    // while((pos = html.indexOf('{{ include(', pos)) !== -1) {
    //
    //     var tmp = html.substring(pos + 11, html.indexOf(')', pos + 11));
    //     var include = fs.readFileSync('./app/' + tmp.replace(/ /g, '') + '.shtml', 'utf8');
    //
    //     html = html.replace('{{ include(' + tmp + ') }}', include);
    // }

    /* REMOVE COMMENTS HTML */

    while((pos = html.indexOf('<!--')) !== -1) {

        html = html.substring(0, pos) + html.substring(html.indexOf('-->') + 3);
    }

    /* REMOVE COMMENTS CSS */

    while((pos = html.indexOf('/*')) !== -1) {

        html = html.substring(0, pos) + html.substring(html.indexOf('*/') + 2);
    }

    pos = 0;

    /* REMOVE LINE BREAKS HTML */

    while(html.indexOf("\n ") !== -1) html = html.replace("\n ", "\n");
    while(html.indexOf("\n")  !== -1) html = html.replace("\n", ' ');
    while(html.indexOf(">  <") !== -1) html = html.replace(">  <", '><');
    while(html.indexOf("> <") !== -1) html = html.replace("> <", '><');
    while(html.indexOf("}} {{ include(") !== -1) html = html.replace("}} {{ include(", '}}{{ include(');
    while(html.indexOf("> {{") !== -1) html = html.replace("> {{", '>{{');
    while(html.indexOf("}} <") !== -1) html = html.replace("}} <", '}}<');

    /* PARSE PARAMETERS */

    while((pos = html.indexOf('{{', pos)) !== -1) {

        // parse included property
        var tmp = html.substring(pos + 2, html.indexOf('}}', pos));

        if(tmp.indexOf('if(') !== -1) {

            if(html.substring(last, pos) !== ''){

                // add static part
                data[data.length] = html.substring(last, pos);
                map[map.length] = map.length;

                if(data.length) array[array.length] = {

                    data: data,
                    map: map,
                    if: exp,
                    else: not
                };
            }

            var condition_markup = 'val.' + tmp.substring(tmp.indexOf('if(') + 3, tmp.indexOf(')')).replace(/ /g, '');
                condition_markup.replace('val.!', '!val.');

            if(html.substring(html.indexOf('}}', pos) + 2, html.indexOf('{{', html.indexOf('{{ endif }}', pos))).indexOf('{{ else }}', pos) !== -1){

                compile_view_to_array(
                    html.substring(html.indexOf('}}', pos) + 2, html.indexOf('{{', html.indexOf('{{ else }}', pos))),
                    array,
                    condition_markup.replace(/\&\&/g, '&&val.')
                                    .replace(/\|\|/g, '||val.')
                                    .replace(/val.!/g, '!val.'),
                    html.substring(html.indexOf('{{ else }}', pos) + 10, html.indexOf('{{', html.indexOf('{{ endif }}', pos)))
                );
            }
            else{

                compile_view_to_array(
                    html.substring(html.indexOf('}}', pos) + 2, html.indexOf('{{', html.indexOf('{{ endif }}', pos))),
                    array,
                    condition_markup.replace(/\&\&/g, '&&val.')
                                    .replace(/\|\|/g, '||val.')
                                    .replace(/val.!/g, '!val.')
                );
            }

            return compile_view_to_array(
                html.substring(html.indexOf('}}', html.indexOf('{{ endif }}', pos)) + 2),
                array
            );
        }
        else if(tmp.indexOf('include(') !== -1) {

            if(html.substring(last, pos) !== '') {

                // add static part
                data[data.length] = html.substring(last, pos);
                map[map.length] = map.length;

                if(data.length) array[array.length] = {

                    data: data,
                    map: map
                };
            }

            array[array.length] = {

                include: tmp.substring(tmp.indexOf('include(') + 8, tmp.indexOf(')', tmp.indexOf('include(') + 8)).replace(/ /g, '')
            };

            return compile_view_to_array(
                html.substring(html.indexOf('}}', html.indexOf('include(', pos)) + 2),
                array
            );

            // compile_view_to_array(
            //     html.substring(html.indexOf('}}', pos) + 2),
            //     array,
            //     condition_markup.replace(/\&\&/g, '&&val.')
            //                     .replace(/\|\|/g, '||val.')
            //                     .replace(/val.!/g, '!val.')
            // );
            //
            // return compile_view_to_array(
            //     html.substring(html.indexOf('}}', pos) + 2),
            //     array
            // );
        }
        else if(tmp.indexOf('for(') !== -1) {

            if(html.substring(last, pos) !== '') {

                // add static part
                data[data.length] = html.substring(last, pos);
                map[map.length] = map.length;

                if(data.length) array[array.length] = {

                    data: data,
                    map: map,
                    loop: loop
                };
            }

            compile_view_to_array(
                html.substring(html.indexOf('}}', pos) + 2, html.indexOf('{{', html.indexOf('{{ endfor }}', pos))),
                array,
                null,
                null,
                tmp.substring(tmp.indexOf('for(') + 4, tmp.indexOf(')')).replace(/ /g, '')
            );

            return compile_view_to_array(
                html.substring(html.indexOf('}}', html.indexOf('{{ endfor }}', pos)) + 2),
                array
            );
        }
        else {

            // add static part
            data[data.length] = html.substring(last, pos);
            // add empty field for the data
            data[data.length] = '';

            // add index for un-used fields of the map
            map[map.length] = map.length;
            // add property to the mappings
            map[map.length] = tmp.replace(/ /g, '');
        }

        // update pointer to the last part
        //last = html.indexOf('}}', pos) + 2;
        last = pos;

        html = html.replace('{{' + tmp + '}}', '');

        if(html.indexOf('{{', pos) === -1) {

            // add static part
            data[data.length] = html.substring(last);
            map[map.length] = map.length;
        }
    }

    if(array.length && data.length === 0){

        data[data.length] = html.substring(last);
        map[map.length] = map.length;
    }
    else if(array.length === 0 && data.length === 0){

        data = [html];
        map = [''];
    }

    if(loop) {

        if(data.length) array[array.length] = {

            data: data,
            map: map,
            loop: loop
        };
    }
    else {

        if(data.length) array[array.length] = {

            data: data,
            map: map,
            if: exp,
            else: not
        };
    }

    /* SIMPLE CHECK IF JSON IS VALID */

    JSON.parse(JSON.stringify(array));

    return array;
}

// sync version
function walkSync(dir, filetype, callback) {

    if(fs.existsSync(dir)) fs.readdirSync(dir).forEach(function(name) {

        var filePath = path.join(dir, name);
        var stat = fs.statSync(filePath);

        if(stat.isFile()) {

            if(filePath.indexOf(filetype) === filePath.length - filetype.length) {

                callback(filePath, stat);
            }
        }
        else if(stat.isDirectory()) {

            walkSync(filePath, filetype, callback);
        }
    });
}

// async version with basic error handling
function walkAsync(currentDirPath, filetype, callback) {

    fs.readdir(currentDirPath, function(err, files) {

        if(err) throw new Error(err);

        files.forEach(function(name) {

            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);

            if(stat.isFile()) {

                if(filePath.indexOf(filetype) === filePath.length - filetype.length) {

                    callback(filePath, stat);
                }
            }
            else if(stat.isDirectory()) {

                walkAsync(filePath, filetype, callback);
            }
        });
    });
}

var status = true;
var views = {};

walkSync('./app/view/', '.shtml', function(filePath){

    if((filePath.indexOf('app/view/app/') === 0) || (filePath.indexOf('app\\view\\app\\') === 0)) return;

    var html = fs.readFileSync(filePath, 'utf8');

    var template = compile_view_to_array(html);

    views[filePath.replace('app/', '').replace('app\\', '').replace('.shtml', '').replace(/\\/g, '/')] = template;

    /* EXPO */

    //fs.writeFileSync(filePath.replace('.shtml', '.json'), JSON.stringify(template), 'utf8');

    //status = compile_view_to_json(filePath);
    //status = compile_view_to_array(filePath);
});

/* EXPO */
if(status){

    var output = JSON.stringify(views).replace(/"data":/g, 'data:').replace(/"map":/g, 'map:').replace(/"if":/g, 'if:').replace(/"else":/g, 'else:').replace(/"include":/g, 'include:');

    lib.buildFolders('app/tmp/');
    fs.writeFileSync('app/tmp/view.js', "/* AUTO GENERATED SCRIPT (DO NOT MODIFY) */\ngoog.provide('APP.TEMPLATE');\nAPP.TEMPLATE = " + output + ";\n", 'utf8');
}

console.log(

    status ?

        "Views Complete."
    :
        "Error on building views!"
);

status = true;
views = {};

walkSync('./app/view/app/', '.shtml', function(filePath){

    var html = fs.readFileSync(filePath, 'utf8');

    if((html.indexOf('<xone-view') !== -1) && (html.indexOf('<xone-view') === html.lastIndexOf('<xone-view'))){

        var tmp = html.substring(

            html.indexOf('<xone-view'),
            html.indexOf('>', html.indexOf('<xone-view'))
        );

        if((tmp.indexOf(' id=') === -1) && (tmp.indexOf(' id =') === -1)){

            var id = filePath.replace('app\\view\\app\\', '')
                             .replace('app/view/app/', '')
                             .replace('/', '-')
                             .replace('\\', '-')
                             .replace('.shtml', '');

            html = html.replace('<xone-view', '<xone-view id="' + id + '"');
        }
    }

    var template = compile_view_to_array(html);

    views[filePath.replace('app/', '').replace('app\\', '').replace('.shtml', '').replace(/\\/g, '/')] = template;

    /* EXPO */

    //fs.writeFileSync(filePath.replace('.shtml', '.json'), JSON.stringify(template), 'utf8');

    //status = compile_view_to_json(filePath);
    //status = compile_view_to_array(filePath);
});

/* EXPO */
if(status){

    var output = JSON.stringify(views).replace(/"data":/g, 'data:').replace(/"map":/g, 'map:').replace(/"if":/g, 'if:').replace(/"else":/g, 'else:').replace(/"include":/g, 'include:');

    lib.buildFolders('app/tmp');
    fs.writeFileSync('app/tmp/layout.js', "/* AUTO GENERATED SCRIPT (DO NOT MODIFY) */\ngoog.provide('APP.HTML');\nAPP.HTML = " + output + ";\nAPP.CONFIG.LAYOUT = " + JSON.stringify(Object.keys(views)) + ";\n", 'utf8');
}

console.log(

    status ?

        "Layout Complete."
    :
        "Error on building layout!"
);

var xone_manifest = lib.loadJSON('app/manifest.js', 'MANIFEST');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var path_to_lessc = lib.getModule('less');

if(fs.existsSync("app/css/build.less")) {

    lib.exec((

        //'node "' + path.resolve(path_to_lessc, 'node_modules/clean-css/bin/cleancss') + '" app/css/build.less --clean-css="-s1 --advanced --rebase" app/css/build.css'
        'node "' + path.resolve(path_to_lessc, 'bin/lessc') + '" --clean-css="--s1 --advanced --rebase" app/css/build.less app/css/build.css' //--autoprefix

    ), function(){

        fs.writeFileSync('app/css/build.css', "/* AUTO GENERATED SCRIPT (DO NOT MODIFY) */\n" + fs.readFileSync('app/css/build.css', 'utf8'), 'utf8');
    });
}
else{

    var less = [];

    less.push('@import "../' + xone_manifest.dependencies.xone + 'css/config.less";');
    less.push('@import "../' + xone_manifest.dependencies.xone + 'css/reset.less";');
    less.push('@import "../' + xone_manifest.dependencies.xone + 'css/xone.less";');
    less.push('@import "../' + xone_manifest.dependencies.xone + 'css/animate.less";');
    less.push('@import "../' + xone_manifest.dependencies.xone + 'css/checkbox.less";');
    less.push('@import "../' + xone_manifest.dependencies.xone + 'css/control.less";');

    walkSync('./app/css/', '.less', function(filePath){

        less.push('@import "' + filePath.replace(/\\/g, '/').replace('app/', '../') + '";');
    });

    walkSync('./app/view/', '.less', function(filePath){

        less.push('@import "' + filePath.replace(/\\/g, '/').replace('app/', '../') + '";');
    });

    fs.writeFileSync('app/tmp/build.less', less.join('\n'), 'utf8');

    lib.exec((

        //'node "' + path.resolve(path_to_lessc, 'node_modules/clean-css/bin/cleancss') + '" app/css/build.less --clean-css="-s1 --advanced --rebase" app/css/build.css'
        'node "' + path.resolve(path_to_lessc, 'bin/lessc') + '" --clean-css="--s1 --advanced --rebase" app/tmp/build.less app/css/build.css' //--autoprefix

    ), function(){

        fs.writeFileSync('app/css/build.css', "/* AUTO GENERATED SCRIPT (DO NOT MODIFY) */\n" + fs.readFileSync('app/css/build.css', 'utf8'), 'utf8');
    });

    console.log("Styles Complete.\n");
}

if(xone_manifest.dependencies.calculate){

    lib.exec('node "' + __dirname + '/deps" --silent');
}
