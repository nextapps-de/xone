goog.provide('LOADER');
//goog.provide('CONFIG');

// TODO: auto sort deps

if(!CONFIG.NO_SCRIPT && CONFIG.ENV !== "production") (function() {

    var html = '';
    var local_webserver = (

        window.location.href.indexOf('//127.0.0.1') !== -1 ||
        window.location.href.indexOf('//localhost') !== -1 ||
        window.location.href.indexOf('file://') === -1
    );

    var prefix = '';

    if(MANIFEST.dependencies.xone.indexOf('node_modules') === -1){

        prefix = 'node_modules/';
    }
    else{

        prefix = '../';
    }

    // == DEVELOPMENT SOURCES ==

    if(CONFIG.ENV === "development" || CONFIG.ENV === "test") {

        window.less = {

            env: "development",
            async: false,
            fileAsync: false,
            poll: 1000,
            functions: {},
            dumpLineNumbers: "comments",
            relativeUrls: false,
            rebase: true
            //basepath: "/",
           // rootpath: "/"
        };

        MANIFEST.dependencies.js_plugin = [

            MANIFEST.dependencies.xone + prefix + 'less/dist/less.min.js',
            //MANIFEST.dependencies.xone + prefix + 'fastclick/lib/fastclick.js',
            //MANIFEST.dependencies.xone + prefix + 'lz-string/libs/lz-string.min.js',
            //MANIFEST.dependencies.xone + prefix + 'web-animations-js/web-animations.min.js',
            MANIFEST.dependencies.xone + 'plugin/inferno.min.js',
            MANIFEST.dependencies.xone + 'plugin/inferno-dom.min.js'
        ];

        MANIFEST.dependencies.js_xone = [

            MANIFEST.dependencies.xone + 'lib/amd.js',
            MANIFEST.dependencies.xone + 'core/polyfill.js',
            MANIFEST.dependencies.xone + 'interface/ajax.js',
            MANIFEST.dependencies.xone + 'interface/event.js',
            MANIFEST.dependencies.xone + 'interface/model.js',
            MANIFEST.dependencies.xone + 'interface/pattern.js',
            MANIFEST.dependencies.xone + 'interface/route.js',
            MANIFEST.dependencies.xone + 'interface/storage.js',
            MANIFEST.dependencies.xone + 'interface/template.js',
            MANIFEST.dependencies.xone + 'interface/view.js',
            MANIFEST.dependencies.xone + 'core/interface.js',
            MANIFEST.dependencies.xone + 'core/core.js',
            MANIFEST.dependencies.xone + 'core/async.js',
            MANIFEST.dependencies.xone + 'core/app.js',
            MANIFEST.dependencies.xone + 'lib/debug.js',
            MANIFEST.dependencies.xone + 'lib/paint.js',
            MANIFEST.dependencies.xone + 'lib/animate.js',
            MANIFEST.dependencies.xone + 'lib/event.js',
            MANIFEST.dependencies.xone + 'lib/retina.js',
            MANIFEST.dependencies.xone + 'lib/compress.js',
            MANIFEST.dependencies.xone + 'lib/storage.js',
            MANIFEST.dependencies.xone + 'core/model.js',
            MANIFEST.dependencies.xone + 'core/controller.js',
            MANIFEST.dependencies.xone + 'core/view.js',
            MANIFEST.dependencies.xone + 'lib/swipe.js',
            MANIFEST.dependencies.xone + 'lib/pull.js',
            MANIFEST.dependencies.xone + 'lib/image.js',
            MANIFEST.dependencies.xone + 'lib/layout.js',
            MANIFEST.dependencies.xone + 'lib/viewport.js',
            MANIFEST.dependencies.xone + 'lib/worker.js',
            MANIFEST.dependencies.xone + 'lib/validate.js',
			"tmp/layout.js",
			"tmp/view.js"
        ];

        MANIFEST.dependencies.js_inject = [

            /* INJECT XONE LOADER */

            MANIFEST.dependencies.xone + 'core/init.js'
        ];

        MANIFEST.dependencies.css_xone = [

            //MANIFEST.dependencies.xone + 'css/config.less',
            //MANIFEST.dependencies.xone + 'css/reset.less',
            //MANIFEST.dependencies.xone + 'css/xone.less',
            //MANIFEST.dependencies.xone + 'css/animate.less',
            //MANIFEST.dependencies.xone + 'css/debug.less'
        ];

        html += load_deps(/* field: */ 'css_xone');
        html += load_deps(/* field: */ 'css');

        if(local_webserver) {

            MANIFEST.dependencies.less.push("tmp/build.less");
            MANIFEST.dependencies.less.push(MANIFEST.dependencies.xone + 'css/debug.less');

            html += load_deps(/* field: */ 'less');
        }
        else {

            html += load_deps(/* field: */ 'less_fallback');
        }

        html += load_deps(/* field: */ 'js_plugin');
        html += load_deps(/* field: */ 'js_extern');

        if(MANIFEST.dependencies.calculate && window.DEPS){

            DEPS.unshift(MANIFEST.dependencies.xone + 'lib/amd.js');
            MANIFEST.dependencies.js_deps = DEPS;

            html += load_deps(/* field: */ 'js_deps');
        }
        else{

            html += load_deps(/* field: */ 'js_xone');
            html += load_deps(/* field: */ 'js');
        }

        html += load_deps(/* field: */ 'js_inject');
        html += load_deps(/* field: */ CONFIG.ENV);
    }

    else if(CONFIG.ENV === "test_bundle"){

        MANIFEST.dependencies.js_xone = [MANIFEST.dependencies.xone + 'dist/xone.bundle.js'];

        html += load_deps(/* field: */ 'js_xone');
    }

    else if(CONFIG.ENV === "test_lib"){

        MANIFEST.dependencies.js_xone = [MANIFEST.dependencies.xone + 'dist/xone.lib.min.js'];

        html += load_deps(/* field: */ 'js_xone');
    }

    // == IMPORT ADDITIONAL SOURCES FOR TEST ENVIRONMENT ==

    if(CONFIG.ENV === "test" || CONFIG.ENV === "test_bundle" || CONFIG.ENV === "test_lib") {

        /* JASMINE TEST FRAMEWORK */

        MANIFEST.dependencies.test_xone = [

            MANIFEST.dependencies.xone + prefix + 'jasmine-core/lib/jasmine-core/jasmine.css',
            MANIFEST.dependencies.xone + prefix + 'jasmine-core/lib/jasmine-core/jasmine.js',
            MANIFEST.dependencies.xone + prefix + 'jasmine-core/lib/jasmine-core/jasmine-html.js',
            MANIFEST.dependencies.xone + prefix + 'jasmine-core/lib/console/console.js',
            MANIFEST.dependencies.xone + prefix + 'jasmine-core/lib/jasmine-core/boot.js'
        ];

        /* XONE TESTS */

        MANIFEST.dependencies.spec_xone = [

            MANIFEST.dependencies.xone + 'test/helper.js',
            MANIFEST.dependencies.xone + 'test/xone_spec.js',
            MANIFEST.dependencies.xone + 'test/dom_spec.js',
            MANIFEST.dependencies.xone + 'test/paint_spec.js',
            MANIFEST.dependencies.xone + 'test/array_spec.js',
            MANIFEST.dependencies.xone + 'test/check_spec.js',
            MANIFEST.dependencies.xone + 'test/model_spec.js',
            MANIFEST.dependencies.xone + 'test/async_spec.js',
            MANIFEST.dependencies.xone + 'test/amd_spec.js'
        ];

        html += (

            /* IMPORT TEST CONTENT */

            '<link type="image/png" rel="shortcut icon" href="' + MANIFEST.dependencies.xone + prefix + 'jasmine-core/images/jasmine_favicon.png">' +
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
                        '<li class="ul_li" style="top: 444px;"></li>' +
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

            MANIFEST.dependencies.xone + prefix + 'lodash/lodash.min.js',
            MANIFEST.dependencies.xone + prefix + 'benchmark/benchmark.js',
            MANIFEST.dependencies.xone + 'page/lib/highlight/highlight.pack.js',
            MANIFEST.dependencies.xone + prefix + 'chart.js/dist/Chart.min.js',
            MANIFEST.dependencies.xone + 'dist/xone.bundle.js',
            MANIFEST.dependencies.xone + 'local/benchmark.js'
        ];

        MANIFEST.dependencies.suites = [

            'array_vs_object.js',
            'concat_string_vs_array_join.js',
            'create_array_vs_cached_array.js',
            'dom_access_vs_xone.js',
            'inner_html_vs_build_dom.js',
            'inner_html_vs_cached_html.js',
            'local_storage.js',
            'native_map_vs_custom_map.js'
        ];

        MANIFEST.dependencies.css_xone = [

            MANIFEST.dependencies.xone + 'css/config.less',
            MANIFEST.dependencies.xone + 'css/reset.less',
            MANIFEST.dependencies.xone + 'css/xone.less',
            MANIFEST.dependencies.xone + 'css/animate.less',
            //'https://cdn.jsdelivr.net/font-hack/2.020/css/hack.min.css',
            MANIFEST.dependencies.xone + 'page/lib/highlight/styles/agate.css',
            MANIFEST.dependencies.xone + 'css/benchmark.less'
        ];

        html += load_deps(/* field: */ 'css_xone');

        // html += (
        //
        //     '<style type="text/css" media="all">body{ visibility: visible !important; transform: none !important; top:0; right:0; bottom:0; left:0; padding: 0; margin: 0; width:100%; height:100%; min-width:100%; min-height:100%;max-width:100%; max-height:100%; overflow:hidden; position:absolute; font-family: Arial, Helvetica, sans-serif}</style>' +
        //     '&emsp;<b>Choose Test Suite: </b><select style="padding:0.5em; margin:1em" onchange="document.getElementsByTagName(\'iframe\')[0].src = this.value; return false;"><option value="" selected></option><option value="perf/array_vs_object/">array_vs_object</option></select><hr style="margin:0; padding:0">' +
        //     '<iframe src="" style="width:96%; height:96%; position:relative; top:2%; right:2%; bottom:2%; left:2%; margin:0; padding:0; border:0; overflow: auto" frameborder="0"></iframe>'
        // );

        var suites = '';

        for(var i = 0; i < MANIFEST.dependencies.suites.length; i++){

            var title = MANIFEST.dependencies.suites[i].substring(0, MANIFEST.dependencies.suites[i].length -3);

            suites += '<option value="suite/' + title + '">' + title + '</option>';
        }

        html +=
            '<header>' +
                '<input type="button" value="Start">' +
                '<select id="select-mode">' +
                '<option value="test">Test</option>' +
                '<option value="fast" selected>Fast</option>' +
            '<option value="normal">Normal</option>' +
                '<option value="long">Long</option>' +
                '<option value="extra">Extra</option>' +
                '</select>' +
                '<div id="checkboxes"></div>' +
            '</header>' +
            '<main></main>' +
            '<footer>' +
                '<img src="' + MANIFEST.dependencies.xone + 'page/img/xone.svg">' +
                '<select>' + suites + '</select>' +
                '<div style="float: left">&emsp;<input id="options_chart" type="checkbox" checked> Charts</div>' +
                '<table><tr><td id="log"></td></tr></table>' +
            '</footer>';

        /* ADD SUITES */

        html += load_deps(/* field: */ 'benchmark');
        //html += load_deps(/* field: */ 'suites');
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
