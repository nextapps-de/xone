goog.provide('POLYFILL');

//window['storageInfo'] || (window['storageInfo'] = window['webkitStorageInfo']);
window['resolveLocalFileSystemURL'] || (window['resolveLocalFileSystemURL'] = window['webkitResolveLocalFileSystemURL']);
window['requestFileSystem'] || (window['requestFileSystem'] = window['webkitRequestFileSystem']);
navigator['persistentStorage'] || (navigator['persistentStorage'] = navigator['webkitPersistentStorage']);
navigator['temporaryStorage'] || (navigator['temporaryStorage'] = navigator['webkitTemporaryStorage']);

//"use strict";

/**
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON
 * @type {JSONType}
 * @const
 * @name JSON
 * @namespace Application JSON
 */

(JSON || (window["JSON"] = {

    /**
     * @param {string} sJSON
     * @return {Array|boolean|null|number|string}
     * @const
     */
    "parse": function(sJSON) {

        return /** @type {Array|boolean|null|number|string} */ (eval('(' + sJSON + ')'));
    },

    "stringify": (function () {

        /** @const */
        var toString = Object.prototype.toString;

        /** @const */
        var isArray = Array.isArray || function (a) { return toString.call(a) === '[object Array]'; };

        /** @const */
        var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'};

        /** @const */
        var escFunc = function (m) { return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1); };

        /** @const */
        var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;

        return (

            /**
             * @param {Array|boolean|null|number|string} value
             * @return {string}
             * @const
             */
            function stringify(value) {

                if (value == null) {

                    return 'null';

                } else if (typeof value === 'number') {

                    return isFinite(value) ? value.toString() : 'null';

                } else if (typeof value === 'boolean') {

                    return value.toString();

                } else if (typeof value === 'object') {

                    if (typeof value.toJSON === 'function') {

                        return stringify(/** @type {Array} */ (value.toJSON()));

                    } else if (isArray(value)) {

                        /** @type {string} */
                        var res = '[';

                        for (var i = 0; i < value.length; i++) {

                            res += (i ? ', ' : '') + stringify(value[i]);
                        }

                        return res + ']';

                    } else if (toString.call(value) === '[object Object]') {

                        /** @type {Array<string>} */
                        var tmp = [];

                        for (var k in value) {

                            if (value.hasOwnProperty(k)) {

                                tmp.push(stringify(k) + ': ' + stringify(value[parseInt(k, 10)]));
                            }
                        }

                        return '{' + tmp.join(', ') + '}';
                    }
                }

                return '"' + value.toString().replace(escRE, escFunc) + '"';
            }
        );
    })()
}));

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
Array.prototype['filter'] || (Array.prototype['filter'] = function(fun/*, thisArg*/) {

    'use strict';

    if (this === void 0 || this === null) {
        throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
        throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
        if (i in t) {
            var val = t[i];

            // NOTE: Technically this should Object.defineProperty at
            //       the next index, as push can be affected by
            //       properties on Object.prototype and Array.prototype.
            //       But that method's new, and collisions should be
            //       rare, so use the more-compatible alternative.
            if (fun.call(thisArg, val, i, /** @type {!Array<T>} */ (t))) {
                res.push(val);
            }
        }
    }

    return res;
});

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
Array.prototype['map'] || (Array.prototype['map'] = function(callback, thisArg) {

    "use strict";

    var T, A, k;

    if (this == null) {
        throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this|
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
        T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len)
    //    where Array is the standard built-in constructor with that name and
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

        var kValue, mappedValue;

        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal
        //    method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {

            // i. Let kValue be the result of calling the Get internal
            //    method of O with argument Pk.
            kValue = O[k];

            // ii. Let mappedValue be the result of calling the Call internal
            //     method of callback with T as the this value and argument
            //     list containing kValue, k, and O.
            mappedValue = callback.call(T, kValue, k, /** @type {!Array<T>} */ (O));

            // iii. Call the DefineOwnProperty internal method of A with arguments
            // Pk, Property Descriptor
            // { Value: mappedValue,
            //   Writable: true,
            //   Enumerable: true,
            //   Configurable: true },
            // and false.

            // In browsers that support Object.defineProperty, use the following:
            // Object.defineProperty(A, k, {
            //   value: mappedValue,
            //   writable: true,
            //   enumerable: true,
            //   configurable: true
            // });

            // For best browser support, use the following:
            A[k] = mappedValue;
        }
        // d. Increase k by 1.
        k++;
    }

    // 9. return A
    return A;
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
Object['keys'] || (Object['keys'] = (function() {

    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {

        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {

            throw new TypeError('Object.keys called on non-object');
        }

        var result = [], prop, i;

        for (prop in obj) {

            if (hasOwnProperty.call(obj, prop)) {

                result.push(prop);
            }
        }

        if (hasDontEnumBug) {

            for (i = 0; i < dontEnumsLength; i++) {

                if (hasOwnProperty.call(obj, dontEnums[i])) {

                    result.push(dontEnums[i]);
                }
            }
        }

        return result;
    };

}()));

