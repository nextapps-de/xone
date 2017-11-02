/**!
 * @preserve Xone Javascript Framework (bundle)
 * @version 0.0.600
 * @build 1945664160/499719009
 * @author Thomas Wilkerling
 * @license Apache-2.0
 * @link https://www.npmjs.com/package/xone
 * @link https://github.com/next-apps/xone
 * @tutorial https://next-apps.github.io/xone/
 */


/** @define {string} */ var PLATFORM = "";

/** @const */ var AMD = function() {
  var DEBUG = this.DEBUG || false;
  /** @const @type {Window} */ var window = this;
  /** @const */ var document = window.document || {};
  /** @const */ var body = document.body || {};
  var sources = {};
  /** @type {Object<string,*>} */ var modules = {};
  /** @private @type {Array} */ var cache = [];
  /**
 @private
 @const
 @param {*} val
 @param {*} type
 @return {boolean}
 */
var isType = function(val, type) {
    return typeof val === (type || "undefined");
  };
  /** @const */ var isArrayType = function(val, type) {
    return Object.prototype.toString.call(val) === "[object " + type + "]";
  };
  /** @const */ var isArray = function(val) {
    return isArrayType(val, "Array") || isArrayType(val, "Object");
  };
  var imported = {};
  var moduleCounts = {};
  var require_order = [];
  var js = [];
  /** @const */ var register = function(name, module) {
    this[name] = module;
  };
  /** @const */ var out = function(build_arr, target) {
    if (target === "window" || isType(target, "undefined")) {
      window.open("data:text/plain;charset=utf-8," + encodeURIComponent(build_arr.join("\n")), "ASAP Build", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0");
    } else {
      if (target === "text") {
        return build_arr.join("\n");
      } else {
        if (target === "console") {
          console.log(build_arr.join("\n"));
        } else {
          if (target === "file") {
            var pom = document.createElement("a");
            pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(build_arr.join("\n")));
            pom.setAttribute("download", "build.js");
            pom.style.display = "none";
            body.appendChild(pom);
            pom.click();
            body.removeChild(pom);
          } else {
            if (target === "popup") {
              var pom = document.createElement("pre");
              var style = document.createAttribute("style");
              style.value = "position:absolute;z-index:999999;background-color:#fff;color:#000;width:100%;height:100%;overflow:auto;text-align:left;font:monospace;";
              style.id = "asap-debug";
              pom.setAttributeNode(style);
              pom.innerHTML = build_arr.join("\n");
              body.appendChild(pom);
            }
          }
        }
      }
    }
  };
  /** @const */ var build = function(namespace, _convert) {
    var build_check = {};
    var namespace_requires = [];
    var str_final;
    js[js.length] = "(function(){";
    for (var k = 0; k < require_order.length; k++) {
      var key = require_order[k];
      if (sources.hasOwnProperty(key) || key.indexOf("$$require$$") > -1) {
        var source = sources[key];
        var isPublic = false;
        if (key[0] === "!") {
          key = key.substring(1);
          isPublic = true;
        }
        if (key[0] === "*") {
          key = key.substring(1);
        }
        if (publicList[key]) {
          isPublic = true;
        }
        if (imported[key] || isType(moduleCounts[key], "undefined") && !_convert) {
          continue;
        }
        if (namespace && key.indexOf("$$require$$") === -1 && key.indexOf(namespace + ".") === -1) {
          namespace_requires[namespace_requires.length] = namespace;
          continue;
        }
        var dependencies = source[0];
        var fn = source[1];
        var self = source[2];
        var arr = key.split(".");
        var i = 0, len = arr.length - 1, str = "";
        str_final = "";
        var tmp = imported;
        while (i < len) {
          str += (str ? "." : "") + arr[i];
          if (isType(imported[str], "undefined")) {
            var isPublic2 = publicList[str];
            if (i === 0 && isPublic2) {
              str_final = "var " + arr[i] + ' = window["' + arr[i] + '"]';
            } else {
              if (i > 0 && isPublic2) {
                str_final = "var " + arr[i - 1] + "_" + arr[i] + " = " + arr[i - 1] + '["' + arr[i] + '"]';
              } else {
                str_final = str;
              }
            }
            if (isType(build_check[str], "undefined")) {
              js[js.length] = (str.indexOf(".") > -1 || isPublic2 ? "" : "var ") + str_final + " = {};";
              build_check[str] = true;
            }
            imported[str] = true;
            if (i > 0 && isPublic2) {
              str_final = arr[i - 1] + "_" + arr[i];
            }
          } else {
            str_final = str;
          }
          i += 1;
        }
        build_check[str + (str ? "." : "") + arr[i]] = true;
        imported[str + (str ? "." : "") + arr[i]] = true;
        if (!isPublic) {
          str += (str ? "." : "") + arr[i];
        } else {
          if (i > 1 && isPublic2) {
            str_final = arr[i - 2] + "_" + arr[i - 1];
          }
        }
        if (isType(fn, "undefined")) {
          if (isType(dependencies, "number") || isType(dependencies, "boolean")) {
            js[js.length] = (key.indexOf(".") > -1 || isPublic ? "" : "var ") + (isPublic && i > 0 ? "var " + str_final.replace(/\./g, "_") + "_" + arr[i] + " = " + str_final + '["' + arr[i] + '"]' : key) + " = " + dependencies + ";";
          } else {
            if (isType(dependencies, "string")) {
              js[js.length] = (key.indexOf(".") > -1 || isPublic ? "" : "var ") + (isPublic && i > 0 ? "var " + str_final.replace(/\./g, "_") + "_" + arr[i] + " = " + str_final + '["' + arr[i] + '"]' : key) + ' = "' + dependencies + '";';
            } else {
              if (isArray(dependencies)) {
                js[js.length] = (key.indexOf(".") > -1 || isPublic ? "" : "var ") + (isPublic && i > 0 ? "var " + str_final.replace(/\./g, "_") + "_" + arr[i] + " = " + str_final + '["' + arr[i] + '"]' : key) + " = " + JSON.stringify(dependencies).replace(/\"([^(\")"]+)\":/g, "$1:") + ";";
              } else {
                if (isType(dependencies, "function")) {
                  var fnResultCheck;
                  if (key.indexOf("$$require$$") > -1) {
                    js[js.length] = "(" + dependencies.toString() + "());";
                  } else {
                    js[js.length] = (key.indexOf(".") > -1 || isPublic ? "" : "var ") + (isPublic && i > 0 ? "var " + str_final.replace(/\./g, "_") + "_" + arr[i] + " = " + str_final + '["' + arr[i] + '"]' : key) + " = " + (isType(fnResultCheck = dependencies(), "function") && ((fnResultCheck = fnResultCheck.toString()).indexOf("[native code]") === -1 || fnResultCheck.substring(fnResultCheck.indexOf("{"), fnResultCheck.lastIndexOf("}")).length > 20) ? fnResultCheck : "(" + dependencies.toString() + 
                    "())") + ";";
                  }
                }
              }
            }
          }
        } else {
          if (isType(dependencies, "function")) {
            js[js.length] = (key.indexOf(".") > -1 || isPublic ? "" : "var ") + (isPublic && i > 0 ? "var " + str_final.replace(/\./g, "_") + "_" + arr[i] + " = " + str_final + '["' + arr[i] + '"]' : key) + " = (function(){" + dependencies.toString() + "; }).call(" + fn.toString() + ");";
          } else {
            if (isType(dependencies, "string")) {
              dependencies = [dependencies];
            }
            var requiredModules = [];
            var a = 0, len2 = dependencies.length;
            while (a < len2) {
              if (isType(dependencies[a], "string")) {
                if (!isType(sources["!" + dependencies[a]], "undefined")) {
                  var arr2 = dependencies[a].split(".");
                  var z = 0, len3 = arr2.length - 1, str2 = "";
                  str_final = "";
                  while (z < len3) {
                    str2 += (str2 ? "." : "") + arr2[z];
                    var isPublic2 = publicList[str2];
                    if (i === 0 && isPublic2) {
                      str_final = "var " + arr2[z] + ' = window["' + arr2[z] + '"]';
                    } else {
                      if (i > 0 && isPublic2) {
                        str_final += '["' + arr2[z] + '"]';
                      } else {
                        str_final = str2;
                      }
                    }
                    imported[str2] = true;
                    z += 1;
                  }
                  requiredModules[requiredModules.length] = z > 0 ? str2 + '["' + arr2[z] + '"]' : arr2[z];
                } else {
                  if (publicList[dependencies[a]]) {
                    if (dependencies[a].indexOf(".") > -1) {
                      requiredModules[requiredModules.length] = dependencies[a].substring(0, dependencies[a].lastIndexOf(".")) + "['" + dependencies[a].substring(dependencies[a].lastIndexOf(".") + 1) + "']";
                    } else {
                      requiredModules[requiredModules.length] = "window['" + dependencies[a] + "']";
                    }
                  } else {
                    requiredModules[requiredModules.length] = dependencies[a];
                  }
                }
              } else {
                requiredModules[requiredModules.length] = parseParams(fn)[a];
              }
              a += 1;
            }
            if (isType(self, "undefined")) {
              if (isArray(fn)) {
                js[js.length] = (key.indexOf(".") > -1 || isPublic ? "" : "var ") + (isPublic && i > 0 ? "var " + str_final.replace(/\./g, "_") + "_" + arr[i] + " = " + str_final + '["' + arr[i] + '"]' : key.indexOf(".") === -1 && publicList[key] ? "var " + key + ' = window["' + key + '"]' : key) + " = " + JSON.stringify(fn) + ";";
              } else {
                if (key.indexOf("$$require$$") > -1) {
                  js[js.length] = "(" + fn.toString() + "(" + requiredModules.join(", ") + "));";
                } else {
                  js[js.length] = (key.indexOf(".") > -1 || isPublic ? "" : "var ") + (isPublic && i > 0 ? "var " + str_final.replace(/\./g, "_") + "_" + arr[i] + " = " + str_final + '["' + arr[i] + '"]' : key.indexOf(".") === -1 && publicList[key] ? "var " + key + ' = window["' + key + '"]' : key) + " = (" + fn.toString() + "(" + requiredModules.join(", ").replace(/\./g, "_") + "));";
                }
              }
            } else {
              if (isArray(fn)) {
                js[js.length] = (key.indexOf(".") > -1 || isPublic ? "" : "var ") + (isPublic && i > 0 ? "var " + str_final.replace(/\./g, "_") + "_" + arr[i] + " = " + str_final + '["' + arr[i] + '"]' : key) + " = " + JSON.stringify(fn) + ";";
              } else {
                if (key.indexOf("$$require$$") > -1) {
                  js[js.length] = "(function(){" + fn.toString() + "(" + requiredModules.join(", ") + ");}).call(" + self.toString() + ");";
                } else {
                  js[js.length] = (key.indexOf(".") > -1 || isPublic ? "" : "var ") + (isPublic && i > 0 ? "var " + str_final.replace(/\./g, "_") + "_" + arr[i] + " = " + str_final + '["' + arr[i] + '"]' : key) + "  = (function(){" + fn.toString() + "(" + requiredModules.join(", ").replace(/\./g, "_") + ");}).call(" + self.toString() + ");";
                }
              }
            }
          }
        }
      }
    }
    js[js.length] = "}());";
    return js;
  };
  /** @const */ var convert = function(namespace) {
    require_order = Object.keys(sources);
    return build(namespace, true);
  };
  /** @const */ var debug = function(namespace) {
    imported = {};
    module_tree = {};
    moduleCounts = {};
    require_order = [];
    js = [];
  };
  /** @const */ var parseParams = function(param) {
    if (typeof param === "string") {
      return param.split(".");
    }
    if (typeof param === "function") {
      var x = param.toString();
      var c = x.substring(x.indexOf("(", x.indexOf("function")) + 1);
      c = c.substring(0, c.indexOf(")"));
      return c.match(/([\w_\$\d]+)/g);
    }
    return param;
  };
  /** @const @type {function():boolean} */ var updateCache = function() {
    var a = 0;
    var update_state = false;
    while (a < cache.length) {
      /** @type {string} */ var namespace = cache[a][0];
      var dependencies = cache[a][1];
      var fn = cache[a][2];
      var self = cache[a][3];
      var state = false;
      state = namespace === "" ? require(dependencies, fn, self, false) : define(namespace, dependencies, fn, self, false);
      if (state) {
        console.log("UPDATE: " + namespace);
        cache[a] = null;
        cache.splice(a, 1);
        update_state = true;
      }
      a += 1;
    }
    return update_state;
  };
  /** @const */ var getModule = function(name) {
    return modules[name];
  };
  /** @const */ var addCache = function(namespace, dependencies, fn, self) {
    cache[cache.length] = [namespace, dependencies, fn, self];
  };
  /**
 @const
 @param {string} name
 @param {*} fn
 */
