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
document.write('<script type="text/javascript" src="config/' + (MANIFEST.env === 'test_bundle' || MANIFEST.env === 'test_lib' ? 'test' : MANIFEST.env) + '.js?token=' + Math.random() + '"></script>');
// load stubs in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/env.js?token=' + Math.random() + '"></script>');
// load deps in non-production mode
document.write('<script type="text/javascript" src="deps.js?token=' + Math.random() + '"></script>');
// override config
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
/**
 * @lends CORE.parseQuery
 * @param {!string} query
 * @returns {Object<string, *>}
 */

function parseQuery(query){

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
}
