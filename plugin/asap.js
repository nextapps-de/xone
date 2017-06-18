goog.provide("AMD");
goog.require("CONFIG");

/*

problems:
--------------------
dynamic objects with same id
	- timestamp
	- clear cache
	- update cache
	- parameter "nocache"

selector conflict (uses same cache)
	- different caches (2d-array)
	- mask selectors


todo:
--------------------
- (multiple ids)
- classname, tagname
- simple selector querycheck to pass on optimized basic selectors
- extend an new jquery performance plugin (selectors, css, animate)



*/

/*
var testvar = [];

testvar[document]=true;
testvar[window]=true;
testvar[document.body]=true;

console.log(testvar);
*/


/**
* @param {number} window Subgroup id to query.
* @param {string|number|null} document An itemName,
*/

/**!
* @preserve ASAP v1.03 - Asynchronous Javascript
* Copyright (c) 2014-2015 JS Pro Tools
* Author: Thomas Wilkerling
* Infos: http://jsprotools.com
*
* Included:
* 1. ASAP Core
* 2. ASAP Build Plugin
*/

//todo: browser dependence, versioning

(function() {

	//var DEBUG = true;

	//'use strict';

	/*
    var obfuscate = function(name){

        return name ? name : '';

        //(Math.random()>9?' ':'');

    };
    */

	/**
	 * @type {Window}
	 * @const
	 */
	var window = this;
	/** @const */
	var document = window.document;
	/** @const */
	var body = document.body;

   // var obfuscate = window.obfuscate = {};


	/**
	 * The ASAP Main Class.
	 * @typedef {ASAP}
	 * @const
	 */
    var ASAP = new /** @constructor */ function(){

		var sources = {};

		/**
		 * Modules Invoked
 		 * @type {Object.<string, *>}
		 */
		var modules   = {};

		/**
		 * Modules Cached
		 * @type {Array.<Array.<string, *, *, *>>}
		 * @private
		 */
		var cache     = /*window.cache   =*/ []; // --> todo: combine with sources

		/**
		 * Check type of any element
		 * @param {*} val
		 * @param {*} type
		 * @private
		 * @return {boolean} The Check result
		 * @const
		 */
		var isType = function(val, type){

            return (typeof val === (type||'undefined'));
		};
		/** @const */
		var isArrayType = function(val, type){

            return (Object.prototype.toString.call(val) === '[object ' + type + ']');
		};
		/** @const */
		var isArray = function(val){

            return (isArrayType(val, 'Array') || isArrayType(val, 'Object'));
		};

		//var js = window.asap_js = [];
		var imported = {};
		var moduleCounts = {};
		var require_order = [];
		var js = [];

		/** @const */
		var register = function(name, module){

			this[name] = module;
		};

		/** @const */
		var out = function(build_arr, target){

			if(target === 'window' || isType(target, 'undefined')){

				window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(build_arr.join('\n')), "ASAP Build", "width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0");
			}
			else if(target === 'text'){

				return build_arr.join('\n');
			}
			else if(target === 'console'){

				console.log(build_arr.join('\n'));
			}
			else if(target === 'file'){

				var pom = document.createElement('a');
				pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(build_arr.join('\n')));
				pom.setAttribute('download', 'build.js');
				pom.style.display = 'none';
				body.appendChild(pom);
				pom.click();
				body.removeChild(pom);

			}
			else if(target === 'popup'){

				var pom = document.createElement('pre');
				var style = document.createAttribute('style');
				style.value = 'position:absolute;z-index:999999;background-color:#fff;color:#000;width:100%;height:100%;overflow:auto;text-align:left;font:monospace;';
				style.id = 'asap-debug';
				pom.setAttributeNode(style);
				pom.innerHTML = build_arr.join('\n');
				body.appendChild(pom);
			}
		};

		/** @const */
		var build = function(namespace, _convert){

			//console.log(moduleCounts);

			var build_check = {};
			var namespace_requires = [];

			js[js.length] = '(function(){';

			//console.log(sources);
			//console.log(imported);

			//if(isType(namespace, 'undefined')){

				for(var k = 0; k < require_order.length; k++){

					var key = require_order[k];

					//console.log(key);

					if(sources.hasOwnProperty(key) || key.indexOf('$$require$$') > -1){

						var source = sources[key];
						var isPublic = false;

						if(key.charCodeAt(0)===33){ // --> !

							key = key.substring(1);
							isPublic = true;
						}

						if(key.charCodeAt(0)===42){ // --> *

							key = key.substring(1);
						}

						if(publicList[key]) isPublic = true;

						if(imported[key] || (isType(moduleCounts[key], 'undefined') && !_convert)) {

							continue;
						}

						if(namespace && key.indexOf('$$require$$') === -1 && key.indexOf(namespace + '.') === -1) {

							namespace_requires[namespace_requires.length] = namespace;

							continue;
						}

						var dependencies = source[0];
						var fn = source[1];
						var self = source[2];

						//console.log(key);

						/* CHECK REFERENCES + CREATE MISSING NAMESPACES */





						//dependencies => fn
						//fn => self

						var arr = key.split('.');

						//if(key.indexOf('.')>-1) arr
						//else arr = [key];
						var i = 0, len = arr.length - 1, str='', str_final = '';

						var tmp = imported;

						//console.log(arr);

						while(i<len){

							str+=(str?'.':'')+arr[i];

							if(isType(imported[str], 'undefined')) {

								var isPublic2 = publicList[str];

									 if(i===0 && isPublic2) str_final='var ' + arr[i] + ' = window["'+arr[i]+'"]';
								else if(i>0 && isPublic2) str_final = 'var ' + arr[i-1] + '_' + arr[i] + ' = ' + arr[i-1] + '["'+arr[i]+'"]';
								else str_final=str; //(str_final?'.':'')+arr[i]


								if(isType(build_check[str], 'undefined')){

									js[js.length] = (str.indexOf('.')>-1 || isPublic2 ? '' : 'var ') + str_final + ' = {};';

									build_check[str] = true;
								}

								imported[str]=true;

								if(i>0 && isPublic2) str_final = arr[i-1] + '_' + arr[i];
							}
							else str_final=str;

							//tmp[arr[i]] = true;
							//tmp = tmp[arr[i]] ;

							i+=1;
						}


						build_check[str+(str?'.':'')+arr[i]] = true;
						imported[str+(str?'.':'')+arr[i]] = true;

						if(!isPublic) str+=(str?'.':'')+arr[i];
						else if(i>1 && isPublic2) str_final = arr[i-2] + '_' + arr[i-1];

						//js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = ' + fn.toString() + '(' + requiredModules.join(', ') + ');';
						//js[js.length] = (key.indexOf('.')>-1 ? '' : 'var ') + key + ' = ' + fn.toString() + '(' + requiredModules.join(', ') + ');';



						/* CHECK VALUE: DIRECT ASSIGN, NO DEPENDENCIES */

						if(isType(fn, 'undefined')) {

							if(isType(dependencies, 'number') || isType(dependencies, 'boolean')) js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? 'var ' + str_final.replace(/\./g, '_') + '_' + arr[i] + ' = ' + str_final+'["'+arr[i]+'"]' : key) + ' = ' + dependencies + ';';
							else if(isType(dependencies, 'string')) js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? 'var ' + str_final.replace(/\./g, '_') + '_' + arr[i] + ' = ' + str_final+'["'+arr[i]+'"]' : key) + ' = "' + dependencies + '";';
							else if(isArray(dependencies)) js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? 'var ' + str_final.replace(/\./g, '_') + '_' + arr[i] + ' = ' + str_final+'["'+arr[i]+'"]' : key) + ' = ' + JSON.stringify(dependencies).replace(/\"([^(\")"]+)\":/g,"$1:") + ';';
							else if(isType(dependencies, 'function')){

								//console.log(key);

								//var factory_return = dependencies();

								/*
								if(isType(factory_return, 'number') || isType(factory_return, 'boolean')) {

									js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = ' + factory_return + ';';
								}
								else if(isType(factory_return, 'string')) {

									js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = "' + factory_return + '";';
								}
								else
								*/
								//problem: built-in-functions
								/*
								if(isType(factory_return, 'function') && factory_return.toString().indexOf('function') > -1) {

									js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = ' + factory_return.toString() + ';';
								}
								*/

								//else if(Object.prototype.toString.call(factory_return) === '[object Array]' /*|| Object.prototype.toString.call(factory_return) === '[object Object]'*/){

									//js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = ' + JSON.stringify(factory_return).replace(/\"([^(\")"]+)\":/g,"$1:") + ';';
								//}

								//else

								var fnResultCheck;

								if(key.indexOf('$$require$$') > -1) js[js.length] = '(' + dependencies.toString() + '());';
								else js[js.length] = (key.indexOf('.') > -1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? 'var ' + str_final.replace(/\./g, '_') + '_' + arr[i] + ' = ' + str_final+'["'+arr[i]+'"]' : key) + ' = ' + (isType(fnResultCheck = dependencies(), 'function') && ((fnResultCheck = fnResultCheck.toString()).indexOf('[native code]') === -1 || fnResultCheck.substring(fnResultCheck.indexOf('{'), fnResultCheck.lastIndexOf('}')).length > 20) ? fnResultCheck : '(' + dependencies.toString() + '())') + ';';
							}
						}

						/* CHECK VALUE: DIRECT ASSIGN, NO DEPENDENCIES + CALLER INIT */

						else if(isType(dependencies, 'function')) {

							/*
							if(isType(fn, 'undefined')) {
								//tmp[arr[i]] = dependencies();

								//if(isType(dependencies, 'function'))
								js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = ' + dependencies.toString() + ';';
								//else if(Object.prototype.toString.call(dependencies) === '[object Array]' || Object.prototype.toString.call(result) === '[object Object]') js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = ' + source.toString() + ';';
								//else js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = ' + dependencies + ';';
							}
							else {
							*/
								//if(isType(dependencies, 'function'))
								js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? 'var ' + str_final.replace(/\./g, '_') + '_' + arr[i] + ' = ' + str_final+'["'+arr[i]+'"]' : key) + ' = (function(){' + dependencies.toString() + '; }).call(' + fn.toString() + ');';
								//else if(Object.prototype.toString.call(dependencies) === '[object Array]' || Object.prototype.toString.call(result) === '[object Object]') js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = ' + source.toString() + ';';
								//else js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? str+'["'+arr[i]+'"]' : key) + ' = ' + dependencies + ';';
							//}

							//js[js.length] = (key.indexOf('.')>-1 ? '' : 'var ') + key + ' = (function(){' + dependencies().toString() + '; }).call(' + fn.toString() + ');';
						}

						/* CHECK VALUE: DEPENDENCIES + FACTORY + CALLER INIT */

						else {

							if(isType(dependencies, 'string')) dependencies = [dependencies];

							var requiredModules = [];

    						var a = 0, len2 = dependencies.length;

							/* LOOP OVER DEPENDENCIES */

							while(a < len2) {

								if(isType(dependencies[a], 'string')) {

									if(!isType(sources['!'+dependencies[a]], 'undefined')){

										var arr2 = dependencies[a].split('.');
										var z = 0, len3 = arr2.length - 1, str2='', str_final = '';

										//tmp = imported;

										while(z<len3){

											str2+=(str2?'.':'')+arr2[z];

											var isPublic2 = publicList[str2];

												 if(i===0 && isPublic2) str_final='var ' + arr2[z] + ' = window["'+arr2[z]+'"]';
											else if(i>0 && isPublic2) str_final+='["'+arr2[z]+'"]';
											else str_final=str2;

											imported[str2] = true;
											//tmp = tmp[arr2[z]] ;

											z+=1;
										}

										//var isPublic2 = !isType(sources['!'+dependencies[a]], 'undefined');

										requiredModules[requiredModules.length] = (z > 0 ? str2+'["'+arr2[z]+'"]' : arr2[z]);


									}

									else {

										if(publicList[dependencies[a]]){

											if(dependencies[a].indexOf('.')>-1){

												requiredModules[requiredModules.length] = dependencies[a].substring(0, dependencies[a].lastIndexOf('.')) + "['" + dependencies[a].substring(dependencies[a].lastIndexOf('.')+1) + "']";
											}
											else{

												requiredModules[requiredModules.length] = "window['" + dependencies[a] + "']";
											}
										}
										else requiredModules[requiredModules.length] = dependencies[a];
									}
								}
								else {


									requiredModules[requiredModules.length] = parseParams(fn)[a];
								}

								a+=1;
							}



							if(isType(self, 'undefined')) {

								if(isArray(fn)) js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? 'var ' + str_final.replace(/\./g, '_') + '_' + arr[i] + ' = ' + str_final+'["'+arr[i]+'"]' : (key.indexOf('.')===-1 && publicList[key] ? 'var '+key+' = window["'+key+'"]' : key)) + ' = ' + JSON.stringify(fn) + ';';
								else if(key.indexOf('$$require$$') > -1) js[js.length] = '(' + fn.toString() + '(' + requiredModules.join(', ') + '));';
								else js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? 'var ' + str_final.replace(/\./g, '_') + '_' + arr[i] + ' = ' + str_final+'["'+arr[i]+'"]' : (key.indexOf('.')===-1 && publicList[key] ? 'var '+key+' = window["'+key+'"]' : key)) + ' = (' + fn.toString() + '(' + requiredModules.join(', ').replace(/\./g, '_') + '));';

								//js[js.length] = (key.indexOf('.')>-1 ? '' : 'var ') + key + ' = ' + fn.toString() + '(' + requiredModules.join(', ') + ');';
							}
							else{

								if(isArray(fn)) js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? 'var ' + str_final.replace(/\./g, '_') + '_' + arr[i] + ' = ' + str_final+'["'+arr[i]+'"]' : key) + ' = ' + JSON.stringify(fn) + ';';
								else if(key.indexOf('$$require$$') > -1) js[js.length] = '(function(){' + fn.toString() + '(' + requiredModules.join(', ') + ');}).call(' + self.toString() + ');';
								else js[js.length] = (key.indexOf('.')>-1 || isPublic ? '' : 'var ') + (isPublic && i > 0 ? 'var ' + str_final.replace(/\./g, '_') + '_' + arr[i] + ' = ' + str_final+'["'+arr[i]+'"]' : key) + '  = (function(){' + fn.toString() + '(' + requiredModules.join(', ').replace(/\./g, '_') + ');}).call(' + self.toString() + ');';

								//tmp[arr[i]] = dependencies();

							}
						}
					}
				}

				js[js.length] = '}());';

				return js;
				//console.log('(function(){'+js.join('\n')+'}());');

		};

		/** @const */
		var convert = function(namespace){

			require_order = Object.keys(sources);

			return build(namespace, true);
		};

		/** @const */
		var debug = function(namespace){

			//build(namespace);

			/*
			js = [

				'asap_imported: ' + imported

			];
			*/

			imported = {};
			module_tree = {};
			moduleCounts = {};
			require_order = [];
			js = [];
		};

		/** @const */
		var parseParams = function(param){

			if(typeof param === 'string') {

				return param.split('.');
			}
			if(typeof param === 'function') {

				var x = param.toString();
				var c = x.substring(x.indexOf("(", x.indexOf('function')) + 1);
				c = c.substring(0, c.indexOf(")"));
				return c.match(/([\w_\$\d]+)/g);
			}
			return param;
		};

