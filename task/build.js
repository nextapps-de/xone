#!/usr/bin/env node

/**
 * Example:
 * xone build
 * xone build <platform>
 * xone build bundle
 * xone build lib
 * xone build lib min
 */

var platform = process.argv[2];
var parameter = process.argv[3];
var build_path = process.argv[4];

var fs = require('fs');
var path = require('path');
var lib = require('./lib.js');

var compress = false;

if(platform) {

    if(platform === 'www') {

        build_path = false;
    }
    else if(platform === 'bundle' || platform === 'lib'){

        if(parameter === 'min'){

            compress = (platform !== 'bundle');
        }
        else{

            build_path = parameter;
        }

        parameter = platform;
        platform = false;
    }
    else if(!lib.checkPlatform(platform)) {

        return;
    }
}

var target_platform = platform || 'www';

switch(parameter){

    case 'bundle':
    case 'lib':
        break;

    case 'debug':
    case '--debug':
        break;

    case 'release':
    case '--release':
        break;

    case void 0:
        break;

    default:
        build_path = parameter;
        break;
}

var enum_compilation_level = {

    'simple': 'SIMPLE_OPTIMIZATIONS',
    'whitespace': 'WHITESPACE_ONLY',
    'advanced': 'ADVANCED_OPTIMIZATIONS',
    'none': 'NONE'
};

