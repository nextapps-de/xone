goog.provide('CORE.PAINT');
goog.require('CORE');
goog.require('INTERFACE');
goog.require('CONFIG');

/**
 * This is an exclusive extraction of the JS Pro Tools library "UTILS.js" as an
 * exclusive standalone version (without ASAP/AMD).
 * This build also includes several parts of "FAT.js".
 */

(function() {

    "use strict";

    var auto_prefix_styles = false;

    // == PRIVATE MEMBERS ==

    /**
     * @type {string}
     */

    var prefix_css = CORE.prefix.css;

    /**
     * @type {string|null}
     */

    var PAINT_TIMER = null;

    /**
     * @type {Array<HTMLElement|null>}
     */

    var CSS_STACK = [];

    /**
     * @type {Array<HTMLElement|null>}
     */

    var CLASS_STACK = [];

    /**
     * @type {Array<HTMLElement|null>}
     */

    var HTML_STACK = [];

    /**
     * @type {boolean}
     */

    var force_sync = false;

    /**
     * @param {Node|NodeList|Array<Node>|string|null} node
     * @param {string} class_name
     * @param {boolean=} search_and_remove
     * @return {boolean}
     * @const
     */

    CORE.hasClass = function hasClass(node, class_name, search_and_remove) {

        if(typeof node === 'string') node = CORE.query(node);

        //todo allow check if multiple nodes has a class
        if(node.length >= 0) node = node[0];

		if(!CONFIG.ENABLE_CLASS_CACHE){

			return node.classList.contains(class_name);
		}

        var current_cache_new;

        if(current_cache_new = node['_class_new']) {

            if(current_cache_new[class_name] !== false && CORE.isType(current_cache_new[class_name])){

                return !!current_cache_new[class_name];
            }
        }
        else{

            node['_class_new'] = {};
        }

        var current_cache;

        if(current_cache = node['_class']){

            if(CORE.isType(current_cache[class_name])){

                return !!current_cache[class_name];
            }
        }
        else{

            current_cache = (node['_class'] = {});
        }

        return (current_cache[class_name] = !!(node.classList.contains(class_name) ? 1 : 0));
    };

    /**
     * @param {Element|Node|NodeList|Array<Node>|string|null} node
     * @param {Array<string>|string} class_name
     * @param {Function=} callback
     * @const
     */

    CORE.addClass = function addClass(node, class_name, callback) {

        if(typeof node === 'string') {

            node = CORE.query(node);
        }

        if(node.length >= 0){

            var i = 0;

            while(i < node.length) {

                CORE.addClass(node[i++], class_name, callback && (i === node.length - 1) ? callback : void 0);
            }

            return;
        }

        if(CORE.isType(class_name, 'string')) class_name = [class_name];

        if(!CONFIG.ENABLE_CLASS_CACHE){

			return node.classList.add.apply(node.classList, class_name);
		}

        var current_cache = node['_class'] || (node['_class'] = {});
        var current_cache_new = node['_class_new'] || (node['_class_new'] = {});
        var current_cache_keys = node['_class_keys'] || (node['_class_keys'] = []);
        var len = CLASS_STACK.length;
        var keys_len = current_cache_keys.length;

        for(var i = 0; i < class_name.length; i++){

            var current_class = class_name[i];

            if(force_sync){

                node.classList.add(current_class);
                current_cache_new[current_class] = false;
                current_cache[current_class] = 1;

                if(DEBUG) APP.STATS.count_class++;
            }
            else{

                if(current_cache[current_class] !== 1){

                    if(current_cache_new[current_class] !== 1){

                        CLASS_STACK[len++] = /** @type {HTMLElement} */ (node);

                        current_cache_new[current_class] = 1;
                        if(!CORE.contains(current_cache_keys, current_class)) current_cache_keys[keys_len++] = current_class;
                    }
                    else if(DEBUG) APP.STATS.count_class_cache++;
                }
                else{

                    current_cache_new[current_class] = false;

                    if(DEBUG) APP.STATS.count_class_cache++;
                }

                // if(hasClassList) {
                //
                //     node.classList.add.apply(node.classList, class_name);
                // }
                //
                // /* FALLBACK */
                //
                // else if(!CORE.hasClass(node, class_name[i])) {
                //
                //     node.className += (node.className ? ' ' : '') + class_name[i];
                // }
            }
        }

        if(callback) CORE.paint(function(){

            callback.call(node);
        });

        if(len || callback) {

            registerPaint();
        }
    };

    /**
     * @param {Node|NodeList|Array<Node>|string|null} node
     * @param {Array<string>|string} class_name
     * @param {Function=} callback
     * @const
     */

    CORE.removeClass = function removeClass(node, class_name, callback) {

        if(typeof node === 'string') {

            node = CORE.query(node);
        }

        if(node.length >= 0){

            var i = 0;
            while(i < node.length) CORE.removeClass(node[i++], class_name, callback && i === node.length - 1 ? callback : void 0);
            return;
        }

        if(CORE.isType(class_name, 'string')) class_name = [class_name];

		if(!CONFIG.ENABLE_CLASS_CACHE){

			return node.classList.remove.apply(node.classList, class_name);
		}

        var current_cache = node['_class'] || (node['_class'] = {});
        var current_cache_new = node['_class_new'] || (node['_class_new'] = {});
        var current_cache_keys = node['_class_keys'] || (node['_class_keys'] = []);
        var len = CLASS_STACK.length;
        var keys_len = current_cache_keys.length;

        for(var i = 0; i < class_name.length; i++) {

            var current_class = class_name[i];

            if(force_sync){

                node.classList.remove(current_class);
                current_cache_new[current_class] = false;
                current_cache[current_class] = 0;

                if(DEBUG) APP.STATS.count_class++;
            }
            else{

                if(current_cache[current_class] !== 0){

                    if(current_cache_new[current_class] !== 0){

                        CLASS_STACK[len++] = /** @type {HTMLElement} */ (node);

                        current_cache_new[current_class] = 0;
                        if(!CORE.contains(current_cache_keys, current_class)) current_cache_keys[keys_len++] = current_class;
                    }
                    else if(DEBUG) APP.STATS.count_class_cache++;
                }
                else{

                    current_cache_new[current_class] = false;

                    if(DEBUG) APP.STATS.count_class_cache++;
                }
            }

            // if(hasClassList) {
            //
            //     node.classList.remove(class_name);
            // }
            //
            // /* FALLBACK */
            //
            // else CORE.hasClass(node, class_name, /* search_and_remove: */ true)
        }

        if(callback) CORE.paint(function(){

            callback.call(node);
        });

        if(len || callback) {

            registerPaint();
        }
    };

    /**
     * @param {Node|NodeList|Array<Node>|string|null} node
     * @param {string} class_name
     * @param {Function=} callback
     * @param {boolean=} toggle_state
     * @const
     */

    CORE.toggleClass = function toggleClass(node, class_name, callback, toggle_state) {

        if(CORE.isType(toggle_state)){

            if(toggle_state){

                CORE.addClass(node, class_name, callback);
            }
            else{

                CORE.removeClass(node, class_name, callback);
            }

            return;
        }

        if(typeof node === 'string'){

            node = CORE.query(node);
        }

        if(node.length >= 0){

            for(var i = 0; i < node.length; i++){

                CORE.toggleClass(node[i], class_name, i === node.length - 1 ? callback : void 0);
            }

            return;
        }

		if(!CONFIG.ENABLE_CLASS_CACHE){

			return node.classList.toggle(class_name);
		}

        //if(CORE.isType(class_name, 'string')) class_name = [class_name];

        var current_cache = node['_class'] || (node['_class'] = {});
        var current_cache_new = node['_class_new'] || (node['_class_new'] = {});
        var current_cache_keys = node['_class_keys'] || (node['_class_keys'] = []);
        var len = CLASS_STACK.length;
        var keys_len = current_cache_keys.length;

        if(force_sync){

            node.classList.toggle(class_name);
            current_cache_new[class_name] = false;
            current_cache[class_name] = node.classList.has(class_name) ? 1 : 0;

            if(DEBUG) APP.STATS.count_class++;
        }
        else{

            if(CORE.isType(current_cache_new[class_name])){

                if((current_cache_new[class_name] === false) || !((current_cache[class_name] === 0 && current_cache_new[class_name] === 1) || (current_cache[class_name] === 1 && current_cache_new[class_name] === 0))){

                    CLASS_STACK[len++] = /** @type {HTMLElement} */ (node);

                    if(!CORE.contains(current_cache_keys, class_name)) current_cache_keys[keys_len] = class_name;
                    current_cache_new[class_name] = (current_cache_new[class_name] === false ? current_cache : current_cache_new)[class_name] ? 0 : 1;
                }
                else{

                    current_cache_new[class_name] = false;

                    if(DEBUG) APP.STATS.count_class_cache++;
                }
            }
            else{

                CLASS_STACK[len++] = /** @type {HTMLElement} */ (node);

                if(!CORE.isType(current_cache[class_name])) current_cache[class_name] = node.classList.contains(class_name) ? 1 : 0;
                if(!CORE.contains(current_cache_keys, class_name)) current_cache_keys[keys_len] = class_name;
                current_cache_new[class_name] = current_cache[class_name] ? 0 : 1;
            }
        }

        /*
        if(current_cache[class_name] !== 0) {

            if(current_cache_new[class_name] !== 0){

                if(!keys_len){

                    CLASS_STACK[len++] = node;
                }

                current_cache[class_name] = node.classList.contains(class_name) ? 1 : 0;
                current_cache_new[class_name] = current_cache[class_name] ? 0 : 1;
                current_cache_keys[keys_len] = class_name;
            }
        }
        else{

            current_cache_new[class_name] = false;
        }
        */

        // if(hasClassList) {
        //
        //     node.classList.toggle(class_name);
        // }
        //
        // /* FALLBACK */
        //
        // else if(!CORE.hasClass(node, class_name, /* search_and_remove: */ true)) {
        //
        //     CORE.addClass(node, class_name);
        // }

        if(callback) CORE.paint(function(){

            callback.call(node);
        });

        if(len || callback) {

            registerPaint();
        }
    };

    /**
     * @param {Node|NodeList|Array<Node>|string|null} _obj
     * @param {string=} style
     * @return {CSSStyleDeclaration|CSSValue|string|undefined} The style value as type string
     * @const
     */

    CORE.getStyle = function getStyle(_obj, style){

        var obj = (

            typeof _obj === 'string' ?

                CORE.query(_obj)
            :
                _obj
        );

        if(obj.length >= 0) obj = obj[0];

        if(!obj){

            if(DEBUG){

                Console.err('ERROR: Element was not found: ' + _obj);
            }

            return;
        }

        if(style) {

            if(auto_prefix_styles){

                if((style === 'transition') || (style === 'transform')){

                    style = prefix_css + style;
                }
            }

			if(!CONFIG.ENABLE_STYLE_CACHE){

				return obj.style[style] || window.getComputedStyle(obj, null)[style];
			}

            var val;
            var current_cache = obj['_style'];
            var current_cache_new = obj['_style_new'];
            //var current_cache_keys = obj['_style_keys'];

            if(current_cache_new) {

                val = current_cache_new[style];

                if(val !== false && CORE.isType(val)){

                    return val;
                }
            }
            else{

                obj['_style_new'] = {};
                obj['_style_keys'] = [];
            }

            if(current_cache) {

                val = current_cache[style];

                if(CORE.isType(val)){

                    return val;
                }
            }
            else{

                current_cache = (obj['_style'] = {});
            }

            /**
             * @type {CSSStyleDeclaration}
             */

            var css = obj.style;

            for(var i = 0; i < css.length; i++) {

                if(css[i] === style) {

                    return (current_cache[style] = css[style]);
                }
            }

            return (current_cache[style] =

                //obj.currentStyle ?

                    //obj.currentStyle[style]
                //:
                    //typeof window.getComputedStyle !== 'undefined' ?

                        //TODO: Simple Polyfill return css[style] or obj.currentStyle
                        window.getComputedStyle(/** @type {HTMLElement} */(obj), null)[style]
                    //:
                    //    css[style]
            );
        }
        else{

			return window.getComputedStyle(obj, null);
        }
    };

    /**
     * https://jsperf.com/xone-style-performance/
     * @param {Node|NodeList|Array<Node>|string|null} _obj
     * @param {Object<string, string|number>|string|number} css
     * @param {string|number=} val
     * @const
     */

    CORE.setStyle = function setStyle(_obj, css, val){

        var obj = (

            typeof _obj === 'string' ?

                CORE.query(_obj)
            :
                _obj
        );

        if(!obj){

            if(DEBUG){

                Console.err('ERROR: Element was not found: ' + _obj);
            }

            return;
        }

        var length = obj.length;

        if(length >= 0){

            for(var i = 0; i < length; i++){

                CORE.setStyle(obj[i], css, val)
            }

            return;
        }

		if(!CONFIG.ENABLE_STYLE_CACHE){

			if(CORE.isType(val)){

			    if(auto_prefix_styles){

                    if((css === 'transition') || (css === 'transform')){

                        if((css === 'transition') && CORE.contains('' + val, 'transform')){

                            val = val.replace('transform', prefix_css + 'transform');
                        }

                        css = prefix_css + css;
                    }
                }

                obj.style[css] = val;

                if(DEBUG) APP.STATS.count_css++;

				return;
			}
			else{

				for(var css_key in css) {

                    if(css.hasOwnProperty(css_key)){

                        if(auto_prefix_styles){

                            if((css_key === 'transition') || (css_key === 'transform')){

                                if((css_key === 'transition') && CORE.contains(css[css_key], 'transform')){

                                    css[css_key] = css[css_key].replace('transform', prefix_css + 'transform');
                                }

                                obj.style[prefix_css + css_key] = css[css_key];
                            }
                            else obj.style[css_key] = css[css_key];
                        }
					    else obj.style[css_key] = css[css_key];

                        if(DEBUG) APP.STATS.count_css++;
                    }
				}

				return;
			}
		}

        //var style = obj.style;

        var current_cache = obj['_style'] || (obj['_style'] = {});
        var current_cache_new = obj['_style_new'] || (obj['_style_new'] = {});
        var current_cache_keys = obj['_style_keys'] || (obj['_style_keys'] = []);
        var len = CSS_STACK.length;
        var keys_len = current_cache_keys.length;

        if(CORE.isType(val)) {

            if(auto_prefix_styles){

                if((css === 'transition') || (css === 'transform')){

                    if((css === 'transition') && CORE.contains('' + val, 'transform')){

                        val = val.replace('transform', prefix_css + 'transform');
                    }

                    css = prefix_css + css;
                }
            }

            // if(!CORE.isType(current_cache[css])){
            //
            //     current_cache[css] = CORE.getStyle(obj, css);
            // }

            if(force_sync){

                if(current_cache[css] !== val){

                    obj.style[css] = val;

                    current_cache_new[css] = false;
                    current_cache[css] = val;

                    if(DEBUG) APP.STATS.count_css++;
                }
                else if(DEBUG) APP.STATS.count_css_cache++;
            }
            else{

                if(current_cache[css] !== val){

                    if(current_cache_new[css] === false || current_cache_new[css] !== val){

                        CSS_STACK[len++] = /** @type {HTMLElement} */ (obj);

                        current_cache_new[css] = val;
                        if(!CORE.contains(current_cache_keys, css)) current_cache_keys[keys_len] = css;
                    }
                    else if(DEBUG) APP.STATS.count_css_cache++;
                }
                else{

                    current_cache_new[css] = false;

                    if(DEBUG) APP.STATS.count_css_cache++;
                }
            }
        }
        else {

            for(var css_key in css) {

                if(css.hasOwnProperty(css_key)){

                    val = css[css_key];

                    if(auto_prefix_styles){

                        if((css_key === 'transition') || (css_key === 'transform')){

                            if((css_key === 'transition') && CORE.contains(css[css_key], 'transform')){

                                val = css[css_key].replace('transform', prefix_css + 'transform');
                                css[css_key] = val;
                            }

                            css_key = prefix_css + css_key;
                        }
                    }

                    // if(!CORE.isType(current_cache[css_key])){
                    //
                    //     current_cache[css_key] = CORE.getStyle(obj, css_key);
                    // }

                    if(force_sync){

                        if(current_cache[css_key] !== val){

                            obj.style[css_key] = val;

                            current_cache_new[css_key] = false;
                            current_cache[css_key] = val;

                            if(DEBUG) APP.STATS.count_css++;
                        }
                        else if(DEBUG) APP.STATS.count_css_cache++;
                    }
                    else{

                        if(current_cache[css_key] !== val){

                            if(current_cache_new[css_key] === false || current_cache_new[css_key] !== val){

                                CSS_STACK[len++] = /** @type {HTMLElement} */ (obj);

                                current_cache_new[css_key] = val;
                                if(!CORE.contains(current_cache_keys, css_key)) current_cache_keys[keys_len++] = css_key;
                            }
                            else if(DEBUG) APP.STATS.count_css_cache++;
                        }
                        else{

                            current_cache_new[css_key] = false;

                            if(DEBUG) APP.STATS.count_css_cache++;
                        }
                    }
                }
            }
        }

        if(len) {

            registerPaint();
        }
    };

    /**
     * @param {Node|NodeList|Array<Node>|string|null} obj
     * @param {string} css
     * @param {Array<string|number>} val
     * @const
     */

    CORE.toggleStyle = function(obj, css, val){

        if(CORE.getStyle(obj, css) === val[0]){

            CORE.setStyle(obj, css, val[1]);
        }
        else{

            CORE.setStyle(obj, css, val[0]);
        }
    };

    /**
     * @param {Node|NodeList|Array<Node>|string|null} obj
     * @param {Object<string, string|number>|string|number} style
     * @param {string|number=} val
     * @const
     */

    CORE.css = function css(obj, style, val){

        if((typeof val !== 'undefined') || (style && typeof style !== 'string')){

            CORE.setStyle(obj, style, val);
        }
        else{

            return CORE.getStyle(obj, /** @type {string|undefined} */ (style));
        }
    };

    /**
     * @param {string} selector
     * @param {Object<string, string|number>|string} rules
     * @param {string|number=} value
     */

    CORE.addCssRule = function(selector, rules, value) {

        var sheet = document.styleSheets[document.styleSheets.length - 1];
        var css_string = '';

        if(value){

            css_string = rules + ':' + value + ';';
        }
        else if(rules){

            var keys = Object.keys(/** @type {Object} */ (rules) || {});
            var length = keys.length;
            var key = '';

            for(var i = 0; i < length; i++){

                css_string += (key = keys[i]) + ':' + rules[key] + ';';
            }
        }

        if(css_string) {

            if(sheet['insertRule']) {

                sheet['insertRule'](selector + "{" + css_string + "}", sheet.cssRules ? sheet.cssRules.length : 0);
            }
            else if(sheet['addRule']) {

                sheet['addRule'](selector, css_string, sheet.cssRules ? sheet.cssRules.length : 0);
            }
        }
    };

    /**
     * Set text content to a node
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} node
     * @param {string} val
     */

    CORE.setText = function setText(node, val){

        if(typeof node === 'string') {

            node = CORE.query(node);
        }

        if(node.length >= 0 /*node.constructor === Array || HTMLCollection.prototype.isPrototypeOf(node)*/){

            for(var i = 0; i < node.length; i++){

                CORE.setText(node[i], val);
            }

            return;
        }

        var tmpObj;

        /* FASTEST */
        if((tmpObj = node.firstChild) && CORE.isType(tmpObj.nodeValue)) tmpObj.nodeValue = val;
        else if(CORE.isType(node.textContent)) node.textContent = val;
        else if(CORE.isType(node.innerText)) node.innerText = val;
        /* SLOWEST */
        else CORE.setHTML(node, val);
    };

    /**
     * Set HTML content to a node
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} _node
     * @param {string|Array<string>} _html
     * @param {boolean|Function=} _async
     */

    CORE.setHTML = function setHTML(_node, _html, _async){

        var node = _node;
        var html = _html;
        var async = _async;

        var has_callback = CORE.isType(async, 'function');

        if(typeof node === 'string') {

            node = CORE.query(node);
        }

		if(CORE.isArray(html)) {

			html = html.join('');
		}

        var length = node.length;

        if(length >= 0 /*node.constructor === Array || HTMLCollection.prototype.isPrototypeOf(node)*/){

            for(var i = 0; i < length; i++){

                CORE.setHTML(node[i], html, has_callback ? (i === length - 1 ? async : true) : async);
            }

            return;
        }

        if(!CONFIG.ENABLE_HTML_CACHE){

            var crc_template = CORE.crc32(html);

            if(node['_crc'] !== crc_template){

                node.innerHTML = html;
                node['_crc'] = crc_template;

                if(DEBUG) APP.STATS.count_html++;
            }
            else{

                if(DEBUG) APP.STATS.count_html_cache++;
            }
        }
        else{

            var html_new = node['_html_new'];

            // if(!CORE.isType(node['_html'])){
            //
            //     node['_html'] = node.innerHTML;
            // }

            if(node['_html'] !== html){

                if(async){

                    if(html_new !== html) {

                        if(html_new === false || !CORE.isType(html_new)) {

                            //TODO: check gc issues when caching dom
                            HTML_STACK[HTML_STACK.length] = /** @type {HTMLElement} */ (node);
                        }
                        else if(DEBUG) APP.STATS.count_html_cache++;

                        node['_html_new'] = html;
                    }
                    else {

                        if(DEBUG) APP.STATS.count_html_cache++;
                    }

                    if(has_callback) CORE.paint(function(){

                        async.call(node);
                    });

                    if(HTML_STACK.length || has_callback) {

                        registerPaint();
                    }

                    return;
                }
                else{

                    node.innerHTML = (node['_html'] = html);

                    if(DEBUG) APP.STATS.count_html++;
                }
            }
            else{

                node['_html_new'] = (html_new = false);

                if(DEBUG) APP.STATS.count_html_cache++;
            }

            if(html_new) node['_html_new'] = html;
        }

        if(has_callback) {

			/** @type {Function} */ (async).call(node);
		}
    };

    /**
     * Get HTML content of a node
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} node
     */

    CORE.getHTML = function setHTML(node){

        if(typeof node === 'string') {

            node = CORE.query(node);
        }

        if(node.length >= 0) node = node[0];

        var html;

		if(!CONFIG.ENABLE_HTML_CACHE){

			return node.innerHTML;
		}

        return (

            ((html = node['_html_new']) !== false) && CORE.isType(html) ?

                html
            :
                ((html = node['_html']) !== false) && CORE.isType(html) ?

                    html
                :
                    node['_html'] = node.innerHTML

        );
    };

    /**
     * @param {Node|HTMLDocument|Window|NodeList|Array<Node>|string|null} node
     * @param {number|null=} from
     * @param {number=} to
     * @param {number=} duration
     * @param {number=} start
     */

    CORE.scrollTo = function(node, from, to, duration, start){

        if(typeof node === 'string') {

            node = CORE.query(node);
        }

        if(node.length >= 0) node = node[0];

        from || (from = node.scrollTop);
        to || (to = 0);
        duration || (duration = CORE.Math.abs(to - from) < 5000 ? 350 : 0);

        if(from !== to) {

            var webkit_overflow_touch = node.style.webkitOverflowScrolling === 'touch';

            if(webkit_overflow_touch){

                node.style.overflow = 'hidden';
                //node.style.webkitOverflowScrolling = 'auto';
            }

            CORE.paint(function(time){

                time -= start || (start = time);

                if(time >= duration) {

                    if(webkit_overflow_touch){

                        node.style.overflow = '';
                        //node.style.webkitOverflowScrolling = 'touch';
                    }

                    return node.scrollTop = to;
                }

                if(from <= 0) from = 0;
                if(to <= 0) to = 0;

                /* RECALL */

                CORE.scrollTo(node, from, to, duration, start);

                /* Sine Curve Easing */

                var delta = to - from;
                var progress = time / duration * Math.PI / 2;
                var position = delta * Math.sin(progress);

                node.scrollTop = from + position;
            });
        }
    };

    CORE.scrollToTop = function scrollToTop(node){

        CORE.scrollTo(node);
    };

    CORE.repaint = function(element){

        if(!element){

            element = document.body;
        }
        else if(typeof element === 'string') {

            element = CORE.queryOne(element);
        }

        return !!element.offsetHeight;
    };

    /**
     * @param element
     * @param styles
     * @param {Function=} callback
     */

    CORE.prepareStyle = function prepareStyle(element, styles, callback){

        // asynchronous:

        if(callback){

            // disable transitions
            CORE.addClass(element, 'no-transition');

            // perform style preparations
            CORE.setStyle(element, styles);

            // register to next frame
            return CORE.paint(function(){

                // forces repaint
                //CORE.repaint(element);

                // enable transitions
                CORE.removeClass(element, 'no-transition');

                // execute callback
                callback.call(element);

                element =
                callback = void 0;
            });
        }

        // synchronous:

        else{

            force_sync = true;

            // disable transitions
            CORE.addClass(element, 'no-transition');

            // perform style preparations
            CORE.setStyle(element, styles);

            // enable transitions
            CORE.removeClass(element, 'no-transition');

            // forces repaint
            //CORE.repaint(element);

            force_sync = false;
        }
    };

    /**
     * @param element
     * @param param_1
     * @param {number|string=} param_2
     */

    CORE.forceStyle = function(element, param_1, param_2){

        force_sync = true;

        // perform style preparations
        CORE.setStyle(element, param_1, param_2);

        force_sync = false;
    };

    // --------------------------------------------------------------------------

    /**
     *
     */

    function registerPaint(){

        PAINT_TIMER || (

            PAINT_TIMER = CORE.paint(processPaint, 'process-paint')
        );
    }

    /**
     * @param {number} time
     * @const
     */

    function processPaint(time) {

        var len, i;

        if(len = HTML_STACK.length) {

            for(i = 0; i < len; i++) {

                var current_node = HTML_STACK[i];

                if(current_node['_html_new'] !== false) {

                    if(current_node['_html_new'] !== current_node['_html']) {

                        current_node.innerHTML = (current_node['_html'] = current_node['_html_new']);

                        if(DEBUG) APP.STATS.count_html++;
                    }
                    else if(DEBUG) APP.STATS.count_html_cache++;

                    current_node['_html_new'] = false;
                }
                else if(DEBUG) APP.STATS.count_html_cache++;
            }

            HTML_STACK = [];
        }

        if(len = CSS_STACK.length) {

            for(i = 0; i < len; i++) {

                var current_node = CSS_STACK[i];
                var current_cache = current_node['_style'];
                var current_cache_new = current_node['_style_new'];
                var current_cache_keys = current_node['_style_keys'];
                var style = null;

                for(var x = 0; x < current_cache_keys.length; x++) {

                    var key = current_cache_keys[x];
                    var current_cache_value = current_cache_new[key];

                    if(current_cache_value !== false) {

                        if(current_cache_value !== current_cache[key]) {

                            (style || (style = current_node.style))[key] = (current_cache[key] = current_cache_value);

                            if(DEBUG) APP.STATS.count_css++;

                            // NOTE: Remove Cache when Style gets Reset
                            // if(current_cache_value === ''){
                            //     current_cache[key] = void 0;
                            // }
                        }
                        else if(DEBUG) APP.STATS.count_css_cache++;

                        current_cache_new[key] = false;
                    }
                    else if(DEBUG) APP.STATS.count_css_cache++;
                }

                current_node['_style_keys'] = [];
            }

            if(DEBUG) APP.STATS.count_css += len;

            CSS_STACK = [];
        }

        if(len = CLASS_STACK.length) {

            for(i = 0; i < len; i++) {

                var current_node = CLASS_STACK[i];
                var current_cache = current_node['_class'];
                var current_cache_new = current_node['_class_new'];
                var current_cache_keys = current_node['_class_keys'];
                var add_classes = [];
                var remove_classes = [];

                for(var x = 0; x < current_cache_keys.length; x++) {

                    var key = current_cache_keys[x];

                    if(current_cache_new[key] !== false) {

                        if(current_cache[key] !== current_cache_new[key]) {

                            if(current_cache_new[key] === 1) {

                                add_classes[add_classes.length] = key;
                                current_cache[key] = 1;
                            }
                            else {

                                remove_classes[remove_classes.length] = key;
                                current_cache[key] = 0;
                            }

                            if(DEBUG) APP.STATS.count_class++;
                        }
                        else if(DEBUG) APP.STATS.count_class_cache++;

                        current_cache_new[key] = false;
                    }
                    else if(DEBUG) APP.STATS.count_class_cache++;
                }

                if(remove_classes.length) {

                    current_node.classList.remove.apply(current_node.classList, remove_classes);
                    // TODO: changing classes may also change style values?
                    //current_node['_style'] = {};
                }

                if(add_classes.length) {

                    current_node.classList.add.apply(current_node.classList, add_classes);
                    // TODO: changing classes may also change style values?
                    //current_node['_style'] = {};
                }

                current_node['_class_keys'] = [];
            }

            if(DEBUG) APP.STATS.count_class += len;

            CLASS_STACK = [];
        }

        if(DEBUG) {

            APP.STATS.css_stack_len = CSS_STACK.length;
            APP.STATS.class_stack_len = CLASS_STACK.length;
            APP.STATS.html_stack_len = HTML_STACK.length;
        }

        PAINT_TIMER = null;

        if(CSS_STACK.length || HTML_STACK.length || CLASS_STACK.length) {

            registerPaint();
        }
    }

})();
