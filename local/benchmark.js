var SUITE = (function(window, document){

    var suites = [];
    var test_groups = {};
    var test_results = [];
    var dom_cache = {};
    var last_group_index = 0;
    var suite_id_counter = 0;
    var stat_samples = 0;
    var stat_cycles = 0;
    var stat_count = 0;
    var stat_test = 0;
    var process_timer = 0;
    var test_running = false;
    var group_keys;
    var last_group;

    /**
     * @dict
     * @const
     */

    var suite_options = {
        'test': {
            'maxTime': 0.001,
            'delay': 0,
            'initCount': 0,
            'minSamples': 1,
            'minTime': 0.01
        },
        'fast': {
            'maxTime': 0.1,
            'delay': 0,
            'initCount': 0,
            'minSamples': 10,
            'minTime': 0.05
        },
        'normal': {
            'maxTime': 0.1,
            'delay': 0.001,
            'initCount': 0,
            'minSamples': 25,
            'minTime': 0.1
        },
        'long': {
            'maxTime': 0.5,
            'delay': 0.001,
            'initCount': 0,
            'minSamples': 50,
            'minTime': 0.5
        },
        'extra': {
            'maxTime': 1,
            'delay': 0.001,
            'initCount': 0,
            'minSamples': 100,
            'minTime': 1
        }
    };

    /**
     * @dict
     * @const
     */

    var chart_options = {
        'elements': {
            'line': {
                'cubicInterpolationMode' : 'monotone'
            }
        },
        'animation':{
            'duration': 200,
            'easing': 'linear'
        },
        'scales': {
            'yAxes': [{
                'ticks': {
                    'beginAtZero': true
                },
                'scaleLabel': {
                    'display': true,
                    'labelString': 'ops/s'
                }
            }],
            'xAxes': [{
                'display': true,
                'ticks': {
                    'callback': function(value, index, values){
                        return index;
                    }
                },
                'scaleLabel': {
                    'display': false,
                    'labelString': 'samples'
                }
            }]
        },
        'legend': {
            'display': false
        },
        'title': {
            'display': false,
            'text': 'Benchmark Results',
            'fontSize': 18,
            'padding': 40
        }
    };

    window.addEventListener('load', loadTest, false);

    return{

        createGroup: function(name){

            return {

                addTest: function(params_or_title, fn){

                    SUITE.addTest(params_or_title, fn);
                }
            };
        },

        addGroup: function(params_or_name, tests){

            if(tests){

                var name = params_or_name,
                    tests = tests;
            }
            else{

                var name = params_or_name.name,
                    tests = params_or_name.tests;
            }

            for(var i = 0; i < tests.length; i++){

                SUITE.addTest({

                    group: name,
                    title: tests[i].title,
                    fn: tests[i].fn || tests[i],
                });
            }
        },

        addTest: function(params, fn){

            if(fn || !params.fn){

                params = {

                    group: 'Suite ' + (last_group_index || 1),
                    title: fn && params,
                    fn: fn || params
                };
            }

            test_groups[params.group] = true;

            suites.push(params);
            renderTest(params);
        },

        start: function(){

            toggleTest(true);
        },

        stop: function(){

            toggleTest(false);
        },

        startGroup: function(group, index){

            startTest(group, index);
        },

        setupHtml: function(html_string){

            var div = document.createElement('div');

            div.id = '__xonetest__';
            div.innerHTML = html_string;

            document.body.appendChild(div);
        },

        loadScript: loadSCript,
        loadStyle: loadSCript
    };

    function teardown(){

        document.body.removeChild(getById('__xonetest__'));
    }

    // -------------------------------------------------------------------------------------------------

    function initTest(params){

        var group = params.group,
            title = params.title,
            fn = params.fn;

        var suite = test_groups[group] || (test_groups[group] = createTest(group, title));

        if(params.setup) params.setup();

        if(params.returns){

            if(fn() !== params.returns){

                console.warn("Error");
            }
        }
        else{

            fn();
        }

        if(params.teardown) params.teardown();

        fn = fn.toString();
        fn = fn.substring(fn.indexOf('{') + 1, fn.lastIndexOf('}'));
        fn = Function(fn.replace('return ', ''));

        if(params.setup) params.config.setup = params.setup;
        if(params.teardown) params.config.teardown = params.teardown;

        suite.add(title, fn, params.config);

        if(params.reference) suite[suite.length - 1].$$ref = params.reference;
        if(params.color) suite[suite.length - 1].$$color = params.color;
    }

    // -------------------------------------------------------------------------------------------------

    function formatNumber(number, places, seperator, decimal){

        var regex = new RegExp('(\\d)(?=(\\d{3})+\\' + (decimal || '.') + ')', 'g');

        number = number.toFixed(places || 2);
        if(decimal && decimal !== '.') number = number.replace('.', decimal);

        return number.replace(regex, '$1' + (seperator || ','));
    }

    // -------------------------------------------------------------------------------------------------

    function createTest(group, title){

        var suite = new Benchmark.Suite(group);

        suite.on('error', function(event) {

            console.error('Error@Test' + event.target.id);
        });

        suite.on('cycle', function(event) {

            var target = event.target;
            var id = target.id;
            var test_result = test_results[id];
            var exist = !!test_result;

            exist || (test_result = (test_results[id] = {hz:0, runs:0, rme: 0, sample: []}));
            test_result.hz += target.hz;
            test_result.rme += target.stats.rme;
            test_result.runs += target.stats.sample.length;
            test_result.sample = test_result.sample.concat(target.stats.sample);

            if(exist){

                test_result.hz /= 2;
                test_result.rme /= 2;
            }

            var result = formatNumber(test_result.hz) + ' ops/s';

            if(event.error) {

                console.error(event.error);
            }
            else{

                getById('!suite_' + id).textContent = '  ' + result;
                getById('!suite_bg_' + id).textContent = '  ' + result;
            }

            if(id < suite_id_counter) {

                id++;

                getById('!suite_bg_' + id).textContent = '  running...';
                getById('!log').textContent = [
                    'Test: ' + stat_test,
                    'Group: ' + last_group_index + '/' + group_keys.length,
                    'Suite: ' + id + '/' + suite_id_counter,
                    'Samples: ' + (stat_samples += target.stats.sample.length),
                    'Cycles: ' + (stat_cycles += target.cycles),
                    'Count: ' + (stat_count += target.count)
                ].join('  -  ');
            }
       });

        suite.on('abort', function() {

            // suites = [];
            // test_groups = {};
            // test_running=false;
        });

        suite.on('complete', function() {

            var min = 0,
                max = 0,
                refmax = 0,
                refcopy = [];

            // determine refmax:

            for(var i = 0; i < this.length; i++){

                var test = this[i];

                if(test.$$ref) {

                    if(test.hz > refmax) {

                        refmax = test.hz;
                    }

                    refcopy.push(test);

                    this.splice(i--, 1);
                }
            }

            // determine fastest/slowest:

            var fastest = this.filter('fastest');
            var slowest = this.filter('slowest');

                 if(!fastest) fastest = [];
            else if(!fastest.length) fastest = [fastest];

                 if(!slowest) slowest = [];
            else if(!slowest.length) slowest = [slowest];

            // determine max:

            for(var i = 0; i < fastest.length; i++){

                if(fastest[i].hz > max) max = fastest[i].hz;
            }

            min = max;

            // determine min:

            for(var i = 0; i < slowest.length; i++){

                if(slowest[i].hz < min) min = slowest[i].hz;
            }

            // result refmax:

            for(var i = 0; i < refcopy.length; i++){

                var test = refcopy[i];

                if(test.$$ref){

                    getById('!suite_' + test.id).textContent = (
                        getById('!suite_bg_' + test.id).textContent += '  (x' + formatNumber(test.hz / refmax) + ')'
                    );

                    setStyles('!suite_' + test.id, {
                        'backgroundColor': test.$$color || 'rgb(0, 0, ' + ((255 / refmax * test.hz) | 0) + ')',
                        'color': '#fff',
                        'width': (100 / Math.max(max, refmax) * test.hz) + '%'
                    });
                }
            }

            // result fastest:

            for(var i = 0; i < fastest.length; i++){

                getById('!suite_' + fastest[i].id).textContent = (
                    getById('!suite_bg_' + fastest[i].id).textContent += '  (x' + formatNumber(refmax ? max / refmax : max / min) + ')'
                );

                setStyles('!suite_' + fastest[i].id, {
                    'backgroundColor': fastest[i].$$color || 'rgb(0, ' + ((128 / max * test_results[fastest[i].id].hz) | 0) + ', 0)',
                    'color': '#fff',
                    'width': (100 / Math.max(max, refmax) * test_results[fastest[i].id].hz) + '%'
                });
            }

            // result slowest:

            for(var i = 0; i < slowest.length; i++){

                getById('!suite_' + slowest[i].id).textContent = (
                    getById('!suite_bg_' + slowest[i].id).textContent += '  (x' + formatNumber(refmax ? min / refmax : min / min) + ')'
                );

                setStyles('!suite_' + slowest[i].id, {
                    'backgroundColor': slowest[i].$$color || 'rgb(' + ((255 / min * test_results[slowest[i].id].hz) | 0) + ', 0, 0)',
                    'color': '#fff',
                    'width': (100 / Math.max(max, refmax) * test_results[slowest[i].id].hz) + '%'
                });
            }

            // result other:

            for(var i = 0; i < this.length; i++){

                if(getById('!suite_' + this[i].id).style.backgroundColor === ''){

                    setStyles('!suite_' + this[i].id, {
                        'backgroundColor': this[i].$$color || 'rgb(' + ((255 / (max - min) * (max - this[i].hz)) | 0) + ', ' + ((128 / (max - min) * (this[i].hz - min)) | 0) + ', 0)',
                        'color': '#fff',
                        'width': (100 / Math.max(max, refmax) * this[i].hz) + '%'
                    });
                }
            }

            // draw chart:

            if(getById('!options_chart').checked && (getById('!select-mode').value !== 'test')){

                var labels = [];
                var datasets = [];
                var min_length = 0;

                for(var i = 0; i < refcopy.length; i++){

                    this.push(refcopy[i]);
                }

                for(var i = 0; i < this.length; i++){

                    var test = this[i];
                    var id = test.id;

                    var map = test_results[id].sample.map(function(value){

                        return test.times.elapsed / value;
                    });

                    if(!min_length || (map.length < min_length)) min_length = map.length;

                    datasets[i] = {

                        label: id,
                        data: map,
                        fill: false,
                        backgroundColor: test.$$color || getById('!suite_' + id).style.backgroundColor,
                        borderColor: test.$$color || getById('!suite_' + id).style.backgroundColor,
                        borderWidth: 1
                    };
                }

                labels = (new Array(min_length)).map(function(value){return '';});

                setStyle('!chart_' + (last_group_index), 'display', 'block');

                var myChart = new Chart(getById('!chart_' + (last_group_index)), {

                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: datasets
                    },
                    options: chart_options
                });
            }

            process_timer = window.setTimeout(startAll, 220);
        });

        return suite;
    }

    // -------------------------------------------------------------------------------------------------

    function startAll(){

        if(test_running){

            if(last_group_index < group_keys.length){

                if(queryAll('!header input[type=checkbox]')[last_group_index].checked){

                    startTest(group_keys[last_group_index], last_group_index + 1);
                    last_group_index++;
                }
                else{

                    last_group_index++;
                    startAll();
                }
            }
            else{

                test_running = false;
                query('!header input[type=button]').value = 'Start';
            }
        }
    }

    // -------------------------------------------------------------------------------------------------

    function startTest(group, index){

        if(test_running){

            if(group){

                if(index < group_keys.length - 1){

                    getById('!suite_bg_' + index).textContent = '  running...';
                }

                if(group){

                    test_groups[group].run({

                        'async': true,
                        'queued': false
                    });
                }
            }
            else{

                startAll();
            }
        }
    }

    // -------------------------------------------------------------------------------------------------

    function toggleTest(force_state){

        this.value = (test_running = !test_running) ? 'Stop' : 'Start';

        for(var i = 0; i < suite_id_counter; i++){

            getById('!suite_' + (i + 1)).textContent = (
                getById('!suite_bg_' + (i + 1)).textContent = test_running ? '  pending' : '  ready'
            );

            setStyles('!suite_' + (i + 1), {
                'backgroundColor': '',
                'color': '',
                'width': '0%'
            });
        }

        if(test_running){

            last_group_index = 0;
            test_groups = {};
            last_group = '';

            for(var i = 0; i < suites.length; i++){

                suites[i].config = suite_options[getById('!select-mode').value];
                suites[i].config.id = i + 1;

                initTest(suites[i]);
            }

            group_keys = Object.keys(test_groups);

            for(var i = 0; i < group_keys.length; i++){

                getById("!chart_" + (i + 1)).style.display = 'none';
            }

            stat_test++;

            getById('!log').textContent = 'Test: ' + stat_test + '  -  Group: 1/' + group_keys.length + '  -  Suite: 1/' + suite_id_counter + '  -  Samples: ' + stat_samples + '  -  Cycles: ' + stat_cycles + '  -  Count: ' + stat_count;

            startAll(true);
        }
        else{

            window.clearTimeout(process_timer);

            for(var i = 0; i < group_keys.length; i++){

                if(test_groups[group_keys[i]]){

                    for(var a = 0; a < test_groups[group_keys[i]].length; a++){

                        test_groups[group_keys[i]][a].abort();
                        //test_groups[group_keys[i]][a].reset();
                        test_groups[group_keys[i]][a].aborted = true;
                        test_groups[group_keys[i]][a].cancelled = true;
                    }

                    test_groups[group_keys[i]].abort();
                    //test_groups[group_keys[i]].reset();
                    test_groups[group_keys[i]].aborted = true;
                    test_groups[group_keys[i]].cancelled = true;
                }
            }

            query('!header input[type=button]').value = 'Start';
        }
    }

    // -------------------------------------------------------------------------------------------------

    function toggleGroup(){

        var sections = queryAll('!section');

        for(var i = 0; i < sections.length; i++){

            if(sections[i].dataset.group === this.value){

                setStyle(sections[i], 'display', this.checked ? 'block' : 'none');
            }
        }
    }

    // -------------------------------------------------------------------------------------------------

    var modulo = 0;

    function renderTest(params){

        var group = params.group,
            title = params.title,
            fn = params.fn,
            returns = params.returns;

        var fn_string = fn.toString();

        fn_string = fn_string.substring(fn_string.indexOf('\n') + 1, fn_string.lastIndexOf('\n'));

        var leading_spaces;

        for(leading_spaces = 0; leading_spaces < fn_string.length; leading_spaces++){

            if(fn_string[leading_spaces] !== ' '){

                leading_spaces = fn_string.substring(0, leading_spaces);
                break;
            }
        }

        if(leading_spaces){

            fn_string = fn_string.replace(new RegExp('\n' + leading_spaces, 'g'), '\n');
            fn_string = fn_string.replace(leading_spaces, '');
        }

        if(returns){

            fn_string = fn_string.replace('return ', '');
        }

        var html = '';

        if(group !== last_group){

            last_group_index++;
            modulo = 0;

            html += '<div style="clear:both"></div>';
            html += '<section data-group="' + group + '"><h1>' + group + '</h1></section>';
        }
        else{

            modulo++;
        }

        if(group !== last_group){

            html += '<canvas id="chart_' + last_group_index + '" width="400" height="100" style="display:none"></canvas>';
        }

        // TODO: responsive
        if(false && document.body.clientWidth > 2400){

            html += '<section data-group="' + group + '" style="width:32%; margin:0;' + (modulo % 3 === 0 ? 'clear:both; float:left;' : modulo % 3 === 1  ? 'float:right;' : 'display:inline-block;') + '">';
        }
        else if(false && document.body.clientWidth > 1400){

            html += '<section data-group="' + group + '" style="width:49%; margin:0;' + (modulo % 2 === 0 ? 'float:left;' : 'float:right;') + '">';
        }
        else{

            html += '<section data-group="' + group + '" style="margin:0;">';
        }

        if(title) html += '<h2>' + title + '</h2>';

        html += '<div class="right">';
        html += '<div class="front" id="suite_' + (++suite_id_counter) + '"></div>';
        html += '<div class="back" id="suite_bg_' + (suite_id_counter) + '">ready</div>';
        html += '</div>';
        html += '<div class="left">' + (suite_id_counter > 9 ? '' : '  ') + suite_id_counter + '</div>';
        html += '<pre><code class="js">' + fn_string + '</code></pre>';
        html += '<hr>';
        html += '</section>';

        if(group !== last_group){

            last_group = group;
        }

        document.getElementsByTagName('main')[0].innerHTML += html;

        var blocks = queryAll('code.js');

        if(blocks.length) {

            window['hljs']['highlightBlock'](blocks[blocks.length - 1]);
        }
    }

    // -------------------------------------------------------------------------------------------------

    function forwardTest(){

        window.location.href = '?file=' + this.value;
    }

    // -------------------------------------------------------------------------------------------------

    function parseFromUrl(location, key){

        if(!key){

            key = location;
            location = window.location.search;
        }

        if(location[0] === '?') {

            location = location.substring(1);
        }

        var parameter = location.split('&');

        if(parameter && parameter.length){

            for(var i = 0; i < parameter.length; i++){

                if(parameter[i]){

                    var pair = parameter[i].split('=');

                    if(pair[0] === key){

                        return pair[1];
                    }
                }
            }
        }
    }

    // -------------------------------------------------------------------------------------------------

    function loadTest(){

        var script_src = parseFromUrl('file') || query('footer select').value;

        if(script_src){

            var callback = function(){

                if(window['hljs']) {

                    window['hljs']['initHighlightingOnLoad']();
                }

                group_keys = Object.keys(test_groups);

                var html = '';

                for(var i = 0; i < group_keys.length; i++){

                    html += '&emsp;<input type="checkbox" value="' + group_keys[i] + '" checked> ' + group_keys[i] + '&emsp;';
                }

                getById('checkboxes').innerHTML = html;
                query('!header input[type=button]').addEventListener('click', toggleTest, false);
                query('footer select').addEventListener('change', forwardTest, false);

                var checkboxes = queryAll('!header input[type=checkbox]');

                for(var i = 0; i < checkboxes.length; i++){

                    checkboxes[i].addEventListener('click', toggleGroup, false);
                }

                var options = document.getElementsByTagName('option');
                var current = parseFromUrl('file');

                for(var i = 0; i < options.length; i++){

                    if(options[i].value === current) {

                        options[i].selected = true;
                        break;
                    }
                }
            };

            //loadSCript('../lib/xone/node_modules/chart.js/dist/Chart.min.js');
            loadSCript(script_src + '.js', callback);
        }
    }

    // -------------------------------------------------------------------------------------------------

    function loadSCript(script_src, callback){

        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.async = !!callback;

        if(callback){

            script.onload = script.onreadystatechange = callback;
        }

        script.src = script_src;

        document.getElementsByTagName('head')[0].appendChild(script);
    }

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    function cache(query, fn){

        if(query[0] === '!'){

            query = query.substring(1);

            return dom_cache[query] || (dom_cache[query] = fn.call(document, query));
        }

        return fn.call(document, query);
    }

    function query(selector){

        return cache(selector, document.querySelector);
    }

    function queryAll(selector){

        return cache(selector, document.querySelectorAll);
    }

    function getById(id){

        if(typeof id !== 'string'){

            return id;
        }

        return cache(id, document.getElementById);
    }

    function setStyle(id, style, value){

        getById(id).style[style] = value;
    }

    function setStyles(id, styles){

        var element_style = getById(id).style;

        for(var style in styles){
            if(styles.hasOwnProperty(style)){
                element_style[style] = styles[style];
            }
        }
    }

})(window, document);
