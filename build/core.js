goog.provide("APP.SETUP");
goog.provide("APP.MAIN");
goog.provide("APP.TEMPLATE");
goog.provide("APP.HTML");
goog.provide("APP.INIT");
goog.require('CONFIG');
goog.require('CORE');
goog.require('APP');
goog.require("DIST.APP");
goog.require("DIST.UTIL");
goog.require("DIST.INTERFACE");
goog.require("CORE.ANIMATE");

APP.TEMPLATE = {};
APP.HTML = {};

APP.INIT = [];
APP.MAIN = function(){};
APP.SETUP = APP.MAIN;

(function(){

    APP.CONFIG.LAYOUT = [];

    /** @export @dict */

    window.CORE = {

        "ajax": CORE.ajax,
        "isType": CORE.isType,
        "isString": CORE.isString,
        "isNumber": CORE.isNumber,
        "isBoolean": CORE.isBoolean,
        "isDefined": CORE.isDefined,
        "hasValue": CORE.hasValue,
        "isArray": CORE.isArray,
        "isObject": CORE.isObject,
        "isCollection": CORE.isCollection,
        "isNode": CORE.isNode,
        "hasValues": CORE.hasValues,
        "hasKeys": CORE.hasKeys,
        "isEmpty": CORE.isEmpty,
        "isBlank": CORE.isBlank,
        "switchKeyCode": CORE.switchKeyCode,
        "getNode": CORE.getNode,
        "crc32": CORE.crc32,
        "queryAll": CORE.queryAll,
        "query": CORE.query,
        "queryFirst": CORE.queryFirst,
        "queryOne": CORE.queryOne,
        "getClosest": CORE.getClosest,
        "getPrevious": CORE.getPrevious,
        "getNext": CORE.getNext,
        "getById": CORE.getById,
        "getByClass": CORE.getByClass,
        "getByTag": CORE.getByTag,
        "getValue": CORE.getValue,
        "setValue": CORE.setValue,
        "parseNode": CORE.parseNode,
        "buildPattern": CORE.buildPattern,
        "buildData": CORE.buildData,
        "removeNodes": CORE.removeNodes,
        "focusInput": CORE.focusInput,
        "DOM": {},
        "paramsToString": CORE.paramsToString,
        "parseParams": CORE.parseParams,
        "randomString": CORE.randomString,
        "trim": CORE.trim,
        "unique": CORE.unique,
        "merge": CORE.merge,
        "reverse": CORE.reverse,
        "sort": CORE.sort,
        "sortAsc": CORE.sortAsc,
        "sortDesc": CORE.sortDesc,
        "sortNum": CORE.sortNum,
        "sortNumAsc": CORE.sortNumAsc,
        "sortNumDesc": CORE.sortNumDesc,
        "shuffle": CORE.shuffle,
        "formatDate": CORE.formatDate,
        "formatNumber": CORE.formatNumber,
        "preloadImages": CORE.preloadImages,
        "loadScript": CORE.loadScript,
        "loadStyle": CORE.loadStyle,
        "time": CORE.time,
        "capitalize": CORE.capitalize,
        "prefix": {
            "dom": CORE.prefix.dom,
            "lowercase": CORE.prefix.lowercase,
            "css": CORE.prefix.css,
            "js": CORE.prefix.js
        },
        "count": CORE.count,
        "replace": CORE.replace,
        "registerEach": CORE.registerEach,
        "registerMap": CORE.registerMap,
        "registerFilter": CORE.registerFilter,
        "indexOf": CORE.indexOf,
        "lastIndexOf": CORE.lastIndexOf,
        "contains": CORE.contains,
        "fill": CORE.fill,
        "strip": CORE.strip,
        "move": CORE.move,
        "getKeys": CORE.getKeys,
        "assign": CORE.assign,
        "insertAt": CORE.insertAt,
        "clone": CORE.clone,
        "parseQuery": CORE.parseQuery,
        "imageToDataUrl": CORE.imageToDataUrl,
        "readAsDataUrl": CORE.readAsDataUrl,
        "getCookies": CORE.getCookies,
        "Math": {
            "min": CORE.Math.min,
            "max": CORE.Math.max,
            "med": CORE.Math.med,
            "round": CORE.Math.round,
            "rad": CORE.Math.rad,
            "cos": CORE.Math.cos,
            "sin": CORE.Math.sin,
            "rand": CORE.Math.rand,
            "abs": CORE.Math.abs
        },
        "System": {
            "isOpera": CORE.System.isOpera,
            "isFirefox": CORE.System.isFirefox,
            "isSafari": CORE.System.isSafari,
            "isMSIE": CORE.System.isMSIE,
            "isIphone": CORE.System.isIphone,
            "isIpod": CORE.System.isIpod,
            "isIpad": CORE.System.isIpad,
            "isAndroid": CORE.System.isAndroid,
            "isCordova": CORE.System.isCordova,
            "isWkWebview": CORE.System.isWkWebview,
            "isCrosswalk": CORE.System.isCrosswalk,
            "isWebkit": CORE.System.isWebkit,
            "isRetina": CORE.System.isRetina,
            "isTouch": CORE.System.isTouch,
            "is": CORE.System.is,
            "isChrome": CORE.System.isChrome,
            "isIOS": CORE.System.isIOS,
            "isMobile": CORE.System.isMobile,
            "isIOS8": CORE.System.isIOS8
        },
        "asap": CORE.asap,
        "promise": CORE.promise,
        "async": CORE.async,
        "paint": CORE.paint,
        "run": CORE.run,
        "queue": CORE.queue,
        "stack": CORE.stack,
        "clear": CORE.clear,
        "clearAll": CORE.clearAll,
        "getStackLength": CORE.getStackLength,
        "getFullStack": CORE.getFullStack,
        "preventEvent": CORE.preventEvent,
        "handleEvent": CORE.handleEvent,
        "on": CORE.on,
        "addEvent": CORE.addEvent,
        "addTouchEvent": CORE.addTouchEvent,
        "addTouchMoveEvent": CORE.addTouchMoveEvent,
        "addInputEvent": CORE.addInputEvent,
        "addMouseWheelScroll": CORE.addMouseWheelScroll,
        "triggerMouseEvent": CORE.triggerMouseEvent,
        "delegateByClass": CORE.delegateByClass,
        "delegateByTag": CORE.delegateByTag,
        "delegateByTagClass": CORE.delegateByTagClass,
        "hasClass": CORE.hasClass,
        "addClass": CORE.addClass,
        "removeClass": CORE.removeClass,
        "toggleClass": CORE.toggleClass,
        "getStyle": CORE.getStyle,
        "setStyle": CORE.setStyle,
        "toggleStyle": CORE.toggleStyle,
        "css": CORE.css,
        "addCssRule": CORE.addCssRule,
        "setText": CORE.setText,
        "setHTML": CORE.setHTML,
        "getHTML": CORE.getHTML,
        "scrollTo": CORE.scrollTo,
        "scrollToTop": CORE.scrollToTop,
        "repaint": CORE.repaint,
        "prepareStyle": CORE.prepareStyle,
        "forceStyle": CORE.forceStyle,
        "animate": CORE.animate,
        "Storage": CORE.Storage
    };

    /*
    console.log((function parseObject(obj, name){

        var tmp = '';

        for(var key in obj){

            if(obj.hasOwnProperty(key)){

                if(obj[key] && obj[key].constructor === Object){

                    tmp += '"' + key + '": {\n' + parseObject(obj[key], name + '.' + key) + "\n},\n";
                }

                else{

                    tmp += '"' + key + '": ' + name + '.' + key + ",\n";
                }
            }
        }

        return tmp;

    })(CORE, 'CORE'));
    */

})();
