goog.provide('PLUGIN.Filesystem');
goog.require('INTERFACE.Filesystem');
goog.require('APP');
goog.require('CONFIG');
goog.require('CORE');

/**
 * @name APP.PLUGIN.Filesystem
 * @namespace APP.PLUGIN
 */

APP.PLUGIN.Filesystem = (function(){

    var grantedBytes = (CONFIG.MAX_FILE_STORAGE_MB || 5) * 1024 * 1024;

    var error_callback = function(error){

        if(DEBUG){

            if(!error){

                CORE.console.err("ERROR: Unknown");
                return;
            }
            else if(typeof error === 'string'){

                CORE.console.err("ERROR: " + error);
            }
            else if(error['message']){

                CORE.console.err("ERROR: " + error['message']);
            }

            if(CONFIG.ENV !== 'production') {

                if(error instanceof Error) CORE.console.err(error.toString());
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
    }

    /**
     * @param {number=} max_file_storage_mb
     * @param {Function=} callback
     */

    FilesystemAdapter.prototype.init = function(max_file_storage_mb, callback){

        // deprecated:
        // window['storageInfo']['requestQuota'](this.type_of_consistent);

        if(window['cordova'] && window['cordova']['file']){

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

                        if(DEBUG) CORE.console.log("Filesystem: " + (grantedBytes / 1024 / 1024) + ' Mb reserved.');

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

                    if(DEBUG) CORE.console.log('Filesystem: ' + (usedBytes / 1024 / 1024) + ' of ' + (grantedBytes / 1024 / 1024) + ' Mb used.');

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

        if(!filename){

            return error_callback(new Error("MissingParameterError"));
        }

        // if(window['resolveLocalFileSystemURL']){
        //
        //     window['resolveLocalFileSystemURL'](filename, function(entry){
        //
        //         filename = entry['toURL']();
        //     });
        // }

        try{

            window['requestFileSystem'](this.type_of_consistent, grantedBytes,

                // success
                function(fs){

                    fs['root']['getFile'](filename, {},

                        // success
                        function(fileEntry){

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
                        },

                        // error
                        error_callback
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
     * @param {!string|Array<string>} content
     * @param {string=} type
     * @param {Function=} callback
     */

    FilesystemAdapter.prototype.save = function(filename, content, type, callback){

        if(!filename || !content){

            return error_callback(new Error("MissingParameterError"));
        }

        // if(window['resolveLocalFileSystemURL']){
        //
        //     window['resolveLocalFileSystemURL'](filename, function(entry){
        //
        //         filename = entry['toURL']();
        //     });
        // }

        try{

            window['requestFileSystem'](this.type_of_consistent, grantedBytes,

                // success
                function(fs){

                    fs['root']['getFile'](filename,

                        // settings
                        {
                            'create': true // if file doesn't exist, create it
                        },

                        // success
                        function(fileEntry){

                            fileEntry['createWriter'](
                                /**
                                 *
                                 * @param {FileWriter} fileWriter
                                 */

                                // success
                                function(fileWriter){

                                    fileWriter['onwriteend'] = function(e){

                                        if(callback){

                                            callback(e || true);
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
                        },

                        // error
                        error_callback
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

    FilesystemAdapter.prototype.exist = function(filename, callback){

        if(!filename){

            return error_callback(new Error("MissingParameterError"));
        }

        // if(window['resolveLocalFileSystemURL']){
        //
        //     window['resolveLocalFileSystemURL'](filename, function(entry){
        //
        //         filename = entry['toURL']();
        //     });
        // }

        try{

            window['requestFileSystem'](this.type_of_consistent, grantedBytes,

                // success
                function(fs){

                    fs['root']['getFile'](filename,

                        // settings
                        {
                            'create': false // do not create new file!
                        },

                        // exist
                        (callback ?

                                function(){

                                    callback(true);
                                }
                            :
                                function(){

                                    if(DEBUG) CORE.console.log('File exist: ' + filename);
                                }
                        ),

                        // does not exist
                        (callback ?

                                function(){

                                    callback(false);
                                }
                            :
                                function(){

                                    if(DEBUG) CORE.console.log('File does not exist: ' + filename);
                                }
                        )
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
     *
     * @param {!string} filename
     * @param {Function=} callback
     */

    FilesystemAdapter.prototype.delete = function(filename, callback){

        if(!filename){

            return error_callback(new Error("MissingParameterError"));
        }

        // if(window['resolveLocalFileSystemURL']){
        //
        //     window['resolveLocalFileSystemURL'](filename, function(entry){
        //
        //         filename = entry['toURL']();
        //     });
        // }

        try{

            window['requestFileSystem'](this.type_of_consistent, grantedBytes,

                // success
                function(fs){

                    fs['root']['getFile'](filename,

                        {
                            'create': false
                        },

                        // success
                        function(fileEntry){

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
                        },

                        // error
                        error_callback
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

    FilesystemAdapter.prototype.loadImageUrl = function(filename, callback){

        if(!filename){

            return error_callback(new Error("MissingParameterError"));
        }

        // if(window['resolveLocalFileSystemURL']){
        //
        //     window['resolveLocalFileSystemURL'](filename, function(entry){
        //
        //         filename = entry['toURL']();
        //     });
        // }

        try{

            window['requestFileSystem'](this.type_of_consistent, grantedBytes,

                // success
                function(fs){

                    fs['root']['getFile'](filename,

                        {
                            'create': false
                        },

                        // success
                        function(fileEntry){

                            callback(fileEntry['toURL']());
                        },

                        // error
                        error_callback
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

    return FilesystemAdapter;

})();

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
