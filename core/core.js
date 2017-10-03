goog.provide('CORE');
goog.require('INTERFACE');
goog.require("ENV");
goog.require('CONFIG');
goog.require('GRAPH');

/**
 * This is an exclusive extraction of the JS Pro Tools library "UTILS.js" as an
 * exclusive standalone version (without ASAP/AMD).
 *
 * Application Core
 * @name CORE
 * @namespace CORE
 * @const
 */

var CORE = {};

(function(){

    /**
     * @private
     * @type {XMLHttpRequest}
     */

    var xhr = null;

    var capitalize = function(text){

        if(DEBUG) GRAPH.register('CORE.capitalize');

        return text[0].toUpperCase() + text.slice(1);
    };

    /**
     * @type {string}
     * @const
     * https://davidwalsh.name/vendor-prefix
     */

    var prefix = (function(){

        var styles = window.getComputedStyle(document.documentElement, '');

        return (

            Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles['OLink'] === '' && ['', 'o'])

        )[1];

    })();

    /**
     * @type {string}
     * https://davidwalsh.name/vendor-prefix
     */

    //var prefix_css = capitalize(prefix);

    /**
     * @param {!*} value
     * @param {string=} type
     * @return {boolean}
     * @const
     */

    CORE.isType = function(value, type){

        if(DEBUG) GRAPH.register('CORE.isType');

        return (

            type ?

                typeof value === type
            :
                typeof value !== 'undefined'
        );
    };

    /**
     * @param {!string} value
     * @return {boolean}
     * @const
     */

    CORE.isString = function(value){

        if(DEBUG) GRAPH.register('CORE.isString');

        return typeof value === 'string';
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isNumber = function(value){

        if(DEBUG) GRAPH.register('CORE.isNumber');

        return typeof value === 'number';
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isBoolean = function(value){

        if(DEBUG) GRAPH.register('CORE.isBoolean');

        return typeof value === 'boolean';
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isDefined = function(value){

        if(DEBUG) GRAPH.register('CORE.isDefined');

        return typeof value !== 'undefined';
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.hasValue = function(value){

        if(DEBUG) GRAPH.register('CORE.hasValue');

        return (value || value === 0 || value === false || value === '') ? true : false;
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isArray = function(value){

        if(DEBUG) GRAPH.register('CORE.isArray');

        return value && (value.constructor === Array) ? true : false;
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isObject = function(value){

        if(DEBUG) GRAPH.register('CORE.isObject');

        return value && (value.constructor === Object) ? true : false;
    };

    /**
     * @param {!Object|null} value
     * @return {boolean}
     * @const
     */

    CORE.isCollection = function(value){

        if(DEBUG) GRAPH.register('CORE.isCollection');

        return HTMLCollection.prototype.isPrototypeOf(value) || NodeList.prototype.isPrototypeOf(value);
    };

    /**
     * @param {!Node|*} value
     * @return {boolean}
     * @const
     */

    CORE.isNode = function(value){

        if(DEBUG) GRAPH.register('CORE.isCollection');

        return value && value.nodeType && value.nodeName ? true : false;
    };

    /**
     * @param {!Array<*>} value
     * @return {boolean}
     * @const
     */

    CORE.hasValues = function(value){

        if(DEBUG) GRAPH.register('CORE.hasValues');

        if(value && value.length){

            for(var i = 0; i < value.length; i++){

                if(CORE.hasValue(value[i])) return true;
            }
        }

        return false;
    };

    /**
     * @param {!Object} value
     * @return {boolean}
     * @const
     */

    CORE.hasKeys = function(value){

        if(DEBUG) GRAPH.register('CORE.hasKeys');

        return Object.keys(value).length ? true : false;
    };

    /**
     * @param {!Array<*>} value
     * @return {boolean}
     * @const
     */

    CORE.isEmpty = function(value){

        if(DEBUG) GRAPH.register('CORE.isEmpty');

        return value && (value.length === 0) ? true : false;
    };

    /**
     * @param {*} value
     * @return {boolean}
     * @const
     */

    CORE.isBlank = function(value){

        if(DEBUG) GRAPH.register('CORE.isBlank');

        return value === "";
    };

    /**
     * @type Array<string>
     * @const
     */

    var KEYCODES = [

        '',             // 0
        '',             // 1
        '',             // 2
        '',             // 3
        '',             // 4
        '',             // 5
        '',             // 6
        '',             // 7
        'backspace',    // 8
        'tab',          // 9
        '',             // 10
        '',             // 11
        '',             // 12
        'enter',        // 13
        '',             // 14
        '',             // 15
        'shift',        // 16
        'ctrl',         // 17
        'alt',          // 18
        'pause/break',  // 19
        'caps lock',    // 20
        '',             // 21
        '',             // 22
        '',             // 23
        '',             // 24
        '',             // 25
        '',             // 26
        'esc',          // 27
        '',             // 28
        '',             // 29
        '',             // 30
        '',             // 31
        'space',        // 32
        'page up',      // 33
        'page down',    // 34
        'end',          // 35
        'home',         // 36
        'left',         // 37
        'up',           // 38
        'right',        // 39
        'down',         // 40
        '',             // 41
        '',             // 42
        '',             // 43
        '',             // 44
        'insert',       // 45
        'delete',       // 46
        '',             // 47
        '',             // 48
        '',             // 49
        ''              // 50
    ];

    // a-z
    for(var i = 97; i < 123; i++) {

        KEYCODES[i - 32] = String.fromCharCode(i);
    }

    // 0-9
    for(var i = 48; i < 58; i++) {

        KEYCODES[i] = String(i - 48);
    }

    // f1-f12
    for(var i = 1; i < 13; i++) {

        KEYCODES[i + 111] = 'f' + i;
    }

    // numpad
    for(var i = 0; i < 10; i++) {

        KEYCODES[i + 96] = 'numpad ' + i;
    }

    /**
     * @param {!Event|number} keyCode
     * @param {!Object<string, Function>} payload
     */

    CORE.switchKeyCode = function(keyCode, payload){

        if(typeof keyCode === 'number'){

            if(payload[KEYCODES[keyCode]]) {

                payload[KEYCODES[keyCode]]();
                return;
            }
        }
        else{

            if(payload[KEYCODES[keyCode.keyCode]]) {

                payload[KEYCODES[keyCode.keyCode]]();
                return;
            }
        }

        payload['else'] && payload['else']();
    };

    /**
     * @param {Node|Element|HTMLDocument|Window|null|string} element
     * @return {Node|HTMLElement|HTMLDocument|Window|Element|null}
     * @const
     */

    var getNode = CORE.getNode = function(element){

        if(DEBUG){

            GRAPH.register('CORE.getNode');

            if(CORE.isType(element, 'string')){

                if(CORE.DOM[/** @type {string} */ (element)]) APP.STATS.count_dom_cache++;
                else APP.STATS.count_dom++;
            }
        }

        return (

            CORE.isType(element, 'string') ?

                CORE.DOM[/** @type {string} */ (element)] || CORE.getById(/** @type {string} */ (element))
            :
                /** @type {Node|Element|HTMLDocument|Window|null} */ (element)
        );
    };

    //var hasClassList = CORE.isType(document.body.classList);

    /** @type {?Node} */
    var dom_console;
    /** @type {string} */
    var log = "";

    /**
     * @const
     * @final
     */

    CORE.console = {

        /**
         * @param {string|number=} text
         * @param {*=} obj
         * @param {string=} color
         */

        log: function(text, obj, color){

            if(DEBUG){

                GRAPH.register('CORE.console.log');

                if(color){

                    if(CORE.isType(obj)) window.console.log('%c' + text, 'color: ' + color, obj);
                    else window.console.log('%c' + text, 'color: ' + color);
                }
                else{

                    if(CORE.isType(obj)) window.console.log(text, obj);
                    else window.console.log(text);
                }

                if(text) log += text + '<br>';

                if((dom_console || (dom_console = CORE.getById('debug-log')) && CORE.getStyle(dom_console, 'display') !== 'none') || CONFIG.SHOW_DEBUG || APP.CONFIG.SHOW_DEBUG){

                    CORE.setHTML(dom_console, log, function(){

                        dom_console.scrollTop = dom_console.scrollHeight;
                    });
                }
            }
        },

        /**
         * @param {string|number=} param
         * @param {*=} obj
         */

        warn: function(param, obj){

            if(DEBUG) CORE.console.log(param, obj, 'orange');
        },

        /**
         * @param {string|number=} param
         * @param {*=} obj
         */

        err: function(param, obj){

            if(DEBUG) CORE.console.log(param, obj, 'red');
        },

        /**
         * @param {string|number=} param
         * @param {*=} obj
         */

        info: function(param, obj){

            if(DEBUG) CORE.console.log(param, obj, 'green');
        }
    };

    /**
     * @private
     * @return {XMLHttpRequest}
     */

    var createXHR = function createXHR(){

        if(DEBUG) GRAPH.register('CORE.createXHR');

        // IE7, Firefox, all modern browsers:

        if(typeof XMLHttpRequest !== 'undefined'){

            xhr = new XMLHttpRequest();
        }

        // IE6, IE5:

        if(!xhr){

            try{

                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e){

                try{

                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(e){

                    //xhr = null;
                }
            }
        }

        return xhr;
    };

    /**
     * @private
     * @param {string} type
     * @return {Object<string, string>}
     */

    var getDefaultRequestHeader = function getDefaultRequestHeader(type){

        if(DEBUG) GRAPH.register('CORE.getDefaultRequestHeader');

        /** @dict */

        return {

            "Accept": "application/json",
            "Content-Type": "application/json"
        };
    };

    /**
     * @private
     * @param {string} type
     * @param {string} url
     * @param {Object<string, string|number>|string=} params
     * @param {Function=} success
     * @param {Function=} error
     * @param {Object<string, string>=} header
     * @param {boolean=} async
     * @param {boolean=} clear
     * @param {boolean=} cache
     */

    var ajaxHandler = function ajaxHandler(type, url, params, success, error, header, async, clear, cache){

        if(DEBUG) GRAPH.register('CORE.ajaxHandler');

        type = type.toUpperCase();

        /* SET REQUEST HEADERS */

        /** @dict */
        var current_header = header || getDefaultRequestHeader(type);

        // TODO: handle FormData() type
        var str_params = /** @type {string|null} */ ((type === 'POST' || type === 'PATCH' || type === 'DELETE') && current_header['Accept'] === "application/json" ? JSON.stringify(params) : '');
        var cache_params = str_params.replace(/ /g, '').replace(/"/g, '').replace(/{/g, '/').replace(/}/g, '').replace(/:/g, '/');
        //var str_params = CORE.paramsToString(params || '');

        if(type === 'GET') url += '?' + CORE.paramsToString(params);

        /* CLEAR LAST OPEN REQUEST */

        if(clear && xhr && (typeof xhr.abort !== 'undefined')) xhr.abort();

        if(cache && type === 'GET' /*&& ((typeof cache === 'undefined') || cache)*/){

            var last_cache = /** @lends CORE.CACHE */ CORE.CACHE.get(url + cache_params);

            if(last_cache){

                if(DEBUG) CORE.console.log("Fetched from Cache: " + url + cache_params, last_cache);

                return success(last_cache);
            }
        }

        /* CREATE NEW XHR INSTANCE */

        xhr = createXHR();

        /* NON-AJAX FALLBACK */

        if(!xhr){

            if(type === 'GET') document.location.href = url + (str_params.length ? '?' : '') + str_params;

            return;
        }

        if(DEBUG){

            var debug_time = CORE.time.now();
        }

        /* ESTABLISH CONNECTION */

        xhr.open(type, url, ((typeof async === 'undefined') ? true : async));

        // TODO: Refused to set unsafe header "Content-length"
        /*
         if(type === "POST") {

         if(str_params.length) current_header["Content-length"] = str_params.length;
         }
         */

        for(var property in current_header){

            if(current_header.hasOwnProperty(property)){

                xhr.setRequestHeader(property, current_header[property]);
            }
        }

        (function(xhr, current_header, cache, type, url, str_params, success, error){

            if(current_header['Authorization']) xhr.withCredentials = true;

            /* SET CALLBACKS */

            xhr.onreadystatechange = function(e){

                if(xhr.readyState == 4){

                    var json = null;

                    if(xhr.status == 200 || xhr.status == 201){

                        //if(DEBUG) CORE.console.log(xhr.responseText);

                        try{

                            json = xhr.responseText ? JSON.parse(xhr.responseText) : [];
                        }
                        catch(e){}

                        if(cache && type === "GET" /*|| (type === "GET" && typeof cache === 'undefined')*/){

                            /** @lends CORE.CACHE */
                            CORE.CACHE.set(url + cache_params, json);
                        }

                        if(DEBUG){

                            APP.STATS.time_request += CORE.time.now() - debug_time;
                        }

                        if(success){

                            if(json === null) json = []; // FIX: NULL Responses

                            success(json);
                        }

                        //return;
                    }
                    else if(error){

                        try{

                            json = xhr.responseText ? JSON.parse(xhr.responseText) : [];
                        }
                        catch(e){}

                        if(json && json['error']){

                            APP.LAYOUT.show_message(json['error'].constructor === Object ? JSON.stringify(json['error']) : json['error']);
                        }

                        return error(xhr.status, json);
                    }
                }
                //else if(error) error(e);
            };

        })(xhr, current_header, cache, type, url, str_params, success, error);

        /* SEND PARAMETERS */

        xhr.send(str_params.length ? str_params : null);
    };

    /**
     * Application Cache
     * @struct
     * @public
     * @const
     * @name CACHE
     * @namespace Application Cache
     * @constructor
     * @implements {_cache_struct}
     */

    var CACHE = function CACHE(){

        /** @dict @private */
        var data = {};

        /** @dict @private */
        var timer = {};

        /**
         * @param {string} key
         * @param {*} val
         */

        this.set = function set(key, val){

            if(DEBUG) {

                GRAPH.register('CORE.CACHE.set');
                CORE.console.log("Set Cache to: " + key, val);
            }

            data[key] = val;
            timer[key] = (new Date()).getTime();
        };

        /**
         * @param {string} key
         * @param {boolean=} force
         * @return {*}
         */

        this.get = function get(key, force){

            if(DEBUG) {

                GRAPH.register('CORE.CACHE.get');
                CORE.console.log("Get Cache from: " + key);
            }

            if(timer[key]){

                if(force || (

                    ((new Date()).getTime() - timer[key]) < (CONFIG.MAX_CACHE_TIME || 300000)
                )){

                    return data[key];
                }
            }

            return timer[key] = data[key] = null;
        };

        /**
         * @return {Object<string, *>}
         */

        this.all = function all(){

            if(DEBUG) {

                GRAPH.register('CORE.CACHE.all');
                CORE.console.log("Get All from Cache");
            }

            return data;
        };

        /**
         * @param {string} key
         * @return {*}
         */

        this.remove = function remove(key){

            if(DEBUG) {

                GRAPH.register('CORE.CACHE.remove');
                CORE.console.log("Remove from Cache: " + key);
            }

            var val = data[key];

            data[key] = null;
            timer[key] = null;

            return val;
        };

        /**
         * @type {function()}
         */

        this.clear = function clear(){

            if(DEBUG) {

                GRAPH.register('CORE.CACHE.clear');
                CORE.console.log("Clear Cache");
            }

            data = {};
            timer = {};
        };
    };

    var crcTable = (function(){

        var c;
        var crcTable = [];

        for(var n = 0; n < 256; n++){

            c = n;

            for(var k = 0; k < 8; k++){

                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }

            crcTable[n] = c;
        }

        return crcTable;

    })();

    /**
     * @type {Array<Function>|Array<Array<Function, number|null>>}
     */

    var EXEC_STACK = [];

    /**
     * @type {boolean}
     */

    var EXEC = false;

    /**
     * Task Processor
     */

    function runStack(){

        if(DEBUG) GRAPH.register('CORE.runStack');

        EXEC_STACK.splice(0, 1)[0]();

        if(EXEC_STACK.length) {

            CORE.async(runStack);
        }
        else {

            EXEC = false;
        }
    }

    var regex_query = /[[:=+>*,~(]/;

    /**
     * https://jsperf.com/xone-dom-selector-performance
     * @param {!string} query
     * @param {boolean=} _flag_query_one
     * @return {Array<Node|null>|NodeList|Node|null}
     * @const
     */

    CORE.query = CORE.queryAll = function(query, _flag_query_one){

        if(DEBUG) {

            GRAPH.register('CORE.query');
        }

        if(!regex_query.test(query)){

            if(query.indexOf(' ') === -1){

                var firstChar = query[0];

                if(firstChar === '.'){

                    return CORE.getByClass(query.substring(1));
                }

                var dot_position = query.indexOf('.');

                if(dot_position > 0){

                    var class_name = query.substring(dot_position + 1);

                    // if(firstChar === '#'){
                    //
                    //     return CORE.getByClass(class_name, query.substring(1, dot_position));
                    // }
                    // else{

                        var nodes = [];
                        var found_nodes = CORE.getByTag(query.substring(0, dot_position));

                        for(var i = 0; i < found_nodes.length; i++){

                            if(CORE.hasClass(found_nodes[i], class_name)){

                                nodes[nodes.length] = found_nodes[i];
                            }
                        }

                        return nodes;
                    //}
                }
                else if(firstChar === '#'){

                    return CORE.getById(query.substring(1));
                }
                else{

                    return CORE.getByTag(query);
                }
            }
            else{

                var parts = query.split(" ");

                if(parts.length === 2){

                    var part1 = parts[0];
                    var part2 = parts[1];
                    var firstChar1 = part1[0];
                    var firstChar2 = part2[0];

                    if(firstChar1 === '#'){

                        if(firstChar2 === '.'){

                            return CORE.getByClass(part2.substring(1), part1.substring(1));
                        }
                        else if(firstChar2 !== '#'){

                            return CORE.getByTag(part2, part1.substring(1));
                        }
                    }
                    else if(firstChar1 === '.'){

                        if(firstChar2 !== '#' && firstChar2 !== '.'){

                            var nodes = [];
                            var found_nodes = CORE.getByClass(part1.substring(1));

                            for(var i = 0; i < found_nodes.length; i++){

                                nodes = nodes.concat(

                                    Array.prototype.slice.call(

                                        CORE.getByTag(part2, found_nodes[i])
                                    )
                                );
                            }

                            return nodes;
                        }
                    }
                    else if(firstChar2 === '.'){

                        var nodes = [];
                        var class_name = part2.substring(1);

                        if(part1 === 'document' || part1 === 'body'){

                            return CORE.getByClass(class_name);
                        }
                        else{

                            var found_nodes = CORE.getByTag(part1);

                            for(var i = 0; i < found_nodes.length; i++){

                                nodes = nodes.concat(

                                    Array.prototype.slice.call(

                                        CORE.getByClass(class_name, found_nodes[i])
                                    )
                                );
                            }

                            return nodes;
                        }
                    }
                    // else if(firstChar2 === '#'){
                    //
                    //     return CORE.getByTag(part1, part2.substring(1));
                    // }
                }
            }
        }

        if(DEBUG) {

            APP.STATS.count_dom++;
        }

        return document[_flag_query_one ? 'querySelector' : 'querySelectorAll'](query);
    };

    CORE.queryOne =  CORE.queryFirst = function(query){

        var result = CORE.query(query, /* query one: */ true);

        if(CORE.isCollection(result) || CORE.isArray(result)){

            return result[0];
        }
        else{

            return result;
        }
    };

    CORE.getClosest = function(node, selector){

        var direction = false;

        if(((selector[0] === '<') && (direction = true)) || (selector[0] === '>')){

            selector = CORE.trim(selector.substring(1));
        }

        if(direction){

            if(node.closest){

                return node.closest(selector);
            }
            else{

                var result = CORE.query(selector),
                    length = result.length,
                    i;

                while(node = node.parentElement){

                    for(i = 0; i < length; i++){

                        if(result[i] === node) return node;
                    }
                }
            }
        }
        else{

            return node.querySelector(selector);
        }
    };

    /**
     * @param {string} id
     * @return {Node|Element|HTMLElement|HTMLInputElement|null}
     * @const
     */

    CORE.getById = function getById(id){

        if(DEBUG){

            GRAPH.register('CORE.getById');

            if(CORE.DOM[id]) {

                APP.STATS.count_dom_cache++;
            }
            else {

                APP.STATS.count_dom++;
            }
        }

        if(CONFIG.ENABLE_DOM_CACHE){

            return CORE.DOM[id] || (CORE.DOM[id] = document.getElementById(id));
        }
        else{

            return document.getElementById(id);
        }
    };

    /**
     * @param {string} classname
     * @param {Node|HTMLElement|HTMLInputElement|Element|Window|string=} context
     * @return {NodeList}
     * @const
     */

    CORE.getByClass = function getByClass(classname, context){

        if(DEBUG) {

            GRAPH.register('CORE.getByClass');

            APP.STATS.count_dom++;
        }

        return (

            context ?

                getNode(context)
            :
                document

        ).getElementsByClassName(classname);
    };

    /**
     * @param {string} tag
     * @param {Node|HTMLElement|HTMLInputElement|Element|Window|string=} context
     * @return {NodeList}
     * @const
     */

    CORE.getByTag = function getByTag(tag, context){

        if(DEBUG) {

            GRAPH.register('CORE.getByTag');

            APP.STATS.count_dom++;
        }

        return (

            context ?

                getNode(context)
            :
                document

        ).getElementsByTagName(tag);
    };

    /**
     * @param {Node|NodeList|Array<Node>|string|null} node
     * @return {string}
     * @const
     */

    CORE.getValue = function getValue(node){

        if(DEBUG) GRAPH.register('CORE.getValue');

        if(typeof node === 'string') node = CORE.query(node);
        if(node.length >= 0) node = node[0];

        return node.value;
    };

    /**
     * @param {Node|NodeList|Array<Node>|string|null} node
     * @param {string} value
     * @const
     */

    CORE.setValue = function setValue(node, value){

        if(DEBUG) GRAPH.register('CORE.setValue');

        if(typeof node === 'string') node = CORE.query(node);

        if(node.length >= 0) {

            for(var i = 0; i < node.length; i++) {

                node[i].value = value;
            }
        }
        else{

            node.value = value;
        }
    };

    /**
     * @param {_pattern_struct} pattern
     * @param {Object<number|string>=} data
     * @returns {Element}
     * @const
     */

    CORE.parseNode = function parseNode(pattern, data){

        if(DEBUG) GRAPH.register('CORE.parseNode');

        /* CREATE NODE */

        var element = document.createElement(pattern.tag || 'div');
        var attr = pattern.attr;

        /* SET NODE ATTRIBUTES */

        if(attr) for(var val in attr){

            if(attr.hasOwnProperty(val)){

                var attr_val = attr[val];

                // TODO: join attribute objects into string during pre building!!!

                var val_is_string = (typeof attr_val === 'string');

                if(val === 'className' && val_is_string === false){

                    element.className = attr_val.join(' ');
                }
                else if(val === 'style' && val_is_string === false){

                    var style = "";

                    for(var style_attr in attr[val]){

                        if(attr_val.hasOwnProperty(style_attr)){

                            style += (style_attr + '=' + attr_val[style_attr] + ';');
                        }
                    }

                    element.setAttribute(val, style);
                }
                else if(data && val === 'data' && val_is_string === false){

                    // TODO: we only support one data field
                    for(var data_attr in attr_val){

                        if(attr_val.hasOwnProperty(data_attr) /*&& data[data_attr]*/){

                            // split property key into components accordingly to its model names

                            if(data_attr.indexOf('.') !== -1){

                                var split = data_attr.split('.');
                                var model = split[0];
                                var index = split[1];

                                element.appendChild(document.createTextNode(data[model][index]));
                            }
                            else{

                                element.appendChild(document.createTextNode(data[data_attr]));
                            }

                            break;
                        }
                    }
                }
                else{

                    element.setAttribute(val, attr_val);
                }
            }
        }

        /* SET NODE TEXT CONTENT */

        if(pattern.text) element.appendChild(document.createTextNode(pattern.text));

        /* RETURN NODE */

        return element;
    };

    /**
     * Recursive Build Pattern
     * @param {Array<_pattern_struct>} pattern
     * @param {Node|Element|DocumentFragment} parent
     * @param {Object<string, *>=} data
     * @param {boolean=} recursive
     * @returns {Node|Element|DocumentFragment}
     * @const
     */

    CORE.buildPattern = function buildPattern(pattern, parent, data, recursive){

        if(DEBUG) GRAPH.register('CORE.buildPattern');

        parent || (parent = document.createDocumentFragment());

        if(pattern){

            if(typeof pattern.length === "undefined") pattern = [pattern];

            //var offscreen_fragment = recursive ? parent : document.createDocumentFragment();

            for(var i = 0; i < pattern.length; i++){

                /* PARSE PATTERN */

                var element = CORE.parseNode(pattern[i], data);

                /* APPEND NODE */

                //offscreen_fragment.appendChild(element);
                //parent.appendChild(element);

                /* APPEND CHILD NODES RECURSIVELY */

                if(pattern[i].child) CORE.buildPattern(pattern[i].child, element, data, true);

                parent.appendChild(element);
                //offscreen_fragment.appendChild(element);
            }

            //if(!recursive) parent.appendChild(offscreen_fragment);
        }

        /* RETURN PARENT NODE */

        return parent;
    };

    CORE.buildData = function buildData(pattern, parent, data){

        if(DEBUG) GRAPH.register('CORE.buildData');

        for(var i = 0; i < data.length; i++){

            CORE.buildPattern(pattern, parent, data[i]);
        }
    };

    CORE.removeNodes = function(element){

        if(DEBUG) GRAPH.register('CORE.removeNodes');

        var child;

        while(child = element.lastChild){

            element.removeChild(child);
        }
    };

	/**
	 * @param {string|HTMLInputElement} input
	 */

	CORE.focusInput = function(input){

		if(typeof input === 'string'){

			input = CORE.query(input)[0];
		}

		CORE.paint(function(){

			var tmp = input.value;

			input.focus();
			input.value = '';
			input.value = tmp;
		});
	};

    /**
     * @type {_cache_struct}
     */

    CORE.CACHE = new CACHE();

    /**
     * @type {Object<string, Element>}
     */

    CORE.DOM = {};

    /**
     * @public
     * @param {_ajax_struct} params
     */

    CORE.ajax = function ajax(params){

        if(DEBUG) GRAPH.register('CORE.ajax');

        ajaxHandler(
            params.type || 'GET',
            params.url || '/',
            params.params || '',
            params.success,
            params.error,
            params.header,
            params.async,
            params.clear,
            params.cache
        );
    };

    CORE.paramsToString = function(params){

        if(DEBUG) GRAPH.register('CORE.paramsToString');

        var str = '';

        for(var property in params){

            if(params.hasOwnProperty(property)){

                str += (str ? '&' : '') + property + '=' + encodeURIComponent(params[property]);
            }
        }

        return str;
    };

    /**
     * @param {!number} length
     * @param {string=} charset
     * @returns {string}
     */

    CORE.randomString = function(length, charset) {

        charset || (charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');

        var str = '', len = charset.length + 0.4999999;

        for(var i = 0; i < length; i++) {

            str += charset.charAt((Math.random() * len - 0.5) | 0);
        }

        return str;
    };

	/**
	 * @param {string} value
	 * @return {string}
	 */

	CORE.trim = function(value){

		if(value){

			var length = value.length,
				start = 0,
				end = length;

			while(start < length && ((value[start] === " ") || (value[start] === "\t") || (value[start] === "\n"))){

				start++
			}
			while(length > start && ((value[end - 1] === " ") || (value[end - 1] === "\t") || (value[end - 1] === "\n"))){

				end--;
			}

			if(start || (end !== length)) {

				return value.substring(start, end);
			}
		}

    	return value;
	};

    /**
     * @param {Array<string|number>} array
     * @param {string} field
     * @returns {Array<string|number>}
     */

    CORE.unique = function(array, field){

        if(DEBUG) GRAPH.register('CORE.unique');

        var checkDuplicates = {};
        var unqiue_array = [];

        for(var i = 0, length = array.length; i < length; i++){

            var value = field ? array[i][field] : array[i];

            checkDuplicates[value] || ((checkDuplicates[value] = true) && (

                unqiue_array[unqiue_array.length] = value
            ));
        }

        return unqiue_array;
    };

    /**
     * @param {Array<*>} array_1
     * @param {Array<*>} array_2
     * @returns {Array<*>}
     */

    CORE.merge = function(array_1, array_2){

        var args = arguments || [array_1, array_2], arg;

        for(var i = 1; i < args.length; i++){

            if(arg = args[i]) {

                array_1 = (array_1 || []).concat(arg);
            }
        }

        return array_1;
    };

    /**
     * @param {Array<*>} array
     * @returns {Array<*>}
     */

    CORE.reverse = function(array){

        if(DEBUG) GRAPH.register('CORE.reverse');

        var length = array.length;
        var reversed_array = new Array(length);

        for(var i = 0; i < length; i++){

            reversed_array[i] = array[length - i - 1];
        }

        return reversed_array;
    };

    var compare_asc = function(a, b){

        return ("" + a).localeCompare(b);
    };

    var compare_desc = function(a, b){

        return ("" + b).localeCompare(a);
    };

    var compare_numeric_asc = function(a, b){

        //if(a === void 0) return 1;
        //if(b === void 0) return -1;
        if(a === null) return 1;
        if(b === null) return -1;
        if(isNaN(a)) return 1;
        if(isNaN(b)) return -1;

        return a - b;
    };

    var compare_numeric_desc = function(b, a){

        // NOTE: native Array.sort() does not traverse through undefined indizes
        //if(a === void 0) return 1;
        //if(b === void 0) return -1;
        if(a === null) return -1;
        if(b === null) return 1;
        if(isNaN(a)) return -1;
        if(isNaN(b)) return 1;

        return a - b;
    };

    /**
     * @param {!Array<*>} array
     * @param {Function=} cmp
     * @returns {Array<*>}
     */

    CORE.sort = function(array, cmp){

        return array.sort(cmp || compare_asc);
    };

    /**
     * @param {!Array<*>} array
     * @returns {Array<*>}
     */

    CORE.sortAsc = function(array){

        return array.sort(compare_asc);
    };

    /**
     * @param {!Array<*>} array
     * @returns {Array<*>}
     */

    CORE.sortDesc = function(array){

        return array.sort(compare_desc);
    };

    /**
     * @param {!Array<*>} array
     * @param {Function=} cmp
     * @returns {Array<*>}
     */

    CORE.sortNum = function(array, cmp){

        return array.sort(cmp || compare_numeric_asc);
    };

    /**
     * @param {!Array<*>} array
     * @returns {Array<*>}
     */

    CORE.sortNumAsc = function(array){

        return array.sort(compare_numeric_asc);
    };

    /**
     * @param {!Array<*>} array
     * @returns {Array<*>}
     */

    CORE.sortNumDesc = function(array){

        return array.sort(compare_numeric_desc);
    };

    /**
     * @param {!Array<*>} array
     * @param {number=} times
     * @returns {Array<*>}
     */

    CORE.shuffle = function(array, times){

        var length = array.length, tmp, index;

        for(var i = 0; i < length; i++){

            index = (Math.random() * length) | 0;
            tmp = array[i];
            array[i] = array[index];
            array[index] = tmp;
        }

        return (

            times && --times ?

                CORE.shuffle(array, times)
            :
                array
        );
    };

    /**
     * @param {Date} date
     * @returns {string}
     */

    CORE.formatDate = function(date){

        if(DEBUG) GRAPH.register('CORE.formatDate');

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if(month.length < 2) month = '0' + month;
        if(day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    CORE.formatNumber = function(n, c, d, t){

        if(DEBUG) GRAPH.register('CORE.formatNumber');

        c = typeof c === 'number' ? c : 2;
        d = d || ".";
        t = t || ",";

        var i = parseInt(n = CORE.Math.abs(+n || 0).toFixed(c), 10) + "",
            j = i.length;

        j = j > 3 ? j % 3 : 0;

        return (n < 0 ? "-" : "") + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + CORE.Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    /**
     * @param {Array<string>} images
     */

    CORE.preloadImages = function(images){

        if(DEBUG) GRAPH.register('CORE.preloadImages');

        var container = CORE.getById('image-preload') || (function(){

                var node = CORE.parseNode(/** @type _pattern_struct */({

                    tag: 'div',
                    attr: {
                        'id': 'image-preload',
                        'style': 'display:none;position:absolute;height:0px;width:0px;overflow:hidden;pointer-events:none'
                    }
                }));

                document.body.appendChild(node);

                return node;
            })();

        var img;

        for(var i = 0; i < images.length; i++){

            img = new Image();
            img.setAttribute('lazyload', 'true');
            img.src = images[i];

            CORE.setStyle(img, {

                'display': 'none',
                'height': '0px',
                'width': '0px'
            });

            container.appendChild(img);
        }
    };

    /**
     * @param {Function} fn
     * @param {number=} delay
     * @return {number|null}
     */

    CORE.async = function(fn, delay){

        if(DEBUG) GRAPH.register('CORE.async');

        return window.setTimeout(fn, delay);
    };



    /**
     * @param {Array<Function>|Function} fn
     * @param {number=} delay
     */

    CORE.stack = function(fn, delay){

        if(DEBUG) GRAPH.register('CORE.stack');

        var len = EXEC_STACK.length;

        if(fn.constructor === Array){

            for(var i = 0; i < fn.length; i++){

                EXEC_STACK[len++] = fn[i];
            }
        }
        else{

            EXEC_STACK[len] = fn;
        }

        if(!EXEC){

            EXEC = true;

            CORE.async(runStack, delay);
        }
    };

    CORE.getStackLength = function(){

        return EXEC_STACK.length;
    };

    CORE.loadScript = function loadScript(src, callback){

        var ready = false;

        var ready_fn = callback ? function(){

            if(!ready && (!this.readyState || this.readyState === 'complete')){

                ready = true;

                if(callback) callback();
            }

        } : void 0;

        document.body.appendChild(CORE.parseNode({

            tag: 'script',
            attr: {

                "type": 'text/javascript',
                "async": true,
                "src": src,
                "onload": ready_fn,
                "onreadystatechange": ready_fn
            }
        }));
    };

    CORE.loadStyle = function loadStyle(src, media){

        document.body.appendChild(CORE.parseNode({

            tag: 'link',
            attr: {

                "rel": 'stylesheet',
                "type": 'text/css',
                "href": src,
                "media": media || 'all'
            }
        }));
    };

    CORE.time = (function(){

        if(DEBUG) GRAPH.register('CORE.time');

        var time = window['performance'] || window[prefix + 'Performance'] || {};

        time.now || (

            time.now = (

                time['now']
                || time[prefix + 'Now']
                || Date['now']
                || function(){
                    return (new Date()).getTime();
                }
            )
        );

        return time;

    })();

    CORE.capitalize = capitalize;

    CORE.prefix = prefix;

    /**
     * @param {string} str
     * @returns {number}
     */

    CORE.crc32 = function(str){

        if(DEBUG) GRAPH.register('CORE.crc32');

        var crc = 0 ^ (-1);

        for(var i = 0; i < str.length; i++){

            crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
        }

        return (crc ^ (-1)) >>> 0;
    };

    /**
     * @param {Array<number|string|boolean>|string} source
     * @param {number|string|boolean|null|undefined} find
     * @returns {number}
     */

    CORE.count = function(source, find){

        var count = 0;

        if(typeof source === 'string'){

            var pos = 0;
            var length = find.length;

            while((pos = source.indexOf('' + find, pos)) !== -1) {

                count++;
                pos += length;
            }
        }

        else if(CORE.isArray(source)){

            var length = source.length;

            for(var i = 0; i < source.length; i++){

                if(source[i] === find){

                    count++;
                }
            }
        }
        else{

            if(DEBUG) throw new Error("'CORE.count' unsupported type passed.");
        }

        return count;
    };

    /**
     * @param {string|Array<*>} source
     * @param {*} find
     * @param {*} replace
     * @returns {string|Array<*>}
     */

    CORE.replace = function(source, find, replace){

        if(typeof source === 'string'){

            var pos = 0;
            var find_length = find.length;
            var replace_length = replace.length;

            while((pos = source.indexOf('' + find, pos)) !== -1){

                source = source.substring(0, pos) + replace + source.substring(pos + find_length);
                pos += replace_length;
            }
        }

        else if(source.length){

            var length = source.length;

            for(var i = 0; i < source.length; i++){

                if(source[i] === find){

                    source[i] = replace;
                }
            }
        }
        else{

            if(DEBUG) throw new Error("'CORE.replace' unsupported type passed.");
        }

        return source;
    };

    /**
     * @param {Function} fn
     * @returns {Array<string>}
     */

    var parse_fn = function parse_fn(fn){

        if(DEBUG) GRAPH.register('CORE.parse_fn');

        var fn_string = fn.toString();
        var fn_parameter = fn_string.substring(fn_string.indexOf('(') + 1, fn_string.indexOf(')'));
        // support multiple parameter:
        //fn_parameter = fn_parameter.split(',')[0];
        // support single parameter:
        if(fn_parameter.indexOf(',') !== -1) fn_parameter = fn_parameter.substring(0, fn_parameter.indexOf(','));
        //TODO: fix regexp collision (parameter bezeichner kann auch in einer lokalen variable vorkommen)
        var fn_content = fn_string.substring(fn_string.indexOf('{') + 1, fn_string.length - 1);
        var fn_pre = /*CORE.replace(*/fn_content.substring(0, fn_content.indexOf('return '))/*, fn_parameter, '$local')*/;
        var fn_return = /*CORE.replace(*/fn_content.substring(fn_content.indexOf('return ') + 7, fn_content.length).replace(';', '')/*, fn_parameter, '$local')*/;

        return [

            fn_parameter,
            fn_pre,
            fn_return
        ];
    };

    /**
     * @param {Function} fn
     * @returns {Function}
     */

    CORE.registerEach = function registerEach(fn){

        if(DEBUG) GRAPH.register('CORE.registerEach');

        var parsed_fn = parse_fn(fn);
        var parameter = parsed_fn[0];
        var fn_content = (

            'var $i = 0, $length = $self.length, ' + parameter + ';' +

            'for(; $i < $length; $i++){' +

                parameter + ' = $self[$i];' +
                parsed_fn[1] + parsed_fn[2] + ';' +
            '}' +

            'return $self;'
        );

        //console.log(Function('$self', fn_content).toString());

        return Function('$self', fn_content);
    };

    /**
     * @param {Function} fn
     * @returns {Function}
     */

    CORE.registerMap = function registerMap(fn){

        if(DEBUG) GRAPH.register('CORE.registerMap');

        var parsed_fn = parse_fn(fn);
        var parameter = parsed_fn[0];
        var fn_content = (

            'var $i = 0, $length = $self.length, $copy = $edit ? $self : new Array($length), ' + parameter + ';' +

            'for(; $i < $length; $i++){' +

                parameter + ' = $self[$i];' +
                parsed_fn[1] +
                '$copy[$i] = ' + parsed_fn[2] + ';' +

            '}' +

            'return $copy;'
        );

        return Function('$self', '$edit', fn_content);
    };

    /**
     * @param {Function} fn
     * @returns {Function}
     */

    CORE.registerFilter = function registerFilter(fn){

        if(DEBUG) GRAPH.register('CORE.registerFilter');

        var parsed_fn = parse_fn(fn);
        var parameter = parsed_fn[0];

        var fn_content = (

            'var $i = 0, $length = $self.length, $copy = $edit ? $self : [], $count = 0, ' + parameter + ';' +

            'for(; $i < $length; $i++){' +

                parameter + ' = $self[$i];' +
                parsed_fn[1] +
                'if($edit){ if(!(' + parsed_fn[2] + ')){$copy.splice($i--, 1); $length--;}}' +
                'else if(' + parsed_fn[2] + ') $copy[$count++] = ' + parameter + ';' +

            '};' +

            'return $copy;'
        );

        return Function('$self', '$edit', fn_content);
    };

    /**
     * @param {Array} array
     * @param {*} item
     * @returns {boolean}
     */

    CORE.contains = function(array, item){

        if(DEBUG) GRAPH.register('CORE.contains');

        var i = array.length;

        while(i--){

            if(array[i] === item) return true;
        }

        return false;
    };

    /**
     * @param {!Array} array
     * @param {*} content
     * @param {number=} start
     * @param {number=} count
     * @return {!Array}
     */

    CORE.fill = function(array, content, start, count){

        var length = (

            count >= 0 ?

                Math.min(start + count, array.length)
            :
                array.length
        );

        for(var i = start || 0; i < length; i++){

            array[i] = content;
        }

        return array;
    };

    /**
     *
     * @param {Object<string, *>} data
     * @returns {Array<string>}
     * @const
     */

    CORE.getKeys = function(data){

        if(DEBUG) GRAPH.register('CORE.getKeys');

        if(data){

            if(Object.keys){

                return Object.keys(data);
            }

            var tmp = [], length = 0;

            for(var key in data){

                if(data.hasOwnProperty(key)){

                    tmp[length++] = key;
                }
            }

            return tmp;
        }

        return [];
    };

    CORE.assign = function(target, source){

        if(!source || typeof source !== 'object'){

            return target;
        }

        var props = Object.keys(source);
        var prop;
        var length = props.length;

        for(var i = 0; i < length; i++){

            prop = props[i];
            target[prop] = source[prop];
        }
    };

    /**
     * @param {!string} query
     * @returns {Object<string, *>}
     */

    CORE.parseQuery = function(query){

        var payload = {};

        if((query = String(query)).length){

            var pos;

            if(query[0] === '?'){

                query = query.substring(1);
            }
            else if((pos = query.indexOf('?')) !== -1){

                query = query.substring(pos + 1);
            }

            var array = query.split('&');
            var entry;
            var float;
            var value;

            for(var i = 0; i < array.length; i++){

                entry = array[i].split('=');

                if(entry[0]){

                    value = entry[1];

                         if(value === 'false') value = false;
                    else if(value === 'true') value = true;
                    else if(value === 'null') value = null;
                    else if(value.length === String(float = parseFloat(value)).length) value = float;
                    else value = decodeURIComponent(value || '');

                    payload[decodeURIComponent(entry[0])] = value;
                }
            }
        }

        return payload;
    };

    /**
     * @param {!string} src
     * @param {!Function} callback
     * @param {string=} format
     * @param {number=} quality
     */

    CORE.imageToDataUrl = function(src, callback, format, quality){

        if(DEBUG) GRAPH.register('CORE.imageToDataUrl');

        var img = new Image();

        /**
         * @this {Image}
         */

        img.crossOrigin = "anonymous";

        img.onload = function(){

            var canvas = document.createElement('canvas');

            canvas.height = /** @type {Image} */ (this).height;
            canvas.width = /** @type {Image} */ (this).width;
            canvas.getContext('2d').drawImage(this, 0, 0);

            callback(canvas.toDataURL(format || "image/jpeg", quality || 1.0));
        };

        img.src = src;
    };

    /**
     * @param {!string} url
     * @param {!Function} callback
     */

    CORE.readAsDataUrl = function(url, callback){

        var xhr = new XMLHttpRequest();

        xhr.onload = function() {

            var reader = new FileReader();

            reader.onloadend = function(){

                callback(this['result']);
            }

            if(xhr.response) {

                reader.readAsDataURL(/** @type {!Blob} */ (xhr.response));
            }
        };

        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    };

    CORE.getCookies = function(){

        var cookie = decodeURIComponent(document.cookie);
        var cookie_entries = cookie.split(';');
        var result = {}, entry, pair;

        for(var i = 0; i < cookie_entries.length; i++){

            entry = cookie_entries[i];

            while(entry.charAt(0) === ' ') entry = entry.substring(1);

            pair = entry.split('=');
            result[pair[0]] = pair[1];
        }

        return result;
    };

    /**
     * @const
     * @struct
     */

    CORE.Math = {

        /**
         * @param {!Array<number>|number} a
         * @param {!number=} b
         * @param {!number=} c
         * @returns {!number}
         */

        min: function min(a, b, c){

            if(DEBUG) GRAPH.register('CORE.Math.min');

            if(typeof c !== 'undefined'){

                a = Array.prototype.slice.call(arguments);
            }

            else if(typeof b !== 'undefined'){

                return /** @type {number} */ (

                    b < a ?

                        b
                    :
                        a
                );
            }

            if(CORE.isArray(a)){

                var min = a[0];

                for(var i = 1; i < a.length; i++){

                    if(a[i] < min){

                        min = a[i];
                    }
                }

                return min;
            }

            return /** @type {number} */ (a);
        },

        /**
         * @param {!Array<number>|number} a
         * @param {!number=} b
         * @param {!number=} c
         * @returns {!number}
         */

        max: function max(a, b, c){

            if(DEBUG) GRAPH.register('CORE.Math.max');

            if(typeof c !== 'undefined'){

                a = Array.prototype.slice.call(arguments);
            }

            else if(typeof b !== 'undefined'){

                return /** @type {number} */ (

                    a < b ?

                        b
                    :
                        a
                );
            }

            if(CORE.isArray(a)){

                var max = a[0];

                for(var i = 0; i < a.length; i++){

                    if(i === 0){

                        max = a[0];
                    }
                    else if(a[i] > max){

                        max = a[i];
                    }
                }

                return max;
            }

            return /** @type {number} */ (a);
        },

        /**
         * @param {!Array<number>|number} a
         * @param {!number=} b
         * @param {!number=} c
         * @returns {!number}
         */

        med: function med(a, b, c){

            if(DEBUG) GRAPH.register('CORE.Math.med');

            if(typeof c !== 'undefined'){

                a = Array.prototype.slice.call(arguments);
            }

            else if(typeof b !== 'undefined'){

                return /** @type {number} */ ((a + b) / 2);
            }

            if(CORE.isArray(a)){

                var sum = 0;

                for(var i = 0; i < a.length; i++){

                    sum += a[i];
                }

                return sum / a.length;
            }

            return /** @type {number} */ (a);
        },

        rad: window.Math.PI / 180,
        cos: window.Math.cos,
        sin: window.Math.sin,
        round: function(number){
            return number >= 0 ? (number + 0.5) | 0 : (number - 0.5) | 0;
        },
        rand: window.Math.random,
        abs: function abs(a){
            if(DEBUG) GRAPH.register('CORE.Math.abs');
            return (a < 0 ? -a : a);
        }
    };

    /**
     * @const
     * @struct
     */

    CORE.Browser = {

        /** @type {boolean} */
        isOpera: !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0, // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        /** @type {boolean} */
        isFirefox: (typeof window['InstallTrigger'] !== 'undefined'), // Firefox 1.0+
        /** @type {boolean} */
        isSafari: Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0, // At least Safari 3+: "[object HTMLElementConstructor]"
        /** @type {boolean} */
        isMSIE: /*@cc_on!@*/ false || !!document['documentMode'] // At least IE6
    };

    /** @type {boolean} */
    CORE.Browser.isChrome = !!window['chrome'] && !CORE.Browser.isOpera; // Chrome 1+
    /** @type {function(string):boolean} */
    CORE.Browser.is = fn_is;

    /**
     * @const
     * @struct
     */

    CORE.System = {

        /** @type {boolean} */
        isIphone: !!navigator.userAgent.match(/iPhone/i),
        /** @type {boolean} */
        isIpod: !!navigator.userAgent.match(/iPod/i),
        /** @type {boolean} */
        isIpad: !!navigator.userAgent.match(/iPad/i),
        /** @type {boolean} */
        isAndroid: !!navigator.userAgent.match(/Android/i),
        /** @type {boolean} */
        isCordova: !!window['cordova']
    };

    /** @type {boolean} */
    CORE.System.isIOS = CORE.System.isIphone || CORE.System.isIpod || CORE.System.isIpad;
    /** @type {boolean} */
    CORE.System.isMobile = CORE.System.isIOS || CORE.System.isAndroid;
    /** @type {function(string):boolean} */
    CORE.System.is = fn_is;

    /**
     * @param {!string} type
     * @returns {boolean}
     */

    function fn_is(type){

        var fn_name = 'is' + type[0].toUpperCase() + type.substring(1);

        if(DEBUG){

            if(typeof this[fn_name] === 'undefined'){

                CORE.console.warn("WARNING: The passed type '" + type + "' is not defined!");
            }
        }

        return this[fn_name];
    }

})();