/**
 * Shim for "fixing" IE's lack of support (IE < 9) for applying slice
 * on host objects like NamedNodeMap, NodeList, and HTMLCollection
 * (technically, since host objects have been implementation-dependent,
 * at least before ES6, IE hasn't needed to work this way).
 * Also works on strings, fixes IE < 9 to allow an explicit undefined
 * for the 2nd argument (as in Firefox), and prevents errors when
 * called on other DOM objects.
 *
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 */
(function () {

    'use strict';

    var _slice = Array.prototype['slice'];

    try {
        // Can't be used with DOM elements in IE < 9
        _slice.call(/** @type {IArrayLike<?>|null|string|undefined} */ (document.documentElement));
    } catch (e) { // Fails in IE < 9
        // This will work for genuine arrays, array-like objects,
        // NamedNodeMap (attributes, entities, notations),
        // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
        // and will not fail on other DOM objects (as do DOM elements in IE < 9)
        /**
         * @param {*=} begin
         * @param {*=} end
         * @this {IArrayLike<T>|string}
         * @returns {!Array<T>}
         */
        Array.prototype['slice'] = function(begin, end) {
            // IE < 9 gets unhappy with an undefined end argument
            end = (typeof end !== 'undefined') ? end : this.length;

            // For native Array objects, we use the native slice function
            if (Object.prototype.toString.call(this) === '[object Array]'){

                return /** @type{!Array<*>} */ (_slice.call(this, begin, end));
            }

            // For array like object we handle it ourselves.
            var i, cloned = [],
                size, len = this.length;

            // Handle negative value for "begin"
            /** @type {number} */
            var start = /** @type {number} */ (begin) || 0;
                  end = /** @type {number} */ (end);
            start = (start >= 0) ? start : Math.max(0, len + start);

            // Handle negative value for "end"
            var upTo = (typeof end == 'number') ? Math.min(end, len) : len;
            if (end < 0) {
                upTo = len + end;
            }

            // Actual expected size of the slice
            size = upTo - start;

            if (size > 0) {
                cloned = new Array(size);
                if (this.charAt) {
                    for (i = 0; i < size; i++) {
                        cloned[i] = this.charAt(start + i);
                    }
                } else {
                    for (i = 0; i < size; i++) {
                        cloned[i] = this[start + i];
                    }
                }
            }

            return /** @type{!Array<*>} */ (cloned);
        };
    }

}());


Array.prototype['indexOf'] || (Array.prototype['indexOf'] = function(d, e) {

    "use strict";

    var a;

    if(this == null) throw new TypeError('"this" is null or not defined');

    var c = Object(this),
        b = c.length >>> 0;

    if(0 === b) return -1;

    a = +e || 0;

    Infinity === Math.abs(a) && (a = 0);

    if(a >= b) return -1;

    for(a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {

        if(a in c && c[a] === d) return a;
        a++;
    }

    return -1;
});

if(window.Element && !Element.prototype['closest']){

    Element.prototype['closest'] = function(s){

        "use strict";

        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;

        do {
            i = matches.length;
            while(--i >= 0 && matches.item(i) !== el){};
        }
        while((i < 0) && (el = el.parentElement));

        return el;
    };
}
