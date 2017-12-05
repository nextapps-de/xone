goog.provide('Util.Ajax');
goog.require('Util');
goog.require('INTERFACE');
goog.require('CONFIG');
goog.require('Util.Cache');

/**
 * Ajax Controller
 * @public
 */

Util.Ajax = (function(){

    "use strict";

    /**
     * @private
     * @type {XMLHttpRequest}
     */

    var xhr = null;

    /** @type _cache_struct */

    var FlexiCache = new Util.Cache(

        // expire:
        60 * 1000,

        // length:
        100,

        // auto:
        true
    );

    /**
     * @type {Object<string, number>}
     */

    var crc = {};

    return (

        /**
         * @public
         * @param {_ajax_struct} params
         */

        function(params){

            return ajaxHandler(

                params.type || 'GET',
                params.url || '/',
                params.params || '',
                params.success,
                params.error,
                params.header,
                params.async,
                params.clear,
                params.cache
            );
        }
    );

    /**
     * @private
     * @return {XMLHttpRequest}
     */

    function createXHR(){

        // IE7, Firefox, all modern browsers:

        if(typeof XMLHttpRequest !== 'undefined'){

            xhr = new XMLHttpRequest();
        }

        // IE6, IE5:

        if(!xhr){

            try{

                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e){

                try{

                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(e){

                    //xhr = null;
                }
            }
        }

        return xhr;
    }

    /**
     * @private
     * @param {string} type
     * @return {Object<string, string>}
     */

    function getDefaultRequestHeader(type){

        /** @dict */

        return {

            "Accept": "application/json",
            "Content-Type": "application/json"
        };
    }

    /**
     * @private
     * @param {string} type
     * @param {string} url
     * @param {Object<string, string|number>|string=} params
     * @param {Function=} success
     * @param {Function=} error
     * @param {Object<string, string>=} header
     * @param {boolean=} async
     * @param {boolean=} clear
     * @param {boolean=} cache
     */

    function ajaxHandler(type, url, params, success, error, header, async, clear, cache){

        type = type.toUpperCase();

        /* SET REQUEST HEADERS */

        /** @dict */
        var current_header = header || getDefaultRequestHeader(type);

        // TODO: handle FormData() type
        var str_params = /** @type {string|null} */ ((type === 'POST' || type === 'PATCH' || type === 'DELETE') && current_header['Accept'] === "application/json" ? JSON.stringify(params) : '');
        var cache_params = str_params.replace(/ /g, '').replace(/"/g, '').replace(/{/g, '/').replace(/}/g, '').replace(/:/g, '/');
        //var str_params = CORE.paramsToString(params || '');

        if((type === 'GET') || (type === 'HEAD')) {

            url += (CORE.contains(url, '\\?') ? '' : '?') + CORE.paramsToString(params);
        }

        /* CLEAR LAST OPEN REQUEST */

        if(clear && xhr && (typeof xhr.abort !== 'undefined')) xhr.abort();

        var url_appendix = "";

        if(cache && (type === 'GET') /*&& (!crc[url + cache_params] || ((FlexiCache.expires(url + cache_params) - 1 * 60 * 1000) > (new Date()).getTime()))*/ /*&& ((typeof cache === 'undefined') || cache)*/){

            var last_cache = FlexiCache.clone(url + cache_params);

            if(last_cache){

                if(DEBUG) Console.log("Fetched from Cache: " + url + cache_params);

                return success(last_cache);
            }
        }
        // else{
        //
        //     if(cache && (type === 'GET') && crc[url + cache_params]){
        //
        //         url_appendix += '&crc=' + crc[url + cache_params];
        //     }
        // }

        /* CREATE NEW XHR INSTANCE */

        xhr = createXHR();

        /* NON-AJAX FALLBACK */

        if(!xhr){

            if(type === 'GET') document.location.href = url + (str_params.length ? '?' : '') + str_params + url_appendix;

            return;
        }

        if(DEBUG){

            var debug_time = CORE.time.now();
        }

        /* ESTABLISH CONNECTION */

        xhr.open(type, url + url_appendix, ((typeof async === 'undefined') ? true : async));

        // TODO: Refused to set unsafe header "Content-length"
        /*
         if(type === "POST") {

         if(str_params.length) current_header["Content-length"] = str_params.length;
         }
         */

        for(var property in current_header){

            if(current_header.hasOwnProperty(property)){

                xhr.setRequestHeader(property, current_header[property]);
            }
        }

        (function(xhr, current_header, cache, type, url, str_params, success, error){

            if(current_header['Authorization']) xhr.withCredentials = true;

            /* SET CALLBACKS */

            xhr.onreadystatechange = function(e){

                if(xhr.readyState === 4){

                    var json;

                    if(cache && (xhr.status === 304) && (json = FlexiCache.get(url + cache_params))){

                        FlexiCache.set(url + cache_params, json);
                        success(json);
                    }

                    else if((xhr.status === 200) || (xhr.status === 201)){

                        //if(DEBUG) Console.log(xhr.responseText);

                        try{

                            json = xhr.responseText ? JSON.parse(xhr.responseText) : [];
                        }
                        catch(e){}

                        if(cache && (type === "GET") /*|| (type === "GET" && typeof cache === 'undefined')*/){

                            //if(DEBUG) Console.log(CORE.crc32(xhr.responseText));

                            //crc[url + cache_params] = CORE.crc32(xhr.responseText);

                            FlexiCache.copy(url + cache_params, json);
                        }

                        if(DEBUG){

                            APP.STATS.time_request += CORE.time.now() - debug_time;
                        }

                        if(success){

                            if(json === null) json = []; // FIX: NULL Responses

                            success(json);
                        }

                        //return;
                    }
                    else if(error){

                        try{

                            json = xhr.responseText ? JSON.parse(xhr.responseText) : [];
                        }
                        catch(e){}

                        if(json && json['error']){

                            if(DEBUG) Console.warn(

                                json['error'].constructor === Object ?

                                    JSON.stringify(json['error'])
                                :
                                    json['error']
                            );
                        }

                        return error(xhr.status, json);
                    }
                }
                //else if(error) error(e);
            };

        })(xhr, current_header, cache, type, url, str_params, success, error);

        /* SEND PARAMETERS */

        xhr.send(str_params.length ? str_params : null);
    }

})();
