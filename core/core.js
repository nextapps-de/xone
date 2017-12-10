goog.provide('CORE');
goog.require('INTERFACE');
goog.require("ENV");
goog.require("Util.Console");
goog.require("Util.Cache");
goog.require('Util.Ajax');
goog.require('CONFIG');

/**
 * This is an exclusive extraction of the JS Pro Tools library "UTILS.js" as an
 * exclusive standalone version (without ASAP/AMD).
 *
 * Application Core
 * @name CORE
 * @namespace CORE
 * @const
 */

var CORE = (function(CORE){

    "use strict";

    var capitalize = function(text){

        return text[0].toUpperCase() + text.slice(1);
    };

    /** @type {_ajax_struct} */
    CORE.ajax = Util.Ajax;

    /** @type {_cache_struct} */
    var DOM_CACHE = new Util.Cache(3 * 60 * 1000, 1000, true);

    /**
     * @type {Object<string, string>}
     * @const
     * https://davidwalsh.name/vendor-prefix
     */

    var prefix = (function () {

        var styles = window.getComputedStyle(document.documentElement, '');

        var pre = (

            Array.prototype
                 .slice
                 .call(styles)
                 .join('')
                 .match(/-(moz|webkit|ms)-/) || (styles['OLink'] === '' && ['', 'o'])
        )[1];

        var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

        return {

            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };

    })();

    /**
     * @param {!*} value
     * @param {string=} type
     * @return {boolean}
     * @const
     */

    CORE.isType = function(value, type){

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

        return typeof value === 'string';
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isNumber = function(value){

        return typeof value === 'number';
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isBoolean = function(value){

        return typeof value === 'boolean';
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isDefined = function(value){

        return typeof value !== 'undefined';
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.hasValue = function(value){

        return (value || value === 0 || value === false || value === '') ? true : false;
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isArray = function(value){

        return value && (value.constructor === Array) ? true : false;
    };

    /**
     * @param {!*} value
     * @return {boolean}
     * @const
     */

    CORE.isObject = function(value){

        return value && (value.constructor === Object) ? true : false;
    };

    /**
     * @param {!Object|null} value
     * @return {boolean}
     * @const
     */

    CORE.isCollection = function(value){

        return HTMLCollection.prototype.isPrototypeOf(value) || NodeList.prototype.isPrototypeOf(value);
    };

    /**
     * @param {!Node|*} value
     * @return {boolean}
     * @const
     */

    CORE.isNode = function(value){

        return value && value.nodeType && value.nodeName ? true : false;
    };

    /**
     * @param {!Array<*>} value
     * @return {boolean}
     * @const
     */

    CORE.hasValues = function(value){

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

        return Object.keys(value).length ? true : false;
    };

    /**
     * @param {!Array<*>} value
     * @return {boolean}
     * @const
     */

    CORE.isEmpty = function(value){

        return value && (value.length === 0) ? true : false;
    };

    /**
     * @param {*} value
     * @return {boolean}
     * @const
     */

    CORE.isBlank = function(value){

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

        return (

            typeof element === 'string' ?

                CORE.getById(element)
            :
                /** @type {Node|Element|HTMLDocument|Window|null} */ (element)
        );
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
     * @param {string} str
     * @returns {number}
     */

    CORE.crc32 = function(str){

        var crc = 0 ^ (-1);

        for(var i = 0, length = str.length; i < length; i++){

            crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
        }

        return (crc ^ (-1)) >>> 0;
    };

    var regex_query = /[[:=+>*,~(]/;

    /**
     * https://jsperf.com/xone-dom-selector-performance
     * @param {!string} query
     * @param {boolean=} _flag_query_one
     * @return {Array<Node|null>|NodeList|Node|null}
     * @const
     */

    CORE.query = CORE.queryAll = function(query, _flag_query_one){

        if(!regex_query.test(query)){

            if(!CORE.contains(query, ' ')){

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

    /**
     * @param {!string} query
     * @return {Node|HTMLElement}
     */

    CORE.queryOne =  CORE.queryFirst = function(query){

        var result = CORE.query(query, /* query one: */ true);

        if(CORE.isCollection(result) || CORE.isArray(result)){

            return /** @type {Node|HTMLElement} */ (result[0]);
        }
        else{

            return /** @type {Node|HTMLElement} */ (result);
        }
    };

    /**
     * @param node
     * @param selector
     * @returns {*}
     */

    CORE.getClosest = function(node, selector){

        var direction = false;

        if(((selector[0] === '>') && (direction = true)) || (selector[0] === '<')){

            selector = CORE.trim(selector.substring(1));
        }

        if(direction){

            return node.querySelector(selector);
        }
        else{

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
    };

    /**
     * @param node
     * @param selector
     * @returns {*}
     */

    CORE.getPrevious = function(node, selector){

        var result = CORE.query(selector),
            length = result.length,
            i;

        var previous = node;
        var first = node.parentNode.firstChild;

        while((previous = previous.previousElementSibling) !== first){

            for(i = 0; i < length; i++){

                if(result[i] === previous) return previous;
            }
        }
    };

    /**
     * @param node
     * @param selector
     * @returns {*}
     */

    CORE.getNext = function(node, selector){

        var result = CORE.query(selector),
            length = result.length,
            i;

        var next = node;
        var last = node.parentNode.lastChild;

        while((next = next.nextElementSibling) !== last){

            for(i = 0; i < length; i++){

                if(result[i] === next) return next;
            }
        }
    };

    /**
     * @param {string} id
     * @return {Node|Element|HTMLElement|HTMLInputElement|null}
     * @const
     */

    CORE.getById = function getById(id){

        if(DEBUG){

            if(DOM_CACHE.get(id)) {

                APP.STATS.count_dom_cache++;
            }
            else {

                APP.STATS.count_dom++;
            }
        }

        if(CONFIG.ENABLE_DOM_CACHE){

            return /** @type  {Element} */ (

                DOM_CACHE.get(id) || (

                    DOM_CACHE.set(id, document.getElementById(id))
                )
            );
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

                            if(CORE.contains(data_attr, '.')){

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

        for(var i = 0; i < data.length; i++){

            CORE.buildPattern(pattern, parent, data[i]);
        }
    };

    CORE.removeNodes = function(element){

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
     * @type {Object<string, Element>}
     */

    CORE.DOM = {};

    CORE.paramsToString = function(params){

        var str = '';

        for(var property in params){

            if(params.hasOwnProperty(property)){

                str += (str ? '&' : '') + property + '=' + encodeURIComponent(params[property]);
            }
        }

        return str;
    };

    CORE.parseParams = function(str){

        var params = {};
        var pos= str.indexOf('?');

        if(pos !== -1){

            var keys = str.substring(pos + 1).split('&');
            var pair;

            for(var i = 0; i < keys.length; i++){

                pair = keys[i].split('=');

                params[pair[0]] = pair[1];
            }
        }

        return params;
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

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if(month.length < 2) month = '0' + month;
        if(day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    CORE.formatNumber = function(n, c, d, t){

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

        var container = CORE.getById('image-preload') || (function(){

                var node = CORE.parseNode(/** @type _pattern_struct */({

                    tag: 'div',
                    attr: {
                        'id': 'image-preload',
                        'style': 'z-index:-1;position:absolute;height:0;width:0;overflow:hidden;pointer-events:none'
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

        var time = window['performance'] || window[prefix.lowercase + 'Performance'] || {};

        time.now || (

            time.now = (

                time['now']
                || time[prefix.lowercase + 'Now']
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
     * @param {!Array} array
     * @param {*} item
     * @returns {number}
     */

    CORE.indexOf = function(array, item){

        var i = -1, len = array.length;

        while(++i < len){

            if(array[i] === item) return i;
        }

        return -1;
    };

    /**
     * @param {Array} array
     * @param {*} item
     * @returns {number}
     */

    CORE.lastIndexOf = function(array, item){

        var i = array.length;

        while(i--){

            if(array[i] === item) return i;
        }

        return -1;
    };

    var regex_cache = {};

    /**
     * @param {Array|string} string_or_array
     * @param {*} item
     * @returns {boolean}
     */

    CORE.contains = function(string_or_array, item){

        if(CORE.isArray(string_or_array)){

            return CORE.indexOf(/** @type {!Array} */ (string_or_array), item) !== -1;
        }
        else if(item.length){

            regex_cache[item] || (

                regex_cache[item] = new RegExp(item)
            );

            return regex_cache[item].test(string_or_array);
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
     * @param {!string} html
     * @returns {string}
     */

    CORE.strip = function(html){

        var tmp = document.createElement("div");

        tmp.innerHTML = html;

        var txt = tmp.textContent || tmp.innerText || "";

        while(txt.indexOf('  ') !== -1) {

            txt = txt.replace(/  /g, ' ');
        }

        while(txt.indexOf('\n ') !== -1) {

            txt = txt.replace(/\n /g, '\n');
        }

        return txt;
    };

    /**
     * @param {!Array} array
     * @param {!number} from
     * @param {!number} to
     * @returns {Array}
     */

    CORE.move = function(array, from, to) {

        if(to >= array.length) {

            var k = to - array.length;

            while((k--) + 1){

                array.push(void 0);
            }
        }

        return array.splice(to, 0, array.splice(from, 1)[0]);
    };

    /**
     *
     * @param {Object<string, *>} data
     * @returns {Array<string>}
     * @const
     */

    CORE.getKeys = function(data){

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

    CORE.insertAt = function(array, index, arrayToInsert) {

        array.splice.apply(array, [index, 0].concat(arrayToInsert));
    };

    /**
     * @param {number|boolean|number|Array|Object|Date|Element|null} val
     * @param {number=} max_level
     * @param {number=} _current_level
     * @returns {number|boolean|number|Array|Object|Date|Element|null}
     */

    CORE.clone = function(val, max_level, _current_level){

        if(val && (typeof val === 'object')){

            if(val.cloneNode){

                return val.cloneNode(true);
            }

            var constructor = val.constructor;

            if(constructor === Array){

                var length = val.length;

                if(length){

                    var type = typeof val[0];

                    if((type === 'number') ||
                       (type === 'string') ||
                       (type === 'boolean')){

                        return val.slice();
                    }

                    _current_level || (_current_level = 0);

                    if((max_level || (max_level === 0)) && (_current_level >= max_level)){

                        return null;
                    }

                    var copy = new Array(length);
                    var i = 0;

                    while(i < length){

                        copy[i] = CORE.clone(val[i++], max_level, _current_level + 1);
                    }

                    return copy;
                }

                return [];
            }
            else if(constructor === Object){

                if(val instanceof Date){

                    return new Date(val);
                }

                var keys = CORE.getKeys(val);
                var length = keys.length;
                var copy = {};

                if(length){

                    _current_level || (_current_level = 0);

                    var i = 0;
                    var key, type, item;

                    while(i < length){

                        key = keys[i++];
                        item = val[key];
                        type = typeof item;

                        if((type === 'number') ||
                           (type === 'string') ||
                           (type === 'boolean')){

                            copy[key] = item;
                        }
                        else{

                            if((max_level || (max_level === 0)) && (_current_level >= max_level)){

                                continue;
                            }

                            copy[key] = CORE.clone(item, max_level, _current_level + 1);
                        }
                    }
                }

                return copy;
            }
        }

        return val;
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

        round: function(number, minimum_increment){

            if(minimum_increment){

                return this.round(number / minimum_increment) * minimum_increment;
            }
            else{

                return number >= 0 ?

                    (number + 0.5) | 0
                :
                    (number - 0.5) | 0;
            }
        },

        rad: window.Math.PI / 180,
        cos: window.Math.cos,
        sin: window.Math.sin,
        rand: window.Math.random,
        abs: function abs(a){
            return (a < 0 ? -a : a);
        }
    };

    /**
     * @const
     */

    CORE.System = {

        /** @type {boolean} */
        isOpera: !!window['opera'] || navigator_match(' OPR/'), // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        /** @type {boolean} */
        isFirefox: (typeof window['InstallTrigger'] !== 'undefined'), // Firefox 1.0+
        /** @type {boolean} */
        isSafari: Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0, // At least Safari 3+: "[object HTMLElementConstructor]"
        /** @type {boolean} */
        isMSIE: /*@cc_on!@*/ false || !!document['documentMode'], // At least IE6
        /** @type {boolean} */
        isIphone: navigator_match('iPhone') && !window['MSStream'],
        /** @type {boolean} */
        isIpod: navigator_match('iPod'),
        /** @type {boolean} */
        isIpad: navigator_match('iPad'),
        /** @type {boolean} */
        isAndroid: navigator_match('Android'),
        /** @type {boolean} */
        isCordova: !!window['cordova'],
        /** @type {boolean} */
        isWkWebview: window['webkit'] && window['webkit']['messageHandlers'],
        /** @type {boolean} */
        isCrosswalk: navigator_match('XWalk'),
        /** @type {boolean} */
        isWebkit: 'WebkitAppearance' in document.documentElement.style,
        /** @type {boolean} */
        isRetina: window['devicePixelRatio'] > 1,
        /** @type {boolean} */
        //isOnline: function(){},
        /** @type {boolean} */
        //isOffline: !this.isOnline,
        /** @type {boolean} */
        isTouch: (function(){

            try {

                return !!document.createEvent("TouchEvent");
            }
            catch(e) {

                return false;
            }

        })(),
        /** @type {function(string):boolean} */
        is: function(type){

            if(DEBUG){

                if(typeof CORE.System['is' + type] === 'undefined'){

                    Console.warn("WARNING: The passed parameter '" + type + "' is not supported!");
                }
            }

            return CORE.System['is' + type];
        }
    };

    Object.defineProperties(CORE.System, {

        /** @lends {CORE.System} */ isOnline: {

            get: function isOnline(){

                return !!navigator['onLine'];
            }
        },

        /** @lends {CORE.System} */ isOffline: {

            get: function isOffline(){

                return !navigator['onLine'];
            }
        }
    });

    /** @type {boolean} */
    CORE.System.isChrome = !!window['chrome'] && !CORE.System.isOpera; // Chrome 1+

    /** @type {boolean} */
    CORE.System.isIOS = CORE.System.isIphone || CORE.System.isIpod || CORE.System.isIpad;

    /** @type {boolean} */
    CORE.System.isMobile = CORE.System.isIOS || CORE.System.isAndroid;

    /**
     * @param {!string} text
     * @returns {boolean}
     */

    function navigator_match(text){

        return !!navigator.userAgent.match(new RegExp(text, 'i'));
    }

    if(CORE.System.isIOS){

        // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios

        !!window['indexedDB'] ?

            CORE.System.isIOS8 = true
        :
            !!window['SpeechSynthesisUtterance'] ?

                CORE.System.isIOS7 = true
            :
                !!window['webkitAudioContext'] ?

                    CORE.System.isIOS6 = true
                :
                    !!window['matchMedia'] ?

                        CORE.System.isIOS5 = true
                    :
                        !!window.history && ('pushState' in window.history) ?

                            CORE.System.isIOS4 = true
                        :
                            CORE.System.isIOS3 = true
    }

    return CORE;

})({});
