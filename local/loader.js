goog.provide('LOADER');
goog.provide('CONFIG');

// TODO: auto sort deps

if(!CONFIG.NO_SCRIPT && CONFIG.ENV !== "production") (function() {

    var html = '';
    var local_webserver = (

        window.location.href.indexOf('127.0.0.1') === -1 &&
        window.location.href.indexOf('localhost') === -1 &&
        window.location.href.indexOf('file://') === -1
    );

    // == DEVELOPMENT SOURCES ==

    if(CONFIG.ENV === "development" || CONFIG.ENV === "test") {

        MANIFEST.dependencies.css_xone = [

            /*CONFIG.XONE_PATH +*/ 'lib/xone/css/reset.css',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/css/xone.css',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/css/debug.css'
        ];

        MANIFEST.dependencies.js_xone = [

            /*CONFIG.XONE_PATH +*/ 'lib/xone/core/polyfill.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/core/interface.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/graph.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/core/core.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/core/app.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/debug.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/paint.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/event.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/retina.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/compress.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/storage.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/core/model.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/core/controller.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/layout.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/viewport.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/worker.js'
        ];

        MANIFEST.dependencies.js_inject = [

            /* INJECT XONE LOADER */

            /*CONFIG.XONE_PATH +*/ 'lib/xone/lib/validate.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/core/init.js'
        ];

        html += load_deps(/* field: */ 'css_xone');
        html += load_deps(/* field: */ 'css');

        if(local_webserver) {

            html += load_deps(/* field: */ 'less');
        }
        else {

            html += load_deps(/* field: */ 'less_fallback');
        }

        html += load_deps(/* field: */ 'js_extern');
        html += load_deps(/* field: */ 'js_xone');
        html += load_deps(/* field: */ 'js');
        html += load_deps(/* field: */ 'js_inject');
        html += load_deps(/* field: */ CONFIG.ENV);
    }

    // == IMPORT ADDITIONAL SOURCES FOR TEST ENVIRONMENT ==

    if(CONFIG.ENV === "test") {

        /* JASMINE TEST FRAMEWORK */

        MANIFEST.dependencies.test_xone = [

            /*CONFIG.JASMINE_PATH +*/ 'lib/jasmine/jasmine.css',
            /*CONFIG.JASMINE_PATH +*/ 'lib/jasmine/jasmine.js',
            /*CONFIG.JASMINE_PATH +*/ 'lib/jasmine/jasmine-html.js',
            /*CONFIG.JASMINE_PATH +*/ 'lib/jasmine/console.js',
            /*CONFIG.JASMINE_PATH +*/ 'lib/jasmine/boot.js'
        ];

        /* XONE TESTS */

        MANIFEST.dependencies.spec_xone = [

            /*CONFIG.XONE_PATH +*/ 'lib/xone/spec/helper.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/spec/core_spec.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/spec/dom_spec.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/spec/paint_spec.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/spec/array_spec.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/spec/check_spec.js',
            /*CONFIG.XONE_PATH +*/ 'lib/xone/spec/model_spec.js'
        ];

        html += (

            /* IMPORT TEST CONTENT */

            '<link type="image/png" rel="shortcut icon" href="' + /*CONFIG.JASMINE_PATH +*/ 'lib/xone/lib/jasmine/jasmine_favicon.png">' +
            '<style type="text/css" media="all">body{ visibility: visible !important; transform: none !important; top: 0 !important; right:0; bottom:0; left:0; padding: 0; margin: 0; height: 100% !important; width: 100% !important; transform: none !important; } .jasmine_html-reporter{ text-align: left; position: absolute; z-index: 9999; height: 100%; width: 100%; left: 0; top: 0; right: 0; bottom: 0; padding: 0 !important; margin: 0 !important; overflow: auto; }</style>' +
            '<style type="text/css" media="all">' +
                '#test_wrapper{ position: absolute; top: 1px; height:100%; }' +
                '#test_content{ position: absolute; top: 2px; height:100%; }' +
                '#test_wrapper ul{ position: relative; top: 3px; height:100%; }' +
                '#test_wrapper ul li{ position: relative; top: 4px; height:100%; }' +
                '#test_content .ul{ top: 5px; height:100%; }' +
                '#test_content .ul_li{ top: 6px; height:100%; }' +
                '#test_wrapper.active ul{ position: absolute; top: 7px; height:200px; }' +
                '#test_wrapper.active .ul_li{ position: absolute; top: 8px; height:200px; }' +
                '#test_wrapper.inactive ul{ top: -7px; height:0px; }' +
                '#test_wrapper.inactive .ul_li{ top: -8px; height:0px; }' +
            '</style>' +
            '<div id="test_wrapper" style="top: 100px;">' +
                '<div id="test_content" style="position: relative; top: 200px; height:auto;">' +
                    '<ul class="ul" style="top: 300px; height:100%;">' +
                        '<li class="ul_li" style="top: 400px;"></li>' +
                        '<li class="ul_li"></li>' +
                    '</ul>' +
                    '<ul class="ul">' +
                        '<li class="ul_li" style="top: 444px !important;"></li>' +
                        '<li class="ul_li"></li>' +
                    '</ul>' +
                '</div>' +
            '</div>' +
            '<div id="test_layer" style="display: none"></div>'
        );

        /* ADD SPECS */

        html += load_deps(/* field: */ 'test_xone');
        html += load_deps(/* field: */ 'spec_xone');
        html += load_deps(/* field: */ 'spec');
    }

    // == IMPORT ADDITIONAL SOURCES FOR TEST ENVIRONMENT ==

    if(CONFIG.ENV === "benchmark"){

        /* BENCHMARK FRAMEWORK */

        MANIFEST.dependencies.benchmark = [

            'lib/benchmark/lodash.min.js',
            'lib/benchmark/benchmark.js'
        ];

        MANIFEST.dependencies.suites = [];

        html += (

            '<style type="text/css" media="all">body{ visibility: visible !important; transform: none !important; top:0; right:0; bottom:0; left:0; padding: 0; margin: 0; width:100%; height:100%; min-width:100%; min-height:100%;max-width:100%; max-height:100%; overflow:hidden; position:absolute; font-family: Arial, Helvetica, sans-serif}</style>' +
            '&emsp;<b>Choose Test Suite: </b><select style="padding:0.5em; margin:1em" onchange="document.getElementsByTagName(\'iframe\')[0].src = this.value; return false;"><option value="" selected></option><option value="perf/array_vs_object/">array_vs_object</option></select><hr style="margin:0; padding:0">' +
            '<iframe src="" style="width:96%; height:96%; position:relative; top:2%; right:2%; bottom:2%; left:2%; margin:0; padding:0; border:0; overflow: auto" frameborder="0"></iframe>'
        );

        /* ADD SUITES */

        html += load_deps(/* field: */ 'benchmark');
        html += load_deps(/* field: */ 'suites');
    }

    if(html) {

        document.write(html);
    }

    /* HELPERS */

    /**
     * @param {string} url
     * @returns {string}
     */
    function loadJS(url){

        return '<script type="text/javascript" src="' + url + '?rnd=' + Math.random() +'"></script>';
    }

    /**
     * @param {string} url
     * @param {string=} media
     * @param {string=} type
     * @returns {string}
     */
    function loadCSS(url, media, type){

        return '<link type="text/css" rel="stylesheet' + (type ? '/' + type : '') + '" href="' + url + '?rnd=' + Math.random() +'" media="' + (media || 'screen') + '">';
    }

    /**
     * @param {string} url
     * @param {string=} media
     * @returns {string}
     */
    function loadLESS(url, media){

        return loadCSS(url, media, 'less');
    }

    /**
     * @param {!string} field
     * @returns {string}
     */

    function load_deps(field){

        var html = '';
        var deps;

        if(deps = MANIFEST.dependencies[field]) {

            for(var i = 0; i < deps.length; i++){

                var type = deps[i].substr(deps[i].lastIndexOf('.') + 1);

                     if(type === 'css') html += loadCSS(deps[i]);
                else if(type === 'less') html += loadLESS(deps[i]);
                else if(type === 'js') html += loadJS(deps[i]);
            }
        }

        return html;
    }

})();
