goog.provide('PLUGIN.Filesystem');
goog.require('INTERFACE.Filesystem');
goog.require('APP');
goog.require('CONFIG');
goog.require('CORE');

/**
 * @name APP.PLUGIN.Filesystem
 * @namespace APP.PLUGIN.Filesystem
 * @param {boolean=} is_consistent
 * @constructor
 */

APP.PLUGIN.Filesystem = (function(){

    "use strict";

    var grantedBytes = (CONFIG.MAX_FILE_STORAGE_MB || 5) * 1024 * 1024;

    var error_callback = function(error){

        if(DEBUG){

            if(!error){

                Console.err("ERROR: Unknown");
                return;
            }
            else if(typeof error === 'string'){

                Console.err("ERROR: " + error);
            }
            else if(error['message']){

                Console.err("ERROR: " + error['message']);
            }

            if(CONFIG.ENV !== 'production') {

                if(error instanceof Error) Console.err(error.toString());
            }
        }
    };

    /**
     * @constructor
     * @implements {_filesystem_struct}
     * @param {boolean=} is_consistent
     */

    function FilesystemAdapter(is_consistent){

        if(is_consistent){

            if(window['LocalFileSystem']){

                this.type_of_consistent = window['LocalFileSystem']['PERSISTENT'];
            }
            else{

                this.type_of_consistent = window['PERSISTENT'];
            }

            this.currentStorage = navigator['persistentStorage'];
        }
        else{

            if(window['LocalFileSystem']){

                this.type_of_consistent = window['LocalFileSystem']['TEMPORARY'];
            }
            else{

                this.type_of_consistent = window['TEMPORARY'];
            }

            this.currentStorage = navigator['temporaryStorage']
        }

        return this;
    }

    /**
     * @param {number=} max_file_storage_mb
     * @param {Function=} callback
     */

    FilesystemAdapter.prototype.init = function(max_file_storage_mb, callback){

        // deprecated:
        // window['storageInfo']['requestQuota'](this.type_of_consistent);

        if(PLATFORM === 'cordova' && window['cordova']['file']){

            if(callback){

                callback(grantedBytes);
            }
        }
        else{

            try{

                this.currentStorage['requestQuota'](

                    // filesize
                    (max_file_storage_mb || CONFIG.MAX_FILE_STORAGE_MB || 5) * 1024 * 1024,

                    // success
                    function(_grantedBytes){

                        grantedBytes = _grantedBytes || grantedBytes;

                        if(DEBUG) Console.log("Filesystem: " + (grantedBytes / 1024 / 1024) + ' Mb reserved.');

                        if(callback){

                            callback(grantedBytes);
                        }
                    },

                    // error
                    error_callback
                );
            }
            catch(e){

                error_callback.call(this, e);
            }
        }
    };

    /**
     * @param {Function=} callback
     */

    FilesystemAdapter.prototype.info = function(callback){

        try{

            this.currentStorage['queryUsageAndQuota'](

                function(usedBytes, grantedBytes){

                    if(DEBUG) Console.log('Filesystem: ' + (usedBytes / 1024 / 1024) + ' of ' + (grantedBytes / 1024 / 1024) + ' Mb used.');

                    if(callback){

                        callback(usedBytes, grantedBytes);
                    }
                },

                // error
                error_callback
            );
        }
        catch(e){

            error_callback.call(this, e);
        }
    };

    /**
     * @param {!string} filename
     * @param {!Function} callback
     * @param {string=} type
     */

    FilesystemAdapter.prototype.load = function(filename, callback, type){

        this.getFile(filename, function(fileEntry){

            fileEntry['file'](

                // success
                function(file){

                    var reader = new FileReader();

                    reader['onloadend'] = function(evt){

                        if(evt['target']['readyState'] === FileReader['DONE']){ // DONE = 2

                            callback(evt['target']['result']);
                        }

                        else if(evt['target']['error']){

                            error_callback(evt['target']['error']);
                        }
                    };

                    reader['readAs' + (type || 'Text')](file);
                },

                // error
                error_callback
            );
        });
    };

    /**
     * @param {!string} filename
     * @param {!Function} callback
     * @param {!Function=} callback_error
     * @param {boolean=} create
     */

    FilesystemAdapter.prototype.getFile = function(filename, callback, callback_error, create){

        if(!filename){

            return error_callback(new Error("MissingParameterError"));
        }

        try{

            window['requestFileSystem'](this.type_of_consistent, grantedBytes,

                // success
                function(fs){

                    fs['root']['getFile'](filename, {'create': create || false},

                        // success
                        callback,

                        // error
                        callback_error || error_callback
                    );
                },

                // error
                error_callback
            );
        }
        catch(e){

            error_callback.call(this, e);
        }
    };

    /**
     * @param {!string} filename
     * @param {!Function} callback
     */

    FilesystemAdapter.prototype.getPath = function(filename, callback){

        this.getFile(filename, function(fileEntry){

            callback(fileEntry['toURL']());
        });
    };

    /**
     * @param {!string} url
     * @param {!Function} callback
     */

    FilesystemAdapter.prototype.resolve = function(url, callback) {

        window['resolveLocalFileSystemURL'](url, function(fileEntry) {

            callback(fileEntry);
        });
    };

    /**
     * @param {!string} filename
     * @param {!string|Array<string>} content
     * @param {string=} type
     * @param {Function=} callback
     */

    FilesystemAdapter.prototype.save = function(filename, content, type, callback){

        if(!content){

            return error_callback(new Error("EmptyFileContentError"));
        }

        this.getFile(filename, function(fileEntry){

            fileEntry['createWriter'](
                /**
                 *
                 * @param {FileWriter} fileWriter
                 */

                    // success
                function(fileWriter){

                    fileWriter['onwriteend'] = function(e){

                        if(callback){

                            callback(fileEntry['toURL']());
                        }
                    };

                    fileWriter['onerror'] = error_callback;

                    var blob = new Blob(typeof content === 'string' ? [content] : content, {

                        'type': type || 'text/plain'
                    });

                    try{

                        fileWriter['write'](blob);
                    }
                    catch(e){

                        error_callback(e);
                    }

                    //var bb = new (window['BlobBuilder'] || window['WebKitBlobBuilder'])();
                    //bb.append(content);
                    //fileWriter.write(bb['getBlob'](type || 'text/plain'));
                },

                // error
                error_callback
            );

        }, error_callback, /* create?*/ true);
    };

    /**
     * @param {!string} filename
     * @param {!string} content
     * @param {string=} type
     * @param {Function=} callback
     */

    FilesystemAdapter.prototype.saveAsBlob = function(filename, content, type, callback){

        this.save(filename, toBlob(content), type, callback);
    };

    /**
     * @param {!string} filename
     * @param {!Function} callback
     */

    FilesystemAdapter.prototype.exist = function(filename, callback){

        this.getFile(filename, function(fileEntry){

            if(callback){

                callback(!!fileEntry);
            }
            else{

                if(DEBUG) Console.log('File exist: ' + filename);
            }

        }, function(){

            if(callback){

                callback(false);
            }
            else{

                if(DEBUG) Console.log('File does not exist: ' + filename);
            }
        });
    };

    /**
     *
     * @param {!string} filename
     * @param {Function=} callback
     */

    FilesystemAdapter.prototype.delete = function(filename, callback){

        this.getFile(filename, function(fileEntry){

            fileEntry['remove'](

                // success
                function(e){

                    if(callback){

                        callback(e || true);
                    }
                },

                // error
                error_callback
            );
        });
    };

    return FilesystemAdapter;

    /**
     * @param {!string} base64
     * @param {number=} sliceSize
     * @returns {Array}
     */

    function toBlob(base64, sliceSize) {

        sliceSize || (sliceSize = 512);

        var marker = base64.indexOf(';base64,');

        if(marker !== -1){

            base64 = base64.substring(marker + 8);
        }

        var byteCharacters = atob(base64);
        var byteArrays = [];

        for(var offset = 0; offset < byteCharacters.length; offset += sliceSize) {

            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);

            for(var i = 0; i < slice.length; i++) {

                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return byteArrays;
    }

})();

// Usage:
//
// CORE.async(function(){
//
//     (function test(){
//
//         var fs = new APP.PLUGIN.Filesystem(true);
//
//         fs.init(20, function(){
//
//             CORE.buildPattern([{
//
//                 tag: 'img',
//                 attr:{
//                     'style': 'z-index:99; width:100%; height:100%; position: absolute; top:0',
//                     'id': 'test_img',
//                     'src': ''
//                 }
//
//             }], document.body);
//
//             CORE.imageToDataUrl('img/rounded-social-icon-dark.png', function(base64Img) {
//
//                 fs.save("test.png", base64Img, 'text/plain', function(){
//
//                     fs.load("test.png", function(result){
//
//                         document.getElementById('test_img').src = result;
//                     });
//
//                 });
//
//             }, 'image/png'/*, 0.92*/);
//         });
//
//         fs.info();
//
//     })();
//
// }, 1500);