if(fs.existsSync(__dirname + '/build.js')){

    lib.exec('node "' + __dirname + '/compile" ' + (platform || ''), function(){

        console.log("Start Build...");
        console.log("-----------------------------------------------------");

        var xone_config = lib.loadJSON('xone.json');
        var xone_manifest = lib.loadJSON('app/manifest.js', 'MANIFEST');
        xone_manifest.dependencies.xone = './app/' + xone_manifest.dependencies.xone;
        var node_config = lib.loadJSON(xone_manifest.dependencies.xone + 'package.json');
        var dependencies = xone_manifest.dependencies.calculate ? lib.loadJSON('app/tmp/deps.js', 'DEPS') : [];
        var compiler_options = xone_config.closure_compiler_js.options;

        compiler_options.jsCode || (compiler_options.jsCode = []);

        xone_config.closure_compiler_jar.options.js = [

            // "'!**_test.js'",
            // "'!**_perf.js'",
            // "'!**_spec.js'",
            // "'!**/app/js/build.js'",
            // "'!**/xone/core/loader.js'"
        ];

        xone_config.closure_compiler_jar.options.js_output_file = "tmp/build_tmp.js";

        if(!fs.existsSync('tmp/')){

            fs.mkdirSync('tmp/');
        }

        if(!fs.existsSync('log/')){

            fs.mkdirSync('log/');
        }

        fs.writeFileSync('tmp/platform.js', "goog.provide('PLATFORM'); /** @define {string} */ var PLATFORM = '" + (platform || '') + "';", 'utf8');

        if(parameter === 'bundle' || parameter === 'lib'){

            if(parameter === 'bundle') {

                xone_config.closure_compiler_jar.options.output_wrapper = "%output%";
                compiler_options.outputWrapper = "%output%";

                xone_config.closure_compiler_jar.options.compilation_level = "WHITESPACE_ONLY";
                compiler_options.compilationLevel = "WHITESPACE_ONLY";
            }
            else{

                xone_config.closure_compiler_jar.options.compilation_level = enum_compilation_level[xone_config.closure_compiler_jar.options.compilation_level || xone_config.closure_compiler_level || 'none'];
                compiler_options.compilationLevel = enum_compilation_level[xone_config.closure_compiler_js.options.compilationLevel || xone_config.closure_compiler_level || 'none'];
            }

            if(parameter === 'bundle' || !compress) {

                xone_config.closure_compiler_jar.options.preserve_type_annotations = true;
                compiler_options.preserveTypeAnnotations = true;
            }

            if(!compress){

                xone_config.closure_compiler_jar.options.formatting = "PRETTY_PRINT";
                //compiler_options.formatting = "PRETTY_PRINT";
            }

            xone_config.closure_compiler_jar.options.js.push("'app/../tmp/platform.js'");
            compiler_options.jsCode.push({path: "app/../tmp/platform.js"});

            if(parameter === 'lib'){

                //xone_config.closure_compiler_jar.options.js.push("'!**/lib/xone/core/interface.js'");
                xone_config.closure_compiler_jar.options.js.push("'" + xone_manifest.dependencies.xone + "build/interface.js'");
                compiler_options.jsCode.push({path: xone_manifest.dependencies.xone + "build/interface.js"});
            }
            else{

                //xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/core/interface.js'");
                //compiler_options.jsCode.push({path: "app/lib/xone/core/interface.js"});
            }

            xone_config.closure_compiler_jar.options.js.push("'" + xone_manifest.dependencies.xone + "build/config.js'");
            compiler_options.jsCode.push({path: xone_manifest.dependencies.xone + "build/config.js"});

            xone_config.closure_compiler_jar.options.js.push("'" + xone_manifest.dependencies.xone + "lib/amd.js'");
            compiler_options.jsCode.push({path: xone_manifest.dependencies.xone + "lib/amd.js"});

            // if(xone_manifest.dependencies.calculate){
            //
            //     xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/build/env.js'");
            //     compiler_options.jsCode.push({path: "app/lib/xone/build/env.js"});
            // }
        }
        else{

            xone_config.closure_compiler_jar.options.compilation_level = enum_compilation_level[xone_config.closure_compiler_level];
            compiler_options.compilationLevel = enum_compilation_level[xone_config.closure_compiler_level];

            xone_config.closure_compiler_jar.options.js.unshift("'app/../tmp/platform.js'");
            compiler_options.jsCode.unshift({path: "app/../tmp/platform.js"});
            if(xone_manifest.dependencies.calculate) dependencies.unshift("../" + xone_manifest.dependencies.xone + "build/env.js");
            dependencies.unshift("../tmp/platform.js");

            //todo move special config in seperate file
            var config_contents = "";
            var config_default_contents = "";
            var app_config = {};
            var app_default_config = {};
            var tmp_str = (

                "goog.provide('CONFIG');\n" +
                "/**\n" +
                " * The main config descriptor\n" +
                " * @struct\n" +
                " * @name CONFIG\n" +
                " * @namespace CONFIG Application\n" +
                " * @const\n" +
                " */\n" +
                "var CONFIG = {};\n"
            );

            if(fs.existsSync("app/platform/" + target_platform + "/config/production.js")){

                config_contents = fs.readFileSync("app/platform/" + target_platform + "/config/production.js", 'utf8');
                config_default_contents = fs.readFileSync(xone_manifest.dependencies.xone + 'build/config.js', 'utf8');

                eval('var PLATFORM = "' + target_platform + '";' + config_contents.substring(config_contents.indexOf('var CONFIG')));
                app_config = CONFIG;
            }
            else if(fs.existsSync("app/config/production.js")){

                config_contents = fs.readFileSync('app/config/production.js', 'utf8');
                config_default_contents = fs.readFileSync(xone_manifest.dependencies.xone + 'build/config.js', 'utf8');

                eval('var PLATFORM = "' + target_platform + '";' + config_contents.substring(config_contents.indexOf('var CONFIG')));
                app_config = CONFIG;
            }
            else{

                // //xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/core/interface.js'");
                // xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/build/config.js'");
                // //compiler_options.jsCode.push({path: "app/lib/xone/core/interface.js"});
                // compiler_options.jsCode.push({path: "app/lib/xone/build/config.js"});
                // dependencies.unshift("lib/xone/build/config.js");

                //config_contents = fs.readFileSync(xone_manifest.dependencies.xone + 'build/config.js', 'utf8');
                config_default_contents = fs.readFileSync(xone_manifest.dependencies.xone + 'build/config.js', 'utf8');
            }

            eval('var PLATFORM = "' + target_platform + '";' + config_default_contents.substring(config_default_contents.indexOf('var CONFIG')));
            app_default_config = CONFIG;

            for(var key in app_default_config){

                if(app_default_config.hasOwnProperty(key)){

                    if(typeof app_config[key] === "undefined"){

                        if(xone_manifest.config && (typeof xone_manifest.config[key] !== "undefined")){

                            app_config[key] = xone_manifest.config[key];
                        }
                        else{

                            app_config[key] = app_default_config[key];
                        }
                    }
                }
            }

            for(var key in app_config){

                if(app_config.hasOwnProperty(key)){

                    switch(typeof app_config[key]){

                        case "boolean":
                            tmp_str += "/** @define {boolean} */ CONFIG." + key.toUpperCase() + " = " + (app_config[key] ? "true" : "false") + ";\n";
                            break;

                        case "number":
                            tmp_str += "/** @define {number} */ CONFIG." + key.toUpperCase() + " = " + app_config[key] + ";\n";
                            break;

                        case "string":
                            tmp_str += "/** @define {string} */ CONFIG." + key.toUpperCase() + " = \"" + app_config[key].replace(/\n/g, "\\n") + "\";\n";
                            break;
                    }
                }
            }

            fs.writeFileSync('tmp/config.js', tmp_str, 'utf8');

            xone_config.closure_compiler_jar.options.js.push("'app/../tmp/config.js'");
            compiler_options.jsCode.push({path: "app/../tmp/config.js"});
            dependencies.unshift("../tmp/config.js");
        }

        // xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/core/**.js'");
        // xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/lib/**.js'");
        // xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/plugin/**.js'");

        var xone_dependencies = [

            //xone_manifest.dependencies.xone +'lib/amd.js',
            xone_manifest.dependencies.xone +'core/polyfill.js',
            xone_manifest.dependencies.xone +'interface/ajax.js',
            xone_manifest.dependencies.xone +'interface/event.js',
            xone_manifest.dependencies.xone +'interface/model.js',
            xone_manifest.dependencies.xone +'interface/pattern.js',
            xone_manifest.dependencies.xone +'interface/route.js',
            xone_manifest.dependencies.xone +'interface/storage.js',
            xone_manifest.dependencies.xone +'interface/template.js',
            xone_manifest.dependencies.xone +'interface/view.js',
            xone_manifest.dependencies.xone +'core/interface.js',
            xone_manifest.dependencies.xone +'build/env.js',
            xone_manifest.dependencies.xone +'lib/graph.js',
            xone_manifest.dependencies.xone +'core/core.js',
            xone_manifest.dependencies.xone +'core/app.js',
            xone_manifest.dependencies.xone +'lib/debug.js',
            xone_manifest.dependencies.xone +'lib/paint.js',
            xone_manifest.dependencies.xone +'lib/animate.js',
            xone_manifest.dependencies.xone +'lib/event.js',
            xone_manifest.dependencies.xone +'lib/retina.js',
            xone_manifest.dependencies.xone +'lib/compress.js',
            xone_manifest.dependencies.xone +'lib/storage.js',
            xone_manifest.dependencies.xone +'core/model.js',
            xone_manifest.dependencies.xone +'core/controller.js',
            xone_manifest.dependencies.xone +'lib/layout.js',
            xone_manifest.dependencies.xone +'lib/viewport.js',
            xone_manifest.dependencies.xone +'lib/worker.js',
            xone_manifest.dependencies.xone +'lib/validate.js',
            'app/tmp/layout.js',
            'app/tmp/view.js'
        ];

        xone_config.closure_compiler_jar.options.js = xone_config.closure_compiler_jar.options.js.concat(

            xone_dependencies.map(function(value){

                return "'" + path.normalize(value) + "'";
            })
        );

        compiler_options.jsCode = compiler_options.jsCode.concat(

            xone_dependencies.map(function(value){

                return {

                    path: path.normalize(value)
                };
            })
        );

        if(parameter === 'bundle' || parameter === 'lib'){

            xone_config.closure_compiler_jar.options.js.push("'" + xone_manifest.dependencies.xone + "build/require.js'");
            compiler_options.jsCode.push({path: xone_manifest.dependencies.xone + "build/require.js"});
            dependencies.push(xone_manifest.dependencies.xone + "build/require.js");

            if(parameter === 'lib'){

                xone_config.closure_compiler_jar.options.js.push("'" + xone_manifest.dependencies.xone + "build/app.js'");
                compiler_options.jsCode.push({path: xone_manifest.dependencies.xone + "build/app.js"});

                xone_config.closure_compiler_jar.options.js.push("'" + xone_manifest.dependencies.xone + "build/core.js'");
                compiler_options.jsCode.push({path: xone_manifest.dependencies.xone + "build/core.js"});
            }
        }
        else{

            for(var i = 0; i < xone_manifest.dependencies.js.length; i++){

                xone_config.closure_compiler_jar.options.js.push("'app/" + xone_manifest.dependencies.js[i] + "'");
                compiler_options.jsCode.push({path: "app/" + xone_manifest.dependencies.js[i]});
            }

            if(platform && fs.existsSync("app/platform/" + platform + "/js/")){

                var platform_js = lib.getFiles("app/platform/" + platform + "/js/", 'js');

                for(var i = 0; i < platform_js.length; i++){

                    xone_config.closure_compiler_jar.options.js.push("'app/" + platform_js[i] + "'");
                    compiler_options.jsCode.push({path: "app/" + platform_js[i]});
                }
            }
        }

        var build_callback_success = function(){

            var compiled_code;

            if(parameter === 'bundle' || (parameter === 'lib' && !compress)){

                compiled_code = fs.readFileSync('tmp/build_tmp.js', 'utf8');

                while(compiled_code.indexOf('goog.require(') !== -1){

                    compiled_code = (

                        compiled_code.substring(0, compiled_code.indexOf('goog.require(')) +
                        compiled_code.substring(compiled_code.indexOf(');', compiled_code.indexOf('goog.require(')) + 2)
                    );
                }

                while(compiled_code.indexOf('goog.provide(') !== -1){

                    compiled_code = (

                        compiled_code.substring(0, compiled_code.indexOf('goog.provide(')) +
                        compiled_code.substring(compiled_code.indexOf(');', compiled_code.indexOf('goog.provide(')) + 2)
                    );
                }

                if(parameter === 'lib') compiled_code = compiled_code.substring(0, compiled_code.indexOf(';', compiled_code.lastIndexOf('@define')) + 1) + '\n\n(function(){' + compiled_code.substring(compiled_code.indexOf(';', compiled_code.lastIndexOf('@define')) + 1) + '}).call(this);';

                fs.writeFileSync('tmp/build_tmp.js', compiled_code, 'utf8');
            }

            // if(!compress){
            //     var beautify = require('js-beautify').js_beautify;
            //     var data = fs.readFileSync('tmp/build_tmp.js', 'utf8');
            //     fs.writeFileSync('tmp/build_tmp.js', beautify(data, {
            //         indent_size: 4
            //     }), 'utf8');
            // }

            lib.buildFolders('public/' + target_platform + '/js');

            var compiled_file;

            if(parameter === 'bundle'){

                lib.copyFileSync('tmp/build_tmp.js', compiled_file = (build_path ? build_path + 'xone.bundle' + (compress ? '.min' : '') + '.js' : xone_manifest.dependencies.xone + 'dist/xone.bundle' + (compress ? '.min' : '') + '.js'), true);
            }
            else if(parameter === 'lib'){

                lib.copyFileSync('tmp/build_tmp.js', compiled_file = (build_path ? build_path + 'xone.lib' + (compress ? '.min' : '') + '.js' : xone_manifest.dependencies.xone + 'dist/xone.lib' + (compress ? '.min' : '') + '.js'), true);
            }
            else{

                lib.copyFileSync(xone_manifest.dependencies.js_extern.map(function(value){

                    return path.resolve("app", value);

                }).concat(['tmp/build_tmp.js']), compiled_file = ('public/' + target_platform + '/js/build.js'), true);
            }

            compiled_code = fs.readFileSync(compiled_file, 'utf8');

            compiled_code = (

                    "/**!\n" +
                    " * " + (parameter === 'bundle' ? '@preserve ' : '') + "Xone Javascript Framework (" + (parameter || 'Build') + ")\n" +
                    " * @version " + (node_config.version) +  "\n" +
                    " * @build " + lib.crc32(compiled_code) + "/" + ((new Date()).getTime() + "").substring(1, 10) + "\n" +
                    " * @author Thomas Wilkerling\n" +
                    " * @license Apache-2.0\n" +
                    " * @link https://www.npmjs.com/package/xone\n" +
                    " * @link https://github.com/nextapps-de/xone\n" +
                    " * @tutorial https://nextapps-de.github.io/xone/\n" +
                    " */\n"

                ) + compiled_code;

            var pos;

            if((pos = compiled_code.indexOf('/*', 1)) > 0){

                if((compiled_code[pos] !== ' ') && (compiled_code[pos] !== '\n')){

                    compiled_code = compiled_code.substring(0, pos) + "\n" + compiled_code.substring(pos);
                }
            }

            fs.writeFileSync(compiled_file, compiled_code, 'utf8');
        };

        // closure-compiler-js:
        if(xone_config.closure_compiler_lib === 'js'){

            //compiler_options.externs = xone_manifest.dependencies.js_extern;

            if(xone_manifest.dependencies.calculate && (parameter !== 'bundle') && (parameter !== 'lib')){

                compiler_options.jsCode = dependencies.map(function(value){

                    return {

                        path: path.normalize("app/"+ value)
                    };
                });
            }

            // xone injection
            compiler_options.jsCode.push({path: path.resolve(xone_manifest.dependencies.xone + "core/init.js")});

            var tmp_code = "";

            for(var a = 0; a < compiler_options.jsCode.length; a++){

                if(fs.existsSync(path.normalize(compiler_options.jsCode[a].path))) tmp_code += (compiler_options.jsCode[a].src = fs.readFileSync(path.normalize(compiler_options.jsCode[a].path), 'utf8'));
            }

            var path_to_closure_compiler = fs.existsSync(xone_config.closure_compiler_js.path) ? xone_config.closure_compiler_js.path : lib.getModule('google-closure-compiler-js');

            var compile = require(path_to_closure_compiler).compile;
            var out = compile(compiler_options);

            fs.writeFileSync('tmp/build_tmp.js', out.compiledCode, 'utf8');

            var ratio = 100 - (100 / Buffer.byteLength(tmp_code, 'utf8') * /*fs.statSync('tmp/build_tmp.js').size*/ Buffer.byteLength(out.compiledCode, 'utf8'));

            console.log(out.errors.length + " error(s), " + out.warnings.length + " warning(s), " + (((ratio * 10) | 0) / 10) + "% typed");

            //console.info(out.compiledCode);
            if(out.errors.length) console.info(out.errors);
            if(out.warnings.length) console.info(out.warnings);

            build_callback_success();
        }

        // closure-compiler-jar:
        else if(xone_config.closure_compiler_lib === 'jar'){

            /*
             xone_config.closure_compiler_jar.options.externs = xone_manifest.dependencies.js_extern.map(function(value){

             return "'app/" + value + "'";
             });
             */

            if(xone_manifest.dependencies.calculate && (parameter !== 'bundle') && (parameter !== 'lib')){

                xone_config.closure_compiler_jar.options.js = dependencies.map(function(value){

                    return "'" + path.normalize("app/" + value) + "'";
                });
            }

            // xone injection
            xone_config.closure_compiler_jar.options.js.push("'" + xone_manifest.dependencies.xone + "core/init.js'");

            var config_parameters = "";

            for(var key in xone_config.closure_compiler_jar.options){

                if(xone_config.closure_compiler_jar.options.hasOwnProperty(key)){

                    if(xone_config.closure_compiler_jar.options[key].constructor === Array){

                        for(var i = 0; i < xone_config.closure_compiler_jar.options[key].length; i++){

                            config_parameters += ' --' + key + '=' + xone_config.closure_compiler_jar.options[key][i];
                        }
                    }
                    else{

                        config_parameters += ' --' + key + '=' + xone_config.closure_compiler_jar.options[key];
                    }
                }
            }

            var path_to_closure_compiler = fs.existsSync(xone_config.closure_compiler_jar.path) ? xone_config.closure_compiler_jar.path : lib.getModule('google-closure-compiler');

            lib.exec('java -jar ' + /*-Xms128m -Xmx4096m*/ '"' + path_to_closure_compiler + '/compiler.jar' + '"' + config_parameters + "", build_callback_success);
        }

        if(parameter !== 'bundle' && parameter !== 'lib'){

            var css = [

                //'app/lib/xone/css/reset.css',
                //'app/lib/xone/css/xone.css',
                //'app/css/build.css'
            ];

            xone_manifest.dependencies.css || (xone_manifest.dependencies.css = []);
            xone_manifest.dependencies.css.push("." + xone_manifest.dependencies.xone + 'css/xone.css');
            xone_manifest.dependencies.css.push('css/style.css');
            xone_manifest.dependencies.css.push('css/build.css');

            css = xone_manifest.dependencies.css;

            css = css.map(function(value){

                return path.resolve("./app/", value);
            });

            if(platform && fs.existsSync("app/platform/" + platform + "/css/")){

                var platform_css = lib.getFiles("app/platform/" + platform + "/css/", 'css');

                for(var i = 0; i < platform_css.length; i++){

                    css.push(platform_css[i]);
                }
            }

            var path_to_csso = lib.getModule('csso');

            if(path_to_csso){

                lib.copyFileSync(css, 'tmp/style_tmp.css', true);

                var result = require(path_to_csso).minify(fs.readFileSync('tmp/style_tmp.css', 'utf8'), {

                    restructure: true,
                    debug: false // 1, 2, 3
                });

                lib.buildFolders('public/' + target_platform + '/css');
                fs.writeFileSync('public/' + target_platform + '/css/style.css', result.css, 'utf8');

                // yuicompressor:
                // lib.exec('java -jar "' + xone_config.yui_compressor_path + 'build/yuicompressor-2.4.8.jar" -o tmp/style_tmp.css tmp/style_tmp.css -v --type css ' + xone_config.yui_compressor_options.join(' '), function(){
                //     lib.copyFileSync('tmp/style_tmp.css', 'public/' + target_platform + '/css/style.css', true);
                // });

                lib.exec('node "' + __dirname + '/refresh.js" ' + (platform || ''));
            }
        }

        console.log("Build Complete.\n");
    });
}
else{

    console.log("The current directory is not a valid xone project.");
}
