goog.provide('CORE.COMPRESS');
goog.require('APP');
goog.require('CORE');
goog.require('CONFIG');
goog.require('DEBUGGER');
goog.require('CORE.PAINT');

(function(){

    if(DEBUG) {

        CORE.console.log('Initialize Compression');
    }

    // TODO: compression on MSIE is broken
    if(!window['LZString'] || CORE.System.isMSIE) return;

    var compression_levels = [{

            decompress: 'decompress',
            compress: 'compress',
            info: 'Best (Unicode)'
        },{

            decompress: 'decompressFromUTF16',
            compress: 'compressToUTF16',
            info: 'Good (UTF16)'
        },{

            decompress: 'decompressFromEncodedURIComponent',
            compress: 'compressToEncodedURIComponent',
            info: 'Low (URIComponent)'
        },{

            decompress: 'decompressFromBase64',
            compress: 'compressToBase64',
            info: 'Low (Base64)'
        }/*,{

            decompress: 'decompressFromUint8Array',
            compress: 'compressToUint8Array'
        }*/
    ];

    /* FEATURE TEST */

    var dummy = {

        'data': {

            'outer': {

                'inner': [

                    'test'
                ]
            }
        }
    };

    for(var i = 0; i < compression_levels.length; i++){

        try {

            var compressed = window['LZString'][compression_levels[i].compress](JSON.stringify(dummy));

            window.localStorage.setItem('test', compressed);

            var decompressed = JSON.parse(window['LZString'][compression_levels[i].decompress](window.localStorage.getItem('test')));

            if(decompressed['data']
            && decompressed['data']['outer']
            && decompressed['data']['outer']['inner']
            && decompressed['data']['outer']['inner'][0] === 'test') {

                if(APP.WORKER['compress']){

                    (function(compression_level){

                        APP.STORAGE.compress = function(data, callback){

                            if(callback){

                                APP.WORKER['compress'].postMessage({

                                    type: compression_level.compress,
                                    data: data
                                });
                            }
                            else{

                                APP.STORAGE.compress = window['LZString'][compression_level.compress];
                            }
                        };

                    })(compression_levels[i]);
                }
                else{

                    APP.STORAGE.compress = window['LZString'][compression_levels[i].compress];
                }

                APP.STORAGE.decompress = window['LZString'][compression_levels[i].decompress];
                APP.CONFIG.GZIP = true;

                if(DEBUG) {

                    CORE.console.log('Current Compression Level: ' + compression_levels[i].info);
                }

                break;
            }
        }
        catch(e){

            if(DEBUG) {

                throw e;
            }
        }
    }

    if(DEBUG && !APP.CONFIG.GZIP) {

        CORE.console.log('Current Compression Level: -');
    }

    window.localStorage.removeItem('test');

})();