var addModule = function(name, fn) {
    modules[name] = fn;
  };
  var _export = function(fn, target, rename, _update) {
    install(fn, target, "", _update, true);
  };
  /**
 @const
 @param {*=} fn
 @param {*=} target
 @param {*=} rename
 @param {boolean=} _update
 @param {boolean=} _export
 */
var install = function(fn, target, rename, _update, _export) {
    if (fn) {
      if (isType(fn, "string")) {
        fn = [fn];
      }
      var a = 0, len2 = fn.length;
      while (a < len2) {
        last_define = "";
        /** @type {string} */ var cur_fn = fn[a];
        /** @type {Array<string>} */ var arr_modules = cur_fn.split(".");
        /** @type {(*|null)} */ var tmp_module;
        var i = 1, len = arr_modules.length - (_export ? 2 : 1);
        if (!_update) {
          if (target) {
            if (isType(target, "string")) {
              if (target === "window" && len > 0) {
                target = rename || arr_modules[len];
                tmp_module = window[target] || (window[target] = getModule(cur_fn));
              } else {
                tmp_module = window[target] || (window[target] = getModule(cur_fn));
                while (i < len) {
                  tmp_module = tmp_module[arr_modules[i]] || (tmp_module[arr_modules[i]] = {});
                  i++;
                }
              }
            } else {
              if (target === window && len > 0) {
                target = rename || arr_modules[len];
                tmp_module = window[target] || (window[target] = getModule(cur_fn));
              } else {
                tmp_module = target;
                if (!_export) {
                  target = rename || arr_modules[len];
                  tmp_module = tmp_module[target] || (tmp_module[target] = getModule(cur_fn));
                }
              }
            }
          } else {
            tmp_module = window;
            if (!_export) {
              i = 0;
              while (i < len) {
                tmp_module = tmp_module[arr_modules[i]] || (tmp_module[arr_modules[i]] = {});
                i++;
              }
              if (i < len + 1) {
                tmp_module = tmp_module[arr_modules[i]] = getModule(cur_fn);
              }
            }
          }
        } else {
          tmp_module = target;
          if (!_export) {
            i = 0;
            while (i < len) {
              tmp_module = tmp_module[arr_modules[i]] || (tmp_module[arr_modules[i]] = {});
              i++;
            }
            if (i < len + 1) {
              tmp_module = tmp_module[arr_modules[i]] = getModule(rename);
            }
          }
        }
        if (!_update) {
          var keys = Object.keys(modules || {});
          i = 0, len = keys.length;
          while (i < len) {
            if (keys[i].indexOf(cur_fn) > -1 && keys[i] !== cur_fn) {
              install(keys[i].replace(cur_fn + ".", ""), tmp_module, keys[i], true);
            }
            i++;
          }
        }
        a++;
      }
    } else {
      if (last_define) {
        return install(last_define, "");
      }
    }
  };
  var module_tree = window.asap_module_tree = {};
  var addToTree = function(namespace, source) {
    var arr = namespace.split("."), i = 0, len = arr.length;
    var tree = module_tree;
    while (i < len) {
      if (isType(tree[arr[i]], "undefined")) {
        tree = tree[arr[i]] = source;
      } else {
        tree = tree[arr[i]];
      }
      i += 1;
    }
  };
  var updated = {};
  var last_define;
  /**
 @const
 @param {!string} namespace
 @param {*=} dependencies
 @param {Function=} fn
 @param {*=} self
 @param {boolean=} opt_cache
 */
