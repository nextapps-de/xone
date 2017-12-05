goog.provide('PLUGIN.Image');
goog.require('APP');
goog.require('CONFIG');
goog.require('CORE');

/**
 * @const
 */

APP.PLUGIN.Image = (function(){

    "use strict";

    var use_filesystem = (!!window['requestFileSystem']) || (PLATFORM === 'cordova');
    var use_image_cache = CORE.System.isOnline || !use_filesystem;
    var image_cache = {};

    return {

        loadImages: function(images, callback){

            for(var i = 0; i < images.length; i++){

                var current_image = images[i];

                if(current_image.dataset && current_image.dataset['image']){

                    (function(images, current_image, i){

                        CORE.queue(function(){

                            var type = current_image.dataset['format'] || 'jpeg';
                            var cache_id = current_image.dataset['image'];
                            var file_id = cache_id.replace(/[^a-z0-9.]/gi, '_').toLowerCase();

                            if(use_image_cache && image_cache[file_id]){

                                inject_image_content(current_image, image_cache[file_id]);
                            }
                            else{

                                if(use_filesystem){

                                    //APP.VARS.fs.exist(cache_id, function(exist){

                                        //if(exist){
                                        if((cache_id.indexOf('filesystem:') === 0) || ((PLATFORM === 'cordova') && (cache_id.indexOf('/Library/') === 0))){

                                            //APP.VARS.fs.getPath(cache_id, function(url){

                                                inject_image_content(current_image, cache_id);

                                                //if(callback) callback(cache_id);
                                            //});

                                            // APP.VARS.fs.load(cache_id, function(data){
                                            //
                                            //     if(use_image_cache) image_cache[cache_id] = data;
                                            //
                                            //     inject_image_content(current_image, data);
                                            // });
                                        }
                                        else{

                                            create_file_from_image(current_image, callback);
                                        }
                                    //});
                                }
                                else{

                                    var data = window.localStorage.getItem(file_id + '.base64');

                                    if(data){

                                        if(CORE.System.isOnline){

                                            inject_image_content(current_image, cache_id);
                                        }
                                        else{

                                            CORE.queue(function(){

                                                data = APP.STORAGE.decompress(data, function(data){

                                                    if(use_image_cache) image_cache[file_id] = data;

                                                    inject_image_content(current_image, data);
                                                });
                                            });
                                        }
                                    }
                                    else{

                                        create_file_from_image(current_image, callback);
                                    }
                                }
                            }
                        });

                    })(images, current_image, i);
                }
            }
        },

        deleteImages: function(images){

            for(var i = 0; i < images.length; i++){

                var current_image = images[i];
                var file_id = current_image.replace(/[^a-z0-9.]/gi, '_').toLowerCase();

                if(use_filesystem) {

                    //APP.VARS.fs.exist(current_image, function(exist){

                        //if(exist) {

                            APP.VARS.fs.delete(file_id);
                       // }
                    //});
                }
                else{

                    if(use_image_cache) delete image_cache[file_id];

                    window.localStorage.removeItem(file_id + ".base64");
                }
            }
        }
    };

    // -------------------------------------------------
    // private helpers:

    /**
     * @param {Element} current_image
     * @param {!Function=} callback
     */

    function create_file_from_image(current_image, callback){

        var image = new Image();

        image.onload = function(){

            if(image.src){

                var current_image_url = current_image.dataset['image'];

                inject_image_content(current_image, image.src);

                CORE.queue(function(){

                    var canvas = document.createElement('canvas');

                    canvas.height = image.height;
                    canvas.width = image.width;
                    canvas.getContext('2d').drawImage(image, 0, 0);

                    var type = current_image.dataset['format'] || 'jpeg';
                    var data = canvas.toDataURL('image/' + type, 0.8);
                    var path = current_image_url.replace(/[^a-z0-9.]/gi, '_').toLowerCase();

                    if(use_filesystem){

                        CORE.queue(function(){

                            APP.VARS.fs.saveAsBlob(path, data, 'image/' + type, function(path){

                                if(callback) callback(current_image, path);

                                if(DEBUG) APP.VARS.fs.info();
                            });
                        });
                    }
                    else{

                        if(use_image_cache) image_cache[path] = data;

                        CORE.queue(function(){

                            data = APP.STORAGE.compress(data, function(data){

                                window.localStorage.setItem(path + ".base64", data);

                                // TODO: callback useful here?
                                //if(callback) callback(current_image, path);
                            });
                        });
                    }
                });
            }
        };

        image.crossOrigin = 'Anonymous';
        image.src = current_image.dataset['image'];
    }

    function inject_image_content(current_image, image_data){

        //TODO: fix html change workaround

        /*
        if(window['Inferno'] && window['InfernoDOM']) {

            CORE.setHTML(

                current_image.parentNode,

                CORE.getHTML(current_image.parentNode).replace(

                    'data-image="' + current_image.dataset['image'].replace(/&/g, '&amp;') + '"',
                    'style="background-image:url(\'' + image_data + '\')"'
                )
            );
        }
        else{
        */

            if(current_image.dataset['image']) {

                CORE.setStyle(current_image, 'backgroundImage', 'url(' + image_data + ')');
                delete current_image.dataset['image'];
            }


        /*
        }
        */
    }
})();

