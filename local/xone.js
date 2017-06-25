/** @const */
var PAYLOAD = parseQuery(window.location.search);
// apply url parameters
if(PAYLOAD.env) MANIFEST.env = PAYLOAD.env;
if(PAYLOAD.platform) MANIFEST.platform = PAYLOAD.platform;

// load stubs in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/stub.js?token=' + Math.random() + '"></script>');
// load stubs in non-production mode
document.write('<script type="text/javascript">goog.provide("PLATFORM"); var PLATFORM = MANIFEST.platform;</script>');
// load environment settings
document.write('<script type="text/javascript" src="lib/xone/build/config.js?token=' + Math.random() + '"></script>');
document.write('<script type="text/javascript" src="config/' + (MANIFEST.env === 'test_bundle' || MANIFEST.env === 'test_lib' ? 'test' : MANIFEST.env) + '.js?token=' + Math.random() + '"></script>');
// load stubs in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/env.js?token=' + Math.random() + '"></script>');
// load deps in non-production mode
if(MANIFEST.dependencies.calculate) document.write('<script type="text/javascript" src="deps.js?token=' + Math.random() + '"></script>');
// override global config
document.write(
    '<script type="text/javascript">'+
        'if(typeof PAYLOAD.debug !== "undefined") DEBUG = PAYLOAD.debug;' +
        'for(var key in PAYLOAD){' +
            'if(PAYLOAD.hasOwnProperty(key)) CONFIG[key.toUpperCase()] = PAYLOAD[key];' +
        '}' +
    '</script>'
);
// start loader in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/loader.js?token=' + Math.random() + '"></script>');

/** @lends CORE.parseQuery */
function parseQuery(a){var e={};if((a=String(a)).length){var c;"?"===a[0]?a=a.substring(1):-1!==(c=a.indexOf("?"))&&(a=a.substring(c+1));a=a.split("&");for(var f,b,d=0;d<a.length;d++)c=a[d].split("="),c[0]&&(b=c[1],b="false"===b?!1:"true"===b?!0:"null"===b?null:b.length===String(f=parseFloat(b)).length?f:decodeURIComponent(b||""),e[decodeURIComponent(c[0])]=b)}return e}
