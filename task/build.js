#!/usr/bin/env node

/**
 * Example:
 * app build android debug
 * app build dist min ./folder/
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

            compress = true;
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
        //var app_config = lib.loadJSON('app/config/app.js', 'APP_CONFIG');
        var xone_manifest = lib.loadJSON('app/manifest.js', 'MANIFEST');

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

        if(parameter === 'bundle' || parameter === 'lib'){

            if(parameter === 'bundle'){

                xone_config.closure_compiler_jar.options.compilation_level = "WHITESPACE_ONLY";
                compiler_options.compilationLevel = "WHITESPACE_ONLY";

                if(parameter === 'bundle') {

                    xone_config.closure_compiler_jar.options.output_wrapper = "%output%";
                    compiler_options.outputWrapper = "%output%";
                }
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

            if(parameter === 'lib'){

                //xone_config.closure_compiler_jar.options.js.push("'!**/lib/xone/core/interface.js'");
                xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/build/interface.js'");
                compiler_options.jsCode.push({path: "app/lib/xone/build/interface.js"});
            }
            else{

                xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/core/interface.js'");
                compiler_options.jsCode.push({path: "app/lib/xone/core/interface.js"});
            }

            xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/build/config.js'");
            compiler_options.jsCode.push({path: "app/lib/xone/build/config.js"});
        }
        else{

            xone_config.closure_compiler_jar.options.compilation_level = enum_compilation_level[xone_config.closure_compiler_level];
            compiler_options.compilationLevel = enum_compilation_level[xone_config.closure_compiler_level];

            fs.writeFileSync('tmp/config.js', "goog.provide('PLATFORM'); /** @define {string} */ var PLATFORM = '" + (platform || '') + "';", 'utf8');

            xone_config.closure_compiler_jar.options.js.unshift("'tmp/config.js'");
            compiler_options.jsCode.unshift({path: "tmp/config.js"});

            xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/core/interface.js'");
            xone_config.closure_compiler_jar.options.js.push("'app/config/production.js'");
            compiler_options.jsCode.push({path: "app/lib/xone/core/interface.js"});
            compiler_options.jsCode.push({path: "app/config/production.js"});
        }

        // xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/core/**.js'");
        // xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/lib/**.js'");
        // xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/plugin/**.js'");

        var xone_dependencies = [

            /*app_config.XONE_PATH +*/ 'lib/xone/core/polyfill.js',
            ///*app_config.XONE_PATH +*/ 'lib/xone/core/interface.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/core/env.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/graph.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/core/core.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/core/app.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/debug.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/paint.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/event.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/retina.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/compress.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/storage.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/core/model.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/core/controller.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/layout.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/viewport.js',
            /*app_config.XONE_PATH +*/ 'lib/xone/lib/worker.js'
        ];

        xone_config.closure_compiler_jar.options.js = xone_config.closure_compiler_jar.options.js.concat(

            xone_dependencies.map(function(value){

                return "'app/" + value + "'";
            })
        );

        compiler_options.jsCode = compiler_options.jsCode.concat(

            xone_dependencies.map(function(value){

                return {

                    path: "app/" + value
                };
            })
        );

        if(parameter === 'bundle' || parameter === 'lib'){

            if(parameter === 'lib'){

                xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/build/app.js'");
                compiler_options.jsCode.push({path: "app/lib/xone/build/app.js"});

                xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/build/core.js'");
                compiler_options.jsCode.push({path: "app/lib/xone/build/core.js"});
            }
        }
        else{

            for(var i = 0; i < xone_manifest.dependencies.js.length; i++){

                xone_config.closure_compiler_jar.options.js.push("'app/" + xone_manifest.dependencies.js[i] + "'");
                compiler_options.jsCode.push({path: "app/" + xone_manifest.dependencies.js[i]});
            }
        }

        if(platform && fs.existsSync("app/platform/" + platform + "/js/")){

            var platform_js = lib.getFiles("app/platform/" + platform + "/js/", 'js');

            for(var i = 0; i < platform_js.length; i++){

                xone_config.closure_compiler_jar.options.js.push("'" + platform_js[i] + "'");
                compiler_options.jsCode.push({path: platform_js[i]});
            }
        }

        var build_callback_success = function(){

            if(parameter === 'bundle' || (parameter === 'lib' && !compress)){

                var compiled_code = fs.readFileSync('tmp/build_tmp.js', 'utf8');

                if(parameter === 'bundle'){

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

                    compiled_code = compiled_code.substring(0, compiled_code.indexOf(';', compiled_code.lastIndexOf('@define')) + 1) + '\n\n(function(){' + compiled_code.substring(compiled_code.indexOf(';', compiled_code.lastIndexOf('@define')) + 1) + '}).call(this);';
                }

                compiled_code = (

                    "/**!\n" +
                    " * @preserve Xone Javascript Framework\n" +
                    " * Copyright (c) 2017 NextApps, All rights reserved.\n" +
                    " */\n"

                ) + compiled_code;

                fs.writeFileSync('tmp/build_tmp.js', compiled_code, 'utf8');
            }

            if(!fs.existsSync('bin/' + target_platform + '/js')){

                fs.mkdirSync('bin/' + target_platform + '/js');
            }

            if(parameter === 'bundle'){

                lib.copyFileSync('tmp/build_tmp.js', build_path ? build_path + 'xone.bundle' + (compress ? '.min' : '') + '.js' : 'app/lib/xone/dist/xone.bundle' + (compress ? '.min' : '') + '.js', true);
            }
            else if(parameter === 'lib'){

                lib.copyFileSync('tmp/build_tmp.js', build_path ? build_path + 'xone.lib' + (compress ? '.min' : '') + '.js' : 'app/lib/xone/dist/xone.lib' + (compress ? '.min' : '') + '.js', true);
            }
            else{

                lib.copyFileSync(xone_manifest.dependencies.js_extern.map(function(value){

                    return 'app/' + value;

                }).concat(['tmp/build_tmp.js']), 'bin/' + target_platform + '/js/build.js', true);
            }
        };

        // closure-compiler-js:
        if(xone_config.closure_compiler_lib === 'js'){

            compiler_options.externs = xone_manifest.dependencies.js_extern;

            // xone injection
            compiler_options.jsCode.push({path: "app/lib/xone/lib/validate.js"});
            compiler_options.jsCode.push({path: "app/lib/xone/core/init.js"});

            var tmp_code = "";

            for(var a = 0; a < compiler_options.jsCode.length; a++){

                tmp_code += (compiler_options.jsCode[a].src = fs.readFileSync(path.normalize(compiler_options.jsCode[a].path), 'utf8'));
            }

            var compile = require(path.normalize(xone_config.closure_compiler_js.path)).compile;
            var out = compile(compiler_options);

            fs.writeFileSync('tmp/build_tmp.js', out.compiledCode, 'utf8');

            var ratio = 100 - (100 / Buffer.byteLength(tmp_code, 'utf8') * /*fs.statSync('tmp/build_tmp.js').size*/ Buffer.byteLength(out.compiledCode, 'utf8'));

            console.log(out.errors.length + " error(s), " + out.warnings.length + " warning(s), " + (((ratio * 10) | 0) / 10) + "% typed");

            //console.info(out.compiledCode);
            if(out.errors.length) console.info("\n" + out.errors);
            if(out.warnings.length) console.info("\n" + out.warnings);

            build_callback_success();
        }

        // closure-compiler-jar:
        else if(xone_config.closure_compiler_lib === 'jar'){

            /*
            xone_config.closure_compiler_jar.options.externs = xone_manifest.dependencies.js_extern.map(function(value){

                return "'app/" + value + "'";
            });
            */

            // xone injection
            xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/lib/validate.js'");
            xone_config.closure_compiler_jar.options.js.push("'app/lib/xone/core/init.js'");

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

            lib.exec('java -jar "' + xone_config.closure_compiler_jar.path + '/compiler.jar"' + config_parameters, build_callback_success);
        }

        if(parameter !== 'bundle' && parameter !== 'lib'){

            var css = [

                'app/lib/xone/css/reset.css',
                'app/lib/xone/css/xone.css',
                'app/css/build.css'
            ];

            if(platform && fs.existsSync("app/platform/" + platform + "/css/")){

                var platform_css = lib.getFiles("app/platform/" + platform + "/css/", 'css');

                for(var i = 0; i < platform_css.length; i++){

                    css.push(platform_css[i]);
                }
            }

            var path_to_csso;

            if(fs.existsSync(path.resolve(xone_config.node_modules_path, 'csso'))){

                path_to_csso = path.resolve(xone_config.node_modules_path, 'csso');
            }
            else{

                path_to_csso = path.resolve(xone_config.node_modules_path, '..', '..', 'csso');
            }

            lib.copyFileSync(css, 'tmp/style_tmp.css', true);

            var result = require(path_to_csso).minify(fs.readFileSync('tmp/style_tmp.css', 'utf8'), {

                restructure: true,
                debug: false // 1, 2, 3
            });

            if(!fs.existsSync('bin/' + target_platform + '/css')){

                fs.mkdirSync('bin/' + target_platform + '/css');
            }

            fs.writeFileSync('bin/' + target_platform + '/css/style.css', result.css, 'utf8');

            // yuicompressor:
            // lib.exec('java -jar "' + xone_config.yui_compressor_path + 'build/yuicompressor-2.4.8.jar" -o tmp/style_tmp.css tmp/style_tmp.css -v --type css ' + xone_config.yui_compressor_options.join(' '), function(){
            //     lib.copyFileSync('tmp/style_tmp.css', 'bin/' + target_platform + '/css/style.css', true);
            // });

            lib.exec('node "' + __dirname + '/refresh.js" ' + (platform || ''));
        }

        console.log("Build Complete.\n");
    });
}
else{

    console.log("The current directory is not a valid xone project.");
}