var define = function(namespace, dependencies, fn, self, opt_cache) {
    last_define = namespace;
    if (isType(opt_cache, "undefined")) {
      opt_cache = true;
    }
    var isPublic = false;
    if (isType(namespace, "string")) {
      if (namespace[0] === "!") {
        namespace = namespace.substring(1);
        isPublic = true;
      }
      if (namespace[0] === "*") {
        namespace = namespace.substring(1);
      }
      if (!isType(sources[namespace], "undefined")) {
        for (var key in sources) {
          if (isType(updated[key], "undefined")) {
            if (sources.hasOwnProperty(key)) {
              if (isType(sources[key][0], "string")) {
                if (namespace === sources[key][0]) {
                  console.log("update addon 1: " + key);
                  addCache(key, sources[key][0], sources[key][1], sources[key][2]);
                  updated[key] = true;
                  opt_cache = false;
                }
              } else {
                if (!isType(sources[key][0], "undefined")) {
                  var len = sources[key][0].length;
                  for (var i = 0; i < len; i++) {
                    if (isType(sources[key][0][i], "string")) {
                      if (namespace === sources[key][0][i]) {
                        console.log("update addon 2: " + key);
                        addCache(key, sources[key][0], sources[key][1], sources[key][2]);
                        updated[key] = true;
                        opt_cache = false;
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (typeof dependencies === "function") {
      if (isType(fn, "undefined")) {
        sources[(isPublic ? "!" : "") + namespace] = [dependencies, fn, self];
        require_order[require_order.length] = namespace;
        addModule(namespace, dependencies());
      } else {
        sources[(isPublic ? "!" : "") + namespace] = [dependencies, fn, self];
        require_order[require_order.length] = namespace;
        addModule(namespace, dependencies.call(fn));
      }
    } else {
      if (isType(fn, "undefined")) {
        sources[(isPublic ? "!" : "") + namespace] = [dependencies, fn, self];
        require_order[require_order.length] = namespace;
        if (isType(dependencies, "undefined")) {
          dependencies = null;
        }
        addModule(namespace, dependencies);
      } else {
        if (isType(dependencies, "string")) {
          dependencies = [dependencies];
        }
        var requiredModules = [];
        var i = 0, len = dependencies.length;
        while (i < len) {
          var module = isType(dependencies[i], "string") ? getModule(dependencies[i]) : dependencies[i];
          if (isType(module, "undefined")) {
            console.log("Missing: " + namespace + " => " + dependencies[i]);
            if (opt_cache) {
              addCache(namespace, dependencies, fn, self);
            }
            return false;
          }
          requiredModules[requiredModules.length] = module;
          i += 1;
        }
        sources[(isPublic ? "!" : "") + namespace] = [dependencies, fn, self];
        require_order[require_order.length] = namespace;
        addModule(namespace, fn.apply(isType(self, "undefined") ? this : getModule(self), requiredModules));
        i = 0;
      }
    }
    if (opt_cache && cache.length) {
      while (updateCache()) {
      }
    }
    return this;
  };
  var require_count = 0;
  var publicList = {};
  /**
 @const
 @param {*} dependencies
 @param {Function=} callback
 @param {*=} self
 */
var run = function(dependencies, callback, self) {
    require(dependencies)();
    if (callback) {
      callback();
    }
  };
  /**
 @const
 @param {*} dependencies
 @param {*=} fn
 @param {*=} self
 @param {boolean=} opt_cache
 */
var require = function(dependencies, fn, self, opt_cache) {
    last_define = fn;
    if (isType(opt_cache, "undefined")) {
      opt_cache = true;
    }
    if (isType(dependencies, "string")) {
      if (dependencies[0] === "!") {
        dependencies = dependencies.substring(1);
        publicList[dependencies] = true;
        var tmpStr = dependencies;
        while (tmpStr.indexOf(".") > -1) {
          publicList[tmpStr = tmpStr.substring(0, tmpStr.lastIndexOf("."))] = true;
        }
      }
      if (dependencies[0] === "*") {
        dependencies = dependencies.substring(1);
      }
      if (isType(modules[/** @type {string} */ (dependencies)], "undefined")) {
        if (opt_cache) {
          addCache("", dependencies, fn, self);
        }
        return;
      }
      dependencies = [dependencies];
    }
    var requiredModules = [];
    var i = 0, len = dependencies.length;
    while (i < len) {
      var module;
      if (isType(dependencies[i], "string")) {
        if (dependencies[i].charCodeAt(0) === 33) {
          dependencies[i] = dependencies[i].substring(1);
          publicList[dependencies[i]] = true;
          var tmpStr = dependencies[i];
          while (tmpStr.indexOf(".") > -1) {
            publicList[tmpStr = tmpStr.substring(0, tmpStr.lastIndexOf("."))] = true;
          }
        }
        if (dependencies[i].charCodeAt(0) === 42) {
          dependencies[i] = dependencies[i].substring(1);
        }
        if (moduleCounts[dependencies[i]]) {
          moduleCounts[dependencies[i]]++;
        } else {
          moduleCounts[dependencies[i]] = 1;
        }
        module = getModule(dependencies[i]);
        if (isType(sources[dependencies[i]], "undefined")) {
          console.log("Build Missing: " + dependencies[i]);
          return;
        }
        if ((isType(sources[dependencies[i]][0], "string") || isArrayType(sources[dependencies[i]][0], "Array")) && isType(sources[dependencies[i]][1], "undefined") === false) {
          var nextSources = [];
          if (isType(sources[dependencies[i]][0], "string")) {
            nextSources[nextSources.length] = sources[dependencies[i]][0];
          } else {
            for (var a = 0; a < sources[dependencies[i]][0].length; a++) {
              if (isType(sources[dependencies[i]][0][a], "string")) {
                nextSources[nextSources.length] = sources[dependencies[i]][0][a];
              }
            }
          }
          while (nextSources.length) {
            var nextSource = nextSources.pop();
            if ((isType(sources[nextSource][0], "string") || isArrayType(sources[nextSource][0], "Array")) && isType(sources[nextSource][1], "undefined") === false) {
              if (isType(sources[nextSource][0], "string")) {
                nextSources[nextSources.length] = sources[nextSource][0];
              } else {
                for (var a = 0; a < sources[nextSource][0].length; a++) {
                  if (isType(sources[nextSource][0][a], "string")) {
                    nextSources[nextSources.length] = sources[nextSource][0][a];
                  }
                }
              }
            }
            if (moduleCounts[nextSource]) {
              moduleCounts[nextSource]++;
            } else {
              moduleCounts[nextSource] = 1;
            }
          }
        }
      } else {
        module = dependencies[i];
      }
      if (isType(module, "undefined")) {
        if (opt_cache) {
          addCache("", dependencies, fn, self);
        }
        return;
      }
      requiredModules[i] = module;
      i += 1;
    }
    if (isType(fn, "undefined")) {
      if (dependencies.length === 1) {
        require_order[require_order.length] = dependencies[0];
        if (moduleCounts[dependencies[0]]) {
          moduleCounts[dependencies[0]]++;
        } else {
          moduleCounts[dependencies[0]] = 1;
        }
        return getModule(dependencies[0]);
      } else {
        var return_arr = {};
        for (var a = 0; a < dependencies.length; a++) {
          require_order[require_order.length] = dependencies[a];
          if (moduleCounts[dependencies[a]]) {
            moduleCounts[dependencies[a]]++;
          } else {
            moduleCounts[dependencies[a]] = 1;
          }
          return_arr[dependencies[a]] = getModule(dependencies[a]);
        }
        return return_arr;
      }
    } else {
      if (isType(self, "undefined")) {
        var uid = "$$require$$" + require_count++;
        sources[uid] = [dependencies, fn, self];
        moduleCounts[uid] = 1;
        require_order[require_order.length] = uid;
        var fn_return = fn.apply(this, requiredModules);
        return fn_return;
      } else {
        if (isType(self, "string")) {
          var uid = "$$require$$" + require_count++;
          sources[uid] = [dependencies, fn, self];
          moduleCounts[uid] = 1;
          require_order[require_order.length] = uid;
          var fn_return = fn.apply(getModule(self), requiredModules);
          return fn_return;
        } else {
          var uid = "$$require$$" + require_count++;
          sources[uid] = [dependencies, fn, self];
          moduleCounts[uid] = 1;
          require_order[require_order.length] = uid;
          var fn_return = fn.apply(self, requiredModules);
          return fn_return;
        }
      }
    }
  };
  /**
 @const
 @param {string} namespace
 */
var undefine = function(namespace) {
    define(namespace, void 0);
  };
  /** @const */ var release = function() {
    for (var key in sources) {
      if (sources.hasOwnProperty(key)) {
        for (var a = 0; a < sources[key].length; a++) {
          delete sources[key][a];
        }
        delete sources[key];
      }
    }
    for (var key in modules) {
      if (modules.hasOwnProperty(key)) {
        if (!isType(imported[key], "undefined") || isType(moduleCounts[key], "undefined")) {
          delete modules[key];
        }
      }
    }
    while (cache.length) {
      cache.pop();
    }
  };
  var buildStart = function(dependencies) {
    moduleCounts = {};
    if (dependencies) {
      if (isType(dependencies, "string")) {
        dependencies = [dependencies];
      }
      var keys = Object.keys(sources || {});
      for (var a = 0; a < dependencies.length; a++) {
        var curItem = dependencies[a];
        var isPublic = false;
        if (curItem.substr(curItem.length - 2) === ".*") {
          if (curItem.charCodeAt(0) === 33) {
            curItem = curItem.substr(1);
            isPublic = true;
          }
          dependencies[a] = curItem = curItem.substr(0, curItem.length - 2);
          if (isPublic) {
            for (var i = 0; i < keys.length; i++) {
              if (keys[i].indexOf(curItem + ".") > -1) {
                publicList[keys[i]] = true;
                moduleCounts[keys[i]] = 1;
              }
            }
          }
        }
        var splitArr = curItem.split(".");
        var str = "";
        for (var i = 0; i < splitArr.length; i++) {
          str += (str ? "." : "") + splitArr[i];
          publicList[str] = true;
        }
      }
      require(dependencies);
      console.log(publicList);
    }
  };
  if (DEBUG) {
    window["asap_imported"] = imported;
    window["asap_module_tree"] = module_tree;
    window["asap_sources"] = sources;
    window["asap_modules"] = modules;
    window["asap_cache"] = cache;
    window["asap_moduleCounts"] = moduleCounts;
    window["require_order"] = require_order;
    window["asap_js"] = js;
  }
  /** @const */ return {/** @type {Function} */ define:define, /** @type {Function} */ require:require, /** @type {Function} */ run:run, /** @type {Function} */ install:install, /** @type {Function} */ export:_export, /** @type {Function} */ build:build, /** @type {Function} */ convert:convert, /** @type {Function} */ undefine:undefine, /** @type {Function} */ release:release, /** @type {Function} */ buildStart:buildStart, /** @type {Function} */ debug:debug, /** @type {Function} */ out:out, /** @type {Function} */ register:register};
}();
/** @const */ var define = AMD.define;
/** @const */ var require = AMD.require;


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
    var fn_content = "var $i = 0, $length = $self.length, " + parameter + ";" + "for(; $i < $length; $i++){" + parameter + " = $self[$i];" + parsed_fn[1] + parsed_fn[2] + ";" + "}" + "return $self;";
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
CORE.setText = function setText(node, val) {
    if (DEBUG) {
      GRAPH.register("CORE.setText");
    }
    if (typeof node === "string") {
      node = CORE.query(node);
    }
    if (node.length >= 0) {
      for (var i = 0; i < node.length; i++) {
        CORE.setText(node[i], val);
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
      CORE.setText(node, (APP.LANG[lang || "en"] || APP.LANG["en"])[node.classList ? node.classList[1] : node.className.split(" ")[1]]);
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

APP.HTML = {"layout/app/app":[{data:['<div class="splash"></div>\r '], map:[""], if:false, else:false}], "layout/app/home":[{data:['<table id="home" class="view"><tr><td><div class="home-gradient"></div><div id="goto-pin"><img src="img/logo-light.svg"></div><div class="bottom-left-wrapper"><span class="station-name">Fanmiles Station</span></div><div class="bottom-right-wrapper"><div class="button-green home-button">Check-in</div></div></td></tr></table> '], map:[""], if:false, else:false}], "layout/app/login":[{data:['<div id="login" class="view color-lightgrey"><div class="radial-gradient"></div><div class="wrapper"><table><tr><td colspan="3" style="height: 10%"></td></tr><tr><td class="logo"></td><td class="headline"> Hallo Fanmiles Partner,<br><br> trage hier bitte deine <b>App ID</b> und das <b>App Secret</b> ein,<br> welches du von uns bekommen hast. </td><td></td></tr><tr><td colspan="3" style="height: 10%"></td></tr><tr><td></td><td class="input-wrapper"><br><br><input type="text" placeholder="App ID"><br><br><input type="text" placeholder="App Secret"></td><td style="vertical-align: bottom"><div class="button">Weiter</div><div class="preloader"></div></td></tr><tr><td></td><td><div class="color-orange login-message"><br><br><u>Fehler:</u> Logindaten falsch eingegeben oder ung\u00fcltig.<br>Bitte \u00fcberpr\u00fcfen. </div><div class="color-orange offline-message"><br><br><u>Fehler:</u> Keine Internetverbindung vorhanden.<br>Bitte \u00fcberpr\u00fcfen. </div></td><td></td></tr><tr><td colspan="3" style="height: 100%"></td></tr></table></div></div> '], 
map:[""], if:false, else:false}], "layout/app/pin":[{data:['<div id="pin" class="view color-lightgrey"><div class="radial-gradient"></div><div class="wrapper"><div style="height:1em"></div><div class="headline"> Bitte vierstellige <b>PIN</b> eingeben. </div><div style="height:1.5em"></div>'], map:[0]}, {include:"layout/sale/codepad"}, {data:["</div></div> "], map:[0], if:false, else:false}], "layout/app/sale":[{data:['<div id="sales" class="view color-lightgrey"><div class="radial-gradient"></div><div class="wrapper-left"><div class="headline"> Umgesetzten Betrag eingeben,<br> um die Anzahl der Fanmiles zu bestimmen. </div><div style="height:1em"></div>'], 
map:[0]}, {include:"layout/sale/numpad"}, {data:['</div><div class="wrapper-right">'], map:[0]}, {include:"layout/sale/campaign"}, {data:["</div></div> "], map:[0], if:false, else:false}], "layout/app/setting":[{data:['<div id="settings" class="view color-lightgrey"><div class="radial-gradient"></div><div class="wrapper-left"><table class="table-settings"><tr><td class="menu active" data-view="onboarding">Herzlich Willkommen</td></tr><tr><td style="height: 1px"></td></tr><tr><td class="menu active" data-view="start">Informationen</td></tr><tr><td style="height: 1px"></td></tr><tr><td class="menu" data-view="basic">Allgemeine Einstellungen</td></tr><tr><td style="height: 1px"></td></tr><tr><td class="menu" data-view="sales">Umsatzmodul</td></tr><tr><td style="height: 1px"></td></tr><tr><td class="menu" data-view="checkin">Check-in Modul</td></tr><tr><td style="height: 4%"></td></tr><tr><td class="menu" data-view="impressum">Impressum</td></tr><tr><td style="height: 1px"></td></tr><tr><td class="menu" data-view="privacy">Datenschutz</td></tr><tr><td style="height: 4%"></td></tr><tr><td class="menu" data-view="reset">Werkseinstellungen</td></tr><tr><td style="height: 1px"></td></tr><tr><td class="menu" data-view="logout">Ausloggen</td></tr><tr><td style="height: 100%"></td></tr></table></div><div class="wrapper-right"><div class="wrapper-right-inner"><div id="settings-wrapper-right">'], 
map:[0]}, {include:"view/setting/start"}, {data:['</div><div id="settings-wrapper-submenu"></div><div id="settings-wrapper-submenu-2"></div></div></div><div class="goto-sales"><div class="button button-icon"></div></div><div class="goto-onboarding" style="display: none"><div class="button" style="line-height: 30px">Weiter</div></div></div> '], map:[0], if:false, else:false}], "layout/demo/demo":[{data:['<table id="xone-demo">\r <tr>\r <td>\r <div>xone</div>\r <div>Full Stack Javascript Framework</div>\r </td>\r </tr>\r </table>\r '], 
map:[""], if:false, else:false}], "layout/popup/confirmation":[{data:['<div id="confirmation-wrapper" class="view"><div class="radial-gradient" style="opacity: 0.94"></div><div id="confirmation-inner"><table class="confirmation-table-outer"><tr><td><table><tr><td><div id="confirmation-content"></div><div id="confirmation-yes">Ja</div><div id="confirmation-no">Nein</div></td></tr></table></td></tr></table></div></div> '], map:[""], if:false, else:false}], "layout/popup/status":[{data:['<div id="status" class="view color-lightgrey"></div> '], 
map:[""], if:false, else:false}], "layout/sale/campaign":[{data:['<div class="headline"> Fanmiles direkt gutschreiben oder<br> Kampagnen hinzuf\u00fcgen. </div><div style="height:1em"></div><table class="grid"><tr><td><div class="content-campaign"></div><div style="height: 20px"></div></td></tr><tr><td><div class="numpad numpad-transparent numpad-button numpad-icon col-3 goto-settings-new-campaign">&ensp;Kampagne hinzuf\u00fcgen</div></td></tr><tr><td style="height: 100%"></td></tr></table> '], map:[""], 
if:false, else:false}], "layout/sale/codepad":[{data:['<table class="grid" style="margin: 0 auto"><tr><td colspan="3"><div class="numpad numpad-transparent col-3" style="height: 30px; line-height: 30px"></div><div class="numpad-text" style="padding: 18px 20px 12px; text-align: center; left:0"><div id="pin_code"><table><tr><td></td><td></td><td></td><td></td></tr></table></div></div></td></tr>'], map:[0]}, {include:"layout/sale/pad"}, {data:['</table><div class="bottom-wrapper"><table style="height: auto"><tr><td><div class="numpad numpad-transparent numpad-button numpad-icon goto-home"></div></td><td><div class="goto-pinlost">PIN vergessen?</div><div class="numpad numpad-transparent numpad-button numpad-icon goto-password-repeat"></div></td></tr></table></div> '], 
map:[0], if:false, else:false}], "layout/sale/numpad":[{data:['<table class="grid"><tr><td colspan="3"><div class="numpad numpad-transparent col-3"></div><div class="numpad-text" style="padding: 18px 20px 12px; text-align: right"><div style="font-size: 1.2em; float: right">&ensp;&euro;</div><span id="sales_price">0,00</span></div><div class="numpad-label">Umsatz</div></td><td rowspan="6" style="position: relative; width: 100%;"><div class="numpad-fanmiles-wrapper"><div class="numpad numpad-icon col-2" style="background-image: url(img/icon-earn.svg); background-position: 16px center; padding:15px 0 0 0"></div><div class="numpad-text" style="padding: 8px 20px 12px 60px; text-align: left; left: 0; border:0; font-size: 0.75em;"><div id="sales_miles">0</div></div><div class="numpad-info" style="margin-top: 10px"> Jeder Euro entspricht:<br><b style="font-weight: 300"><span id="sales_rate">10</span> #fanmiles</b><div class="numpad-icon-small goto-settings-sales-rate">Schl\u00fcssel anpassen</div></div><div class="content-campaign"></div><div style="position: absolute; bottom:16px; left:16px; right:16px;"><div class="numpad numpad-button button-green col-2 bignum" data-index="=">Best\u00e4tigen</div></div></div></td></tr>'], 
map:[0]}, {include:"layout/sale/pad"}, {data:['<tr><td class="goto-home" colspan="1"><div class="numpad numpad-transparent numpad-button numpad-icon" style="background-image: url(img/icon-back.svg); background-position: center center"></div></td><td colspan="2"></td><td><div class="numpad numpad-transparent numpad-button numpad-icon goto-settings"></div></td></tr></table> '], map:[0], if:false, else:false}], "layout/sale/pad":[{data:['<tr><td colspan="3" style="height: 15px"></td></tr><tr><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="7">7</div></td><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="8">8</div></td><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="9">9</div></td></tr><tr><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="4">4</div></td><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="5">5</div></td><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="6">6</div></td></tr><tr><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="1">1</div></td><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="2">2</div></td><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="3">3</div></td></tr><tr><td colspan="2"><div class="numpad numpad-filled col-2"></div><div class="numpad-text bignum" data-index="0" style="padding-left: 2.175em;">0</div></td><td><div class="numpad numpad-filled"></div><div class="numpad-text bignum" data-index="-" style="background-image: url(img/icon-delete.svg); background-repeat: no-repeat; background-size: 50%; background-position: center center"></div></td></tr><tr><td colspan="3" style="height: 100%"></td></tr> '], 
map:[""], if:false, else:false}]};

APP.VIEW = {"view/app/status":[{data:['<div class="wrapper"><div class="radial-gradient" style="opacity: 0.94"></div><table><tr><td style="height: 25%"></td></tr><tr><td class="icon" style="background-image: url(img/', "", ')"></td></tr><tr><td style="height: 5%"></td></tr><tr><td class="headline"><b>', "", '</b></td></tr><tr><td style="height: 25%"></td></tr></table></div> '], map:[0, "icon", 2, "message", 4], if:false, else:false}], "view/campaign/edit":[{data:['<input type="text" maxlength="25" value="'], 
map:[0], if:false, else:false}, {data:["", "", ""], map:[0, "campaign.name", 2], if:"val.campaign", else:false}, {data:['" placeholder="Kampagne" style="margin-top: 2em; width: 13em"><input class="button-icon input-fanmiles form-validate" type="number" max="9999999" data-validate-min="1" data-validate-max="9999999" data-validate-type="integer" data-validate-charset="0123456789" value="'], map:[0], if:false, else:false}, {data:["", "", ""], map:[0, "campaign.value", 2], if:"val.campaign", else:false}, 
{data:['" placeholder="Fanmiles" style="margin-right: 0.5em"><input class="button-icon input-fanmiles form-validate" type="number" max="1000" data-validate-min="1" data-validate-max="1000" data-validate-type="integer" data-validate-charset="0123456789" value="'], map:[0], if:false, else:false}, {data:["", "", ""], map:[0, "campaign.factor", 2], if:"val.campaign", else:false}, {data:['" placeholder="Faktor" style="filter: grayscale(1); width: 3.75em"><br><div data-id="'], map:[0], if:false, else:false}, 
{data:["", "", ""], map:[0, "campaign.id", 2], if:"val.campaign", else:false}, {data:['" class="button-settings settings-save-campaign">Speichern</div>'], map:[0], if:false, else:false}, {data:['<div data-id="', "", '" class="button-settings settings-delete-campaign" style="display: inline-block; width: 5em">L\u00f6schen</div>'], map:[0, "campaign.id", 2], if:"val.campaign", else:false}, {data:[" "], map:[0], if:false, else:false}], "view/campaign/list":[{data:['<table><tr><td style="font-size: 100%"><div class="numpad numpad-transparent numpad-filled col-3" style="border:0 !important; z-index: 1"><div class="campaign"></div><div data-id="', 
"", '" class="goto-settings-edit-campaign"></div></div><div class="numpad-text numpad-campaign" style="pointer-events: none">', "", '</div><div class="numpad-bonus" style="pointer-events: none">'], map:[0, "id", 2, "name", 4], if:false, else:false}, {data:[" +", "", " "], map:[0, "value", 2], if:"val.value", else:false}, {data:[" "], map:[0], if:false, else:false}, {data:[" x", "", " "], map:[0, "factor", 2], if:"val.factor", else:false}, {data:["</div></td></tr></table> "], map:[0], if:false, else:false}], 
"view/campaign/manage":[{data:['<input type="text" value="', "", '" placeholder="Kampagne" readonly><input class="button-icon input-fanmiles form-validate" type="text" value="'], map:[0, "name", 2], if:false, else:false}, {data:["+", "", ""], map:[0, "value", 2], if:"val.value", else:false}, {data:["x", "", ""], map:[0, "factor", 2], if:"val.factor", else:false}, {data:['" placeholder="Fanmiles" readonly><div data-id="', "", '" class="button-settings button-settings-small button-icon settings-edit-campaign">&nbsp;</div><div data-id="', 
"", '" class="button-settings button-settings-small button-icon settings-delete-campaign">&nbsp;</div><br> '], map:[0, "id", 2, "id", 4], if:false, else:false}], "view/setting/about":[{data:['<div class="headline"></div> '], map:[""], if:false, else:false}], "view/setting/basic":[{data:['<div class="headline"> Hier k\u00f6nnen die PIN, der Name dieser Fanmiles Station und das Hintergrundbild ge\u00e4ndert werden. </div><br><div class="button-settings settings-edit-pin">PIN \u00e4ndern</div><div class="button-settings submenu" data-menu="basic" data-view="name">Stationsnamen \u00e4ndern</div><div class="button-settings submenu" data-menu="basic" data-view="image">Hintergrundbild \u00e4ndern</div> '], 
map:[""], if:false, else:false}], "view/setting/bonus":[{data:['<div class="headline"> Hier kann bestimmt werden, wie viele Fanmiles einem Kunden pro Check-in gutgeschrieben werden. </div><br> Anzahl Fanmiles pro Check-in: <br><input class="button-icon input-fanmiles form-validate" type="number" maxlength="9" data-validate-min="1" data-validate-max="99999999" data-validate-type="integer" data-validate-charset="0123456789" value="'], map:[0], if:false, else:false}, {data:["", "", ""], map:[0, "checkin_value", 
2], if:"val.checkin_value", else:false}, {data:['" placeholder="Fanmiles"><div class="button-settings settings-edit-checkin-value">Speichern</div><div class="goto-sales menu" data-view="checkin"><div class="button button-icon"></div></div>  '], map:[0], if:false, else:false}], "view/setting/campaign":[{data:['<div class="headline"> Hier k\u00f6nnen bestehende Kampagnen editiert und neue Kampagnen erstellt werden. </div><br><div class="button-settings submenu settings-new-campaign" data-menu="sales" data-view="edit">Neue Kampagne hinzuf\u00fcgen</div><br><div class="content-campaign"></div><div class="goto-sales menu" data-view="sales"><div class="button button-icon"></div></div> '], 
map:[""], if:false, else:false}], "view/setting/checkin":[{data:['<div class="headline"> Hier kann bestimmt werden, wie viele Fanmiles einem Kunden pro Check-in gutgeschrieben werden. </div><br><span style="color: #fff">Anzahl Fanmiles pro Check-in:</span>&ensp; <span class="color-green">', "", ' Fanmiles</span><br><div class="button-settings submenu" data-menu="checkin" data-view="bonus">Check-in anpassen</div> '], map:[0, "checkin_value", 2], if:false, else:false}], "view/setting/edit":[{data:['<div class="headline">'], 
map:[0], if:false, else:false}, {data:[" Bitte bestehende Kampagne editieren und anschlie\u00dfend speichern. "], map:[0], if:"val.campaign", else:false}, {data:[" "], map:[0], if:false, else:false}, {data:[" Bitte neue Kampagne eintragen und anschlie\u00dfend speichern. "], map:[0], if:"!val.campaign", else:false}, {data:[" Zu jeder Kampagne kann entweder die Anzahl an Fanmiles <u>oder</u> ein Faktor festgelegt werden. </div><br>"], map:[0]}, {include:"view/campaign/edit"}, {data:['<div class="goto-sales submenu" data-menu="sale" data-view="campaign"><div class="button button-icon"></div></div> '], 
map:[0], if:false, else:false}], "view/setting/image":[{data:['<div class="headline"> Bitte ein Hintergrundbild f\u00fcr diese Fanmiles Station w\u00e4hlen. </div><br><label for="station-image-input" style="margin: 0">'], map:[0], if:false, else:false}, {data:['<span class="button-settings settings-edit-image" style="display: block">Bild hinzuf\u00fcgen</span>'], map:[0], if:"!val.image", else:false}, {data:[" "], map:[0], if:false, else:false}, {data:['<span class="button-settings settings-edit-image" style="display: inline-block">Bild \u00e4ndern</span>'], 
map:[0], if:"val.image", else:false}, {data:['<input id="station-image-input" class="file" type="file" name="file" style="display:none"></label>'], map:[0], if:false, else:false}, {data:[' &emsp; <div class="button-settings settings-delete-image">Bild entfernen</div><br><br><img id="station-image" src="', "", '">'], map:[0, "image", 2], if:"val.image", else:false}, {data:['<div class="goto-sales menu" data-view="basic"><div class="button button-icon"></div></div> '], map:[0], if:false, else:false}], 
"view/setting/impressum":[{data:['<div class="headline" style="font-weight: 300">\r <b>Angaben gem\u00e4\u00df \u00a75 TMG</b><br>\r Fanmiles GmbH<br>\r Oranienstra\u00dfe 6<br>\r 10997 Berlin<br><br>\r <b>Telefon</b><br>\r +49 30 - 5770230 - 13<br><br>\r <b>Fax</b><br>\r +49 30 - 288746640<br><br>\r <b>E-Mail</b><br>\r <a class="color-green" href="mailto:support@fanmiles.com">support@fanmiles.com</a><br><br>\r <b>Gesch\u00e4ftsf\u00fchrer</b><br>\r Fabian Schmidt, Alan Sternberg<br><br>\r <b>Handelsregisternummer</b><br>\r AG Berlin-Charlottenburg HRB 142476<br><br>\r <b>USt-ID</b><br>\r DE 28/599/7058\r </div>\r '], 
map:[""], if:false, else:false}], "view/setting/logout":[{data:['<div class="headline"> Nach dem abmelden bleiben alle Einstellungen sowie noch nicht \u00fcbermittelte Transaktionen bis zum erneuten Einloggen bestehen. </div><br><div class="button-settings settings-logout">Abmelden</div> '], map:[""], if:false, else:false}], "view/setting/name":[{data:['<div class="headline"> Bitte einen Namen f\u00fcr diese Fanmiles Station w\u00e4hlen. </div><br><input type="text" maxlength="40" value="'], map:[0], 
if:false, else:false}, {data:["", "", ""], map:[0, "name", 2], if:"val.name", else:false}, {data:['" style="width: 20em; margin-top: 2em; margin-right: 1em;" placeholder="Name f\u00fcr diese Fanmiles Station"><div class="button-settings settings-edit-name">Speichern</div><div class="goto-sales menu" data-view="basic"><div class="button button-icon"></div></div> '], map:[0], if:false, else:false}], "view/setting/onboarding":[{data:['<div class="headline">\r In den folgenden Schritten k\u00f6nnen alle wichtigen Einstellungen dieser Fanmiles Station festgelegt werden.\r <br><br>\r Diese Einstellungen sind zu einem sp\u00e4teren Zeitpunkt jederzeit \u00fcber das Umsatzmodul zu erreichen.\r F\u00fcr Hilfe kontaktieren Sie uns unter <a href="mailto:support@fanmiles.com" class="color-green">support@fanmiles.com</a>.\r </div>\r '], 
map:[""], if:false, else:false}], "view/setting/privacy":[{data:['<div class="headline scrollpane-vertical" style="margin-right: -25px; padding-right: 25px">\r <b>Zweck der Fanmiles Fan-Loyalty Plattform</b>\r <br>\r Mit der Fanmiles Fan-Loyalty Plattform werden Fans f\u00fcr ihre\r Treue und Interaktionen rund um die Themen Sport und\r Entertainment mit #fanmiles belohnt. #fanmiles k\u00f6nnen\r gegen attraktive Pr\u00e4mien teilnehmender Partner eingel\u00f6st\r werden. Um die Fanmiles Fan-Loyalty Plattform anbieten zu\r k\u00f6nnen, gelten die folgenden Datenschutzbestimmungen:\r <br><br>\r <b>Schutz und Verwendung Ihrer Daten</b>\r <br>\r Mit diesem Dokument m\u00f6chten wir Sie dar\u00fcber informieren,\r welche Daten \u00fcber Sie im Rahmen der Nutzung der\r @fanmiles Fan-Loyalty Plattform erhoben und gespeichert\r werden sowie zu welchem Zweck wir diese Daten nutzen.\r Die entsprechende Einwilligungserkl\u00e4rung ist Teil 1 dieses\r Dokuments. In Teil 2 m\u00f6chten wir Sie dar\u00fcber informieren,\r welche datenschutzrelevanten Tools- und sog. Social-MediaPlugins\r f\u00fcr den Betrieb der Plattform eingesetzt werden.\r <br><br>\r <b>1. Datenschutzrechtliche Einwilligungserkl\u00e4rung</b>\r <br>\r F\u00fcr Ihre Teilnahme auf der Fanmiles Fan-Loyalty Plattform (die \u201ePlattform \u201c oder \u201eFan-Loyalty Plattform\u201c) gelten die nachfolgenden datenschutzrechtlichen Vereinbarungen. Ihre Einwilligungserkl\u00e4rung gilt zu Gunsten der FanMiles GmbH, Torstra\u00dfe 35, 10119 Berlin, als Betreiberin der Plattform. Mit Ihrer Zustimmung zu dieser Vereinbarung erteilen Sie der FanMiles GmbH (nachfolgend als wir\u201c oder \u201eAnbieter\u201c bezeichnet) die Erlaubnis, Ihre nachfolgend bestimmten Daten in der vereinbarten Art und Weise sowie im beschriebenen Umfang zu erheben, zu verarbeiten und zu nutzen.\r <br><br>\r <b>1.1. Die von uns erhobenen Daten</b>\r <br>\r <b>1.1.1. Fandaten</b>\r <br>\r Fandaten sind von Ihnen angegebene Daten zu Ihrer Person (Name, Geburtsdatum etc.), Ihrem Personenstand (verheiratet, Kinder etc.) sowie Ihre Kontaktdaten (Post, E-Mail, Handy etc.). Diese Daten werden im Rahmen der Anmeldung sowie ggf. sp\u00e4ter durch Ihre Eingaben erhoben.\r Sie haben die M\u00f6glichkeit, die Plattform unter einem Pseudonym zu verwenden, da die Eingabe von Daten, welche Ihre Identifizierung erm\u00f6glichen w\u00fcrden, freiwillig ist. Bitte beachten Sie, dass wir bei unvollst\u00e4ndiger Dateneingabe Ihnen gegen\u00fcber nicht alle angebotenen Leistungen erbringen k\u00f6nnen. So ist z.B. der Versand einer Pr\u00e4mie an Sie nur m\u00f6glich, wenn wir Ihren Namen und Ihre Adresse kennen.\r <br><br>\r <b>1.2 Nutzungsdaten</b>\r <br>\r Wenn Sie die Plattform nutzen, erheben, speichern und verarbeiten wir Ihre nachfolgend aufgef\u00fchrten personenbezogenen Daten, insbesondere wenn wir diese f\u00fcr die Gutschrift von #fanmiles der Plattform und f\u00fcr das Einl\u00f6sen von #fanmiles gegen Pr\u00e4mien ben\u00f6tigen. Bei den Daten handelt sich um eine Ihnen zugewiesene eindeutige Teilnehmernummer, Zeit, Ort und Art des Vorganges, der zur Gutschrift oder zur Einl\u00f6sung der #fanmiles der Plattform f\u00fchrt, die Anzahl der entsprechenden #fanmiles der Plattform, die eingel\u00f6ste Pr\u00e4mie, die von Ihnen im Rahmen eines Vorganges, der zur Gutschrift von #fanmiles der Plattform f\u00fchrt, jeweils bezogenen Waren- und Dienstleistungen sowie deren Preis oder das Gewinnspiel bzw. die Verlosung, an der Sie teilgenommen haben.\r <br><br>\r Weiter erheben wir Daten dar\u00fcber, auf welchen Webseiten Sie mit sog. Plugins interagieren, welche wir anbieten und die vom jeweiligen Webseitenbetreiber auf seiner Webseite eingebunden sind. Sofern Sie gleichzeitig auf der @fanmiles Fan-Loyalty Plattform eingeloggt sind, k\u00f6nnen wir diese Interaktion Ihrem Benutzerkonto zuordnen und speichern. Bei den erhobenen Daten handelt es sich um Ort und Datum der Interaktion, Art der Interaktion, und thematisches Umfeld (z.B. was f\u00fcr Inhalte werden auf der Webseite gerade angezeigt).\r <br><br>\r Wir erhalten keine Information \u00fcber die von Ihnen bezogenen Waren- und Dienstleistungen, wenn Ihr Vertragspartner eine Apotheke ist, es sich um Finanzdienstleistungen oder Bankgesch\u00e4fte handelt oder die Daten sonst R\u00fcckschl\u00fcsse auf personenbezogene Daten zulassen w\u00fcrden, welche als besondere Arten personenbezogener Daten im Sinne von \u00a7 3 Abs. 9 BDSG anzusehen w\u00e4ren.\r Weiterhin erheben und speichern wir die Information, welche E-Mail-Newsletter an Sie im Rahmen der Fan-Loyalty Plattform verschickt werden, ob Sie diese ge\u00f6ffnet und einen Link in dem Newsletter angeklickt haben sowie die Tatsache, ob auf den Newsletter sonst wie reagiert wurde (z.B. (automatische) Antwort oder fehlende Zustellbarkeit) (im folgenden \u201eNewsletterdaten\u201c).\r <br><br>\r Fandaten und Nutzungsdaten werden im Folgenden gemeinschaftlich als \u201eTeilnehmerdaten\u201c bezeichnet.\r <br><br>\r <b>1.2. Wer erh\u00e4lt meine Teilnehmerdaten</b>\r <br>\r Eine \u00dcbermittlung Ihrer Teilnehmerdaten an Dritte (auch f\u00fcr Zwecke der Werbung und Marktforschung) erfolgt nur, wenn Sie dem gesondert zugestimmt haben oder es gesetzlich erlaubt ist (z.B. Weitergabe von Adressdaten an Kurierunternehmen f\u00fcr die Zustellung von Pr\u00e4mien).\r <br><br>\r <b>1.3. Zu welchen Zwecken werden meine Teilnehmerdaten verwendet?</b>\r <br>\r Wir verwenden Ihre Teilnehmerdaten insbesondere zu den folgenden Zwecken:\r <br>\r <ul>\r <li>Information \u00fcber Ihr aktuelles #fanmiles - und FAME-Guthaben der Plattform und deren G\u00fcltigkeit bzw. Verfallsdatum</li>\r <li>Information \u00fcber aktuelle Angebote der Plattform, der Sponsoren und Partner</li>\r <li>Anpassen der Plattform und unserer Angebote an Ihre mutma\u00dflichen Interessen und Bed\u00fcrfnisse</li>\r <li>Gutschrift von #fanmiles und Fame sowie Einl\u00f6sen von #fanmiles der Plattform</li>\r <li>Nutzung f\u00fcr Werbung und Marktforschung</li>\r </ul>\r <br><br>\r <b>1.3.1. Teilnahme an der Fan-Loyalty Plattform</b>\r <br>\r Wir verwenden Ihre Teilnehmerdaten, damit Sie an der Fan-Loyalty Plattform teilnehmen k\u00f6nnen sowie ggf. f\u00fcr die Abrechnung zwischen uns und Partnern der Plattform. Ihre Teilnehmerdaten werden insbesondere zur Verwaltung Ihrer Meilenguthaben und zur Abwicklung von Meilen- und Pr\u00e4mientransaktionen genutzt. Die Teilnehmerdaten werden weiter dazu verwendet, Ihnen Angebote zur Plattform zu unterbreiten. Diese sollen durch die Verwendung Ihrer Teilnehmerdaten auf Ihre mutma\u00dflichen Interessen und Bed\u00fcrfnisse angepasst werden.\r <br><br>\r <b>1.3.2. Nutzung f\u00fcr Werbung und Marktforschung</b>\r <br>\r Um Ihnen die Leistungen der Fan-Loyalty Plattform anbieten und dieses ausbauen zu k\u00f6nnen, m\u00fcssen wir mit der Plattform Einnahmen erzielen k\u00f6nnen. Wir wollen Ihnen hierf\u00fcr keine Nutzungsgeb\u00fchr in Rechnung stellen, sondern andere Einnahmequellen nutzen. Daher m\u00f6chten wir Ihre Teilnehmerdaten f\u00fcr Werbung und Marktforschung erheben, speichern und nutzen. Wir sollen so in die Lage versetzt werden, Ihnen Angebote f\u00fcr Produkte, Dienstleistungen und Services zu unterbreiten (z.B. durch Einblenden von personalisierter Werbung oder personalisierte Newsletter), welche nach unserer Einsch\u00e4tzung auf Ihre Bed\u00fcrfnisse und Interessen zugeschnitten sind. Dies kann \u00fcber die Webseite der Plattform, per Post und \u2013 sofern wir hierzu gesetzlich oder mit Ihrer Einwilligung berechtigt sind \u2013 per E-Mail bzw. einer anderen Form der digitalen Nachricht (z.B. SMS) erfolgen.\r Dar\u00fcber hinaus nutzen wir Ihre Teilnehmerdaten zur Gestaltung neuer und zur Verbesserung bestehender Angebote und Leistungen der Plattform, um diese besser auf Ihre mutma\u00dflichen pers\u00f6nlichen Interessen und Bed\u00fcrfnisse zuschneiden zu k\u00f6nnen.\r Sie k\u00f6nnen der Nutzung Ihrer Teilnehmerdaten f\u00fcr Werbung und Marktforschung jederzeit mit Wirkung f\u00fcr die Zukunft widersprechen. Bitte richten Sie diesen Widerspruch an FanMiles GmbH, Datenschutz, Torstra\u00dfe 35, 10119 Berlin.\r <br><br>\r <b>1.3.3. Newsletter der Fan-Loyalty Plattform</b>\r <br>\r Die Newsletterdaten werden genutzt, um festzustellen, ob unsere Newsletter auf Ihr Interesse sto\u00dfen und wie wir diese ggf. individueller gestalten k\u00f6nnen, um Ihren mutma\u00dflichen Interessen und Bed\u00fcrfnissen besser zu gen\u00fcgen.\r <br><br>\r <b>1.4. Widerruf dieser Erkl\u00e4rung</b>\r <br>\r Sie k\u00f6nnen diese Erkl\u00e4rung jederzeit mit Wirkung f\u00fcr die Zukunft widerrufen. Bitte richten Sie Ihren Widerruf an FanMiles GmbH, Datenschutz, Torstra\u00dfe 1., 10119 Berlin.\r Bitte haben Sie Verst\u00e4ndnis daf\u00fcr, dass eine L\u00f6schung Ihrer personenbezogenen Teilnehmerdaten nur mit L\u00f6schung Ihres Kontos m\u00f6glich ist. Ihr Widerruf stellt damit gleichzeitig die sofortige K\u00fcndigung Ihres Kontos dar.\r <br><br>\r <b>1.5. Ihr Recht auf Auskunft und Fragen zum Datenschutz</b>\r <br>\r Sie k\u00f6nnen jederzeit Auskunft dar\u00fcber verlangen, welche Daten wir \u00fcber Sie gespeichert haben und wie wir diese verwenden. Sollten Daten unrichtig sein, werden wir diese auf Ihren Hinweis hin korrigieren. Bitte wenden Sie sich bei entsprechenden W\u00fcnschen oder allgemeinen Fragen zum Datenschutz an den Datenschutzbeauftragten unter FanMiles GmbH, Datenschutz, Torstra\u00dfe 35, 10119 Berlin oder datenschutz@fanmiles.com\r <br><br>\r <br>\r <b>2. Information \u00fcber datenschutzrelevante Tools und Social-Media-Plugins</b>\r <br>\r <b>2.1. Nutzung von Google Analytics</b>\r <br>\r Diese Webseite benutzt Google Analytics, einen Webanalysedienst der Google Inc. (\u201eGoogle\u201c). Google Analytics verwendet sog. \u201eCookies\u201c, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Webseite durch Sie erm\u00f6glichen. Die durch den Cookie erzeugten Informationen \u00fcber Ihre Benutzung dieser Webseite (einschlie\u00dflich Ihrer IP-Adresse) werden an einen Server von Google in den USA \u00fcbertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Webseite auszuwerten, um Reports \u00fcber die Webseitenaktivit\u00e4ten f\u00fcr die Webseitenbetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte \u00fcbertragen, sofern dies gesetzlich vorgeschrieben ist oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten von Google in Verbindung bringen. Sie k\u00f6nnen die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht s\u00e4mtliche Funktionen dieser Website vollumf\u00e4nglich nutzen k\u00f6nnen. Durch die Nutzung dieser Webseite erkl\u00e4ren Sie sich mit der Bearbeitung der \u00fcber Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.\r Der Erhebung und Nutzung Ihrer IP-Adresse durch Google Analytics k\u00f6nnen Sie jederzeit mit Wirkung f\u00fcr die Zukunft widersprechen. N\u00e4here Informationen hierzu finden Sie unter <a class="color-green" href="http://tools.google.com/dlpage/gaoptout?hl=de">http://tools.google.com/dlpage/gaoptout?hl=de</a>.\r <br><br>\r Wir weisen Sie darauf hin, dass auf dieser Webseite Google Analytics so verwendet wird, dass eine anonymisierte Erfassung von IP-Adressen gew\u00e4hrleistet ist. Weiterhin haben wir mit Google einen Vertrag nach \u00a7 11 BDSG geschlossen, der die Einhaltung dieser Vorgaben gew\u00e4hrleistet.\r <br><br>\r <b>2.2. Facebook-Plugins und Verbindung</b>\r <br>\r Unser Internetauftrittverwendet Plugins von facebook.com, welches von der Facebook Inc., 1601 S. California Ave, Palo Alto, CA 94304, USA betrieben wird (\u201cFacebook\u201d). Die Plugins sind an einem der Facebook-Logos erkennbar (ein wei\u00dfes \u201ef\u201c vor blauem Hintergrund bzw. ein \u201eDaumen hoch\u201c-Zeichen) oder sind mit dem Zusatz \u201cFacebook Social Plugin\u201d gekennzeichnet.Wenn Sie eine Webseite unseres Internetangebotes aufrufen, in die ein solches Plugin eingebunden ist, baut Ihr Browser eine unmittelbare Verbindung mit den Servern von Facebook auf. Der Inhalt des Plugins wird von Facebook direkt an Ihren Browser \u00fcbermittelt und von diesem in die Webseite eingebunden. Wir haben daher keinen Einfluss auf den Umfang der Daten, die Facebook mit Hilfe dieses Plugins erhebt. Grundlage unserer hier erfolgenden Informationen sind die entsprechenden Angaben von Facebook unter der Adresse:\r <br><br>\r <a class="color-green" href="http://www.facebook.com/help/?faq=17512">http://www.facebook.com/help/?faq=17512</a>.\r <br><br>\r Nach der eigenen Auskunft von Facebook erh\u00e4lt diese durch die Einbindung der Plugins die Information, welche Seite unseres Internetauftritts Sie gerade aufgerufen haben (sog. URL).\r <br><br>\r Sind sie gleichzeitig bei Facebook eingeloggt, kann Facebook den Besuch Ihrem Facebook-Konto zuordnen. Wenn Sie mit den Plugins interagieren, zum Beispiel den Like-Button bet\u00e4tigen, wird die entsprechende Information von Ihrem Browser direkt an Facebook \u00fcbermittelt und dort gespeichert.\r Falls Sie kein Mitglied von Facebook sind, besteht trotzdem die M\u00f6glichkeit, dass Facebook Ihre IP-Adresse in Erfahrung bringt und speichert.Sie k\u00f6nnen sich hiergegen wehren, indem Sie entsprechende Blockadetools in Ihrem Browser installieren.\r <br><br>\r Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch Facebook sowie Ihre diesbez\u00fcglichen Rechte und Einstellungsm\u00f6glichkeiten zum Schutz der Privatsph\u00e4re entnehmen Sie bitte den Datenschutzhinweisen von Facebook:\r <br><br>\r <a class="color-green" href="http://www.facebook.com/policy.php">http://www.facebook.com/policy.php</a>\r <br><br>\r Wenn Sie Facebook-Mitglied sind und nicht m\u00f6chten, dass Facebook \u00fcber unseren Internetauftritt Daten \u00fcber Sie sammelt und mit Ihren bei Facebook gespeicherten Mitgliedsdaten verkn\u00fcpft, m\u00fcssen Sie sich vor dem Besuch unseres Internetauftritts bei Facebook ausloggen.\r <br><br>\r Wenn Sie Ihren Facebook-Account mit dieser Webseite verbunden haben, k\u00f6nnen Sie die entsprechende Verbindung auf Facebook unter Privatsph\u00e4re-Einstellungen l\u00f6schen.\r <br><br>\r <b>2.3. Twitter-Plugin</b>\r <br>\r Auf unseren Seiten sind Funktionen des Dienstes Twitter eingebunden. Diese Funktionen werden angeboten durch die Twitter Inc., 1355 Market St, Suite 900, San Francisco, CA 94103, USA.\r Durch das Benutzen der Funktion "Re-Tweet" wird die von Ihnen besuchte Webseite mit Ihrem Twitter-Account verkn\u00fcpft und anderen Nutzern bekannt gegeben (\u201egetweetet\u201c). Dabei werden Daten an Twitter \u00fcbertragen. Twitter verwendet nach eigenen Angaben diese Informationen auch zu dem Zweck, Ihnen personalisierte Werbung anzuzeigen. Dies k\u00f6nnen Sie bei Twitter in Ihren Account-Einstellungen deaktivieren (Punkte \u201eIndividualisierung\u201c sowie \u201eGesponserter Inhalt\u201c).\r <br><br>\r Die Angaben von Twitter zur Datenerhebung und -nutzung finden Sie in der Datenschutzerkl\u00e4rung von Twitter unter <a class="color-green" href="http://twitter.com/privacy">http://twitter.com/privacy</a>. Wir weisen darauf hin, dass wir keine weitergehende Kenntnis vom Inhalt der \u00fcbermittelten Daten sowie deren Nutzung durch Twitter haben.\r Ihre Datenschutzeinstellungen bei Twitter k\u00f6nnen Sie in den Konto-Einstellungen unter <a class="color-green" href="http://twitter.com/account/settings">http://twitter.com/account/settings</a> \u00e4ndern.\r <br><br>\r <b>2.4. Google+-Plugin</b>\r <br>\r Auf unseren Seiten sind Funktionen des Dienstes Google+ eingebunden. Diese Funktionen werden angeboten durch Google Inc., Amphitheatre Parkway, Mountain View, CA 94043, USA.\r Durch das Benutzen der Funktion "Google+" wird die von Ihnen besuchte Webseite mit Ihrem Google+-Account verkn\u00fcpft und anderen Nutzern bekannt gegeben. Dabei werden Daten an Google \u00fcbertragen.\r Die Angaben von Google zur Datenerhebung und -nutzung finden Sie in der Datenschutzerkl\u00e4rung von Google unter <a class="color-green" href="https://www.google.com/intl/de/policies/privacy/">https://www.google.com/intl/de/policies/privacy/</a>. Wir weisen darauf hin, dass wir keine weitergehende Kenntnis vom Inhalt der \u00fcbermittelten Daten sowie deren Nutzung durch Google haben.\r Ihre Datenschutzeinstellungen bei Google k\u00f6nnen Sie in Ihren Konto-Einstellungen unter\r <a class="color-green" href="https://www.google.com/accounts/ManageAccount">https://www.google.com/accounts/ManageAccount</a> \u00e4ndern.\r <br><br>\r </div>\r '], 
map:[""], if:false, else:false}], "view/setting/rate":[{data:['<div class="headline"> Hier kann der Wechselkurs f\u00fcr Fanmiles ge\u00e4ndert werden. </div><br><br><b style="font-size: 2em; color: #fff; font-weight: 300">1\u20ac</b>&ensp;entspricht: <br><input class="button-icon input-fanmiles form-validate" type="number" maxlength="9" data-validate-min="1" data-validate-max="9999999" data-validate-type="integer" data-validate-charset="0123456789" value="'], map:[0], if:false, else:false}, {data:["", 
"", ""], map:[0, "sales_rate", 2], if:"val.sales_rate", else:false}, {data:['" placeholder="Fanmiles"> Fanmiles&emsp; <div class="button-settings settings-edit-sales-rate">Speichern</div><div class="goto-sales menu" data-view="sales"><div class="button button-icon"></div></div> '], map:[0], if:false, else:false}], "view/setting/reset":[{data:['<div class="headline"> Beim Zur\u00fccksetzen auf die Werkseinstellungen gehen alle Daten verloren. </div><br>'], map:[0], if:false, else:false}, {data:['<div class="color-orange">Achtung: Es wurden noch nicht alle Transaktionen dieser Station an den Fanmiles-Server \u00fcbermittelt. Beim Zur\u00fccksetzen auf Werkseinstellung werden diese Transaktionen ebenfalls gel\u00f6scht!</div><div class="button-settings settings-submit">Daten \u00fcbermitteln</div>'], 
map:[0], if:"val.records", else:false}, {data:['<div class="button-settings settings-reset">Zur\u00fccksetzen</div> '], map:[0], if:false, else:false}], "view/setting/sales":[{data:['<div class="headline"> Hier k\u00f6nnen der Wechselkurs f\u00fcr Fanmiles ge\u00e4ndert und die Kampagnen verwaltet werden. </div><br><div class="button-settings submenu" data-menu="sale" data-view="rate">Wechselkurs anpassen</div><div class="button-settings submenu" data-menu="sale" data-view="campaign">Kampagnen verwalten</div> '], 
map:[""], if:false, else:false}], "view/setting/start":[{data:['<div class="headline">\r Willkommen in den <b>Fanmiles Settings</b>.\r <br><br>\r Hier k\u00f6nnen alle Einstellungen angepasst werden.<br>\r F\u00fcr Hilfe kontaktieren Sie uns unter <a href="mailto:support@fanmiles.com" class="color-green">support@fanmiles.com</a>\r <br><br>\r <div class="button-settings button-debug">Debug Console</div>\r <div class="button-settings button-stats">Runtime Statistik</div>\r <div class="button-settings button-graph">Function Stack Trace</div>\r </div>\r '], 
map:[""], if:false, else:false}]};












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

