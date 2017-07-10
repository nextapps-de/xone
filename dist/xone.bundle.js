/**!
 * @preserve Xone Javascript Framework (bundle)
 * @version 0.0.600
 * @build 4145038864/499557840
 * @author Thomas Wilkerling
 * @license Apache-2.0
 * @link https://www.npmjs.com/package/xone
 * @link https://github.com/next-apps/xone
 * @tutorial https://next-apps.github.io/xone/
 */


/** @define {string} */ var PLATFORM = "";

/** @const */ var CONFIG = {};
/** @define {boolean} */ CONFIG.DEBUG = false;
/** @define {string} */ CONFIG.RACK = "default";
/** @define {boolean} */ CONFIG.NO_SCRIPT = false;
/** @define {boolean} */ CONFIG.SHOW_DEBUG = false;
/** @define {boolean} */ CONFIG.DESKTOP = true;
/** @define {string} */ CONFIG.FORCE_ORIENTATION = "none";
/** @define {number} */ CONFIG.MIN_DIMENSION = 1024;
/** @define {number} */ CONFIG.MAX_DIMENSION = 1024;
/** @define {number} */ CONFIG.MIN_ASPECT_RATIO = 0.7;
/** @define {number} */ CONFIG.MAX_ASPECT_RATIO = 1.35;
/** @define {boolean} */ CONFIG.HIDE_STATUSBAR = true;
/** @define {number} */ CONFIG.SETTINGS_VERSION = 0.0;
/** @define {number} */ CONFIG.CORE_VERSION = 0.6;
/** @define {number} */ CONFIG.MAX_CACHE_TIME = 300000;
/** @define {string} */ CONFIG.SERVER_HOST = "localhost";
/** @define {number} */ CONFIG.EVENT_DEFAULT_DELAY = 0;
/** @define {string} */ CONFIG.STORAGE_PREFIX = "";
/** @define {boolean} */ CONFIG.STORE_VIEWS_OFFLINE = true;
/** @define {boolean} */ CONFIG.ENABLE_DOM_CACHE = false;
/** @define {boolean} */ CONFIG.ENABLE_STYLE_CACHE = false;
/** @define {boolean} */ CONFIG.ENABLE_CLASS_CACHE = false;
/** @define {boolean} */ CONFIG.ENABLE_HTML_CACHE = false;
/** @define {boolean} */ CONFIG.ENABLE_EVENT_CACHE = true;
/** @define {boolean} */ CONFIG.ENABLE_MODEL_CACHE = true;
/** @define {boolean} */ CONFIG.ENABLE_STORAGE_CACHE = true;
/** @define {boolean} */ CONFIG.ENABLE_MAPPER_CACHE = true;
/** @define {boolean} */ CONFIG.ENABLE_ROUTE_CACHE = false;
/** @define {boolean} */ CONFIG.ENABLE_VIEW_CACHE = false;

/** @const @typedef {_ajax_struct} */ var _ajax_struct = {/** @type {string} */ type:"", /** @type {string} */ url:"", /** @type {Object<string,(string|number)>} */ params:{}, /** @type {Function} */ success:function() {
}, /** @type {Function} */ error:function() {
}, /** @type {Object<string,string>} */ header:{}, /** @type {boolean} */ async:true, /** @type {boolean} */ clear:true, /** @type {boolean} */ cache:true};

/** @const @typedef {_event_struct} */ var _event_struct = {/** @type {string} */ on:"", /** @type {string} */ if:"", /** @type {string} */ to:"", /** @type {Function} */ do:function() {
}, /** @type {string} */ at:"", /** @type {string} */ in:"", /** @type {string} */ by:"", /** @type {string} */ go:"", /** @type {Object<string,(string|number)>} */ params:{}, /** @type {boolean} */ stopBubble:true, /** @type {boolean} */ preventDefault:true};

/**
 @const
 @interface
 @template ActiveModel
 */
function _active_model() {
}
/** @type {Function} */ _active_model.prototype.register;
/** @type {Function} */ _active_model.prototype.new;
/** @type {Function} */ _active_model.prototype.create;
/** @type {Function} */ _active_model.constructor.beforeUpdate;
/** @type {Function} */ _active_model.constructor.beforeCreate;
/** @type {Function} */ _active_model.constructor.beforeSave;
/** @type {Function} */ _active_model.constructor.beforeDelete;
/** @type {Function} */ _active_model.constructor.onCreate;
/** @type {Function} */ _active_model.constructor.onUpdate;
/** @type {Function} */ _active_model.constructor.onSave;
/** @type {Function} */ _active_model.constructor.onDelete;
/**
 @const
 @interface
 @template ModelHelper
 */
function _model_helper() {
}
/** @type {Function} */ _model_helper.prototype.new;
/** @type {Function} */ _model_helper.prototype.create;
/** @type {Function} */ _model_helper.prototype.newFromList;
/** @type {Function} */ _model_helper.prototype.createFromList;
/** @type {Function} */ _model_helper.prototype.parse;
/** @type {Function} */ _model_helper.prototype.find;
/** @type {Function} */ _model_helper.prototype.update;
/** @type {Function} */ _model_helper.prototype.delete;
/** @type {Function} */ _model_helper.prototype.all;
/** @type {Function} */ _model_helper.prototype.range;
/** @type {Function} */ _model_helper.prototype.count;
/** @type {Function} */ _model_helper.prototype.countWhere;
/** @type {Function} */ _model_helper.prototype.findBy;
/** @type {Function} */ _model_helper.prototype.each;
/** @type {Function} */ _model_helper.prototype.where;
/** @type {Function} */ _model_helper.prototype.like;
/** @type {Function} */ _model_helper.prototype.saveAll;
/** @type {Function} */ _model_helper.prototype.deleteAll;
/** @type {Function} */ _model_helper.prototype.deleteWhere;
/** @type {Function} */ _model_helper.prototype.updateAll;
/** @type {Function} */ _model_helper.constructor.beforeUpdate;
/** @type {Function} */ _model_helper.constructor.beforeCreate;
/** @type {Function} */ _model_helper.constructor.beforeSave;
/** @type {Function} */ _model_helper.constructor.beforeDelete;
/** @type {Function} */ _model_helper.constructor.onCreate;
/** @type {Function} */ _model_helper.constructor.onUpdate;
/** @type {Function} */ _model_helper.constructor.onSave;
/** @type {Function} */ _model_helper.constructor.onDelete;
/**
 @const
 @interface
 @param {Object<string,*>} data
 @template ModelClass
 */
function _model_class(data) {
}
/** @type {Function} */ _model_class.prototype.save;
/** @type {_storage_interface} */ _model_class.prototype.data;
/** @type {Function} */ _model_class.prototype.cache;
/** @type {Function} */ _model_class.prototype.update;
/** @type {Function} */ _model_class.prototype.restore;
/** @type {Function} */ _model_class.prototype.delete;
/** @type {string} */ _model_class.prototype.modelName;
/** @type {Function} */ _model_class.constructor.prototype.mapToView;
/** @type {Function} */ _model_class.constructor.prototype.mapToPayload;
/** @type {Function} */ _model_class.constructor.prototype.mapToData;
/** @type {Function} */ _model_class.constructor.prototype.mapToStorage;
/** @type {Function} */ _model_class.constructor.prototype.beforeUpdate;
/** @type {Function} */ _model_class.constructor.prototype.beforeCreate;
/** @type {Function} */ _model_class.constructor.prototype.beforeSave;
/** @type {Function} */ _model_class.constructor.prototype.beforeDelete;
/** @type {Function} */ _model_class.constructor.prototype.onCreate;
/** @type {Function} */ _model_class.constructor.prototype.onUpdate;
/** @type {Function} */ _model_class.constructor.prototype.onSave;
/** @type {Function} */ _model_class.constructor.prototype.onDelete;

/** @const @typedef {_pattern_struct} */ var _pattern_struct = {/** @type {string} */ tag:"", /** @type {(Object<string,string>|Array<Object<string,string>>)} */ attr:{}, /** @type {string} */ text:"", /** @type {Array<_pattern_struct>} */ child:[], /** @type {number} */ length:0};

/** @const @typedef {_route_struct} */ var _route_struct = {/** @type {string} */ to:"", /** @type {string} */ action:"", /** @type {string} */ type:"", /** @type {string} */ field:"", /** @type {number} */ limit:0, /** @type {number} */ last:0, /** @type {Object<string,(string|number|boolean)>} */ params:{}, /** @type {Object<string,string>} */ header:{}, /** @type {boolean} */ cache:false, /** @type {boolean} */ clear:false, /** @type {boolean} */ async:true, /** @type {Function} */ default:function() {
}, /** @type {Function} */ error:function() {
}, /** @type {Function} */ filter:function() {
}, /** @type {Function} */ arrayfilter:function() {
}, /** @type {Function} */ sort:function() {
}, /** @type {Function} */ map:function() {
}, /** @type {Function} */ arraymap:function() {
}};

/**
 @const
 @interface
 @this {_storage_interface}
 @param {!string} store_id
 @template Storage
 */
function _storage_interface(store_id) {
}
/** @type {Function} */ _storage_interface.prototype.get;
/** @type {Function} */ _storage_interface.prototype.set;
/** @type {Function} */ _storage_interface.prototype.update;
/** @type {Function} */ _storage_interface.prototype.del;
/** @type {Function} */ _storage_interface.prototype.clear;
/** @type {Function} */ _storage_interface.prototype.keys;

/** @const @typedef {_template_struct} */ var _template_struct = {/** @type {Array<(string|number)>} */ data:[], /** @type {Array<string>} */ map:[], /** @type {function(*):boolean} */ if:function() {
}, /** @type {string} */ loop:"", /** @type {string} */ include:"", /** @type {string} */ else:""};

/** @const @typedef {_view_model} */ var _view_model = {/** @type {Array<*>} */ data:[], /** @type {string} */ target:"", /** @type {string} */ view:"", /** @type {(string|_view_model)} */ default:"", /** @type {(string|Function)} */ callback:""};









/**
 @const
 @interface
 @this {_controller_struct}
 @template Controller
 */
function _controller_struct() {
}
/** @type {Function} */ _controller_struct.prototype.render;
/** @type {Function} */ _controller_struct.prototype.build;
/** @type {Function} */ _controller_struct.prototype.request;
/** @type {Function} */ _controller_struct.prototype.requestBatch;
/** @type {Function} */ _controller_struct.prototype.requestSync;
/** @const @typedef {_mapping_struct} */ var _mapping_struct = {/** @dict */ mapToView:{}, /** @dict */ mapToPayload:{}, /** @dict */ mapToData:{}};
/**
 @const
 @interface
 @this {_cache_struct}
 @template CACHE
 */
function _cache_struct() {
}
/** @type {function(string,*,boolean=)} */ _cache_struct.prototype.set;
/** @type {function(string,boolean=):*} */ _cache_struct.prototype.get;
/** @type {function(string):*} */ _cache_struct.prototype.remove;
/** @type {function()} */ _cache_struct.prototype.clear;
/** @const @typedef {_storage_struct} */ var _storage_struct = {VIEW:"", DATA:{}, SESSION:"", CACHE:[]};
/**
 @public
 @interface
 @param {HTMLElement} obj
 @param {string} style
 @param {(CSSStyleDeclaration|Object)} css
 @param {number} from
 @param {(number|string)} to
 @param {string} metric
 @param {number} duration
 @param {string} easeStr
 @param {Array<number>} ease
 @param {number} RES
 @param {number} start
 @param {(Function|undefined)} callback
 @param {(Function|undefined)} step
 */
function _fatjob_interface(obj, style, css, from, to, metric, duration, easeStr, ease, RES, start, callback, step) {
}
/**
 @this {_fatjob_interface}
 @param {number} time
 @return {boolean}
 */
_fatjob_interface.prototype.animate;
/**
 @param {string} tmp
 @param {string} to
 */
_fatjob_interface.prototype.colorHandler;
/** @public @interface */ function FAT_CLASS() {
  /** @type {boolean} */ this.isRender;
  /** @type {boolean} */ this.EXEC;
}
/**
 @public
 @interface
 @param {HTMLCanvasElement=} canvas
 @param {number=} width
 @param {number=} height
 @param {boolean=} useOffscreen
 */
function FAT_CANVAS_CLASS(canvas, width, height, useOffscreen) {
}
/**
 @param {FAT_SHAPE_CLASS} obj
 */
FAT_CANVAS_CLASS.prototype.add;
/**
 @param {number} time
 */
FAT_CANVAS_CLASS.prototype.render;
/**
 @public
 @interface
 @param {CSSStyleDeclaration} css
 @param {string} style
 @param {(string|number)} val
 */
function CSSJOB_CLASS(css, style, val) {
  /** @type {(CSSStyleDeclaration|Object)} */ this.css;
  /** @type {string} */ this.style;
  /** @type {(string|number)} */ this.val;
}
/** @type {Function} */ CSSJOB_CLASS.prototype.set;
/**
 @public
 @interface
 @param {number=} x
 @param {number=} y
 @param {number=} width
 @param {number=} height
 @param {string=} fillStyle
 @param {number=} lineWidth
 @param {string=} strokeStyle
 @param {boolean=} useBuffer
 */
function FAT_SHAPE_CLASS(x, y, width, height, fillStyle, lineWidth, strokeStyle, useBuffer) {
}
/**
 @param {number} x
 @param {number} y
 */
FAT_SHAPE_CLASS.prototype.moveTo;
/**
 @param {number} x
 @param {number} y
 */
FAT_SHAPE_CLASS.prototype.moveBy;
/**
 @param {number} w
 @param {number} h
 */
FAT_SHAPE_CLASS.prototype.resize;
/**
 @param {CanvasRenderingContext2D} context
 */
FAT_SHAPE_CLASS.prototype.draw;



/** @define {string} */ CONFIG.PLATFORM = PLATFORM;
/** @define {string} */ CONFIG.ENV = "production";
/** @define {string} */ var ENV = CONFIG.ENV;
/** @define {boolean} */ var DEBUG = CONFIG.DEBUG;
/** @define {string} */ var RACK = CONFIG.RACK;



if (DEBUG) {
  var GRAPH = function() {
    var graph = {};
    var count = {};
    var stack = [];
    var timer = null;
    var reset = function() {
      if (typeof APP !== "undefined" && APP.CONFIG.SHOW_GRAPH) {
        GRAPH.show_graph();
        GRAPH.show_count();
      }
      stack = [];
    };
    var timestamp = 0;
    return {/**
 @param {!string} fn
 */
register:function(fn) {
      count[fn] || (count[fn] = 0);
      count[fn]++;
      stack[stack.length] = fn;
      var walker = graph;
      for (var i = 0; i < stack.length; i++) {
        if (graph[stack[i]]) {
          walker = graph;
        } else {
          graph[stack[i]] = {};
        }
        walker = walker[stack[i]] || (walker[stack[i]] = {});
      }
    }, /**
 @param {!string} fn
 */
checkin:function(fn) {
      this.register(fn);
      if (CORE.time) {
        timestamp = CORE.time.now();
      }
    }, /**
 @param {!string} fn
 */
checkout:function(fn) {
      if (CORE.time) {
        timestamp = CORE.time.now() - timestamp;
      }
      console.log(timestamp);
    }, show_graph:function() {
      var html = "", last_key = "";
      for (var key in graph) {
        if (graph.hasOwnProperty(key)) {
          html += key + ": " + JSON.stringify(graph[key]).replace(/:{/g, "\n=>").replace(/{/g, "\n=>").replace(/}/g, "").replace(/"/g, "").replace(/,/g, "") + "<br><br>";
        }
      }
      var node = document.getElementById("debug-graph-trace");
      node.innerHTML = html;
      node.scrollTop = node.scrollHeight;
    }, show_count:function() {
      var html = "";
      for (var key in count) {
        if (count.hasOwnProperty(key)) {
          html += key + ": " + count[key] + "<br>";
        }
      }
      var node = document.getElementById("debug-graph-count");
      node.innerHTML = html;
      node.scrollTop = node.scrollHeight;
    }};
  }();
}
;




/** @const */ var CORE = {};
(function() {
  /** @private @type {XMLHttpRequest} */ var xhr = null;
  var capitalize = function(text) {
    if (DEBUG) {
      GRAPH.register("CORE.capitalize");
    }
    return text[0].toUpperCase() + text.slice(1);
  };
  /** @const @type {string} */ var prefix = function() {
    var styles = window.getComputedStyle(document.documentElement, "");
    return (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || styles["OLink"] === "" && ["", "o"])[1];
  }();
  /**
 @const
 @param {!*} value
 @param {string=} type
 @return {boolean}
 */
CORE.isType = function(value, type) {
    if (DEBUG) {
      GRAPH.register("CORE.isType");
    }
    return type ? typeof value === type : typeof value !== "undefined";
  };
  /**
 @const
 @param {!string} value
 @return {boolean}
 */
CORE.isString = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isString");
    }
    return typeof value === "string";
  };
  /**
 @const
 @param {!*} value
 @return {boolean}
 */
CORE.isNumber = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isNumber");
    }
    return typeof value === "number";
  };
  /**
 @const
 @param {!*} value
 @return {boolean}
 */
CORE.isBoolean = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isBoolean");
    }
    return typeof value === "boolean";
  };
  /**
 @const
 @param {!*} value
 @return {boolean}
 */
CORE.isDefined = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isDefined");
    }
    return typeof value !== "undefined";
  };
  /**
 @const
 @param {!*} value
 @return {boolean}
 */
CORE.hasValue = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.hasValue");
    }
    return value || value === 0 || value === false || value === "" ? true : false;
  };
  /**
 @const
 @param {!*} value
 @return {boolean}
 */
CORE.isArray = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isArray");
    }
    return value && value.constructor === Array ? true : false;
  };
  /**
 @const
 @param {!*} value
 @return {boolean}
 */
CORE.isObject = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isObject");
    }
    return value && value.constructor === Object ? true : false;
  };
  /**
 @const
 @param {(!Object|null)} value
 @return {boolean}
 */
CORE.isCollection = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isCollection");
    }
    return HTMLCollection.prototype.isPrototypeOf(value);
  };
  /**
 @const
 @param {(!Node|*)} value
 @return {boolean}
 */
CORE.isNode = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isCollection");
    }
    return value.nodeType && value.nodeName ? true : false;
  };
  /**
 @const
 @param {!Array<*>} value
 @return {boolean}
 */
CORE.hasValues = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.hasValues");
    }
    if (value && value.length) {
      for (var i = 0; i < value.length; i++) {
        if (CORE.hasValue(value[i])) {
          return true;
        }
      }
    }
    return false;
  };
  /**
 @const
 @param {!Object} value
 @return {boolean}
 */
CORE.hasKeys = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.hasKeys");
    }
    return Object.keys(value).length ? true : false;
  };
  /**
 @const
 @param {!Array<*>} value
 @return {boolean}
 */
CORE.isEmpty = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isEmpty");
    }
    return value && value.length === 0 ? true : false;
  };
  /**
 @const
 @param {*} value
 @return {boolean}
 */
CORE.isBlank = function(value) {
    if (DEBUG) {
      GRAPH.register("CORE.isBlank");
    }
    return value === "";
  };
  /** @const @type {Array<string>} */ var KEYCODES = ["", "", "", "", "", "", "", "", "backspace", "tab", "", "", "", "enter", "", "", "shift", "ctrl", "alt", "pause/break", "caps lock", "", "", "", "", "", "", "esc", "", "", "", "", "space", "page up", "page down", "end", "home", "left", "up", "right", "down", "", "", "", "", "insert", "delete", "", "", "", ""];
  for (var i = 97; i < 123; i++) {
    KEYCODES[i - 32] = String.fromCharCode(i);
  }
  for (var i = 48; i < 58; i++) {
    KEYCODES[i] = String(i - 48);
  }
  for (var i = 1; i < 13; i++) {
    KEYCODES[i + 111] = "f" + i;
  }
  for (var i = 0; i < 10; i++) {
    KEYCODES[i + 96] = "numpad " + i;
  }
  /**
 @param {(!Event|number)} keyCode
 @param {!Object<string,Function>} payload
 */
CORE.switchKeyCode = function(keyCode, payload) {
    if (typeof keyCode === "number") {
      if (payload[KEYCODES[keyCode]]) {
        payload[KEYCODES[keyCode]]();
        return;
      }
    } else {
      if (payload[KEYCODES[keyCode.keyCode]]) {
        payload[KEYCODES[keyCode.keyCode]]();
        return;
      }
    }
    payload["else"] && payload["else"]();
  };
  /**
 @const
 @param {(Node|Element|HTMLDocument|Window|null|string)} element
 @return {(Node|HTMLElement|HTMLDocument|Window|Element|null)}
 */
var getNode = CORE.getNode = function(element) {
    if (DEBUG) {
      GRAPH.register("CORE.getNode");
      if (CORE.isType(element, "string")) {
        if (CORE.DOM[/** @type {string} */ (element)]) {
          APP.STATS.count_dom_cache++;
        } else {
          APP.STATS.count_dom++;
        }
      }
    }
    return CORE.isType(element, "string") ? CORE.DOM[/** @type {string} */ (element)] || CORE.getById(/** @type {string} */ (element)) : /** @type {(Node|Element|HTMLDocument|Window|null)} */ (element);
  };
  /** @type {?Node} */ var dom_console;
  /** @type {string} */ var log = "";
  /** @final */ CORE.console = {/**
 @param {(string|number)=} text
 @param {*=} obj
 @param {string=} color
 */
log:function(text, obj, color) {
    if (DEBUG) {
      GRAPH.register("CORE.console.log");
      if (color) {
        if (CORE.isType(obj)) {
          window.console.log("%c" + text, "color: " + color, obj);
        } else {
          window.console.log("%c" + text, "color: " + color);
        }
      } else {
        if (CORE.isType(obj)) {
          window.console.log(text, obj);
        } else {
          window.console.log(text);
        }
      }
      if (text) {
        log += text + "<br>";
      }
      if (CORE.getStyle(dom_console || (dom_console = CORE.getById("debug-log")), "display") !== "none" || CONFIG.SHOW_DEBUG || APP.CONFIG.SHOW_DEBUG) {
        CORE.setHTML(dom_console, log, function() {
          dom_console.scrollTop = dom_console.scrollHeight;
        });
      }
    }
  }, /**
 @param {(string|number)=} param
 @param {*=} obj
 */
warn:function(param, obj) {
    if (DEBUG) {
      CORE.console.log(param, obj, "orange");
    }
  }, /**
 @param {(string|number)=} param
 @param {*=} obj
 */
err:function(param, obj) {
    if (DEBUG) {
      CORE.console.log(param, obj, "red");
    }
  }, /**
 @param {(string|number)=} param
 @param {*=} obj
 */
info:function(param, obj) {
    if (DEBUG) {
      CORE.console.log(param, obj, "green");
    }
  }};
  /**
 @private
 @return {XMLHttpRequest}
 */
var createXHR = function createXHR() {
    if (DEBUG) {
      GRAPH.register("CORE.createXHR");
    }
    if (typeof XMLHttpRequest !== "undefined") {
      xhr = new XMLHttpRequest;
    }
    if (!xhr) {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
        }
      }
    }
    return xhr;
  };
  /**
 @private
 @param {string} type
 @return {Object<string,string>}
 */
var getDefaultRequestHeader = function getDefaultRequestHeader(type) {
    if (DEBUG) {
      GRAPH.register("CORE.getDefaultRequestHeader");
    }
    /** @dict */ return {"Accept":"application/json", "Content-Type":"application/json"};
  };
  /**
 @private
 @param {string} type
 @param {string} url
 @param {(Object<string,(string|number)>|string)=} params
 @param {Function=} success
 @param {Function=} error
 @param {Object<string,string>=} header
 @param {boolean=} async
 @param {boolean=} clear
 @param {boolean=} cache
 */
var ajaxHandler = function ajaxHandler(type, url, params, success, error, header, async, clear, cache) {
    if (DEBUG) {
      GRAPH.register("CORE.ajaxHandler");
    }
    type = type.toUpperCase();
    /** @dict */ var current_header = header || getDefaultRequestHeader(type);
    var str_params = /** @type {(string|null)} */ ((type === "POST" || type === "PATCH" || type === "DELETE") && current_header["Accept"] === "application/json" ? JSON.stringify(params) : "");
    var cache_params = str_params.replace(/ /g, "").replace(/"/g, "").replace(/{/g, "/").replace(/}/g, "").replace(/:/g, "/");
    if (type === "GET") {
      url += "?" + CORE.paramsToString(params);
    }
    if (clear && xhr && typeof xhr.abort !== "undefined") {
      xhr.abort();
    }
    if (cache && type === "GET") {
      var last_cache = /** @lends {CORE.CACHE} */ CORE.CACHE.get(url + cache_params);
      if (last_cache) {
        if (DEBUG) {
          CORE.console.log("Fetched from Cache: " + url + cache_params, last_cache);
        }
        return success(last_cache);
      }
    }
    xhr = createXHR();
    if (!xhr) {
      if (type === "GET") {
        document.location.href = url + (str_params.length ? "?" : "") + str_params;
      }
      return;
    }
    if (DEBUG) {
      var debug_time = CORE.time.now();
    }
    xhr.open(type, url, typeof async === "undefined" ? true : async);
    for (var property in current_header) {
      if (current_header.hasOwnProperty(property)) {
        xhr.setRequestHeader(property, current_header[property]);
      }
    }
    (function(xhr, current_header, cache, type, url, str_params, success, error) {
      if (current_header["Authorization"]) {
        xhr.withCredentials = true;
      }
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
          var json = null;
          if (xhr.status == 200 || xhr.status == 201) {
            try {
              json = xhr.responseText ? JSON.parse(xhr.responseText) : [];
            } catch (e) {
            }
            if (cache && type === "GET") {
              /** @lends {CORE.CACHE} */ CORE.CACHE.set(url + cache_params, json);
            }
            if (DEBUG) {
              APP.STATS.time_request += CORE.time.now() - debug_time;
            }
            if (success) {
              if (json === null) {
                json = [];
              }
              success(json);
            }
          } else {
            if (error) {
              try {
                json = xhr.responseText ? JSON.parse(xhr.responseText) : [];
              } catch (e) {
              }
              if (json && json["error"]) {
                APP.LAYOUT.show_message(json["error"].constructor === Object ? JSON.stringify(json["error"]) : json["error"]);
              }
              return error(xhr.status, json);
            }
          }
        }
      };
    })(xhr, current_header, cache, type, url, str_params, success, error);
    xhr.send(str_params.length ? str_params : null);
  };
  /**
 @public
 @const
 @struct
 @constructor
 @implements {_cache_struct}
 */
var CACHE = function CACHE() {
    /** @private @dict */ var data = {};
    /** @private @dict */ var timer = {};
    /**
 @param {string} key
 @param {*} val
 @param {boolean=} force
 */
this.set = function set(key, val, force) {
      if (DEBUG) {
        GRAPH.register("CORE.CACHE.set");
        CORE.console.log("Set Cache to: " + key, val);
      }
      data[key] = val;
      !force && timer[key] || (timer[key] = (new Date).getTime());
    };
    /**
 @param {string} key
 @param {boolean=} force
 @return {*}
 */
this.get = function get(key, force) {
      if (DEBUG) {
        GRAPH.register("CORE.CACHE.get");
        CORE.console.log("Get Cache from: " + key);
      }
      return timer[key] && (force || (new Date).getTime() - timer[key] < (CONFIG.MAX_CACHE_TIME || 300000)) ? data[key] : null;
    };
    /**
 @return {Object<string,*>}
 */
this.all = function all() {
      if (DEBUG) {
        GRAPH.register("CORE.CACHE.all");
        CORE.console.log("Get All from Cache");
      }
      return data;
    };
    /**
 @param {string} key
 @return {*}
 */
this.remove = function remove(key) {
      if (DEBUG) {
        GRAPH.register("CORE.CACHE.remove");
        CORE.console.log("Remove from Cache: " + key);
      }
      var val = data[key];
      data[key] = null;
      timer[key] = null;
      return val;
    };
    /** @type {function()} */ this.clear = function clear() {
      if (DEBUG) {
        GRAPH.register("CORE.CACHE.clear");
        CORE.console.log("Clear Cache");
      }
      data = {};
      timer = {};
    };
  };
  var crcTable = function() {
    var c;
    var crcTable = [];
    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      crcTable[n] = c;
    }
    return crcTable;
  }();
  /** @type {(Array<Function>|Array<Array<Function,(number|null)>>)} */ var EXEC_STACK = [];
  /** @type {boolean} */ var EXEC = false;
  function runStack() {
    if (DEBUG) {
      GRAPH.register("CORE.runStack");
    }
    EXEC_STACK.splice(0, 1)[0]();
    if (EXEC_STACK.length) {
      CORE.async(runStack);
    } else {
      EXEC = false;
    }
  }
  var regex_query = /[[:=+>*,~(]/;
  /**
 @const
 @param {!string} query
 @return {(Array<(Node|null)>|NodeList|Node|null)}
 */
CORE.query = CORE.queryAll = function(query) {
    if (DEBUG) {
      GRAPH.register("CORE.query");
    }
    if (!regex_query.test(query)) {
      if (query.indexOf(" ") === -1) {
        var firstChar = query.charAt(0);
        if (firstChar === ".") {
          return CORE.getByClass(query.substring(1));
        }
        var dot_position = query.indexOf(".");
        if (dot_position > 0) {
          var class_name = query.substring(dot_position + 1);
          if (firstChar === "#") {
            return CORE.getByClass(class_name, query.substring(1, dot_position));
          } else {
            var nodes = [];
            var found_nodes = CORE.getByTag(query.substring(0, dot_position));
            for (var i = 0; i < found_nodes.length; i++) {
              if (CORE.hasClass(found_nodes[i], class_name)) {
                nodes[nodes.length] = found_nodes[i];
              }
            }
            return nodes;
          }
        } else {
          if (firstChar === "#") {
            return CORE.getById(query.substring(1));
          } else {
            return CORE.getByTag(query);
          }
        }
      } else {
        var parts = query.split(" ");
        if (parts.length === 2) {
          var part1 = parts[0];
          var part2 = parts[1];
          var firstChar1 = part1.charAt(0);
          var firstChar2 = part2.charAt(0);
          if (firstChar1 === "#") {
            if (firstChar2 === ".") {
              return CORE.getByClass(part2.substring(1), part1.substring(1));
            } else {
              if (firstChar2 !== "#") {
                return CORE.getByTag(part2, part1.substring(1));
              }
            }
          } else {
            if (firstChar1 === ".") {
              if (firstChar2 === "#") {
                return CORE.getByClass(part1.substring(1), part2.substring(1));
              }
            } else {
              if (firstChar2 === ".") {
                var nodes = [];
                var class_name = part2.substring(1);
                if (part1 === "document" || part1 === "body") {
                  return CORE.getByClass(class_name);
                } else {
                  var found_nodes = CORE.getByTag(part1);
                  for (var i = 0; i < found_nodes.length; i++) {
                    nodes.concat(CORE.getByClass(class_name, found_nodes[i]));
                  }
                  return nodes;
                }
              } else {
                if (firstChar2 === "#") {
                  return CORE.getByTag(part1, part2.substring(1));
                }
              }
            }
          }
        }
      }
    }
    if (DEBUG) {
      APP.STATS.count_dom++;
    }
    return document.querySelectorAll(query);
  };
  CORE.queryOne = CORE.queryFirst = function(query) {
    var result = CORE.query(query);
    if (CORE.isCollection(result)) {
      return result[0];
    } else {
      return result;
    }
  };
  CORE.getClosest = function(node, selector) {
    var direction = false;
    if (selector[0] === "<" && (direction = true) || selector[0] === ">") {
      selector = CORE.trim(selector.substring(1));
    }
    if (direction) {
      if (node.closest) {
        return node.closest(selector);
      } else {
        var result = CORE.query(selector), length = result.length, i;
        while (node = node.parentElement) {
          for (i = 0; i < length; i++) {
            if (result[i] === node) {
              return node;
            }
          }
        }
      }
    } else {
      return node.querySelector(selector);
    }
  };
  /**
 @const
 @param {string} id
 @return {(Node|Element|HTMLElement|HTMLInputElement|null)}
 */
CORE.getById = function getById(id) {
    if (DEBUG) {
      GRAPH.register("CORE.getById");
      if (CORE.DOM[id]) {
        APP.STATS.count_dom_cache++;
      } else {
        APP.STATS.count_dom++;
      }
    }
    if (CONFIG.ENABLE_DOM_CACHE) {
      return CORE.DOM[id] || (CORE.DOM[id] = document.getElementById(id));
    } else {
      return document.getElementById(id);
    }
  };
  /**
 @const
 @param {string} classname
 @param {(Node|HTMLElement|HTMLInputElement|Element|Window|string)=} context
 @return {NodeList}
 */
CORE.getByClass = function getByClass(classname, context) {
    if (DEBUG) {
      GRAPH.register("CORE.getByClass");
      APP.STATS.count_dom++;
    }
    return (context ? getNode(context) : document).getElementsByClassName(classname);
  };
  /**
 @const
 @param {string} tag
 @param {(Node|HTMLElement|HTMLInputElement|Element|Window|string)=} context
 @return {NodeList}
 */
CORE.getByTag = function getByTag(tag, context) {
    if (DEBUG) {
      GRAPH.register("CORE.getByTag");
      APP.STATS.count_dom++;
    }
    return (context ? getNode(context) : document).getElementsByTagName(tag);
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} node
 @return {string}
 */
CORE.getValue = function getValue(node) {
    if (DEBUG) {
      GRAPH.register("CORE.getValue");
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      node = node[0];
    }
    return node.value;
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} node
 @param {string} value
 */
CORE.setValue = function setValue(node, value) {
    if (DEBUG) {
      GRAPH.register("CORE.setValue");
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      for (var i = 0; i < node.length; i++) {
        node[i].value = value;
      }
    } else {
      node.value = value;
    }
  };
  /**
 @const
 @param {_pattern_struct} pattern
 @param {Object<?,(number|string)>=} data
 @return {Element}
 */
CORE.parseNode = function parseNode(pattern, data) {
    if (DEBUG) {
      GRAPH.register("CORE.parseNode");
    }
    var element = document.createElement(pattern.tag || "div");
    var attr = pattern.attr;
    if (attr) {
      for (var val in attr) {
        if (attr.hasOwnProperty(val)) {
          var attr_val = attr[val];
          var val_is_string = typeof attr_val === "string";
          if (val === "className" && val_is_string === false) {
            element.className = attr_val.join(" ");
          } else {
            if (val === "style" && val_is_string === false) {
              var style = "";
              for (var style_attr in attr[val]) {
                if (attr_val.hasOwnProperty(style_attr)) {
                  style += style_attr + "=" + attr_val[style_attr] + ";";
                }
              }
              element.setAttribute(val, style);
            } else {
              if (data && val === "data" && val_is_string === false) {
                for (var data_attr in attr_val) {
                  if (attr_val.hasOwnProperty(data_attr)) {
                    if (data_attr.indexOf(".") !== -1) {
                      var split = data_attr.split(".");
                      var model = split[0];
                      var index = split[1];
                      element.appendChild(document.createTextNode(data[model][index]));
                    } else {
                      element.appendChild(document.createTextNode(data[data_attr]));
                    }
                    break;
                  }
                }
              } else {
                element.setAttribute(val, attr_val);
              }
            }
          }
        }
      }
    }
    if (pattern.text) {
      element.appendChild(document.createTextNode(pattern.text));
    }
    return element;
  };
  /**
 @const
 @param {Array<_pattern_struct>} pattern
 @param {(Node|Element|DocumentFragment)} parent
 @param {Object<string,*>=} data
 @param {boolean=} recursive
 @return {(Node|Element|DocumentFragment)}
 */
CORE.buildPattern = function buildPattern(pattern, parent, data, recursive) {
    if (DEBUG) {
      GRAPH.register("CORE.buildPattern");
    }
    parent || (parent = document.createDocumentFragment());
    if (pattern) {
      if (typeof pattern.length === "undefined") {
        pattern = [pattern];
      }
      for (var i = 0; i < pattern.length; i++) {
        var element = CORE.parseNode(pattern[i], data);
        if (pattern[i].child) {
          CORE.buildPattern(pattern[i].child, element, data, true);
        }
        parent.appendChild(element);
      }
    }
    return parent;
  };
  CORE.buildData = function buildData(pattern, parent, data) {
    if (DEBUG) {
      GRAPH.register("CORE.buildData");
    }
    for (var i = 0; i < data.length; i++) {
      CORE.buildPattern(pattern, parent, data[i]);
    }
  };
  CORE.removeNodes = function(element) {
    if (DEBUG) {
      GRAPH.register("CORE.removeNodes");
    }
    var child;
    while (child = element.lastChild) {
      element.removeChild(child);
    }
  };
  /**
 @param {(string|HTMLInputElement)} input
 */
CORE.focusInput = function(input) {
    if (typeof input === "string") {
      input = CORE.query(input)[0];
    }
    CORE.paint(function() {
      var tmp = input.value;
      input.focus();
      input.value = "";
      input.value = tmp;
    });
  };
  /** @type {_cache_struct} */ CORE.CACHE = new CACHE;
  /** @type {Object<string,Element>} */ CORE.DOM = {};
  /**
 @public
 @param {_ajax_struct} params
 */
CORE.ajax = function ajax(params) {
    if (DEBUG) {
      GRAPH.register("CORE.ajax");
    }
    ajaxHandler(params.type || "GET", params.url || "/", params.params || "", params.success, params.error, params.header, params.async, params.clear, params.cache);
  };
  CORE.paramsToString = function(params) {
    if (DEBUG) {
      GRAPH.register("CORE.paramsToString");
    }
    var str = "";
    for (var property in params) {
      if (params.hasOwnProperty(property)) {
        str += (str ? "&" : "") + property + "=" + encodeURIComponent(params[property]);
      }
    }
    return str;
  };
  /**
 @param {!number} length
 @param {string=} charset
 @return {string}
 */
CORE.randomString = function(length, charset) {
    charset || (charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
    var str = "", len = charset.length + 0.4999999;
    for (var i = 0; i < length; i++) {
      str += charset.charAt(Math.random() * len - 0.5 | 0);
    }
    return str;
  };
  /**
 @param {string} value
 @return {string}
 */
CORE.trim = function(value) {
    if (value) {
      var length = value.length, start = 0, end = length;
      while (start < length && (value[start] === " " || value[start] === "\t" || value[start] === "\n")) {
        start++;
      }
      while (length > start && (value[end - 1] === " " || value[end - 1] === "\t" || value[end - 1] === "\n")) {
        end--;
      }
      if (start || end !== length) {
        return value.substring(start, end);
      }
    }
    return value;
  };
  /**
 @param {Array<(string|number)>} array
 @param {string} field
 @return {Array<(string|number)>}
 */
CORE.unique = function(array, field) {
    if (DEBUG) {
      GRAPH.register("CORE.unique");
    }
    var checkDuplicates = {};
    var unqiue_array = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = field ? array[i][field] : array[i];
      checkDuplicates[value] || (checkDuplicates[value] = true) && (unqiue_array[unqiue_array.length] = value);
    }
    return unqiue_array;
  };
  /**
 @param {Array<*>} array_1
 @param {Array<*>} array_2
 @return {Array<*>}
 */
CORE.merge = function(array_1, array_2) {
    var args = arguments || [array_1, array_2], arg;
    for (var i = 1; i < args.length; i++) {
      if (arg = args[i]) {
        array_1 = (array_1 || []).concat(arg);
      }
    }
    return array_1;
  };
  /**
 @param {Array<*>} array
 @return {Array<*>}
 */
CORE.reverse = function(array) {
    if (DEBUG) {
      GRAPH.register("CORE.reverse");
    }
    var length = array.length;
    var reversed_array = new Array(length);
    for (var i = 0; i < length; i++) {
      reversed_array[i] = array[length - i - 1];
    }
    return reversed_array;
  };
  var compare_asc = function(a, b) {
    return ("" + a).localeCompare(b);
  };
  var compare_desc = function(a, b) {
    return ("" + b).localeCompare(a);
  };
  var compare_numeric_asc = function(a, b) {
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    if (isNaN(a)) {
      return 1;
    }
    if (isNaN(b)) {
      return -1;
    }
    return a - b;
  };
  var compare_numeric_desc = function(b, a) {
    if (a === null) {
      return -1;
    }
    if (b === null) {
      return 1;
    }
    if (isNaN(a)) {
      return -1;
    }
    if (isNaN(b)) {
      return 1;
    }
    return a - b;
  };
  /**
 @param {!Array<*>} array
 @param {Function=} cmp
 @return {Array<*>}
 */
CORE.sort = function(array, cmp) {
    return array.sort(cmp || compare_asc);
  };
  /**
 @param {!Array<*>} array
 @return {Array<*>}
 */
CORE.sortAsc = function(array) {
    return array.sort(compare_asc);
  };
  /**
 @param {!Array<*>} array
 @return {Array<*>}
 */
CORE.sortDesc = function(array) {
    return array.sort(compare_desc);
  };
  /**
 @param {!Array<*>} array
 @param {Function=} cmp
 @return {Array<*>}
 */
CORE.sortNum = function(array, cmp) {
    return array.sort(cmp || compare_numeric_asc);
  };
  /**
 @param {!Array<*>} array
 @return {Array<*>}
 */
CORE.sortNumAsc = function(array) {
    return array.sort(compare_numeric_asc);
  };
  /**
 @param {!Array<*>} array
 @return {Array<*>}
 */
CORE.sortNumDesc = function(array) {
    return array.sort(compare_numeric_desc);
  };
  /**
 @param {!Array<*>} array
 @param {number=} times
 @return {Array<*>}
 */
CORE.shuffle = function(array, times) {
    var length = array.length, tmp, index;
    for (var i = 0; i < length; i++) {
      index = Math.random() * length | 0;
      tmp = array[i];
      array[i] = array[index];
      array[index] = tmp;
    }
    return times && --times ? CORE.shuffle(array, times) : array;
  };
  /**
 @param {Date} date
 @return {string}
 */
CORE.formatDate = function(date) {
    if (DEBUG) {
      GRAPH.register("CORE.formatDate");
    }
    var d = new Date(date), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };
  CORE.formatNumber = function(n, c, d, t) {
    if (DEBUG) {
      GRAPH.register("CORE.formatNumber");
    }
    c = typeof c === "number" ? c : 2;
    d = d || ".";
    t = t || ",";
    var i = parseInt(n = CORE.Math.abs(+n || 0).toFixed(c), 10) + "", j = i.length;
    j = j > 3 ? j % 3 : 0;
    return (n < 0 ? "-" : "") + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + CORE.Math.abs(n - i).toFixed(c).slice(2) : "");
  };
  /**
 @param {Array<string>} images
 */
CORE.preloadImages = function(images) {
    if (DEBUG) {
      GRAPH.register("CORE.preloadImages");
    }
    var container = CORE.getById("image-preload") || function() {
      var node = CORE.parseNode(/** @type {_pattern_struct} */ ({tag:"div", id:"image-preload", attr:{"style":"display:none;position:absolute;height:0px;width:0px;overflow:hidden;pointer-events:none"}}));
      document.body.appendChild(node);
      return node;
    }();
    var img;
    for (var i = 0; i < images.length; i++) {
      img = new Image;
      img.setAttribute("lazyload", "true");
      img.src = images[i];
      CORE.setStyle(img, {"display":"none", "height":"0px", "width":"0px"});
      container.appendChild(img);
    }
  };
  /**
 @param {Function} fn
 @param {number=} delay
 @return {(number|null)}
 */
CORE.async = function(fn, delay) {
    if (DEBUG) {
      GRAPH.register("CORE.async");
    }
    return window.setTimeout(fn, delay);
  };
  /**
 @param {(Array<Function>|Function)} fn
 @param {number=} delay
 */
CORE.stack = function(fn, delay) {
    if (DEBUG) {
      GRAPH.register("CORE.stack");
    }
    var len = EXEC_STACK.length;
    if (fn.constructor === Array) {
      for (var i = 0; i < fn.length; i++) {
        EXEC_STACK[len++] = fn[i];
      }
    } else {
      EXEC_STACK[len] = fn;
    }
    if (!EXEC) {
      EXEC = true;
      CORE.async(runStack, delay);
    }
  };
  CORE.getStackLength = function() {
    return EXEC_STACK.length;
  };
  CORE.loadScript = function loadScript(src, callback) {
    var ready = false;
    var ready_fn = callback ? function() {
      if (!ready && (!this.readyState || this.readyState === "complete")) {
        ready = true;
        if (callback) {
          callback();
        }
      }
    } : void 0;
    document.body.appendChild(CORE.parseNode({tag:"script", attr:{"type":"text/javascript", "async":true, "src":src, "onload":ready_fn, "onreadystatechange":ready_fn}}));
  };
  CORE.loadStyle = function loadStyle(src, media) {
    document.body.appendChild(CORE.parseNode({tag:"link", attr:{"rel":"stylesheet", "type":"text/css", "href":src, "media":media || "all"}}));
  };
  CORE.time = function() {
    if (DEBUG) {
      GRAPH.register("CORE.time");
    }
    var time = window["performance"] || window[prefix + "Performance"] || {};
    time.now || (time.now = time["now"] || time[prefix + "Now"] || Date["now"] || function() {
      return (new Date).getTime();
    });
    return time;
  }();
  CORE.capitalize = capitalize;
  CORE.prefix = prefix;
  /**
 @param {string} str
 @return {number}
 */
CORE.crc32 = function(str) {
    if (DEBUG) {
      GRAPH.register("CORE.crc32");
    }
    var crc = 0 ^ -1;
    for (var i = 0; i < str.length; i++) {
      crc = crc >>> 8 ^ crcTable[(crc ^ str.charCodeAt(i)) & 255];
    }
    return (crc ^ -1) >>> 0;
  };
  /**
 @param {(Array<(number|string|boolean)>|string)} source
 @param {(number|string|boolean|null|undefined)} find
 @return {number}
 */
CORE.count = function(source, find) {
    var count = 0;
    if (typeof source === "string") {
      var pos = 0;
      var length = find.length;
      while ((pos = source.indexOf("" + find, pos)) !== -1) {
        count++;
        pos += length;
      }
    } else {
      if (CORE.isArray(source)) {
        var length = source.length;
        for (var i = 0; i < source.length; i++) {
          if (source[i] === find) {
            count++;
          }
        }
      } else {
        if (DEBUG) {
          throw new Error("'CORE.count' unsupported type passed.");
        }
      }
    }
    return count;
  };
  /**
 @param {(string|Array<*>)} source
 @param {*} find
 @param {*} replace
 @return {(string|Array<*>)}
 */
CORE.replace = function(source, find, replace) {
    if (typeof source === "string") {
      var pos = 0;
      var find_length = find.length;
      var replace_length = replace.length;
      while ((pos = source.indexOf("" + find, pos)) !== -1) {
        source = source.substring(0, pos) + replace + source.substring(pos + find_length);
        pos += replace_length;
      }
    } else {
      if (source.length) {
        var length = source.length;
        for (var i = 0; i < source.length; i++) {
          if (source[i] === find) {
            source[i] = replace;
          }
        }
      } else {
        if (DEBUG) {
          throw new Error("'CORE.replace' unsupported type passed.");
        }
      }
    }
    return source;
  };
  /**
 @param {Function} fn
 @return {Array<string>}
 */
var parse_fn = function parse_fn(fn) {
    if (DEBUG) {
      GRAPH.register("CORE.parse_fn");
    }
    var fn_string = fn.toString();
    var fn_parameter = fn_string.substring(fn_string.indexOf("(") + 1, fn_string.indexOf(")"));
    if (fn_parameter.indexOf(",") !== -1) {
      fn_parameter = fn_parameter.substring(0, fn_parameter.indexOf(","));
    }
    var fn_content = fn_string.substring(fn_string.indexOf("{") + 1, fn_string.length - 1);
    var fn_pre = fn_content.substring(0, fn_content.indexOf("return "));
    var fn_return = fn_content.substring(fn_content.indexOf("return ") + 7, fn_content.length).replace(";", "");
    return [fn_parameter, fn_pre, fn_return];
  };
  /**
 @param {Function} fn
 @return {Function}
 */
CORE.registerEach = function registerEach(fn) {
    if (DEBUG) {
      GRAPH.register("CORE.registerEach");
    }
    var parsed_fn = parse_fn(fn);
    var parameter = parsed_fn[0];
    var fn_content = "var $i = 0, $length = $self.length, " + parameter + ";" + "for(; $i < $length; $i++){" + parameter + " = $self[$i];" + parsed_fn[1] + "}" + "return $self;";
    return Function("$self", fn_content);
  };
  /**
 @param {Function} fn
 @return {Function}
 */
CORE.registerMap = function registerMap(fn) {
    if (DEBUG) {
      GRAPH.register("CORE.registerMap");
    }
    var parsed_fn = parse_fn(fn);
    var parameter = parsed_fn[0];
    var fn_content = "var $i = 0, $length = $self.length, $copy = $edit ? $self : new Array($length), " + parameter + ";" + "for(; $i < $length; $i++){" + parameter + " = $self[$i];" + parsed_fn[1] + "$copy[$i] = " + parsed_fn[2] + ";" + "}" + "return $copy;";
    return Function("$self", "$edit", fn_content);
  };
  /**
 @param {Function} fn
 @return {Function}
 */
CORE.registerFilter = function registerFilter(fn) {
    if (DEBUG) {
      GRAPH.register("CORE.registerFilter");
    }
    var parsed_fn = parse_fn(fn);
    var parameter = parsed_fn[0];
    var fn_content = "var $i = 0, $length = $self.length, $copy = $edit ? $self : [], $count = 0, " + parameter + ";" + "for(; $i < $length; $i++){" + parameter + " = $self[$i];" + parsed_fn[1] + "if($edit){ if(!(" + parsed_fn[2] + ")){$copy.splice($i--, 1); $length--;}}" + "else if(" + parsed_fn[2] + ") $copy[$count++] = " + parameter + ";" + "};" + "return $copy;";
    return Function("$self", "$edit", fn_content);
  };
  /**
 @param {Array} array
 @param {*} item
 @return {boolean}
 */
CORE.contains = function(array, item) {
    if (DEBUG) {
      GRAPH.register("CORE.contains");
    }
    var i = array.length;
    while (i--) {
      if (array[i] === item) {
        return true;
      }
    }
    return false;
  };
  /**
 @param {!Array} array
 @param {*} content
 @param {number=} start
 @param {number=} count
 @return {!Array}
 */
CORE.fill = function(array, content, start, count) {
    var length = count >= 0 ? Math.min(start + count, array.length) : array.length;
    for (var i = start || 0; i < length; i++) {
      array[i] = content;
    }
    return array;
  };
  /**
 @const
 @param {Object<string,*>} data
 @return {Array<string>}
 */
CORE.getKeys = function(data) {
    if (DEBUG) {
      GRAPH.register("CORE.getKeys");
    }
    if (data) {
      if (Object.keys) {
        return Object.keys(data);
      }
      var tmp = [], length = 0;
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          tmp[length++] = key;
        }
      }
      return tmp;
    }
    return [];
  };
  CORE.assign = function(target, source) {
    if (!source || typeof source !== "object") {
      return target;
    }
    var props = Object.keys(source);
    var prop;
    var length = props.length;
    for (var i = 0; i < length; i++) {
      prop = props[i];
      target[prop] = source[prop];
    }
  };
  /**
 @param {!string} query
 @return {Object<string,*>}
 */
CORE.parseQuery = function(query) {
    var payload = {};
    if ((query = String(query)).length) {
      var pos;
      if (query[0] === "?") {
        query = query.substring(1);
      } else {
        if ((pos = query.indexOf("?")) !== -1) {
          query = query.substring(pos + 1);
        }
      }
      var array = query.split("&");
      var entry;
      var float;
      var value;
      for (var i = 0; i < array.length; i++) {
        entry = array[i].split("=");
        if (entry[0]) {
          value = entry[1];
          if (value === "false") {
            value = false;
          } else {
            if (value === "true") {
              value = true;
            } else {
              if (value === "null") {
                value = null;
              } else {
                if (value.length === String(float = parseFloat(value)).length) {
                  value = float;
                } else {
                  value = decodeURIComponent(value || "");
                }
              }
            }
          }
          payload[decodeURIComponent(entry[0])] = value;
        }
      }
    }
    return payload;
  };
  /**
 @param {!string} src
 @param {!Function} callback
 @param {string=} format
 @param {number=} quality
 */
CORE.imageToDataUrl = function(src, callback, format, quality) {
    if (DEBUG) {
      GRAPH.register("CORE.imageToDataUrl");
    }
    var img = new Image;
    /**
 @this {Image}
 */
img.crossOrigin = "anonymous";
    img.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.height = /** @type {Image} */ (this).height;
      canvas.width = /** @type {Image} */ (this).width;
      canvas.getContext("2d").drawImage(this, 0, 0);
      callback(canvas.toDataURL(format || "image/jpeg", quality || 1.0));
    };
    img.src = src;
  };
  /** @const @struct */ CORE.Math = {/**
 @param {(!Array<number>|number)} a
 @param {!number=} b
 @return {!number}
 */
min:function min(a, b) {
    if (DEBUG) {
      GRAPH.register("CORE.Math.min");
    }
    if (a.constructor === Array) {
      var min = a[0];
      for (var i = 0; i < a.length; i++) {
        if (i === 0) {
          min = a[0];
        } else {
          if (a[i] < min) {
            min = a[i];
          }
        }
      }
      return min;
    } else {
      return /** @type {number} */ (b < a ? b : a);
    }
  }, /**
 @param {(!Array<number>|number)} a
 @param {!number=} b
 @return {!number}
 */
max:function max(a, b) {
    if (DEBUG) {
      GRAPH.register("CORE.Math.max");
    }
    if (a.constructor === Array) {
      var max = a[0];
      for (var i = 0; i < a.length; i++) {
        if (i === 0) {
          max = a[0];
        } else {
          if (a[i] > max) {
            max = a[i];
          }
        }
      }
      return max;
    } else {
      return /** @type {number} */ (a < b ? b : a);
    }
  }, rad:window.Math.PI / 180, cos:window.Math.cos, sin:window.Math.sin, round:function(number) {
    return number >= 0 ? number + 0.5 | 0 : number - 0.5 | 0;
  }, rand:window.Math.random, abs:function abs(a) {
    if (DEBUG) {
      GRAPH.register("CORE.Math.abs");
    }
    return a < 0 ? -a : a;
  }};
  /** @const @struct */ CORE.Browser = {/** @type {boolean} */ isOpera:!!window["opera"] || navigator.userAgent.indexOf(" OPR/") >= 0, /** @type {boolean} */ isFirefox:typeof window["InstallTrigger"] !== "undefined", /** @type {boolean} */ isSafari:Object.prototype.toString.call(window["HTMLElement"]).indexOf("Constructor") > 0, /** @type {boolean} */ isMSIE:false || !!document["documentMode"]};
  /** @type {boolean} */ CORE.Browser.isChrome = !!window["chrome"] && !CORE.Browser.isOpera;
  /** @type {function(string):boolean} */ CORE.Browser.is = fn_is;
  /** @const @struct */ CORE.System = {/** @type {boolean} */ isIphone:!!navigator.userAgent.match(/iPhone/i), /** @type {boolean} */ isIpod:!!navigator.userAgent.match(/iPod/i), /** @type {boolean} */ isIpad:!!navigator.userAgent.match(/iPad/i), /** @type {boolean} */ isAndroid:!!navigator.userAgent.match(/Android/i), /** @type {boolean} */ isCordova:!!window["cordova"]};
  /** @type {boolean} */ CORE.System.isIOS = CORE.System.isIphone || CORE.System.isIpod || CORE.System.isIpad;
  /** @type {boolean} */ CORE.System.isMobile = CORE.System.isIOS || CORE.System.isAndroid;
  /** @type {function(string):boolean} */ CORE.System.is = fn_is;
  /**
 @param {!string} type
 @return {boolean}
 */
function fn_is(type) {
    var fn_name = "is" + type[0].toUpperCase() + type.substring(1);
    if (DEBUG) {
      if (typeof this[fn_name] === "undefined") {
        CORE.console.warn("WARNING: The passed type '" + type + "' is not defined!");
      }
    }
    return this[fn_name];
  }
})();




/** @struct */ var APP = {MODEL:{}, /** @type {Object<string,Array<_model_helper>>} */ VIEW:{}, /** @type {Object<string,Array<_template_struct>>} */ HTML:{}, /**
 @implements {_controller_struct}
 */
CONTROLLER:{}, ROUTE:{}, PAYLOAD:{}, EVENT:{}, HANDLER:{}, HELPER:{}, /** @type {_storage_struct} */ STORAGE:{DATA:{}, CACHE:{}, SESSION:{}, VIEW:/** @type {_storage_struct} */ ({}), /**
 @param {string} val
 @return {string}
 */
compress:function(val) {
  return val;
}, /**
 @param {string} val
 @return {string}
 */
decompress:function(val) {
  return val;
}}, MAPPER:{}, LAYOUT:{}, VIEWPORT:{}, WORKER:{}, DEVICE:{}, LANG:{}, CONFIG:{LANG:"en", PROC:0, GZIP:false, PASSIVE_EVENTS:false, EVENT_OPTIONS:false, SHOW_DEBUG:false, SHOW_GRAPH:false, SHOW_STATS:false, LAYOUT:[]}, VARS:{CURRENT_USER:{}, HEADER:{}, AUTH:null, ZOOM:1, WIDTH:0, HEIGHT:0, DPR:Math.max(1, Math.min(3, Math.round(window["devicePixelRatio"] || 1))), USED_STORAGE:0, MAX_STORAGE:0}, STATS:{}, SETTINGS:/** @type {_storage_struct} */ ({}), CACHE:{}, CRC32:{}, PLUGIN:{}, INTERFACE:{}, ADAPTER:{}, 
SERVICE:{}, REQUIRE:{}, VALIDATE:{}, CHANGELOG:{}, MIGRATE:{}, INIT:function() {
}, SETUP:function() {
  APP.MAIN();
}, MAIN:function() {
  if (DEBUG) {
    CORE.console.log("Error: no main function found!");
  }
}};















if (DEBUG) {
  var DEBUGGER = function() {
    (function initDebugMode() {
      var performance = window["performance"] || {};
      performance = performance["memory"] || (performance["memory"] = {});
      APP.STATS = {heap_limit:performance["jsHeapSizeLimit"] || 0, heap_total:performance["totalJSHeapSize"] || 0, heap_used:performance["usedJSHeapSize"] || 0, count_draw:0, count_dom:0, count_paint:0, count_css:0, count_class:0, count_html:0, count_render:0, count_request:0, count_event:0, count_bubble:0, count_error:0, count_dom_cache:0, count_css_cache:0, count_class_cache:0, count_html_cache:0, count_render_cache:0, count_mapper_cache:0, count_event_cache:0, count_bubble_cache:0, count_mapper:0, 
      time_calc:0, time_render:0, time_draw:0, time_request:0, time_event:0};
      CORE.buildPattern(/** @type {Array<_pattern_struct>} */ ([{tag:"div", attr:{"id":"debug-log"}}, {tag:"div", attr:{"id":"debug-graph"}, child:[{tag:"div", attr:{"id":"debug-graph-count"}}, {tag:"div", attr:{"id":"debug-graph-trace"}}]}, {tag:"div", attr:{"id":"debug-stats"}, child:[{tag:"span", text:"FPS: "}, {tag:"span", attr:{"id":"debug-fps"}}, {tag:"br"}, {tag:"br"}, {tag:"span", text:"Models Stored: "}, {tag:"span", attr:{"id":"debug-models-stored"}}, {tag:"br"}, {tag:"span", text:"Models Cached: "}, 
      {tag:"span", attr:{"id":"debug-models-cached"}}, {tag:"br"}, {tag:"br"}, {tag:"span", text:"Count DOM: "}, {tag:"span", attr:{"id":"debug-count-dom"}}, {tag:"br"}, {tag:"span", text:"Count Paint: "}, {tag:"span", attr:{"id":"debug-count-paint"}}, {tag:"br"}, {tag:"span", text:"Count CSS: "}, {tag:"span", attr:{"id":"debug-count-css"}}, {tag:"br"}, {tag:"span", text:"Count Class: "}, {tag:"span", attr:{"id":"debug-count-class"}}, {tag:"br"}, {tag:"span", text:"Count HTML: "}, {tag:"span", attr:{"id":"debug-count-html"}}, 
      {tag:"br"}, {tag:"span", text:"Count Render: "}, {tag:"span", attr:{"id":"debug-count-render"}}, {tag:"br"}, {tag:"span", text:"Count Mapper: "}, {tag:"span", attr:{"id":"debug-count-mapper"}}, {tag:"br"}, {tag:"span", text:"Count Events: "}, {tag:"span", attr:{"id":"debug-count-event"}}, {tag:"br"}, {tag:"span", text:"Count Bubble: "}, {tag:"span", attr:{"id":"debug-count-bubble"}}, {tag:"br"}, {tag:"span", text:"Count Error: "}, {tag:"span", attr:{"id":"debug-count-error"}}, {tag:"br"}, {tag:"br"}, 
      {tag:"span", text:"Time Calc: "}, {tag:"span", attr:{"id":"debug-time-calc"}}, {tag:"br"}, {tag:"span", text:"Time Render: "}, {tag:"span", attr:{"id":"debug-time-render"}}, {tag:"br"}, {tag:"span", text:"Time Draw: "}, {tag:"span", attr:{"id":"debug-time-draw"}}, {tag:"br"}, {tag:"span", text:"Time Event: "}, {tag:"span", attr:{"id":"debug-time-event"}}, {tag:"br"}, {tag:"span", text:"Time Server: "}, {tag:"span", attr:{"id":"debug-time-request"}}, {tag:"br"}, {tag:"br"}, {tag:"span", text:"Paint Stack: "}, 
      {tag:"span", attr:{"id":"debug-paint-stack"}}, {tag:"br"}, {tag:"span", text:"CSS Stack: "}, {tag:"span", attr:{"id":"debug-css-stack"}}, {tag:"br"}, {tag:"span", text:"Class Stack: "}, {tag:"span", attr:{"id":"debug-class-stack"}}, {tag:"br"}, {tag:"span", text:"HTML Stack: "}, {tag:"span", attr:{"id":"debug-html-stack"}}, {tag:"br"}, {tag:"span", text:"Async Stack: "}, {tag:"span", attr:{"id":"debug-async-stack"}}, {tag:"br"}, {tag:"br"}, {tag:"span", text:"Heap Limit: "}, {tag:"span", attr:{"id":"debug-heap-limit"}}, 
      {tag:"br"}, {tag:"span", text:"Heap Total: "}, {tag:"span", attr:{"id":"debug-heap-total"}}, {tag:"br"}, {tag:"span", text:"Heap Used: "}, {tag:"span", attr:{"id":"debug-heap-used"}}, {tag:"br"}, {tag:"span", text:"Storage: "}, {tag:"span", attr:{"id":"debug-storage"}}]}]), window.document.body);
      /**
 @param {string} errorMsg
 @param {string} url
 @param {number} lineNumber
 */
window.onerror = function(errorMsg, url, lineNumber) {
        APP.STATS.count_error++;
        if (DEBUG) {
          CORE.console.log(errorMsg + " Script: " + url + " Line: " + lineNumber);
        }
      };
    })();
    /** @type {number} */ var debug_paint_stack = 0;
    /** @type {number} */ var debug_css_stack = 0;
    /** @type {number} */ var debug_class_stack = 0;
    /** @type {number} */ var debug_html_stack = 0;
    /** @type {number} */ var debug_async_stack = 0;
    return {showStatistic:function(time, last_time) {
      var count_dom = APP.STATS.count_dom;
      var count_dom_cache = APP.STATS.count_dom_cache;
      if (CONFIG.SHOW_DEBUG || APP.CONFIG.SHOW_DEBUG) {
        CORE.getById("debug-fps").textContent = 1000 / (time - last_time) + 0.5 | 0;
        var debug_models_stored = 0;
        var debug_models_cached = 0;
        for (var model in APP.MODEL) {
          if (APP.MODEL.hasOwnProperty(model)) {
            debug_models_stored += CORE.getKeys(/** @type {_model_class} */ (APP.MODEL[model]).data).length;
            debug_models_cached += CORE.getKeys(/** @type {_model_class} */ (APP.MODEL[model]).cache).length;
          }
        }
        CORE.getById("debug-models-stored").textContent = debug_models_stored;
        CORE.getById("debug-models-cached").textContent = debug_models_cached;
        CORE.getById("debug-count-dom").textContent = count_dom + " (-" + count_dom_cache + ")";
        CORE.getById("debug-count-paint").textContent = APP.STATS.count_paint + " (-0)";
        CORE.getById("debug-count-css").textContent = APP.STATS.count_css + " (-" + APP.STATS.count_css_cache + ")";
        CORE.getById("debug-count-class").textContent = APP.STATS.count_class + " (-" + APP.STATS.count_class_cache + ")";
        CORE.getById("debug-count-html").textContent = APP.STATS.count_html + " (-" + APP.STATS.count_html_cache + ")";
        CORE.getById("debug-count-render").textContent = APP.STATS.count_render + " (-" + APP.STATS.count_render_cache + ")";
        CORE.getById("debug-count-mapper").textContent = APP.STATS.count_mapper + " (-" + APP.STATS.count_mapper_cache + ")";
        CORE.getById("debug-count-event").textContent = APP.STATS.count_event + " (-" + APP.STATS.count_event_cache + ")";
        CORE.getById("debug-count-bubble").textContent = APP.STATS.count_bubble + " (-" + APP.STATS.count_bubble_cache + ")";
        CORE.getById("debug-count-error").textContent = APP.STATS.count_error;
        CORE.getById("debug-time-calc").textContent = (APP.STATS.time_calc * 100 | 0) / 100 + " ms (~0 ms)";
        CORE.getById("debug-time-render").textContent = (APP.STATS.time_render * 100 | 0) / 100 + " ms (~" + (APP.STATS.time_render / APP.STATS.count_render * 100 | 0) / 100 + " ms)";
        CORE.getById("debug-time-draw").textContent = (APP.STATS.time_draw * 100 | 0) / 100 + " ms (~" + (APP.STATS.time_draw / APP.STATS.count_draw * 100 | 0) / 100 + " ms)";
        CORE.getById("debug-time-event").textContent = (APP.STATS.time_event * 100 | 0) / 100 + " ms (~" + (APP.STATS.time_event / APP.STATS.count_event * 100 | 0) / 100 + " ms)";
        CORE.getById("debug-time-request").textContent = (APP.STATS.time_request * 100 | 0) / 100 + " ms (~" + (APP.STATS.time_request / APP.STATS.count_request * 100 | 0) / 100 + " ms)";
        var paint_stack_len;
        var css_stack_len;
        var class_stack_len;
        var html_stack_len;
        var async_stack_len;
        if (paint_stack_len = APP.STATS.paint_stack_len) {
          debug_paint_stack += paint_stack_len;
          CORE.async(function() {
            debug_paint_stack -= paint_stack_len;
          }, 500);
        }
        if (css_stack_len = APP.STATS.css_stack_len) {
          debug_css_stack += css_stack_len;
          CORE.async(function() {
            debug_css_stack -= css_stack_len;
          }, 500);
        }
        if (class_stack_len = APP.STATS.class_stack_len) {
          debug_class_stack += class_stack_len;
          CORE.async(function() {
            debug_class_stack -= class_stack_len;
          }, 500);
        }
        if (html_stack_len = APP.STATS.html_stack_len) {
          debug_html_stack += html_stack_len;
          CORE.async(function() {
            debug_html_stack -= html_stack_len;
          }, 500);
        }
        if (async_stack_len = APP.STATS.async_stack_len) {
          debug_async_stack += async_stack_len;
          CORE.async(function() {
            debug_async_stack -= async_stack_len;
          }, 250);
        }
        CORE.getById("debug-paint-stack").textContent = debug_paint_stack + "";
        CORE.getById("debug-css-stack").textContent = debug_css_stack + "";
        CORE.getById("debug-class-stack").textContent = debug_class_stack + "";
        CORE.getById("debug-html-stack").textContent = debug_html_stack + "";
        CORE.getById("debug-async-stack").textContent = debug_async_stack + "";
        var performance = window["performance"] || {};
        performance = performance["memory"] || (performance["memory"] = {});
        CORE.getById("debug-heap-limit").textContent = (performance["jsHeapSizeLimit"] / 1024 / 1024 * 100 | 0) / 100 + " Mb" || "?";
        CORE.getById("debug-heap-total").textContent = (performance["totalJSHeapSize"] / 1024 / 1024 * 100 | 0) / 100 + " Mb" || "?";
        CORE.getById("debug-heap-used").textContent = (performance["usedJSHeapSize"] / 1024 / 1024 * 100 | 0) / 100 + " Mb (" + (100 / performance["totalJSHeapSize"] * performance["usedJSHeapSize"] * 100 | 0) / 100 + "%)" || "?";
        CORE.getById("debug-storage").textContent = (APP.VARS.USED_STORAGE / 1024 / 1024 * 100 | 0) / 100 + " / " + (APP.VARS.MAX_STORAGE / 1024 / 1024 * 100 | 0) / 100 + " Mb (" + (100 / APP.VARS.MAX_STORAGE * APP.VARS.USED_STORAGE * 100 | 0) / 100 + "%)";
        APP.STATS.count_dom = count_dom;
        APP.STATS.count_dom_cache = count_dom_cache;
      }
    }};
  }();
}
;



(function() {
  /** @type {string} */ var prefix = CORE.prefix;
  /** @type {string} */ var prefix_css = CORE.capitalize(prefix);
  /** @type {(Array<number>|null)} */ var PAINT_TIMER = null;
  /** @type {boolean} */ var PAINT_EXEC = false;
  /** @type {Array<Function>} */ var PAINT_STACK = [];
  /** @type {Array<(HTMLElement|null)>} */ var CSS_STACK = [];
  /** @type {Array<(HTMLElement|null)>} */ var CLASS_STACK = [];
  /** @type {Array<(HTMLElement|null)>} */ var HTML_STACK = [];
  /** @type {(number|null)} */ var last_time = null;
  /**
 @const
 @param {number} time
 */
var processPaint = function(time) {
    PAINT_EXEC = true;
    PAINT_TIMER = requestFrame(processPaint);
    if (DEBUG) {
      GRAPH.register("CORE.processPaint");
      var debug_time = PAINT_STACK.length || CSS_STACK.length || HTML_STACK.length || CLASS_STACK.length ? CORE.time.now() : 0;
    }
    var len, i;
    if (len = HTML_STACK.length) {
      for (i = 0; i < len; i++) {
        var current_node = HTML_STACK[i];
        if (current_node["_html_new"] !== false) {
          if (current_node["_html_new"] !== current_node["_html"]) {
            current_node.innerHTML = current_node["_html"] = current_node["_html_new"];
            if (DEBUG) {
              APP.STATS.count_html++;
            }
          } else {
            if (DEBUG) {
              APP.STATS.count_html_cache++;
            }
          }
          current_node["_html_new"] = false;
        } else {
          if (DEBUG) {
            APP.STATS.count_html_cache++;
          }
        }
      }
      HTML_STACK = [];
    }
    if (len = CSS_STACK.length) {
      for (i = 0; i < len; i++) {
        var current_node = CSS_STACK[i];
        var current_cache = current_node["_style"];
        var current_cache_new = current_node["_style_new"];
        var current_cache_keys = current_node["_style_keys"];
        var style = null;
        for (var x = 0; x < current_cache_keys.length; x++) {
          var key = current_cache_keys[x];
          var current_cache_value = current_cache_new[key];
          if (current_cache_value !== false) {
            if (current_cache_value !== current_cache[key]) {
              (style || (style = current_node.style))[key] = current_cache[key] = current_cache_value;
              if (DEBUG) {
                APP.STATS.count_css++;
              }
            } else {
              if (DEBUG) {
                APP.STATS.count_css_cache++;
              }
            }
            current_cache_new[key] = false;
          } else {
            if (DEBUG) {
              APP.STATS.count_css_cache++;
            }
          }
        }
        current_node["_style_keys"] = [];
      }
      if (DEBUG) {
        APP.STATS.count_css += len;
      }
      CSS_STACK = [];
    }
    if (len = CLASS_STACK.length) {
      for (i = 0; i < len; i++) {
        var current_node = CLASS_STACK[i];
        var current_cache = current_node["_class"];
        var current_cache_new = current_node["_class_new"];
        var current_cache_keys = current_node["_class_keys"];
        var add_classes = [];
        var remove_classes = [];
        for (var x = 0; x < current_cache_keys.length; x++) {
          var key = current_cache_keys[x];
          if (current_cache_new[key] !== false) {
            if (current_cache[key] !== current_cache_new[key]) {
              if (current_cache_new[key] === 1) {
                add_classes[add_classes.length] = key;
                current_cache[key] = 1;
              } else {
                remove_classes[remove_classes.length] = key;
                current_cache[key] = 0;
              }
              if (DEBUG) {
                APP.STATS.count_class++;
              }
            } else {
              if (DEBUG) {
                APP.STATS.count_class_cache++;
              }
            }
            current_cache_new[key] = false;
          } else {
            if (DEBUG) {
              APP.STATS.count_class_cache++;
            }
          }
        }
        if (remove_classes.length) {
          current_node.classList.remove.apply(current_node.classList, remove_classes);
        }
        if (add_classes.length) {
          current_node.classList.add.apply(current_node.classList, add_classes);
        }
        current_node["_class_keys"] = [];
      }
      if (DEBUG) {
        APP.STATS.count_class += len;
      }
      CLASS_STACK = [];
    }
    if (len = PAINT_STACK.length) {
      for (i = 0; i < len; i++) {
        PAINT_STACK[i](time);
      }
      PAINT_STACK.splice(0, len);
      if (DEBUG) {
        APP.STATS.count_paint += len;
      }
    }
    if (DEBUG) {
      if (debug_time > 0) {
        APP.STATS.time_draw += CORE.time.now() - debug_time;
      }
      APP.STATS.count_draw++;
      APP.STATS.paint_stack_len = PAINT_STACK.length;
      APP.STATS.css_stack_len = CSS_STACK.length;
      APP.STATS.class_stack_len = CLASS_STACK.length;
      APP.STATS.html_stack_len = HTML_STACK.length;
      APP.STATS.async_stack_len = CORE.getStackLength();
      DEBUGGER.showStatistic(time, last_time);
      last_time = time;
    }
    if (!APP.CONFIG.SHOW_STATS && !PAINT_STACK.length && !CSS_STACK.length && !HTML_STACK.length && !CLASS_STACK.length) {
      clearFrame(PAINT_TIMER);
      PAINT_TIMER = null;
    }
    PAINT_EXEC = false;
  };
  /** @const */ var requestFrame = window.requestAnimationFrame || window[prefix + "RequestAnimationFrame"] || function(fn) {
    return CORE.async(function() {
      fn(CORE.time.now());
    }, 16.667);
  };
  /** @const */ var clearFrame = window.cancelAnimationFrame || window[prefix + "CancelAnimationFrame"] || function(id) {
    return null;
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} node
 @param {string} class_name
 @param {boolean=} search_and_remove
 @return {boolean}
 */
CORE.hasClass = function hasClass(node, class_name, search_and_remove) {
    if (DEBUG) {
      GRAPH.register("CORE.hasClass");
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      node = node[0];
    }
    if (!CONFIG.ENABLE_CLASS_CACHE) {
      return node.classList.contains(class_name);
    }
    var current_cache_new;
    if (current_cache_new = node["_class_new"]) {
      if (current_cache_new[class_name] !== false && CORE.isType(current_cache_new[class_name])) {
        return current_cache_new[class_name] ? true : false;
      }
    } else {
      node["_class_new"] = {};
    }
    var current_cache;
    if (current_cache = node["_class"]) {
      if (CORE.isType(current_cache[class_name])) {
        return current_cache[class_name] ? true : false;
      }
    } else {
      current_cache = node["_class"] = {};
    }
    return (current_cache[class_name] = node.classList.contains(class_name) ? 1 : 0) ? true : false;
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} node
 @param {(Array<string>|string)} class_name
 @param {Function=} callback
 */
CORE.addClass = function addClass(node, class_name, callback) {
    if (DEBUG) {
      GRAPH.register("CORE.addClass");
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      var i = 0;
      while (i < node.length) {
        CORE.addClass(node[i++], class_name, callback && i === node.length - 1 ? callback : void 0);
      }
      return;
    }
    if (CORE.isType(class_name, "string")) {
      class_name = [class_name];
    }
    if (!CONFIG.ENABLE_CLASS_CACHE) {
      return node.classList.toggle.apply(node.classList, class_name);
    }
    var current_cache = node["_class"] || (node["_class"] = {});
    var current_cache_new = node["_class_new"] || (node["_class_new"] = {});
    var current_cache_keys = node["_class_keys"] || (node["_class_keys"] = []);
    var len = CLASS_STACK.length;
    var keys_len = current_cache_keys.length;
    for (var i = 0; i < class_name.length; i++) {
      var current_class = class_name[i];
      if (current_cache[current_class] !== 1) {
        if (current_cache_new[current_class] !== 1) {
          if (!keys_len) {
            CLASS_STACK[len++] = /** @type {HTMLElement} */ (node);
          }
          current_cache_new[current_class] = 1;
          if (!CORE.contains(current_cache_keys, current_class)) {
            current_cache_keys[keys_len++] = current_class;
          }
        } else {
          if (DEBUG) {
            APP.STATS.count_class_cache++;
          }
        }
      } else {
        current_cache_new[current_class] = false;
        if (DEBUG) {
          APP.STATS.count_class_cache++;
        }
      }
    }
    if (callback) {
      CORE.paint(function() {
        callback.call(node);
      });
    }
    if (len || callback) {
      PAINT_TIMER || (PAINT_TIMER = requestFrame(processPaint));
    }
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} node
 @param {(Array<string>|string)} class_name
 @param {Function=} callback
 */
CORE.removeClass = function removeClass(node, class_name, callback) {
    if (DEBUG) {
      GRAPH.register("CORE.removeClass");
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      var i = 0;
      while (i < node.length) {
        CORE.removeClass(node[i++], class_name, callback && i === node.length - 1 ? callback : void 0);
      }
      return;
    }
    if (CORE.isType(class_name, "string")) {
      class_name = [class_name];
    }
    if (!CONFIG.ENABLE_CLASS_CACHE) {
      return node.classList.remove.apply(node.classList, class_name);
    }
    var current_cache = node["_class"] || (node["_class"] = {});
    var current_cache_new = node["_class_new"] || (node["_class_new"] = {});
    var current_cache_keys = node["_class_keys"] || (node["_class_keys"] = []);
    var len = CLASS_STACK.length;
    var keys_len = current_cache_keys.length;
    for (var i = 0; i < class_name.length; i++) {
      var current_class = class_name[i];
      if (current_cache[current_class] !== 0) {
        if (current_cache_new[current_class] !== 0) {
          if (!keys_len) {
            CLASS_STACK[len++] = /** @type {HTMLElement} */ (node);
          }
          current_cache_new[current_class] = 0;
          if (!CORE.contains(current_cache_keys, current_class)) {
            current_cache_keys[keys_len++] = current_class;
          }
        } else {
          if (DEBUG) {
            APP.STATS.count_class_cache++;
          }
        }
      } else {
        current_cache_new[current_class] = false;
        if (DEBUG) {
          APP.STATS.count_class_cache++;
        }
      }
    }
    if (callback) {
      CORE.paint(function() {
        callback.call(node);
      });
    }
    if (len || callback) {
      PAINT_TIMER || (PAINT_TIMER = requestFrame(processPaint));
    }
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} node
 @param {string} class_name
 @param {Function=} callback
 @param {boolean=} toggle_state
 */
CORE.toggleClass = function toggleClass(node, class_name, callback, toggle_state) {
    if (DEBUG) {
      GRAPH.register("CORE.toggleClass");
    }
    if (CORE.isType(toggle_state)) {
      if (toggle_state) {
        CORE.addClass(node, class_name, callback);
      } else {
        CORE.removeClass(node, class_name, callback);
      }
      return;
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      for (var i = 0; i < node.length; i++) {
        CORE.toggleClass(node[i], class_name, i === node.length - 1 ? callback : void 0);
      }
      return;
    }
    if (!CONFIG.ENABLE_CLASS_CACHE) {
      return node.classList.toggle(class_name);
    }
    var current_cache = node["_class"] || (node["_class"] = {});
    var current_cache_new = node["_class_new"] || (node["_class_new"] = {});
    var current_cache_keys = node["_class_keys"] || (node["_class_keys"] = []);
    var len = CLASS_STACK.length;
    var keys_len = current_cache_keys.length;
    if (CORE.isType(current_cache_new[class_name])) {
      if (current_cache_new[class_name] === false || !(current_cache[class_name] === 0 && current_cache_new[class_name] === 1 || current_cache[class_name] === 1 && current_cache_new[class_name] === 0)) {
        if (!keys_len) {
          CLASS_STACK[len++] = /** @type {HTMLElement} */ (node);
        }
        if (!CORE.contains(current_cache_keys, class_name)) {
          current_cache_keys[keys_len] = class_name;
        }
        current_cache_new[class_name] = (current_cache_new[class_name] === false ? current_cache : current_cache_new)[class_name] ? 0 : 1;
      } else {
        current_cache_new[class_name] = false;
        if (DEBUG) {
          APP.STATS.count_class_cache++;
        }
      }
    } else {
      if (!keys_len) {
        CLASS_STACK[len++] = /** @type {HTMLElement} */ (node);
      }
      if (!CORE.isType(current_cache[class_name])) {
        current_cache[class_name] = node.classList.contains(class_name) ? 1 : 0;
      }
      if (!CORE.contains(current_cache_keys, class_name)) {
        current_cache_keys[keys_len] = class_name;
      }
      current_cache_new[class_name] = current_cache[class_name] ? 0 : 1;
    }
    if (callback) {
      CORE.paint(function() {
        callback.call(node);
      });
    }
    if (len || callback) {
      PAINT_TIMER || (PAINT_TIMER = requestFrame(processPaint));
    }
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} _obj
 @param {string=} style
 @return {(CSSStyleDeclaration|CSSValue|string|undefined)}
 */
CORE.getStyle = function getStyle(_obj, style) {
    if (DEBUG) {
      GRAPH.register("CORE.getStyle");
    }
    var obj = typeof _obj === "string" ? CORE.query(_obj) : _obj;
    if (obj.length >= 0) {
      obj = obj[0];
    }
    if (!obj) {
      if (DEBUG) {
        CORE.console.err("ERROR: Element was not found: " + _obj);
      }
      return;
    }
    if (style) {
      if (!CONFIG.ENABLE_STYLE_CACHE) {
        return obj.style[style] || window.getComputedStyle(obj, null)[style];
      }
      var val;
      var current_cache = obj["_style"];
      var current_cache_new = obj["_style_new"];
      if (current_cache_new) {
        val = current_cache_new[style];
        if (val !== false && CORE.isType(val)) {
          return val;
        }
      } else {
        obj["_style_new"] = {};
        obj["_style_keys"] = [];
      }
      if (current_cache) {
        val = current_cache[style];
        if (CORE.isType(val)) {
          return val;
        }
      } else {
        current_cache = obj["_style"] = {};
      }
      /** @type {CSSStyleDeclaration} */ var css = obj.style;
      for (var i = 0; i < css.length; i++) {
        if (css[i] === style) {
          return current_cache[style] = css[style];
        }
      }
      return current_cache[style] = window.getComputedStyle(/** @type {HTMLElement} */ (obj), null)[style];
    } else {
      return window.getComputedStyle(obj, null);
    }
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} _obj
 @param {(Object<string,(string|number)>|string|number)} css
 @param {(string|number)=} val
 */
CORE.setStyle = function setStyle(_obj, css, val) {
    if (DEBUG) {
      GRAPH.register("CORE.setStyle");
    }
    var obj = typeof _obj === "string" ? CORE.query(_obj) : _obj;
    if (!obj) {
      if (DEBUG) {
        CORE.console.err("ERROR: Element was not found: " + _obj);
      }
      return;
    }
    var length = obj.length;
    if (length >= 0) {
      for (var i = 0; i < length; i++) {
        CORE.setStyle(obj[i], css, val);
      }
      return;
    }
    if (!CONFIG.ENABLE_STYLE_CACHE) {
      if (CORE.isType(val)) {
        obj.style[css] = val;
        return;
      } else {
        for (var css_key in css) {
          obj.style[css_key] = css[css_key];
        }
        return;
      }
    }
    var current_cache = obj["_style"] || (obj["_style"] = {});
    var current_cache_new = obj["_style_new"] || (obj["_style_new"] = {});
    var current_cache_keys = obj["_style_keys"] || (obj["_style_keys"] = []);
    var len = CSS_STACK.length;
    var keys_len = current_cache_keys.length;
    if (CORE.isType(val)) {
      if (current_cache[css] !== val) {
        if (current_cache_new[css] === false || current_cache_new[css] !== val) {
          if (!keys_len) {
            CSS_STACK[len++] = /** @type {HTMLElement} */ (obj);
          }
          current_cache_new[css] = val;
          if (!CORE.contains(current_cache_keys, css)) {
            current_cache_keys[keys_len] = css;
          }
        } else {
          if (DEBUG) {
            APP.STATS.count_css_cache++;
          }
        }
      } else {
        current_cache_new[css] = false;
        if (DEBUG) {
          APP.STATS.count_css_cache++;
        }
      }
    } else {
      for (var css_key in css) {
        val = css[css_key];
        if (current_cache[css_key] !== val) {
          if (current_cache_new[css_key] === false || current_cache_new[css_key] !== val) {
            if (!keys_len) {
              CSS_STACK[len++] = /** @type {HTMLElement} */ (obj);
            }
            current_cache_new[css_key] = val;
            if (!CORE.contains(current_cache_keys, css_key)) {
              current_cache_keys[keys_len++] = css_key;
            }
          } else {
            if (DEBUG) {
              APP.STATS.count_css_cache++;
            }
          }
        } else {
          current_cache_new[css_key] = false;
          if (DEBUG) {
            APP.STATS.count_css_cache++;
          }
        }
      }
    }
    if (len) {
      PAINT_TIMER || (PAINT_TIMER = requestFrame(processPaint));
    }
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} obj
 @param {string} css
 @param {Array<(string|number)>} val
 */
CORE.toggleStyle = function(obj, css, val) {
    if (DEBUG) {
      GRAPH.register("CORE.toggleStyle");
    }
    if (CORE.getStyle(obj, css) === val[0]) {
      CORE.setStyle(obj, css, val[1]);
    } else {
      CORE.setStyle(obj, css, val[0]);
    }
  };
  /**
 @const
 @param {(Node|NodeList|Array<Node>|string|null)} obj
 @param {(Object<string,(string|number)>|string|number)} style
 @param {(string|number)=} val
 */
CORE.css = function css(obj, style, val) {
    if (DEBUG) {
      GRAPH.register("CORE.css");
    }
    if (typeof val !== "undefined" || style && typeof style !== "string") {
      CORE.setStyle(obj, style, val);
    } else {
      return CORE.getStyle(obj, /** @type {(string|undefined)} */ (style));
    }
  };
  /**
 @param {string} selector
 @param {(Object<string,(string|number)>|string)} rules
 @param {(string|number)=} value
 */
CORE.addCssRule = function(selector, rules, value) {
    if (DEBUG) {
      GRAPH.register("CORE.addCssRule");
    }
    var sheet = document.styleSheets[document.styleSheets.length - 1];
    var css_string = "";
    if (value) {
      css_string = rules + ":" + value + ";";
    } else {
      if (rules) {
        var keys = Object.keys(/** @type {Object} */ (rules) || {});
        var length = keys.length;
        var key = "";
        for (var i = 0; i < length; i++) {
          css_string += (key = keys[i]) + ":" + rules[key] + ";";
        }
      }
    }
    if (css_string) {
      if (sheet["insertRule"]) {
        sheet["insertRule"](selector + "{" + css_string + "}", sheet.cssRules ? sheet.cssRules.length : 0);
      } else {
        if (sheet["addRule"]) {
          sheet["addRule"](selector, css_string, sheet.cssRules ? sheet.cssRules.length : 0);
        }
      }
    }
  };
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} node
 @param {string} val
 */
CORE.setTextContent = function setTextContent(node, val) {
    if (DEBUG) {
      GRAPH.register("CORE.setTextContent");
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      for (var i = 0; i < node.length; i++) {
        CORE.setTextContent(node[i], val);
      }
      return;
    }
    var tmpObj;
    if ((tmpObj = node.firstChild) && CORE.isType(tmpObj.nodeValue)) {
      tmpObj.nodeValue = val;
    } else {
      if (CORE.isType(node.textContent)) {
        node.textContent = val;
      } else {
        if (CORE.isType(node.innerText)) {
          node.innerText = val;
        } else {
          CORE.setHTML(node, val);
        }
      }
    }
  };
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} _node
 @param {(string|Array<string>)} _html
 @param {(boolean|Function)=} _async
 */
CORE.setHTML = function setHTML(_node, _html, _async) {
    if (DEBUG) {
      GRAPH.register("CORE.setHTML");
    }
    var node = _node;
    var html = _html;
    var async = _async;
    var has_callback = CORE.isType(async, "function");
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (CORE.isArray(html)) {
      html = html.join("");
    }
    var length = node.length;
    if (length >= 0) {
      for (var i = 0; i < length; i++) {
        CORE.setHTML(node[i], html, has_callback ? i === length - 1 ? async : true : async);
      }
      return;
    }
    if (!CONFIG.ENABLE_HTML_CACHE) {
      node.innerHTML = html;
      if (DEBUG) {
        APP.STATS.count_html++;
      }
    } else {
      var html_new = node["_html_new"];
      if (node["_html"] !== html) {
        if (async) {
          if (html_new !== html) {
            if (html_new === false || !CORE.isType(html_new)) {
              HTML_STACK[HTML_STACK.length] = /** @type {HTMLElement} */ (node);
            } else {
              if (DEBUG) {
                APP.STATS.count_html_cache++;
              }
            }
            node["_html_new"] = html;
          } else {
            if (DEBUG) {
              APP.STATS.count_html_cache++;
            }
          }
          if (has_callback) {
            CORE.paint(function() {
              async.call(node);
            });
          }
          if (HTML_STACK.length || has_callback) {
            PAINT_TIMER || (PAINT_TIMER = requestFrame(processPaint));
          }
          return;
        } else {
          node.innerHTML = node["_html"] = html;
          if (DEBUG) {
            APP.STATS.count_html++;
          }
        }
      } else {
        node["_html_new"] = html_new = false;
        if (DEBUG) {
          APP.STATS.count_html_cache++;
        }
      }
      if (html_new) {
        node["_html_new"] = html;
      }
    }
    if (has_callback) {
      /** @type {Function} */ (async).call(node);
    }
  };
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} node
 */
CORE.getHTML = function setHTML(node) {
    if (DEBUG) {
      GRAPH.register("CORE.getHTML");
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      node = node[0];
    }
    var html;
    if (!CONFIG.ENABLE_HTML_CACHE) {
      return node.innerHTML;
    }
    return (html = node["_html_new"]) !== false && CORE.isType(html) ? html : (html = node["_html"]) !== false && CORE.isType(html) ? html : node["_html"] = node.innerHTML;
  };
  /**
 @param {function(number)} fn
 @param {number=} delay
 @return {(number|null)}
 */
CORE.paint = function paint(fn, delay) {
    if (DEBUG) {
      GRAPH.register("CORE.paint");
    }
    var self = this;
    if (delay) {
      return function(fn) {
        return CORE.async(function() {
          CORE.paint.call(self, fn);
        }, delay);
      }(fn);
    } else {
      if (self !== CORE) {
        PAINT_STACK[PAINT_STACK.length] = function(time) {
          fn.call(self, time);
        };
      } else {
        PAINT_STACK[PAINT_STACK.length] = fn;
      }
      return PAINT_TIMER || (PAINT_TIMER = requestFrame(processPaint));
    }
  };
  /**
 @param {(number|null)} id
 @return {(number|null)}
 */
CORE.clear = function clear(id) {
    if (DEBUG) {
      GRAPH.register("CORE.clear");
    }
    if (id) {
      window.clearTimeout(id);
      clearFrame.call(window, id);
    }
    return null;
  };
  /**
 @param {(Array<(Node|null)>|Node|NodeList|string|null)} obj
 @param {(string|Object)} params
 @param {(string|number)=} arg3
 @param {(number|string|Function)=} arg4
 @param {(string|Function)=} arg5
 @param {Function=} arg6
 @param {Function=} arg7
 */
CORE.transition = function(obj, params, arg3, arg4, arg5, arg6, arg7) {
    if (DEBUG) {
      GRAPH.register("CORE.transition");
    }
    if (params.delay) {
      (function(obj, params) {
        return CORE.async(function() {
          params.delay = 0;
          CORE.transition(obj, params);
        }, params.delay);
      })(obj, params);
    }
    if (typeof obj === "string") {
      obj = CORE.query(obj);
    }
    var length = obj.length;
    if (length) {
      for (var i = 0; i < length; i++) {
        CORE.transition(obj[i], params);
      }
      return;
    }
    if (params.from) {
      CORE.setStyle(obj, params.style, params.from);
    }
    var css_animation = {"transitionProperty":params.style, "transitionDuration":params.duration || 400, "transitionDelay":params.delay || 0, "transitionTimingFunction":params.ease || "ease-in"};
    var css_animation_prefixed = {};
    css_animation_prefixed[prefix_css + "TransitionProperty"] = params.style;
    css_animation_prefixed[prefix_css + "TransitionDuration"] = params.duration || 400;
    css_animation_prefixed[prefix_css + "TransitionDelay"] = params.delay || 0;
    css_animation_prefixed[prefix_css + "TransitionTimingFunction"] = params.ease || "ease-in";
    CORE.setStyle(obj, css_animation_prefixed);
    CORE.setStyle(obj, css_animation);
    (function(obj, style, to) {
      CORE.async(function() {
        CORE.setStyle(obj, style, to);
      }, 0);
    })(obj, params.style, params.to);
    if (params.callback) {
      (function(object, callback) {
        return CORE.async(function() {
          callback.call(object);
        }, params.duration || 400);
      })(obj, params.callback);
    }
  };
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} node
 @param {(number|null)=} from
 @param {number=} to
 @param {number=} duration
 @param {number=} start
 */
CORE.scrollTo = function scrollTo(node, from, to, duration, start) {
    if (DEBUG) {
      GRAPH.register("CORE.scrollTo");
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      node = node[0];
    }
    from || (from = node.scrollTop);
    to || (to = 0);
    duration || (duration = CORE.Math.abs(to - from) < 5000 ? 400 : 0);
    if (from !== to) {
      CORE.paint(function(time) {
        time -= start || (start = time);
        if (time >= duration) {
          return node.scrollTop = to;
        }
        if (from <= 0) {
          from = 0;
        }
        if (to <= 0) {
          to = 0;
        }
        CORE.scrollTo(node, from, to, duration, start);
        var delta = to - from;
        var progress = time / duration * Math.PI / 2;
        var position = delta * Math.sin(progress);
        node.scrollTop = from + position;
      });
    }
  };
  CORE.scrollToTop = function scrollToTop(node) {
    CORE.scrollTo(node);
  };
})();




(function() {
  var skip_touchmove = false;
  var skip_touchend = false;
  /**
 @const
 @param {Event} event
 @param {boolean=} prevent
 @param {boolean=} stop
 @return {boolean}
 */
CORE.preventEvent = function(event, prevent, stop) {
    if (stop) {
      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
      }
      event.stopPropagation();
      event["cancelBubble"] = true;
    }
    if (prevent) {
      event.preventDefault();
      event["returnValue"] = false;
    }
    return !prevent;
  };
  CORE.handleEvent = function(event, elem, fn, preventDefault, stopBubble) {
    event || (event = window.event);
    if (DEBUG) {
      CORE.console.log("Event: " + elem.id || elem.className || elem.tagName || elem);
    }
    fn.call(elem, event);
    CORE.preventEvent(event, preventDefault, stopBubble);
  };
  var registered_dispatcher = {};
  var initial_touch_element = null;
  var event_dispatcher = function(event) {
    var event_type = event.type;
    if (CONFIG.ENABLE_EVENT_CACHE) {
      if (event_type === "touchmove") {
        if (skip_touchmove && !APP.VARS.force_touchmove) {
          if (DEBUG) {
            APP.STATS.count_event_cache++;
          }
          return;
        } else {
          if (!APP.VARS.force_touchmove) {
            skip_touchmove = true;
            skip_touchend = true;
          }
        }
      }
    }
    var target = /** @type {(Node|Element|HTMLDocument|Window|null|string)} */ (event.target || event.srcElement);
    if (CONFIG.ENABLE_EVENT_CACHE) {
      if (event_type === "touchend") {
        skip_touchmove = false;
        initial_touch_element = null;
        if (skip_touchend && !APP.VARS.force_touchmove) {
          skip_touchend = false;
          if (DEBUG) {
            APP.STATS.count_event_cache++;
          }
          return;
        }
        APP.VARS.force_touchmove = false;
      }
    }
    if (DEBUG) {
      APP.STATS.count_event++;
    }
    var bubble_stack = [];
    var stopBubble = false;
    if (DEBUG) {
      var debug_time = CORE.time.now();
    }
    while (!stopBubble && target) {
      if (CONFIG.ENABLE_EVENT_CACHE) {
        if (target === document && !APP.VARS.force_touchmove && event_type === "touchmove") {
          skip_touchmove = true;
          skip_touchend = true;
        }
      }
      if (DEBUG) {
        APP.STATS.count_bubble++;
      }
      var preventDefault = false;
      bubble_stack[bubble_stack.length] = target;
      if (target._event && target._event[event_type]) {
        for (var i = 0; i < target._event[event_type].length; i++) {
          var current = target._event[event_type][i];
          if (CONFIG.ENABLE_EVENT_CACHE) {
            if (target._event_src && target._event_src[event_type] && target._event_src[event_type][current.view]) {
              if (DEBUG) {
                APP.STATS.count_bubble_cache += bubble_stack.length;
              }
              target = target._event_src[event_type][current.view];
              current = target._event[event_type][i];
            }
          }
          var bubble_src = null;
          if (current.tag || current.class) {
            for (var x = 0; x < bubble_stack.length; x++) {
              var current_bubble = bubble_stack[x];
              var tag_name = current_bubble.tagName;
              if (tag_name) {
                if (current.tag && current.class) {
                  if (tag_name.toLowerCase() === current.tag && CORE.hasClass(current_bubble, current.class)) {
                    bubble_src = current_bubble;
                  }
                } else {
                  if (current.tag) {
                    if (tag_name.toLowerCase() === current.tag) {
                      bubble_src = current_bubble;
                    }
                  } else {
                    if (current.class) {
                      if (CORE.hasClass(current_bubble, current.class)) {
                        bubble_src = current_bubble;
                      }
                    }
                  }
                }
                if (bubble_src) {
                  if (CONFIG.ENABLE_EVENT_CACHE) {
                    bubble_src._event_src || (bubble_src._event_src = {});
                    bubble_src._event_src[event_type] || (bubble_src._event_src[event_type] = {});
                    bubble_src._event_src[event_type][current.view] || (bubble_src._event_src[event_type][current.view] = target);
                  }
                  if (!current.fn) {
                    if (DEBUG) {
                      APP.STATS.time_event += CORE.time.now() - debug_time;
                      APP.STATS.count_bubble_cache += bubble_stack.length - x - 1;
                    }
                    CORE.preventEvent(event, preventDefault, stopBubble);
                    return;
                  }
                  current.fn.call(bubble_src, event, current.target ? CORE.getClosest(bubble_src, current.target) : bubble_src);
                  stopBubble || (stopBubble = current.stopBubble);
                  preventDefault || (preventDefault = current.preventDefault);
                  bubble_src = null;
                  if (DEBUG) {
                    CORE.console.log("Event: " + event_type, target);
                  }
                }
                if (preventDefault) {
                  i = target._event[event_type].length;
                }
                if (stopBubble) {
                  break;
                }
              }
              if (CONFIG.ENABLE_EVENT_CACHE) {
                if (x === bubble_stack.length - 1 && !bubble_src) {
                  current_bubble._event_src || (current_bubble._event_src = {});
                  current_bubble._event_src[event_type] || (current_bubble._event_src[event_type] = {});
                  current_bubble._event_src[event_type][current.view] || (current_bubble._event_src[event_type][current.view] = target);
                }
              }
            }
          } else {
            if (CONFIG.ENABLE_EVENT_CACHE) {
              bubble_stack[0]._event_src || (bubble_stack[0]._event_src = {});
              bubble_stack[0]._event_src[event_type] || (bubble_stack[0]._event_src[event_type] = {});
              bubble_stack[0]._event_src[event_type][current.view] || (bubble_stack[0]._event_src[event_type][current.view] = target);
            }
            if (!current.fn) {
              if (DEBUG) {
                APP.STATS.time_event += CORE.time.now() - debug_time;
                APP.STATS.count_bubble_cache++;
              }
              CORE.preventEvent(event, preventDefault, stopBubble);
              return;
            }
            current.fn.call(target, event, current.target ? CORE.getClosest(target, current.target) : target);
            stopBubble || (stopBubble = current.stopBubble);
            preventDefault || (preventDefault = current.preventDefault);
            if (DEBUG) {
              CORE.console.log("Event: " + event_type, target);
            }
          }
          if (preventDefault || stopBubble) {
            break;
          }
        }
      }
      if (CONFIG.ENABLE_EVENT_CACHE) {
        if (target === document) {
          if (initial_touch_element === null && !APP.VARS.force_touchmove && event_type === "touchstart") {
            if (DEBUG) {
              APP.STATS.count_event_cache += 2;
            }
            skip_touchmove = true;
            skip_touchend = true;
          }
          break;
        }
      }
      target = target.parentNode;
    }
    if (preventDefault || stopBubble) {
      CORE.preventEvent(event, preventDefault, stopBubble);
    }
    if (DEBUG) {
      APP.STATS.time_event += CORE.time.now() - debug_time;
    }
  };
  function register_dispatcher(elem, event_type) {
    if (registered_dispatcher[event_type]) {
      return;
    } else {
      registered_dispatcher[event_type] = true;
    }
    if (DEBUG) {
      CORE.console.log("Register Event Dispatcher: " + event_type);
    }
    document.body.addEventListener(event_type, event_dispatcher, event_type === "touchmove" ? APP.CONFIG.EVENT_OPTIONS : false);
  }
  var touch_events_supported;
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} elem
 @param {string} query
 @param {string} event
 @param {Function} _fn
 @param {boolean=} preventDefault
 @param {boolean=} stopBubble
 @param {string=} target
 @param {string=} key
 @return {Function}
 */
CORE.on = function on(elem, query, event, _fn, preventDefault, stopBubble, target, key) {
    var fn;
    if (CONFIG.EVENT_DEFAULT_DELAY) {
      fn = function(event) {
        var _this = this;
        CORE.async(function() {
          _fn.call(_this, event);
        }, CONFIG.EVENT_DEFAULT_DELAY);
      };
    } else {
      fn = _fn;
    }
    if (typeof elem === "string") {
      elem = CORE.query(elem);
    }
    if (elem.length >= 0) {
      var i = 0;
      while (i < elem.length) {
        CORE.on(elem[i++], query, event, _fn, preventDefault, stopBubble, target, key);
      }
      return fn;
    }
    if (CORE.isArray(event)) {
      var i = 0;
      while (i < event.length) {
        CORE.on(elem, query, event[i++], _fn, preventDefault, stopBubble, target, key);
      }
      return fn;
    }
    if (CORE.isArray(_fn)) {
      var i = 0;
      while (i < _fn.length) {
        CORE.on(elem, query, event, _fn[i++], preventDefault, stopBubble, target, key);
      }
      return fn;
    }
    if (event === "touchstart" || event === "touchend" || event === "touchmove") {
      if (typeof touch_events_supported === "undefined") {
        try {
          document.createEvent("TouchEvent");
          touch_events_supported = true;
        } catch (e) {
          touch_events_supported = false;
        }
      }
      if (!touch_events_supported) {
        if (event === "touchstart") {
          event = "mousedown";
        }
        if (event === "touchend") {
          event = "mouseup";
        }
        if (event === "touchmove") {
          event = "mousemove";
        }
      }
    }
    if (event === "click") {
      CORE.on(elem, query, "touchstart", function(event) {
        initial_touch_element || (initial_touch_element = this);
        skip_touchmove = true;
        skip_touchend = true;
        APP.VARS.force_touchmove = false;
        fn.call(this, event);
      }, preventDefault, stopBubble, target, key);
      if (elem !== window && elem !== window.document) {
        CORE.setStyle(/** @type {(Node|NodeList|Array<Node>|string|null)} */ (elem), "touchAction", "manipulation");
      }
      return fn;
    }
    if (event === "clickmove") {
      if (elem !== window && elem !== window.document) {
        CORE.setStyle(/** @type {(Node|NodeList|Array<Node>|string|null)} */ (elem), "touchAction", "manipulation");
      }
      return CORE.addTouchMoveEvent(elem, fn, preventDefault, stopBubble, query, target, key);
    }
    if (event === "wheelscroll") {
      return CORE.addMouseWheelScroll(elem, fn);
    }
    var delegateByClass = "";
    var delegateByTag = "";
    if (query) {
      if (query.charAt(0) === ".") {
        delegateByClass = query.substring(1);
      } else {
        if (query.indexOf(".") > 0) {
          delegateByTag = query.split(".")[0];
          delegateByClass = query.split(".")[1];
        } else {
          delegateByTag = query;
        }
      }
    }
    if (event.indexOf(":") > -1) {
      var parts = event.split(":");
      event = parts[0];
      if (parts[1]) {
        if (parts[0].indexOf("key") > -1) {
          fn = function(fn) {
            return function(event, target) {
              var payload = {};
              var self = this;
              payload[parts[1]] = function() {
                fn.call(self, event, target);
              };
              CORE.switchKeyCode(event, payload);
            };
          }(fn);
        }
      }
    }
    elem._event || (elem._event = {});
    if (!elem._event[event]) {
      register_dispatcher(elem, event);
    }
    elem._event[event] || (elem._event[event] = []);
    elem._event[event].push({tag:delegateByTag, class:delegateByClass, fn:fn, preventDefault:preventDefault, stopBubble:stopBubble, view:key, target:target || false});
    return fn;
  };
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} elem
 @param {string} event
 @param {Function} fn
 @param {boolean=} preventDefault
 @param {boolean=} stopBubble
 @return {Function}
 */
CORE.addEvent = function addEvent(elem, event, fn, preventDefault, stopBubble) {
    return CORE.on(elem, "", event, fn, preventDefault, stopBubble);
  };
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} node
 @param {Function} fn
 @param {boolean=} preventDefault
 @param {boolean=} stopBubble
 @return {Function}
 */
CORE.addTouchEvent = function addTouchEvent(node, fn, preventDefault, stopBubble) {
    CORE.addEvent(node, "touchstart", fn, preventDefault, stopBubble);
    return fn;
  };
  var skip_callback = false;
  /**
 @this {Node}
 @param {Event} event
 */
function touch_move_listener(event) {
    skip_touchmove = true;
    skip_callback = true;
    skip_touchend = true;
    this.removeEventListener("touchmove", touch_move_listener);
    CORE.preventEvent(event, false, true);
  }
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} node
 @param {Function} fn
 @return {Function}
 */
CORE.addTouchMoveEvent = function addTouchMoveEvent(node, fn, preventDefault, stopBubble, query, target, key) {
    CORE.on(node, query, "touchstart", function(event) {
      skip_callback = false;
      initial_touch_element || (initial_touch_element = this);
      this.addEventListener("touchmove", touch_move_listener, APP.CONFIG.PASSIVE_EVENTS);
    }, false, false, target, key);
    CORE.on(node, query, "touchend", function(event) {
      if (skip_callback) {
        CORE.async(function() {
          skip_callback = false;
          skip_touchmove = false;
        }, 1);
      } else {
        this.removeEventListener("touchmove", touch_move_listener);
        if (target) {
          fn.call(this, event, CORE.getClosest(this, target));
        } else {
          fn.call(this, event, this);
        }
      }
      initial_touch_element = null;
    }, preventDefault, stopBubble, target, key);
    return fn;
  };
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} node
 @param {Function} fn
 @param {boolean=} preventDefault
 @return {Function}
 */
CORE.addInputEvent = function addInputEvent(node, fn, preventDefault) {
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    CORE.addEvent(node, "input", CORE.addEvent(node, "change", fn));
    return fn;
  };
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} node
 @param {Function} fn
 @return {Function}
 */
CORE.addMouseWheelScroll = function addMouseWheelScroll(node, fn) {
    (function(fn) {
      var scroll_left = 0;
      CORE.addEvent(node, "mousewheel", function(event) {
        if (this["doScroll"]) {
          this["doScroll"](event.wheelDelta > 0 ? "left" : "right");
        } else {
          if ((event.wheelDelta || event.detail) > 0) {
            this.scrollLeft = scroll_left -= this.offsetWidth / 35;
          } else {
            this.scrollLeft = scroll_left += this.offsetWidth / 35;
          }
        }
        CORE.handleEvent(event, this, fn, false, true);
      });
    })(fn);
    return fn;
  };
  /**
 @param {(Node|HTMLDocument|Window|NodeList|Array<Node>|string|null)} node
 @param {string} eventType
 */
CORE.triggerMouseEvent = function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent("MouseEvents");
    if (clickEvent) {
      clickEvent.initEvent(eventType, true, true);
      node.dispatchEvent(clickEvent);
    } else {
      if (clickEvent = node[eventType] || node["on" + eventType]) {
        clickEvent();
      }
    }
  };
  /**
 @param {boolean=} preventDefault
 @param {boolean=} stopBubble
 */
CORE.delegateByClass = function delegateByClass(node, classname, event, fn, preventDefault, stopBubble) {
    /** @type {(Node|Element|HTMLDocument|Window|null|string)} */ (node = CORE.getNode(node));
    (function(classname, fn, preventDefault, stopBubble) {
      CORE.addEvent(node, event, function(e) {
        var target = e.target || e.srcElement;
        while (target && target !== this) {
          if (CORE.hasClass(target, classname)) {
            fn.call(target, e);
            CORE.preventEvent(e, preventDefault, stopBubble);
            return;
          }
          target = target.parentNode;
        }
      });
    })(classname, fn, preventDefault, stopBubble);
    return fn;
  };
  /**
 @param {boolean=} preventDefault
 @param {boolean=} stopBubble
 */
CORE.delegateByTag = function delegateByTag(node, tag, event, fn, preventDefault, stopBubble) {
    /** @type {(Node|Element|HTMLDocument|Window|null|string)} */ (node = CORE.getNode(node));
    (function(tag, fn, preventDefault, stopBubble) {
      CORE.addEvent(node, event, function(e) {
        var target = e.target || e.srcElement;
        while (target && target != this) {
          if (target.tagName.toLowerCase() === tag) {
            fn.call(target, e);
            CORE.preventEvent(e, preventDefault, stopBubble);
          }
          target = target.parentNode;
        }
      }, false, false);
    })(tag, fn, preventDefault, stopBubble);
    return fn;
  };
  /**
 @param {boolean=} preventDefault
 @param {boolean=} stopBubble
 */
CORE.delegateByTagClass = function delegateByTagClass(node, tag, classname, event, fn, preventDefault, stopBubble) {
    /** @type {(Node|Element|HTMLDocument|Window|null|string)} */ (node = CORE.getNode(node));
    (function(tag, classname, fn, preventDefault, stopBubble) {
      CORE.addEvent(node, event, function(e) {
        var target = e.target || e.srcElement;
        while (target && target != this) {
          if (target.tagName.toLowerCase() === tag && CORE.hasClass(target, classname)) {
            if (e.stopImmediatePropagation) {
              e.stopImmediatePropagation();
            }
            fn.call(target, e);
            CORE.preventEvent(e, preventDefault, stopBubble);
          }
          target = target.parentNode;
        }
      }, false, false);
    })(tag, classname, fn, preventDefault, stopBubble);
    return fn;
  };
})();



/** @const @struct */ CORE.Storage = function() {
  /**
 @const
 @constructor
 @implements {_storage_interface}
 @this {StorageAdapter}
 @param {!string} store_id
 */
function StorageAdapter(store_id) {
    /** @type {!string} */ this.store = (CONFIG.STORAGE_PREFIX || "") + store_id;
    /** @type {(Object<string,*>|null)} */ this.cache = null;
    /** @type {(Array<string>|null)} */ this.index = null;
  }
  /**
 @param {!string=} index
 */
StorageAdapter.prototype.get = function(index) {
    if (DEBUG) {
      CORE.console.log("Storage.get");
    }
    var data;
    if (this.cache && CONFIG.ENABLE_STORAGE_CACHE) {
      data = this.cache;
    } else {
      if (data = window.localStorage.getItem(this.store)) {
        data = /** @type {Object<string,*>} */ (JSON.parse(APP.CONFIG.GZIP ? APP.STORAGE.decompress(data) : data));
        if (CONFIG.ENABLE_STORAGE_CACHE) {
          this.cache = data;
        }
      }
    }
    if (data && index) {
      return /** @type {*} */ (data[index]);
    }
    return /** @type {(string|Object<string,*>)} */ (data);
  };
  /**
 @param {(!string|Object<string,*>)} index
 @param {*=} value
 */
StorageAdapter.prototype.set = function(index, value) {
    if (DEBUG) {
      CORE.console.log("Storage.set");
    }
    var data;
    var store = this.store;
    var hasUpdate = false;
    if (typeof index === "string") {
      data = this.get() || {};
      if (data[index] !== value) {
        data[index] = value;
        hasUpdate = true;
      }
    } else {
      data = index || {};
      hasUpdate = true;
    }
    if (hasUpdate) {
      if (CONFIG.ENABLE_STORAGE_CACHE) {
        this.cache = data;
      }
      this.index = null;
      if (CONFIG.ENABLE_STORAGE_CACHE) {
        CORE.async(function() {
          saveToStorage(store, data);
        });
      } else {
        saveToStorage(store, data);
      }
    }
  };
  /**
 @param {!string} index
 */
StorageAdapter.prototype.del = function(index) {
    if (DEBUG) {
      CORE.console.log("Storage.del");
    }
    if (index) {
      var data = this.get() || {};
      if (typeof data[index] !== "undefined") {
        data[index] = null;
        delete data[index];
        this.set(data);
      }
    }
  };
  /**
 @param {(!string|Object<string,*>)} index
 @param {!*} value
 */
StorageAdapter.prototype.update = function(index, value) {
    if (DEBUG) {
      CORE.console.log("Storage.update");
    }
    var data = this.get() || {};
    var hasUpdate = false;
    if (typeof index === "string") {
      if (data[index] !== value) {
        data[index] = value;
        hasUpdate = true;
      }
    } else {
      for (var key in index) {
        if (index.hasOwnProperty(key)) {
          if (data[key] !== index[key]) {
            data[key] = index[key];
            hasUpdate = true;
          }
        }
      }
    }
    if (hasUpdate) {
      this.set(data);
    }
  };
  StorageAdapter.prototype.clear = function() {
    this.cache = null;
    this.index = null;
    window.localStorage.removeItem(this.store);
  };
  /**
 @return {Array<string>}
 */
StorageAdapter.prototype.keys = function() {
    return this.index || (this.index = CORE.getKeys(this.get() || {}));
  };
  function saveToStorage(store, data) {
    window.localStorage.setItem(store, APP.CONFIG.GZIP ? APP.STORAGE.compress(JSON.stringify(data)) : JSON.stringify(data));
  }
  return StorageAdapter;
}();



(function(CONTROLLER, ROUTE) {
  /**
 @const
 @param {(Array<*>|string)} route
 @param {(Function|Object<string,*>)=} params
 @param {Function=} callback
 @param {Function=} error
 @param {Function=} update_cache
 */
CONTROLLER.request = function request(route, params, callback, error, update_cache) {
    if (route.constructor === Array) {
      return CONTROLLER.requestBatch(/** @type {Array<*>} */ (route), /** @type {(Function|null)} */ (params));
    }
    if (CORE.isType(params, "function")) {
      update_cache = error;
      error = callback;
      callback = /** @type {(Function|null)} */ (params);
      params = null;
    }
    if (!route) {
      if (ROUTE["#/"]) {
        route = "#/";
      } else {
        if (ROUTE["#!/"]) {
          route = "#!/";
        } else {
          if (DEBUG) {
            CORE.console.err('ERROR: No route specified for "' + route + '"!');
          }
          return;
        }
      }
    }
    route = /** @type {string} */ (route);
    if (!CORE.isType(ROUTE[route])) {
      if (DEBUG) {
        CORE.console.warn('WARNING: No route specified for "' + route + '"!');
      }
    }
    params || (params = APP.PAYLOAD[route] ? APP.PAYLOAD[route]() : ROUTE[route].params || null);
    (function(route, route_obj, callback, update_cache) {
      var route_action = route_obj.action;
      APP.LAYOUT.lastAction = route_action || APP.LAYOUT.lastAction || "";
      if (!update_cache && route_action) {
        APP.LAYOUT.handleCache(route_action, function(update_cache) {
          CONTROLLER.request(route, params, callback, error, update_cache);
        });
        return;
      }
      if (route[0] === "#") {
        var data = params;
        params = CORE.query('a[href="' + route + '"]')[0];
        fn_success(data);
        return;
      }
      route_obj.header || (route_obj.header = {});
      route_obj.header["Accept"] || (route_obj.header["Accept"] = "application/json");
      route_obj.header["Content-Type"] || (route_obj.header["Content-Type"] = "application/json");
      var default_headers = APP.VARS.HEADER;
      for (var key in default_headers) {
        if (default_headers.hasOwnProperty(key)) {
          route_obj.header[key] = default_headers[key];
        }
      }
      var pos;
      if ((pos = route.indexOf("/:")) !== -1) {
        var custom_field = route.substring(pos + 2, route.indexOf("/", pos + 2));
        route = route.replace("/:" + custom_field, "/" + params[custom_field]);
      }
      var request_type = "GET";
      if (route.indexOf("GET:") !== -1) {
        route = route.substring(4);
      } else {
        if (route.indexOf("POST:") !== -1) {
          request_type = "POST";
          route = route.substring(5);
        } else {
          if (route.indexOf("DELETE:") !== -1) {
            request_type = "DELETE";
            route = route.substring(7);
          } else {
            if (route.indexOf("PATCH:") !== -1) {
              request_type = "PATCH";
              route = route.substring(6);
            }
          }
        }
      }
      function fn_success(data) {
        if (CORE.isArray(data) || CORE.isObject(data)) {
          if (route_obj.field) {
            data = data[route_obj.field] || [];
          }
          if (route_obj.filter) {
            data = data.filter(route_obj.filter);
          }
          if (route_obj.arrayfilter) {
            data = route_obj.arrayfilter(data);
          }
          if (route_obj.sort) {
            data = data.sort(route_obj.sort);
          }
          if (route_obj.limit && data.length > route_obj.limit) {
            data.splice(0, data.length - route_obj.limit);
          }
          if (route_obj.last && data.length > route_obj.last) {
            data.splice(0, route_obj.last);
          }
          if (route_obj.map) {
            data.map(route_obj.map);
          }
          if (route_obj.arraymap) {
            route_obj.arraymap(data);
          }
          if (update_cache) {
            update_cache();
          }
        }
        callback || (callback = route_obj.do ? typeof route_obj.do === "string" ? APP.HANDLER[route_obj.do] : route_obj.do : route_obj.to ? typeof route_obj.to === "string" ? CONTROLLER[route_obj.to] : route_obj.to : typeof route_obj === "function" ? route_obj : null);
        if (callback) {
          callback(data, params);
        }
      }
      CORE.ajax(/** @type {_ajax_struct} */ ({url:CONFIG.SERVER_HOST + (route_obj.url || route), params:params, type:route_obj.type || request_type, header:route_obj.header, cache:route_obj.cache, clear:route_obj.clear, success:fn_success, error:function fn_error(status, data) {
        if (route_obj.default) {
          fn_success(route_obj.default());
        }
        if (error) {
          error(status, data);
        } else {
          if (route_obj.error) {
            route_obj.error(status, data);
          }
        }
      }}));
    })(route, /** @type {_route_struct} */ (ROUTE[route]), callback, update_cache);
  };
  /**
 @const
 @param {Array<*>} requests
 @param {Function=} callback
 */
CONTROLLER.requestBatch = function(requests, callback) {
    for (var i = 0; i < requests.length; i++) {
      (function(request, callback) {
        if (CORE.isType(request, "string")) {
          request = [request, null, CONTROLLER[ROUTE[/** @type {string} */ (request)].to]];
        }
        CONTROLLER.request(request[0], request[1], function(data) {
          if (request[2]) {
            request[2](data);
          }
          if (callback) {
            callback();
          }
        });
      })(requests[i], i === requests.length - 1 ? callback : null);
    }
  };
  /**
 @const
 @param {Array<*>} _requests
 @param {Function=} _callback
 @param {number=} i
 */
CONTROLLER.requestSync = function(_requests, _callback, i) {
    var requests = _requests;
    var callback = _callback;
    var request = requests[i || (i = 0)];
    if (CORE.isType(request, "string")) {
      request = [request, null, CONTROLLER[ROUTE[/** @type {string} */ (request)].to]];
    }
    CONTROLLER.request(request[0], request[1], function(data) {
      if (request[2]) {
        request[2](data);
      }
      if (++i < requests.length) {
        CONTROLLER.requestSync(requests, callback, i);
      } else {
        if (callback) {
          callback();
        }
      }
    });
  };
  /**
 @param {string} _view
 @param {Array<_model_class>=} data
 @return {string}
 */
function buildTemplate(_view, data) {
    if (DEBUG) {
      var debug_time = CORE.time.now();
    }
    data || (data = [{}]);
    if (data.constructor !== Array) {
      data = [data];
    }
    /** @type {Array<_template_struct>} */ var template = APP.VIEW[_view];
    var html = "";
    var item;
    for (var x = 0; x < data.length; x++) {
      if (item = data[x]) {
        var map_to_view = item.mapToView;
        var map_to_view_cache = CONFIG.ENABLE_MAPPER_CACHE ? item["mapToViewCache"] || (item["mapToViewCache"] = {}) : {};
        var split;
        var model;
        var field;
        var extra;
        for (var a = 0; a < template.length; a++) {
          /** @type {_template_struct} */ var view = template[a];
          var template_data = view.data;
          var template_map = view.map;
          var tmp;
          var pos;
          if (item === null || view.if && view.if(item) === false) {
            if (view.else) {
              template_data = [view.else];
            } else {
              continue;
            }
          }
          var loop_data;
          var loop_start = 0;
          var loop_end = 0;
          var loop_count = 1;
          var view_loop = view.loop;
          if (view_loop) {
            if (view_loop.indexOf(",") !== -1) {
              var loop_start_end = view_loop.split(",");
              if (loop_start_end.length === 3) {
                loop_start = parseInt(loop_start_end[1], 10);
                loop_end = parseInt(loop_start_end[2], 10);
              } else {
                loop_end = parseInt(loop_start_end[1], 10);
              }
              view_loop = loop_start_end[0];
            }
            if (view_loop.indexOf(".") !== -1) {
              split = view_loop.split(".");
              model = split[0];
              field = split[1];
              extra = split[2] || false;
              loop_data = item[model] ? item[model][field] ? item[model][field][extra] ? item[model][field][extra] : item[model][field] : item[model] : item;
            } else {
              loop_data = item[view_loop];
            }
            loop_count = loop_data ? loop_end && loop_end <= loop_data.length ? loop_end : loop_data.length : 0;
          }
          var item_loop = item;
          for (var z = loop_start || 0; z < loop_count; z++) {
            var template_html = "";
            if (view_loop) {
              item_loop = loop_data[z];
            }
            if (item_loop) {
              if (item_loop.mapToView) {
                map_to_view = item_loop.mapToView;
                if (CONFIG.ENABLE_MAPPER_CACHE) {
                  map_to_view_cache = item_loop["mapToViewCache"] || (item_loop["mapToViewCache"] = {});
                }
              } else {
                if (CONFIG.ENABLE_MAPPER_CACHE && CORE.isType(item_loop.mapToView)) {
                  map_to_view_cache = item_loop["mapToViewCache"] || (item_loop["mapToViewCache"] = {});
                }
              }
              item_loop["index"] || (item_loop["index"] = view_loop ? z : x);
              if (template_map.length) {
                template_html += template_data[0];
              }
              for (var i = 1; i < template_map.length; i += 2) {
                var mapped_value = template_data[i];
                var key = template_map[i];
                if (CONFIG.ENABLE_MAPPER_CACHE && CORE.isType(map_to_view_cache[key])) {
                  template_html += map_to_view_cache[key];
                  if (i + 1 < template_data.length) {
                    template_html += template_data[i + 1];
                  }
                  if (DEBUG) {
                    APP.STATS.count_mapper_cache++;
                  }
                  continue;
                }
                if (key.indexOf(".") !== -1) {
                  split = key.split(".");
                  model = split[0];
                  field = split[1];
                  extra = split[2] || false;
                  if ((pos = model.indexOf("[")) !== -1) {
                    var index = parseInt(model.substring(pos + 1, model.indexOf("]")), 10);
                    model = model.substring(0, pos);
                    if (tmp = item_loop[model][index]) {
                      if (map_to_view && map_to_view[model] && map_to_view[model][field]) {
                        if (extra && map_to_view[model][field][extra]) {
                          mapped_value = map_to_view[model][field][extra](tmp[field][extra], tmp);
                          if (CONFIG.ENABLE_MAPPER_CACHE) {
                            map_to_view_cache[key] = mapped_value;
                          }
                        } else {
                          mapped_value = map_to_view[model][field](tmp[field], tmp);
                          if (CONFIG.ENABLE_MAPPER_CACHE) {
                            map_to_view_cache[key] = mapped_value;
                          }
                        }
                      } else {
                        mapped_value = tmp[field];
                      }
                    }
                  } else {
                    if (tmp = item_loop[model]) {
                      if (map_to_view && map_to_view[model] && map_to_view[model][field]) {
                        if (extra) {
                          var val = CORE.isType(tmp[field]) ? CORE.isType(tmp[field][extra]) ? tmp[field][extra] : tmp[field] : tmp || item_loop;
                          if (map_to_view[model][field][extra]) {
                            mapped_value = map_to_view[model][field][extra](val, tmp || item_loop);
                            if (CONFIG.ENABLE_MAPPER_CACHE) {
                              map_to_view_cache[key] = mapped_value;
                            }
                          } else {
                            mapped_value = val;
                          }
                        } else {
                          mapped_value = map_to_view[model][field](tmp[field], tmp || item_loop);
                          if (CONFIG.ENABLE_MAPPER_CACHE) {
                            map_to_view_cache[key] = mapped_value;
                          }
                        }
                      } else {
                        if (tmp[field] && tmp[field][extra]) {
                          mapped_value = tmp[field][extra];
                        } else {
                          mapped_value = CORE.isType(tmp[field]) ? tmp[field] : tmp || item_loop;
                        }
                      }
                    }
                  }
                } else {
                  if (map_to_view && map_to_view[key]) {
                    mapped_value = map_to_view[key](item_loop[key], item_loop);
                    if (CONFIG.ENABLE_MAPPER_CACHE) {
                      map_to_view_cache[key] = mapped_value;
                    }
                  } else {
                    if (key === "item") {
                      mapped_value = item_loop;
                    } else {
                      mapped_value = item_loop[key];
                    }
                  }
                }
                template_html += mapped_value;
                if (i + 1 < template_data.length) {
                  template_html += template_data[i + 1];
                }
                if (DEBUG) {
                  APP.STATS.count_mapper++;
                }
              }
            }
            if (!view_loop || item_loop) {
              html += template_html;
            }
          }
        }
      }
    }
    if (DEBUG) {
      APP.STATS.time_render += CORE.time.now() - debug_time;
    }
    return html;
  }
  /**
 @param view
 @param data
 */
CONTROLLER.build = function build(view, data) {
    return buildTemplate(view, data);
  };
  /**
 @const
 @param {(_view_model|string)} _target
 @param {Array<_pattern_struct>=} _data
 */
CONTROLLER.render = function render(_target, _data) {
    var target = _target;
    var data = _data;
    var dest;
    APP.LAYOUT.remove_preloader(target);
    if (data) {
      dest = typeof target === "string" ? CORE.queryOne(target) : target;
      CORE.removeNodes(dest);
      CORE.buildPattern(data, dest);
      if (DEBUG) {
        APP.STATS.count_render++;
      }
    } else {
      if (target.data) {
        dest = typeof target.target === "string" ? CORE.queryOne(target.target) : target.target;
        if (!dest) {
          if (DEBUG) {
            CORE.console.warn("Controller Error: Element not found: " + target.target);
          }
          return;
        }
        var is_array_data = target.data.constructor === Array;
        var template = is_array_data && target.data.length || !is_array_data && target.data ? buildTemplate(target.view, target.data) : target.default ? target.default.view ? buildTemplate(target.default.view, target.default.data) : buildTemplate(/** @type {string} */ (target.default)) : "";
        if (DEBUG) {
          if (dest["_html"] === template) {
            APP.STATS.count_render_cache++;
            CORE.console.log("HTML Content Cached: " + dest.id);
          } else {
            APP.STATS.count_render++;
            CORE.console.log("HTML Content Updated: " + dest.id);
          }
        }
        CORE.setHTML(dest, template, function render_callback() {
          if (target.callback) {
            if (CORE.isType(target.callback, "string")) {
              APP.HANDLER[target.callback].call(dest, target.data);
            } else {
              target.callback.call(dest, target.data);
            }
          }
        });
      }
    }
  };
  /**
 @param {string=} lang
 */
CONTROLLER.changeLanguage = function(lang) {
    var nodes = CORE.getByClass("i18n");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      CORE.setTextContent(node, (APP.LANG[lang || "en"] || APP.LANG["en"])[node.classList ? node.classList[1] : node.className.split(" ")[1]]);
    }
  };
})(/** @type {_controller_struct} */ (APP.CONTROLLER), APP.ROUTE);



(function(LAYOUT, CONTROLLER, STORAGE, EVENT) {
  /**
 @param {string} _target
 */
LAYOUT.update_menu_state = function update_menu_state(_target) {
    LAYOUT.lastAction = _target || "";
    if (DEBUG) {
      CORE.console.log("Update Menu State");
    }
    var target = _target;
    var nodes;
    if (target.indexOf("-") !== -1) {
      target = target.split("-")[0];
    }
    if (CORE.getById("btn-view-" + target)) {
      nodes = CORE.getByTag("td", "toolbar");
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].id !== "btn-view-" + target) {
          CORE.removeClass(nodes[i], "active");
        }
      }
      CORE.addClass("#btn-view-" + target, "active");
    }
    CORE.setStyle("#view-" + target, {"zIndex":1, "visibility":"visible"});
    nodes = CORE.getByClass("view");
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id !== "view-" + target) {
        CORE.setStyle(nodes[i], {"zIndex":-1, "visibility":"hidden"});
      }
    }
  };
  var spinner = {};
  /** @const */ var opts = {"lines":13, "length":28, "width":14, "radius":42, "scale":0.3, "corners":1, "color":"#aaa", "opacity":0.25, "rotate":0, "direction":1, "speed":1, "trail":60, "fps":20, "zIndex":2e9, "className":"spinner", "top":"50%", "left":"50%", "shadow":false, "hwaccel":true, "position":"absolute"};
  LAYOUT.lastAction = "";
  /**
 @param {string=} color
 */
LAYOUT.add_preloader = function add_preloader(target, color) {
    if (DEBUG) {
      CORE.console.log("Add Preloader");
    }
    target = target.target || target;
    if (color) {
      opts["color"] = color;
    }
    var target_dom = typeof target === "string" ? CORE.queryOne(target) : target;
    CORE.setHTML(target_dom, "", function() {
    });
  };
  LAYOUT.remove_preloader = function remove_preloader(target) {
    target = target.target || target;
    if (typeof target === "string") {
      target = CORE.queryOne(target);
    }
    if (spinner[target]) {
      if (DEBUG) {
        CORE.console.log("Remove Preloader");
      }
      spinner[target]["stop"]();
      spinner[target] = false;
    }
  };
  var toggle_state = false;
  LAYOUT.toggle_view = function toggle_view(left_action, right_action, callback) {
    var content_left_action_layer = "content-" + left_action + "-layer";
    var content_right_action_layer = "content-" + right_action + "-layer";
    if (!CORE.hasClass(content_left_action_layer, "slider-left")) {
      toggle_state = !toggle_state;
      CORE.addClass(content_left_action_layer, "slider-left");
    } else {
      if (CORE.hasClass(content_right_action_layer, "slider-left")) {
        toggle_state = !toggle_state;
        CORE.removeClass(content_right_action_layer, "slider-left");
      }
    }
    if (toggle_state = !toggle_state) {
      CORE.setStyle("#nav-" + left_action, "display", "none");
      CORE.setStyle("#nav-" + right_action, "display", "block");
      CORE.addClass(content_left_action_layer, "active");
      CORE.addClass(content_right_action_layer, "active");
      if (callback) {
        if (CORE.getHTML("#content-" + right_action) === "") {
          LAYOUT.add_preloader("#content-" + right_action, "#ccc");
        }
        callback();
      }
    } else {
      CORE.setStyle("#nav-" + right_action, "display", "none");
      CORE.setStyle("#nav-" + left_action, "display", "block");
      CORE.removeClass(content_left_action_layer, "active");
      CORE.removeClass(content_right_action_layer, "active");
    }
  };
  var last_popup = "";
  var last_popup_2 = "";
  var last_target = {};
  /**
 @param _wrapper
 @param {(Element|string)=} preloader_target
 @param {boolean=} hideStatusbar
 */
LAYOUT.show_popup = function(_wrapper, preloader_target, hideStatusbar) {
    if (DEBUG) {
      CORE.console.log("Show Popup");
    }
    var wrapper = _wrapper;
    if (preloader_target) {
      CORE.setHTML(preloader_target, "");
      LAYOUT.add_preloader(preloader_target, "#ccc");
      last_target[wrapper] = preloader_target;
    }
    CORE.setStyle(wrapper, {"transition":"none", "opacity":0, "transform":"scale(0.8)", "zIndex":3, "display":"block"});
    CORE.paint(function() {
      if (last_popup_2 && last_popup_2 !== last_popup) {
        CORE.setStyle(last_popup_2, "zIndex", 1);
      }
      if (last_popup) {
        CORE.setStyle(last_popup, "zIndex", 2);
      }
      CORE.setStyle(wrapper, {"transition":"transform 0.2s ease-out, opacity 0.2s ease-out", "opacity":1, "transform":"scale(1)", "zIndex":3});
      last_popup_2 = last_popup;
      last_popup = wrapper;
    });
    if (!CORE.isType(hideStatusbar)) {
      hideStatusbar = !CORE.hasClass(CORE.getByTag("header", wrapper && wrapper.substring(1))[0] || wrapper, "status-bar");
    }
  };
  LAYOUT.hide_popup = function(_wrapper, _showStatusbar) {
    if (DEBUG) {
      CORE.console.log("Hide Popup");
    }
    var wrapper = _wrapper;
    var showStatusbar = _showStatusbar;
    CORE.setStyle(wrapper, {"transform":"scale(0.8)", "opacity":0});
    CORE.paint(function() {
      CORE.setStyle(wrapper, {"display":"none", "zIndex":2});
      if (last_target[wrapper]) {
        CORE.setHTML(last_target[wrapper], "", true);
        last_target[wrapper] = false;
      }
      last_popup_2 = last_popup;
      last_popup = "";
      if (!CORE.isType(showStatusbar)) {
        showStatusbar = !CORE.hasClass(CORE.getByTag("header", wrapper && wrapper.substring(1))[0] || wrapper, "status-bar");
      }
    }, 200);
  };
  /**
 @param _wrapper
 @param {(Element|string)=} preloader_target
 @param {boolean=} hideStatusbar
 */
LAYOUT.slide_popup = function(_wrapper, preloader_target, hideStatusbar) {
    if (DEBUG) {
      CORE.console.log("Slide-In Popup");
    }
    var wrapper = _wrapper;
    if (preloader_target) {
      CORE.setHTML(preloader_target, "", function() {
        LAYOUT.add_preloader(preloader_target, "#ccc");
        last_target[wrapper] = preloader_target;
      });
    }
    CORE.setStyle(wrapper, {"transition":"none", "transform":"translateY(100%)", "zIndex":3, "display":"block"});
    CORE.paint(function() {
      if (last_popup_2 && last_popup_2 !== last_popup) {
        CORE.setStyle(last_popup_2, "zIndex", 1);
      }
      if (last_popup) {
        CORE.setStyle(last_popup, "zIndex", 2);
      }
      CORE.setStyle(wrapper, {"transition":"transform 0.3s ease-out", "transform":"translateY(0%)", "zIndex":3});
      last_popup_2 = last_popup;
      last_popup = wrapper;
    });
    if (!CORE.isType(hideStatusbar)) {
      hideStatusbar = !CORE.hasClass(CORE.getByTag("header", wrapper && wrapper.substring(1))[0] || wrapper, "status-bar");
    }
  };
  LAYOUT.slideout_popup = function(_wrapper, _showStatusbar) {
    if (DEBUG) {
      CORE.console.log("Slide-Out Popup");
    }
    var wrapper = _wrapper;
    var showStatusbar = _showStatusbar;
    CORE.setStyle(wrapper, {"transform":"translateY(100%)"});
    CORE.paint(function() {
      CORE.setStyle(wrapper, {"display":"none", "zIndex":0});
      if (last_target[wrapper]) {
        CORE.setHTML(last_target[wrapper], "", true);
        last_target[wrapper] = false;
      }
      last_popup_2 = last_popup;
      last_popup = "";
      if (!CORE.isType(showStatusbar)) {
        showStatusbar = !CORE.hasClass(CORE.getByTag("header", wrapper && wrapper.substring(1))[0] || wrapper, "status-bar");
      }
    }, 200);
  };
  /**
 @param _wrapper
 @param {(Element|string)=} preloader_target
 @param {boolean=} hideStatusbar
 */
LAYOUT.toggle_popup = function(_wrapper, preloader_target, hideStatusbar) {
    if (DEBUG) {
      CORE.console.log("Toggle-In Popup");
    }
    var wrapper = _wrapper;
    if (preloader_target) {
      CORE.setHTML(preloader_target, "", function() {
        LAYOUT.add_preloader(preloader_target, "#ccc");
        last_target[wrapper] = preloader_target;
      });
    }
    CORE.setStyle(wrapper, {"transition":"none", "transform":"translateX(100%)", "zIndex":3, "display":"block"});
    CORE.paint(function() {
      if (last_popup_2 && last_popup_2 !== last_popup) {
        CORE.setStyle(last_popup_2, "zIndex", 1);
      }
      if (last_popup) {
        CORE.setStyle(last_popup, "zIndex", 2);
      }
      CORE.addClass("view-" + LAYOUT.lastAction, "active");
      CORE.setStyle(wrapper, {"transition":"transform 0.25s ease-out", "transform":"translateX(0%)", "zIndex":3});
      last_popup_2 = last_popup;
      last_popup = wrapper;
    });
    if (!CORE.isType(hideStatusbar)) {
      hideStatusbar = !CORE.hasClass(CORE.getByTag("header", wrapper && wrapper.substring(1))[0] || wrapper, "status-bar");
    }
  };
  LAYOUT.toggleout_popup = function(_wrapper, _showStatusbar) {
    if (DEBUG) {
      CORE.console.log("Toggle-Out Popup");
    }
    var wrapper = _wrapper;
    var showStatusbar = _showStatusbar;
    CORE.removeClass("#view-" + LAYOUT.lastAction, "active");
    CORE.setStyle("#view-" + LAYOUT.lastAction, "transform", "");
    CORE.setStyle(wrapper, {"transform":"translateX(100%)"});
    CORE.paint(function() {
      CORE.setStyle(wrapper, {"display":"none", "zIndex":2});
      if (last_target[wrapper]) {
        CORE.setHTML(last_target[wrapper], "", true);
        last_target[wrapper] = false;
      }
      last_popup_2 = last_popup;
      last_popup = "";
      if (!CORE.isType(showStatusbar)) {
        showStatusbar = !CORE.hasClass(CORE.getByTag("header", wrapper && wrapper.substring(1))[0] || wrapper, "status-bar");
      }
    }, 200);
  };
  /**
 @param {!string} message
 */
LAYOUT.show_message = function(message) {
    if (DEBUG) {
      CORE.console.log("Show Message Box");
    }
    CORE.setHTML("#message-content", message, function() {
      CORE.setStyle("#message-wrapper", "display", "block");
      CORE.paint(function() {
        CORE.setStyle("#message-wrapper", "opacity", 1);
        CORE.setStyle("#message-inner", {"opacity":1, "transform":"scale(1)"});
      });
    });
  };
  LAYOUT.hide_message = function() {
    if (DEBUG) {
      CORE.console.log("Hide Message Box");
    }
    CORE.setStyle("#message-inner", {"transform":"scale(0.8)", "opacity":0});
    CORE.setStyle("#message-wrapper", "opacity", 0);
    CORE.paint(function() {
      CORE.setStyle("#message-wrapper", "display", "none");
      CORE.setHTML("#message-content", "", true);
    }, 200);
  };
  /**
 @param {!string} message
 @param {!Function} fn_confirm
 */
LAYOUT.show_confirmation = function(message, fn_confirm) {
    if (DEBUG) {
      CORE.console.log("Show Confirmation Box");
    }
    CORE.setHTML("#confirmation-content", message, function() {
      CORE.setStyle("#confirmation-wrapper", "display", "block");
      CORE.paint(function() {
        CORE.setStyle("#confirmation-wrapper", "opacity", 1);
        CORE.setStyle("#confirmation-inner", "transform", "scale(1)");
      });
    });
    CORE.getById("confirmation-yes").ontouchstart = fn_confirm;
  };
  LAYOUT.hide_confirmation = function() {
    if (DEBUG) {
      CORE.console.log("Hide Confirmation Box");
    }
    CORE.setStyle("#confirmation-wrapper", "opacity", 0);
    CORE.setStyle("#confirmation-inner", "transform", "scale(0.9)");
    CORE.paint(function() {
      CORE.setStyle("#confirmation-wrapper", "display", "none");
      CORE.setHTML("#confirmation-content", "", true);
    }, 200);
  };
  /** @const */ EVENT["confirmation-yes"] = {on:"click", do:function(event) {
    if ((this.firstElementChild && this.firstElementChild.href) === false) {
      CORE.preventEvent(event, true, true);
    } else {
      CORE.async(function() {
        CORE.setHTML("#confirmation-yes", "Ja");
      }, 200);
    }
    this.ontouchstart.call(this, event);
    LAYOUT.hide_confirmation();
  }, stopBubble:false, preventDefault:false};
  /** @const */ EVENT["confirmation-no"] = {on:"click", do:function(event) {
    CORE.setHTML("#confirmation-yes", "Ja");
    LAYOUT.hide_confirmation();
  }, stopBubble:true, preventDefault:true};
  /**
 @param {string} _key
 @param {Function=} _callback
 @param {boolean=} force
 */
LAYOUT.handleCache = function handleCache(_key, _callback, force) {
    var key = _key;
    var callback = _callback;
    var key_new = key;
    if (key.indexOf("-") !== -1) {
      key_new = key.split("-")[0];
    }
    if (LAYOUT.lastAction === key || force) {
      if (DEBUG) {
        CORE.console.log("Handle Layout Cache: " + _key);
      }
      if (LAYOUT.lastAction === key) {
        LAYOUT.update_menu_state(key_new);
      }
      var target = CORE.getById("content-" + key);
      var inner_html = CORE.getHTML(target);
      if (inner_html === "") {
        var cache = STORAGE.VIEW.get(LAYOUT.lastAction = key);
        if (cache && APP.CRC32["content-" + key] !== cache["crc"]) {
          APP.CRC32["content-" + key] = cache["crc"];
          CORE.setHTML(target, STORAGE.decompress(cache["cache"]), true);
        } else {
          if (callback) {
            LAYOUT.add_preloader("#content-" + key);
          }
        }
      } else {
        if (LAYOUT.lastAction === key) {
          var nodes = CORE.getByTag("main", /** @type {Element} */ (CORE.getById("content-" + key).parentNode.parentNode.parentNode));
          for (var i = 0; i < nodes.length; i++) {
            CORE.scrollToTop(nodes[i]);
          }
        }
      }
      var fn_callback_wrapper = function() {
        LAYOUT.remove_preloader("#content-" + key);
        var cache = CORE.getHTML(target);
        if (cache) {
          CORE.async(function() {
            STORAGE.VIEW.set(key_new, {"cache":STORAGE.compress(cache), "crc":APP.CRC32["content-" + key] || 1});
          });
        }
      };
      if (callback) {
        callback(fn_callback_wrapper);
      } else {
        fn_callback_wrapper();
      }
    }
  };
  var easeInQuint = function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t * t + b;
  };
  /**
 @param {(HTMLElement|Element|string)} el
 @param {Object<string,(Function|string|number|boolean)>=} config
 */
LAYOUT.addSwipe = function addSwipe(el, config) {
    if (DEBUG) {
      CORE.console.log("Add Swipe", el.id || el.parentNode.id || el);
    }
    var touchsurface = el, startX, startY, distX, limit = config ? config.limit : false, touchstart = config ? config.start : false, touchmove = config ? config.move : false, touchend = config ? config.end : false, finish = config ? config.finish : false;
    var swipe_touch_move_handler = function(e) {
      APP.VARS.force_touchmove = true;
      var touchobj = e["changedTouches"][0];
      distX = touchobj.pageX - startX;
      if (touchmove) {
        touchmove.call(this, distX);
      } else {
        if (distX >= 0 && (!limit || distX < screen.width / 100 * limit)) {
          CORE.setStyle(this.parentNode, "transform", "translateX(" + distX + "px)");
        }
      }
      if (this.parentNode.id && CORE.getById("view-" + LAYOUT.lastAction) !== this.parentNode) {
        CORE.setStyle("view-" + LAYOUT.lastAction, "transform", "translateX(-" + (25 - distX / screen.width * 25) + "%)");
      }
      CORE.preventEvent(e, true, true);
    };
    CORE.on(touchsurface, "", "touchstart", function(e) {
      APP.VARS.force_touchmove = true;
      var touchobj = e["changedTouches"][0];
      distX = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      CORE.addClass([this.parentNode, "#view-" + LAYOUT.lastAction], "no-transition");
      CORE.removeClass("#view-" + LAYOUT.lastAction, "active");
      if (touchstart) {
        touchstart.call(this, distX);
      }
      this.addEventListener("touchmove", swipe_touch_move_handler, APP.CONFIG.PASSIVE_EVENTS);
    }, true, true);
    CORE.on(touchsurface, "", "touchend", function(e) {
      APP.VARS.force_touchmove = false;
      var touchobj = e["changedTouches"][0];
      distX = touchobj.pageX - startX;
      if (touchend) {
        touchend.call(this, distX);
      } else {
        if (distX < screen.width / 3.1416) {
          CORE.setStyle(this.parentNode, "transform", "translateX(0px)");
          CORE.setStyle("#view-" + LAYOUT.lastAction, "transform", "translateX(-25%)");
          CORE.paint(function() {
            CORE.setStyle("#view-" + LAYOUT.lastAction, "transform", "");
          }, 200);
        } else {
          limit ? CORE.setStyle(this.parentNode, {"transform":"translateX(" + limit + "%)"}) : CORE.setStyle(this.parentNode, {"transform":"translateX(100%)"});
          var _this = this;
          CORE.paint(function() {
            CORE.setStyle(_this.parentNode, "display", "none");
          }, 200);
          CORE.setStyle("#view-" + LAYOUT.lastAction, "transform", "");
          if (finish) {
            finish.call(this, distX);
          }
        }
      }
      CORE.removeClass([this.parentNode, "#view-" + LAYOUT.lastAction], "no-transition");
      this.removeEventListener("touchmove", swipe_touch_move_handler);
    }, true, true);
  };
  var pull_down = false;
  var in_progress = false;
  var scroll_start = 0;
  var scroll_pos = 0;
  var pull_touch_move_handler = function(event) {
    if (!in_progress && pull_down) {
      if (event.originalEvent) {
        event = event.originalEvent;
      }
      scroll_pos = (event.touches || event.changedTouches)[0].pageY;
      var scroll_height = CORE.Math.min(scroll_pos - scroll_start, 50);
      if (scroll_pos > scroll_start) {
        APP.VARS.force_touchmove = true;
        CORE.preventEvent(event, true, true);
        CORE.setStyle(this.firstElementChild, {"opacity":CORE.Math.max(1 / 50 / 50 * scroll_height * scroll_height, 0), "transform":"translateY(" + scroll_height + "px)"});
        if (scroll_pos - scroll_start > 50) {
          CORE.setStyle(this.firstElementChild.nextElementSibling, "transform", "translateY(" + (50 + Math.sqrt((scroll_pos - scroll_start - 50) * 15) | 0) + "px)");
        } else {
          CORE.setStyle(this.firstElementChild.nextElementSibling, "transform", "translateY(" + (scroll_pos - scroll_start) + "px)");
        }
      } else {
        APP.VARS.force_touchmove = false;
        pull_down = false;
      }
    } else {
      if (!in_progress && this.scrollTop === 0 && this.firstElementChild.nextElementSibling.scrollTop === 0) {
        if (event.originalEvent) {
          event = event.originalEvent;
        }
        scroll_start = (event.touches || event.changedTouches)[0].pageY;
        pull_down = true;
      } else {
        APP.VARS.force_touchmove = false;
      }
    }
  };
  /**
 @param {(HTMLElement|Element|string)} el
 */
LAYOUT.initPullToRefresh = function initPullToRefresh(el, route) {
    if (DEBUG) {
      CORE.console.log("Init Pull To Refresh", el.id || el.parentNode.id || el);
    }
    CORE.on(el, "", "touchstart", function(event) {
      if (!in_progress && this.scrollTop === 0 && this.firstElementChild.nextElementSibling.scrollTop === 0) {
        APP.VARS.force_touchmove = true;
        if (event.originalEvent) {
          event = event.originalEvent;
        }
        scroll_start = scroll_pos = (event.touches || event.changedTouches)[0].pageY;
        pull_down = true;
      }
      this.addEventListener("touchmove", pull_touch_move_handler, APP.CONFIG.PASSIVE_EVENTS);
    }, false, false);
    CORE.on(el, "", "touchend", function(event) {
      APP.VARS.force_touchmove = false;
      if (!in_progress && pull_down) {
        if (scroll_pos > scroll_start) {
          CORE.preventEvent(event, true, true);
          var scroll_height = CORE.Math.min(scroll_pos - scroll_start, 50);
          if (scroll_height >= 50) {
            CORE.setStyle(el.firstElementChild.nextElementSibling, "transform", "translateY(50px)");
            in_progress = true;
            APP.CONTROLLER.request(route, {}, function(data) {
              if (APP.ROUTE[route].to) {
                APP.CONTROLLER[APP.ROUTE[route].to](data);
              } else {
                if (APP.ROUTE[route].do) {
                  if (CORE.isType(APP.ROUTE[route].do, "string")) {
                    APP.HANDLER[APP.ROUTE[route].do](data);
                  } else {
                    APP.ROUTE[route].do(data);
                  }
                }
              }
              CORE.setStyle(el.firstElementChild.nextElementSibling, "transform", "translateY(0px)");
              CORE.setStyle(el.firstElementChild, {"opacity":0, "transform":"translateY(0px)"});
              pull_down = false;
              in_progress = false;
            });
          } else {
            CORE.setStyle(el.firstElementChild.nextElementSibling, "transform", "translateY(0px)");
            CORE.setStyle(el.firstElementChild, {"opacity":0, "transform":"translateY(0px)"});
            pull_down = false;
          }
        } else {
          pull_down = false;
          in_progress = false;
        }
      }
      this.removeEventListener("touchmove", pull_touch_move_handler);
    }, false, false);
  };
})(APP.LAYOUT, APP.CONTROLLER, /** @type {_storage_struct} */ (APP.STORAGE), APP.EVENT);

APP.HTML = {"layout/action/group":[{data:['<div id="action-group-wrapper" class="overlay hardware-accelerated action-wrapper" style="z-index: 99;">\r <div class="action-content" style="position: absolute; bottom:10px; left:10px; right:10px;">\r <table style="width: 100%; height:auto; background-color: #fff; border-radius: 4px; table-layout: fixed;">\r <tr class="btn-edit-group">\r \r </tr>\r <tr class="btn-delete-group">\r <td style="">\r <div style="text-align: center; line-height: 50px; height: 50px;">Remove Calendar</div>\r </td>\r </tr>\r </table>\r <div style="height:10px"></div>\r <table style="width: 100%; height:auto; background-color: #fff; border-radius: 4px; table-layout: fixed;">\r <tr id="action-group-close">\r <td>\r <div style="text-align: center; line-height: 50px; height: 50px;">Cancel</div>\r </td>\r </tr>\r </table>\r </div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/action/slot":[{data:['<div id="action-slot-wrapper" class="overlay hardware-accelerated action-wrapper" style="z-index: 99;">\r <div class="action-content" style="position: absolute; bottom:10px; left:10px; right:10px;">\r <table style="width: 100%; height:auto; background-color: #fff; border-radius: 4px; table-layout: fixed;">\r \r <tr class="btn-report-slot">\r <td style="">\r <div style="text-align: center; line-height: 50px; height: 50px;">Report Slot</div>\r </td>\r </tr>\r </table>\r <div style="height:10px"></div>\r <table style="width: 100%; height:auto; background-color: #fff; border-radius: 4px; table-layout: fixed;">\r <tr id="action-slot-close">\r <td>\r <div style="text-align: center; line-height: 50px; height: 50px;">Cancel</div>\r </td>\r </tr>\r </table>\r </div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/action/user":[{data:['<div id="action-user-wrapper" class="overlay hardware-accelerated action-wrapper" style="z-index: 99;">\r <div class="action-content" style="position: absolute; bottom:10px; left:10px; right:10px;">\r <table style="width: 100%; height:auto; background-color: #fff; border-radius: 4px; table-layout: fixed;">\r <tr class="btn-edit-user">\r \r </tr>\r <tr class="user-image-small">\r <td style="border-bottom: 1px solid #ccc">\r <div style="text-align: center; line-height: 50px; height: 50px;">Show Profile</div>\r </td>\r </tr>\r <tr class="link-to-user-slots">\r <td style="border-bottom: 1px solid #ccc">\r <div style="text-align: center; line-height: 50px; height: 50px;">Show Slots</div>\r </td>\r </tr>\r \r </table>\r <div style="height:10px"></div>\r <table style="width: 100%; height:auto; background-color: #fff; border-radius: 4px; table-layout: fixed;">\r <tr id="action-user-close">\r <td>\r <div style="text-align: center; line-height: 50px; height: 50px;">Cancel</div>\r </td>\r </tr>\r </table>\r </div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/activity":[{data:['\r <div id="view-activity" class="view slider-left">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <header class="navbar status-bar" data-role="header" data-position="fixed" data-tap-toggle="false">\r <table>\r <tr>\r <td class="td-1">\r \r </td>\r \r <td class="td-3">\r <b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative">Feed</b>\r \r </td>\r <td class="td-5">\r \r </td>\r </tr>\r </table>\r </header>\r \r <main class="viewport status-bar" data-use-native-scrolling="true" style="background-color: #e7e9ec">\r \r <div class="pull-to-refresh" style="position: relative; margin-top:-51px; top:-8px"></div>\r \r \r \r <div id="content-activity" class="content-wrapper" style="position: absolute; top:0px; left:0px; right: 0px; bottom: 0px; overflow: auto; padding-bottom: 48px;"></div>\r \r \r \r \r \r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/calendar":[{data:['\r <div id="view-calendar" class="view slider-left" style="z-index: 1; background-color: #fff">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div id="drag-layer-calendar" style="width:15px; height:100%; position: absolute; top:0px; left:0px; bottom:0px; z-index: 9"></div>\r \r <header class="navbar status-bar" data-role="header" data-position="fixed" data-tap-toggle="false" style=" border:0; box-shadow:none">\r \r <div id="nav-calendar-agenda">\r <table>\r <tr>\r <td class="td-1">\r <a id="btn-toolbar-sidebar-agenda-switch" class="btn-navbar-icon" style="margin-left: 15px; width: 24px; height: 24px; display: block"></a>\r </td>\r <td class="td-2"></td>\r <td class="td-3" style="">\r <div style="overflow:hidden; height: 48px">\r <div id="progress-bar-wrapper" style="height:100%">\r <div id="title-calendar-my-slots" style="padding-top: 10px; height: 48px">\r \r \r <img src="img/logo_timeslot.png" style="height:20px; padding: 0; padding-left: 2px; padding-top: 2px; display: block; margin: auto; ">\r \r \r \r </div>\r \r <div style="position: absolute; top: 40px; width: 100%">\r <b class="navbar-title" style="font-size: 11px; font-weight: 300">Sync Calendar</b>\r <div id="progress-bar-layer" style="position: relative; top: 0px; height: 3px; width: 50%; background-color:rgba(0, 0, 0, 0.1); margin: 0px auto 10px auto; overflow: hidden;">\r <div id="progress-bar" style="position: absolute; top:0px; left:0px; bottom:0px; right:0px; background-color: rgba(0, 0, 0, 0.5);"></div>\r </div>\r </div>\r </div>\r </div>\r \r </td>\r <td class="td-4"></td>\r <td class="td-5"><a id="btn-toolbar-calendar-agenda-new-slot" class="btn-navbar-icon" style="margin-left: 5px; margin-right: 20px; display: block"></a></td>\r </tr>\r </table>\r \r </div>\r </header>\r \r <div id="content-calendar-agenda-layer" class="viewport status-bar hardware-accelerated" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden">\r \r <table id="calendar-header" data-use-native-scrolling="true" style="width:100%; height: 15px; line-height: 10px; table-layout: fixed; position: relative; top:0; font-size: 10px; color: #9c9e9d; z-index:1; background: #fff; border-bottom: 1px solid #e4e7f2;    ">\r <tr>\r <td style="width: 16.6667%; text-align: center; vertical-align: top;">M</td>\r <td style="width: 16.6667%; text-align: center; vertical-align: top;">T</td>\r <td style="width: 16.6667%; text-align: center; vertical-align: top;">W</td>\r <td style="width: 16.6667%; text-align: center; vertical-align: top;">T</td>\r <td style="width: 16.6667%; text-align: center; vertical-align: top;">F</td>\r <td style="width: 16.6667%; text-align: center; vertical-align: top;">S</td>\r <td style="width: 16.6667%; text-align: center; vertical-align: top;">S</td>\r </tr>\r </table>\r \r <div id="content-calendar-big-layer" style="position:absolute; top:15px; overflow:hidden; -webkit-overflow-scrolling: touch; width:100%; height:268px; border-bottom:1px solid rgb(228, 231, 242); z-index:1; box-shadow: 0px 0px 3px 0px rgba(228, 231, 242, 0.75);">\r <table id="calendar-date-overlay" style="z-index:1; pointer-events: none">\r <tr>\r <td id="calendar-date-overlay-content" style="text-align: center; font-size: 32px; font-weight: 700; color: rgb(21, 26, 41); height: 225px; max-height: 225px">September 2015</td>\r </tr>\r <tr>\r <td style="height: auto"></td>\r </tr>\r </table>\r <div id="content-calendar-big-test" style="position:absolute; width:100%; height:100%; max-height: 100%; white-space: nowrap; text-align: center; z-index:0" data-use-native-scrolling="true">\r <div id="calendar-big-wrapper" style="position:absolute; width: 100%; height:300%;"></div>\r </div>\r <div id="content-calendar-compact-layer" style="display:none; opacity:0; pointer-events: none; transition: opacity 0.2s linear; will-change:opacity; position: absolute; bottom: 41px; height: 45px; width: 100%; z-index:0">\r \r \r \r <div id="content-calendar-layer-scroll" data-use-native-scrolling="true">\r <div id="content-calendar-layer-inner">\r <div id="calendar-compact-wrapper" style="width: 300%"></div>\r </div>\r </div>\r </div>\r <div id="calendar-big-navbar" style="position:absolute; bottom:0px; width: 100%; height:43px; background-color: #fff; border-top:1px solid rgb(228, 231, 242);   z-index: 2; transform:translateZ(1px); ">\r <table style="table-layout: fixed; width:100%; height:100%; color: rgb(153, 155, 161); font-weight: 300; ">\r <tr>\r <td id="calendar-big-month" style="padding-left:18px">September</td>\r <td id="calendar-search" style="padding-left:18px; display: none">\r <input id="calendar-search-query" type="text" style="pointer-events: none; border:0; margin:0; padding:2px 10px 0px 30px; background-color: transparent; background-size: 18px 18px; background-position: 2px center; -webkit-filter: invert(0.8); filter: invert(0.8); width:100%; height: 35px; line-height: 35px; color: rgb(153, 155, 161); border-radius:4px; font-weight: 300; font-size: 15px; outline: none; box-sizing: border-box;" placeholder="Search">\r </td>\r <td id="calendar-big-day" style="border-left: 1px solid rgb(228, 231, 242); width: 50px; text-align: center; font-size:12px; padding-top: 2px; background-position: center -1px;">27</td>\r <td id="calendar-big-switch" style="border-left: 1px solid rgb(228, 231, 242); width: 50px; background-position: center center; background-repeat: no-repeat; background-size: 65%"></td>\r </tr>\r </table>\r </div>\r </div>\r <div id="content-calendar-agenda-inner" style="position: absolute; right:0px; left:0px; bottom:0px; background-color: #fff;">\r \r \r \r \r \r <main id="content-calendar" data-use-native-scrolling="true" style="transition: opacity 0.2s linear;  will-change: scroll-position, opacity; position: absolute; top:0px; right:0px; left:0px; bottom:0px; overflow-x: hidden; margin-bottom: -1px; padding-bottom: 48px; background-color: rgb(239, 239, 244) ; z-index: 1; -webkit-overflow-scrolling: touch; overflow-y: scroll; "></main>\r <main id="content-calendar-flex-scroll" data-use-native-scrolling="true" style="padding-top: 20px; padding-bottom: 48px; position: absolute; top:0px; right:0px; left:0px; bottom:0px; overflow-x: hidden; will-change: scroll-position, transform; background-color: #fff; z-index: 0; -webkit-overflow-scrolling: touch; overflow-y: scroll;">\r <div id="content-calendar-flex" style="padding-bottom: 48px;  position: absolute; min-height: 100%; width: 100%"></div>\r </main>\r \r \r \r \r </div>\r </div>\r </div>\r \r <div id="content-calendar-sidebar-layer" class="slider-sidebar" data-position="fixed" data-tap-toggle="false" style="position: absolute; z-index: 0; width: 90%; height:100%; top:0px !important; left:0px; background: url(img/background.png) ; ; ">\r \r <main data-use-native-scrolling="true" style="">\r \r \r \r <div style="padding:15px; position: absolute; top:0px; left:0px; right:0px; height: 75px; opacity:0.5; display: none">\r <input id="sidebar-query" type="text" style="border:0; margin:0; padding:5px 10px 5px 34px; background-color: rgba(255, 255, 255, 0.19); width:100%; height: 35px; line-height: 35px; color: rgba(255, 255, 255, 0.75); border-radius:4px; font-weight: 400; font-size: 15px; outline: none; box-sizing: border-box;" placeholder="Search">\r </div>\r \r <div id="content-settings" style="padding:0; position: absolute; top:0px; left:0px; right:0px; height: 78px; background: url(img/background.png); overflow: hidden; border-bottom: 1px solid rgba(255, 255, 255, 0.07); z-index: 2">\r \r <table class="view-user" style="width: 100%; table-layout: fixed; height:48px; margin: 15px 0 15px 0;">\r <tr>\r <td style="padding:0px 5px 0 15px; width: 64px">\r \r <label for="settings-user-image-input" style="margin: 0; pointer-events: none">\r <img id="settings-user-image" class="user-image-small" src="img/3/icon-profile.png" style="width: 48px; height: 48px; border-radius:100%; object-fit: cover; object-position: center; ">\r <form id="settings-user-image-form" enctype="multipart/form-data" style="display:none">\r <input id="settings-user-image-input" class="file" type="file" name="file">\r </form>\r </label>\r </td>\r <td style="padding:0 10px 0 5px">\r <span id="content-settings-current-user-name" class="slot-card-user-name" style="font-weight: 300; color: rgba(255, 255, 255, 1);"></span>\r </td>\r <td style="width: 50px; position: relative"><div class="btn-navbar-icon icon-slot-back" style="margin: 0; padding-left: 0px; opacity: 0.5; transform: rotate(180deg)"></div></td>\r </tr>\r </table>\r \r </div>\r \r \r <div id="sidebar-container-right" style="overflow-y: auto; -webkit-overflow-scrolling: touch; position: absolute; top:78px; bottom:0px; left:0%; right:0px; z-index: 2; background: url(img/background.png); transform:translateX(100%); transition: transform 0.2s ease-out">\r \r <table id="settings-profile" class="card" style="table-layout: fixed; background-color: rgba(255, 255, 255, 0.03); color:#fff; margin:0; padding:0; border-color: rgba(255, 255, 255, 0.10)">\r <tr style="border-top: 1px solid rgba(255, 255, 255, 0.07);">\r <td class="card-title" style="padding:15px; font-weight: 300; color: rgba(255, 255, 255, 0.24); width: 80%">\r <div style="background-color: #2175d5; border-radius:4px; width: 29px; height:29px; line-height: 29px; text-align: center; vertical-align: middle; display: inline-block; margin-left: 5px">\r <img src="img/1/icon-profile.png" srcset="img/2/icon-profile.png 2x, img/3/icon-profile.png 3x" style="height: 15px; margin: 6px auto 0 auto; display: inline">\r </div>\r &ensp;\r Profile\r </td>\r </tr>\r </table>\r <table id="settings-activities" class="card" style="table-layout: fixed; background-color: rgba(255, 255, 255, 0.03); color:#fff; margin:0; padding:0; border-color: rgba(255, 255, 255, 0.10); border-top: none">\r <tr style="border-top: 1px solid rgba(255, 255, 255, 0.07); border-top: none">\r <td class="card-title" style="padding:15px; font-weight: 300; color: rgba(255, 255, 255, 0.24); width: 80%">\r <div style="background-color: #d4156f; border-radius:4px; width: 29px; height:29px; line-height: 29px; text-align: center; vertical-align: middle; display: inline-block; margin-left: 5px">\r <img src="img/1/icon-my-activity.png" srcset="img/2/icon-my-activity.png 2x, img/3/icon-my-activity.png 3x" style="height: 15px; margin: 6px auto 0 auto; display: inline">\r </div>\r &ensp;\r My Activities\r </td>\r <td></td>\r <td></td>\r </tr>\r </table>\r <table id="settings-feedback" class="card" style="table-layout: fixed; background-color: rgba(255, 255, 255, 0.03); color:#fff; margin:0; padding:0; border-color: rgba(255, 255, 255, 0.10); border-top: none">\r <tr style="border-top: 1px solid rgba(255, 255, 255, 0.07); border-top: none">\r <td class="card-title" style="padding:15px; font-weight: 300; color: rgba(255, 255, 255, 0.24); width: 80%">\r <div style="background-color: #f8621f; border-radius:4px; width: 29px; height:29px; line-height: 29px; text-align: center; vertical-align: middle; display: inline-block; margin-left: 5px">\r <img src="img/1/icon-about.png" srcset="img/2/icon-about.png 2x, img/3/icon-about.png 3x" style="height: 15px; margin: 6px auto 0 auto; display: inline">\r </div>\r &ensp;\r <a href="mailto:feedback@timeslot.com" style="text-decoration:none; font-weight: 300; color: rgba(255, 255, 255, 0.24);">Send Us Feedback</a>\r </td>\r <td></td>\r <td></td>\r </tr>\r </table>\r <table id="settings-logout" class="card" style="table-layout: fixed; background-color: rgba(255, 255, 255, 0.03); color:#fff; margin:0; padding:0; border-color: rgba(255, 255, 255, 0.10); border-top: none">\r <tr style="border-top: 1px solid rgba(255, 255, 255, 0.07); border-top: none">\r <td class="card-title" style="padding:15px; font-weight: 300; color: rgba(255, 255, 255, 0.24); width: 80%">\r <div style="background-color: #656d7a; border-radius:4px; width: 29px; height:29px; line-height: 29px; text-align: center; vertical-align: middle; display: inline-block; margin-left: 5px">\r <img src="img/1/icon-logout.png" srcset="img/2/icon-logout.png 2x, img/3/icon-logout.png 3x" style="height: 20px; margin: 4px auto 0 auto; display: inline">\r </div>\r &ensp;\r Logout\r </td>\r <td></td>\r <td></td>\r </tr>\r </table>\r \r </div>\r \r \r <div id="sidebar-container-left" style="overflow-y: auto; -webkit-overflow-scrolling: touch; position: absolute; top:78px; bottom:0px; left:0px; right:0px; transition: transform 0.2s ease-out">\r \r \r \r \r <br>\r <div id="sidebar-calendar-default">\r <div style="padding-left:15px; font-size: 0.85em; font-weight: 300; color: rgba(255, 255, 255, 0.40); line-height:3em; text-transform: uppercase">Default Calendars</div>\r <div id="content-default-sidebar" style="border-bottom: 1px solid rgba(255, 255, 255, 0.0980392);"></div>\r <br>\r </div>\r <div id="sidebar-calendar-personal">\r <div style="padding-left:15px; font-size: 0.85em; font-weight: 300; color: rgba(255, 255, 255, 0.40); line-height:3em; text-transform: uppercase">Personal Calendars</div>\r <div id="content-me-sidebar"></div>\r <table class="card" style="table-layout: fixed; background-color: rgba(255, 255, 255, 0.03); color:#fff; margin:0; padding:0; border-color: rgba(255, 255, 255, 0.10)">\r \r <tr class="link-to-create-calendar" style="border-top: 1px solid rgba(255, 255, 255, 0.07);">\r <td class="card-title" style="padding:15px; font-weight: 300; color: rgba(255, 255, 255, 0.24); width: 80%">\r <img src="img/1/icon-add-settings.png" srcset="img/2/icon-add-settings.png 2x, img/3/icon-add-settings.png 3x" style="width: 19px; height:19px; position:relative; top:3px">\r &ensp;\r Create new calendar\r </td>\r <td></td>\r <td></td>\r </tr>\r </table>\r <br>\r </div>\r <div id="sidebar-calendar-shared">\r \r <div style="padding-left:15px; font-size: 0.85em; font-weight: 300; color: rgba(255, 255, 255, 0.40); line-height:3em; text-transform: uppercase">Shared Calendars</div>\r <div id="content-share-group-sidebar" style="border-bottom: 1px solid rgba(255, 255, 255, 0.0980392);"></div>\r <div></div>\r \r <br>\r </div>\r <div id="sidebar-calendar-follow">\r \r <div style="padding-left:15px; font-size: 0.85em; font-weight: 300; color: rgba(255, 255, 255, 0.40); line-height:3em; text-transform: uppercase">Followed Calendars</div>\r <div id="content-follow-group-sidebar"></div>\r <table class="card" style="table-layout: fixed; background-color: rgba(255, 255, 255, 0.03); color:#fff; margin:0; padding:0; border-color: rgba(255, 255, 255, 0.10)">\r <tr class="link-to-discover-calendar" style="border-top: 1px solid rgba(255, 255, 255, 0.07)">\r <td class="card-title" style="padding:15px; font-weight: 300; color: rgba(255, 255, 255, 0.24); width: 80%">\r <img src="img/1/icon-add-settings.png" srcset="img/2/icon-add-settings.png 2x, img/3/icon-add-settings.png 3x" style="width: 19px; height:19px; position:relative; top:3px">\r &ensp;\r Discover new calendars\r </td>\r <td></td>\r <td></td>\r </tr>\r </table>\r <br>\r </div>\r <div id="sidebar-calendar-friend">\r \r <div style="padding-left:15px; font-size: 0.85em; font-weight: 300; color: rgba(255, 255, 255, 0.40); line-height:3em; text-transform: uppercase">Friend Calendars</div>\r <div id="content-user-sidebar" style="border-bottom: 1px solid rgba(255, 255, 255, 0.0980392); margin-bottom: -1px;"></div>\r <table class="card" style="table-layout: fixed; background-color: rgba(255, 255, 255, 0.07); color:#fff; margin:0; padding:0; border-color: rgba(255, 255, 255, 0.10); display:none">\r <tr class="link-to-discover-user" style="border-top: 1px solid rgba(255, 255, 255, 0.07); display:none">\r <td class="card-title" style="padding:15px; font-weight: 300; color: rgba(255, 255, 255, 0.24); width: 80%">\r <img src="img/1/icon-add-settings.png" srcset="img/2/icon-add-settings.png 2x, img/3/icon-add-settings.png 3x" style="width: 19px; height:19px; position:relative; top:3px">\r &ensp;\r Add new friend\r </td>\r <td></td>\r <td></td>\r </tr>\r </table>\r <br>\r </div>\r <br>\r </div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/discover":[{data:['\r <div id="view-discover" class="view slider-left">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <header class="navbar status-bar" data-role="header" data-position="fixed" data-tap-toggle="false">\r \r \r \r \r \r \r \r \r \r \r \r \r \r \r \r \r \r \r <div id="nav-search">\r <table>\r <tr>\r \r <td style="width: 99%; text-align: center; position: relative">\r <div style="padding:0 15px;">\r <input id="search-query" type="text" style="border:0; margin:0; padding:7px 10px 6px 34px; background-color: rgba(0, 0, 0, 0.19); width:100%; height: 35px; line-height: 35px; color: rgba(0, 0, 0, 0.3); border-radius:4px; font-weight: 500; font-size: 15px; outline: none; box-sizing: border-box;" placeholder="Search">\r </div>\r </td>\r </tr>\r </table>\r </div>\r </header>\r \r <div id="content-search-layer" class="viewport status-bar hardware-accelerated slider-left" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden; z-index:1">\r \r \r \r <main data-use-native-scrolling="true">\r \r <div style="background-color:   #efeff4; position: absolute; padding-bottom: 48px; left:0px; top:0px; right:0px; bottom:0px; z-index: 1">\r <div style="position: absolute; left:15px; top:10px; right:15px; height: 35px; border-bottom:1px solid #ccc">\r <table id="nav-search-switch-bg" style="width: 100%; table-layout: fixed; position: relative">\r <tr>\r \r <td id="navbar-search-discover" class="active" style="width: 18%; height: 30px; padding:2px 0; text-align: center">\r <b class="navbar-title" style="color: rgb(21, 26, 41); font-size: 16px; font-weight: 300;">Discover</b>\r </td>\r <td id="navbar-search-slots" style="width: 15%; height: 30px; padding:2px 0; text-align: center">\r <b class="navbar-title" style="color: rgb(21, 26, 41); font-size: 16px; font-weight: 300;">Slots</b>\r </td>\r <td id="navbar-search-users" style="width: 20%; height: 30px; text-align: center">\r <b class="navbar-title" style="color: rgb(21, 26, 41); font-size: 16px; font-weight: 300">People</b>\r </td>\r <td id="navbar-search-calendars" style="width: 20%; height: 30px; padding:2px 0; text-align: center">\r <b class="navbar-title" style="color: rgb(21, 26, 41); font-size: 16px; font-weight: 300;">Calendars</b>\r </td>\r </tr>\r </table>\r </div>\r \r <div id="content-search" class="content-wrapper" style="background-color:   #efeff4; overflow-y: auto; -webkit-overflow-scrolling: touch; margin: 0; position: absolute; top:60px; bottom:0px; left:0px; right:0px; padding:0 15px; padding-bottom: 48px; width: auto"></div>\r \r \r </div>\r \r <div class="layout-spacer"></div>\r </main>\r </div>\r \r <div id="content-discover-layer" class="viewport status-bar hardware-accelerated slider-right" data-position="fixed" data-tap-toggle="false" style="-webkit-overflow-scrolling: touch">\r \r \r \r <main data-use-native-scrolling="true" style="padding: 0 15px">\r \r <div id="content-discover" class="content-wrapper" style="background-color:   #efeff4;"></div>\r \r <div style="height: 48px"></div>\r \r <div class="layout-spacer"></div>\r </main>\r </div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/notification":[{data:['\r <div id="view-notification" class="view slider-left">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <header class="navbar status-bar" data-role="header" data-position="fixed" data-tap-toggle="false">\r \r <div id="nav-notification">\r <table>\r <tr>\r <td class="td-1"></td>\r <td class="td-3">\r <div id="nav-notification-switch-bg">\r <div id="navbar-notifications" style="display: inline-block; width: 96px; height: 31px; line-height: 31px; border-radius: 4px;">\r <b class="navbar-title" style="font-size: 13px; margin-left: -5px;">Notifications</b>\r </div>\r <div id="navbar-invitations" style="display: inline-block; width: 96px; height: 31px; line-height: 31px">\r <div style="display: none; background-color: rgb(255, 245, 100); width: 7px; height: 7px; border-radius: 7px; float: left; position: relative; top:13px; left:7px; margin-left: 5px;"></div>\r <b class="navbar-title" style="font-size: 13px; margin-right: -5px;">Requests</b>\r </div>\r </div>\r </td>\r <td class="td-5"></td>\r </tr>\r </table>\r </div>\r </header>\r \r <div id="content-notification-layer" class="viewport status-bar hardware-accelerated slider-left" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">\r \r <div class="pull-to-refresh" style="position: relative; margin-top:-51px; top:-8px"></div>\r \r <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; padding-bottom: 48px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">\r \r <div id="content-notification" class="content-wrapper" style=""></div>\r \r </main>\r </div>\r \r <div id="content-invitation-layer" class="viewport status-bar hardware-accelerated slider-right" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden; z-index:1">\r \r <div class="pull-to-refresh" style="position: relative; margin-top:-51px; top:-8px"></div>\r \r <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; padding-bottom: 48px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">\r \r <div id="content-invitation" class="content-wrapper" style=""></div>\r <div style="height: 48px"></div>\r </main>\r </div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/onboarding":[{data:['\r <div id="onboarding-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r \r \r <main class="viewport" data-use-native-scrolling="true" style="bottom:0px; top:0px; background: #2067d7; background:  url(img/background.png);">\r \r <div id="onboarding-content" style="position:relative; width:100%; height:100%; overflow: hidden;">\r \r <div id="onboarding-pager" style="position: absolute; bottom:95px; left:0px; right:0px; width:100%; height:8px; line-height: 8px; text-align: center; z-index: 1; visibility: hidden">\r <table style="width:auto; height:8px; table-layout: fixed; margin: auto; position: relative">\r <tr>\r <td style="width: 22px; text-align: center">\r <span style="display: inline-block; width:8px; height:8px; border-radius:100%; background-color:rgba(255, 255, 255, 1); transition: background-color ease-out 0.2s"></span>\r </td>\r <td style="width: 22px; text-align: center">\r <span style="display: inline-block; width:8px; height:8px; border-radius:100%; background-color:rgba(255, 255, 255, 0.3); transition: background-color ease-out 0.2s"></span>\r </td>\r <td style="width: 22px; text-align: center">\r <span style="display: inline-block; width:8px; height:8px; border-radius:100%; background-color:rgba(255, 255, 255, 0.3); transition: background-color ease-out 0.2s"></span>\r </td>\r <td style="width: 22px; text-align: center">\r <span style="display: inline-block; width:8px; height:8px; border-radius:100%; background-color:rgba(255, 255, 255, 0.3); transition: background-color ease-out 0.2s"></span>\r </td>\r <td style="width: 22px; text-align: center">\r <span style="display: inline-block; width:8px; height:8px; border-radius:100%; background-color:rgba(255, 255, 255, 0.3); transition: background-color ease-out 0.2s"></span>\r </td>\r </tr>\r </table>\r </div>\r \r <div id="onboarding-button" style="position: absolute; bottom:0px; left:0px; right:0px; width:100%; height:65px; line-height: 65px; font-size: 16px; font-weight: 600; background-color:#fff; color: #2291d0; text-transform: uppercase; text-align: center; z-index: 1">\r Get Started\r </div>\r \r <div id="onboarding-layer" style="position:relative; width:100%; height:100%; overflow: visible; z-index: 0">\r <div style="position:absolute; width:100%; height:100%; text-align: center; left:0px">\r <img style="width:auto; height:auto; max-width: 100%; max-height: 70%; margin:auto; position:relative" src="img/screen_1.png">\r </div>\r <div style="position:absolute; width:100%; height:100%; text-align: center; left:100%">\r <img style="width:auto; height:auto; max-width: 100%; max-height: 70%; margin:auto; position:relative" src="img/screen_2.png">\r </div>\r <div style="position:absolute; width:100%; height:100%; text-align: center; left:200%">\r <img style="width:auto; height:auto; max-width: 100%; max-height: 70%; margin:auto; position:relative" src="img/screen_3.png">\r </div>\r <div style="position:absolute; width:100%; height:100%; text-align: center; left:300%">\r <img style="width:auto; height:auto; max-width: 100%; max-height: 70%; margin:auto; position:relative" src="img/screen_4.png">\r </div>\r <div style="position:absolute; width:100%; height:100%; text-align: center; left:400%">\r <img style="width:auto; height:auto; max-width: 100%; max-height: 70%; margin:auto; position:relative" src="img/screen_5.png">\r </div>\r <div style="position:absolute; width:100%; height:100%; text-align: center; left:500%">\r <img style="width:auto; height:auto; max-width: 100%; max-height: 70%; margin:auto; position:relative" src="img/screen_6.png">\r </div>\r <div style="position:absolute; width:100%; height:100%; text-align: center; left:600%">\r <img style="width:auto; height:auto; max-width: 100%; max-height: 70%; margin:auto; position:relative" src="img/screen_7.png">\r <div style="position: absolute; bottom:20%; left:0px; right:0px; width:100%;">\r <div id="btn-onboarding-login" class="button" style="width: 66.667%; height: 50px; line-height: 50px; color: #fff; text-transform: uppercase; border-color:#fff; font-size: 13px; font-weight: 300;">Login</div><br><br>\r <div id="btn-onboarding-signup" class="button" style="width: 66.667%; height: 50px; line-height: 50px; color: #fff; text-transform: uppercase; border-color:#fff; font-size: 13px; font-weight: 300;">Signup</div>\r </div>\r </div>\r </div>\r \r </div>\r </main>\r </div>\r \r \r \r '], 
map:[""], if:false, else:false}], "layout/popup/calendar":[{data:['<div id="calendar-manage-wrapper" class="overlay hardware-accelerated">\r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:64px; left:0px; bottom:0px; z-index: 9"></div>\r <header class="navbar" data-role="header" data-position="fixed" data-tap-toggle="false">\r <table>\r <tr>\r \r <td class="td-1" style="width: 80px">\r <div id="calendar-manage-close" style="height:29px; line-height:29px; width:auto; min-width:70px; border-radius:4px; text-align: center; position: relative; padding: 0 ; margin-left: 10px; border:1px solid rgba(0, 0, 0, 0.39); color: rgba(0, 0, 0, 0.39); font-size: 14px; font-weight: 300">\r Cancel\r </div>\r </td>\r <td class="td-3">\r <b id="calendar-manage-title" class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">Select Calendar</b>\r </td>\r <td class="td-5" style="width: 80px">\r <div id="calendar-manage-save" style="height:28px; line-height: 27px; width:auto; min-width:70px; border-radius:4px; display: inline-block; text-align: center; position: relative; padding: 0 ; margin-right: 10px; font-size: 14px; font-weight: 300">\r Done\r </div>\r </td>\r </tr>\r </table>\r </header>\r <main class="viewport" data-use-native-scrolling="true" style="bottom:0px; background-color: #f5f7fa;">\r <div id="calendar-manage-slot" style="margin: 0px 15px;"></div>\r <div id="calendar-manage-content" style="overflow-y: auto; -webkit-overflow-scrolling: touch;"></div>\r <div class="link-to-create-calendar" style="text-align: left; height: 60px; line-height: 60px; color: #d0d1d4; font-weight: 300; font-size: 16px">\r <div class="icon-add-content" style="width:28px; height:28px; background-color: #d0d1d4; border-radius:100%; float:left; margin:15px"></div>\r Create new calendar</div>\r <br>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/confirmation":[{data:['<div id="confirmation-wrapper" class="overlay hardware-accelerated action-wrapper" style="z-index: 100; background-color: rgba(50, 50, 50, 0.5);">\r <div id="confirmation-inner" style="position: absolute; top:25px; bottom:25px; left:25px; right:25px; text-align: center; vertical-align: middle;">\r <table style="width: auto; max-width:90%; height: 100%; border-radius: 4px; table-layout: fixed; margin: auto; position: relative">\r <tr>\r <td>\r <table style="width: 100%; height: auto; border-radius: 4px; table-layout: fixed; margin: auto; position: relative">\r <tr>\r <td style="background-color: #fff; padding: 10px; border-radius: 4px; height: auto; max-height: 80%; position: relative; overflow: hidden">\r <div id="confirmation-content" style="height: auto; max-height: 420px; text-align: center; line-height: 20px; padding-top: 5px; padding-bottom: 0px; margin-bottom: 15px; position: relative; overflow-y: auto; -webkit-overflow-scrolling: touch;"></div>\r <div id="confirmation-yes" style="text-align: center; line-height: 35px; height: 35px; border-radius: 4px; margin: auto; background: linear-gradient(to right bottom, rgb(37, 185, 204), rgb(30, 68, 219)); color: #fff; font-weight: 500; display: inline-block; width: 46%; float:left">Yes</div>\r <div id="confirmation-no" style="text-align: center; line-height: 35px; height: 35px; border-radius: 4px; margin: auto; background: linear-gradient(to right bottom, rgb(37, 185, 204), rgb(30, 68, 219)); color: #fff; font-weight: 500; display: inline-block; width: 46%; float:right">No</div>\r </td>\r </tr>\r </table>\r </td>\r </tr>\r </table>\r </div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/contact":[{data:['\r <div id="contact-manage-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:64px; left:0px; bottom:0px; z-index: 9"></div>\r \r <header class="navbar" data-role="header" data-position="fixed" data-tap-toggle="false">\r <table>\r <tr>\r \r <td class="td-1" style="width: 80px">\r <div id="contact-manage-close" style="height:29px; line-height:29px; width:auto; border-radius:4px; text-align: center; position: relative; padding: 0 ; margin-left: 10px; border:1px solid rgba(0, 0, 0, 0.39); color: rgba(0, 0, 0, 0.39); font-size: 14px; font-weight: 300">\r Cancel\r </div>\r </td>\r <td class="td-3"><b id="contact-manage-title" class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">Invite People</b></td>\r <td class="td-5" style="width: 80px">\r <div id="contact-manage-save" style="height:28px; line-height: 27px; width:auto; min-width:70px; border-radius:4px; display: inline-block; text-align: center; position: relative; padding: 0 ; margin-right: 10px; font-size: 14px; font-weight: 300">\r Done\r </div>\r </td>\r </tr>\r </table>\r </header>\r \r <main class="viewport" data-use-native-scrolling="true" style="bottom:0px; background-color: #f5f7fa; overflow-y: hidden">\r <div style="background-color: #f5f7fa; position: absolute; left:0px; top:0px; right:0px; z-index: 1">\r <div style="margin:15px; background-color: #e3e8ef; height: 49px; line-height: 49px; border-radius: 6px;">\r <input type="text" style="border:0; margin:0; padding:5px 10px 5px 40px; background-color: transparent; width:100%; height: 35px; line-height: 35px; color: #aeb3bc; border-radius:4px; font-weight: 500; font-size: 18px; outline: none; box-sizing: border-box;" placeholder="Search">\r </div>\r <div id="contact-current-content" style="border-bottom:1px solid rgb(228, 231, 242); width:95%; margin-left: 15px;"></div>\r </div>\r <div id="contact-manage-content" style="overflow-y: auto; -webkit-overflow-scrolling: touch; position: absolute; top:79px; left:0px; right:0px; bottom:0px; width:100%;"></div>\r <br>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/group":[{data:['\r <div id="group-wrapper" class="overlay hardware-accelerated"></div>\r \r <div id="group-manage-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:64px; left:0px; bottom:0px; z-index: 9"></div>\r \r <header class="navbar" data-role="header" data-position="fixed" data-tap-toggle="false">\r <table>\r <tr>\r <td class="td-1" style="width: 80px">\r <div id="group-manage-cancel" style="height:29px; line-height:29px; width:auto; min-width:70px; border-radius:4px; text-align: center; position: relative; padding:0 ; margin-left: 10px; border:1px solid rgba(0, 0, 0, 0.39); color: rgba(0, 0, 0, 0.39); font-size: 14px; font-weight: 300">\r Cancel\r </div>\r </td>\r <td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative">New Calendar</b></td>\r <td class="td-5" style="width: 80px">\r <div id="group-manage-save" style="height:28px; line-height: 27px; width:auto; min-width:70px; border-radius:4px; background: #fff; display: inline-block; text-align: center; position: relative; padding: 0 ; border: 1px solid #2067d7; color: #2067d7 ; margin-right: 10px; font-size: 14px; font-weight: 300">\r Create\r </div>\r </td>\r </tr>\r </table>\r </header>\r \r <main class="viewport" data-use-native-scrolling="true" style="bottom:0px;">\r \r <div id="group-manage-content" style="position:relative; width:100%; height:100%; overflow-y: auto; -webkit-overflow-scrolling: touch;"></div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/location":[{data:['\r <div id="location-wrapper" class="overlay hardware-accelerated"></div>\r \r <div id="location-manage-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:64px; left:0px; bottom:0px; z-index: 9"></div>\r \r <header class="navbar" data-role="header" data-position="fixed" data-tap-toggle="false" style="background: #f5f7fa;">\r <div id="location-manage-cancel" style="float:right; height:28px; width:auto; min-width:70px; color: #babdc3; text-align: center; line-height: 27px; position: relative; top:18px; right:10px; padding: 0 ;">\r Cancel\r </div>\r <table style="width: 80%">\r <tr class="slot-content-off">\r <td style="text-align: left; height: 28px; color: #babdc3; font-weight: 300; font-size: 16px; line-height: 28px; padding-left:15px">\r Enter Location\r </td>\r </tr>\r <tr class="slot-content-on" style="display: none">\r <td style="text-align: left; height: 28px; padding-left:15px">\r <div class="icon-remove-content" style="width:19px; height:19px; background-color: #d0d1d4; border-radius:100%; float:right; margin-top:9px"></div>\r <input type="text" style="border:0; margin:0; padding:0; outline:none; width:90%; background-color: #f5f7fa;">\r </td>\r </tr>\r </table>\r </header>\r \r <main class="viewport" data-use-native-scrolling="true" style="bottom:0px; background-color: #f5f7fa;">\r <div style="height:10px"></div>\r <table id="location-place-current" style="table-layout: fixed; width: 95%; margin-left:15px">\r <tr style=" border-bottom:1px solid rgb(228, 231, 242)">\r <td style="padding: 15px 0; text-align: center; width:45px;">\r <img src="img/1/icon-current-location.png" srcset="img/2/icon-current-location.png 2x, img/3/icon-current-location.png 3x">\r </td>\r <td style="padding: 15px 0; text-align: left">\r Current Location\r </td>\r </tr>\r </table>\r <div id="location-current-content"></div>\r <div id="location-manage-content" style="overflow-y: auto; -webkit-overflow-scrolling: touch;"></div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/media":[{data:['\r <div id="media-wrapper" class="overlay hardware-accelerated" style="background-color: #000; overflow-x:auto; ">\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:0px; left:0px; bottom:0px; z-index: 9"></div>\r <div style="position: absolute; z-index: 1; left:10px; top:10px; width: 32px; height:32px; background: none; filter: invert(1);">\r <img class="media-view-close" src="img/1/icon-close.png" srcset="img/2/icon-close.png 2x, img/3/icon-close.png 3x">\r </div>\r <div id="media-scrollpane" style="position:absolute; width:100%; height:100%; white-space: nowrap; overflow-x: auto; text-align: center; top:0px; bottom:0px; left:0px; right:0px;" data-use-native-scrolling="true">\r <div id="media-content" style="position:absolute; width:100%; height:100%; white-space: nowrap; overflow: hidden; text-align: center; top:0px; bottom:0px; left:0px; right:0px;" data-use-native-scrolling="true"></div>\r </div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/message":[{data:['<div id="message-wrapper" class="overlay hardware-accelerated action-wrapper" style="z-index: 100; background-color: rgba(50, 50, 50, 0.5);">\r <div id="message-inner" style="position: absolute; top:25px; bottom:25px; left:25px; right:25px; text-align: center; vertical-align: middle;">\r <table style="width: auto; max-width:90%; height: 100%; border-radius: 4px; table-layout: fixed; margin: auto; position: relative">\r <tr>\r <td>\r <table style="width: 100%; height: auto; border-radius: 4px; table-layout: fixed; margin: auto; position: relative">\r <tr>\r <td style="background-color: #fff; padding: 10px; border-radius: 4px; height: auto; max-height: 80%; position: relative; overflow: hidden">\r <div id="message-content" style="height: auto; max-height: 420px; text-align: center; line-height: 20px; padding-top: 5px; padding-bottom: 0px; margin-bottom: 10px; position: relative; overflow-y: auto; -webkit-overflow-scrolling: touch;"></div>\r <div id="message-close" style="text-align: center; line-height: 35px; height: 35px; border-radius: 4px; margin: auto; background: linear-gradient(to right bottom, rgb(37, 185, 204), rgb(30, 68, 219)); color: #fff; font-weight: 500">OK</div>\r </td>\r </tr>\r </table>\r </td>\r </tr>\r </table>\r </div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/overlay":[{data:['\r <div id="overlay-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:64px; left:0px; bottom:0px; z-index: 9"></div>\r \r <header class="navbar" data-role="header" data-position="fixed" data-tap-toggle="false" style="border:0; box-shadow:none">\r <table>\r <tr>\r <td class="td-1">\r <a id="overlay-close" class="btn-navbar-icon btn-navbar-icon-close" style="margin-left: 15px; width: 24px; height: 24px"></a>\r </td>\r <td class="td-2"></td>\r <td class="td-3" style="">\r <div id="title-calendar-user-slots">\r <table style="width: auto; margin: 0 auto; position: relative;">\r <tr>\r <td style="width: 32px">\r <img id="content-activity-current-user-image" class="slot-card-user-layer user-image-small" src="" style="width: 24px; height:24px; border-radius: 100%; padding: 0; margin:-1px 0px 0px 0px; float:none">\r </td>\r <td>\r <b class="navbar-title" style="display: block; height: 24px;"><span class="i18n i18n-my-slots" style="vertical-align: middle; line-height: 16px; display: inline-block;"></span></b>\r </td>\r </tr>\r </table>\r </div>\r </td>\r <td class="td-4"></td>\r <td class="td-5">\r <div class="link-to-follow-group" style="float:right; height:28px; width:auto; border-radius:4px; text-align: center; line-height: 27px; position: relative; right:10px; padding: 1px 8px 0 8px;">\r Follow\r </div>\r </td>\r </tr>\r </table>\r \r </header>\r \r <div id="overlay-content" style="position:relative; width:100%; height:100%;"></div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/slot":[{data:['\r <div id="slot-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:48px; left:0px; bottom:0px; z-index: 9"></div>\r \r \r \r <main data-use-native-scrolling="true" style="position: absolute; left:0px; right:0px; width:100%; height:100%; bottom:0px; top:0px;">\r \r <div id="slot-content" style="position:relative; width:100%; height:100%; overflow-y: auto; -webkit-overflow-scrolling: touch;"></div>\r </main>\r </div>\r \r <div id="slot-manage-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:48px; left:0px; bottom:0px; z-index: 9"></div>\r \r <header class="navbar status-bar" data-role="header" data-position="fixed" data-tap-toggle="false">\r <table>\r <tr>\r <td class="td-1" style="width: 80px">\r <div id="slot-manage-cancel" style="height:29px; line-height:29px; width:auto; min-width:70px; border-radius:4px; text-align: center; position: relative; padding: 0 ; margin-left: 10px; border:1px solid rgba(0, 0, 0, 0.39); color: rgba(0, 0, 0, 0.39); font-size: 14px; font-weight: 300">\r Cancel\r </div>\r </td>\r <td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">New Slot</b></td>\r <td class="td-5" style="width: 80px">\r <div id="slot-manage-save" style="height:28px; line-height: 27px; width:auto; min-width:70px; border-radius:4px; border: 1px solid #2067d7; background: #fff ; display: inline-block; text-align: center; position: relative; padding: 0 ; color: #2067d7; margin-right: 10px; font-size: 14px; font-weight: 300">\r &nbsp;Create&nbsp;\r </div>\r </td>\r </tr>\r </table>\r </header>\r \r <main class="viewport status-bar" data-use-native-scrolling="true" style="bottom:0px;">\r \r <div id="slot-manage-content" style="position:relative; width:100%; height:100%; overflow-y: auto; -webkit-overflow-scrolling: touch;"></div>\r </main>\r </div>\r \r <div id="slot-manage-success">\r <div style="display: inline-block; padding:15px 25px; margin:0 auto; font-size: 22px; font-weight: 300; line-height: 22px; color:#fff; background-color: #151a29; border-radius: 100px; position: relative">\r <div class="icon-arrow-big"></div>&ensp;Saved&ensp;\r </div>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/social":[{data:['\r <div id="social-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:64px; left:0px; bottom:0px; z-index: 9"></div>\r \r <header class="navbar" data-role="header" data-position="fixed" data-tap-toggle="false" style="background: none;">\r <table>\r <tr>\r <td class="td-1"><div id="social-view-close" class="btn-navbar-icon btn-navbar-icon-close" style="-webkit-filter: invert(0.2)"></div></td>\r <td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; color: #555">Comments</b></td>\r <td class="td-5"><div class="btn-navbar-icon link-to-like-slot icon-like" style="padding-left: 0px;"></div></td>\r </tr>\r </table>\r </header>\r \r <main class="viewport" data-use-native-scrolling="true" style="bottom:0px; background-color: #fff">\r \r <div id="social-content" style="position:relative; width:100%; height:100%;"></div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/popup/user":[{data:['\r <div id="user-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:64px; left:0px; bottom:0px; z-index: 9"></div>\r \r <header class="navbar" data-role="header" data-position="fixed" data-tap-toggle="false">\r <table>\r <tr>\r <td class="">\r \r <div class="btn-navbar-icon btn-navbar-icon-close user-view-close" style="float:left; display:inline-block; margin-left: 15px; margin-top: 2px; width: 24px; height: 24px"></div>\r \r \r <div class="link-to-follow-user" style="float:right; width: 76px; text-align: right; position: relative; right:10px;">\r <div style="height:28px; width:46px; border-radius:4px; background: linear-gradient(to right bottom,#25b9cc,#1e44db); text-align: center; line-height: 27px; margin-right: 0px; display: inline-block; padding: 1px 0px 0 0px; ">\r <img src="img/1/icon-add-user-plus.png" srcset="img/2/icon-add-user-plus.png 2x, img/3/icon-add-user-plus.png 3x" style="height: 10px">&nbsp;\r <img src="img/1/icon-add-user-human.png" srcset="img/2/icon-add-user-human.png 2x, img/3/icon-add-user-human.png 3x" style="height: 13px">\r </div>\r <div style="height:28px; width:46px; border-radius:4px; background: #fff;   text-align: center; line-height: 27px; margin-right: 0px; position: relative; display: none; padding: 1px 0px 0 0px;">\r <img src="img/1/icon-delete-user.png" srcset="img/2/icon-delete-user.png 2x, img/3/icon-delete-user.png 3x" style="width: 10px">&nbsp;\r <img src="img/1/icon-add-user-human-soft.png" srcset="img/2/icon-add-user-human-soft.png 2x, img/3/icon-add-user-human-soft.png 3x" style="height: 13px">\r </div>\r </div>\r </td>\r </tr>\r </table>\r </header>\r \r <main class="viewport" data-use-native-scrolling="true" style="bottom:0px">\r \r <div id="user-content"></div>\r \r <div style="height: 48px"></div>\r </main>\r </div>\r \r <div id="user-manage-wrapper" class="overlay hardware-accelerated">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <div class="drag-layer" style="width:15px; height:100%; position: absolute; top:64px; left:0px; bottom:0px; z-index: 9"></div>\r \r <header class="navbar" data-role="header" data-position="fixed" data-tap-toggle="false">\r <table>\r <tr>\r <td class="">\r \r <div class="icon-arrow-close user-view-close" style="float:left; display:inline-block; width:48px; height:32px;"></div>\r \r \r <div style="float:right; height:28px; width:auto; min-width:70px; border-radius:4px; background: #fff; color: rgb(32, 103, 215) ; text-align: center; line-height: 27px; position: relative; top:0px; right:10px; padding: 1px 8px 0 8px;">Follow</div>\r </td>\r </tr>\r </table>\r </header>\r \r <main class="viewport" data-use-native-scrolling="true" style="bottom:0px">\r \r <div id="user-manage-content" style="overflow-y: auto; -webkit-overflow-scrolling: touch;"></div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/setting/about":[{data:['<div id="content-about-layer" class="viewport status-bar hardware-accelerated slider-right" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">\r \r <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">\r \r <div id="content-about" style="position:relative; width:100%; height:auto; margin:0">\r <br>\r <table style="width: 100%; table-layout: fixed; background-color: #fff; border-top: 1px solid #e5e5e9; border-bottom: 1px solid #e5e5e9;">\r <tr id="settings-policy" style="height:50px; width:100%; ">\r <td style="width: 15px"></td>\r <td style="width: 99%; padding:0px 10px 0px 0px; border-bottom: 1px solid #eeedef">Privacy Policy</td>\r <td style="width: 20px; padding-right: 15px; border-bottom: 1px solid #eeedef">\r <div class="icon-arrow" style="width:20px; height:22px;"></div>\r </td>\r </tr>\r <tr id="settings-terms" style="height:50px; width:100%; ">\r <td style="width: 15px"></td>\r <td style="width: 99%; padding:0px 10px 0px 0px;">Terms Of Service</td>\r <td style="width: 20px; padding-right: 15px;">\r <div class="icon-arrow" style="width:20px; height:22px;"></div>\r </td>\r </tr>\r </table>\r \r <br>\r \r <table style="width: 100%; table-layout: fixed; background-color: #fff; border-top: 1px solid #e5e5e9; border-bottom: 1px solid #e5e5e9;">\r <tr id="settings-changelog" style="height:50px; width:100%; ">\r <td style="width: 15px"></td>\r <td style="width: 99%; padding:0px 10px 0px 0px;">Changelog</td>\r <td style="width: 20px; padding-right: 15px;">\r <div class="icon-arrow" style="width:20px; height:22px;"></div>\r </td>\r </tr>\r </table>\r \r <br>\r \r <table style="width: 100%; table-layout: fixed; background-color: #fff; border-top: 1px solid #e5e5e9; border-bottom: 1px solid #e5e5e9;">\r <tr id="settings-feedback" style="height:50px; width:100%; ">\r <td style="width: 15px"></td>\r <td style="width: 99%; padding:0px 10px 0px 0px;"><a href="mailto:feedback@timeslot.com" target="_blank" style="color:#222; text-decoration:none; font-weight: normal">Send Us Feedback</a></td>\r </tr>\r </table>\r </div>\r \r <div style="height: 48px"></div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/setting/changelog":[{data:['<div id="content-changelog-layer" class="viewport status-bar hardware-accelerated slider-right" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">\r \r <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">\r \r <div id="content-changelog" style="position:relative; width:100%; height:auto; margin:0; line-height: 20px"></div>\r \r <div style="height: 48px"></div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/setting/policy":[{data:['<div id="content-policy-layer" class="viewport status-bar hardware-accelerated slider-right" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">\r \r <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">\r \r <div id="content-policy" style="position:relative; width:100%; height:auto; margin:0; line-height: 20px">\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r \r Timeslot Inc. ("us", "we", or "our") operates the Timeslot mobile application (the "Service").\r This page informs you of our policies regarding the collection, use and disclosure of Personal\r Information when you use our Service.\r <br><br>\r We will not use or share your information with anyone except as described in this Privacy Policy.\r We use your Personal Information for providing and improving the Service. By using the Service, you\r agree to the collection and use of information in accordance with this policy. Unless otherwise defined\r in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and\r Conditions.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Information Collection And Use</h5>\r While using our Service, we may ask you to provide us with certain personally identifiable information\r that can be used to contact or identify you. Personally identifiable information may include, but is not\r limited to, your email address, name ("Personal Information").\r <br><br>\r We collect this information for the purpose of providing the Service, identifying and communicating with\r you, responding to your requests/inquiries, servicing your purchase orders, and improving our services.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Log Data</h5>\r When you access the Service by or through a mobile device, we may collect certain information\r automatically, including, but not limited to, the type of mobile device you use, your mobile device\r unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile\r Internet browser you use and other statistics ("Log Data").\r <br><br>\r In addition, we may use third party services such as Google Analytics that collect, monitor and analyze\r this type of information in order to increase our Service\'s functionality. These third party service\r providers have their own privacy policies addressing how they use such information.\r Please see the section regarding Location Information below regarding the use of your location\r information and your options.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Location Information</h5>\r We may use and store information about your location depending on the permissions you have set on\r your device. We use this information to provide features of our Service, to improve and customize our\r Service. You can enable or disable location services when you use our Service at anytime, through your\r mobile device settings.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Cookies</h5>\r Cookies are files with a small amount of data, which may include an anonymous unique identifier.\r Cookies are sent to your browser from a web site and transferred to your device. We use cookies to\r collect information in order to improve our services for you.\r <br><br>\r You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. The Help\r feature on most browsers provide information on how to accept cookies, disable cookies or to notify\r you when receiving a new cookie.\r <br><br>\r If you do not accept cookies, you may not be able to use some features of our Service and we\r recommend that you leave them turned on.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Do Not Track Disclosure</h5>\r We do not support Do Not Track ("DNT"). Do Not Track is a preference you can set in your web browser\r to inform websites that you do not want to be tracked.\r You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web\r browser.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Service Providers</h5>\r We may employ third party companies and individuals to facilitate our Service, to provide the Service on\r our behalf, to perform Service-related services and/or to assist us in analyzing how our Service is used.\r These third parties have access to your Personal Information only to perform specific tasks on our behalf\r and are obligated not to disclose or use your information for any other purpose.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Communications</h5>\r We may use your Personal Information to contact you with newsletters, marketing or promotional\r materials and other information that may be of interest to you. You may opt out of receiving any, or all,\r of these communications from us by following the unsubscribe link or instructions provided in any email\r we send or by contacting us.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Business Transaction</h5>\r If Timeslot Inc. is involved in a merger, acquisition or asset sale, your Personal Information may be\r transferred as a business asset. In such cases, we will provide notice before your Personal Information is\r transferred and/or becomes subject to a different Privacy Policy.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Security</h5>\r The security of your Personal Information is important to us, and we strive to implement and maintain\r reasonable, commercially acceptable security procedures and practices appropriate to the nature of the\r information we store, in order to protect it from unauthorized access, destruction, use, modification, or\r disclosure.\r <br><br>\r However, please be aware that no method of transmission over the internet, or method of electronic\r storage is 100% secure and we are unable to guarantee the absolute security of the Personal\r Information we have collected from you.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>International Transfer</h5>\r Your information, including Personal Information, may be transferred to \u2014 and maintained on \u2014\r computers located outside of your state, province, country or other governmental jurisdiction where the\r data protection laws may differ than those from your jurisdiction.\r <br><br>\r If you are located outside United States and choose to provide information to us, please note that we\r transfer the information, including Personal Information, to United States and process it there.\r Your consent to this Privacy Policy followed by your submission of such information represents your\r agreement to that transfer.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Links To Other Sites</h5>\r Our Service may contain links to other sites that are not operated by us. If you click on a third party link,\r you will be directed to that third party\'s site. We strongly advise you to review the Privacy Policy of\r every site you visit.\r <br><br>\r We have no control over, and assume no responsibility for the content, privacy policies or practices of\r any third party sites or services.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Children\'s Privacy</h5>\r Only persons age 18 or older have permission to access our Service. Our Service does not address\r anyone under the age of 13 ("Children").\r <br><br>\r We do not knowingly collect personally identifiable information from children under 13. If you are a\r parent or guardian and you learn that your Children have provided us with Personal Information, please\r contact us. If we become aware that we have collected Personal Information from a children under age\r 13 without verification of parental consent, we take steps to remove that information from our servers.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Changes To This Privacy Policy</h5>\r This Privacy Policy is effective as of April 20, 2016 and will remain in effect except with respect to any\r changes in its provisions in the future, which will be in effect immediately after being posted on this\r page.\r <br><br>\r We reserve the right to update or change our Privacy Policy at any time and you should check this\r Privacy Policy periodically. Your continued use of the Service after we post any modifications to the\r Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent\r to abide and be bound by the modified Privacy Policy.\r <br><br>\r If we make any material changes to this Privacy Policy, we will notify you either through the email\r address you have provided us, or by placing a prominent notice on our website.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Contact Us</h5>\r If you have any questions about this Privacy Policy, please contact us.\r <br><br>\r <div style="display: inline-block; float: left; margin:-2px 15px 12px 0; padding: 12px 15px 7px 15px; border-radius: 4px; background: #2067d7; background: linear-gradient(to right,#25b9cc,#1e44db);">\r <img src="img/logo.png" srcset="img/logo.png 2x, img/logo.png 3x" style="width: 28px">\r </div>\r <b style="font-weight:300;">Copyright \u00a9 2015 TIMESLOT Inc.</b>\r <br>\r <b style="font-weight:300;">101 Montgomery Street, Suite 2050, San Francisco CA 94111, USA</b>\r </div>\r <div style="font-size: 11px; color: #999; padding: 0 16px 16px 16px; text-align: center; font-weight: 300">Last updated: April 20, 2016</div>\r </div>\r \r <div style="height: 48px"></div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/setting/terms":[{data:['<div id="content-terms-layer" class="viewport status-bar hardware-accelerated slider-right" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">\r \r <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">\r \r <div id="content-terms" style="position:relative; width:100%; height:auto; margin:0; line-height: 20px">\r \r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Timeslot\r mobile application (the "Service") operated by Timeslot Inc. ("us", "we", or "our").\r <br><br>\r Your access to and use of the Service is conditioned upon your acceptance of and compliance with these\r Terms. These Terms apply to all visitors, users and others who wish to access or use the Service.\r By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of\r the terms then you do not have permission to access the Service.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Communications</h5>\r By creating an Account on our service, you agree to subscribe to newsletters, marketing or promotional\r materials and other information we may send. However, you may opt out of receiving any, or all, of\r these communications from us by following the unsubscribe link or instructions provided in any email\r we send.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Purchases</h5>\r If you wish to purchase any product or service made available through the Service ("Purchase"), you may\r be asked to supply certain information relevant to your Purchase including, without limitation, your\r credit card number, the expiration date of your credit card, your billing address, and your shipping\r information.\r <br><br>\r You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment\r method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct\r and complete.\r <br><br>\r The service may employ the use of third party services for the purpose of facilitating payment and the\r completion of Purchases. By submitting your information, you grant us the right to provide the\r information to these third parties subject to our Privacy Policy.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Contests, Sweepstakes and Promotions</h5>\r Any contests, sweepstakes or other promotions (collectively, "Promotions") made available through the\r Service may be governed by rules that are separate from these Terms & Conditions. If you participate in\r any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a\r Promotion conflict with these Terms of Service, the Promotion rules will apply.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Content</h5>\r Our Service allows you to post, link, store, share and otherwise make available certain information, text,\r graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or\r through the Service, including its legality, reliability, and appropriateness.\r <br><br>\r By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours\r (you own it) and/or you have the right to use it and the right to grant us the rights and license as\r provided in these Terms, and (ii) that the posting of your Content on or through the Service does not\r violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or\r entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.\r You retain any and all of your rights to any Content you submit, post or display on or through the Service\r and you are responsible for protecting those rights. We take no responsibility and assume no liability for\r Content you or any third party posts on or through the Service. However, by posting Content using the\r Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce,\r and distribute such Content on and through the Service.\r <br><br>\r Timeslot Inc. has the right but not the obligation to monitor and edit all Content provided by users.\r In addition, Content found on or through this Service are the property of Timeslot Inc. or used with\r permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said\r Content, whether in whole or in part, for commercial purposes or for personal gain, without express\r advance written permission from us.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Accounts</h5>\r When you create an account with us, you guarantee that you are above the age of 18, and that the\r information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or\r obsolete information may result in the immediate termination of your account on the Service.\r You are responsible for maintaining the confidentiality of your account and password, including but not\r limited to the restriction of access to your computer and/or account. You agree to accept responsibility\r for any and all activities or actions that occur under your account and/or password, whether your\r password is with our Service or a third-party service. You must notify us immediately upon becoming\r aware of any breach of security or unauthorized use of your account.\r <br><br>\r You may not use as a username the name of another person or entity or that is not lawfully available for\r use, a name or trademark that is subject to any rights of another person or entity other than you,\r without appropriate authorization. You may not use as a username any name that is offensive, vulgar or\r obscene.\r <br><br>\r We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in\r our sole discretion.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Intellectual Property</h5>\r The Service and its original content (excluding Content provided by users), features and functionality are\r and will remain the exclusive property of Timeslot Inc. and its licensors. The Service is protected by\r copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks\r and trade dress may not be used in connection with any product or service without the prior written\r consent of Timeslot Inc..\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Links To Other Web Sites</h5>\r Our Service may contain links to third party web sites or services that are not owned or controlled by\r Timeslot Inc..\r <br><br>\r Timeslot Inc. has no control over, and assumes no responsibility for the content, privacy policies, or\r practices of any third party web sites or services. We do not warrant the offerings of any of these\r entities/individuals or their websites.\r <br><br>\r You acknowledge and agree that Timeslot Inc. shall not be responsible or liable, directly or indirectly, for\r any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any\r such content, goods or services available on or through any such third party web sites or services.\r We strongly advise you to read the terms and conditions and privacy policies of any third party web sites\r or services that you visit.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Termination</h5>\r We may terminate or suspend your account and bar access to the Service immediately, without prior\r notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including\r but not limited to a breach of the Terms.\r <br><br>\r If you wish to terminate your account, you may simply discontinue using the Service.\r All provisions of the Terms which by their nature should survive termination shall survive termination,\r including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of\r liability.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Governing Law</h5>\r These Terms shall be governed and construed in accordance with the laws of California, United States,\r without regard to its conflict of law provisions.\r <br><br>\r Our failure to enforce any right or provision of these Terms will not be considered a waiver of those\r rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining\r provisions of these Terms will remain in effect. These Terms constitute the entire agreement between\r us regarding our Service, and supersede and replace any prior agreements we might have had between\r us regarding the Service.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Changes</h5>\r We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is\r material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a\r material change will be determined at our sole discretion.\r <br><br>\r By continuing to access or use our Service after any revisions become effective, you agree to be bound\r by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the\r Service.\r </div>\r <div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300;">\r <h5>Contact Us</h5>\r If you have any questions about these Terms, please contact us.\r <br><br>\r <div style="display: inline-block; float: left; margin:-2px 15px 12px 0; padding: 12px 15px 7px 15px; border-radius: 4px; background: #2067d7; background: linear-gradient(to right,#25b9cc,#1e44db);">\r <img src="img/logo.png" srcset="img/logo.png 2x, img/logo.png 3x" style="width: 28px">\r </div>\r <b style="font-weight:300;">Copyright \u00a9 2015 TIMESLOT Inc.</b>\r <br>\r <b style="font-weight:300;">101 Montgomery Street, Suite 2050, San Francisco CA 94111, USA</b>\r </div>\r <div style="font-size: 11px; color: #999; padding: 0 16px 16px 16px; text-align: center; font-weight: 300">Last updated: April 20, 2016</div>\r </div>\r \r <div style="height: 48px"></div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/setting/theme":[{data:['<div id="content-theme-layer" class="viewport status-bar hardware-accelerated slider-right" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">\r \r <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">\r \r <div id="content-theme" style="position:relative; width:100%; height:auto; margin:0">\r <br>\r <div id="settings-dark1" style="width:100%; background-color: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">\r <div style="float:right; padding:7px 15px 7px 15px" class="toggle-wrapper-dark1">\r <input class="toggle toggle-dark" id="check_dark1" type="checkbox">\r <label class="toggle-btn" for="check_dark1"></label>\r </div>\r <div style="padding:10px 10px 10px 15px;">Dark Theme</div>\r </div>\r \r <br>\r <div style="height: 20px; padding-left:15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 11px">Colors</div>\r <div id="settings-dark2" style="width:100%; background-color: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">\r <div style="float:right; padding:7px 15px 7px 15px" class="toggle-wrapper-color1">\r <input class="toggle toggle-color" id="check_dark2" type="checkbox">\r <label class="toggle-btn" for="check_dark2"></label>\r </div>\r <div style="padding:10px 10px 10px 15px;">Purple</div>\r </div>\r <div style="height:5px;"></div>\r <div id="settings-dark3" style="width:100%; background-color: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">\r <div style="float:right; padding:7px 15px 7px 15px" class="toggle-wrapper-color2">\r <input class="toggle toggle-color" id="check_dark3" type="checkbox">\r <label class="toggle-btn" for="check_dark3"></label>\r </div>\r <div style="padding:10px 10px 10px 15px;">Orange</div>\r </div>\r <div style="height:5px;"></div>\r <div id="settings-dark4" style="width:100%; background-color: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">\r <div style="float:right; padding:7px 15px 7px 15px" class="toggle-wrapper-color3">\r <input class="toggle toggle-color" id="check_dark4" type="checkbox">\r <label class="toggle-btn" for="check_dark4"></label>\r </div>\r <div style="padding:10px 10px 10px 15px;">Green</div>\r </div>\r </div>\r \r <div style="height: 48px"></div>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/settings":[{data:['\r <div id="view-settings" class="overlay">\r \r <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>\r \r <header class="navbar status-bar" data-role="header" data-position="fixed" data-tap-toggle="false">\r \r <div id="nav-activities">\r <table>\r <tr>\r <td class="td-1"><div id="activities-view-close" class="btn-navbar-icon btn-navbar-icon-close"></div></td>\r <td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">My Activities</b></td>\r <td class="td-5"></td>\r </tr>\r </table>\r </div>\r </header>\r \r <div id="content-activities-layer" class="viewport status-bar hardware-accelerated" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">\r \r <div class="pull-to-refresh" style="position: relative; margin-top:-51px; top:-8px"></div>\r \r <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">\r \r <div id="content-activities" class="content-wrapper" style=""></div>\r \r <div style="height: 48px"></div>\r </main>\r </div>\r </div>\r <div id="touch_pointer" style="display:none; position:absolute; background-color: rgba(255, 0, 0, 0.5); border:1px solid #000; width:19px; height:19px; border-radius:100%; z-index: 99999999"></div>\r '], 
map:[""], if:false, else:false}], "layout/settings_":[{data:[' <div id="view-settings" class="view slider-left">  <div class="scroll-to-top" style="height:10px; width:100%; position: absolute; top:0px; left:0px; right:0px; z-index: 9"></div>  <header class="navbar status-bar" data-role="header" data-position="fixed" data-tap-toggle="false">  <div id="nav-settings"><table><tr><td class="td-1"></td><td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">Settings</b></td><td class="td-5"></td></tr></table></div>  <div id="nav-request" style="display: none"><table><tr><td class="td-1"><div id="request-view-close" class="btn-navbar-icon btn-navbar-icon-back"></div></td><td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">Requests</b></td><td class="td-5"></td></tr></table></div>  <div id="nav-theme" style="display: none"><table><tr><td class="td-1"><div id="theme-view-close" class="btn-navbar-icon btn-navbar-icon-back"></div></td><td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">Choose Theme</b></td><td class="td-5"></td></tr></table></div>  <div id="nav-about" style="display: none"><table><tr><td class="td-1"><div id="about-view-close" class="btn-navbar-icon btn-navbar-icon-back"></div></td><td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">About and Feedback</b></td><td class="td-5"></td></tr></table></div>  <div id="nav-policy" style="display: none"><table><tr><td class="td-1"><div id="policy-view-close" class="btn-navbar-icon btn-navbar-icon-back"></div></td><td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">Privacy Policy</b></td><td class="td-5"></td></tr></table></div>  <div id="nav-terms" style="display: none"><table><tr><td class="td-1"><div id="terms-view-close" class="btn-navbar-icon btn-navbar-icon-back"></div></td><td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">Terms Of Service</b></td><td class="td-5"></td></tr></table></div>  <div id="nav-changelog" style="display: none"><table><tr><td class="td-1"><div id="changelog-view-close" class="btn-navbar-icon btn-navbar-icon-back"></div></td><td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">Changelog</b></td><td class="td-5"></td></tr></table></div>    <div id="nav-activities" style="display: none"><table><tr><td class="td-1"><div id="activities-view-close" class="btn-navbar-icon btn-navbar-icon-back"></div></td><td class="td-3"><b class="navbar-title" style="font-weight: 400; font-size: 16px; position: relative;">My Activities</b></td><td class="td-5"></td></tr></table></div></header>  <div id="content-settings-layer" class="viewport status-bar hardware-accelerated slider-left" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">  <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; background-color: #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">  <div id="content-settings" style="position:relative; width:100%; height:auto; margin:0; color: #222"><table style="width: 100%; table-layout: fixed; height:150px; margin: 25px 0 20px 0"><tr><td style="width: 32%"></td><td style="width: 36%; max-width: 36%; position: relative"><div style="width: 135px; height:142px; text-align: center; vertical-align: middle; position: relative"><img class="user-image-small" src="" style="width: 135px; height: 135px; border-radius:100%; object-fit: cover; object-position: center;"><label for="settings-user-image-input" style="margin: 0"><img id="settings-user-image" src="img/1/icon-edit-photo.png" srcset="img/2/icon-edit-photo.png 2x, img/3/icon-edit-photo.png 3x" style="position: absolute; right:0px; bottom:0px; width:22px"><form id="settings-user-image-form" enctype="multipart/form-data" style="display:none"><input id="settings-user-image-input" class="file" type="file" name="file"></form></label></div></td><td style="width: 32%"></td></tr></table><div style="display: none"><div style="height: 20px; padding-left:15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 11px">PROFILE</div><table class="view-user" style="width:100%; background-color: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;"><tr><td style="padding:10px 5px 0 15px; width: 64px">  </td><td style="padding:0 10px 0 5px">  </td></tr><tr><td style="padding:5px 10px 10px 15px" colspan="2"><div style="height:1px; width:100%; border-top: 1px solid #ddd; padding-bottom:10px"></div> Change profile image </td></tr></table><br></div>       <div style="height:5px;"></div>  <table style="width: 100%; table-layout: fixed; background-color: #fff; border-top: 1px solid #e5e5e9; border-bottom: 1px solid #e5e5e9;"><tr id="settings-profile" style="height:50px; width:100%; "><td style="padding-left: 15px; width: 40px"><div style="background-color: #2175d5; border-radius:4px; width: 29px; height:29px; line-height: 29px; text-align: center; vertical-align: middle"><img src="img/1/icon-profile.png" srcset="img/2/icon-profile.png 2x, img/3/icon-profile.png 3x" style="height: 16px; margin: 6px auto 0 auto; display: inline"></div></td><td style="width: 99%; padding:0px 10px 0px 5px; border-bottom: 1px solid #eeedef">Profile</td><td style="width: 20px; padding-right: 15px; border-bottom: 1px solid #eeedef"><div class="icon-arrow" style="width:20px; height:22px;"></div></td></tr>  </table>   <div style="height:5px;"></div>  <table style="width: 100%; table-layout: fixed; background-color: #fff; border-top: 1px solid #e5e5e9; border-bottom: 1px solid #e5e5e9;"><tr id="settings-activities" style="height:50px; width:100%; background-color: #fff;"><td style="padding-left: 15px; width: 40px"><div style="background-color: #d4156f; border-radius:4px; width: 29px; height:29px; line-height: 29px; text-align: center; vertical-align: middle"><img src="img/1/icon-my-activity.png" srcset="img/2/icon-my-activity.png 2x, img/3/icon-my-activity.png 3x" style="height: 14px; margin: 7px auto 0 auto; display: inline"></div></td><td style="width: 99%; padding:0px 10px 0px 5px;">My Activities</td><td style="width: 20px; padding-right: 15px;"><div class="icon-arrow" style="width:20px; height:22px;"></div></td></tr></table>                <div style="height:5px;"></div>  <table style="width: 100%; table-layout: fixed; background-color: #fff; border-top: 1px solid #e5e5e9; border-bottom: 1px solid #e5e5e9;">  <tr id="settings-about" style="height:50px; width:100%; background-color: #fff;"><td style="padding-left: 15px; width: 40px"><div style="background-color: #f8621f; border-radius:4px; width: 29px; height:29px; line-height: 29px; text-align: center; vertical-align: middle"><img src="img/1/icon-about.png" srcset="img/2/icon-about.png 2x, img/3/icon-about.png 3x" style="height: 15px; margin: 6px auto 0 auto; display: inline"></div></td><td style="width: 99%; padding:0px 10px 0px 5px;">About and Feedback</td><td style="width: 20px; padding-right: 15px;"><div class="icon-arrow" style="width:20px; height:22px;"></div></td></tr></table>   <div style="height:5px;"></div>  <table style="width: 100%; table-layout: fixed; background-color: #fff; border-top: 1px solid #e5e5e9; border-bottom: 1px solid #e5e5e9;"><tr id="settings-logout" style="height:50px; width:100%; background-color: #fff;"><td style="padding-left: 15px; width: 40px"><div style="background-color: #656d7a; border-radius:4px; width: 29px; height:29px; line-height: 29px; text-align: center; vertical-align: middle"><img src="img/1/icon-logout.png" srcset="img/2/icon-logout.png 2x, img/3/icon-logout.png 3x" style="height: 20px; margin: 4px auto 0 auto; display: inline"></div></td><td colspan="2" style="width: 99%; padding:0px 10px 0px 5px;">Logout</td></tr></table>           <br>       <div id="settings-debug" style="width:100%; background-color: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;"><div style="float:right; padding:7px 15px 7px 15px" class="toggle-wrapper"><input class="toggle toggle-light" id="check_debug" type="checkbox"><label class="toggle-btn" for="check_debug"></label></div><div style="padding:10px 10px 10px 15px;">Show Debug Info</div></div>  <div style="height:5px;"></div>  <div id="settings-fps" style="width:100%; background-color: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;"><div style="float:right; padding:7px 15px 7px 15px" class="toggle-wrapper"><input class="toggle toggle-light" id="check_fps" type="checkbox"><label class="toggle-btn" for="check_fps"></label></div><div style="padding:10px 10px 10px 15px;">Show Statistics</div></div>  <div style="height:5px;"></div>  <div id="settings-touches" style="width:100%; background-color: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;"><div style="float:right; padding:7px 15px 7px 15px" class="toggle-wrapper"><input class="toggle toggle-light" id="check_touches" type="checkbox"><label class="toggle-btn" for="check_touches"></label></div><div style="padding:10px 10px 10px 15px;">Show Touches</div></div>  <div style="height:5px;"></div>  <div id="settings-clear-storage" style="width:100%; background-color: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee;"><div style="padding:10px 10px 10px 15px;">Restart App & Reload Data</div></div>  <br></div>  <div style="height: 48px"></div><div class="layout-spacer"></div></main></div>  <div id="content-request-layer" class="viewport status-bar hardware-accelerated slider-right" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">  <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">  <div id="content-request" style="position:relative; width:100%; height:auto; margin:0"></div>  <div style="height: 48px"></div></main></div>  <div id="content-activities-layer" class="viewport status-bar hardware-accelerated slider-right" data-position="fixed" data-tap-toggle="false" style="overflow-y:hidden;">  <div class="pull-to-refresh" style="position: relative; margin-top:-51px; top:-8px"></div>  <main data-use-native-scrolling="true" style="position:absolute; left:0px; right:0px; top:0px; bottom:0px; background-color:  #efeff4 ; overflow-x: hidden; -webkit-overflow-scrolling: touch;">  <div id="content-activities" class="content-wrapper" style=""></div>  <div style="height: 48px"></div></main></div>  '], 
map:[0]}, {include:"layout/setting/theme"}, {data:["  "], map:[0]}, {include:"layout/setting/about"}, {data:["  "], map:[0]}, {include:"layout/setting/policy"}, {data:["  "], map:[0]}, {include:"layout/setting/terms"}, {data:["  "], map:[0]}, {include:"layout/setting/changelog"}, {data:['</div><div id="touch_pointer" style="display:none; position:absolute; background-color: rgba(255, 0, 0, 0.5); border:1px solid #000; width:19px; height:19px; border-radius:100%; z-index: 99999999"></div> '], map:[0], 
if:false, else:false}], "layout/startscreen":[{data:['\r <div id="layer-startscreen">\r <table id="content-startscreen-layer" style="position: absolute; width:100%; height:100%; padding:25px">\r <tr>\r <td style="height: 25%">&nbsp;</td>\r </tr>\r <tr>\r <td style="vertical-align: middle; text-align: center; height: 50%;">\r <div style="border:0; width: 100%; height: auto; text-align: center; margin: auto 0; position: relative">\r <img id="startscreen-logo" src="img/logo.png" srcset="img/logo.png 2x, img/logo.png 3x" style="max-width:25%; height: auto; padding:50px">\r </div>\r </td>\r </tr>\r <tr>\r <td id="layer-startscreen-btn" style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; display: none; height: 100%;">\r <div id="btn-login-show" class="button" style="width: 66.667%; height: 50px; line-height: 50px; color: #fff; text-transform: uppercase; border-color:#fff; font-size: 13px; font-weight: 300;">Login</div><br><br>\r <div id="btn-signup-show" class="button" style="width: 66.667%; height: 50px; line-height: 50px; color: #fff; text-transform: uppercase; border-color:#fff; font-size: 13px; font-weight: 300;">Signup</div><br>\r \r </td>\r </tr>\r <tr id="layer-startscreen-preload" style="height: auto; display: none; text-align: center;">\r <td style="text-align: center; height:100px; position: relative; ">&nbsp;</td>\r </tr>\r <tr>\r <td style="height: 25%;">\r \r </td>\r </tr>\r </table>\r \r </div>\r <div id="content-login-layer" class="overlay hardware-accelerated" style="background-color: #fff; text-align: center;">\r <main style="position: relative; width:100%; height:100%;">\r <div id="btn-cancel-login" class="btn-navbar-icon-close" style="position: absolute; top:15px; left: 10px; width: 32px; height: 32px; -webkit-filter: invert(0.2)"></div>\r <table style="position: relative; width:50%; min-width:250px; height:80%; top:0px; table-layout: fixed; margin: 0 auto">\r <tr>\r <td style="height: auto">&nbsp;</td>\r </tr>\r <tr>\r <td style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 60px; border-bottom: 1px solid #ccc">\r <input id="input-login-email" type="email" placeholder="Email" style="width: 100%; height: 60px; border-color: #fff; margin: 0; padding: 0">\r </td>\r </tr>\r <tr>\r <td style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 60px; border-bottom: 1px solid #ccc">\r <input id="input-login-password" type="password" placeholder="Password" style="width: 100%; height: 60px; border-color: #fff; margin: 0; padding: 0">\r </td>\r </tr>\r <tr>\r <td style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 40px;">\r <br>\r <div id="btn-login" class="button" style="background: linear-gradient(to right bottom, #25b9cc, #1e44db); width: 100%; margin: 0; padding: 0; color: #fff; border: 0">Login</div>\r </td>\r </tr>\r <tr>\r <td style="height: auto">&nbsp;</td>\r </tr>\r </table>\r </main>\r </div>\r <div id="content-signup-layer" class="overlay hardware-accelerated" style="background-color: #fff; text-align: center;">\r <main style="position: relative; width:100%; height:100%;">\r <div id="btn-cancel-signup" class="btn-navbar-icon-close" style="position: absolute; top:15px; left: 10px; width: 32px; height: 32px; -webkit-filter: invert(0.2)"></div>\r <table style="position: relative; width:50%; min-width:250px; height:100%; table-layout: fixed; margin: 0 auto">\r <tr>\r <td style="height: auto;">&nbsp;</td>\r </tr>\r <tr>\r <td style="text-align: left; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 100px; border-bottom: 1px solid #ccc">\r <label for="user-image-input" style="margin: 0">\r <img id="signup-user-image" src="img/1/icon-profile-pic.png" srcset="img/2/icon-profile-pic.png 2x, img/3/icon-profile-pic.png 3x" style="width: 80px; height:80px; border-radius:100%; object-fit: cover; object-position: center;">\r <form id="user-image-form" enctype="multipart/form-data" style="display:none">\r <input id="user-image-input" class="file" type="file" name="file">\r </form>\r </label>\r </td>\r </tr>\r <tr>\r <td style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 60px; border-bottom: 1px solid #ccc">\r <input id="input-signup-first-name" type="text" placeholder="First Name" style="width: 100%; height: 60px; border-color: #fff; margin: 0; padding: 0">\r </td>\r </tr>\r <tr>\r <td style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 60px; border-bottom: 1px solid #ccc">\r <input id="input-signup-last-name" type="text" placeholder="Last Name" style="width: 100%; height: 60px; border-color: #fff; margin: 0; padding: 0">\r </td>\r </tr>\r <tr style="display: none">\r <td style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 60px; border-bottom: 1px solid #ccc">\r <input id="input-signup-location" type="text" placeholder="Location" style="width: 100%; height: 60px; border-color: #fff; margin: 0; padding: 0">\r </td>\r </tr>\r <tr>\r <td style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 60px; border-bottom: 1px solid #ccc">\r <input id="input-signup-email" type="email" placeholder="Email" style="width: 100%; height: 60px; border-color: #fff; margin: 0; padding: 0">\r </td>\r </tr>\r <tr>\r <td style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 60px; border-bottom: 1px solid #ccc">\r <input id="input-signup-password" type="password" placeholder="Password" style="width: 100%; height: 60px; border-color: #fff; margin: 0; padding: 0">\r </td>\r </tr>\r <tr>\r <td style="text-align: center; vertical-align: top; width:100%; position: relative; overflow:hidden; height: 40px;">\r <br>\r <div id="btn-signup" class="button" style="background: linear-gradient(to right bottom, #25b9cc, #1e44db); width: 100%; margin: 0; padding: 0; color: #fff; border: 0">Signup</div>\r </td>\r </tr>\r <tr>\r <td style="height: auto;">&nbsp;</td>\r </tr>\r </table>\r </main>\r </div>\r '], 
map:[""], if:false, else:false}], "layout/toolbar":[{data:['\r <footer id="toolbar" data-role="footer" data-position="fixed" data-tap-toggle="false">\r <table>\r <tr style="color: #6b6e70;">\r <td id="btn-view-calendar" class="active">\r <span class="toolbar-btn toolbar-btn-5">\r <span id="toolbar-today" style="line-height: 38px; text-align: center"></span>\r </span>\r \r </td>\r <td id="btn-view-activity"><span class="toolbar-btn toolbar-btn-1"></span></td>\r <td id="btn-view-notification"><span class="toolbar-btn toolbar-btn-3"></span></td>\r <td id="btn-view-discover"><span class="toolbar-btn toolbar-btn-2"></span></td>\r <td id="btn-view-settings" style="display: none"><span class="toolbar-btn toolbar-btn-4"></span></td>\r </tr>\r </table>\r </footer>\r '], 
map:[""], if:false, else:false}]};

APP.VIEW = {"view/app/changelog":[{data:['<div style="background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210); margin:15px; padding:15px; font-size: 13px; font-weight: 300; text-align: left">\r \r <h5 style="font-weight: 700; margin-bottom: 0; color: #2067d7">v', "", '<span style="float: right; font-size: 11px; line-height: 27px; font-weight: 300; color: #999">', "", "</span></h5>\r \r "], map:[0, "version", 2, "date", 4], if:false, else:false}, {data:['\r <div style="line-height: 35px; font-weight: 500">Features:</div>\r <ul style="list-style: circle; padding-left:15px; margin-bottom: 0">\r '], 
map:[0], if:"val.feature&&val.feature.length", else:false}, {data:["\r "], map:[0], "loop":false}, {data:['\r <li style="margin-bottom: 2px;">', "", "</li>\r "], map:[0, "item", 2], "loop":"feature"}, {data:["\r "], map:[0], if:false, else:false}, {data:["\r </ul>\r "], map:[0], if:"val.feature&&val.feature.length", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:['\r <div style="line-height: 35px; font-weight: 500">Improvements:</div>\r <ul style="list-style: circle; padding-left:15px; margin-bottom: 0">\r '], 
map:[0], if:"val.improve&&val.improve.length", else:false}, {data:["\r "], map:[0], "loop":false}, {data:['\r <li style="margin-bottom: 2px;">', "", "</li>\r "], map:[0, "item", 2], "loop":"improve"}, {data:["\r "], map:[0], if:false, else:false}, {data:["\r </ul>\r "], map:[0], if:"val.improve&&val.improve.length", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:['\r <div style="line-height: 35px; font-weight: 500">Fixes:</div>\r <ul style="list-style: circle; padding-left:15px; margin-bottom: 0">\r '], 
map:[0], if:"val.fix&&val.fix.length", else:false}, {data:["\r "], map:[0], "loop":false}, {data:['\r <li style="margin-bottom: 2px;">', "", "</li>\r "], map:[0, "item", 2], "loop":"fix"}, {data:["\r "], map:[0], if:false, else:false}, {data:["\r </ul>\r "], map:[0], if:"val.fix&&val.fix.length", else:false}, {data:["\r \r </div>\r "], map:[0], if:false, else:false}], "view/app/default":[{data:['<table class="info-wrapper" style="height: 100%; width: 100%; position: absolute; left:0px; top:0px; right:0px; bottom:0px; padding-bottom: 48px">\r <tr>\r <td style="padding: 20px">', 
"", "</td>\r </tr>\r </table>\r "], map:[0, "message", 2], if:false, else:false}], "view/app/login":[{data:[""], map:[""], if:false, else:false}], "view/app/no_own_slots":[{data:['<table class="info-wrapper" style="position:relative; top:0px; width:100%; height:auto; padding:0; margin:0; font-size: 100%;">\r <tr>\r <td style="text-align: center; font-size: 2em; font-weight: 300; color:#ccc">\r <div style="height:15px"></div>\r No Slots for this day!\r </td>\r </tr>\r <tr>\r <td style="text-align: center; color: #666;">\r Just add a Slot and save photos, videos,<br>audio files and notes to your calendar!\r </td>\r </tr>\r <tr class="link-to-create-slot">\r <td style="text-align: center;">\r <div style="height:15px"></div>\r <img src="img/1/icon-plus-thin-512.png" srcset="img/2/icon-plus-thin-512.png 2x, img/3/icon-plus-thin-512.png 3x" style="width: 64px; height:64px; opacity:0.25"><br><br>\r </td>\r </tr>\r </table>\r '], 
map:[""], if:false, else:false}], "view/app/no_slots":[{data:['<table class="info-wrapper" style="position:relative; top:0px; width:100%; height:auto; padding:0; margin:0; font-size: 100%;">\r <tr>\r <td style="text-align: center; font-size: 2em; font-weight: 300; color:#ccc">\r <div style="height:15px"></div>\r No Slots for this day\r </td>\r </tr>\r </table>\r '], map:[""], if:false, else:false}], "view/app/no_slots_flex":[{data:['<table class="info-wrapper" style="position:relative; top:0px; width:100%; height:auto; padding:0; margin:0; font-size: 100%;">\r <tr>\r <td style="text-align: center; font-size: 2em; font-weight: 300; color:#ccc">\r <div style="height:15px"></div>\r No Slots\r </td>\r </tr>\r </table>\r '], 
map:[""], if:false, else:false}], "view/app/signup":[{data:[""], map:[""], if:false, else:false}], "view/calendar/big":[{data:['<table class="calendar-big" data-use-native-scrolling="true" style="height:33.3333%; width:100%; table-layout: fixed; position: relative">\r <tbody>\r <tr>\r <td class="', "", '" data-time="', "", '">\r <div>', "", "</div>\r ", "", "\r </td>\r "], map:[0, "data[0].class", 2, "data[0].time", 4, "data[0].kw", 6, "data[0].day", 8], "loop":false}, {data:['\r <td class="', "", 
'" data-time="', "", '">', "", "</td>\r "], map:[0, "class", 2, "time", 4, "day", 6], "loop":"data,1,7"}, {data:['\r </tr>\r <tr>\r <td class="', "", '" data-time="', "", '">\r <div>', "", "</div>\r ", "", "\r </td>\r "], map:[0, "data[7].class", 2, "data[7].time", 4, "data[7].kw", 6, "data[7].day", 8], "loop":false}, {data:['\r <td class="', "", '" data-time="', "", '">', "", "</td>\r "], map:[0, "class", 2, "time", 4, "day", 6], "loop":"data,8,14"}, {data:['\r </tr>\r <tr>\r <td class="', "", '" data-time="', 
"", '">\r <div>', "", "</div>\r ", "", "\r </td>\r "], map:[0, "data[14].class", 2, "data[14].time", 4, "data[14].kw", 6, "data[14].day", 8], "loop":false}, {data:['\r <td class="', "", '" data-time="', "", '">', "", "</td>\r "], map:[0, "class", 2, "time", 4, "day", 6], "loop":"data,15,21"}, {data:['\r </tr>\r <tr>\r <td class="', "", '" data-time="', "", '">\r <div>', "", "</div>\r ", "", "\r </td>\r "], map:[0, "data[21].class", 2, "data[21].time", 4, "data[21].kw", 6, "data[21].day", 8], "loop":false}, 
{data:['\r <td class="', "", '" data-time="', "", '">', "", "</td>\r "], map:[0, "class", 2, "time", 4, "day", 6], "loop":"data,22,28"}, {data:['\r </tr>\r <tr>\r <td class="', "", '" data-time="', "", '">\r <div>', "", "</div>\r ", "", "\r </td>\r "], map:[0, "data[28].class", 2, "data[28].time", 4, "data[28].kw", 6, "data[28].day", 8], "loop":false}, {data:['\r <td class="', "", '" data-time="', "", '">', "", "</td>\r "], map:[0, "class", 2, "time", 4, "day", 6], "loop":"data,29,35"}, {data:['\r </tr>\r <tr>\r <td class="', 
"", '" data-time="', "", '">\r '], map:[0, "data[35].class", 2, "data[35].time", 4], if:false, else:false}, {data:["\r <div>", "", "</div>\r "], map:[0, "data[35].kw", 2], if:"val.data.length>35", else:false}, {data:["\r ", "", "\r </td>\r "], map:[0, "data[35].day", 2], "loop":false}, {data:['\r <td class="', "", '" data-time="', "", '">', "", "</td>\r "], map:[0, "class", 2, "time", 4, "day", 6], "loop":"data,36,42"}, {data:["\r </tr>\r </tbody>\r </table>\r "], map:[0], if:false, else:false}], 
"view/calendar/compact":[{data:['<table class="calendar-compact" style="width:33.333333%; table-layout: fixed">\r <tbody>\r \r <tr>\r <td class="', "", '" data-time="', "", '">\r \r ', "", "\r </td>\r "], map:[0, "data[0].class", 2, "data[0].time", 4, "data[0].day", 6], "loop":false}, {data:['\r <td class="', "", '" data-time="', "", '">\r ', "", "\r </td>\r "], map:[0, "class", 2, "time", 4, "day", 6], "loop":"data,1,7"}, {data:["\r </tr>\r </tbody>\r </table>\r "], map:[0], if:false, else:false}], 
"view/card/group":[{data:['\r <table style="table-layout: fixed; width: 100%; background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210)">\r <tr>\r <td>\r <div style="line-height:85%; border-bottom:1px solid #eee; background-color: rgb(245, 246, 247); border-top-left-radius:4px; border-top-right-radius:4px;">\r <div style="padding:10px 0">\r <table style="table-layout: fixed; width: 100%">\r <tr>\r <td class="user-image-small" id="user_', "", '" style="width: 50px; text-align: center">\r <img src="', 
"", '" style="width: 30px; height:30px; border-radius:30px;" lazyload>\r </td>\r <td class="link-to-group-slots" id="group_', "", '" style="width: 99%">\r <div class="slot-card-user-name" style="line-height:15px; display: inline-block; text-align:left; color: rgb(112, 112, 122); font-size: 12px;">\r <span style="line-height:14px; margin:auto 0; font-weight: 500"><b>', "", '</b></span><br>\r <span style="line-height:14px; margin:auto 0; font-weight: 300">', "", '</span>\r </div>\r </td>\r <td style="width: 80px; text-align: right">\r '], 
map:[0, "target.owner.id", 2, "target.owner.thumb", 4, "target.id", 6, "target.name", 8, "target.owner.username", 10], if:"val.type=='group'", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="link-to-follow-group ismember" id="group_', "", '" style="height:28px; width:auto; border-radius:4px; display: inline-block; text-align: center; line-height: 27px; position: relative; padding: 1px 8px 0 8px; margin-right: 10px">Unfollow</div>\r '], map:[0, "id", 2], if:"val.type=='group'&&val.target.isMember", 
else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="link-to-follow-group" id="group_', "", '" style="height:28px; width:auto; border-radius:4px; display: inline-block; text-align: center; line-height: 27px; position: relative; padding: 1px 8px 0 8px; margin-right: 10px">Follow</div>\r '], map:[0, "id", 2], if:"val.type=='group'&&!val.target.isMember", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r </td>\r </tr>\r </table>\r </div>\r \r </div>\r <div style="position: relative">\r <div style="position: absolute; height:100%; z-index: 0; width: 24.5px; border-right:1px solid rgb(230, 231, 232)"></div>\r <div style="height: 10px"></div>\r <table style="position: relative; width:100%; table-layout: fixed; z-index: 1;">\r '], 
map:[0], if:"val.type=='group'", else:false}, {data:["\r "], map:[0], "loop":false}, {data:['\r <tr style="height: 10px">\r <td style="width: 50px;"></td>\r <td></td>\r </tr>\r <tr class="slot-card-title-layer" id="slot_', "", '">\r <td style="vertical-align: top; text-align: center">\r <div style="height:11px; width:11px; background-color:rgb(120, 220, 195); border-radius: 11px; display: inline-block"></div>\r </td>\r <td rowspan="2" style="vertical-align: top; padding-right: 10px; text-overflow: ellipsis; overflow:hidden; white-space:nowrap;">\r \r \r ', 
"", '\r \r <b style="font-size: 1em">', "", '</b><br>\r <span class="" style="font-weight: 500; color: rgb(143, 143, 143); font-size: 11px; display: inline-block; width:100px">', "", '</span>\r \r \r \r </td>\r </tr>\r <tr>\r <td></td>\r </tr>\r <tr class="preview-slots-bottom-border">\r <td></td>\r <td>\r <div style="border-top:1px solid rgb(230, 231, 232); height:1px; width: 100%; display: inline-block"></div>\r </td>\r </tr>\r '], map:[0, "id", 2, "tmp_preview_image", 4, "title", 6, "startDate", 
8], "loop":"target.previewSlots"}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r \r \r </table>\r \r </div>\r \r <div class="link-to-group-slots" id="group_', "", '" style="line-height:40px; height:40px; border-top:1px solid #eee; background-color: rgb(245, 246, 247); border-bottom-left-radius:4px; border-bottom-right-radius:4px; color: rgb(112, 112, 122); font-size: 10px; text-transform: uppercase; text-align: center">\r \r Show Slots\r </div>\r <div class="clear"></div>\r </td>\r </tr>\r </table>\r '], 
map:[0, "target.id", 2], if:"val.type=='group'", else:false}, {data:["\r "], map:[0], if:false, else:false}], "view/card/slot":[{data:['\r <table style="table-layout: fixed; width: 100%; background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210)">\r '], map:[""], if:"val.type==='slot'", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <tr>\r <td style="border-bottom: 1px solid rgb(235, 235, 235);">\r <div class="image-placeholder" style="border-top-left-radius:4px; border-top-right-radius:4px; position: absolute; z-index: 0"></div>\r <div class="slot-card-image-layer" style="min-height: 143px; max-height: 143pt; background-image:url(', 
"", '); border-top-left-radius:4px; border-top-right-radius:4px; z-index: 1" id="slot_', "", '">\r \r \r </div>\r </td>\r </tr>\r \r '], map:[0, "target.media.publicId", 2, "target.id", 4], if:"val.type==='slot'&&val.target.image_count", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <tr>\r <td style="overflow: hidden">\r \r \r \r \r \r <table class="slot-card-info-layer" style="table-layout: fixed; padding:0; line-height: 44px; border-radius:4px; border-bottom: none; width: 100%; overflow: hidden">\r <tr>\r <td style="border-right: 1px solid rgb(235, 235, 235); width: 60px; text-align: center">\r <div class="slot-card-date" style="padding-top:20px; padding-bottom: 10px; margin-left:2px; display: inline-block; float: none">\r <div style="width: 52px; text-align: center; font-weight: 300; font-size: 25px; color: #000; margin-left:-1px">', 
"", '</div>\r <div style="width: 52px; text-align: center; font-weight: 300; font-size: 11.5px; color: #000; text-transform: uppercase">', "", '</div>\r </div>\r </td>\r <td style="width: 99%; padding-right: 10px; font-size: 100%; position: relative">\r <div style="display: block; white-space: nowrap; padding:0px 10px 0px 10px; line-height:135%; position: relative; text-overflow: ellipsis; width: 95%; overflow: hidden; margin: auto 0">\r <b class="slot-card-title-layer" id="slot_', "", '" style="font-size: 14px; font-weight: 400">', 
"", '</b><br>\r </div>\r <div style="display: block; white-space: nowrap; padding:0 10px 0px 10px; line-height:135%; position: relative; text-overflow: ellipsis; width: 95%; overflow: hidden; margin: auto 0; color: rgb(143, 143, 143);">\r <span class="" style="font-weight: 300; color: rgb(143, 143, 143); font-size: 11px;">', "", " ", "", "</span>\r "], map:[0, "target.startDay", 2, "target.startMonth", 4, "target.id", 6, "target.title", 8, "target.startTime", 10, "target.startTimeAM", 12], if:"val.type==='slot'", 
else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r &emsp;\r <img src="img/1/icon-maps.png" srcset="img/2/icon-maps.png 2x, img/3/icon-maps.png 3x" style="width: 16px; height: 16px; position: relative; top:4px; padding-right:3px">\r <span class="slot-card-location" id="location_', "", '" style="font-weight: 300; color: rgb(143, 143, 143); font-size: 11px;">', "", "</span>\r "], map:[0, "target.location.id", 2, "target.location.name", 4], if:"val.target.location&&val.target.location.name", 
else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:["\r </div>\r </td>\r "], map:[0], if:"val.type==='slot'", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:[' \r <td style="width: 50px; border-left: 1px solid rgb(235, 235, 235); text-align: center">\r '], map:[0], if:"val.type==='slot'&&val.message", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="link-to-edit-slot icon-slot-more" id="slot_', "", '" style="height:76px; width:50px; margin:0 auto; filter:invert(0.24); padding:0"></div>\r '], 
map:[0, "target.id", 2], if:"val.type==='slot'&&val.message&&val.target.myslot", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="link-to-reslot icon-slotit already-slotit" id="slot_', "", '" style="height:76px; width:50px; margin:0 auto"></div>\r '], map:[0, "target.id", 2], if:"val.type==='slot'&&val.message&&!val.target.myslot&&val.target.ownSlot", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="link-to-reslot icon-slotit" id="slot_', 
"", '" style="height:76px; width:50px; margin:0 auto"></div>\r '], map:[0, "target.id", 2], if:"val.type==='slot'&&val.message&&!val.target.myslot&&!val.target.ownSlot", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:["\r </td>\r "], map:[0], if:"val.type==='slot'&&val.message", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r </tr>\r </table>\r \r </td>\r </tr>\r <tr>\r <td style="border-top: 1px solid rgb(235, 235, 235);">\r <div class="slot-card-social-layer" style="border-bottom-left-radius:4px; border-bottom-right-radius:4px; padding-top: 5px; padding-bottom: 18px; background-color: #fcfcfc; background: linear-gradient(to bottom, #fff 35%, #fcfcfc 100%); height: 21px; position: relative">\r <table style="table-layout: fixed; width: 100%; position: relative;">\r <tr>\r <td style="width: 35px">\r <div class="user-image-small" id="user_', 
"", '">\r <img src="', "", '" style="width: 24px; height: 24px; border-radius:24px; margin:0px 10px 5px 2px; display: inline-block; position: relative; top:5px">\r </div>\r </td>\r <td style="width: 99%; position: relative">\r <div class="slot-card-user-name link-to-group-slots" id="group_', "", '" style="line-height:10px; vertical-align: middle; text-align:left; display: inline-block; color: rgb(112, 112, 122); white-space:nowrap; text-overflow: ellipsis; width: 100%; overflow: hidden;">\r '], map:[0, 
"target.creator.id", 2, "target.creator.thumb", 4, "target.firstGroup.id", 6], if:"val.type==='slot'", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <span style="line-height:14px; margin:auto 0"><b>', "", "</b></span><br>\r "], map:[0, "target.firstGroup.name", 2], if:"val.target.firstGroup", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <span style="line-height:12px; margin:auto 0; font-weight: 300;">', "", '</span>\r </div>\r </td>\r <td>&nbsp;</td>\r <td style="width: 80px; white-space: nowrap; text-align: right">\r <div class="slot-card-socials" id="social_', 
"", '" style="position:relative; top: 2px; left:5px">\r \r '], map:[0, "target.creator.username", 2, "target.id", 4], if:"val.type==='slot'", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <img src="img/1/icon-love.png" srcset="img/2/icon-love.png 2x, img/3/icon-love.png 3x" style="width: 16px; height: 16px">&thinsp;\r <span style="color:rgb(200, 202, 205); padding-right:5px; position:relative; top: -4px;">', "", "</span>\r "], map:[0, "target.likes", 2], if:"val.type==='slot'&&val.target.likes", 
else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r &nbsp;\r <img src="img/1/icon-comment.png" srcset="img/2/icon-comment.png 2x, img/3/icon-comment.png 3x" style="width: 16px; height: 16px">&thinsp;\r <span style="color:rgb(200, 202, 205); padding-right:5px; position:relative; top: -4px;">', "", "</span>\r "], map:[0, "target.commentsCounter", 2], if:"val.type==='slot'&&val.target.commentsCounter", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:["\r </div>\r </td>\r </tr>\r </table>\r </div>\r </td>\r </tr>\r </table>\r "], 
map:[0], if:"val.type==='slot'", else:false}, {data:["\r "], map:[0], if:false, else:false}], "view/card/user":[{data:['\r <table style="table-layout: fixed; width: 100%; background-color: #fff; position: relative; border-radius:4px; box-shadow:1px 1px 0px rgb(210, 210, 210)">\r <tr>\r <td>\r <table style="table-layout: fixed; width: 100%">\r <tr>\r <td style="width: 65px; text-align: center">\r <div class="slot-card-user-layer user-image-small" id="user_', "", '" style="height: 52px; display: inline-block;">\r <img src="', 
"", '" style="padding:0; margin: 0">\r </div>\r </td>\r <td style="width: 99%">\r <div class="user-image-small" id="user_', "", '">\r <div class="slot-card-user-name" style="line-height: 16px; vertical-align: middle; font-size: 16px; font-weight: 300; color: rgb(21, 26, 41)">', "", '</div>\r </div>\r </td>\r <td class="link-to-follow-user'], map:[0, "target.id", 2, "target.thumb", 4, "target.id", 6, "target.username_2_lines", 8], if:"val.type=='user'", else:false}, {data:[" stranger"], map:[0], if:"val.type=='user'&&!val.target.friendshipState||val.target.friendshipState==='stranger'||val.target.friendshipState==='pending_passive'", 
else:false}, {data:[" friend"], map:[0], if:"val.type=='user'&&val.target.friendshipState==='friend'||val.target.friendshipState==='pending_active'", else:false}, {data:['" id="user_', "", '" style="width: 76px; text-align: center;">\r <div style="height:28px; width:46px; border-radius:4px; background: linear-gradient(to right bottom,#25b9cc,#1e44db); text-align: center; line-height: 27px; margin-right: 0px; display: inline-block; padding: 1px 0px 0 0px; ">\r <img src="img/1/icon-add-user-plus.png" srcset="img/2/icon-add-user-plus.png 2x, img/3/icon-add-user-plus.png 3x" style="height: 10px">&nbsp;\r <img src="img/1/icon-add-user-human.png" srcset="img/2/icon-add-user-human.png 2x, img/3/icon-add-user-human.png 3x" style="height: 13px">\r </div>\r <div style="height:28px; width:46px; border-radius:4px; border:1px solid #ccc; ; text-align: center; line-height: 27px; margin-right: 0px; position: relative; display: none; padding: 1px 0px 0 0px;">\r <img src="img/1/icon-delete-user.png" srcset="img/2/icon-delete-user.png 2x, img/3/icon-delete-user.png 3x" style="width: 10px">&nbsp;\r <img src="img/1/icon-add-user-human-soft.png" srcset="img/2/icon-add-user-human-soft.png 2x, img/3/icon-add-user-human-soft.png 3x" style="height: 13px">\r </div>\r </td>\r </tr>\r </table>\r </td>\r </tr>\r </table>\r '], 
map:[0, "target.id", 2], if:"val.type=='user'", else:false}, {data:["\r "], map:[0], if:false, else:false}], "view/feed/activity":[{data:['<table class="slot-card" style="background-color: #fff; width:100%; table-layout: fixed; padding:0px;'], map:[0], if:false, else:false}, {data:[" margin: 1px 0 0 0;"], map:[0], if:"val.index>0", else:false}, {data:['">\r <tr>\r <td style="text-align: left; padding: 5px 0px 5px 15px; line-height: 18px;">\r <div style="height: 10px"></div>\r <span class="slot-card-user-name" style="line-height: 18px; font-weight: 300; display: inline-block;">', 
"", '</span>\r <br>\r <span class="slot-card-user-name" style="font-size: 11px; font-weight: 300; line-height: 11px; color: rgb(143, 143, 143); letter-spacing: 0.2pt">', "", '</span>\r <div style="height: 10px"></div>\r </td>\r \r \r '], map:[0, "message", 2, "time", 4], if:false, else:false}, {data:['\r <td style="text-align: center; width: 68px;">\r <div class="slot-card-image-layer" id="slot_', "", '" style="margin:0 auto; width:48px; height:48px; border-radius: 4px; background-image:url(', "", 
'); background-size: cover; background-position: center center; background-repeat: no-repeat"></div>\r </td>\r '], map:[0, "target.id", 2, "target.media.thumb", 4], if:"val.type==='slot'&&val.target.media", else:false}, {data:["\r \r \r "], map:[0], if:false, else:false}, {data:['\r <td style="text-align: center; width: 68px;">\r <div class="slot-card-image-layer" id="slot_', "", '" style="margin:0 auto; width:48px; height:48px; border-radius:100%; background-image:url(', "", '); background-size: cover; background-position: center center; background-repeat: no-repeat"></div>\r </td>\r '], 
map:[0, "target.id", 2, "target.media.thumb", 4], if:"val.type==='user'&&val.target.media", else:false}, {data:["\r \r \r "], map:[0], if:false, else:false}, {data:['\r <td style="text-align: center; width: 68px;">\r <div class="link-to-group-slots group-placeholder" id="group_', "", '" style="margin:0 auto; width:56px; height:56px;"></div>\r </td>\r '], map:[0, "target.id", 2], if:"val.type==='group'", else:false}, {data:["\r \r \r \r </tr>\r </table>\r "], map:[0], if:false, else:false}], "view/feed/discover":[{data:['<div class="content-title">Public</div>\r <div id="content-discover-public" class="subcontent-wrapper"></div>\r <div class="content-seperator"></div>\r \r <div class="content-title">Cinema</div>\r <div id="content-discover-cinema" class="subcontent-wrapper"></div>\r <div class="content-seperator"></div>\r \r <div class="content-title">Clubbing</div>\r <div id="content-discover-clubbing" class="subcontent-wrapper"></div>\r <div class="content-seperator"></div>\r \r <div class="content-title">Concerts</div>\r <div id="content-discover-concerts" class="subcontent-wrapper"></div>\r <div class="content-seperator"></div>\r \r <div class="content-title">Soccer</div>\r <div id="content-discover-soccer" class="subcontent-wrapper"></div>\r <div class="content-seperator"></div>\r \r <div class="content-title">Television</div>\r <div id="content-discover-television" class="subcontent-wrapper"></div>\r <div class="content-seperator"></div>\r \r <div class="content-title">Art</div>\r <div id="content-discover-art" class="subcontent-wrapper"></div>\r <br>\r '], 
map:[""], if:false, else:false}], "view/feed/news":[{data:['<div class="slot-card" style="background-color:#e7e9ec ">\r \r <br>\r \r \r \r <table style="width: 100%; table-layout: fixed">\r <tr>\r <td class="slot-card-user-layer" style="width: 68px; text-align: center; padding:0; vertical-align: top">\r <img class="user-image-small" src="', "", '" id="user_', "", '" style="border-radius: 100%; padding:0; margin:0; float:none;">\r </td>\r <td style="width: 99%">\r <div class="slot-card-user-name" style="line-height:28px; height:auto; vertical-align: middle">\r <div style="line-height:18px; margin:auto 0; font-weight: 300;">', 
"", '</div>\r <div style="height:18px; margin:auto 0; color: #bbb;">\r <span style="float:left; font-size: 11px; padding-left: 2px">', "", '&ensp;&middot;&ensp;</span>\r <img src="', "", '" style="width: 16px; height: 16px; position: relative; top:2px; margin:0; padding:0">\r </div>\r <div class="clear"></div>\r </div>\r </td>\r <td style="width: 20px"></td>\r </tr>\r <tr>\r <td></td>\r <td style="padding-top: 5px; position: relative">\r \r \r \r '], map:[0, "actor.thumb", 2, "actor.id", 4, "message", 
6, "time", 8, "visibility", 10]}, {include:"view/card/slot"}, {data:["\r "], map:[0]}, {include:"view/card/user"}, {data:["\r "], map:[0]}, {include:"view/card/group"}, {data:["\r \r </td>\r <td></td>\r </tr>\r </table>\r <br>\r </div>\r "], map:[0], if:false, else:false}], "view/feed/notification":[{data:['<table class="slot-card" style="background-color: #fff; width:100%; table-layout: fixed; padding:0px;'], map:[0], if:false, else:false}, {data:[" margin: 1px 0 0 0;"], map:[0], if:"val.index>0", 
else:false}, {data:['">\r <tr>\r <td style="width: 75px; text-align: center">\r <div class="slot-card-user-layer" style="display: inline-block">\r '], map:[0], if:false, else:false}, {data:['\r <img class="user-image-small view-user" src="', "", '" id="user_', "", '" style="padding:0; margin: 0">\r '], map:[0, "target.thumb", 2, "target.id", 4], if:"val.target.username&&val.target.friendshipState==='pending_active'", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <img class="user-image-small view-user" src="', 
"", '" id="user_', "", '" style="padding:0; margin: 0">\r '], map:[0, "actor.thumb", 2, "actor.id", 4], if:"!val.target.username||val.target.friendshipState!=='pending_active'", else:false}, {data:['\r </div>\r </td>\r <td style="text-align: left; padding: 5px 15px 5px 0; line-height: 18px;">\r <div style="height: 10px"></div>\r <span class="slot-card-user-name" style="line-height: 18px; font-weight: 300; display: inline-block;">', "", '</span>\r <br>\r <span class="slot-card-user-name" style="font-size: 11px; font-weight: 300; line-height: 11px; color: rgb(143, 143, 143); letter-spacing: 0.2pt">', 
"", '</span>\r <div style="height: 10px"></div>\r </td>\r \r \r '], map:[0, "message", 2, "time", 4], if:false, else:false}, {data:['\r <td style="text-align: center; width: 68px;">\r <div class="slot-card-image-layer" id="slot_', "", '" style="margin:0 auto; width:48px; height:48px; border-radius: 4px; background-image:url(', "", '); background-size: cover; background-position: center center; background-repeat: no-repeat"></div>\r </td>\r '], map:[0, "target.id", 2, "target.media.thumb", 4], if:"val.target.title", 
else:false}, {data:["\r \r \r "], map:[0], if:false, else:false}, {data:['\r <td style="text-align: center; width: 68px;">\r <div class="link-to-group-slots group-placeholder" id="group_', "", '" style="margin:0 auto; width:56px; height:56px;"></div>\r </td>\r '], map:[0, "target.id", 2], if:"val.target.owner", else:false}, {data:["\r \r \r "], map:[0], if:false, else:false}, {data:['\r \r <td class="link-to-follow-user'], map:[0], if:"val.target.username", else:false}, {data:[" stranger"], map:[0], 
if:"val.target.username&&!val.target.friendshipState||val.target.friendshipState==='stranger'||val.target.friendshipState==='pending_passive'", else:false}, {data:[" friend"], map:[0], if:"val.target.username&&val.target.friendshipState==='friend'||val.target.friendshipState==='pending_active'", else:false}, {data:['" id="user_'], map:[0], if:"val.target.username", else:false}, {data:["", "", ""], map:[0, "actor.id", 2], if:"val.target.username&&val.target.friendshipState==='pending_passive'", else:false}, 
{data:["", "", ""], map:[0, "target.id", 2], if:"val.target.username&&val.target.friendshipState!=='pending_passive'", else:false}, {data:['" style="width: 68px; text-align: center;">\r <div style="height:28px; width:46px; border-radius:4px; background: linear-gradient(to right bottom,#25b9cc,#1e44db); text-align: center; line-height: 27px; margin-right: 0px; display: inline-block; padding: 1px 0px 0 0px; ">\r <img src="img/1/icon-add-user-plus.png" srcset="img/2/icon-add-user-plus.png 2x, img/3/icon-add-user-plus.png 3x" style="height: 10px">&nbsp;\r <img src="img/1/icon-add-user-human.png" srcset="img/2/icon-add-user-human.png 2x, img/3/icon-add-user-human.png 3x" style="height: 13px">\r </div>\r <div style="height:28px; width:46px; border-radius:4px; border:1px solid #ccc; ; text-align: center; line-height: 27px; margin-right: 0px; position: relative; display: none; padding: 1px 0px 0 0px;">\r <img src="img/1/icon-delete-user.png" srcset="img/2/icon-delete-user.png 2x, img/3/icon-delete-user.png 3x" style="width: 10px">&nbsp;\r <img src="img/1/icon-add-user-human-soft.png" srcset="img/2/icon-add-user-human-soft.png 2x, img/3/icon-add-user-human-soft.png 3x" style="height: 13px">\r </div>\r </td>\r '], 
map:[0], if:"val.target.username", else:false}, {data:["\r </tr>\r </table>\r "], map:[0], if:false, else:false}], "view/feed/search":[{data:['<div class="slot-card" style="background-color: transparent; width: 247px; display: inline-block; padding-right: 15px; padding-bottom:1px;">\r \r \r \r '], map:[0]}, {include:"view/card/slot"}, {data:["\r \r </div>\r "], map:[0], if:false, else:false}], "view/group/list":[{data:['<table id="group_', "", '" class="slot-card" style="background-color: #fff; width:100%; table-layout: fixed; padding:0px; margin: 10px 0">\r <tr>\r <td style="width: 100px;">\r <div style="margin: 10px 10px 10px 15px; width:64px; height:64px; border-radius:64px; background-image:url(', 
"", '); background-size: cover; background-position: center center; background-repeat: no-repeat"></div>\r </td>\r <td style="text-align: left; padding-right: 15px; line-height:80%">\r <b style="line-height: 24px;">', "", '</b><br>\r <span style="font-size: 0.8em; line-height: 0.8em; color: #aaa">Shared by ', "", '</span>\r </td>\r <td style="width: 150px; line-height:50%; text-align: right;">\r <div style="float:right; padding:15px 20px 15px 15px" class="toggle-wrapper">\r <input class="toggle toggle-light" id="check_', 
"", '" type="checkbox">\r <label class="toggle-btn" for="check_', "", '" style="float:right"></label>\r <br style="clear:both">\r <span style="font-size: 0.8em; line-height: 1.5em; color: #aaa">Show in My Schedule</span>\r </div>\r </td>\r </tr>\r </table>\r '], map:[0, "id", 2, "image", 4, "name", 6, "owner.username", 8, "index", 10, "index", 12], if:false, else:false}], "view/group/manage":[{data:['<div class="slot-view" style="width:100%; position:absolute; top:0px; bottom:0px; left:0px; right:0px; background-color: #eaecef; overflow-y:auto; -webkit-overflow-scrolling: touch;">\r <table style="height:auto; width:100%; background-color: #eaecef; table-layout: fixed; position: relative; z-index: 0;">\r <tr><td style="height: 20px">&ensp;</td></tr>\r <tr class="slot-content-off"'], 
map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"val.name", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229); border-top:1px solid rgb(205, 211, 229)">\r <div class="icon-add-content" style="width:28px; height:28px; background-color: #d0d1d4; border-radius:100%; float:left; margin-right:10px"></div>\r Add Name\r </td>\r </tr>\r <tr class="slot-content-on"'], 
map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"!val.name", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229); border-top:1px solid rgb(205, 211, 229)">\r <div class="icon-remove-content" style="width:19px; height:19px; background-color: #d0d1d4; border-radius:100%; margin-top:9px; position: absolute; right:15px; z-index: 1"></div>\r <input type="text" data-attr="name" value="', 
"", '" style="border:0; margin:0; padding:0; outline:none; width:90%;">\r </td>\r </tr>\r <tr class="slot-content-off"'], map:[0, "name", 2], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"val.description", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229)">\r <div class="icon-add-content" style="width:28px; height:28px; background-color: #d0d1d4; border-radius:100%; float:left; margin-right:10px"></div>\r Add Description\r </td>\r </tr>\r <tr class="slot-content-on"'], 
map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"!val.description", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229)">\r <div class="icon-remove-content" style="width:19px; height:19px; background-color: #d0d1d4; border-radius:100%; margin-top:9px; position: absolute; right:15px; z-index: 1"></div>\r <input type="text" data-attr="description" value="', 
"", '" style="border:0; margin:0; padding:0; outline:none; width:90%;">\r </td>\r </tr>\r <tr><td style="height: 20px">&ensp;</td></tr>\r <tr>\r <td style="color: rgb(153, 155, 161); font-size: 12px; position: relative">\r <div style="height: 20px; padding:0 15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 11px">Color</div>\r <div style="position: relative; background-color: #fff; padding:10px 0 10px 15px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r \r <div style="position: relative; white-space: nowrap; overflow: hidden; color: #ddd; font-size: 16px; font-weight: 300; letter-spacing: -1px; height: 38px">\r <div style="position: absolute; right:0px; top:0px; bottom:0px; width:100px; background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); pointer-events: none; z-index: 1"></div>\r <div id="option-group-color" style="position: absolute; top:0px; bottom:0px; right:0px; left:0px; overflow-x: auto; padding-right: 100px; height: 60px; width: 100%; z-index: 0; white-space: nowrap" data-use-native-scrolling="true">\r <table style="width: 650px; background-color: #fff; table-layout: fixed; padding:0 15px; line-height: 15px; text-align: center; white-space: nowrap">\r <tr>\r <td>\r <div class="option-color active" style="border-color: rgb(213, 218, 217)">\r <span style="background-color: rgb(213, 218, 217)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(255, 115, 136);">\r <span style="background-color: rgb(255, 115, 136)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(255, 203, 92)">\r <span style="background-color: rgb(255, 203, 92)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(255, 115, 173)">\r <span style="background-color: rgb(255, 115, 173)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(104, 232, 194)">\r <span style="background-color: rgb(104, 232, 194)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(203, 219, 99)">\r <span style="background-color: rgb(203, 219, 99)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(247, 111, 204)">\r <span style="background-color: rgb(247, 111, 204)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(115, 180, 255)">\r <span style="background-color: rgb(115, 180, 255)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(255, 171, 115)">\r <span style="background-color: rgb(255, 171, 115)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(104, 228, 232)">\r <span style="background-color: rgb(104, 228, 232)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(229, 115, 255)">\r <span style="background-color: rgb(229, 115, 255)"></span>\r </div>\r <div class="option-color" style="border-color: rgb(247, 221, 87)">\r <span style="background-color: rgb(247, 221, 87)"></span>\r </div>\r </td>\r </tr>\r </table>\r </div>\r </div>\r </div>\r <div class="clear"></div>\r </td>\r </tr>\r <tr><td style="height: 20px">&ensp;</td></tr>\r <tr>\r <td style="color: rgb(153, 155, 161); font-size: 12px; position: relative">\r <div style="height: 20px; padding:0 15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 11px">Invite People</div>\r <div id="group-attendees" style="position: relative; background-color: #fff; padding:15px 0 15px 15px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r '], 
map:[0, "description", 2]}, {include:"view/user/follower"}, {data:['\r </div>\r <div class="clear"></div>\r </td>\r </tr>\r <tr><td style="height: 20px">&ensp;</td></tr>\r <tr>\r <td style="">\r <div id="" style="position: relative; background-color: #fff; padding:15px 0 15px 15px; color: rgb(21, 26, 41); font-weight: 300; font-size: 16px; line-height: 28px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r <div class="checkbox-settings" style="width:23px; height:23px; float:right; border-radius:4px; margin-right:15px;"></div>\r Make Calendar Public\r </div>\r <div class="clear"></div>\r </td>\r </tr>\r <tr>\r <td>\r <br>\r <div style="height: 10px"></div>\r </td>\r </tr>\r '], 
map:[0], if:false, else:false}, {data:['\r <tr>\r <td style="text-align: center; height: 53px; padding:1px 15px 1px 15px; border: 1px solid #2067d7; background-color: #fff; color: #2067d7 ; font-weight: 300; font-size: 16px; line-height: 28px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r Delete Group\r </td>\r </tr>\r '], map:[0], if:"val.id", else:false}, {data:["\r </table>\r <br>\r </div>\r "], map:[0], if:false, else:false}], "view/group/search":[{data:['<table style="table-layout: fixed; width: 100%; position: relative;">\r <tr style="border-bottom:1px solid  #d8dbe5">\r <td style="width: 65px; height: 63px; text-align: left">\r \r <div class="link-to-group-slots" id="group_', 
"", '" style="height: 44px; display: block; margin: auto 0">\r <img src="', "", '" style="width: 44px; height: 44px; margin:0 0 0 5px; border-radius:100%;" lazyload>\r </div>\r </td>\r <td style="width: 99%;">\r <div class="link-to-group-slots" id="group_', "", '">\r <div class="slot-card-group-name" style="line-height: 16px; vertical-align: middle; font-size: 16px; font-weight: 300; color: rgb(21, 26, 41); text-overflow:ellipsis; overflow: hidden; white-space: nowrap">', "", '</div>\r <div class="slot-card-group-name" style="line-height: 11px; vertical-align: middle; font-size: 11px; font-weight: 300; color: rgb(143, 143, 143); padding-top: 3px; max-height: 22px; display: -webkit-box; text-overflow:ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden">', 
"", '</div>\r </div>\r </td>\r <td style="width: 80px; text-align: right">\r <div class="link-to-follow-group'], map:[0, "id", 2, "thumb", 4, "id", 6, "name", 8, "description", 10], if:false, else:false}, {data:[" ismember"], map:[0], if:"val.isMember", else:false}, {data:['" id="group_', "", '" style="height:28px; width:auto; border-radius:4px; display: inline-block; text-align: center; line-height: 27px; position: relative; padding: 1px 8px 0 8px; margin-right: 0px">\r '], map:[0, "id", 2], if:false, 
else:false}, {data:["\r Unfollow\r "], map:[0], if:"val.isMember", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:["\r Follow\r "], map:[0], if:"!val.isMember", else:false}, {data:["\r </div>\r </td>\r </tr>\r </table>\r "], map:[0], if:false, else:false}], "view/group/select":[{data:['<table class="calendar-select" style="table-layout: fixed; width: 95%; margin-left:15px">\r <tr style="border-bottom:1px solid rgb(228, 231, 242)">\r <td style="padding: 15px 0; text-align: left; font-size: 17px; line-height: 18px; font-weight: 300; color: rgb(21, 26, 41)">\r ', 
"", '\r <br>\r <div class="toggle_sidebar_settings" style="font-size: 0.8em; color: rgba(0, 0, 0, 0.34); font-weight: 300;">\r '], map:[0, "name", 2], if:false, else:false}, {data:["\r Public\r "], map:[0], if:"val.public", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:["\r Private\r "], map:[0], if:"!val.public", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:["\r - Shared with ", "", " people\r "], map:[0, "shareCount", 2], if:"val.shareCount>1", else:false}, 
{data:['\r </div>\r </td>\r <td id="check_', "", '" class="check-sidebar'], map:[0, "id", 2], if:false, else:false}, {data:[" active"], map:[0], if:"val.selected", else:false}, {data:['" style="text-align: center; width: 50px"><div style="width:22px; height:22px; border-radius:4px; border:1px solid rgba(0, 0, 0, 0.25); margin:10px auto"></div></td>\r </tr>\r </table>\r '], map:[0], if:false, else:false}], "view/group/show":[{data:['<table class="slot-view" style="height:100%; width:100%; table-layout: fixed; position:absolute; top:0; bottom:0; left:0; right:0; background-color: #fff">\r <tr>\r <td style="text-align: center; height: 50px; vertical-align: middle;">\r <div class="group-view-close" style="float:left; display:inline-block; width:48px; height:32px; background-image: url(img/icon-ios7-arrow-back-active-512.png); background-size: 32px 32px; background-position: 0px center; background-repeat: no-repeat; padding:10px 10px 10px 0;"></div>\r <a style="float:right; line-height:52px; padding:0 10px">Unfollow</a>\r </td>\r </tr>\r <tr>\r <td class="user-view-image-layer" style="text-align: center; background-image:url(', 
"", ');"></td>\r </tr>\r <tr>\r <td style="text-align: center; vertical-align: top">\r <br>\r <div class="user-view-title">\r ', "", '\r </div>\r </td>\r </tr>\r <tr>\r <td style="text-align: center; height:30%; vertical-align: bottom">\r <table style="width:100%; text-align: center; margin:auto 0">\r <tr>\r <td>&emsp;</td>\r <td class="" id="slotlist_0" style="text-align: center; width:20%">', "", '<br><span class="main-color">Slots</span></td>\r <td>&ensp;</td>\r <td style="border-right:1px solid #aaa; width: 1px"></td>\r <td>&ensp;</td>\r <td class="" id="grouplist_0" style="text-align: center; width:20%">', 
"", '<br><span class="main-color">Members</span></td>\r <td>&ensp;</td>\r <td style="border-right:1px solid #aaa; width: 1px"></td>\r <td>&ensp;</td>\r <td class="" id="friendlist_0" style="text-align: center; width:20%">', "", '<br><span class="main-color">Followers</span></td>\r <td>&emsp;</td>\r </tr>\r </table>\r <br>\r </td>\r </tr>\r </table>\r '], map:[0, "image", 2, "name", 4, "slotCount", 6, "memberCount", 8, "memberCount", 10], if:false, else:false}], "view/group/sidebar":[{data:['<table id="group_', 
"", '" class="card" style="table-layout: fixed; background-color: rgba(255, 255, 255, 0.03); color:#fff; margin:0; padding:0; border-bottom:none; border-top: 1px solid rgba(255, 255, 255, 0.07)">\r <tr>\r '], map:[0, "id", 2], if:false, else:false}, {data:['\r <td class="link-to-group-slots card-title" id="group_', "", '" style="padding:12px 0; width: 60px">\r <div style="margin-left:15px; width:35px; height:35px; border-radius:100%; background-image:url(', "", '); background-size: cover; background-position: center center; background-repeat: no-repeat"></div>\r </td>\r '], 
map:[0, "id", 2, "thumb", 4], if:"!val.isOwner", else:false}, {data:['\r <td style="width: 60%; height: 36px; font-weight: 300; line-height:125%; padding: 10px 0;'], map:[0], if:false, else:false}, {data:[" width: 70%; padding-left:15px;"], map:[0], if:"val.isOwner", else:false}, {data:['">\r <div class="link-to-group-slots" id="group_', "", '">\r ', "", "\r "], map:[0, "id", 2, "name", 4], if:false, else:false}, {data:['\r <br>\r <div class="toggle_sidebar_settings" style="font-size: 0.8em; color: rgba(255, 255, 255, 0.34); font-weight: 300">\r Shared by ', 
"", "\r \r </div>\r "], map:[0, "owner.username", 2], if:"!val.isOwner", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <br>\r <div class="toggle_sidebar_settings" style="font-size: 0.8em; color: rgba(255, 255, 255, 0.34); font-weight: 300">\r '], map:[0], if:"val.isOwner", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:["\r Public\r "], map:[0], if:"val.isOwner&&val.public", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:["\r Private\r "], 
map:[0], if:"val.isOwner&&!val.public", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:["\r - Shared with ", "", " people\r "], map:[0, "shareCount", 2], if:"val.isOwner&&val.shareCount>1", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:["\r </div>\r "], map:[0], if:"val.isOwner", else:false}, {data:['\r </div>\r </td>\r <td id="check_', "", '" class="check-sidebar'], map:[0, "id", 2], if:false, else:false}, {data:[" active"], map:[0], if:"val.showInSchedule", 
else:false}, {data:['" style="text-align: center; width: 50px"><div style="width:22px; height:22px; border-radius:4px; border:1px solid rgba(255, 255, 255, 0.25); margin:10px auto"></div></td>\r <td id="group_', "", '" class="icon-sidebar-more'], map:[0, "id", 2], if:false, else:false}, {data:[" default-group"], map:[0], if:"val.isDefaultGroup", else:false}, {data:['" style="width: 40px">\r <div></div>\r </td>\r </tr>\r </table>\r '], map:[0], if:false, else:false}], "view/group/slotgroup":[{data:['\r <div style="font-size: 21px; font-weight: 700; margin-left:20px; line-height: 25px; height: 25px">', 
"", '</div>\r <div style="font-size: 11px; font-weight: 300; margin-left:20px; line-height: 15px; padding-bottom: 10px">', "", "</div>\r "], map:[0, "name", 2, "description", 4], if:"val.previewSlots&&val.previewSlots.length", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="link-to-follow-group" id="group_', "", '" style="float: right; height:28px; width:auto; border-radius:4px; text-align: center; line-height: 27px; position: relative; margin-top:-38px; right:10px; padding: 1px 8px 0 8px;">Follow</div>\r '], 
map:[0, "id", 2], if:"val.previewSlots&&val.previewSlots.length&&!val.isMember&&!val.isOwner", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="link-to-follow-group ismember" id="group_', "", '" style="float: right; height:28px; width:auto; border-radius:4px; text-align: center; line-height: 27px; position: relative; top:-38px; right:10px; padding: 1px 8px 0 8px;">Unfollow</div>\r '], map:[0, "id", 2], if:"val.previewSlots&&val.previewSlots.length&&val.isMember&&!val.isOwner", 
else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div style="position: relative; background-color: #fff">\r <div style="position: absolute; height:100%; z-index: 0; width: 24.5px; border-right:1px solid rgb(240, 241, 242)"></div>\r <div style="height: 10px"></div>\r <table style="position: relative; width:100%; table-layout: fixed; z-index: 1">\r '], map:[0], if:"val.previewSlots&&val.previewSlots.length", else:false}, {data:["\r "], map:[0], "loop":false}, {data:['\r <tr style="height: 10px">\r <td style="width: 50px;"></td>\r <td></td>\r </tr>\r <tr>\r <td style="vertical-align: top; text-align: center">\r <div style="height:11px; width:11px; background-color:rgb(145, 179, 255); border-radius: 11px; display: inline-block"></div>\r </td>\r <td rowspan="2" style="vertical-align: top; line-height: 18px;">\r <b class="slot-card-title-layer" id="slot_', 
"", '" style="font-size: 1em">', "", '</b>\r \r <br>\r \r <span class="" style="font-weight: 300; color: rgb(143, 143, 143); font-size: 11px; display: inline-block; width:100px">', "", '</span>\r \r \r \r \r \r </td>\r <td rowspan="2" style="vertical-align: top; padding-right: 15px">\r ', "", '\r </td>\r </tr>\r <tr>\r <td></td>\r </tr>\r <tr class="preview-slots-bottom-border">\r <td></td>\r <td colspan="2">\r <div style="border-top:1px solid rgb(240, 241, 242); height:1px; width: 100%; display: inline-block"></div>\r </td>\r </tr>\r '], 
map:[0, "id", 2, "title", 4, "startDate", 6, "tmp_preview_image", 8], "loop":"previewSlots"}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r </table>\r </div>\r <div class="link-to-group-slots" id="group_', "", '" style="line-height:40px; height:40px; border-top:1px solid #eee; background-color: rgb(245, 246, 247); color: #a4a7ac; font-size: 11px; font-weight: 300; text-transform: uppercase; text-align: center; letter-spacing: 1px; box-shadow:0px 1px 0px rgba(0, 0, 0, 0.1)">\r \r Show Slots\r </div>\r <div class="clear"></div>\r <br><br>\r '], 
map:[0, "id", 2], if:"val.previewSlots&&val.previewSlots.length", else:false}, {data:["\r "], map:[0], if:false, else:false}], "view/slot/flex":[{data:['\r <div style="clear: both; background-color: #fff; position: -webkit-sticky; position: sticky; top: 0px ; width: 14%; display: inline-block; float: left;">\r <table style="position: relative; width:100%; table-layout: fixed">\r <tr>\r <td style="width: 50px; vertical-align: top;">\r <div class="slot-card-date" style="margin:0;">\r <div style="width: 70px; text-align: center; font-weight: 100; font-size: 31px;  color: rgb(21, 26, 41); margin-left:-1px; letter-spacing: 0.6pt;">', 
"", '</div>\r <div style="width: 70px; text-align: center; font-weight: 300; font-size: 11px; line-height: 19px; color: rgb(21, 26, 41); letter-spacing: 0.6pt; text-transform: uppercase;">', "", "</div>\r </div>\r </td>\r </tr>\r </table>\r </div>\r "], map:[0, "startDay", 2, "startMonth", 4], if:"val.startDate", else:false}, {data:['\r <div class="slot-card ', "", " "], map:[0, "startDatePickerAllDay", 2], if:false, else:false}, {data:["today"], map:[0], if:"val.today", else:false}, {data:['" data-index="', 
"", '" style="background-color: #fff; width: 86%; display: block; float: right; clear: right">\r \r <div style="position: absolute; top: 5px; height:100%; z-index: 0; width: 19px; border-right:1px solid rgb(227, 227, 227)"></div>\r \r <table style="position: relative; width:100%; table-layout: fixed; z-index: 1;">\r <tr>\r \r <td style="width: 40px; vertical-align: top; text-align: center">\r <div style="position: relative; height:11px; width:11px; background-color:', "", '; border-radius: 11px; display: inline-block; top: -5px;"></div>\r </td>\r <td rowspan="2" style="width: 100%; vertical-align: top;">\r <table style="table-layout: fixed; width: 100%">\r <tr>\r <td style="width: 35px; position: relative">\r '], 
map:[0, "index", 2, "color", 4], if:false, else:false}, {data:['\r <div class="image-placeholder" style="min-height: 143px; max-height: 143pt; height: 38.133333vw; width: 95.03546%; border-radius:4px; margin-bottom: 10px; position: absolute; z-index: 0"></div>\r <div class="slot-card-image-layer" style="background-image:url(', "", '); min-height: 143px; max-height: 143pt; height: 38.133333vw; width: 95.03546%; border-radius:7px; margin-bottom: 10px;" id="slot_', "", '">\r \r \r </div>\r '], map:[0, 
"media.publicId", 2, "id", 4], if:"val.image_count", else:false}, {data:['\r </td>\r </tr>\r <tr>\r <td class="slot-card-title-layer" id="slot_', "", '" style="padding-right: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 20px">\r <b style="white-space: normal; font-size: 16px; font-weight: 400; line-height: 16px; color: rgb(21, 26, 41); position: relative;'], map:[0, "id", 2], if:false, else:false}, {data:[" top:-4px;"], map:[0], if:"!val.image_count", else:false}, 
{data:['">', "", '</b><br>\r <span class="" style="font-weight: 200; color: rgb(143, 143, 143); font-size: 12px; letter-spacing: 0.2pt">', "", " ", "", "</span>\r "], map:[0, "title", 2, "startTime", 4, "startTimeAM", 6], if:false, else:false}, {data:['\r <img src="img/1/icon-maps.png" srcset="img/2/icon-maps.png 2x, img/3/icon-maps.png 3x" style="width: 12px; height: 12px; position: relative; top:2px; margin:0 4px 0 10px" lazyload>\r <span class="slot-card-location" id="location_', "", '" style="font-weight: 200; color: rgb(143, 143, 143); font-size: 12px; letter-spacing: 0.2pt">', 
"", "</span>\r "], map:[0, "location.id", 2, "location.name", 4], if:"val.location&&val.location.name", else:false}, {data:['\r </td>\r </tr>\r <tr>\r <td>\r <div class="slot-card-social-layer" style="border-top:1px solid rgb(237, 237, 237); margin-top: 8px; margin-right: 15px; padding:0px; font-size: 11px">\r '], map:[0], if:false, else:false}, {data:['\r <div style="float:left; text-align: left; height:38px; line-height: 34px; width: 70%; white-space: nowrap;" class="user-image-small" id="user_', 
"", '">\r <img src="', "", '" style="width: 24px; height: 24px; border-radius:100%; margin:7px 6px 5px 2px; display: inline-block;">\r <div class="slot-card-user-name" style="height:52px; margin-top: 2px; line-height:12px; vertical-align: middle; text-align:left; display: inline-block; color: rgb(112, 112, 122); overflow: hidden; text-overflow: ellipsis; width: 100%">\r <span style="line-height:12px; margin:auto 0; white-space: nowrap; font-weight: 600; letter-spacing: 0.2pt">', "", '</span><br>\r <span style="line-height:12px; margin:auto 0; white-space: nowrap; font-weight: 300; letter-spacing: 0.2pt">', 
"", "</span>\r </div>\r </div>\r "], map:[0, "creator.id", 2, "creator.thumb", 4, "creator.username", 6, "firstGroup.name", 8], if:"!val.myslot", else:false}, {data:['\r <div class="slot-card-socials" id="social_', "", '" style="position:relative; padding: 5px 0 0 0">\r '], map:[0, "id", 2], if:false, else:false}, {data:['\r <div style="height: 12px;"></div>\r '], map:[0], if:"!val.myslot", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:['\r <img src="img/1/icon-love.png" srcset="img/2/icon-love.png 2x, img/3/icon-love.png 3x" style="width: 14px; height: 14px; padding-left: 4px">\r <span style="color:rgb(200, 202, 205); padding-left:1px; padding-right: 0px; position:relative; top: -3px; font-weight: 600; letter-spacing: 0.5pt">', 
"", "</span>\r "], map:[0, "likes", 2], if:"val.likes", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <img src="img/1/icon-comment.png" srcset="img/2/icon-comment.png 2x, img/3/icon-comment.png 3x" style="width: 16px; height: 16px; padding-left: 4px; position:relative; top: 1px">\r <span style="color:rgb(200, 202, 205); padding-left:1px; padding-right: 0px; position:relative; top: -3px; font-weight: 600; letter-spacing: 0.5pt">', "", "</span>\r "], map:[0, "commentsCounter", 
2], if:"val.commentsCounter", else:false}, {data:['\r \r </div>\r <div class="clear"></div>\r '], map:[0], if:false, else:false}, {data:['\r \r <div style="border-bottom:1px solid rgb(237, 237, 237); width:100%;"></div>\r <div style="height:10px"></div>\r '], map:[0], if:"!val.myslot", else:false}, {data:["\r \r </div>\r </td>\r </tr>\r </table>\r <br>\r </td>\r </tr>\r </table>\r \r \r </div>\r \r "], map:[0], if:false, else:false}], "view/slot/list":[{data:['<div class="slot-card" data-index="', 
"", '" style="background-color: #fff; border-bottom:1px solid rgb(227, 229, 232); top: 0px; position: relative;">\r \r <div style="position: relative">\r <table style="position: relative; width:100%; table-layout: fixed; z-index: 1; min-height:65px">\r <tr>\r <td style="width: 79px; vertical-align: middle; text-align: center">\r <span style="width: 79px; text-align: center; font-weight: 300; font-size: 15px; color: rgb(33, 34, 38); font-family: \'HelveticaNeue-Light\', \'HelveticaNeue\', \'Helvetica Neue\', Helvetica, Arial, sans-serif">', 
"", '</span>&nbsp;\r <span style="width: 79px; text-align: center; font-weight: 300; font-size: 8px; color: rgb(35, 36, 41); text-transform: uppercase; position: relative; top: -3.5px; letter-spacing: 1.1pt">', "", "</span>\r </td>\r <td "], map:[0, "index", 2, "startTime", 4, "startTimeAM", 6], if:false, else:false}, {data:[' colspan="2" '], map:[0], if:"val.image_count===0", else:false}, {data:[' class="slot-card-title-layer" id="slot_', "", '" style="width: 99%; vertical-align: middle; padding:15px 20px 15px 18px; border-left:1px solid rgb(235, 236, 240); position: relative">\r <b style="font-size: 16px; line-height: 19px; position: relative; font-weight: 300; color: rgb(11, 11, 13);">', 
"", '</b>\r <br>\r <div class="slot-card-social-layer" style="margin-top: 0px; padding: 0px; text-align: left">\r <div class="slot-card-socials" id="social_', "", '" style="position:relative; top: 0px; left:-1px; padding:0; margin:0; display: block">\r \r '], map:[0, "id", 2, "title", 4, "id", 6], if:false, else:false}, {data:['\r <img src="img/1/icon-love.png" srcset="img/2/icon-love.png 2x, img/3/icon-love.png 3x" style="width: 14px; height:14px" lazyload>\r <span style="color:rgb(200, 202, 205); padding-left:1px; padding-right: 0px; position:relative; top: -3px; font-weight: 600; letter-spacing: 0.5pt; font-size: 11px">', 
"", "</span>\r "], map:[0, "likes", 2], if:"val.likes", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r &nbsp;\r <img src="img/1/icon-comment.png" srcset="img/2/icon-comment.png 2x, img/3/icon-comment.png 3x" style="width: 15px; height: 15px; padding-left: 4px; position:relative; top: 1px" lazyload>\r <span style="color:rgb(200, 202, 205); padding-left:1px; padding-right: 0px; position:relative; top: -3px; font-weight: 600; letter-spacing: 0.5pt; font-size: 11px">', "", "</span>\r "], 
map:[0, "commentsCounter", 2], if:"val.commentsCounter", else:false}, {data:["\r </div>\r "], map:[0], if:false, else:false}, {data:['\r <div class="user-image-small" id="user_', "", '" style="padding-top: 5px">\r <img src="', "", '" style="float:left; width: 18px; height: 18px; border-radius:100%; margin:2px 6px 2px 0px; display: inline-block" lazyload>\r <div class="slot-card-user-name" style="line-height:10px; vertical-align: middle; text-align:left; display: inline-block; color: rgb(65, 68, 77); overflow: hidden; text-overflow: ellipsis; width: auto">\r <span style="line-height:10px; margin:auto 0; font-size: 10px; white-space: nowrap; font-weight: 400; letter-spacing: 0.4pt">', 
"", '</span><br>\r <span style="line-height:10px; margin:auto 0; font-size: 10px; white-space: nowrap; font-weight: 300; letter-spacing: 0.6pt">', "", "</span>\r </div>\r </div>\r "], map:[0, "creator.id", 2, "creator.thumb", 4, "creator.username", 6, "firstGroup.name", 8], if:"!val.myslot", else:false}, {data:['\r <div class="clear"></div>\r \r </div>\r </td>\r '], map:[0], if:false, else:false}, {data:['\r <td style="width: 77px; height: 90px">\r \r <div class="slot-card-image-layer" id="slot_', 
"", '" style="height: 59px; position: relative">\r <div class="image-preview-0" style="background-image:url(', "", '); background-position: center center; background-size: cover; border-radius:4px; margin:0; padding:0; "></div>\r \r '], map:[0, "id", 2, "media[0].thumb", 4], if:"val.image_count", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="image-preview-1" style="background-image:url(', "", '); background-position: center center; background-size: cover; border-radius:4px; margin:0; padding:0; "></div>\r '], 
map:[0, "media[1].thumb", 2], if:"val.image_count>1", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="image-preview-2" style="background-image:url(', "", '); background-position: center center; background-size: cover; border-radius:4px; margin:0; padding:0"></div>\r '], map:[0, "media[2].thumb", 2], if:"val.image_count>2", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:["\r \r </div>\r \r </td>\r "], map:[0], if:"val.image_count", else:false}, 
{data:["\r </tr>\r </table>\r </div>\r \r \r </div>\r "], map:[0], if:false, else:false}], "view/slot/location":[{data:['<table class="viewport location-view" style="height:100%; width:100%; table-layout: fixed; position:absolute; top:0; bottom:0; left:0; right:0; background-color: #fff">\r <tr>\r <td class="navbar" style="position: relative; text-align: center; vertical-align: middle;   ">\r <div class="icon-arrow-close slot-view-close" style="position:absolute; left:0px; top:21px; display:inline-block; width:48px; height:32px; padding:0px 10px 0px 0"></div>\r \r <div style="font-weight: 400; color: #000; line-height: 24px; max-width: 75%; overflow: hidden; text-overflow: ellipsis; text-align: center; margin: 0 auto">', 
"", '</div>\r </td>\r </tr>\r <tr>\r <td style="text-align: center; height:100%; line-height:0; position: relative;  background-repeat: no-repeat; background-position: center center; background-size: cover">\r <iframe frameborder="0" style="border:0; width:100%; height:100%; padding:0; margin:0" src="https://www.google.com/maps/embed/v1/place?q=', "", ",", "", ",", "", ",", "", "&zoom=13&maptype=roadmap&center=", "", ",", "", '&key=AIzaSyBflaxZeWQVHt6Ftn-Aj6LbkbksTn7iCQo" allowfullscreen></iframe>\r </td>\r </tr>\r </table>\r '], 
map:[0, "name", 2, "name", 4, "locality", 6, "thoroughfare", 8, "country", 10, "latitude", 12, "longitude", 14], if:false, else:false}], "view/slot/manage":[{data:['<div class="slot-view" style="width:100%; position:absolute; top:0px; bottom:0px; left:0px; right:0px; background-color: #eaecef; overflow-y:auto; -webkit-overflow-scrolling: touch;">\r \r \r \r <table style="height:auto; width:100%; background-color: #eaecef; table-layout: fixed; position: relative; z-index: 0;">\r <tr>\r <td style="height:150px; font-size: 16px; font-weight: 300; background-color: #fff; color: #d0d1d4; text-align: center; border-bottom:1px solid rgb(205, 211, 229)">\r <label for="slot-file-input" style="margin: 0">\r <div id="slot-add-image" style="background-position: center center; background-size: cover;'], 
map:[0], if:false, else:false}, {data:[" width:auto; height:242px; background-image: url(", "", "); "], map:[0, "media[0].publicId", 2], if:"val.id&&val.media&&val.media.length", else:false}, {data:[" width:auto; height:242px; background-image: url(", "", "); "], map:[0, "media[0].src", 2], if:"!val.id&&val.media&&val.media.length", else:false}, {data:['">\r '], map:[0], if:false, else:false}, {data:['\r <img src="img/1/icon-upload.png" srcset="img/2/icon-upload.png 2x, img/3/icon-upload.png 3x"><br>\r Add Image\r '], 
map:[0], if:"!val.media||!val.media.length", else:false}, {data:['\r </div>\r <form id="slot-file-form" enctype="multipart/form-data" style="display:none">\r <input id="slot-file-input" class="file" type="file" name="file[]">\r \r </form>\r </label>\r </td>\r </tr>\r <tr><td style="height: 30px"></td></tr>\r <tr class="slot-content-off"'], map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"val.title", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229); border-top:1px solid rgb(205, 211, 229)">\r <div class="icon-add-content" style="width:28px; height:28px; background-color: #d0d1d4; border-radius:100%; float:left; margin-right:10px"></div>\r Add Title\r </td>\r </tr>\r <tr class="slot-content-on"'], 
map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"!val.title", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229); border-top:1px solid rgb(205, 211, 229)">\r <div class="icon-remove-content" style="width:19px; height:19px; background-color: #d0d1d4; border-radius:100%; margin-top:9px; position: absolute; right:15px; z-index: 1"></div>\r <input type="text" data-attr="title" value="', 
"", '" style="border:0; margin:0; padding:0; outline:none; width:90%;">\r </td>\r </tr>\r <tr class="slot-location-off"'], map:[0, "title", 2], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"val.location&&val.location.name", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229)">\r <div class="icon-add-content" style="width:28px; height:28px; background-color: #d0d1d4; border-radius:100%; float:left; margin-right:10px"></div>\r Add Location\r </td>\r </tr>\r <tr class="slot-location-on"'], 
map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"!val.location||!val.location.name", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229)">\r <div class="icon-remove-content" style="width:19px; height:19px; background-color: #d0d1d4; border-radius:100%; margin-top:9px; position: absolute; right:15px; z-index: 1"></div>\r <input type="text" value="', 
"", '" style="border:0; margin:0; padding:0; outline:none; width:90%;">\r </td>\r </tr>\r <tr><td style="height: 20px">&ensp;</td></tr>\r <tr>\r <td style="height:150px;">\r <div style="height: 20px; padding-left:15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 11px">Time</div>\r <table id="slot-time-wrapper" style="width:100%; background-color: #fff; position: relative; padding:15px; font-size: 17px; font-weight: 400; line-height: 15px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r <tr style="border-bottom:1px solid rgb(205, 211, 229);">\r <td colspan="3" style="font-size: 17px; line-height: 23px; color: rgb(21, 26, 41); height:53px; padding-left:15px">\r <div class="checkbox-settings slot-all-day'], 
map:[0, "location.name", 2], if:false, else:false}, {data:[" active"], map:[0], if:"val.allday", else:false}, {data:['" style="width:23px; height:23px; float:right; border-radius:4px; margin-right:15px"></div>\r All-Day\r </td>\r </tr>\r <tr '], map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"val.allday", else:false}, {data:['>\r <td style="position: relative; padding:0 15px; line-height: 15px; height: 53px; width: 71px">\r <img src="img/1/icon-calendar-time.png" srcset="img/2/icon-calendar-time.png 2x, img/3/icon-calendar-time.png 3x" style="width:25px; margin-right: 10px">\r </td>\r <td colspan="2" style="position: relative; padding:0; top:15px; line-height: 15px; width: 99%; white-space: nowrap; border-bottom:1px solid rgb(235, 235, 235)">\r <div class="icon-arrow" style="position: absolute; width:50px; height:22px; right:15px; top:0px; z-index: 1; pointer-events: none; background-color: #fff"></div>\r <input type="datetime-local" data-attr="startDate" style="position: absolute; top:0px; width: 100%; height:22px; border:0; background:none; margin:0; padding:0; outline:none; font-size: 17px; font-weight: 300; color: rgb(21, 26, 41); z-index: 0" value="', 
"", '">\r </td>\r </tr>\r <tr style="border-bottom:1px solid rgb(205, 211, 229);'], map:[0, "startDatePicker", 2], if:false, else:false}, {data:[" display: none;"], map:[0], if:"val.allday", else:false}, {data:['">\r <td style="padding:0 15px; height: 53px; width: 71px"></td>\r <td colspan="2" style="position: relative; padding:0; top:15px; line-height: 15px; width: 99%; white-space: nowrap;">\r <div class="icon-arrow" style="position: absolute; width:50px; height:22px; right:15px; top:0px; z-index: 1; pointer-events: none; background-color: #fff"></div>\r <div class="btn-navbar-icon btn-navbar-icon-close slot-open-end" style="-webkit-filter: invert(0.2); touch-action: manipulation; transform:scale(0.75,0.75); position: absolute; left: 145px; top: -4px; z-index: 1;'], 
map:[0], if:false, else:false}, {data:[" visibility:hidden"], map:[0], if:"val.openEnd", else:false}, {data:['"></div>\r <input '], map:[0], if:false, else:false}, {data:['type="datetime-local"'], map:[0], if:"!val.openEnd", else:false}, {data:[" "], map:[0], if:false, else:false}, {data:['type="text" placeholder="Open End"'], map:[0], if:"val.openEnd", else:false}, {data:[' data-attr="endDate" style="position: absolute; top:0px; width: 100%; height:22px; border:0; background:none; margin:0; padding:0; outline:none; font-size: 17px; font-weight: 300; color: #d0d1d4; z-index: 0" value="'], 
map:[0], if:false, else:false}, {data:["", "", ""], map:[0, "endDatePicker", 2], if:"val.endDate", else:false}, {data:['">\r </td>\r </tr>\r <tr '], map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"!val.allday", else:false}, {data:['>\r <td style="position: relative; padding:0 15px; line-height: 15px; height: 53px; width: 71px">\r <img src="img/1/icon-calendar-time.png" srcset="img/2/icon-calendar-time.png 2x, img/3/icon-calendar-time.png 3x" style="width:25px; margin-right: 10px">\r </td>\r <td colspan="2" style="position: relative; padding:0; top:15px; line-height: 15px; width: 99%; white-space: nowrap; border-bottom:1px solid rgb(235, 235, 235)">\r <div class="icon-arrow" style="position: absolute; width:50px; height:22px; right:15px; top:0px; z-index: 1; pointer-events: none; background-color: #fff"></div>\r <input type="date" data-attr="startDate" style="position: absolute; top:0px; width: 100%; height:22px; border:0; background:none; margin:0; padding:0; outline:none; font-size: 17px; font-weight: 300; color: rgb(21, 26, 41); z-index: 0" value="', 
"", '">\r </td>\r </tr>\r <tr style="border-bottom:1px solid rgb(205, 211, 229);'], map:[0, "startDatePickerAllDay", 2], if:false, else:false}, {data:[" display: none;"], map:[0], if:"!val.allday", else:false}, {data:['">\r <td style="padding:0 15px; height: 53px; width: 71px"></td>\r <td colspan="2" style="position: relative; padding:0; top:15px; line-height: 15px; width: 99%; white-space: nowrap;">\r <div class="icon-arrow" style="position: absolute; width:50px; height:22px; right:15px; top:0px; z-index: 1; pointer-events: none; background-color: #fff"></div>\r <div class="btn-navbar-icon btn-navbar-icon-close slot-open-end" style="-webkit-filter: invert(0.2); touch-action: manipulation; transform:scale(0.75,0.75); position: absolute; left: 90px; top: -4px; z-index: 1;'], 
map:[0], if:false, else:false}, {data:[" visibility:hidden"], map:[0], if:"val.openEnd", else:false}, {data:['"></div>\r <input '], map:[0], if:false, else:false}, {data:['type="date"'], map:[0], if:"!val.openEnd", else:false}, {data:[" "], map:[0], if:false, else:false}, {data:['type="text" placeholder="Open End"'], map:[0], if:"val.openEnd", else:false}, {data:[' data-attr="endDate" style="position: absolute; top:0px; width: 100%; height:22px; border:0; background:none; margin:0; padding:0; outline:none; font-size: 17px; font-weight: 300; color: #d0d1d4; z-index: 0" value="'], 
map:[0], if:false, else:false}, {data:["", "", ""], map:[0, "endDatePickerAllDay", 2], if:"val.endDate", else:false}, {data:['">\r </td>\r </tr>\r <tr style="border-bottom:1px solid rgb(205, 211, 229); display: none">\r <td style="position: relative; padding:0 15px; line-height: 15px; height: 53px; width: 71px">\r <img src="img/1/icon-calendar-alert.png" srcset="img/2/icon-calendar-alert.png 2x, img/3/icon-calendar-alert.png 3x" style="width:25px">\r </td>\r <td colspan="2" style="width: 99%">\r <div style="position: relative; white-space: nowrap; overflow: hidden; color: #ddd; font-size: 16px; font-weight: 300; letter-spacing: -1px; height: 31px">\r <div style="position: absolute; right:0px; top:0px; bottom:0px; width:100px; background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); pointer-events: none; z-index: 1"></div>\r <div class="option-slot-wrapper" style="position: absolute; top:0px; bottom:0px; right:0px; left:-5px; overflow-x: auto; padding-right: 100px; height: 60px; width: 100%; z-index: 0; white-space: nowrap" data-use-native-scrolling="true">\r <table style="width:1100px; background-color: #fff; table-layout: fixed; padding:15px; line-height: 15px; text-align: center; white-space: nowrap">\r <tr>\r <td>\r <div class="option-slot-alert">5m</div>\r <div class="option-slot-alert">15m</div>\r <div class="option-slot-alert">30m</div>\r <div class="option-slot-alert">1h</div>\r <div class="option-slot-alert">2h</div>\r <div class="option-slot-alert">12h</div>\r <div class="option-slot-alert">1 Day</div>\r <div class="option-slot-alert">2 Days</div>\r <div class="option-slot-alert">3 Days</div>\r <div class="option-slot-alert">1 Week</div>\r <div class="option-slot-alert">2 Weeks</div>\r <div class="option-slot-alert">1 Month</div>\r </td>\r </tr>\r </table>\r </div>\r </div>\r </td>\r </tr>\r <tr style="border-bottom:1px solid rgb(205, 211, 229); display: none">\r <td style="position: relative; padding:0 15px 0 12px; line-height: 15px; height: 53px; width: 71px">\r <img src="img/1/icon-repeat.png" srcset="img/2/icon-repeat.png 2x, img/3/icon-repeat.png 3x" style="width:30px">\r </td>\r <td colspan="2" style="width: 99%">\r <div style="position: relative; white-space: nowrap; overflow: hidden; color: #ddd; font-size: 16px; font-weight: 300; letter-spacing: -1px; height: 31px">\r <div style="position: absolute; right:0px; top:0px; bottom:0px; width:100px; background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); pointer-events: none; z-index: 1"></div>\r <div id="repeat-slot-wrapper" style="position: absolute; top:0px; bottom:0px; right:0px; left:-5px; overflow-x: auto; padding-right: 100px; height: 60px; width: 100%; z-index: 0; white-space: nowrap" data-use-native-scrolling="true">\r <table style="width:850px; background-color: #fff; table-layout: fixed; padding:15px; line-height: 15px; text-align: center; white-space: nowrap">\r <tr>\r <td>\r <div class="option-slot-repeat" style="width: auto; padding: 0 10px; font-size: 15px; font-weight: 300">Every Day</div>\r <div class="option-slot-repeat" style="width: auto; padding: 0 10px; font-size: 15px; font-weight: 300">Every Week</div>\r <div class="option-slot-repeat" style="width: auto; padding: 0 10px; font-size: 15px; font-weight: 300">Every 2 Weeks</div>\r <div class="option-slot-repeat" style="width: auto; padding: 0 10px; font-size: 15px; font-weight: 300">Every Month</div>\r <div class="option-slot-repeat" style="width: auto; padding: 0 10px; font-size: 15px; font-weight: 300">Every 3 Months</div>\r <div class="option-slot-repeat" style="width: auto; padding: 0 10px; font-size: 15px; font-weight: 300">Every Year</div>\r </td>\r </tr>\r </table>\r </div>\r </div>\r </td>\r </tr>\r </table>\r </td>\r </tr>\r \r <tr><td style="height: 20px">&ensp;</td></tr>\r <tr>\r <td style="color: rgb(153, 155, 161); font-size: 12px; position: relative">\r <div style="height: 20px; padding:0 15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 11px">Attendees</div>\r <div id="slot-create-attendees" style="position: relative; background-color: #fff; padding:15px 0 15px 15px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r '], 
map:[0]}, {include:"view/user/follower"}, {data:['\r </div>\r <div class="clear"></div>\r </td>\r </tr>\r <tr><td style="height: 20px">&ensp;</td></tr>\r <tr>\r <td>\r <div style="height: 20px; padding-left:15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 11px">Description</div>\r </td>\r </tr>\r <tr class="slot-content-off"'], map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"val.description", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229)">\r <div class="icon-add-content" style="width:28px; height:28px; background-color: #d0d1d4; border-radius:100%; float:left; margin-right:10px"></div>\r Add Description\r </td>\r </tr>\r <tr class="slot-content-on"'], 
map:[0], if:false, else:false}, {data:[' style="display: none"'], map:[0], if:"!val.description", else:false}, {data:['>\r <td style="text-align: left; height: 53px; padding:1px 15px 1px 15px; background-color: #fff; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px; border-bottom:1px solid rgb(205, 211, 229)">\r <div class="icon-remove-content" style="width:19px; height:19px; background-color: #d0d1d4; border-radius:100%; margin-top:9px; position: absolute; right:15px; z-index: 1"></div>\r <input type="text" value="', 
"", '" data-attr="description" style="border:0; margin:0; padding:0; outline:none; width:90%;">\r </td>\r </tr>\r <tr><td style="height: 20px">&ensp;</td></tr>\r '], map:[0, "description", 2], if:false, else:false}, {data:['\r <tr>\r <td style="color: rgb(153, 155, 161); font-size: 12px; vertical-align: top">\r <div style="height: 20px; padding:0 15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 11px">Calendar</div>\r <div class="slot-create-add-group" style="position: relative; background-color: #fff; padding:15px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r <div class="icon-arrow" style="width:13px; height:13px; float:right; margin-top:5px; transform: rotate(90deg)"></div>\r <b class="slot-card-title-layer" id="" style="font-size: 16px; font-weight: 300; color: rgb(21, 26, 41)">', 
"", ""], map:[0, "slotGroups[0].name", 2], if:"val.slotGroups.length", else:false}, {data:[", ", "", ""], map:[0, "name", 2], "loop":"slotGroups,1,0"}, {data:['</b><br>\r </div>\r <div class="clear"></div>\r </td>\r </tr>\r '], map:[0], if:"val.slotGroups.length", else:false}, {data:['\r <tr>\r <td>\r <br>\r <div style="height: 10px"></div>\r </td>\r </tr>\r '], map:[0], if:false, else:false}, {data:['\r <tr>\r <td class="link-to-delete-slot" id="slot_', "", '" style="text-align: center; height: 53px; padding:1px 15px 1px 15px;  background-color: #fff; color: #2067d7 ; font-weight: 300; font-size: 16px; line-height: 28px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r Delete Slot\r </td>\r </tr>\r '], 
map:[0, "id", 2], if:"val.id", else:false}, {data:["\r </table>\r <br>\r </div>\r "], map:[0], if:false, else:false}], "view/slot/media":[{data:['<table style="height:100%; width:100%; table-layout: fixed; float: left; position: relative">\r <tbody>\r <tr>\r <td style="background-image:url(', "", '); width: 100%; height:100%; background-repeat: no-repeat; background-size: contain; background-position: center center">\r \r </td>\r </tr>\r </tbody>\r </table>\r '], map:[0, "publicId", 2], if:false, 
else:false}], "view/slot/place":[{data:['<table class="location-place" style="table-layout: fixed; width: 95%; margin-left:15px" data-description="', "", '">\r <tr style="border-bottom:1px solid rgb(228, 231, 242)">\r <td style="padding: 15px 0; text-align: center; width:45px;">\r <img src="img/1/icon-choose-location.png" srcset="img/2/icon-choose-location.png 2x, img/3/icon-choose-location.png 3x" lazyload>\r </td>\r <td style="padding: 15px 0; text-align: left; font-size: 17px; line-height: 18px; font-weight: 300; color: rgb(21, 26, 41)">\r ', 
"", '<br>\r <span style="font-size: 13px">\r ', "", "\r "], map:[0, "description", 2, "terms[0].value", 4, "terms[1].value", 6], if:false, else:false}, {data:["\r &nbsp;-&nbsp;\r ", "", "\r "], map:[0, "terms[2].value", 2], if:"val.terms[2]&&val.terms[2].value", else:false}, {data:["\r </span>\r </td>\r </tr>\r </table>\r "], map:[0], if:false, else:false}], "view/slot/search":[{data:['<table style="table-layout: fixed; width: 100%; position: relative;">\r <tr style="border-bottom:1px solid  #d8dbe5">\r <td style="width: 65px; height: 63px; text-align: left">\r <div class="slot-card-image-layer" id="slot_', 
"", '" style="margin:0 0 0 5px; width:44px; height:44px; border-radius: 4px; background-image:url(', "", '); background-size: cover; background-position: center center; background-repeat: no-repeat"></div>\r </td>\r <td style="width: 99%">\r <div class="slot-card-title-layer" id="slot_', "", '">\r <div class="slot-card-user-name" style="line-height: 16px; vertical-align: middle; font-size: 16px; font-weight: 300; color: rgb(21, 26, 41); text-overflow:ellipsis; overflow: hidden; white-space: nowrap">', 
"", '</div>\r <div class="slot-card-user-name" style="line-height: 11px; vertical-align: middle; font-size: 11px; font-weight: 300; color: rgb(143, 143, 143); padding-top: 3px; max-height: 22px; display: -webkit-box; text-overflow:ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden">', "", '</div>\r </div>\r </td>\r <td style="width: 80px; text-align: right">\r '], map:[0, "id", 2, "media.thumb", 4, "id", 6, "title", 8, "description", 10], if:false, else:false}, {data:['\r <div class="link-to-reslot already-slotit" id="slot_', 
"", '" style="height:28px; width:auto; border-radius:4px; display: inline-block; text-align: center; line-height: 27px; position: relative; padding: 1px 8px 0 8px; margin-right: 0px;">\r Unslot\r </div>\r '], map:[0, "id", 2], if:"!val.myslot&&val.ownSlot", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="link-to-reslot" id="slot_', "", '" style="height:28px; width:auto; border-radius:4px; background: linear-gradient(to right bottom,#25b9cc,#1e44db); display: inline-block; text-align: center; line-height: 27px; position: relative; padding: 1px 8px 0 8px; color: #fff; margin-right: 0px; ">\r Reslot\r </div>\r '], 
map:[0, "id", 2], if:"!val.myslot&&!val.ownSlot", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="link-to-edit-slot" id="slot_', "", '" style="height:28px; width:auto; border-radius:4px; display: inline-block; text-align: center; line-height: 27px; position: relative; padding: 1px 8px 0 8px; margin-right: 0px">\r Edit\r </div>\r '], map:[0, "id", 2], if:"val.myslot", else:false}, {data:["\r </td>\r </tr>\r </table>\r "], map:[0], if:false, else:false}], "view/slot/show":[{data:['<div class="slot-view" style="width:100%; position:absolute; top:0px; bottom:0px; left:0px; right:0px; background-color: #eaecef;">\r \r <header class="navbar" data-role="header" data-position="fixed" data-tap-toggle="false" style="background: none; position:absolute; top:0px; transform: translateZ(1px);  width:100%; table-layout: fixed; left:0px; right:0px; z-index: 1; border:0; box-shadow:none; height:58px">\r <table style="height:58px; margin:0; padding:0">\r <tr>\r <td class="td-1" style="width: 50px; position: relative"><div class="slot-view-close btn-navbar-icon icon-slot-back" style="margin: 0; padding-left: 0px"></div></td>\r <td class="td-2" style="width: 50px; position: relative"><div class="btn-navbar-icon link-to-like-slot icon-like'], 
map:[0], if:false, else:false}, {data:[" icon-like-active"], map:[0], if:"val.likeStatus", else:false}, {data:['" id="slot_', "", '" style="margin: 0;"></div></td>\r '], map:[0, "id", 2], if:false, else:false}, {data:['\r \r <td class="td-4" style="width: 50px; position: relative"><div class="btn-navbar-icon icon-slot-more" style="margin: 0; display: none" id="slot_', "", '"></div></td>\r '], map:[0, "id", 2], if:"val.myslot", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <td class="td-4" style="width: 50px; position: relative"><div class="btn-navbar-icon icon-slot-more" id="slot_', 
"", '" style="margin: 0;"></div></td>\r '], map:[0, "id", 2], if:"!val.myslot", else:false}, {data:['\r <td class="td-5" style="width: 99%; position: relative">\r <div style="position: relative; white-space: nowrap; margin:0; width: 50px; height: 58px" class="btn-navbar-icon link-to-reslot'], map:[0], if:false, else:false}, {data:[" myslot"], map:[0], if:"val.myslot", else:false}, {data:[" already-slotit"], map:[0], if:"!val.myslot&&val.ownSlot", else:false}, {data:['" id="slot_', "", '">\r <div class="slot-view-edit" style="height:28px; line-height: 27px; width:auto; border-radius:4px; color: #fff; background: linear-gradient(to right bottom, rgb(37, 185, 204), rgb(30, 68, 219));  text-align: center; position: relative;  padding: 0 8px 0 8px; margin-right: 10px; font-size: 16px; font-weight: 400; box-sizing: border-box">\r &nbsp;Edit&nbsp;\r </div>\r \r <div class="slot-view-reslot" style="width:auto; text-align: center; position: relative; box-sizing: border-box; margin:0">\r <div class="icon-slotit" style="height:50px; width:50px; margin:0 auto; position: relative; top:4px"></div>\r </div>\r <div class="slot-view-unslot" style="width:auto; text-align: center; position: relative;  box-sizing: border-box; margin:0">\r <div class="icon-slotit already-slotit" style="height:50px; width:50px; margin:0 auto; position: relative; top:4px"></div>\r </div>\r </div>\r </td>\r </tr>\r </table>\r </header>\r \r <div class="slot-view-scrollpane" style="position:absolute; top:0px; bottom:48px; width:100%; overflow-y:auto; -webkit-overflow-scrolling: touch; z-index: 0">\r \r '], 
map:[0, "id", 2], if:false, else:false}, {data:['\r <div class="image-placeholder" style="height:45%; position: absolute; z-index: 0"></div>\r <div class="slot-view-image-layer" id="slot_', "", '" style="height:40%; text-align: left; position: relative; z-index: 2; transform: translateZ(2px);">\r \r <div id="slot-media-scrollpane" style="position:absolute; width:100%; height:100%; white-space: nowrap; overflow-x: auto; text-align: center; top:0px; bottom:0px; left:0px; right:0px; background-color: #eaecef" data-use-native-scrolling="true">\r <div id="slot-media-content" style="position:absolute; width:100%; height:100%; white-space: nowrap; overflow: hidden; text-align: center; top:0px; bottom:0px; left:0px; right:0px;" data-use-native-scrolling="true">\r '], 
map:[0, "id", 2], if:"val.image_count", else:false}, {data:["\r "], map:[0], "loop":false}, {data:['\r <table style="height:100%; width:100%; table-layout: fixed; float: left; position: relative">\r <tbody>\r <tr>\r <td style="background-image:url(', "", '); width: 100%; height:100%; background-repeat: no-repeat; background-size: cover; background-position: center center">\r \r </td>\r </tr>\r </tbody>\r </table>\r '], map:[0, "publicId", 2], "loop":"media"}, {data:["\r "], map:[0], if:false, else:false}, 
{data:['\r <div class="slot-view-image-overlay" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0px, rgba(0, 0, 0, 0) 100%); height: 50%;"></div>\r \r </div>\r </div>\r \r \r \r \r \r \r \r \r \r '], map:[0], if:"val.image_count", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <a style="position: absolute; bottom:10px; right:10px; margin: 0; width:32px; height:32px; color: #fff; background-color: rgba(0, 0, 0, 0.25); border-radius:32px; line-height:34px; text-align: center; font-size: 0.7em; font-weight: 300;">\r ', 
"", "\r </a>\r "], map:[0, "image_count", 2], if:"val.image_count>1", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:["\r \r \r </div>\r "], map:[0], if:"val.image_count", else:false}, {data:['\r \r <div class="sticky" style="border-bottom:1px solid #e0e0e0;  background-color: #fff ; top:0px; height:58px; width:100%; z-index: 1; transform: translateZ(1px);"></div>\r \r '], map:[0], if:false, else:false}, {data:['\r <div style="height:5px; "></div>\r '], map:[0], if:"!val.image_count", 
else:false}, {data:['\r \r <table style="height:auto; width:100%; background-color: #eaecef; table-layout: fixed; position: relative; z-index: 0;">\r <tr>\r <td style="text-align: left; height: 50px; padding:20px 15px 15px 15px; font-weight: 400; font-size: 14px; line-height: 20px">\r <span style="text-align: center; font-weight: 400; line-height:25px; font-size: 23px; color: rgb(21, 26, 41);">', "", '</span>\r </td>\r </tr>\r <tr><td style="height: 5px"></td></tr>\r <tr>\r <td>\r <div style="height: 20px; padding:5px 15px 0 15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 12px">Time</div>\r <table style="width:100%; background-color: #fff; position: relative; padding:15px; font-size: 17px; font-weight: 400; line-height: 15px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r <tr style="border-bottom:1px solid rgb(205, 211, 229)">\r <td style="position: relative; padding:15px; line-height: 15px; width: 32px; height: 40px">\r <img src="img/1/icon-calendar-time.png" srcset="img/2/icon-calendar-time.png 2x, img/3/icon-calendar-time.png 3x" style="width:25px; margin-right: 10px">\r </td>\r \r <td style="position: relative; padding:15px 0; line-height: 15px; width: auto; white-space: nowrap">\r '], 
map:[0, "title", 2], if:false, else:false}, {data:["\r ", "", " ", "", "<br>\r "], map:[0, "startTime", 2, "startTimeAM", 4], if:"!val.allday", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:["\r All-Day<br>\r "], map:[0], if:"val.allday", else:false}, {data:['\r <span style="font-size: 11px; font-weight: 300; color: #ccc;">', "", '</span>\r </td>\r <td style="position: relative; padding:15px 0 15px 0; line-height: 15px; width: 30px; min-width: 30px; white-space: nowrap; text-align: center">\r '], 
map:[0, "startDate", 2], if:false, else:false}, {data:["\r -<br>\r "], map:[0], if:"val.endDate&&val.moreday", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:["\r <br>\r "], map:[0], if:"!val.allday&&val.endDate", else:false}, {data:['\r </td>\r <td style="position: relative; padding:15px 0; line-height: 15px; width: auto; white-space: nowrap">\r '], map:[0], if:false, else:false}, {data:["\r ", "", " ", "", "<br>\r "], map:[0, "endTime", 2, "endTimeAM", 4], if:"!val.allday&&val.endDate", 
else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:["\r <br>\r "], map:[0], if:"val.allday&&val.endDate||!val.moreday", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:['\r Open End<br>\r <span style="font-size: 11px; font-weight: 300; color: #ccc;">&nbsp;</span>\r '], map:[0], if:"!val.endDate", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:['\r <span style="font-size: 11px; font-weight: 300; color: #ccc;">', "", "</span>\r "], map:[0, 
"endDate", 2], if:"val.endDate&&val.moreday", else:false}, {data:["\r \r "], map:[0], if:false, else:false}, {data:['\r <span style="font-size: 11px; font-weight: 300; color: #ccc;">&nbsp;</span>\r '], map:[0], if:"val.moreday||!val.endDate", else:false}, {data:['\r </td>\r <td style="width: 50%;"></td>\r </tr>\r '], map:[0], if:false, else:false}, {data:['\r <tr style="border-bottom:1px solid rgb(205, 211, 229); display: none">\r <td style="position: relative; padding:15px; line-height: 15px; height: 40px">\r <img src="img/1/icon-calendar-alert.png" srcset="img/2/icon-calendar-alert.png 2x, img/3/icon-calendar-alert.png 3x" style="width:25px">\r </td>\r <td colspan="4">\r <div style="position: relative; white-space: nowrap; overflow: hidden; color: #ddd; font-size: 16px; font-weight: 300; letter-spacing: -1px; height: 31px">\r <div style="position: absolute; right:0px; top:0px; bottom:0px; width:100px; background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); pointer-events: none; z-index: 1"></div>\r <div class="option-slot-wrapper" style="position: absolute; top:0px; bottom:0px; right:0px; left:-5px; overflow-x: auto; padding-right: 100px; height: 60px; width: 100%; z-index: 0; white-space: nowrap" data-use-native-scrolling="true">\r <table style="width:775px; background-color: #fff; table-layout: fixed; padding:15px; line-height: 15px; text-align: center; white-space: nowrap">\r <tr>\r <td id="slot-alerts" data-id="', 
"", '">\r <div class="option-slot-alert">5m</div>\r <div class="option-slot-alert">15m</div>\r <div class="option-slot-alert">30m</div>\r <div class="option-slot-alert">1h</div>\r <div class="option-slot-alert">2h</div>\r <div class="option-slot-alert">12h</div>\r <div class="option-slot-alert">1d</div>\r <div class="option-slot-alert">3d</div>\r <div class="option-slot-alert">1w</div>\r </td>\r </tr>\r </table>\r </div>\r </div>\r </td>\r </tr>\r '], map:[0, "id", 2], if:"val.ownSlot", else:false}, 
{data:["\r </table>\r </td>\r </tr>\r "], map:[0], if:false, else:false}, {data:['\r <tr><td style="height: 20px">&ensp;</td></tr>\r <tr>\r <td>\r <div style="height: 20px; padding:5px 15px 0 15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 12px">Location</div>\r <div style="position: relative; background-color: #fff; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r <table style="width:100%; background-color: #fff; table-layout: fixed; position: relative; padding:0px 5px; font-size: 17px; font-weight: 300; line-height: 15px;">\r <tr>\r <td style="position: relative; padding:15px; line-height: 15px; width: 32px; height: 20px">\r <img src="img/1/icon-calendar-location.png" srcset="img/2/icon-calendar-location.png 2x, img/3/icon-calendar-location.png 3x" style="width:25px;">\r </td>\r <td style="position: relative; padding:15px 10px 15px 0; line-height: 22px; width: 100%; white-space: normal;">\r ', 
"", "\r </td>\r </tr>\r </table>\r "], map:[0, "location.name", 2], if:"val.location&&val.location.name", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div style="border-radius: 4px; overflow: hidden; width:auto; padding:0px 15px 15px 15px; position: relative">\r <img class="slot-card-location" id="location_', "", '" style="border:0; border-radius: 4px; width:100%; height:auto; margin:0; padding:0;" src="', "", '">\r </div>\r '], map:[0, "location.id", 2, "staticMapUrl", 
4], if:"val.location&&val.location.latitude", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div class="clear"></div>\r </div>\r </td>\r </tr>\r '], map:[0], if:"val.location&&val.location.name", else:false}, {data:['\r <tr><td style="height: 20px">&ensp;</td></tr>\r <tr>\r <td style="color: rgb(153, 155, 161); font-size: 12px; position: relative">\r <div style="height: 20px; padding:5px 15px 0 15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 12px">Attendees</div>\r <div style="position: relative; background-color: #fff; padding:15px 0 15px 15px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r '], 
map:[0]}, {include:"view/user/follower"}, {data:['\r </div>\r <div class="clear"></div>\r </td>\r </tr>\r <tr><td style="height: 20px">&ensp;</td></tr>\r '], map:[0], if:false, else:false}, {data:['\r <tr>\r <td>\r <div style="height: 20px; padding:5px 15px 0 15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 12px">Description</div>\r <div style="position: relative; background-color: #fff; padding:15px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229); color: rgb(21, 26, 41); font-size: 15px; line-height: 20px; font-weight: 300">\r ', 
"", '\r </div>\r <div class="clear"></div>\r </td>\r </tr>\r <tr><td style="height: 20px">&ensp;</td></tr>\r '], map:[0, "description", 2], if:"val.description", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <tr>\r <td style="color: rgb(153, 155, 161); font-size: 12px; vertical-align: top">\r <div style="height: 20px; padding:5px 15px 0 15px; text-transform: uppercase; color: rgb(153, 155, 161); font-size: 12px">Calendar</div>\r <div style="position: relative; background-color: #fff; padding:15px; border-top:1px solid rgb(205, 211, 229); border-bottom:1px solid rgb(205, 211, 229)">\r '], 
map:[0], if:"val.firstGroup", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <div style="float: right; height:28px; width:auto; border-radius:4px; background: linear-gradient(to right bottom, rgb(37, 185, 204), rgb(30, 68, 219)); text-align: center; line-height: 27px; position: relative; top:-2px; right:5px; padding: 1px 8px 0 8px; color: #fff">Follow</div>\r '], map:[0], if:"val.firstGroup&&!val.myslot&&!val.firstGroup.isMember", else:false}, {data:["\r "], map:[0], if:false, 
else:false}, {data:['\r <b class="link-to-group-slots" id="group_', "", '" style="font-size: 16px; font-weight: 300; color: rgb(21, 26, 41)">', "", '</b><br>\r </div>\r <div class="clear"></div>\r <br>\r </td>\r </tr>\r '], map:[0, "firstGroup.id", 2, "firstGroup.name", 4], if:"val.firstGroup", else:false}, {data:['\r \r \r </table>\r \r </div>\r <div style="height:48px; width:100%; position:absolute; text-align: left; line-height:11px; bottom:0px; left:0px; right:0px; background-color: rgb(245, 248, 251); border-top:1px solid #e0e0e0;">\r <table style="position: relative; width: 100%; height: 48px; font-size: 10px; font-weight: 300; white-space: nowrap">\r <tr>\r <td style="height: 48px; width: 40px; min-width: 40px; text-align: center">\r \r <img class="user-image-small current-user-image" src="" style="border-radius: 100%; width: 28px; height:28px; padding:0; margin:0 15px; float:none;">\r </td>\r <td style="width: 99%; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px;">\r <table style="width:100%; position: relative">\r <tr class="slot-content-off" id="social_', 
"", '">\r <td style="width: 99%; text-align: left; height: 28px; padding:1px 15px 1px 0px; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px;">\r Write a comment ...\r </td>\r '], map:[0, "id", 2], if:false, else:false}, {data:['\r <td class="slot-card-socials" id="social_', "", '" style="height: 49px; width: auto; text-align: center; display: table-cell; white-space: nowrap">\r <img src="img/1/icon-comment-2.png" srcset="img/2/icon-comment-2.png 2x, img/3/icon-comment-2.png 3x" style="height: 20px; padding-left: 5px; display: block">\r </td>\r <td class="slot-card-socials" id="social_', 
"", '" style="font-size: 12px; height: 49px; width: auto; text-align: center; display: table-cell; white-space: nowrap">\r &ensp;<span style="color:#8b8d94; padding-right:5px;">', "", "</span>\r &ensp;\r </td>\r "], map:[0, "id", 2, "id", 4, "commentsCounter", 6], if:"val.commentsCounter", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <td class="slot-card-socials" id="social_', "", '" style="height: 49px; width: auto; text-align: center; display: table-cell; white-space: nowrap">\r <img src="img/1/icon-heart.png" srcset="img/2/icon-heart.png 2x, img/3/icon-heart.png 3x" style="height: 20px; display: block">\r </td>\r <td class="slot-card-socials" id="social_', 
"", '" style="font-size: 12px; height: 49px; width: auto; text-align: center; display: table-cell; white-space: nowrap">\r &ensp;<span style="color:#8b8d94; padding-right:5px;">', "", "</span>\r &ensp;\r </td>\r "], map:[0, "id", 2, "id", 4, "likes", 6], if:"val.likes", else:false}, {data:['\r </tr>\r <tr class="slot-content-on" style="display: none">\r <td style="text-align: left; height: 28px; padding:1px 15px 1px 0px; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px;">\r <div class="icon-remove-content" style="width:19px; height:19px; background-color: #d0d1d4; border-radius:100%; margin-top:9px; position: absolute; right:15px; z-index: 1"></div>\r <input type="text" data-attr="comment" value="" style="border:0; margin:0; padding:0; outline:none; width:90%; background-color: #f6f7fb">\r </td>\r </tr>\r </table>\r </td>\r </tr>\r \r </table>\r </div>\r </div>\r '], 
map:[0], if:false, else:false}], "view/slot/social":[{data:['<div class="slot-view" style="position:absolute; top:0; bottom:48px; left:0; right:0; width:100%; overflow: hidden">\r <table style="position:absolute; top:10px; right:0px; left:0px; bottom:10px; height:100%; width:100%; overflow: hidden; table-layout: fixed">\r <tbody>\r \r <tr>\r <td style="height: 100%;">\r <div style="position:relative; width:100%; height:100%; overflow-y:auto; -webkit-overflow-scrolling: touch;">\r '], map:[0], if:false, 
else:false}, {data:['\r <table style="width:100%; height:auto;">\r '], map:[0], if:"val.comments.length", else:false}, {data:["\r "], map:[0], "loop":false}, {data:['\r <tr>\r <td style="vertical-align:top; padding: 15px 5px 10px 5px; width:50px;">\r <img class="social-view-user" src="', "", '" id="user_', "", '" style="width:32px; height:32px; border-radius:100%; padding:0; margin:0 10px 10px 10px" lazyload>\r </td>\r <td style="vertical-align:top; padding: 15px 15px 10px 5px; line-height: 15px;">\r <div class="slot-card-user-name" style="font-size: 14px; line-height: 12px"><b>', 
"", '</b></div>\r <div class="slot-card-user-name" style="font-size: 14px; line-height: 18px; font-weight: 300; padding: 5px 0 10px 0">', "", '</div>\r <div class="slot-card-user-name" style="font-size: 10px; line-height: 10px; font-weight: 300; color: #a8a8a8">', "", "</div>\r </td>\r </tr>\r "], map:[0, "commenter.thumb", 2, "commenter.id", 4, "commenter.username", 6, "content", 8, "createdAt", 10], "loop":"comments"}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r </table>\r <div style="height: 10px"></div>\r '], 
map:[0], if:"val.comments.length", else:false}, {data:['\r </div>\r </td>\r </tr>\r </tbody>\r </table>\r </div>\r <div style="height:48px; width:100%; position:absolute; text-align: left; line-height:11px; bottom:0px; left:0px; right:0px; ">\r <table style="position: relative; width: 100%; height: 48px; font-size: 10px; font-weight: 300; white-space: nowrap">\r <tr>\r \r <td style="width: 100%; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px;">\r <table style="width:100%; position: relative">\r <tr class="slot-content-off">\r <td style="width: 99%; text-align: left; height: 28px; padding:1px 15px 1px 15px; color: #b3b3b3; font-weight: 300; font-size: 16px; line-height: 28px;">\r Write a comment ...\r </td>\r \r </tr>\r <tr class="slot-content-on" style="display: none">\r <td style="text-align: left; height: 28px; padding:1px 15px 1px 15px; color: #d0d1d4; font-weight: 300; font-size: 16px; line-height: 28px;">\r <div class="icon-remove-content" style="width:19px; height:19px; background-color: #d0d1d4; border-radius:100%; margin-top:9px; position: absolute; right:15px; z-index: 1"></div>\r <input type="text" data-attr="comment" value="" style="border:0; margin:0; padding:0; outline:none; width:90%;">\r </td>\r </tr>\r </table>\r </td>\r <td style="padding-right: 10px; font-weight: 300; font-size: 14px;">\r <div class="slot-create-comment" style="height:28px; width:auto; border-radius:4px; background: linear-gradient(to right bottom,#25b9cc,#1e44db); text-align: center; line-height: 27px; margin-right: 0px; display: inline-block; padding: 0px; color: #fff">&ensp;Send&ensp;</div>\r </td>\r </tr>\r </table>\r </div>\r '], 
map:[0], if:false, else:false}], "view/suite/test":[{data:['<div id="test_id1"><div id="test_id2"><div id="test_id3"><span class="test_class3">', "", '</span><span class="test_class1">', "", '</span><span class="test_class2">', "", '</span><span class="test_class3">', "", '</span><span class="test_class2">', "", '</span><span class="test_class2">', "", '</span><span class="test_class1">', "", '</span><span class="test_class3">', "", '</span><span class="test_class1">', "", '</span><span class="test_class2">', 
"", '</span><span class="test_class2">', "", '</span><span class="test_class3">', "", '</span><span class="test_class2">', "", '</span><span class="test_class3">', "", '</span><span class="test_class1">', "", '</span><span class="test_class2">', "", '</span><div id="user"></div></div></div></div> '], map:[0, "id", 2, "title", 4, "startDate", 6, "endDate", 8, "createdAt", 10, "updatedAt", 12, "commentsCounter", 14, "likes", 16, "reslotsCounter", 18, "creator", 20, "location", 22, "media", 24, "notes", 
26, "settings", 28, "slotter", 30, "visibility", 32], if:false, else:false}], "view/user/follower":[{data:['<div style="position: relative; overflow: hidden;'], map:[0], if:false, else:false}, {data:[" height: 85px;"], map:[0], if:"val.newitem", else:false}, {data:[" height: 115px;"], map:[0], if:"!val.newitem", else:false}, {data:['">\r \r <div class="slot-attendees" style="position: absolute; top:0px; bottom:0px; right:0px; left:0px; overflow-x: auto; height: 160px; z-index: 0; -webkit-overflow-scrolling: touch;" data-use-native-scrolling="true">\r <table style="width:auto; table-layout: fixed; padding:15px; margin-right: 100px; font-size: 17px; font-weight: 400; line-height: 15px; text-align: center">\r <tr>\r '], 
map:[0], if:false, else:false}, {data:['\r <td>\r <div class="icon-search-people slot-create-add-user" style="display: inline-block; width:70px; height:70px; border-radius:70px;"></div>\r </td>\r <td>&emsp;</td>\r '], map:[0], if:"val.myslot&&!val.newitem", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <td>\r <div class="user-image-small" id="user_', "", '" style="position: relative; display: inline-block; width:70px; height:70px; border-radius:70px; background-image: url(', 
"", '); background-size: cover; background-position: center center; background-repeat: no-repeat;">\r \r </div>\r </td>\r <td>&emsp;</td>\r '], map:[0, "creator.id", 2, "creator.thumb", 4], if:"val.creator&&!val.newitem", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <td>\r <div class="user-image-small" id="user_', "", '" style="position: relative; display: inline-block; width:70px; height:70px; border-radius:70px; background-image: url(', "", '); background-size: cover; background-position: center center; background-repeat: no-repeat;">\r \r </div>\r </td>\r <td>&emsp;</td>\r '], 
map:[0, "owner.id", 2, "owner.thumb", 4], if:"val.owner&&!val.newitem", else:false}, {data:["\r "], map:[0], "loop":false}, {data:['\r <td>\r <div class="user-image-small" id="user_', "", '" style="position: relative; display: inline-block; width:70px; height:70px; border-radius:70px; background-image: url(', "", '); background-size: cover; background-position: center center; background-repeat: no-repeat;">\r <div class="icon-remove-content remove-tagged-user" style="position: absolute; top:-2px; right:-2px; width:19px; height:19px; background-color: #d0d1d4; border-radius:100%; border:2px solid #fff"></div>\r <div class="icon-slot-member" style="position: absolute; bottom:0px; right:0px; width:24px; height:24px; "></div>\r </div>\r </td>\r <td>&emsp;</td>\r '], 
map:[0, "id", 2, "thumb", 4], "loop":"taggedUser"}, {data:['\r <td>&emsp;</td>\r \r </tr>\r <tr class="slot-attendees-title" style="color: rgb(21, 26, 41); font-size: 13px; font-weight: 400">\r '], map:[0], if:false, else:false}, {data:['\r <td style="width:70px; max-width:70px; text-align: center; vertical-align: top" class="slot-create-add-user"><br>Add<br>Contacts</td>\r <td style="width: 20px"></td>\r '], map:[0], if:"val.myslot&&!val.newitem", else:false}, {data:["\r "], map:[0], if:false, else:false}, 
{data:['\r <td style="width:70px; max-width:70px; text-align: center; vertical-align: top; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"><br>', "", '<br><span style="font-size: 10px; color:#ccc">(Owner)</span></td>\r <td style="width: 20px"></td>\r '], map:[0, "owner.username", 2], if:"val.owner&&!val.newitem", else:false}, {data:["\r "], map:[0], if:false, else:false}, {data:['\r <td style="width:70px; max-width:70px; text-align: center; vertical-align: top; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"><br>', 
"", '<br><span style="font-size: 10px; color:#ccc">(Creator)</span></td>\r <td style="width: 20px"></td>\r '], map:[0, "creator.username", 2], if:"val.creator&&!val.newitem", else:false}, {data:["\r "], map:[0], "loop":false}, {data:['\r <td style="width:70px; max-width:70px; text-align: center; vertical-align: top"><br>', "", '</td>\r <td style="width: 20px"></td>\r '], map:[0, "username_2_lines", 2], "loop":"taggedUser"}, {data:["\r \r </tr>\r </table>\r </div>\r </div>\r "], map:[0], if:false, 
else:false}], "view/user/list":[{data:['<div class="slot-view" style="width:100%; background-color: #fff">\r <div style="text-align: center">\r <div class="slot-view-image-layer" style="background-image:url(', "", ');" id="slot_', "", '"></div>\r </div>\r <div style="text-align: center; vertical-align: top">\r <div class="slot-view-info-layer">\r <div class="slot-view-title">\r ', "", "\r </div>\r </div>\r </div>\r </div>\r "], map:[0, "image_url", 2, "id", 4, "username", 6], if:false, else:false}], 
"view/user/search":[{data:['<table style="table-layout: fixed; width: 100%; position: relative;">\r <tr style="border-bottom:1px solid  #d8dbe5">\r <td style="width: 65px; height: 63px; text-align: left">\r <div class="slot-card-user-layer user-image-small" id="user_', "", '" style="height: 52px; display: inline-block; padding-left: 0px">\r <img src="', "", '" style="padding:0; margin:0 0 0 5px;">\r </div>\r </td>\r <td style="width: 99%">\r <div class="user-image-small" id="user_', "", '">\r <div class="slot-card-user-name" style="line-height: 16px; vertical-align: middle; font-size: 16px; font-weight: 300; color: rgb(21, 26, 41); text-overflow:ellipsis; overflow: hidden; white-space: nowrap">', 
"", '</div>\r \r </div>\r </td>\r <td class="link-to-follow-user'], map:[0, "id", 2, "thumb", 4, "id", 6, "username", 8], if:false, else:false}, {data:[" stranger"], map:[0], if:"!val.friendshipState||val.friendshipState==='stranger'||val.friendshipState==='pending_passive'", else:false}, {data:[" friend"], map:[0], if:"val.friendshipState==='friend'||val.friendshipState==='pending_active'", else:false}, {data:['" id="user_', "", '" style="width: 76px; text-align: right;">\r <div style="height:28px; width:46px; border-radius:4px; background: linear-gradient(to right bottom,#25b9cc,#1e44db); text-align: center; line-height: 27px; margin-right: 0px; display: inline-block; padding: 1px 0px 0 0px; ">\r <img src="img/1/icon-add-user-plus.png" srcset="img/2/icon-add-user-plus.png 2x, img/3/icon-add-user-plus.png 3x" style="height: 10px">&nbsp;\r <img src="img/1/icon-add-user-human.png" srcset="img/2/icon-add-user-human.png 2x, img/3/icon-add-user-human.png 3x" style="height: 13px">\r </div>\r <div style="height:28px; width:46px; border-radius:4px; border:1px solid #ccc; ; text-align: center; line-height: 27px; margin-right: 0px; position: relative; display: none; padding: 1px 0px 0 0px;">\r <img src="img/1/icon-delete-user.png" srcset="img/2/icon-delete-user.png 2x, img/3/icon-delete-user.png 3x" style="width: 10px">&nbsp;\r <img src="img/1/icon-add-user-human-soft.png" srcset="img/2/icon-add-user-human-soft.png 2x, img/3/icon-add-user-human-soft.png 3x" style="height: 13px">\r </div>\r </td>\r </tr>\r </table>\r '], 
map:[0, "id", 2], if:false, else:false}], "view/user/select":[{data:['<table class="user-select" style="table-layout: fixed; width: 95%; margin-left:15px">\r <tr style="border-bottom:1px solid rgb(228, 231, 242)">\r <td style="width:60px; text-align: left">\r <div class="user-view-image-layer" style="background-image:url(', "", '); width: 44px; height:44px; border-radius:100%;" id="user_', "", '"></div>\r </td>\r <td style="padding: 20px 0; text-align: left; font-size: 17px; line-height: 18px; font-weight: 300; color: rgb(21, 26, 41)">\r ', 
"", '\r </td>\r <td id="check_', "", '" class="check-sidebar'], map:[0, "thumb", 2, "id", 4, "username", 6, "id", 8], if:false, else:false}, {data:[" active"], map:[0], if:"val.selected", else:false}, {data:['" style="text-align: center; width: 50px"><div style="width:22px; height:22px; border-radius:4px; border:1px solid rgba(0, 0, 0, 0.25); margin:10px auto"></div></td>\r </tr>\r </table>\r '], map:[0], if:false, else:false}], "view/user/show":[{data:['<div class="viewport slot-view" style="height:100%; width:100%; table-layout: fixed; position:absolute; top:0; bottom:0; left:0; right:0; background-color: #eaecef">\r \r \r <div style="height: 7%"></div>\r <div class="user-view-image-layer" style="text-align: center; background-image:url(', 
"", '); float:right; height:105px; width:105px; border-radius:105px; margin:-15px 20px 0 20px"></div>\r \r <div style="text-align: left; vertical-align: top; margin-left:20px; color: rgb(21, 26, 41); width: 55%">\r <div class="user-view-title" style="font-size: 26px; line-height: 30px; font-weight: 700;">\r ', "", '\r </div>\r <div style="font-size: 13px; line-height: 16px; font-weight: 300; padding-bottom:10px; border-bottom:1px solid #e0e1e5">\r '], map:[0, "image", 2, "username", 4], if:false, 
else:false}, {data:["\r ", "", "\r "], map:[0, "description", 2], if:"val.description", else:false}, {data:['\r \r </div>\r <div style="font-size: 13px; font-weight: 700; padding-top:10px; color: #7f828a;">\r <span id="friendlist_0">', "", '</span> Follower\r &emsp;\r <span id="slotlist_0">', "", "</span> Slots\r </div>\r </div>\r \r <br><br>\r \r "], map:[0, "friendsCount", 2, "slotCount", 4]}, {include:"view/group/slotgroup"}, {data:['\r \r <div id="slotgroup-content" style="position: relative"></div>\r \r \r \r \r \r \r \r \r \r \r \r \r \r \r \r </div>\r '], 
map:[0], if:false, else:false}], "view/user/sidebar":[{data:['<table class="card" style="table-layout: fixed; background-color: rgba(255, 255, 255, 0.03); color:#fff; margin:0; padding:0; border-bottom:none; border-top: 1px solid rgba(255, 255, 255, 0.07)">\r <tr>\r <td class="link-to-user-slots card-title" id="user_', "", '" style="padding:12px 0; width: 60px">\r <div style="margin-left:15px; width:35px; height:35px; border-radius:100%; background-image:url(', "", '); background-size: cover; background-position: center center; background-repeat: no-repeat"></div>\r </td>\r <td style="width: 60%; font-weight: 300; line-height:125%;">\r <span class="link-to-user-slots" id="user_', 
"", '">', "", "</span>\r "], map:[0, "id", 2, "thumb", 4, "id", 6, "username", 8], if:false, else:false}, {data:['\r <br>\r <span style="font-size: 0.8em; color: rgba(255, 255, 255, 0.34); font-weight: 300">', "", " Slots</span>\r "], map:[0, "slotCount", 2], if:"val.slotCount", else:false}, {data:['\r </td>\r <td id="check_', "", '" class="_check-sidebar_" style="text-align: center; width: 50px"><div style="visibility:hidden; width:22px; height:22px; border-radius:4px; border:1px solid rgba(255, 255, 255, 0.25); margin:10px auto"></div></td>\r <td id="user_', 
"", '" class="icon-sidebar-more-user" style="width: 40px">\r <div></div>\r </td>\r </tr>\r </table>\r '], map:[0, "index", 2, "id", 4], if:false, else:false}]};












(function() {
  var onload_already_triggered = false;
  var window_onload = function() {
    if (onload_already_triggered) {
      return;
    } else {
      onload_already_triggered = true;
    }
    APP.INIT();
    CORE.stack([initialize_settings, initialize_storage, initialize_app, initialize_config, initialize_debug, initialize_layout, initialize_translations, initialize_views, initialize_events, initialize_models, runApp, function() {
      runApp = null;
    }]);
  };
  if (CORE.System.isCordova) {
    document.addEventListener("deviceready", window_onload, false);
  } else {
    window.addEventListener("load", window_onload, false);
    document.addEventListener("ready", window_onload, false);
  }
  /** @type {(function()|number|null)} */ var runApp = function() {
    if (APP.CONFIG.PROC) {
      return CORE.async(/** @type {Function} */ (runApp));
    }
    if (DEBUG) {
      CORE.console.log("App initialized successfully.");
    }
    APP.MAIN();
    if (CORE.System.isCordova) {
      document.removeEventListener("deviceready", window_onload);
    } else {
      document.removeEventListener("ready", window_onload);
      window.removeEventListener("load", window_onload);
    }
    APP.INIT = null;
    APP.SETUP = null;
    APP.MAIN = null;
    initialize_settings = null;
    initialize_storage = null;
    initialize_app = null;
    initialize_config = null;
    initialize_debug = null;
    initialize_layout = null;
    initialize_translations = null;
    initialize_views = null;
    initialize_events = null;
    initialize_models = null;
    window_onload = null;
  };
  /** @type {(Function|null)} */ var initialize_settings = function() {
    if (DEBUG) {
      CORE.console.log("Initialize Settings");
    }
    /** @type {_storage_interface} */ (APP.SETTINGS = new CORE.Storage("app_settings"));
    /** @type {_storage_interface} */ (APP.STORAGE.VIEW = new CORE.Storage("app_view"));
  };
  /** @type {(Function|null)} */ var initialize_app = function() {
    if (DEBUG) {
      CORE.console.log("Initialize App");
      if (CONFIG.SHOW_DEBUG) {
        CORE.setStyle("#debug-log", "display", "block");
        CORE.setStyle("#debug-stats", "display", "block");
      }
    }
    if (CONFIG.RACK === "webapp") {
      CORE.async(function() {
        var applicationCache = window["applicationCache"];
        if (applicationCache) {
          if (DEBUG) {
            CORE.console.log("Check Update (ApplicationCache), Status: " + applicationCache["status"]);
          }
          applicationCache.addEventListener("updateready", function() {
            if (applicationCache["status"] === applicationCache["UPDATEREADY"]) {
              applicationCache["swapCache"]();
              APP.LAYOUT.show_confirmation("A new update of this app was installed successfully. Restart app to take effect changes?", function() {
                if (APP.HANDLER["app_update"]) {
                  APP.HANDLER["app_update"]();
                }
                window.location.reload();
              });
            } else {
              if (DEBUG) {
                CORE.console.log("Status ApplicationCache: " + applicationCache["status"]);
              }
            }
          }, false);
          try {
            applicationCache["update"]();
          } catch (e) {
          }
        }
      });
    }
  };
  /** @type {(Function|null)} */ var initialize_config = function() {
    if (DEBUG) {
      CORE.console.log("Initialize Config");
    }
    APP.CONFIG.LANG = (navigator.language || navigator["userLanguage"] || "en").substring(0, 2);
  };
  /** @type {(Function|null)} */ var initialize_debug = function() {
    if (DEBUG) {
      if (DEBUG) {
        CORE.console.log("Initialize Debug");
      }
      if (window["applicationCache"]) {
        var logEvent = function(event) {
          if (DEBUG) {
            CORE.console.log(event.type);
          }
        };
        var applicationCacheEvents = ["checking", "noupdate", "downloading", "cached", "updateready", "obsolete", "error"];
        for (var i = 0; i < applicationCacheEvents.length; i++) {
          window["applicationCache"].addEventListener(applicationCacheEvents[i], logEvent, false);
        }
      }
    }
  };
  /** @type {(Function|null)} */ var initialize_layout = function() {
    if (DEBUG) {
      CORE.console.log("Initialize Layout");
    }
    var definitions = APP.CONFIG.LAYOUT;
    if (/** @type {Array<string>} */ (definitions)) {
      var html = "";
      for (var i = 0; i < definitions.length; i++) {
        if (APP.HTML[definitions[i]]) {
          for (var a = 0; a < APP.HTML[definitions[i]].length; a++) {
            var current = APP.HTML[definitions[i]][a];
            var include = current.include;
            if (include) {
              if (APP.HTML[include]) {
                for (var x = 0; x < APP.HTML[include].length; x++) {
                  if (x === 0) {
                    APP.HTML[definitions[i]][a] = current = APP.HTML[include][x];
                  } else {
                    APP.HTML[definitions[i]].splice(a + x, 0, APP.HTML[include][x]);
                  }
                }
              } else {
                if (APP.VIEW[include]) {
                  for (var x = 0; x < APP.VIEW[include].length; x++) {
                    if (x === 0) {
                      APP.HTML[definitions[i]][a] = current = APP.VIEW[include][x];
                    } else {
                      APP.HTML[definitions[i]].splice(a + x, 0, APP.VIEW[include][x]);
                    }
                  }
                }
              }
            }
            html += current.data[0];
          }
        } else {
          if (DEBUG) {
            CORE.console.warn("Warning: '" + definitions[i] + "' is not defined in 'app/layout/'.");
          }
        }
      }
      delete APP.HTML;
      delete APP.CONFIG.LAYOUT;
      var destination = document.createElement("div");
      CORE.setHTML(destination, html, false);
      for (var i = destination.childNodes.length - 1; i >= 0; i--) {
        document.body.insertBefore(destination.childNodes[i], document.body.childNodes[0]);
      }
      definitions = null;
      html = null;
    }
  };
  /** @type {(Function|null)} */ var initialize_views = function() {
    if (DEBUG) {
      CORE.console.log("Initialize Views");
    }
    var views = APP.VIEW;
    for (var view in views) {
      if (views.hasOwnProperty(view)) {
        var template = views[view];
        for (var i = 0; i < template.length; i++) {
          /** @type {_template_struct} */ var block = template[i];
          if (block.include) {
            for (var x = 0; x < views[block.include].length; x++) {
              if (x === 0) {
                template[i] = views[block.include][x];
              } else {
                template.splice(i + x, 0, views[block.include][x]);
              }
            }
            block = template[i];
          }
          if (block.if && CORE.isType(block.if, "string")) {
            block.if = Function("val", "return (" + block.if + ") ? true : false;");
          }
        }
      }
    }
  };
  /** @type {(Function|null)} */ var initialize_events = function() {
    if (DEBUG) {
      CORE.console.log("Initialize Events");
    }
    try {
      window.addEventListener("test", null, /** @type {?} */ (Object.defineProperty({}, "passive", {"get":function() {
        APP.CONFIG.EVENT_OPTIONS = {"passive":true};
        if (DEBUG) {
          CORE.console.log("Passive Events Supported");
        }
      }})));
    } catch (e) {
    }
    window.addEventListener("hashchange", function(event) {
      var href;
      if (event.newURL.lastIndexOf("#") > -1) {
        href = event.newURL.substring(event.newURL.lastIndexOf("#"));
      } else {
        href = "#/";
      }
      if (href.substring(0, 2) === "#/" || href.substring(0, 2) === "#!") {
        if (APP.ROUTE[href]) {
          var fn, params;
          if (typeof APP.ROUTE[href] === "function") {
            fn = APP.ROUTE[href];
            params = null;
          } else {
            if (APP.ROUTE[href].to) {
              fn = APP.ROUTE[href].to;
              params = APP.ROUTE[href].params;
            } else {
              if (APP.ROUTE[href].do) {
                fn = APP.ROUTE[href].do;
                params = APP.ROUTE[href].params;
              }
            }
          }
          if (fn) {
            fn(params, CORE.query('a[href="' + href + '"]')[0]);
          }
        }
      }
    });
    for (var key in APP.EVENT) {
      if (APP.EVENT.hasOwnProperty(key)) {
        var events = APP.EVENT[key];
        if (!events) {
          continue;
        }
        var node = key === "document" || key === "_document" ? document : key === "body" ? document.body : CORE.getById(key);
        if (!node) {
          if (DEBUG) {
            CORE.console.warn("WARNING: Element " + key + " was missing for binding event.");
          }
          continue;
        }
        if (events) {
          events.length || (events = [events]);
          for (var i = 0; i < events.length; i++) {
            /** @type {_event_struct} */ var event = events[i];
            /** @type {(Function|null)} */ var event_caller = event.to ? function(event) {
              return function(e) {
                APP.CONTROLLER.request(event.to, APP.PAYLOAD[event.to] ? APP.PAYLOAD[event.to].call(this, e) : APP.ROUTE[event.to].params);
              };
            }(event) : CORE.isType(event.do, "string") ? APP.HANDLER[event.do] : event.do || (event.go ? function(event) {
              return function(e) {
                APP.LAYOUT.handleCache(APP.LAYOUT.lastAction = event.go);
              };
            }(event) : void 0);
            if (event.if) {
              var delegateByClass = event.if.charAt(0) === ".";
              var delegateByTagClass = delegateByClass === false && event.if.indexOf(".") > 0;
              if (delegateByTagClass) {
                CORE.on(node, event.if, event.on, event_caller, event.preventDefault, event.stopBubble, event.at || event.go, key);
              } else {
                CORE.on(node, event.if, event.on, event_caller, event.preventDefault, event.stopBubble, event.at || event.go, key);
              }
            } else {
              CORE.on(node, "", event.on, event_caller, event.preventDefault, event.stopBubble, event.at || event.go, key);
            }
          }
        }
      }
    }
  };
  /** @type {(Function|null)} */ var initialize_translations = function() {
    if (DEBUG) {
      CORE.console.log("Initialize Translations");
    }
    APP.CONTROLLER.changeLanguage(APP.CONFIG.LANG);
  };
  /** @type {(Function|null)} */ var initialize_storage = function() {
    if (DEBUG) {
      CORE.console.log("Load Storage");
    }
  };
  /** @type {(Function|null)} */ var initialize_models = function() {
    if (DEBUG) {
      CORE.console.log("Initialize Models");
    }
  };
  /** @type {(function(number=)|null)} */ var determine_storage_size = function(error) {
    var localStorage = window.localStorage;
    if (localStorage) {
      var minimalFound = APP.SETTINGS.get("localStorageMaxSize");
      if (minimalFound) {
        APP.VARS.MAX_STORAGE = parseInt(minimalFound, 10);
        var t = 0, len;
        for (var x in localStorage) {
          if (localStorage.hasOwnProperty(x)) {
            len = localStorage[x].length;
            if (len) {
              t += (x.length + len) * 2;
            }
          }
        }
        APP.VARS.USED_STORAGE = t;
        if (DEBUG) {
          CORE.console.log("Current Storage Usage: " + (APP.VARS.USED_STORAGE / 1024 / 1024 * 100 | 0) / 100 + " / " + (APP.VARS.MAX_STORAGE / 1024 / 1024 * 100 | 0) / 100 + " Mb (" + (100 / APP.VARS.MAX_STORAGE * APP.VARS.USED_STORAGE * 100 | 0) / 100 + "%)");
        }
        if (APP.VARS.USED_STORAGE >= APP.VARS.MAX_STORAGE) {
          if (DEBUG) {
            CORE.console.warn("WARNING: Max storage limit was reached!");
          }
          localStorage.clear();
        }
        return;
      } else {
        minimalFound = 0;
      }
      var max = 10 * 1024 * 1024, i = 64, string1024 = "", string = "", testKey = "size-test-" + Math.random().toString();
      error || (error = 25e4);
      while (i--) {
        string1024 += 1e16;
      }
      i = max / 1024;
      while (i--) {
        string += string1024;
      }
      i = max;
      (function procLocalStorageMaxSize(localStorage, testKey, string, minimalFound, i, error) {
        if (i > 1 && minimalFound < i - error) {
          try {
            localStorage.setItem(testKey, string.substr(0, i));
            localStorage.removeItem(testKey);
            if (minimalFound < i - error) {
              minimalFound = i;
              i = i * 1.5;
            }
          } catch (e) {
            localStorage.removeItem(testKey);
            i = minimalFound + (i - minimalFound) / 2;
          }
          CORE.async(function() {
            procLocalStorageMaxSize(localStorage, testKey, string, minimalFound, i, error);
          }, 1);
        } else {
          APP.VARS.MAX_STORAGE = minimalFound;
          APP.SETTINGS.set("localStorageMaxSize", "" + minimalFound);
          if (DEBUG) {
            CORE.console.log("Determine LocalStorage Capacity: " + (APP.VARS.MAX_STORAGE / 1024 / 1024 * 100 | 0) / 100 + " Mb");
          }
        }
        if (APP.VARS.USED_STORAGE >= APP.VARS.MAX_STORAGE) {
          if (DEBUG) {
            CORE.console.warn("WARNING: Max storage limit was reached!");
          }
        }
      })(localStorage, testKey, string, minimalFound, i, error);
    }
  };
})();