/*
		var getIndex = function(arr){

			var i = 0, len = arr.length;

			if(len>0){

				var mods = modules;

				while(i < len) {

					mods = mods[arr[i]] || (mods[arr[i]] = {});
					i+=1;
				}

				return mods;
			}

			return void 0;
		};
*/
		/**
		 * Update cached modules
		 * @type {function(): boolean}
		 * @const
		 */
        var updateCache = function(){



            var a = 0;
            var update_state = false;

            /* LOOP OVER CACHE ARRAY */



            while(a < cache.length){

				/** @type {string} */
                var namespace = cache[a][0];
                var dependencies = cache[a][1];
                var fn = cache[a][2];
                var self = cache[a][3];


                var state = false;

                state = (

                    namespace === '' ?

                        require(dependencies, fn, self, false)
                    :
                        define(namespace, dependencies, fn, self, false)
                );

                if(state){

                    console.log("UPDATE: " + namespace);

                    /*
                    cache[a] = null;
                    cache_len-=1;

                    if(a<cache_len) {

                        cache[a] = cache[cache_len];
                        cache[cache_len] = null;
                    }
                    */

                    cache[a] = null;
                    cache.splice(a, 1);

                    update_state = true;
                }


                a+=1;
            }
            //console.log(cache.slice(0));
            return update_state;

        /*
            while(true){

                // CHECK DEPENDENCIES: DIRECT ASSIGN

                if(isType(fn, 'undefined')) {

                    if(!isType(dependencies, 'undefined')) {

                        if(namespace==='') dependencies(); else addModule(namespace, dependencies);
                        cache[a] = null;
                        cache_len-=1;
                        if(a<cache_len) {

                            cache[a] = cache[cache_len];
                            cache[cache_len] = null;
                        }

                        update_state = true;
                    }
                }

                // CHECK DEPENDENCIES: DEFINE

                else {

                    var requiredModules = [], i, len = dependencies.length;

                    // LOOP OVER DEPENDENCIES ARRAY

                    while(i < len) {

                        var module = isType(dependencies[i], 'string') ? getModule(dependencies[i]) : dependencies[i];

                        // CHECK DEFINE STATUS

                        if(isType(module, 'undefined')) break;
                        else requiredModules[i] = module;

                        i+=1;
                    }

                    if(i===len){

                        addModule(namespace, fn.apply((isType(self, 'undefined') ? this : getModule(self)), requiredModules));
                        //cache[a] = null;
                        cache_len-=1;
                        if(a<cache_len) {

                            cache[a] = cache[cache_len];
                            //cache[cache_len] = null;
                        }
                        update_state = true;
                    }
                }

                a+=1;
            }

            return update_state;
            */
        };

		/**
		 * Get a module
		 * @const
		 */
		var getModule = function(name){

			//moduleCounts

			return modules[name];

			//var index = getIndex(arr);

			//return getIndex(name.split('.'));//modules[arr[index]];
		};

		/**
		 * Add a module to cache
		 * @param {string} name The name of the module
		 * @const
		 */
		var addCache = function(name, dependencies, fn, self){

		    cache[cache.length] = [name, dependencies, fn, self];
		    //cache_len += 1;
		    //console.log(Object.create(cache));
		};


		/**
		 * Add a module
		 * @param {string} name The name of the module
		 * @param {*} fn Can have any type
		 * @const
		 */
		var addModule = function(name, fn){

			modules[name] = fn;

			//console.log(Object.create(modules));

	/*
			return;

	console.log('_____________________');

			var arr = name.split('.');

			if(arr.length > 1){

				name = arr.pop();
				console.log(name);
				console.log(modules);
				var module = getIndex(arr);
				console.log(module);
				console.log(arr);
				if(arr.length === 1) module = modules;




				if(typeof module[name] !== 'undefined'){

					var key, old_props = Object.create(module[name]);

					module[name] = fn;

					for(key in old_props){
						if(old_props.hasOwnProperty(key)){
							module[name][key] = old_props[key];
						}
					}

					console.log(module[name]);

	console.log('_____________________');
				}

				else{


					if(typeof module[name] !== 'undefined'){

						var key, old_props = Object.create(module[name]);

						module[name] = fn;

						for(key in old_props){
							if(old_props.hasOwnProperty(key)){
								if(typeof module[name][key] === 'undefined') module[name][key] = old_props[key];
							}
						}
					}
				}

			}
			else if(arr.length > 0){

				if(typeof modules[arr[0]] !== 'undefined'){

					modules[arr[0]] = void 0;
				}
				modules[arr[0]] = fn;
			}
			*/

		};

		/*
		var extendModule = function(target, fn){

			if(target !== {}){

				var old_props = Object.create(target);

				module[name] = fn;

				for(var key in old_props){
					if(old_props.hasOwnProperty(key)){
						if(typeof module[name][key] === 'undefined') module[name][key] = old_props[key];
					}
				}
			}

			//modules[arr[index]] = fn;
		};
		*/
		/*
		var removeModule = function(name){

			var arr = parseParams(name);
			var index = getIndex(arr);

			mods[arr[index]] = null;
			delete mods[arr[index]];
		}
		*/

    	//var MODELLER = new _MODELLER();

		var _export = function(fn, target, rename, _update) {

			 install(fn, target, '', _update, true);
		};

		/**
		 * Install a module from ASAP to real Object
		 *
		 * @param {*=} fn
		 * @param {*=} target
		 * @param {*=} rename
		 * @param {boolean=} _update
		 * @param {boolean=} _export
		 * @const
		 */
        var install = function(fn, target, rename, _update, _export) {

			if(fn){

				if(isType(fn, 'string') /*|| fn.constructor !== [].constructor*/){

					fn = [fn];
				}

				var a = 0, len2 = fn.length;

				while(a < len2){

					last_define = '';

					/** @type {string} */
					var cur_fn = fn[a];

					/** @type {Array.<string>} */
					var arr_modules = cur_fn.split('.');

					/** @type {*|null} */
					var tmp_module;

					/* SKIP INSTALLATION SELF TARGET ON EXPORT AND PASS IT AS REFERENCE BY RECURSION --> .length - 2 */

					var i = 1, len = arr_modules.length - (_export ? 2 : 1);

					//TODO: if not defined -> update_cache

					/* CHECK UPDATE STATUS */

					if(!_update){

						/* GET REFERENCE FROM GLOBAL PATH */

						if(target){

							/* INSTALL TO TARGETS PROPERTY */

							if(isType(target, 'string')){

								/* CHECK FOR ALREADY GIVEN GLOBAL REFERENCE */

								if(target === 'window' && len > 0) { // if len === 0 --> bind target on window

									/* GET RENAME VALUE OR LAST PROPERTY */

									target = rename || arr_modules[len];

									/* DEFINE AND INITIALIZE MODULE */

									tmp_module = window[target] || (window[target] = getModule(cur_fn));
								}

								/* GET REFERENCE FROM GLOBAL PATH */

								else {

									/* DEFINE AND INITIALIZE MODULE */

									tmp_module = window[target] || (window[target] = getModule(cur_fn));

									/* ITERATE OVER PROPERTIES: CHECK AND CREATE MISSING SUB MODULES */

									while(i < len){

										tmp_module = tmp_module[arr_modules[i]] || (tmp_module[arr_modules[i]] = {});
										i++;
									}
								}

							}
							else {

								/* CHECK FOR ALREADY GIVEN GLOBAL REFERENCE */

								if(target === window && len > 0) { // if len === 0 --> bind target on window

									target = rename || arr_modules[len];

									/* GET REFERENCE FROM GLOBAL PATH IF WINDOW */

									tmp_module = window[target] || (window[target] = getModule(cur_fn));
								}

								/* GET REFERENCE FROM GIVEN OBJECT */

								else {

									tmp_module = target;

									if(!_export){

										/* GET RENAME VALUE OR LAST PROPERTY */

										target = rename || arr_modules[len];

										/* DEFINE AND INITIALIZE MODULE */

										tmp_module = tmp_module[target] || (tmp_module[target] = getModule(cur_fn));

									}
								}

								//tmp_module = rename ? target[rename] || (target[rename] = getModule(cur_fn) || {}) : target;
							}

						}

						/* DEFAULT: GLOBAL IS TARGET */

						else {

							tmp_module = window;

							if(!_export){

								/* ITERATE OVER PROPERTIES: CHECK AND CREATE MISSING SUB MODULES */

								i = 0;

								while(i < len){

									tmp_module = tmp_module[arr_modules[i]] || (tmp_module[arr_modules[i]] = {});
									i++;
								}

								/* DEFINE AND INITIALIZE MODULE */

								if(i < len + 1) {

									tmp_module = tmp_module[arr_modules[i]] = getModule(cur_fn);
								}
							}
						}
					}
					else {

						tmp_module = target;

						if(!_export){

							/* ITERATE OVER PROPERTIES: CHECK AND CREATE MISSING SUB MODULES */

							i = 0;

							while(i < len){

								tmp_module = tmp_module[arr_modules[i]] || (tmp_module[arr_modules[i]] = {});
								i++;
							}

							/* DEFINE AND INITIALIZE MODULE */

							if(i < len + 1) {

								tmp_module = tmp_module[arr_modules[i]] = getModule(rename);
							}

							//tmp_module = tmp_module[arr_modules[len]] || (tmp_module[arr_modules[len]] = getModule(rename));
						}
					}

					//console.log(fn);
					//console.log(window['test']);

					/* UPDATE PROPERTIES VIA RECURSION */

					if(!_update){

						/* GET OBJECT KEYS */

						var keys = Object.keys(modules || {});

						i = 0, len = keys.length;

						while(i < len){

							/* CHECK ALL KEYS IF THEY STARTS WITH THE TARGET-STRING-PREFIX AND IS NOT ITSELF */

							if(keys[i].indexOf(cur_fn) > -1 && keys[i] !== cur_fn){

								/* RECURSIVE CALL: TARGET-STRING WILL BE CROPPED AND THE ORIGINAL REFERENCE-KEY IS PASSED AS THE "RENAME"-ARGUMENT (THIS IS NEEDED BY EXPORT-FUNCTION TO SKIP SELF REFERENCING) */

								install(keys[i].replace(cur_fn + '.', ''), tmp_module, keys[i], true);
							}

							i++;
						}
					}

					a++;
				}
			}

			/* FAST PSEUDO CHAINING */

			else {


				/* RECURSIVE CALL: RETURNS THE LAST KNOWN DEFINITION REGISTERED FOR INSTALLATION */

				if(last_define) return install(last_define, '');
			}
        };

		var module_tree = window.asap_module_tree = {};

		var addToTree = function(namespace, source){

			var arr = namespace.split('.'), i = 0, len = arr.length;

			var tree = module_tree;

			while(i<len){

				if(isType(tree[arr[i]], 'undefined')) tree = tree[arr[i]] = source;
				else tree = tree[arr[i]];

				i+=1;
			}
		};

		var updated = [];
		var last_define;

		/**
		 * Define a module
		 * @param {string} namespace The name of the module
		 * @const
		 */
    	var define = function(namespace, dependencies, fn, self, opt_cache) {

			last_define = namespace;

    	    if(isType(opt_cache, 'undefined')) opt_cache = true;

			var isPublic = false;

			if(isType(namespace, 'string')){

				if(namespace.charCodeAt(0)===33){ // --> {!}

					namespace = namespace.substring(1);
					isPublic = true;
				}
				if(namespace.charCodeAt(0)===42){ // --> {*}

					namespace = namespace.substring(1);
				}

				if(!isType(sources[namespace], 'undefined')) {

					for(var key in sources){

						if(isType(updated[key], 'undefined')){

							if(sources.hasOwnProperty(key)){

								if(isType(sources[key][0], 'string')) {

									if(namespace===sources[key][0]) {

										console.log("update addon 1: "+key);

										addCache(key, sources[key][0], sources[key][1], sources[key][2]);
										updated[key] = true;
										opt_cache = false;
									}
								}
								else if(!isType(sources[key][0], 'undefined')) {

									var i, len = sources[key][0].length;

									for(var i = 0; i < len; i++){

										if(isType(sources[key][0][i], 'string')) {

											if(namespace===sources[key][0][i]) {

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

    	    //console.log(namespace);
    		//console.log(dependencies);
    			//console.log('window.define');
    			//console.log(this);
    			/*
    			var args = arguments,
    			moduleName = args[0],
    			module = null;
    			*/

    			//var moduleName = namespace,
    			//module = null;

    			//args = slice.call(args, 1);

    			//if(args.length > 1) {


    			//var dependencies = args[0];

				/*
				if(require_on) {

					for(var i = 0; i < require_on.length; i++){

						if(dependencies) dependencies[dependencies.length] = require_on[i];
						else dependencies = [require_on[i]];
					}
				}
    			*/

                /* NO DEPENDENCIES CAN PASS */

    			if(isType(dependencies, 'function')) {

    				//dependencies => fn
    				//fn => self
    				if(isType(fn, 'undefined')) {

						sources[(isPublic?'!':'')+namespace] = [dependencies, fn, self];
						require_order[require_order.length] = namespace;
    				    addModule(namespace, dependencies());

    				}
    				else {

						sources[(isPublic?'!':'')+namespace] = [dependencies, fn, self];
						require_order[require_order.length] = namespace;
    				    addModule(namespace, dependencies.call(fn));

    				    //addModule(namespace, dependencies());

    				    //console.log(modules[fn]);
    				}
    			}

    			/* CHECK VALUE: DIRECT ASSIGN, NO DEPENDENCIES */

    			else if(isType(fn, 'undefined')) {

					sources[(isPublic?'!':'')+namespace] = [dependencies, fn, self];
					require_order[require_order.length] = namespace;
					/*
					//todo: proof this state
    				if(isType(dependencies, 'undefined')) {

                        if(opt_cache) addCache(namespace, dependencies, fn, self);

                        return false;
    				}
					*/

    				addModule(namespace, dependencies);

					//imported[namespace] = true;
					//addToTree(namespace, [dependencies, fn, self, isPublic]);
					//js[js.length] = (namespace.indexOf('.')>-1 ? '' : 'var ') + namespace + ' = ' + dependencies.toString() + ';';
    			}

    			else {

                    if(isType(dependencies, 'string')) {

                        dependencies = [dependencies];
                    }



        			/* CHECK DEPENDENCIES */

    				var requiredModules = [];

    				var i = 0, len = dependencies.length;

    				/* LOOP OVER DEPENDENCIES */

    				while(i < len) {

						/*
						if(isType(dependencies[i], 'string')){

							sources[namespace] = [dependencies, fn, self];

							//console.log(imported);
						}
						else{

							sources[namespace] = [dependencies, fn, self];
							//imported[dependencies[i]] = true;
						}
						*/

						//sources[namespace] = [dependencies, fn, self];


    				    /* GET DEPENDENCIE */

    				    var module = isType(dependencies[i], 'string') ? getModule(dependencies[i]) : dependencies[i];

                        /* CHECK DEFINE STATUS */

                        if(isType(module, 'undefined')) {

                            console.log('Missing: ' + namespace + ' => ' + dependencies[i]);

                            if(opt_cache) addCache(namespace, dependencies, fn, self);

                            return false;
                        }

                        /* RETURN MODULE */

                        requiredModules[requiredModules.length] = module;


    					i+=1;
    				}

					sources[(isPublic?'!':'')+namespace] = [dependencies, fn, self];
					require_order[require_order.length] = namespace;
    				addModule(namespace, fn.apply((isType(self, 'undefined') ? this : getModule(self)), requiredModules));


					i = 0;

					//console.log(dependencies);
	/*
					while (i < len) {


						if(isType(dependencies[i], 'string')) {


							imported[dependencies[i]] = true;
							//addToTree(dependencies[i], [dependencies, fn, self, isPublic]);
						}
						else if(!isType(dependencies[i], 'undefined')) imported[parseParams(fn)[i]] = true;


						i+=1;
					}
				*/
    				/*
    					if(dependencies.length===1) modules[namespace] = fn.call(self?modules[self]:this, modules[dependencies[0]]);
    					else if(dependencies.length===2) modules[namespace] = fn.call(self?modules[self]:this, modules[dependencies[0]], modules[dependencies[1]]);
    					else if(dependencies.length===3) modules[namespace] = fn.call(self?modules[self]:this, modules[dependencies[0]], modules[dependencies[1]], modules[dependencies[2]]);
    					else if(dependencies.length===4) modules[namespace] = fn.call(self?modules[self]:this, modules[dependencies[0]], modules[dependencies[1]], modules[dependencies[2]], modules[dependencies[3]]);
    					else if(dependencies.length===5) modules[namespace] = fn.call(self?modules[self]:this, modules[dependencies[0]], modules[dependencies[1]], modules[dependencies[2]], modules[dependencies[3]], modules[dependencies[4]]);
    				*/
        		}

        		if(opt_cache && cache.length) while(updateCache()){};

				/* RETURN THIS: FAST PSEUDO CHAINING */

    			return this;

    			//console.log(namespace + ':' + modules[namespace]);
    			//console.log(module);
    			//modules[namespace] = module;

    		};
    		/*
    		function addProp(class, fn_name){

    			if(typeof modules[class] !== undefined){

    				requiredModules[arr[0]] = {};
    				requiredModules[arr[0]][arr[1]] = true;
    			}
    			else{

    				if(typeof modules[arr[0]][arr[1]] === undefined){

    					addProperty(arr[0], arr[1]);
    				}
    			}
    		};
    		*/

			//var require_on = null;
			var require_count = 0;
			var publicList = {};


			/**
			 * Run one or multiple modules
			 * @param {*} dependencies The name of the module
			 * @param {Function=} callback The name of the module
			 * @param {*=} self
			 * @const
			 */
    		var run = function(dependencies, callback, self) {

				require(dependencies)();
				if(callback) callback();
			};

			/**
			 * Require one or multiple modules
			 * @param {*} dependencies The name of the module
			 * @param {*=} fn The name of the module
			 * @param {*=} self
			 * @param {boolean=} opt_cache
			 * @const
			 */
    		var require = function(dependencies, fn, self, opt_cache) {

				last_define = fn;

                if(isType(opt_cache, 'undefined')) opt_cache = true;

				//var isPublic = false;


    			/*
    			var args = arguments,
    			dependencies = [],
    			callback = null;
    			*/
    			/*
    			if(args.length > 2) {

    			console.log(args);

    			args = slice.call(args, 1);
    			}
    			*/


    			/* NO ARRAY DEPENDENCIE */

                if(isType(dependencies, 'string')) {

					//if(isType(dependencies, 'string')){

						if(dependencies.charCodeAt(0) === 33){ // --> {!}

							dependencies = dependencies.substring(1);
							publicList[dependencies] = true;
							var tmpStr = dependencies;
							while(tmpStr.indexOf('.')>-1) publicList[tmpStr = tmpStr.substring(0, tmpStr.lastIndexOf('.'))] = true;

						}
						if(dependencies.charCodeAt(0) === 42){ // --> {*}

							dependencies = dependencies.substring(1);
						}
					//}

                    if(isType(modules[/** @type {string} */(dependencies)], 'undefined')) {

						//console.log(dependencies);

                        if(opt_cache) addCache('', dependencies, fn, self);
                        return false;
                    }

					dependencies = [dependencies];


					//console.log(imported);
                    //fn.call(isType(self, 'undefined') ? this : self, getModule(dependencies));
                }

				/*
				else if(dependencies.constructor !== [].constructor) {

					 dependencies = [dependencies];
				}
				*/

                /* CHECK DEPENDENCIES: DEFINE */

                var requiredModules = [];
                var i = 0, len = dependencies.length;

                while (i < len) {

                    var module;

					if(isType(dependencies[i], 'string')) {

						if(dependencies[i].charCodeAt(0) === 33){ // --> {!}

							dependencies[i] = dependencies[i].substring(1);
							publicList[dependencies[i]] = true;
							var tmpStr = dependencies[i];
							while(tmpStr.indexOf('.')>-1) publicList[tmpStr = tmpStr.substring(0, tmpStr.lastIndexOf('.'))] = true;
						}

						if(dependencies[i].charCodeAt(0) === 42){ // --> {*}

							dependencies[i] = dependencies[i].substring(1);
						}

						if(moduleCounts[dependencies[i]]) {

							moduleCounts[dependencies[i]]++;
						}
						else {

							moduleCounts[dependencies[i]] = 1;
						}

						module = getModule(dependencies[i]);

						if(isType(sources[dependencies[i]], 'undefined')) {

							console.log('Build Missing: ' + dependencies[i]);
							return;
						}

						if((isType(sources[dependencies[i]][0], 'string') || isArrayType(sources[dependencies[i]][0], 'Array')) && isType(sources[dependencies[i]][1], 'undefined') === false){

							var nextSources = [];

							if(isType(sources[dependencies[i]][0], 'string')){

								/*
								if(sources[dependencies[i]][0].charCodeAt(0) === 33){ // --> {!}

									sources[dependencies[i]][0] = sources[dependencies[i]][0].substring(1);
									isPublic = true;
								}
								if(sources[dependencies[i]][0].charCodeAt(0) === 42){ // --> {*}

									sources[dependencies[i]][0] = sources[dependencies[i]][0].substring(1);
								}
								*/

								nextSources[nextSources.length] = sources[dependencies[i]][0];
							}
							else {

								for(var  a= 0; a < sources[dependencies[i]][0].length; a++) {

									if(isType(sources[dependencies[i]][0][a], 'string')) {

										/*
										if(sources[dependencies[i]][0][a].charCodeAt(0) === 33){ // --> {!}

											sources[dependencies[i]][0][a] = sources[dependencies[i]][0][a].substring(1);
											isPublic = true;
										}
										if(sources[dependencies[i]][0][a].charCodeAt(0) === 42){ // --> {*}

											sources[dependencies[i]][0][a] = sources[dependencies[i]][0][a].substring(1);
										}
										*/

										nextSources[nextSources.length] = sources[dependencies[i]][0][a];
									}
								}
							}

							while(nextSources.length) {

								var nextSource = nextSources.pop();

								if((isType(sources[nextSource][0], 'string') || isArrayType(sources[nextSource][0], 'Array')) && isType(sources[nextSource][1], 'undefined') === false){

									if(isType(sources[nextSource][0], 'string')) {

										/*
										if(sources[nextSource][0].charCodeAt(0) === 33){ // --> {!}

											sources[nextSource][0] = sources[nextSource][0].substring(1);
											isPublic = true;
										}
										if(sources[nextSource][0].charCodeAt(0) === 42){ // --> {*}

											sources[nextSource][0] = sources[nextSource][0].substring(1);
										}
										*/

										nextSources[nextSources.length] = sources[nextSource][0];
									}
									else {

										for(var a = 0; a < sources[nextSource][0].length; a++) {

											if(isType(sources[nextSource][0][a], 'string')) {

												/*
												if(sources[nextSource][0][a].charCodeAt(0) === 33){ // --> {!}

													sources[nextSource][0][a] = sources[nextSource][0][a].substring(1);
													isPublic = true;
												}
												if(sources[nextSource][0][a].charCodeAt(0) === 42){ // --> {*}

													sources[nextSource][0][a] = sources[nextSource][0][a].substring(1);
												}
												*/

												nextSources[nextSources.length] = sources[nextSource][0][a];
											}
										}
									}
								}

								//sources[(isPublic?'!':'')+namespace] = [dependencies, fn, self];
								if(moduleCounts[nextSource]) {

									moduleCounts[nextSource]++;
								}
								else {

									moduleCounts[nextSource] = 1;
								}
							}
						}
					}
					else {

						module = dependencies[i];
					}

					//console.log(dependencies[i]);

                    //console.log(dependencies[i]);
                    //console.log(module);

                    if(isType(module, 'undefined')) {

						//console.log(dependencies);

                        if(opt_cache) addCache('', dependencies, fn, self);
                        return false;
                    }

                    requiredModules[i] = module;

                    i += 1;
                }

				if(isType(fn, 'undefined')) {

					if(dependencies.length === 1) {

						require_order[require_order.length] = dependencies[0];
						//requiredModules[requiredModules.length] = dependencies[0];

						if(moduleCounts[dependencies[0]]) {

							moduleCounts[dependencies[0]]++;
						}
						else {

							moduleCounts[dependencies[0]] = 1;
						}

						//todo:
						//var source = sources[dependencies[0]];
						//var dependencies = source[0];
						//var fn = source[1];
						//var self = source[2];

						//js[js.length] = dependencies[0] + '();';

						return getModule(dependencies[0]);
					}
					else{

						var return_arr = {};

						for(var a=0; a<dependencies.length; a++) {

							require_order[require_order.length] = dependencies[a];
							//requiredModules[requiredModules.length] = dependencies[a];

							if(moduleCounts[dependencies[a]]) {

								moduleCounts[dependencies[a]]++;
							}
							else {

								moduleCounts[dependencies[a]] = 1;
							}

							return_arr[dependencies[a]] = getModule(dependencies[a]);
						}

						return return_arr;
					}
				}

                else if(isType(self, 'undefined')){

					var uid = '$$require$$' + (require_count++);

					sources[uid] = [dependencies, fn, self];
					moduleCounts[uid] = 1;
					require_order[require_order.length] = uid;
					//console.log(requiredModules);

					var fn_return = fn.apply(this, requiredModules);



                    return fn_return;
                }
                else if(isType(self, 'string')){



					var uid = '$$require$$' + (require_count++);

					sources[uid] = [dependencies, fn, self];
                    moduleCounts[uid] = 1;
					require_order[require_order.length] = uid;
					//console.log(dependencies);

					var fn_return = fn.apply(getModule(self), requiredModules);



                    return fn_return;
                    //modules[self][namespace] = modules[namespace];
                    //console.log(modules[self]);
                }
				else {



					//console.log(dependencies);

					var uid = '$$require$$' + (require_count++);

					sources[uid] = [dependencies, fn, self];
					moduleCounts[uid] = 1;
					require_order[require_order.length] = uid;

					var fn_return = fn.apply(self, requiredModules);



                    return fn_return;
                    //modules[self][namespace] = modules[namespace];
                    //console.log(modules[self]);
                }

			    //i = 0;

				//console.log(dependencies);

/*
                while (i < len) {

					if(!isType(dependencies[i], 'undefined')) {

						if(isType(dependencies[i], 'string')) {

							imported[dependencies[i]] = true;
						}
						else if(!isType(dependencies[i], 'undefined')) imported[parseParams(fn)[i]] = true;
					}
					i+=1;
					//else if(!isType(dependencies[i], 'undefined')) {

					//}
				}
*/
    			/*
    			for(var i=0; i < dependencies.length; i++) {

    				requiredModules[i] = modules[dependencies[i]];
    			}
    		      */

    		/*
    			if(dependencies.length===1) fn.call(self?modules[self]:this, modules[dependencies[0]]);
    			else if(dependencies.length===2) fn.call(self?modules[self]:this, modules[dependencies[0]], modules[dependencies[1]]);
    			else if(dependencies.length===3) fn.call(self?modules[self]:this, modules[dependencies[0]], modules[dependencies[1]], modules[dependencies[2]]);
    			else if(dependencies.length===4) fn.call(self?modules[self]:this, modules[dependencies[0]], modules[dependencies[1]], modules[dependencies[2]], modules[dependencies[3]]);
    			else if(dependencies.length===5) fn.call(self?modules[self]:this, modules[dependencies[0]], modules[dependencies[1]], modules[dependencies[2]], modules[dependencies[3]], modules[dependencies[4]]);
    		*/
    			//fn.call(self||this, modules[dependencies[0]], modules[dependencies[1]], modules[dependencies[2]], modules[dependencies[3]]);

				//return true;

    		};

			/**
			 * Undefine a module
			 * @param {string} namespace The name of the module
			 * @const
			 */

			var undefine = function(namespace) {

				if(!isType(modules[namespace], 'undefined')){

					delete modules[namespace];
				}

				if(!isType(sources[namespace], 'undefined')){

					delete sources[namespace];
				}

				for(var a = 0; a < cache.length; a++){

					if(namespace === cache[a][0]) {

						delete cache[a];
						break;
					}
				}
			};

			/**
			 * Release unused cache
			 * @const
			 */

			var release = function(){

				for(var key in sources){

					if(sources.hasOwnProperty(key)){

						for(var a = 0; a < sources[key].length; a++){

							delete sources[key][a];
						}

						delete sources[key];
					}
				}

				for(var key in modules){

					if(modules.hasOwnProperty(key)){

						if(!isType(imported[key], 'undefined') || isType(moduleCounts[key], 'undefined')) {

							delete modules[key];
						}
					}
				}

				while(cache.length) cache.pop();
			};

			var buildStart = function(dependencies){

				moduleCounts = {};

				if(dependencies){

					/* DEFINE ALL PROPERTIES TO PUBLIC ON PUBLIC DEPENDENCIES */

					if(isType(dependencies, 'string')){

						dependencies = [dependencies];
					}

					var keys = Object.keys(sources || {});
					//var requiredArr = [];

					for(var a = 0; a < dependencies.length; a++){

						var curItem = dependencies[a];
						var isPublic = false;

						if(curItem.substr(curItem.length - 2) === '.*'){ // --> {!}

							if(curItem.charCodeAt(0) === 33) {

								curItem = curItem.substr(1);
								isPublic = true;
							}

							dependencies[a] = curItem = curItem.substr(0, curItem.length - 2);

							//requiredArr[requiredArr.length] = curItem;

							if(isPublic){

								/* GET OBJECT KEYS */

								for(var i = 0; i < keys.length; i++){

									/* CHECK ALL KEYS IF THEY STARTS WITH THE TARGET-STRING-PREFIX AND IS NOT ITSELF */

									if(keys[i].indexOf(curItem + '.') > -1 /*&& keys[i] !== dependencies[a]*/){

										publicList[keys[i]] = true;
										moduleCounts[keys[i]] = 1;
										//require_order[require_order.length] = keys[i];
										//install(keys[i].replace(cur_fn + '.', ''), tmp_module, keys[i], true);
									}

								}
							}

							//require(requiredArr);
						}

						var splitArr = curItem.split('.');
						var str = '';

						for(var i = 0; i < splitArr.length; i++){

							str+=(str?'.':'')+splitArr[i];
							publicList[str] = true;
						}
					}

					require(dependencies);

					console.log(publicList);
				}
				//imported = {};
			};

            /*
    		window['_install'] = function(dst, src){

    			this.parseName();
    		};

    		window['_extend'] = function(dst, src){

    		}
            */

			//handle
			//perform
			//implement
			//execute
			//extract
			//import
			//extend
			//construct
			//update
			//transfer
			//assign
			//copy
			//export
			//trigger
			//produce

			/** @const */
			window['ASAP'] = {

				/**
				 * @type {Function}
				 */
				'define': window['define'] ? define : window['define'] = define,
				/**
				 * @type {Function}
				 */
				'require': window['require'] ? require : window['require'] = require,
				/**
				 * @type {Function}
				 */
				'run': run,
				/**
				 * @type {Function}
				 */
				'install': install,
				/**
				 * @type {Function}
				 */
				'export': _export,
				/**
				 * @type {Function}
				 */
				'build': build,
				/**
				 * @type {Function}
				 */
				'convert': convert,
				/**
				 * @type {Function}
				 */
				'undefine': undefine,
				/**
				 * @type {Function}
				 */
				'release': release,
				/**
				 * @type {Function}
				 */
				'buildStart': buildStart,
				/**
				 * @type {Function}
				 */
				'debug': debug,
				/**
				 * @type {Function}
				 */
				'out': out,

				'register': register
			};


			if(DEBUG){

				window['asap_imported'] = imported;
				window['asap_module_tree'] = module_tree;
				window['asap_sources'] = sources;
				window['asap_modules'] = modules;
				window['asap_cache'] = cache;
				window['asap_moduleCounts'] = moduleCounts;
				window['require_order'] = require_order;
				window['asap_js'] = js;
			}
    }();

	//window.obfuscate = {};

	//delete window.obfuscate;

})();



/*
(function() {

    var modules = {};
    // var slice = Array.prototype.slice;

    var mergeProp = function(module, fn) {

        modules[module][fn] = modules[fn];
    }


    var mergeProto = function(module, fn) {

        //if(typeof dependencies === 'function') {

            //module = dependencies();

        if(typeof modules[module].prototype !== 'undefined') {

            modules[module].prototype[fn] = modules[fn];//fn.apply(modules[class]);
        }
        else if(typeof modules[module].constructor.prototype !== 'undefined'){

            modules[module].constructor.prototype[fn] = modules[fn];//fn.apply(modules[class]);
        }

    };
}());

*/


