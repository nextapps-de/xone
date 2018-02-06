goog.provide('APP.CONTROLLER');
goog.require('CORE');
goog.require('APP');

(function(CONTROLLER, ROUTE){

    "use strict";

    /**
     * @param {Array<string>|string} route
     * @param {Function|Object<string, *>=} params
     * @param {Function=} callback
     * @param {Function=} error
     * @param {Function=} update_cache
     * @const
     */

    CONTROLLER.request = function request(route, params, callback, error, update_cache){

        if(route && (route.constructor === Array)){

            for(var i = 0; i < route.length; i++){

                CONTROLLER.request(route[i], params, i < route.length - 1 ? callback : null, error, update_cache);
            }

            return;

            // return CONTROLLER.requestBatch(
            //     /** @type {Array<*>} */
            //     (route),
            //     /** @type {Function|null} */
            //     (params)
            // );
        }

        if(CORE.isType(params, 'function')){

            update_cache = error;
            error = callback;
            callback = /** @type {Function|null} */ (params);
            params = null;
        }

        if(!route){

            if(ROUTE['#/']){

                 route = '#/';
            }
            else if(ROUTE['#!/']){

                route = '#!/';
            }
            else{

                if(DEBUG) Console.warn('WARNING: No route specified for "' + route + '"!');

                return;
            }
        }

        route = /** @type {string} */ (route);

        if(!CORE.isType(ROUTE[route])){

            ROUTE[route] = {};

            if(DEBUG) Console.warn('WARNING: No route specified for "' + route + '"!');
        }

        params || (params = APP.PAYLOAD[route] ? APP.PAYLOAD[route]() : ROUTE[route].params || null);

        (function(route, route_obj, callback, update_cache){

            var route_action = route_obj.action;

            // if(!update_cache && route_action && APP.LAYOUT.lastAction === route_action){
            //
            //     var nodes = CORE.getByTag('main', CORE.getById('content-' + route_action).parentNode.parentNode);
            //
            //     for(var i = 0; i < nodes.length; i++){
            //
            //         CORE.scrollToTop(nodes[i]);
            //     }
            // }

            APP.LAYOUT.lastAction = route_action || APP.LAYOUT.lastAction || '';

            // TODO
            /*
            if(!update_cache && route_action){

                APP.LAYOUT.handleCache(route_action, function(update_cache){

                    //CORE.async(function() {

                    CONTROLLER.request(route, params, callback, error, update_cache);

                    //}, APP.LAYOUT.lastAction === route_action ? 400 : 0);
                });

                return;
            }
            */

            if(route[0] === '#'){

                // TODO: refactor
                var data = params;
                params = CORE.query('a[href="' + route + '"]')[0];

                fn_success(data);
                return;
            }

            route_obj.header || (route_obj.header = {});
            route_obj.header["Accept"] || (route_obj.header["Accept"] = "application/json");
            route_obj.header["Content-Type"] || (route_obj.header["Content-Type"] = "application/json");

            /* Append default headers from APP.VARS.HEADER */

            var default_headers = APP.VARS.HEADER;

            for(var key in default_headers){

                if(default_headers.hasOwnProperty(key)){

                    route_obj.header[key] = default_headers[key];
                }
            }

            /* Replace dynamic params in query string */

            var pos;

            if((pos = route.indexOf('/:')) !== -1){

                var custom_field = route.substring(pos + 2, route.indexOf('/', pos + 2));
                route = route.replace('/:' + custom_field, '/' + params[custom_field]);
            }

            /* Determine request type and replace markers */

            var request_type = 'GET';

            if(route.indexOf('GET:') !== -1){

                route = route.substring(4);
            }
            else if(route.indexOf('POST:') !== -1){

                request_type = 'POST';
                route = route.substring(5);
            }
            else if(route.indexOf('DELETE:') !== -1){

                request_type = 'DELETE';
                route = route.substring(7);
            }
            else if(route.indexOf('PATCH:') !== -1){

                request_type = 'PATCH';
                route = route.substring(6);
            }

            function fn_success(data){

                if(CORE.isArray(data) || CORE.isObject(data)){

                    // perform data field index
                    if(route_obj.field) data = data[route_obj.field] || [];
                    // perform filter
                    if(route_obj.filter) data = data.filter(route_obj.filter);
                    // perform arrayfilter
                    if(route_obj.arrayfilter) data = route_obj.arrayfilter(data/*, params*/);
                    // perform sort
                    if(route_obj.sort) data = data.sort(route_obj.sort);
                    // limit result
                    if(route_obj.limit && (data.length > route_obj.limit)) data.splice(route_obj.limit, data.length - route_obj.limit);
                    // limit result
                    if(route_obj.last && (data.length > route_obj.last)) data.splice(0, data.length - route_obj.last);
                    // map array values
                    if(route_obj.map) data.map(route_obj.map);
                    // arraymap array values
                    if(route_obj.arraymap) route_obj.arraymap(data/*, params*/);
                    // update cache
                    if(update_cache) update_cache();
                }

                (callback || (

                        callback = (

                            route_obj.do ? (

                                typeof route_obj.do === 'string' ?

                                    APP.HANDLER[route_obj.do]
                                :
                                    route_obj.do
                            )
                            :(
                                route_obj.to ? (

                                    typeof route_obj.to === 'string' ?

                                        CONTROLLER[route_obj.to]
                                    :
                                        route_obj.to
                                ):
                                    typeof route_obj === 'function' ?

                                        route_obj
                                    :
                                        null
                            )
                        )
                    )
                );

                // perform callback and pass data
                if(callback) callback(data, params);
            }

            /* Perform request */

            CORE.ajax(/** @type {_ajax_struct}*/ ({

                url: CONFIG.SERVER_HOST + (route_obj.url || route),
                params: params,
                type: route_obj.type || request_type,
                header: route_obj.header,
                async: route_obj.async,
                cache: route_obj.cache,
                clear: route_obj.clear,
                success: fn_success,
                error: function fn_error(status, data){
                    if(route_obj.default) fn_success(route_obj.default());
                    if(error) error(status, data);
                    else if(route_obj.error) route_obj.error(status, data);
                }
            }));

            /* Analytics */

            // if(APP.PLUGIN.Analytics){
            //
            //     APP.PLUGIN.Analytics.event(
            //         /* Category: */
            //         'Request',
            //         /* Event: */
            //         (route_obj.type || request_type).toUpperCase() + ': ' + (route_obj.url || route),
            //         /* Label: */
            //         'Hits',
            //         /* Integer Value: */
            //         1
            //     );
            // }

        })(route, /** @type {_route_struct} */ (ROUTE[route]), callback, update_cache);
    };

    /**
     * @param {Array<*>} requests
     * @param {Function=} callback
     * @const
     */

    CONTROLLER.requestBatch = function(requests, callback){

        for(var i = 0; i < requests.length; i++){

            (function(request, callback){

                if(CORE.isType(request, 'string')){

                    request = [request, null, CONTROLLER[ROUTE[/** @type {string} */ (request)].to]];
                }

                CONTROLLER.request(request[0], request[1], function(data){

                    if(request[2]) request[2](data);
                    if(callback) callback();
                });

            })(requests[i], i === requests.length - 1 ? callback : null)
        }
    };

    /**
     * @param {Array<*>} _requests
     * @param {Function=} _callback
     * @param {number=} i
     * @const
     */

    CONTROLLER.requestSync = function(_requests, _callback, i){

        var requests = _requests;
        var callback = _callback;

        var request = requests[i || (i = 0)];

        if(CORE.isType(request, 'string')){

            request = [request, null, CONTROLLER[ROUTE[/** @type {string} */ (request)].to]];
        }

        CONTROLLER.request(request[0], request[1], function(data){

            if(request[2]) request[2](data);

            if(++i < requests.length){

                CONTROLLER.requestSync(requests, callback, i);
            }
            else if(callback) callback();
        });
    };

    /**
     * Build a HTML template through linear pattern
     * @param {string} _view
     * @param {Array<_model_class>=} data
     * @returns {string}
     *
     * TODO:
     * https://jsperf.com/clonenode-vs-createelement-performance/32
     */

    function buildTemplate(_view, data){

        if(DEBUG){

            var debug_time = CORE.time.now();
        }

        data || (data = [{}]);

        if(data.constructor !== Array) data = [data];

        /** @type {Array<_template_struct>} */
        var template = APP.TEMPLATE[_view];
        var html = '';
        var item;

        for(var x = 0; x < data.length; x++){

            if(item = data[x]){

                var map_to_view = item.mapToView;
                // var map_to_view_cache = item.mapToViewCache || (item.mapToViewCache = {});
                //     map_to_view_cache['id'] || (map_to_view_cache['id'] = new Array(_view.length));
                // var map_to_view_cache = item.mapToViewCache || (item.mapToViewCache = new Array(_view.length));
                var map_to_view_cache = CONFIG.ENABLE_MAPPER_CACHE ? item['mapToViewCache'] || (item['mapToViewCache'] = {}) : {};

                /* Temporary holders to split object notations into its components */

                var split;
                var model;
                var field;
                var extra;

                for(var a = 0; a < template.length; a++){

                    //map_to_view_cache = map_to_view_cache[a] || (map_to_view_cache[a] = {});

                    /** @type {_template_struct} */
                    var view = template[a];

                    var template_data = view.data;
                    var template_map = view.map;
                    var tmp;
                    var pos;

                    /* Perform skip condition */

                    if(item === null || (view.if && view.if(item) === false)){

                        // TODO: fix else conditions in templates
                        if(view.else) template_data = [view.else];
                        else continue;
                    }

                    /* Perform loop */

                    var loop_data;
                    var loop_start = 0;
                    var loop_end = 0;
                    var loop_count = 1;
                    var view_loop = view.loop;

                    if(view_loop){

                        // TODO: move loop control to compiler
                        if(view_loop.indexOf(',') !== -1){

                            var loop_start_end = view_loop.split(',');

                            if(loop_start_end.length === 3){

                                loop_start = parseInt(loop_start_end[1], 10);
                                loop_end = parseInt(loop_start_end[2], 10);
                            }
                            else{

                                loop_end = parseInt(loop_start_end[1], 10);
                            }

                            view_loop = loop_start_end[0];
                        }

                        /* Check if the loop identifier is in object notation */

                        // TODO: move subfields to compiler
                        if(view_loop.indexOf('.') !== -1){

                            /* If the loop identifier is in object notation split this into its components */

                            split = view_loop.split('.');
                            model = split[0];
                            field = split[1];
                            extra = split[2] || false;

                            /* Determine the array which has to be looped */

                            loop_data = (

                                item[model] ?

                                    item[model][field] ?

                                        item[model][field][extra] ?

                                            item[model][field][extra]
                                        :
                                            item[model][field]
                                    :
                                        item[model]
                                :
                                    item
                            );
                        }
                        else{

                            /* If the loop identifier is not in object notation use it as the array key */

                            loop_data = item[view_loop];
                        }

                        /* Determine count of the loop */

                        loop_count = loop_data ? (loop_end && (loop_end <= loop_data.length) ? loop_end : loop_data.length) : 0;
                    }

                    /* Loop count is at least 1 */

                    var item_loop = item;

                    for(var z = (loop_start || 0); z < loop_count; z++){

                        var template_html = '';

                        if(view_loop){

                            item_loop = loop_data[z];
                        }

                        if(item_loop){

                            //var map_to_view_cache;

                            if(item_loop.mapToView){

                                map_to_view = item_loop.mapToView;
                                // map_to_view_cache = item_loop.mapToViewCache || (item_loop.mapToViewCache = {});
                                // map_to_view_cache['id'] || (map_to_view_cache['id'] = new Array(_view.length));
                                //map_to_view_cache = item_loop.mapToViewCache || (item_loop.mapToViewCache = new Array(_view.length));
                                if(CONFIG.ENABLE_MAPPER_CACHE) map_to_view_cache = item_loop['mapToViewCache'] || (item_loop['mapToViewCache'] = {});
                            }

                            else if(CONFIG.ENABLE_MAPPER_CACHE && CORE.isType(item_loop.mapToView)) map_to_view_cache = item_loop['mapToViewCache'] || (item_loop['mapToViewCache'] = {});

                            /* Delegate additional index attribute to the view mapper */

                            item_loop['index'] || (item_loop['index'] = view_loop ? z : x);

                            /* Loop through the template map (step = 2) */

                            //template_html = '';

                            if(template_map.length) template_html += template_data[0];

                            for(var i = 1; i < template_map.length; i += 2){

                                var mapped_value = template_data[i];
                                var key = template_map[i];

                                // Mapper Cache:
;
                                if(CONFIG.ENABLE_MAPPER_CACHE && CORE.isType(map_to_view_cache[key])){

                                    template_html += map_to_view_cache[key];

                                    if(i + 1 < template_data.length) template_html += template_data[i + 1];
                                    if(DEBUG) APP.STATS.count_mapper_cache++;
                                    continue;
                                }

                                /* ACCESS ON OBJECT PROPERTIES (TEMPLATE) */

                                if(key.indexOf('.') !== -1){

                                    split = key.split('.');
                                    model = split[0];
                                    field = split[1];
                                    extra = split[2] || false;

                                    /* ACCESS ON ARRAY INDEX (TEMPLATE) */

                                    if((pos = model.indexOf('[')) !== -1){

                                        var index = parseInt(model.substring(pos + 1, model.indexOf(']')), 10);

                                        model = model.substring(0, pos);

                                        if(tmp = item_loop[model][index]){

                                            if(map_to_view && map_to_view[model] && map_to_view[model][field]){

                                                if(extra && map_to_view[model][field][extra]){

                                                    //template_data[i] = map_to_view[model][field][extra](tmp[field][extra], tmp);
                                                    mapped_value = map_to_view[model][field][extra](tmp[field][extra], tmp);
													if(CONFIG.ENABLE_MAPPER_CACHE) map_to_view_cache[key] = mapped_value;
                                                }
                                                else{

                                                    //template_data[i] = map_to_view[model][field](tmp[field], tmp);
                                                    mapped_value = map_to_view[model][field](tmp[field], tmp);
													if(CONFIG.ENABLE_MAPPER_CACHE) map_to_view_cache[key] = mapped_value;
                                                }
                                            }

                                            //else template_data[i] = tmp[field];
                                            else mapped_value = tmp[field];
                                        }
                                    }
                                    else{

                                        if(tmp = item_loop[model]){

                                            if(map_to_view && map_to_view[model] && map_to_view[model][field]){

                                                // TODO: pass a field or pass the model which can be handled in the mapper (e.g. loop)

                                                if(extra){

                                                    var val = (


                                                        CORE.isType(tmp[field]) ? (

                                                            CORE.isType(tmp[field][extra]) ?

                                                                tmp[field][extra]
                                                            :
                                                                tmp[field]

                                                        ) : tmp || item_loop
                                                    );

                                                    if(map_to_view[model][field][extra]){

                                                        //template_data[i] = map_to_view[model][field][extra](val, tmp || item_loop);
                                                        mapped_value = map_to_view[model][field][extra](val, tmp || item_loop);
														if(CONFIG.ENABLE_MAPPER_CACHE) map_to_view_cache[key] = mapped_value;
                                                    }
                                                    else{

                                                        //template_data[i] = val;
                                                        mapped_value = val;
                                                    }
                                                }
                                                else{

                                                    //template_data[i] = map_to_view[model][field](tmp[field], tmp || item_loop);
                                                    mapped_value = map_to_view[model][field](tmp[field], tmp || item_loop);
													if(CONFIG.ENABLE_MAPPER_CACHE) map_to_view_cache[key] = mapped_value;
                                                }
                                            }
                                            else if(tmp[field] && tmp[field][extra]){

                                                //template_data[i] = tmp[field][extra];
                                                mapped_value = tmp[field][extra];
                                            }
                                            else{

                                                // template_data[i] = (
                                                //
                                                //     CORE.isType(tmp[field]) ?
                                                //
                                                //         tmp[field]
                                                //     :
                                                //         tmp || item_loop
                                                // );

                                                mapped_value = (

                                                    CORE.isType(tmp[field]) ?

                                                        tmp[field]
                                                    :
                                                        tmp || item_loop
                                                );
                                            }
                                        }
                                    }
                                }
                                else{

                                    if(map_to_view && map_to_view[key]){

                                        //template_data[i] = map_to_view[key](item_loop[key], item_loop);
                                        mapped_value = map_to_view[key](item_loop[key], item_loop);
                                        if(CONFIG.ENABLE_MAPPER_CACHE) map_to_view_cache[key] = mapped_value;
                                    }
                                    else if(key === 'item'){

                                        mapped_value = item_loop;
                                    }
                                    //else template_data[i] = item_loop[key];
                                    else{

                                        mapped_value = item_loop[key];
                                    }
                                }

                                template_html += mapped_value;

                                if(i + 1 < template_data.length) template_html += template_data[i + 1];

                                if(DEBUG) APP.STATS.count_mapper++;
                            }
                        }

                        if(!view_loop || item_loop){

                            // TODO: concat as string
                            //html += template_data.join(''); //template_html;
                            html += template_html; //template_html;
                        }

                        //APP.STATS.count_mapper++;
                    }
                }
            }
        }

        if(DEBUG){

            APP.STATS.time_render += CORE.time.now() - debug_time;
        }

        return html;
    }

    /**
     * @param view
     * @param data
     */

    CONTROLLER.build = function build(view, data){

        return buildTemplate(view, data);
    };

    var render_items_ids = {};

    /**
     * @param {_view_params} config
     * @param {boolean=} update_mode
     * @param {number=} _index
     * @const
     */

    CONTROLLER.renderItems = function(config, update_mode, _index){

        var data = config.data;
        var target = config.target;

        if(typeof target === 'string'){

            target = CORE.queryOne(target);
        }

        var key = target.id || 'render-items';

        if(!_index){

            if(!render_items_ids[key]){

                render_items_ids[key] = 1;
            }
            else{

                render_items_ids[key]++;
            }

            if(!update_mode){

                target.innerHTML = ""; //CORE.removeNodes(target);
                target['_crc'] = -1;
                target['_html'] = "";
            }
        }

        var length;

        if(data && (length = data.length)){

            var i = _index || 0;

            if(i < length){

                var element = target.childNodes[i] || document.createElement('div');

                CONTROLLER.render({

                    target: element,
                    data: data[i],
                    template: config.template,
                    callback: i === length - 1 ? config.callback : void 0
                });

                if(i > target.childElementCount - 1) {

                    target.appendChild(element);
                }

                i++;
            }

            if(i === length){

                while(target.childElementCount > i){

                    target.removeChild(target.childNodes[i]);
                }

                config = void 0;
            }
            else{

                var local_render_id = render_items_ids[key];

                CORE.queue(function(){

                    if(local_render_id === render_items_ids[key]){

                        CONTROLLER.renderItems(config, update_mode, i);
                    }

                    config =
                    local_render_id = void 0;

                }, key);
            }
        }
        else{

            CONTROLLER.render(config);
        }
    };

    /**
     * @param {_view_params|string} _target
     * @param {Array<_pattern_struct>=} _data
     * @const
     */

    CONTROLLER.render = function render(_target, _data){

        var target = _target;
        var data = _data;
        var dest;

        if(data){

            dest = (

                typeof target === 'string' ?

                    CORE.queryOne(target)
                :
                    target
            );

            CORE.removeNodes(dest);
            CORE.buildPattern(data, dest);

            if(DEBUG) APP.STATS.count_render++;
        }
        else if(target.template){

            target.data || (target.data = [{}]);

            dest = (

                typeof target.view === 'string' ?

                    CORE.queryOne('#' + target.view + ' xone-main')
                :
                    typeof target.target === 'string' ?

                        CORE.queryOne(target.target)
                    :
                        target.target
            );

            if(!dest){

                if(DEBUG) Console.warn("Controller Error: Element not found: " + target.target);

                return;
            }

            var is_array_data = target.data.constructor === Array;

            var template = (

                (is_array_data && target.data.length) || (!is_array_data && target.data) ?

                    buildTemplate(target.template, target.data)
                :
                    target.default ? (

                        target.default.template ?

                            buildTemplate(target.default.template, target.default.data)
                        :
                            buildTemplate(/** @type {string} */ (target.default))
                    ):
                        ''
            );

            if(DEBUG && CONFIG.ENABLE_HTML_CACHE){

                if(dest['_html'] === template){

                    APP.STATS.count_render_cache++;
                    Console.log("HTML Content Load from Cache: " + dest.id);
                }
                else{

                    APP.STATS.count_render++;
                    Console.log("HTML Content Updated: " + dest.id);
                }
            }
/*
            var old_style_value = CORE.getStyle(dest, 'will-change');

            if(!old_style_value || !CORE.contains(old_style_value, 'contents')){

                CORE.setStyle(dest, 'will-change',

                    old_style_value && (old_style_value !== 'auto') ?

                        old_style_value + ', contents'
                    :
                        'contents'
                );
            }
*/
            // diffDOM
/*
            (function(dest, target, template, callback){

                var newElement = document.createElement('div');
                newElement.innerHTML = '<vdom>' + template + '</vdom>';

                var t0 = performance.now();
                for(var i = 0; i < 1; i++){

                    //(function(template){
                    var dd = new diffDOM();

                    dd.apply(dest, dd.diff(dest, newElement));

                    //})(template += '<div>test</div>');
                }

                var t1 = performance.now();
                console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

                callback();

            })(dest, target, template, function render_callback(){

                if(target.callback){

                    if(CORE.isType(target.callback, 'string')){

                        APP.HANDLER[target.callback].call(dest, target.data);
                    }
                    else{

                        target.callback.call(dest, target.data);
                    }
                }
            });
*/


            // Inferno
/*
            (function(dest, target, template, callback){

                function hook(domNode){

                    domNode['innerHTML'] = template;
                }

                var t0 = performance.now();
                for(var i = 0; i < 500; i++){

                    (function(template){

                        var innerHTML = window['Inferno']['createTemplate'](function(onCreated){

                            return {

                                'tag': "self",
                                'attrs': {
                                    'onCreated': onCreated
                                }
                            };
                        });

                        window['InfernoDOM']['render'](innerHTML(function hook(domNode){

                            domNode['innerHTML'] = template;

                        }), dest);

                    })(template += '<div>test</div>');
                }

                var t1 = performance.now();
                console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

                callback();

            })(dest, target, template, function render_callback(){

                if(target.callback){

                    if(CORE.isType(target.callback, 'string')){

                        APP.HANDLER[target.callback].call(dest, target.data);
                    }
                    else{

                        target.callback.call(dest, target.data);
                    }
                }
            });
*/



            // Xone
/*
            var t0 = performance.now();

            for(var i = 0; i < 500; i++){

                (function(template){

                    CORE.setHTML(dest, template);

                })(template += '<div>test</div>');
            }

            var t1 = performance.now();
            console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

            CORE.setHTML(dest, template, function render_callback(){

                if(target.callback){

                    if(CORE.isType(target.callback, 'string')){

                        APP.HANDLER[target.callback].call(dest, target.data);
                    }
                    else{

                        target.callback.call(dest, target.data);
                    }
                }
            });
*/



            // html2idom (IncrementalDOM)
/*
            (function(dest, target, template, callback){

                var t0 = performance.now();
                for(var i = 0; i < 500; i++){

                    (function(template){

                        html2idom.patchHTML(dest, template);

                    })(template += '<div>test</div>');
                }

                var t1 = performance.now();
                console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

                callback();

            })(dest, target, template, function render_callback(){

                if(target.callback){

                    if(CORE.isType(target.callback, 'string')){

                        APP.HANDLER[target.callback].call(dest, target.data);
                    }
                    else{

                        target.callback.call(dest, target.data);
                    }
                }
            });
*/



            // diffHTML
/*
            (function(dest, target, template, callback){

                var t0 = performance.now();
                for(var i = 0; i < 500; i++){

                    (function(template){

                        diff.innerHTML(dest, template);

                    })(template += '<div>test</div>');
                }

                var t1 = performance.now();
                console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

                callback();

            })(dest, target, template, function render_callback(){

                if(target.callback){

                    if(CORE.isType(target.callback, 'string')){

                        APP.HANDLER[target.callback].call(dest, target.data);
                    }
                    else{

                        target.callback.call(dest, target.data);
                    }
                }
            });
*/

            // var template = null;
            // var templates = {};
            //
            // function hook(domNode){
            //
            //     domNode['innerHTML'] = template;
            // }
            //
            // if(window['InfernoDOM']){
            //
            //     template = html;
            //
            //     var innerHTML = window['Inferno']['createTemplate'](function(onCreated){
            //
            //         return {
            //
            //             'tag': "this",
            //             'attrs': {
            //                 'onCreated': onCreated
            //             }
            //         };
            //     });
            //
            //     window['InfernoDOM']['render'](innerHTML(hook), node);
            // }


            var crc_template;

            if((!CONFIG.ENABLE_HTML_CACHE && ((crc_template = CORE.crc32(template)) !== dest['_crc']))
             || (CONFIG.ENABLE_HTML_CACHE && (dest['_html'] !== template))){

                if(window['Inferno'] && window['InfernoDOM']){

                    CORE.paint(function(){

                        var render = window['Inferno']['createTemplate'](

                            function(onCreated){

                                return {

                                    'tag': 'vdom',
                                    'attrs': {
                                        'onCreated': onCreated
                                    }
                                };
                            }
                        );

                        window['InfernoDOM']['render'](render(function(node){

                            node.innerHTML = template;

                        }), dest);

                        if(CONFIG.ENABLE_HTML_CACHE) {

                            dest['_html'] = template;
                        }
                        else{

                            dest['_crc'] = crc_template;
                        }

                        renderCallback(dest, target);

                        template =
                        target =
                        dest = void 0;

                    }, dest.id);
                }
                else{

                    // var range = document.createRange();
                    //
                    // range.selectNodeContents(dest);
                    // //range.selectNode(dest);
                    // range.createContextualFragment('<vdom>' + template + '</vdom>');
                    // range.detach();

                    CORE.setHTML(dest, '<vdom>' + template + '</vdom>', function(){

                        renderCallback(dest, target);

                        target =
                        dest = null;
                    });
                }
            }
            else{

                if(target.callback){

                    if(CORE.isType(target.callback, 'string')){

                        APP.HANDLER[target.callback].call(dest, target.data);
                    }
                    else{

                        target.callback.call(dest, target.data);
                    }
                }
            }
        }
    };

    function renderCallback(dest, target){

        //APP.PLUGIN.Image.loadImages(CORE.getByClass('lazy'));

        var pull_elements = CORE.getByTag('xone-pull', dest);

        for(var i = 0; i < pull_elements.length; i++){

            APP.VIEW.PULL.register(pull_elements[i]);
        }

        pull_elements = CORE.getByTag('xone-zoom', dest);

        for(var i = 0; i < pull_elements.length; i++){

            APP.VIEW.ZOOM.register(pull_elements[i]);
        }

        if(target.callback){

            if(CORE.isType(target.callback, 'string')){

                APP.HANDLER[target.callback].call(dest, target.data);
            }
            else{

                target.callback.call(dest, target.data);
            }
        }
    }

    /**
     * @param {string=} lang
     */

    CONTROLLER.changeLanguage = function(lang){

        var nodes = CORE.getByClass('i18n');

        for(var i = 0; i < nodes.length; i++){

            var node = nodes[i];

            CORE.setText(node, (APP.LANG[lang || 'en'] || APP.LANG['en'])[

                node.classList ?

                    node.classList[1]
                :
                    node.className.split(' ')[1]
            ]);
        }
    };

})(
    /** @type {_controller_struct} */
   (APP.CONTROLLER),
    APP.ROUTE
);
