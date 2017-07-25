/**!
 * Xone Javascript Framework (Build)
 * @version 0.0.522
 * @build 1460773831/500047323
 * @author Thomas Wilkerling
 * @license Apache-2.0
 * @link https://www.npmjs.com/package/xone
 * @link https://github.com/nextapps-de/xone
 * @tutorial https://nextapps-de.github.io/xone/
 */

/* global _ */
(function () {
	'use strict';

	/* jshint ignore:start */
	// Underscore's Template Module
	// Courtesy of underscorejs.org
	var _ = (function (_) {
		_.defaults = function (object) {
			if (!object) {
				return object;
			}
			for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {
				var iterable = arguments[argsIndex];
				if (iterable) {
					for (var key in iterable) {
						if (object[key] == null) {
							object[key] = iterable[key];
						}
					}
				}
			}
			return object;
		}

		// By default, Underscore uses ERB-style template delimiters, change the
		// following template settings to use alternative delimiters.
		_.templateSettings = {
			evaluate    : /<%([\s\S]+?)%>/g,
			interpolate : /<%=([\s\S]+?)%>/g,
			escape      : /<%-([\s\S]+?)%>/g
		};

		// When customizing `templateSettings`, if you don't want to define an
		// interpolation, evaluation or escaping regex, we need one that is
		// guaranteed not to match.
		var noMatch = /(.)^/;

		// Certain characters need to be escaped so that they can be put into a
		// string literal.
		var escapes = {
			"'":      "'",
			'\\':     '\\',
			'\r':     'r',
			'\n':     'n',
			'\t':     't',
			'\u2028': 'u2028',
			'\u2029': 'u2029'
		};

		var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

		// JavaScript micro-templating, similar to John Resig's implementation.
		// Underscore templating handles arbitrary delimiters, preserves whitespace,
		// and correctly escapes quotes within interpolated code.
		_.template = function(text, data, settings) {
			var render;
			settings = _.defaults({}, settings, _.templateSettings);

			// Combine delimiters into one regular expression via alternation.
			var matcher = new RegExp([
				(settings.escape || noMatch).source,
				(settings.interpolate || noMatch).source,
				(settings.evaluate || noMatch).source
			].join('|') + '|$', 'g');

			// Compile the template source, escaping string literals appropriately.
			var index = 0;
			var source = "__p+='";
			text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
				source += text.slice(index, offset)
					.replace(escaper, function(match) { return '\\' + escapes[match]; });

				if (escape) {
					source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
				}
				if (interpolate) {
					source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
				}
				if (evaluate) {
					source += "';\n" + evaluate + "\n__p+='";
				}
				index = offset + match.length;
				return match;
			});
			source += "';\n";

			// If a variable is not specified, place data values in local scope.
			if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

			source = "var __t,__p='',__j=Array.prototype.join," +
				"print=function(){__p+=__j.call(arguments,'');};\n" +
				source + "return __p;\n";

			try {
				render = new Function(settings.variable || 'obj', '_', source);
			} catch (e) {
				e.source = source;
				throw e;
			}

			if (data) return render(data, _);
			var template = function(data) {
				return render.call(this, data, _);
			};

			// Provide the compiled function source as a convenience for precompilation.
			template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

			return template;
		};

		return _;
	})({});

	if (location.hostname === 'todomvc.com') {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-31081062-1', 'auto');
		ga('send', 'pageview');
	}
	/* jshint ignore:end */

	function redirect() {
		if (location.hostname === 'tastejs.github.io') {
			location.href = location.href.replace('tastejs.github.io/todomvc', 'todomvc.com');
		}
	}

	function findRoot() {
		var base = location.href.indexOf('examples/');
		return location.href.substr(0, base);
	}

	function getFile(file, callback) {
		if (!location.host) {
			return console.info('Miss the info bar? Run TodoMVC from a server to avoid a cross-origin error.');
		}

		var xhr = new XMLHttpRequest();

		xhr.open('GET', findRoot() + file, true);
		xhr.send();

		xhr.onload = function () {
			if (xhr.status === 200 && callback) {
				callback(xhr.responseText);
			}
		};
	}

	function Learn(learnJSON, config) {
		if (!(this instanceof Learn)) {
			return new Learn(learnJSON, config);
		}

		var template, framework;

		if (typeof learnJSON !== 'object') {
			try {
				learnJSON = JSON.parse(learnJSON);
			} catch (e) {
				return;
			}
		}

		if (config) {
			template = config.template;
			framework = config.framework;
		}

		if (!template && learnJSON.templates) {
			template = learnJSON.templates.todomvc;
		}

		if (!framework && document.querySelector('[data-framework]')) {
			framework = document.querySelector('[data-framework]').dataset.framework;
		}

		this.template = template;

		if (learnJSON.backend) {
			this.frameworkJSON = learnJSON.backend;
			this.frameworkJSON.issueLabel = framework;
			this.append({
				backend: true
			});
		} else if (learnJSON[framework]) {
			this.frameworkJSON = learnJSON[framework];
			this.frameworkJSON.issueLabel = framework;
			this.append();
		}

		this.fetchIssueCount();
	}

	Learn.prototype.append = function (opts) {
		var aside = document.createElement('aside');
		aside.innerHTML = _.template(this.template, this.frameworkJSON);
		aside.className = 'learn';

		if (opts && opts.backend) {
			// Remove demo link
			var sourceLinks = aside.querySelector('.source-links');
			var heading = sourceLinks.firstElementChild;
			var sourceLink = sourceLinks.lastElementChild;
			// Correct link path
			var href = sourceLink.getAttribute('href');
			sourceLink.setAttribute('href', href.substr(href.lastIndexOf('http')));
			sourceLinks.innerHTML = heading.outerHTML + sourceLink.outerHTML;
		} else {
			// Localize demo links
			var demoLinks = aside.querySelectorAll('.demo-link');
			Array.prototype.forEach.call(demoLinks, function (demoLink) {
				if (demoLink.getAttribute('href').substr(0, 4) !== 'http') {
					demoLink.setAttribute('href', findRoot() + demoLink.getAttribute('href'));
				}
			});
		}

		document.body.className = (document.body.className + ' learn-bar').trim();
		document.body.insertAdjacentHTML('afterBegin', aside.outerHTML);
	};

	Learn.prototype.fetchIssueCount = function () {
		var issueLink = document.getElementById('issue-count-link');
		if (issueLink) {
			var url = issueLink.href.replace('https://github.com', 'https://api.github.com/repos');
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onload = function (e) {
				var parsedResponse = JSON.parse(e.target.responseText);
				if (parsedResponse instanceof Array) {
					var count = parsedResponse.length;
					if (count !== 0) {
						issueLink.innerHTML = 'This app has ' + count + ' open issues';
						document.getElementById('issue-count').style.display = 'inline';
					}
				}
			};
			xhr.send();
		}
	};

	redirect();
	getFile('learn.json', Learn);
})();
(function(){var d={};
(function(){function l(c){var a=c.toString();c=a.substring(a.indexOf("(")+1,a.indexOf(")"));-1!==c.indexOf(",")&&(c=c.substring(0,c.indexOf(",")));var b=a.substring(a.indexOf("{")+1,a.length-1),a=b.substring(0,b.indexOf("return ")),b=b.substring(b.indexOf("return ")+7,b.length).replace(";","");return[c,a,b]}function u(c,a){return null===a?-1:null===c?1:isNaN(a)?-1:isNaN(c)?1:a-c}function q(c,a){return null===c?1:null===a?-1:isNaN(c)?1:isNaN(a)?-1:c-a}function n(c,a){return(""+a).localeCompare(c)}function t(c,
a){return(""+c).localeCompare(a)}function w(c,a,b,g,e,k,f,p,z){c=c.toUpperCase();k=k||{Accept:"application/json","Content-Type":"application/json"};var m="POST"!==c&&"PATCH"!==c&&"DELETE"!==c||"application/json"!==k.Accept?"":JSON.stringify(b),x=m.replace(/ /g,"").replace(/"/g,"").replace(/{/g,"/").replace(/}/g,"").replace(/:/g,"/");"GET"===c&&(a+="?"+d.rb(b));p&&h&&"undefined"!==typeof h.abort&&h.abort();if(z&&"GET"===c&&(b=d.J.get(a+x))){g(b);return}"undefined"!==typeof XMLHttpRequest&&(h=new XMLHttpRequest);
if(!h)try{h=new ActiveXObject("Msxml2.XMLHTTP")}catch(aa){try{h=new ActiveXObject("Microsoft.XMLHTTP")}catch(ba){}}if(h){h.open(c,a,"undefined"===typeof f?!0:f);for(var y in k)k.hasOwnProperty(y)&&h.setRequestHeader(y,k[y]);(function(c,a,b,m,g,e,k,f){a.Authorization&&(c.withCredentials=!0);c.onreadystatechange=function(){if(4==c.readyState){var a=null;if(200==c.status||201==c.status){try{a=c.responseText?JSON.parse(c.responseText):[]}catch(Z){}b&&"GET"===m&&d.J.set(g+x,a);k&&(null===a&&(a=[]),k(a))}else if(f){try{a=
c.responseText?JSON.parse(c.responseText):[]}catch(Z){}a&&a.error&&A.wb(a.error.constructor===Object?JSON.stringify(a.error):a.error);return f(c.status,a)}}}})(h,k,z,c,a,m,g,e);h.send(m.length?m:null)}else"GET"===c&&(document.location.href=a+(m.length?"?":"")+m)}function r(){g.splice(0,1)[0]();g.length?d.async(r):z=!1}function v(c){return this["is"+c[0].toUpperCase()+c.substring(1)]}var h=null,f=function(){var c=window.getComputedStyle(document.documentElement,"");return(Array.prototype.slice.call(c).join("").match(/-(moz|webkit|ms)-/)||
""===c.OLink&&["","o"])[1]}();d.b=function(c,a){return a?typeof c===a:"undefined"!==typeof c};d.nc=function(c){return"string"===typeof c};d.lc=function(c){return"number"===typeof c};d.dc=function(c){return"boolean"===typeof c};d.fc=function(c){return"undefined"!==typeof c};d.Ca=function(c){return c||0===c||!1===c||""===c?!0:!1};d.isArray=function(c){return c&&c.constructor===Array?!0:!1};d.Fa=function(c){return c&&c.constructor===Object?!0:!1};d.jb=function(c){return HTMLCollection.prototype.isPrototypeOf(c)||
NodeList.prototype.isPrototypeOf(c)};d.kc=function(c){return c&&c.nodeType&&c.nodeName?!0:!1};d.Yb=function(c){if(c&&c.length)for(var a=0;a<c.length;a++)if(d.Ca(c[a]))return!0;return!1};d.Xb=function(c){return Object.keys(c).length?!0:!1};d.gc=function(c){return c&&!c.length?!0:!1};d.cc=function(c){return""===c};for(var a=";;;;;;;;backspace;tab;;;;enter;;;shift;ctrl;alt;pause/break;caps lock;;;;;;;esc;;;;;space;page up;page down;end;home;left;up;right;down;;;;;insert;delete;;;;".split(";"),b=97;123>
b;b++)a[b-32]=String.fromCharCode(b);for(b=48;58>b;b++)a[b]=String(b-48);for(b=1;13>b;b++)a[b+111]="f"+b;for(b=0;10>b;b++)a[b+96]="numpad "+b;d.zb=function(c,b){if("number"===typeof c){if(b[a[c]]){b[a[c]]();return}}else if(b[a[c.keyCode]]){b[a[c.keyCode]]();return}b["else"]&&b["else"]()};var e=d.ra=function(c){return d.b(c,"string")?d.ja[c]||d.D(c):c};d.console={log:function(){},warn:function(){},Sb:function(){},info:function(){}};var k=function(){for(var c,a=[],b=0;256>b;b++){c=b;for(var g=0;8>g;g++)c=
c&1?3988292384^c>>>1:c>>>1;a[b]=c}return a}(),g=[],z=!1,p=/[[:=+>*,~(]/;d.query=d.tc=function(c,a){if(!p.test(c)){if(-1===c.indexOf(" ")){var b=c[0];if("."===b)return d.M(c.substring(1));var m=c.indexOf(".");if(0<m){b=c.substring(m+1);a=[];c=d.u(c.substring(0,m));for(m=0;m<c.length;m++)d.v(c[m],b)&&(a[a.length]=c[m]);return a}return"#"===b?d.D(c.substring(1)):d.u(c)}b=c.split(" ");if(2===b.length){m=b[0];b=b[1];var g=m[0],e=b[0];if("#"===g){if("."===e)return d.M(b.substring(1),m.substring(1));if("#"!==
e)return d.u(b,m.substring(1))}else if("."===g){if("#"!==e&&"."!==e){a=[];c=d.M(m.substring(1));for(m=0;m<c.length;m++)a=a.concat(Array.prototype.slice.call(d.u(b,c[m])));return a}}else if("."===e){a=[];b=b.substring(1);if("document"===m||"body"===m)return d.M(b);c=d.u(m);for(m=0;m<c.length;m++)a=a.concat(Array.prototype.slice.call(d.M(b,c[m])));return a}}}return document[a?"querySelector":"querySelectorAll"](c)};d.ta=d.uc=function(c){c=d.query(c,!0);return d.jb(c)||d.isArray(c)?c[0]:c};d.X=function(c,
a){var b=!1;if("<"===a[0]&&(b=!0)||">"===a[0])a=d.trim(a.substring(1));if(b){if(c.closest)return c.closest(a);a=d.query(a);for(var b=a.length,m;c=c.parentElement;)for(m=0;m<b;m++)if(a[m]===c)return c}else return c.querySelector(a)};d.D=function(c){return d.ja[c]||(d.ja[c]=document.getElementById(c))};d.M=function(c,a){return(a?e(a):document).getElementsByClassName(c)};d.u=function(c,a){return(a?e(a):document).getElementsByTagName(c)};d.Wb=function(c){"string"===typeof c&&(c=d.query(c));0<=c.length&&
(c=c[0]);return c.value};d.Cc=function(c,a){"string"===typeof c&&(c=d.query(c));if(0<=c.length)for(var b=0;b<c.length;b++)c[b].value=a;else c.value=a};d.ha=function(c,a){var b=document.createElement(c.tag||"div"),m=c.ma;if(m)for(var g in m)if(m.hasOwnProperty(g)){var e=m[g],k="string"===typeof e;if("className"===g&&!1===k)b.className=e.join(" ");else if("style"===g&&!1===k){var k="",f;for(f in m[g])e.hasOwnProperty(f)&&(k+=f+"="+e[f]+";");b.setAttribute(g,k)}else if(a&&"data"===g&&!1===k)for(var h in e){if(e.hasOwnProperty(h)){-1!==
h.indexOf(".")?(e=h.split("."),b.appendChild(document.createTextNode(a[e[0]][e[1]]))):b.appendChild(document.createTextNode(a[h]));break}}else b.setAttribute(g,e)}c.text&&b.appendChild(document.createTextNode(c.text));return b};d.va=function(c,a,b){a||(a=document.createDocumentFragment());if(c){"undefined"===typeof c.length&&(c=[c]);for(var g=0;g<c.length;g++){var m=d.ha(c[g],b);c[g].Ta&&d.va(c[g].Ta,m,b);a.appendChild(m)}}};d.Mb=function(c,a,b){for(var g=0;g<b.length;g++)d.va(c,a,b[g])};d.Ac=function(c){for(var a;a=
c.lastChild;)c.removeChild(a)};d.eb=function(c){"string"===typeof c&&(c=d.query(c)[0]);d.m(function(){var a=c.value;c.focus();c.value="";c.value=a})};d.J=new function(){var c={},a={};this.set=function(b,g,m){c[b]=g;!m&&a[b]||(a[b]=(new Date).getTime())};this.get=function(b,g){return a[b]&&(g||3E5>(new Date).getTime()-a[b])?c[b]:null};this.clear=function(){c={};a={}}};d.ja={};d.Oa=function(c){w(c.type||"GET",c.url||"/",c.N||"",c.yb,c.error,c.G,c.async,c.clear,c.cache)};d.rb=function(c){var a="",b;
for(b in c)c.hasOwnProperty(b)&&(a+=(a?"&":"")+b+"="+encodeURIComponent(c[b]));return a};d.sb=function(){var c;c||(c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");for(var a="",b=c.length+.4999999,g=0;8>g;g++)a+=c.charAt(Math.random()*b-.5|0);return a};d.trim=function(c){if(c){for(var a=c.length,b=0,g=a;b<a&&(" "===c[b]||"\t"===c[b]||"\n"===c[b]);)b++;for(;a>b&&(" "===c[g-1]||"\t"===c[g-1]||"\n"===c[g-1]);)g--;if(b||g!==a)return c.substring(b,g)}return c};d.unique=function(c,a){for(var b=
{},g=[],e=0,m=c.length;e<m;e++){var k=a?c[e][a]:c[e];b[k]||(b[k]=!0,g[g.length]=k)}return g};d.qc=function(c,a){for(var b=arguments||[c,a],g,e=1;e<b.length;e++)if(g=b[e])c=(c||[]).concat(g);return c};d.reverse=function(c){for(var a=c.length,b=Array(a),g=0;g<a;g++)b[g]=c[a-g-1];return b};d.sort=function(c,a){return c.sort(a||t)};d.Hc=function(c){return c.sort(t)};d.Ic=function(c){return c.sort(n)};d.Jc=function(c,a){return c.sort(a||q)};d.Kc=function(c){return c.sort(q)};d.Lc=function(c){return c.sort(u)};
d.xb=function(c,a){for(var b=c.length,g,e,m=0;m<b;m++)e=Math.random()*b|0,g=c[m],c[m]=c[e],c[e]=g;return a&&--a?d.xb(c,a):c};d.Tb=function(a){var c=new Date(a);a=""+(c.getMonth()+1);var b=""+c.getDate(),c=c.getFullYear();2>a.length&&(a="0"+a);2>b.length&&(b="0"+b);return[c,a,b].join("-")};d.Ub=function(a,b,g,e){b="number"===typeof b?b:2;g=g||".";e=e||",";var c=parseInt(a=d.Math.abs(+a||0).toFixed(b),10)+"",k=c.length,k=3<k?k%3:0;return(0>a?"-":"")+(k?c.substr(0,k)+e:"")+c.substr(k).replace(/(\d{3})(?=\d)/g,
"$1"+e)+(b?g+d.Math.abs(a-c).toFixed(b).slice(2):"")};d.sc=function(a){var c;(c=d.D("image-preload"))||(c=d.ha({tag:"div",id:"image-preload",ma:{style:"display:none;position:absolute;height:0px;width:0px;overflow:hidden;pointer-events:none"}}),document.body.appendChild(c));for(var b,g=0;g<a.length;g++)b=new Image,b.setAttribute("lazyload","true"),b.src=a[g],d.a(b,{display:"none",height:"0px",width:"0px"}),c.appendChild(b)};d.async=function(a,b){return window.setTimeout(a,b)};d.stack=function(a,b){var c=
g.length;if(a.constructor===Array)for(var e=0;e<a.length;e++)g[c++]=a[e];else g[c]=a;z||(z=!0,d.async(r,b))};d.Vb=function(){return g.length};d.oc=function(a,b){var c=!1,g=b?function(){c||this.readyState&&"complete"!==this.readyState||(c=!0,b&&b())}:void 0;document.body.appendChild(d.ha({tag:"script",ma:{type:"text/javascript",async:!0,src:a,onload:g,onreadystatechange:g}}))};d.pc=function(a,b){document.body.appendChild(d.ha({tag:"link",ma:{rel:"stylesheet",type:"text/css",href:a,media:b||"all"}}))};
d.time=function(){var a=window.performance||window[f+"Performance"]||{};a.now||(a.now=a.now||a[f+"Now"]||Date.now||function(){return(new Date).getTime()});return a}();d.Ra=function(a){return a[0].toUpperCase()+a.slice(1)};d.prefix=f;d.Nb=function(a){for(var c=-1,b=0;b<a.length;b++)c=c>>>8^k[(c^a.charCodeAt(b))&255];return(c^-1)>>>0};d.count=function(a,b){var c,g=0;if("string"===typeof a){var e=0;for(c=b.length;-1!==(e=a.indexOf(""+b,e));)g++,e+=c}else if(d.isArray(a))for(c=0;c<a.length;c++)a[c]===
b&&g++;return g};d.replace=function(a,b,g){if("string"===typeof a)for(var c=0,e=b.length,k=g.length;-1!==(c=a.indexOf(""+b,c));)a=a.substring(0,c)+g+a.substring(c+e),c+=k;else if(a.length)for(c=0;c<a.length;c++)a[c]===b&&(a[c]=g);return a};d.xc=function(a){a=l(a);var c=a[0];return Function("$self","var $i = 0, $length = $self.length, "+c+";for(; $i < $length; $i++){"+c+" = $self[$i];"+a[1]+a[2]+";}return $self;")};d.zc=function(a){a=l(a);var c=a[0];return Function("$self","$edit","var $i = 0, $length = $self.length, $copy = $edit ? $self : new Array($length), "+
c+";for(; $i < $length; $i++){"+c+" = $self[$i];"+a[1]+"$copy[$i] = "+a[2]+";}return $copy;")};d.yc=function(a){a=l(a);var c=a[0];return Function("$self","$edit","var $i = 0, $length = $self.length, $copy = $edit ? $self : [], $count = 0, "+c+";for(; $i < $length; $i++){"+c+" = $self[$i];"+a[1]+"if($edit){ if(!("+a[2]+")){$copy.splice($i--, 1); $length--;}}else if("+a[2]+") $copy[$count++] = "+c+";};return $copy;")};d.contains=function(a,b){for(var c=a.length;c--;)if(a[c]===b)return!0;return!1};d.fill=
function(a,b,g,e){e=0<=e?Math.min(g+e,a.length):a.length;for(g=g||0;g<e;g++)a[g]=b;return a};d.za=function(a){if(a){if(Object.keys)return Object.keys(a);var c=[],b=0,g;for(g in a)a.hasOwnProperty(g)&&(c[b++]=g);return c}return[]};d.assign=function(a,b){if(!b||"object"!==typeof b)return a;for(var c=Object.keys(b),g,e=c.length,k=0;k<e;k++)g=c[k],a[g]=b[g]};d.rc=function(a){var b={};if((a=String(a)).length){var c;"?"===a[0]?a=a.substring(1):-1!==(c=a.indexOf("?"))&&(a=a.substring(c+1));a=a.split("&");
for(var g,e,k=0;k<a.length;k++)c=a[k].split("="),c[0]&&(e=c[1],"false"===e?e=!1:"true"===e?e=!0:"null"===e?e=null:e.length===String(g=parseFloat(e)).length?e=g:e=decodeURIComponent(e||""),b[decodeURIComponent(c[0])]=e)}return b};d.ac=function(a,b,g,e){var c=new Image;c.crossOrigin="anonymous";c.onload=function(){var a=document.createElement("canvas");a.height=this.height;a.width=this.width;a.getContext("2d").drawImage(this,0,0);b(a.toDataURL(g||"image/jpeg",e||1))};c.src=a};d.Math={min:function(a,
b,g){if("undefined"!==typeof g)a=Array.prototype.slice.call(arguments);else if("undefined"!==typeof b)return b<a?b:a;if(d.isArray(a)){for(var c=a[0],e=1;e<a.length;e++)a[e]<c&&(c=a[e]);return c}return a},max:function(a,b,g){if("undefined"!==typeof g)a=Array.prototype.slice.call(arguments);else if("undefined"!==typeof b)return a<b?b:a;if(d.isArray(a)){for(var c=a[0],e=0;e<a.length;e++)e?a[e]>c&&(c=a[e]):c=a[0];return c}return a},vc:Math.PI/180,cos:Math.cos,sin:Math.sin,round:function(a){return 0<=
a?a+.5|0:a-.5|0},wc:Math.random,abs:function(a){return 0>a?-a:a}};d.ia={ob:!!window.opera||0<=navigator.userAgent.indexOf(" OPR/"),hc:"undefined"!==typeof window.InstallTrigger,mc:0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor"),ic:!!document.documentMode};d.ia.ec=!!window.chrome&&!d.ia.ob;d.ia.is=v;d.C={mb:!!navigator.userAgent.match(/iPhone/i),nb:!!navigator.userAgent.match(/iPod/i),lb:!!navigator.userAgent.match(/iPad/i),ib:!!navigator.userAgent.match(/Android/i),Ea:!!window.cordova};
d.C.kb=d.C.mb||d.C.nb||d.C.lb;d.C.jc=d.C.kb||d.C.ib;d.C.is=v})();var B={},C={},E={},F={},H={},I={},J={},K={aa:{},J:{},Fb:{},la:{},Ua:function(l){return l},Wa:function(l){return l}},N={},A={},O={},P="en",Q=!1,R={ka:[]},S={},T,U={};function V(){}function W(){}var X={s:{}},I={},N={},H={},O={};d.Eb={};
(function(){function l(a){n=h(l);var b,e;if(b=v.length){for(e=0;e<b;e++){var k=v[e];!1!==k._html_new&&(k._html_new!==k._html&&(k.innerHTML=k._html=k._html_new),k._html_new=!1)}v=[]}if(b=w.length){for(e=0;e<b;e++){k=w[e];var g=k._style;var z=k._style_new;var p=k._style_keys;for(var c=null,m=0;m<p.length;m++){var x=p[m];var y=z[x];!1!==y&&(y!==g[x]&&((c||(c=k.style))[x]=g[x]=y),z[x]=!1)}k._style_keys=[]}w=[]}if(b=r.length){for(e=0;e<b;e++){k=r[e];g=k._class;z=k._class_new;p=k._class_keys;c=[];y=[];
for(m=0;m<p.length;m++)x=p[m],!1!==z[x]&&(g[x]!==z[x]&&(1===z[x]?(c[c.length]=x,g[x]=1):(y[y.length]=x,g[x]=0)),z[x]=!1);y.length&&k.classList.remove.apply(k.classList,y);c.length&&k.classList.add.apply(k.classList,c);k._class_keys=[]}r=[]}if(b=t.length){for(e=0;e<b;e++)t[e](a);t.splice(0,b)}t.length||w.length||v.length||r.length||(f(n),n=null)}var u=d.prefix,q=d.Ra(u),n=null,t=[],w=[],r=[],v=[],h=window.requestAnimationFrame||window[u+"RequestAnimationFrame"]||function(a){return d.async(function(){a(d.time.now())},
16.667)},f=window.cancelAnimationFrame||window[u+"CancelAnimationFrame"]||function(){return null};d.v=function(a,b){"string"===typeof a&&(a=d.query(a));0<=a.length&&(a=a[0]);var e;if(e=a._class_new){if(!1!==e[b]&&d.b(e[b]))return e[b]?!0:!1}else a._class_new={};if(e=a._class){if(d.b(e[b]))return e[b]?!0:!1}else e=a._class={};return(e[b]=a.classList.contains(b)?1:0)?!0:!1};d.H=function(a,b,e){var k;"string"===typeof a&&(a=d.query(a));if(0<=a.length)for(k=0;k<a.length;)d.H(a[k++],b,e&&k===a.length-
1?e:void 0);else{d.b(b,"string")&&(b=[b]);var g=a._class||(a._class={}),f=a._class_new||(a._class_new={}),p=a._class_keys||(a._class_keys=[]),c=r.length,m=p.length;for(k=0;k<b.length;k++){var x=b[k];1!==g[x]?1!==f[x]&&(m||(r[c++]=a),f[x]=1,d.contains(p,x)||(p[m++]=x)):f[x]=!1}e&&d.m(function(){e.call(a)});if(c||e)n||(n=h(l))}};d.F=function(a,b,e){var k;"string"===typeof a&&(a=d.query(a));if(0<=a.length)for(k=0;k<a.length;)d.F(a[k++],b,e&&k===a.length-1?e:void 0);else{d.b(b,"string")&&(b=[b]);var g=
a._class||(a._class={}),f=a._class_new||(a._class_new={}),p=a._class_keys||(a._class_keys=[]),c=r.length,m=p.length;for(k=0;k<b.length;k++){var x=b[k];0!==g[x]?0!==f[x]&&(m||(r[c++]=a),f[x]=0,d.contains(p,x)||(p[m++]=x)):f[x]=!1}e&&d.m(function(){e.call(a)});if(c||e)n||(n=h(l))}};d.Ka=function(a,b,e){if(d.b(void 0))d.F(a,b,e);else if("string"===typeof a&&(a=d.query(a)),0<=a.length)for(var k=0;k<a.length;k++)d.Ka(a[k],b,k===a.length-1?e:void 0);else{var k=a._class||(a._class={}),g=a._class_new||(a._class_new=
{}),f=a._class_keys||(a._class_keys=[]),p=r.length,c=f.length;d.b(g[b])?!1!==g[b]&&(0===k[b]&&1===g[b]||1===k[b]&&0===g[b])?g[b]=!1:(c||(r[p++]=a),d.contains(f,b)||(f[c]=b),g[b]=(!1===g[b]?k:g)[b]?0:1):(c||(r[p++]=a),d.b(k[b])||(k[b]=a.classList.contains(b)?1:0),d.contains(f,b)||(f[c]=b),g[b]=k[b]?0:1);e&&d.m(function(){e.call(a)});if(p||e)n||(n=h(l))}};d.Aa=function(a,b){a="string"===typeof a?d.query(a):a;0<=a.length&&(a=a[0]);if(a){if(b){var e,k=a._style;if(e=a._style_new){if(e=e[b],!1!==e&&d.b(e))return e}else a._style_new=
{},a._style_keys=[];if(k){if(e=k[b],d.b(e))return e}else k=a._style={};e=a.style;for(var g=0;g<e.length;g++)if(e[g]===b)return k[b]=e[b];return k[b]=window.getComputedStyle(a,null)[b]}return window.getComputedStyle(a,null)}};d.a=function(a,b,e){var k;if(a="string"===typeof a?d.query(a):a){var g=a.length;if(0<=g)for(k=0;k<g;k++)d.a(a[k],b,e);else{var g=a._style||(a._style={}),f=a._style_new||(a._style_new={}),p=a._style_keys||(a._style_keys=[]),c=w.length,m=p.length;if(d.b(e))if(g[b]!==e){if(!1===
f[b]||f[b]!==e)m||(w[c++]=a),f[b]=e,d.contains(p,b)||(p[m]=b)}else f[b]=!1;else for(k in b)if(e=b[k],g[k]!==e){if(!1===f[k]||f[k]!==e)m||(w[c++]=a),f[k]=e,d.contains(p,k)||(p[m++]=k)}else f[k]=!1;c&&(n||(n=h(l)))}}};d.Mc=function(a,b,e){d.Aa(a,b)===e[0]?d.a(a,b,e[1]):d.a(a,b,e[0])};d.Ob=function(a,b,e){if("undefined"!==typeof e||b&&"string"!==typeof b)d.a(a,b,e);else return d.Aa(a,b)};d.Hb=function(a,b,e){var k=document.styleSheets[document.styleSheets.length-1],g="";if(e)g=b+":"+e+";";else if(b){e=
Object.keys(b||{});for(var f=e.length,h="",c=0;c<f;c++)g+=(h=e[c])+":"+b[h]+";"}g&&(k.insertRule?k.insertRule(a+"{"+g+"}",k.cssRules?k.cssRules.length:0):k.addRule&&k.addRule(a,g,k.cssRules?k.cssRules.length:0))};d.Ja=function(a,b){"string"===typeof a&&(a=d.query(a));if(0<=a.length)for(var e=0;e<a.length;e++)d.Ja(a[e],b);else(e=a.firstChild)&&d.b(e.nodeValue)?e.nodeValue=b:d.b(a.textContent)?a.textContent=b:d.b(a.innerText)?a.innerText=b:d.l(a,b)};d.l=function(a,b,e){var k=d.b(e,"function");"string"===
typeof a&&(a=d.query(a));d.isArray(b)&&(b=b.join(""));var g=a.length;if(0<=g)for(var f=0;f<g;f++)d.l(a[f],b,k?f===g-1?e:!0:e);else a.innerHTML=b,k&&e.call(a)};d.qa=function(a){"string"===typeof a&&(a=d.query(a));0<=a.length&&(a=a[0]);return a.innerHTML};d.m=function(a,b){var e=this;if(b)return function(a){return d.async(function(){d.m.call(e,a)},b)}(a);t[t.length]=e!==d?function(b){a.call(e,b)}:a;return n||(n=h(l))};d.clear=function(a){a&&(window.clearTimeout(a),f.call(window,a));return null};d.transition=
function(a,b){b.ca&&function(a,b){return d.async(function(){b.ca=0;d.transition(a,b)},b.ca)}(a,b);"string"===typeof a&&(a=d.query(a));var e=a.length;if(e)for(var f=0;f<e;f++)d.transition(a[f],b);else b.from&&d.a(a,b.style,b.from),e={transitionProperty:b.style,transitionDuration:b.duration||400,transitionDelay:b.ca||0,transitionTimingFunction:b.Za||"ease-in"},f={},f[q+"TransitionProperty"]=b.style,f[q+"TransitionDuration"]=b.duration||400,f[q+"TransitionDelay"]=b.ca||0,f[q+"TransitionTimingFunction"]=
b.Za||"ease-in",d.a(a,f),d.a(a,e),function(a,b,e){d.async(function(){d.a(a,b,e)},0)}(a,b.style,b.o),b.P&&function(a,e){return d.async(function(){e.call(a)},b.duration||400)}(a,b.P)};d.scrollTo=function(a,b,e,f,g){"string"===typeof a&&(a=d.query(a));0<=a.length&&(a=a[0]);b||(b=a.scrollTop);e||(e=0);f||(f=5E3>d.Math.abs(e-b)?400:0);b!==e&&d.m(function(k){k-=g||(g=k);if(k>=f)return a.scrollTop=e;0>=b&&(b=0);0>=e&&(e=0);d.scrollTo(a,b,e,f,g);a.scrollTop=b+(e-b)*Math.sin(k/f*Math.PI/2)})};d.vb=function(a){d.scrollTo(a)}})();d.Db={};
(function(){function l(f){var a=f.type;if("touchmove"===a){if(n&&!T)return;T||(t=n=!0)}var b=f.target||f.srcElement;if("touchend"===a){n=!1;r=null;if(t&&!T){t=!1;return}T=!1}for(var e=[],k=!1;!k&&b;){b!==document||T||"touchmove"!==a||(t=n=!0);var g=!1;e[e.length]=b;if(b.A&&b.A[a])for(var h=0;h<b.A[a].length;h++){var p=b.A[a][h];b.i&&b.i[a]&&b.i[a][p.view]&&(b=b.i[a][p.view],p=b.A[a][h]);var c=null;if(p.tag||p.W)for(var m=0;m<e.length;m++){var l=e[m],y=l.tagName;if(y){p.tag&&p.W?y.toLowerCase()===p.tag&&
d.v(l,p.W)&&(c=l):p.tag?y.toLowerCase()===p.tag&&(c=l):p.W&&d.v(l,p.W)&&(c=l);if(c){c.i||(c.i={});c.i[a]||(c.i[a]={});c.i[a][p.view]||(c.i[a][p.view]=b);if(!p.da){d.w(f,g,k);return}p.da.call(c,f,p.target?d.X(c,p.target):c);k||(k=p.S);g||(g=p.preventDefault);c=null}g&&(h=b.A[a].length);if(k)break}m!==e.length-1||c||(l.i||(l.i={}),l.i[a]||(l.i[a]={}),l.i[a][p.view]||(l.i[a][p.view]=b))}else{e[0].i||(e[0].i={});e[0].i[a]||(e[0].i[a]={});e[0].i[a][p.view]||(e[0].i[a][p.view]=b);if(!p.da){d.w(f,g,k);return}p.da.call(b,
f,p.target?d.X(b,p.target):b);k||(k=p.S);g||(g=p.preventDefault)}if(g||k)break}if(b===document){null!==r||T||"touchstart"!==a||(t=n=!0);break}b=b.parentNode}(g||k)&&d.w(f,g,k)}function u(f){w[f]||(w[f]=!0,document.body.addEventListener(f,l,"touchmove"===f?Q:!1))}function q(f){t=h=n=!0;this.removeEventListener("touchmove",q);d.w(f,!1,!0)}var n=!1,t=!1;d.w=function(f,a,b){b&&(f.stopImmediatePropagation&&f.stopImmediatePropagation(),f.stopPropagation(),f.cancelBubble=!0);a&&(f.preventDefault(),f.returnValue=
!1)};d.handleEvent=function(f,a,b,e,k){f||(f=window.event);b.call(a,f);d.w(f,e,k)};var w={},r=null,v;d.f=function(f,a,b,e,k,g,h,p){var c;var m=e;"string"===typeof f&&(f=d.query(f));if(0<=f.length){for(c=0;c<f.length;)d.f(f[c++],a,b,e,k,g,h,p);return m}if(d.isArray(b)){for(c=0;c<b.length;)d.f(f,a,b[c++],e,k,g,h,p);return m}if(d.isArray(e)){for(c=0;c<e.length;)d.f(f,a,b,e[c++],k,g,h,p);return m}if("touchstart"===b||"touchend"===b||"touchmove"===b){if("undefined"===typeof v)try{document.createEvent("TouchEvent"),
v=!0}catch(y){v=!1}v||("touchstart"===b&&(b="mousedown"),"touchend"===b&&(b="mouseup"),"touchmove"===b&&(b="mousemove"))}if("click"===b)return d.f(f,a,"touchstart",function(a){r||(r=this);t=n=!0;T=!1;m.call(this,a)},k,g,h,p),f!==window&&f!==window.document&&d.a(f,"touchAction","manipulation"),m;if("clickmove"===b)return f!==window&&f!==window.document&&d.a(f,"touchAction","manipulation"),d.Na(f,m,k,g,a,h,p);if("wheelscroll"===b)return d.Ma(f,m);c=e="";a&&("."===a.charAt(0)?e=a.substring(1):0<a.indexOf(".")?
(c=a.split(".")[0],e=a.split(".")[1]):c=a);if(-1<b.indexOf(":")){var z=b.split(":");b=z[0];z[1]&&-1<z[0].indexOf("key")&&(m=function(a){return function(b,c){var g={},e=this;g[z[1]]=function(){a.call(e,b,c)};d.zb(b,g)}}(m))}f.A||(f.A={});f.A[b]||u(b);f.A[b]||(f.A[b]=[]);f.A[b].push({tag:c,W:e,da:m,preventDefault:k,S:g,view:p,target:h||!1});return m};d.L=function(f,a,b,e,k){return d.f(f,"",a,b,e,k)};d.Kb=function(f,a,b,e){d.L(f,"touchstart",a,b,e);return a};var h=!1;d.Na=function(f,a,b,e,k,g,z){d.f(f,
k,"touchstart",function(){h=!1;r||(r=this);this.addEventListener("touchmove",q,!1)},!1,!1,g,z);d.f(f,k,"touchend",function(b){h?d.async(function(){n=h=!1},1):(this.removeEventListener("touchmove",q),g?a.call(this,b,d.X(this,g)):a.call(this,b,this));r=null},b,e,g,z);return a};d.Ib=function(f,a){"string"===typeof f&&(f=d.query(f));d.L(f,"input",d.L(f,"change",a));return a};d.Ma=function(f,a){(function(a){var b=0;d.L(f,"mousewheel",function(e){this.doScroll?this.doScroll(0<e.wheelDelta?"left":"right"):
0<(e.wheelDelta||e.detail)?this.scrollLeft=b-=this.offsetWidth/35:this.scrollLeft=b+=this.offsetWidth/35;d.handleEvent(e,this,a,!1,!0)})})(a);return a};d.Qc=function(f,a){var b=document.createEvent("MouseEvents");b?(b.initEvent(a,!0,!0),f.dispatchEvent(b)):(b=f[a]||f["on"+a])&&b()};d.Pb=function(f,a,b,e,k,g){f=d.ra(f);(function(a,g,c,e){d.L(f,b,function(b){for(var f=b.target||b.srcElement;f&&f!==this;){if(d.v(f,a)){g.call(f,b);d.w(b,c,e);break}f=f.parentNode}})})(a,e,k,g);return e};d.Qb=function(f,
a,b,e,k,g){f=d.ra(f);(function(a,g,c,e){d.L(f,b,function(b){for(var f=b.target||b.srcElement;f&&f!=this;)f.tagName.toLowerCase()===a&&(g.call(f,b),d.w(b,c,e)),f=f.parentNode},!1,!1)})(a,e,k,g);return e};d.Rb=function(f,a,b,e,k,g,h){f=d.ra(f);(function(a,b,g,k,h){d.L(f,e,function(c){for(var e=c.target||c.srcElement;e&&e!=this;)e.tagName.toLowerCase()===a&&d.v(e,b)&&(c.stopImmediatePropagation&&c.stopImmediatePropagation(),g.call(e,c),d.w(c,k,h)),e=e.parentNode},!1,!1)})(a,b,k,g,h);return k}})();d.Gb={};
d.Storage=function(){function l(l){this.g="todos-xone:"+l;this.index=this.cache=null}l.prototype.get=function(l){if(this.cache)var q=this.cache;else if(q=window.localStorage.getItem(this.g))this.cache=q=JSON.parse(q);return q&&l?q[l]:q};l.prototype.set=function(l,q){var n=this.g,t=!1;if("string"===typeof l){var w=this.get()||{};w[l]!==q&&(w[l]=q,t=!0)}else w=l||{},t=!0;t&&(this.cache=w,this.index=null,d.async(function(){window.localStorage.setItem(n,JSON.stringify(w))}))};l.prototype.ya=function(l){if(l){var q=this.get()||
{};"undefined"!==typeof q[l]&&(q[l]=null,delete q[l],this.set(q))}};l.prototype.update=function(l,q){var n=this.get()||{},t=!1;if("string"===typeof l)n[l]!==q&&(n[l]=q,t=!0);else for(var w in l)l.hasOwnProperty(w)&&n[w]!==l[w]&&(n[w]=l[w],t=!0);t&&this.set(n)};l.prototype.clear=function(){this.index=this.cache=null;window.localStorage.removeItem(this.g)};l.prototype.keys=function(){return this.index||(this.index=d.za(this.get()||{}))};return l}();B=function(l,u){function q(){}function n(h,f){this.K=f;this.K.prototype=new w(h,f);this.K.constructor=f;this.data=u.aa[h];this.cache=u.J[h];this.keys=this.data.keys()}function t(h,f){h._id&&(h=B[h._type].parse(""+h._id,f));for(var a in h)if(h.hasOwnProperty(a)){var b=h[a];if(null!==b&&"undefined"!==typeof b)if(b.constructor===Object)h[a]=t(b,f);else if(b.constructor===Array)for(var e=0;e<b.length;e++)b[e]._id&&(b[e]=t(b[e],f));else h[a]=b}return h}function w(h,f){this.g=h;this.data=u.aa[h];this.cache=
u.J[h];h=f.prototype;for(var a in h)h.hasOwnProperty(a)&&(this[a]=h[a])}function r(h,f){var a={},b=!1,e;for(e in h)if(h.hasOwnProperty(e)&&(!h.Ha||h.Ha[e])&&"mapToViewCache"!==e&&"_"!==e.charAt(0)){var k=h[e];if(d.Ca(k)){var g=k.constructor;g!==Array&&(k=[k]);var l=k.length;if(l){a[e]=Array(l);for(var p=0;p<l;p++){var c=k[p];if(c instanceof w)c.save(f),a[e][p]={_id:""+c.id,_type:c.g},b=!0;else if(c.constructor===Object){if(c=r(c,f))a[e][p]=c,b=!0}else a[e][p]=c,b=!0}}g!==Array&&(a[e]=a[e][0])}}return b?
a:null}q.prototype.register=function(h,f,a){if(a||d.Fa(f))f=d.za(a||(a=f));if(a||d.isArray(f)){for(var b="",e=0;e<f.length;e++)b+="this."+f[e]+" = data."+f[e]+";";f=Function("data",b)}u.aa[h]||(u.aa[h]=new d.Storage(h));u.J[h]||(u.J[h]={});this[h]=new n(h,f);this[h].K.prototype.Y=l[h]?l[h].Y:!1;a&&(this[h].K.prototype.Ha=a);return this[h]};q.prototype.ea=function(h,f,a){return this[h].ea(f,a)};q.prototype.create=function(h,f){return this[h].create(f)};n.prototype.ea=function(h,f,a){h||(h={});if(h.constructor===
Array)return this.hb(h,f);if(h instanceof w)return h;var b=h.id||0===h.id?this.parse(""+h.id):null;if(b){h=new this.K(h);if(!h)return null;delete h.id;b.update(h,f,a)}else{b=new this.K(h);if(!b)return null;if(b.id||0===b.id)b.na&&b.na(),a||this.na&&this.na(),f&&(b.save(f,a),this.keys=this.data.keys()),b.fa&&b.fa(),!a&&this.fa&&this.fa()}return b};n.prototype.create=function(h){return this.ea(h,!0)};n.prototype.hb=function(h,f){if(!h)return[];for(var a=h.length,b=Array(a),e=0,k=0;k<a;k++){var g=this.ea(h[k],
f,k<a-1);g&&Object.keys(g).length&&(b[e++]=g)}return e===a?b:b.splice(0,e)};n.prototype.parse=function(h,f){var a,b=null;h=String(h);if(f||!this.cache[h])if(a=this.data.get(h))b=new this.K(t(a,f));b?this.cache[h]=b:b=this.cache[h];return b};n.prototype.find=function(h){return h&&h.dataset?this.parse(h.dataset.id):this.parse(h)};n.prototype.delete=function(h){h&&(h instanceof w?this.parse(h.id).delete():h.dataset?this.parse(h.dataset.id).delete():this.parse(h).delete())};n.prototype.update=function(h,
f,a,b){if(h){if(h instanceof w)return this.parse(h.id).update(f,a,b);if(h.dataset)return this.parse(h.dataset.id).update(f,a,b)}};n.prototype.pb=function(){this.keys.length||(this.keys=this.data.keys());var h=this.keys,f=h.length,a=0,b=f;b>f&&(b=f);for(var e=Array(b-a),f=0;a<b;)e[f++]=this.parse(""+h[a++]);return e};n.prototype.g=function(){return this.pb()};n.prototype.count=function(h,f,a){return h?this.pa(h,f,a).length:this.keys.length||(this.keys=this.data.keys()).length};n.prototype.gb=function(h,
f){this.keys.length||(this.keys=this.data.keys());for(var a=this.keys,b=[],e=0,k,g=0;g<a.length;g++){var l=this.parse(""+a[g]),p;k=!0;if(f)for(p in h){if(h.hasOwnProperty(p)&&(k=f(l[p],h[p]),!k))break}else k=h.call(l);k&&(b[e++]=l)}return b};n.prototype.pa=function(h,f,a){if("string"===typeof h){var b=h;h={};h[b]=f;f=a}return this.gb(h,f||function(a,b){return a===b})};n.prototype.bb=function(h,f,a){f?h=this.pa(h,f,a):h||(h=this.g());var b;if(h&&(b=h.length))for(f=0;f<b;f++)h[f].delete(f<b-1)};n.prototype.fb=
n.prototype.bb;var v;n.prototype.qb=function(h){var f="completed",a=!0;if(!d.isArray(f)){var b=a;a=h;h=f;f=this.g()}v=!1;var e;this.V&&this.V();this.U&&this.U();if(f&&(e=f.length))for(var k=0;k<e;k++)f[k].update(h,a,b,!0);v&&(this.Z&&this.Z(),this.R&&this.R())};w.prototype.save=function(h,f){h=!0;var a=String(this.id);if(!a&&"0"!==a)return this;this.U&&this.U();f||B[this.g].U&&B[this.g].U();if(h){h=r(this,h);try{this.data.set(a,h),f||(B[this.g].keys=this.data.keys())}catch(b){}}this.Z&&this.Z();!f&&
B[this.g].Z&&B[this.g].Z();return this.cache[a]=this};w.prototype.update=function(h,f,a,b){if(d.b(h,"string")){var e=h;h={};h[e]=f;f=a}this.V&&this.V();b||B[this.g].V&&B[this.g].V();a=!1;for(var k in h)h.hasOwnProperty(k)&&(e=h[k],this[k]!==e&&(this[k]=e,a=!0));a&&(v=!0,this.mapToViewCache=!1,f?this.save(f,b):this.cache[""+this.id]=this,this.R&&this.R(),!b&&B[this.g].R&&B[this.g].R());return this};w.prototype.delete=function(h){this.oa&&this.oa();h||B[this.g].oa&&B[this.g].oa();B[this.g].data.ya(""+
this.id);this.data.ya(""+this.id);delete B[this.g].cache[""+this.id];delete this.cache[""+this.id];h||(B[this.g].keys=this.data.keys());this.ga&&this.ga();!h&&B[this.g].ga&&B[this.g].ga()};return new q}(N,K);E={};
(function(l,u){function q(l,t){t||(t=[{}]);t.constructor!==Array&&(t=[t]);l=C[l];for(var n="",r,q=0;q<t.length;q++)if(r=t[q])for(var h=r.Y,f=r.mapToViewCache||(r.mapToViewCache={}),a,b,e,k=0;k<l.length;k++){b=l[k];var g=b.data,z=b.map,p;if(null===r||b.c&&!1===b.c(r))if(b.B)g=[b.B];else continue;var c=0,m=0,x=1,y=b.loop;if(y){if(-1!==y.indexOf(",")){var u=y.split(",");3===u.length?(c=parseInt(u[1],10),m=parseInt(u[2],10)):m=parseInt(u[1],10);y=u[0]}-1!==y.indexOf(".")?(a=y.split("."),b=a[0],e=a[1],
a=a[2]||!1,u=r[b]?r[b][e]?r[b][e][a]?r[b][e][a]:r[b][e]:r[b]:r):u=r[y];x=u?m&&m<=u.length?m:u.length:0}m=r;for(c=c||0;c<x;c++){var M="";y&&(m=u[c]);if(m){m.Y?(h=m.Y,f=m.mapToViewCache||(m.mapToViewCache={})):d.b(m.Y)&&(f=m.mapToViewCache||(m.mapToViewCache={}));m.index||(m.index=y?c:q);z.length&&(M+=g[0]);for(var L=1;L<z.length;L+=2){var D=g[L],G=z[L];if(d.b(f[G]))M+=f[G];else{if(-1!==G.indexOf("."))if(a=G.split("."),b=a[0],e=a[1],a=a[2]||!1,-1!==(p=b.indexOf("["))){var Y=parseInt(b.substring(p+1,
b.indexOf("]")),10);b=b.substring(0,p);if(p=m[b][Y])h&&h[b]&&h[b][e]?(D=a&&h[b][e][a]?h[b][e][a](p[e][a],p):h[b][e](p[e],p),f[G]=D):D=p[e]}else{if(p=m[b])h&&h[b]&&h[b][e]?a?(D=d.b(p[e])?d.b(p[e][a])?p[e][a]:p[e]:p||m,h[b][e][a]&&(D=h[b][e][a](D,p||m),f[G]=D)):(D=h[b][e](p[e],p||m),f[G]=D):D=p[e]&&p[e][a]?p[e][a]:d.b(p[e])?p[e]:p||m}else h&&h[G]?(D=h[G](m[G],m),f[G]=D):"item"===G?D=m:D=m[G];M+=D}L+1<g.length&&(M+=g[L+1])}}if(!y||m)n+=M}}return n}l.request=function(n,t,q,r,v){if(n&&n.constructor===
Array)for(var h=0;h<n.length;h++)l.request(n[h],t,h<n.length-1?q:null,r,v);else{d.b(t,"function")&&(v=r,r=q,q=t,t=null);if(!n)if(u["#/"])n="#/";else if(u["#!/"])n="#!/";else return;d.b(u[n])||(u[n]={});t||(t=H[n]?H[n]():u[n].N||null);(function(f,a,b,e){function k(g){if(d.isArray(g)||d.Fa(g))a.cb&&(g=g[a.cb]||[]),a.filter&&(g=g.filter(a.filter)),a.Pa&&(g=a.Pa(g)),a.sort&&(g=g.sort(a.sort)),a.sa&&g.length>a.sa&&g.splice(0,g.length-a.sa),a.Ga&&g.length>a.Ga&&g.splice(0,a.Ga),a.map&&g.map(a.map),a.Qa&&
a.Qa(g),e&&e();b||(b=a.h?"string"===typeof a.h?J[a.h]:a.h:a.o?"string"===typeof a.o?l[a.o]:a.o:"function"===typeof a?a:null);b&&b(g,t)}var g=a.action;A.j=g||A.j||"";if(!e&&g)A.Ba(g,function(a){l.request(f,t,b,r,a)});else if("#"===f[0])g=t,t=d.query('a[href="'+f+'"]')[0],k(g);else{a.G||(a.G={});a.G.Accept||(a.G.Accept="application/json");a.G["Content-Type"]||(a.G["Content-Type"]="application/json");for(var h in S)S.hasOwnProperty(h)&&(a.G[h]=S[h]);-1!==(g=f.indexOf("/:"))&&(g=f.substring(g+2,f.indexOf("/",
g+2)),f=f.replace("/:"+g,"/"+t[g]));g="GET";-1!==f.indexOf("GET:")?f=f.substring(4):-1!==f.indexOf("POST:")?(g="POST",f=f.substring(5)):-1!==f.indexOf("DELETE:")?(g="DELETE",f=f.substring(7)):-1!==f.indexOf("PATCH:")&&(g="PATCH",f=f.substring(6));d.Oa({url:"localhost"+(a.url||f),N:t,type:a.type||g,G:a.G,cache:a.cache,clear:a.clear,yb:k,error:function(b,c){a.default&&k(a.default());r?r(b,c):a.error&&a.error(b,c)}})}})(n,u[n],q,v)}};l.Bc=function(n,t){for(var q=0;q<n.length;q++)(function(n,t){d.b(n,
"string")&&(n=[n,null,l[u[n].o]]);l.request(n[0],n[1],function(h){if(n[2])n[2](h);t&&t()})})(n[q],q===n.length-1?t:null)};l.ub=function(n,t,q){var r=n[q||(q=0)];d.b(r,"string")&&(r=[r,null,l[u[r].o]]);l.request(r[0],r[1],function(u){if(r[2])r[2](u);++q<n.length?l.ub(n,t,q):t&&t()})};l.Lb=function(l,t){return q(l,t)};l.tb=function(l){var n;A.Ia(l);if(l.data&&(n="string"===typeof l.target?d.ta(l.target):l.target)){var u=l.data.constructor===Array,u=u&&l.data.length||!u&&l.data?q(l.view,l.data):l.default?
l.default.view?q(l.default.view,l.default.data):q(l.default):"";d.l(n,u,function(){l.P&&(d.b(l.P,"string")?J[l.P].call(n,l.data):l.P.call(n,l.data))})}};l.Sa=function(){for(var l=P,q=d.M("i18n"),u=0;u<q.length;u++){var r=q[u];d.Ja(r,(O[l||"en"]||O.en)[r.classList?r.classList[1]:r.className.split(" ")[1]])}}})(E,F);A={};
(function(l,u,q,n){function t(g){if(!b&&a){g.$&&(g=g.$);k=(g.touches||g.changedTouches)[0].pageY;var f=d.Math.min(k-e,50);k>e?(T=!0,d.w(g,!0,!0),d.a(this.firstElementChild,{opacity:d.Math.max(4E-4*f*f,0),transform:"translateY("+f+"px)"}),50<k-e?d.a(this.firstElementChild.nextElementSibling,"transform","translateY("+(50+Math.sqrt(15*(k-e-50))|0)+"px)"):d.a(this.firstElementChild.nextElementSibling,"transform","translateY("+(k-e)+"px)")):a=T=!1}else b||0!==this.scrollTop||0!==this.firstElementChild.nextElementSibling.scrollTop?T=
!1:(g.$&&(g=g.$),e=(g.touches||g.changedTouches)[0].pageY,a=!0)}l.Cb=function(a){l.j=a||"";-1!==a.indexOf("-")&&(a=a.split("-")[0]);if(d.D("btn-view-"+a)){var b=d.u("td","toolbar");for(var g=0;g<b.length;g++)b[g].id!=="btn-view-"+a&&d.F(b[g],"active");d.H("#btn-view-"+a,"active")}d.a("#view-"+a,{zIndex:1,visibility:"visible"});b=d.M("view");for(g=0;g<b.length;g++)b[g].id!=="view-"+a&&d.a(b[g],{zIndex:-1,visibility:"hidden"})};var w={};l.j="";l.T=function(a){a=a.target||a;a="string"===typeof a?d.ta(a):
a;d.l(a,"",function(){})};l.Ia=function(a){a=a.target||a;"string"===typeof a&&(a=d.ta(a));w[a]&&(w[a].stop(),w[a]=!1)};var r=!1;l.Oc=function(a,b,e){var c="#content-"+a+"-layer",g="#content-"+b+"-layer";d.v(c,"slider-left")?d.v(g,"slider-left")&&(r=!r,d.F(g,"slider-left")):(r=!r,d.H(c,"slider-left"));(r=!r)?(d.a("#nav-"+a,"display","none"),d.a("#nav-"+b,"display","block"),d.H(c,"active"),d.H(g,"active"),e&&(""===d.qa("#content-"+b)&&l.T("#content-"+b),e())):(d.a("#nav-"+b,"display","none"),d.a("#nav-"+
a,"display","block"),d.F(c,"active"),d.F(g,"active"))};var v="",h="",f={};l.Ec=function(a,b,e){b&&(d.l(b,""),l.T(b),f[a]=b);d.a(a,{transition:"none",opacity:0,transform:"scale(0.8)",zIndex:3,display:"block"});d.m(function(){h&&h!==v&&d.a(h,"zIndex",1);v&&d.a(v,"zIndex",2);d.a(a,{transition:"transform 0.2s ease-out, opacity 0.2s ease-out",opacity:1,transform:"scale(1)",zIndex:3});h=v;v=a});d.b(e)||(e=!d.v(d.u("header",a&&a.substring(1))[0]||a,"status-bar"))};l.$b=function(a,b){var g=b;d.a(a,{transform:"scale(0.8)",
opacity:0});d.m(function(){d.a(a,{display:"none",zIndex:2});f[a]&&(d.l(f[a],"",!0),f[a]=!1);h=v;v="";d.b(g)||(g=!d.v(d.u("header",a&&a.substring(1))[0]||a,"status-bar"))},200)};l.Fc=function(a,b,e){b&&d.l(b,"",function(){l.T(b);f[a]=b});d.a(a,{transition:"none",transform:"translateY(100%)",zIndex:3,display:"block"});d.m(function(){h&&h!==v&&d.a(h,"zIndex",1);v&&d.a(v,"zIndex",2);d.a(a,{transition:"transform 0.3s ease-out",transform:"translateY(0%)",zIndex:3});h=v;v=a});d.b(e)||(e=!d.v(d.u("header",
a&&a.substring(1))[0]||a,"status-bar"))};l.Gc=function(a,b){var e=b;d.a(a,{transform:"translateY(100%)"});d.m(function(){d.a(a,{display:"none",zIndex:0});f[a]&&(d.l(f[a],"",!0),f[a]=!1);h=v;v="";d.b(e)||(e=!d.v(d.u("header",a&&a.substring(1))[0]||a,"status-bar"))},200)};l.Nc=function(a,b,e){b&&d.l(b,"",function(){l.T(b);f[a]=b});d.a(a,{transition:"none",transform:"translateX(100%)",zIndex:3,display:"block"});d.m(function(){h&&h!==v&&d.a(h,"zIndex",1);v&&d.a(v,"zIndex",2);d.H("#view-"+l.j,"active");
d.a(a,{transition:"transform 0.25s ease-out",transform:"translateX(0%)",zIndex:3});h=v;v=a});d.b(e)||(e=!d.v(d.u("header",a&&a.substring(1))[0]||a,"status-bar"))};l.Pc=function(a,b){var e=b;d.F("#view-"+l.j,"active");d.a("#view-"+l.j,"transform","");d.a(a,{transform:"translateX(100%)"});d.m(function(){d.a(a,{display:"none",zIndex:2});f[a]&&(d.l(f[a],"",!0),f[a]=!1);h=v;v="";d.b(e)||(e=!d.v(d.u("header",a&&a.substring(1))[0]||a,"status-bar"))},200)};l.wb=function(a){d.l("#message-content",a,function(){d.a("#message-wrapper",
"display","block");d.m(function(){d.a("#message-wrapper","opacity",1);d.a("#message-inner",{opacity:1,transform:"scale(1)"})})})};l.Zb=function(){d.a("#message-inner",{transform:"scale(0.8)",opacity:0});d.a("#message-wrapper","opacity",0);d.m(function(){d.a("#message-wrapper","display","none");d.l("#message-content","",!0)},200)};l.Dc=function(a,b){d.l("#confirmation-content",a,function(){d.a("#confirmation-wrapper","display","block");d.m(function(){d.a("#confirmation-wrapper","opacity",1);d.a("#confirmation-inner",
"transform","scale(1)")})});d.D("confirmation-yes").ontouchstart=b};l.Da=function(){d.a("#confirmation-wrapper","opacity",0);d.a("#confirmation-inner","transform","scale(0.9)");d.m(function(){d.a("#confirmation-wrapper","display","none");d.l("#confirmation-content","",!0)},200)};n["confirmation-yes"]={f:"click",h:function(a){!1===(this.firstElementChild&&this.firstElementChild.href)?d.w(a,!0,!0):d.async(function(){d.l("#confirmation-yes","Ja")},200);this.ontouchstart.call(this,a);l.Da()},S:!1,preventDefault:!1};
n["confirmation-no"]={f:"click",h:function(){d.l("#confirmation-yes","Ja");l.Da()},S:!0,preventDefault:!0};l.Ba=function(a,b){var e=a;-1!==a.indexOf("-")&&(e=a.split("-")[0]);if(l.j===a){l.j===a&&l.Cb(e);var c=d.D("content-"+a);if(c){if(""===d.qa(c)){var g=q.la.get(l.j=a);g&&U["content-"+a]!==g.crc?(U["content-"+a]=g.crc,d.l(c,q.Wa(g.cache),!0)):b&&l.T("#content-"+a)}else if(l.j===a)for(var g=d.u("main",d.D("content-"+a).parentNode.parentNode.parentNode),f=0;f<g.length;f++)d.vb(g[f]);g=function(){l.Ia("#content-"+
a);var b=d.qa(c);b&&d.async(function(){q.la.set(e,{cache:q.Ua(b),crc:U["content-"+a]||1})})};b?b(g):g()}else b&&b(!0)}};l.Jb=function(a,b){function e(a){T=!0;g=a.changedTouches[0].pageX-c;h?h.call(this,g):0<=g&&(!f||g<screen.width/100*f)&&d.a(this.parentNode,"transform","translateX("+g+"px)");this.parentNode.id&&d.D("view-"+l.j)!==this.parentNode&&d.a("#view-"+l.j,"transform","translateX(-"+(25-g/screen.width*25)+"%)");d.w(a,!0,!0)}var c,g,f=b?b.sa:!1,k=b?b.start:!1,h=b?b.move:!1,n=b?b.end:!1,q=b?
b.finish:!1;d.f(a,"","touchstart",function(a){T=!0;a=a.changedTouches[0];g=0;c=a.pageX;d.H([this.parentNode,"#view-"+l.j],"no-transition");d.F("#view-"+l.j,"active");k&&k.call(this,g);this.addEventListener("touchmove",e,!1)},!0,!0);d.f(a,"","touchend",function(a){T=!1;g=a.changedTouches[0].pageX-c;if(n)n.call(this,g);else if(g<screen.width/3.1416)d.a(this.parentNode,"transform","translateX(0px)"),d.a("#view-"+l.j,"transform","translateX(-25%)"),d.m(function(){d.a("#view-"+l.j,"transform","")},200);
else{f?d.a(this.parentNode,{transform:"translateX("+f+"%)"}):d.a(this.parentNode,{transform:"translateX(100%)"});var b=this;d.m(function(){d.a(b.parentNode,"display","none")},200);d.a("#view-"+l.j,"transform","");q&&q.call(this,g)}d.F([this.parentNode,"#view-"+l.j],"no-transition");this.removeEventListener("touchmove",e)},!0,!0)};var a=!1,b=!1,e=0,k=0;l.bc=function(g,f){d.f(g,"","touchstart",function(g){b||0!==this.scrollTop||0!==this.firstElementChild.nextElementSibling.scrollTop||(T=!0,g.$&&(g=
g.$),e=k=(g.touches||g.changedTouches)[0].pageY,a=!0);this.addEventListener("touchmove",t,!1)},!1,!1);d.f(g,"","touchend",function(h){T=!1;!b&&a&&(k>e?(d.w(h,!0,!0),50<=d.Math.min(k-e,50)?(d.a(g.firstElementChild.nextElementSibling,"transform","translateY(50px)"),b=!0,E.request(f,{},function(c){if(F[f].o)E[F[f].o](c);else if(F[f].h)if(d.b(F[f].h,"string"))J[F[f].h](c);else F[f].h(c);d.a(g.firstElementChild.nextElementSibling,"transform","translateY(0px)");d.a(g.firstElementChild,{opacity:0,transform:"translateY(0px)"});
b=a=!1})):(d.a(g.firstElementChild.nextElementSibling,"transform","translateY(0px)"),d.a(g.firstElementChild,{opacity:0,transform:"translateY(0px)"}),a=!1)):b=a=!1);this.removeEventListener("touchmove",t)},!1,!1)}})(A,E,K,I);X.s={"layout/app/footer":[{data:['<footer class="footer"> \t<span class="todo-count"><strong>0</strong> item left</span> \t<ul class="filters"> \t\t<li> \t\t\t<a href="#/" class="selected">All</a> \t\t</li> \t\t<li> \t\t\t<a href="#/active">Active</a> \t\t</li> \t\t<li> \t\t\t<a href="#/completed">Completed</a> \t\t</li> \t</ul> \t<button class="clear-completed">Clear completed</button></footer> '],map:[""],c:!1,B:!1}],"layout/app/header":[{data:['<header class="header"> \t<h1>todos</h1> \t<input class="new-todo" placeholder="What needs to be done?" autofocus></header> '],
map:[""],c:!1,B:!1}],"layout/app/info":[{data:['<p>Double-click to edit a todo</p><p>Created by <a href="http://todomvc.com">Xone</a></p><p>Part of <a href="http://todomvc.com">TodoMVC</a></p> '],map:[""],c:!1,B:!1}],"layout/app/main":[{data:['<section class="main"> \t<input class="toggle-all" id="toggle-all" type="checkbox"> \t<label for="toggle-all">Mark all as complete</label> \t<ul class="todo-list"></ul></section> '],map:[""],c:!1,B:!1}],"layout/app":[{data:['<section class="todoapp"> \t'],
map:[0]},{I:"layout/app/header"},{data:[" \t"],map:[0]},{I:"layout/app/main"},{data:[" \t"],map:[0]},{I:"layout/app/footer"},{data:['</section><footer class="info"> \t'],map:[0]},{I:"layout/app/info"},{data:["</footer> "],map:[0],c:!1,B:!1}]};C={"view/todo/list":[{data:["<li "],map:[0],c:!1,B:!1},{data:['class="completed"'],map:[0],c:"val.completed",B:!1},{data:[' data-id="',"",'"> \t<div class="view"> \t\t<input class="toggle" type="checkbox" '],map:[0,"id",2],c:!1,B:!1},{data:["checked"],map:[0],c:"val.completed",B:!1},{data:['> \t\t<label class="title">',"",'</label> \t\t<button class="destroy"></button> \t</div> \t<input class="edit" value="',"",'"></li> '],map:[0,"title",2,"title",4],c:!1,B:!1}]};B.ua=function(){var l=B.register("Todo",["id","title","completed"]);l.fa=l.R=l.ga=function(){E.ba()};return l}();J.Event={};
J=function(l){return{Va:function(){var u=d.trim(this.value);u&&l.create({id:d.sb(),title:u,completed:!1})},$a:function(u,q){(u=d.trim(this.value))?l.update(q,"title",u,!0):l.delete(q)},wa:function(){this.value=""},xa:function(l,q){this.value=d.X(q,">.title").textContent;d.F(q,"editing")},Bb:function(u,q){l.find(q).update("completed",this.checked).save()},Ab:function(){l.qb(this.checked)},Xa:function(){l.fb("completed",!0)},Ya:function(u,q){l.delete(q)},ab:function(l,q){d.H(q,"editing");d.eb(d.X(q,
">.edit"))}}}(B.ua);I.La={};I.document=[{f:"keyup:enter",c:"input.new-todo",h:[J.Va,J.wa]},{f:"keyup:esc",c:"input.new-todo",h:J.wa},{f:["keyup:enter","focusout"],c:"input.edit",O:"< li",h:[J.$a,J.xa]},{f:"keyup:esc",c:"input.edit",O:"< li",h:J.xa},{f:"change",c:"input.toggle",O:"< li",h:J.Bb},{f:"clickmove",c:"button.destroy",O:"< li",h:J.Ya},{f:"dblclick",c:"label.title",O:"< li",h:J.ab},{f:"clickmove",c:"button.clear-completed",h:J.Xa},{f:"change",c:"input.toggle-all",h:J.Ab}];E.ba=function(l){function u(){var n=l.count(),q=l.count("completed",!1),u=n-q;d.a([".main",".footer"],"display",n?"block":"none");d.a(".clear-completed","display",u?"block":"none");d.l(".todo-count","<strong>"+q+"</strong> item"+(1===q?"":"s")+" left");d.D("toggle-all").checked=!q}var q;return function(n,t){t&&(q=n,d.Ka(["a.selected",t],"selected"));E.tb({view:"view/todo/list",data:q?l.pa("completed","completed"===q):l.g(),target:"ul.todo-list",P:u})}}(B.ua);F.La={};F={"#/":E.ba,"#/active":{o:E.ba,N:"active"},"#/completed":{o:E.ba,N:"completed"}};R.ka=["layout/app"];W=function(){E.request(window.location.hash)};(function(){function l(){}function u(){}function q(){E.Sa()}function n(){try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){Q={passive:!0}}}))}catch(x){}window.addEventListener("hashchange",function(a){var b;-1<a.newURL.lastIndexOf("#")?b=a.newURL.substring(a.newURL.lastIndexOf("#")):b="#/";if(("#/"===b.substring(0,2)||"#!"===b.substring(0,2))&&F[b]){if("function"===typeof F[b]){var c=F[b];var e=null}else F[b].o?(c=F[b].o,e=F[b].N):F[b].h&&(c=F[b].h,e=F[b].N);
c&&c(e,d.query('a[href="'+b+'"]')[0])}});for(var a in I)if(I.hasOwnProperty(a)){var b=I[a];if(b){var e="document"===a||"_document"===a?document:"body"===a?document.body:d.D(a);if(e&&b){b.length||(b=[b]);for(var f=0;f<b.length;f++){var c=b[f],h=c.o?function(a){return function(b){E.request(a.o,H[a.o]?H[a.o].call(this,b):F[a.o].N)}}(c):d.b(c.h,"string")?J[c.h]:c.h||(c.go?function(a){return function(){A.Ba(A.j=a.go)}}(c):void 0);c.c?d.f(e,c.c,c.f,h,c.preventDefault,c.S,c.O||c.go,a):d.f(e,"",c.f,h,c.preventDefault,
c.S,c.O||c.go,a)}}}}}function t(){var a=C,b;for(b in a)if(a.hasOwnProperty(b))for(var e=a[b],f=0;f<e.length;f++){var c=e[f];if(c.I){for(var h=0;h<a[c.I].length;h++)h?e.splice(f+h,0,a[c.I][h]):e[f]=a[c.I][h];c=e[f]}c.c&&d.b(c.c,"string")&&(c.c=Function("val","return ("+c.c+") ? true : false;"))}}function w(){var a=R.ka;if(a){for(var b="",e=0;e<a.length;e++)if(X.s[a[e]])for(var f=0;f<X.s[a[e]].length;f++){var c=X.s[a[e]][f],h=c.I;if(h)if(X.s[h])for(var l=0;l<X.s[h].length;l++)l?X.s[a[e]].splice(f+l,
0,X.s[h][l]):X.s[a[e]][f]=c=X.s[h][l];else if(C[h])for(l=0;l<C[h].length;l++)l?X.s[a[e]].splice(f+l,0,C[h][l]):X.s[a[e]][f]=c=C[h][l];b+=c.data[0]}delete X.s;delete R.ka;a=document.createElement("div");d.l(a,b,!1);for(e=a.childNodes.length-1;0<=e;e--)document.body.insertBefore(a.childNodes[e],document.body.childNodes[0])}}function r(){}function v(){P=(navigator.language||navigator.userLanguage||"en").substring(0,2)}function h(){}function f(){new d.Storage("app_settings");K.la=new d.Storage("app_view")}
function a(){W();d.C.Ea?document.removeEventListener("deviceready",b):(document.removeEventListener("ready",b),window.removeEventListener("load",b));b=l=n=t=q=w=r=v=h=u=f=W=V=null}function b(){e||(e=!0,V(),d.stack([f,u,h,v,r,w,q,t,n,l,a,function(){a=null}]))}var e=!1;d.C.Ea?document.addEventListener("deviceready",b,!1):(window.addEventListener("load",b,!1),document.addEventListener("ready",b,!1))})();}).call(this);
