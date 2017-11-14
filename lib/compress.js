goog.provide('CORE.COMPRESS');
goog.require('APP');
goog.require('CORE');
goog.require('CONFIG');
goog.require('APP.WORKER');

(function(){

    if(DEBUG) {

        CORE.console.log('Initialize Compression');
    }

    // TODO: compression on MSIE is broken
    if(CORE.System.isMSIE) return;

    /**!
     * Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
     * This work is free. You can redistribute it and/or modify it
     * under the terms of the WTFPL, Version 2
     * For more information see LICENSE.txt or http://www.wtfpl.net/
     *
     * For more information, the home page:
     * http://pieroxy.net/blog/pages/lz-string/testing.html
     *
     * LZ-based compression algorithm, version 1.4.4
     * @type {Function|null}
     */

    var LZStringPlugin = function(){

        // private property
        var f = String.fromCharCode;
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+";
        var keyStrBase64  = str + "/=";
        var keyStrUriSafe = str + "-$";
        var baseReverseDic = {};

        function getBaseValue(alphabet, character) {
            if (!baseReverseDic[alphabet]) {
                baseReverseDic[alphabet] = {};
                for (var i=0, length=alphabet.length ; i<length ; i++) {
                    baseReverseDic[alphabet][alphabet.charAt(i)] = i;
                }
            }
            return baseReverseDic[alphabet][character];
        }

        return {

            'compressToBase64' : function (input) {
                if (input == null) return "";
                var res = this._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
                switch (res.length % 4) { // To produce valid Base64
                    default: // When could this happen ?
                    case 0 : return res;
                    case 1 : return res+"===";
                    case 2 : return res+"==";
                    case 3 : return res+"=";
                }
            },

            'decompressFromBase64' : function (input) {
                if (input == null) return "";
                if (input == "") return null;
                return this._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
            },

            'compressToUTF16' : function (input) {
                if (input == null) return "";
                return this._compress(input, 15, function(a){return f(a+32);}) + " ";
            },

            'decompressFromUTF16': function (compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return this._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
            },

            //compress into uint8array (UCS-2 big endian format)
            'compressToUint8Array': function (uncompressed) {
                var compressed = this.compress(uncompressed);
                var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

                for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
                    var current_value = compressed.charCodeAt(i);
                    buf[i*2] = current_value >>> 8;
                    buf[i*2+1] = current_value % 256;
                }
                return buf;
            },

            //decompress from uint8array (UCS-2 big endian format)
            'decompressFromUint8Array':function (compressed) {
                if (compressed===null || compressed===undefined){
                    return this.decompress(compressed);
                } else {
                    var buf=new Array(compressed.length/2); // 2 bytes per character
                    for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
                        buf[i]=compressed[i*2]*256+compressed[i*2+1];
                    }

                    var result = [];
                    buf.forEach(function (c) {
                        result.push(f(c));
                    });
                    return this.decompress(result.join(''));

                }

            },

            //compress into a string that is already URI encoded
            'compressToEncodedURIComponent': function (input) {
                if (input == null) return "";
                return this._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
            },

            //decompress from an output of compressToEncodedURIComponent
            'decompressFromEncodedURIComponent':function (input) {
                if (input == null) return "";
                if (input == "") return null;
                input = input.replace(/ /g, "+");
                return this._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
            },

            'compress': function (uncompressed) {
                return this._compress(uncompressed, 16, function(a){return f(a);});
            },

            _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
                if (uncompressed == null) return "";
                var i, value,
                    context_dictionary= {},
                    context_dictionaryToCreate= {},
                    context_c="",
                    context_wc="",
                    context_w="",
                    context_enlargeIn= 2, // Compensate for the first entry which should not count
                    context_dictSize= 3,
                    context_numBits= 2,
                    context_data=[],
                    context_data_val=0,
                    context_data_position=0,
                    ii,
                    length = uncompressed.length;

                for (ii = 0; ii < length; ii += 1) {
                    context_c = uncompressed.charAt(ii);
                    if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
                        context_dictionary[context_c] = context_dictSize++;
                        context_dictionaryToCreate[context_c] = true;
                    }

                    context_wc = context_w + context_c;
                    if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
                        context_w = context_wc;
                    } else {
                        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
                            if (context_w.charCodeAt(0)<256) {
                                for (i=0 ; i<context_numBits ; i++) {
                                    context_data_val = (context_data_val << 1);
                                    if (context_data_position == bitsPerChar-1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                }
                                value = context_w.charCodeAt(0);
                                for (i=0 ; i<8 ; i++) {
                                    context_data_val = (context_data_val << 1) | (value&1);
                                    if (context_data_position == bitsPerChar-1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            } else {
                                value = 1;
                                for (i=0 ; i<context_numBits ; i++) {
                                    context_data_val = (context_data_val << 1) | value;
                                    if (context_data_position ==bitsPerChar-1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = 0;
                                }
                                value = context_w.charCodeAt(0);
                                for (i=0 ; i<16 ; i++) {
                                    context_data_val = (context_data_val << 1) | (value&1);
                                    if (context_data_position == bitsPerChar-1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            }
                            context_enlargeIn--;
                            if (context_enlargeIn == 0) {
                                context_enlargeIn = Math.pow(2, context_numBits);
                                context_numBits++;
                            }
                            delete context_dictionaryToCreate[context_w];
                        } else {
                            value = context_dictionary[context_w];
                            for (i=0 ; i<context_numBits ; i++) {
                                context_data_val = (context_data_val << 1) | (value&1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }


                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        // Add wc to the dictionary.
                        context_dictionary[context_wc] = context_dictSize++;
                        context_w = String(context_c);
                    }
                }

                // Output the code for w.
                if (context_w !== "") {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
                        if (context_w.charCodeAt(0)<256) {
                            for (i=0 ; i<context_numBits ; i++) {
                                context_data_val = (context_data_val << 1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                            }
                            value = context_w.charCodeAt(0);
                            for (i=0 ; i<8 ; i++) {
                                context_data_val = (context_data_val << 1) | (value&1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for (i=0 ; i<context_numBits ; i++) {
                                context_data_val = (context_data_val << 1) | value;
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for (i=0 ; i<16 ; i++) {
                                context_data_val = (context_data_val << 1) | (value&1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for (i=0 ; i<context_numBits ; i++) {
                            context_data_val = (context_data_val << 1) | (value&1);
                            if (context_data_position == bitsPerChar-1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }


                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                }

                // Mark the end of the stream
                value = 2;
                for (i=0 ; i<context_numBits ; i++) {
                    context_data_val = (context_data_val << 1) | (value&1);
                    if (context_data_position == bitsPerChar-1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = value >> 1;
                }

                // Flush the last char
                while (true) {
                    context_data_val = (context_data_val << 1);
                    if (context_data_position == bitsPerChar-1) {
                        context_data.push(getCharFromInt(context_data_val));
                        break;
                    }
                    else context_data_position++;
                }
                return context_data.join('');
            },

            'decompress': function (compressed) {
                if (compressed == null) return "";
                if (compressed == "") return null;
                return this._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
            },

            _decompress: function (length, resetValue, getNextValue) {
                var dictionary = [],
                    next,
                    enlargeIn = 4,
                    dictSize = 4,
                    numBits = 3,
                    entry = "",
                    result = [],
                    i,
                    w,
                    bits, resb, maxpower, power,
                    c,
                    data = {val:getNextValue(0), position:resetValue, index:1};

                for (i = 0; i < 3; i += 1) {
                    dictionary[i] = i;
                }

                bits = 0;
                maxpower = Math.pow(2,2);
                power=1;
                while (power!=maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb>0 ? 1 : 0) * power;
                    power <<= 1;
                }

                switch (next = bits) {
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2,8);
                        power=1;
                        while (power!=maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb>0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2,16);
                        power=1;
                        while (power!=maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb>0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 2:
                        return "";
                }
                dictionary[3] = c;
                w = c;
                result.push(c);
                while (true) {
                    if (data.index > length) {
                        return "";
                    }

                    bits = 0;
                    maxpower = Math.pow(2,numBits);
                    power=1;
                    while (power!=maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb>0 ? 1 : 0) * power;
                        power <<= 1;
                    }

                    switch (c = bits) {
                        case 0:
                            bits = 0;
                            maxpower = Math.pow(2,8);
                            power=1;
                            while (power!=maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb>0 ? 1 : 0) * power;
                                power <<= 1;
                            }

                            dictionary[dictSize++] = f(bits);
                            c = dictSize-1;
                            enlargeIn--;
                            break;
                        case 1:
                            bits = 0;
                            maxpower = Math.pow(2,16);
                            power=1;
                            while (power!=maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb>0 ? 1 : 0) * power;
                                power <<= 1;
                            }
                            dictionary[dictSize++] = f(bits);
                            c = dictSize-1;
                            enlargeIn--;
                            break;
                        case 2:
                            return result.join('');
                    }

                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }

                    if (dictionary[c]) {
                        entry = dictionary[c];
                    } else {
                        if (c === dictSize) {
                            entry = w + w.charAt(0);
                        } else {
                            return null;
                        }
                    }
                    result.push(entry);

                    // Add w+entry[0] to the dictionary.
                    dictionary[dictSize++] = w + entry.charAt(0);
                    enlargeIn--;

                    w = entry;

                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }
                }
            }
        };
    };

    // setup

    var lz_string = LZStringPlugin();
    var job_index = {};
    var cores = 4;

    /** @const */

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

    var registerCompressor = function(compressor){

        if(DEBUG) {

            CORE.console.log('Current Compression Level: ' + compressor.info);
        }

        APP.CONFIG.GZIP = true;

        /**
         * @param {Array<string>|string} data
         * @param {Function=} callback
         */

        APP.STORAGE.compress = function(data, callback){

            if(callback && APP.WORKER['compress']){

                var id = 'job:' + (Math.random() * 99999999);
                job_index[id] = callback;

                if(DEBUG){

                    CORE.console.log("Worker Job Called: " + id);
                }

                APP.WORKER['compress'].postMessage({

                    'type': compressor.compress,
                    'data': data,
                    'id': id,
                    'debug': DEBUG
                });
            }
            else{

                if(callback){

                    CORE.queue(function(){

                        callback(

                            lz_string[compressor.compress](data)
                        );
                    });
                }
                else{

                    return lz_string[compressor.compress](data);
                }
            }
        };

        /**
         * @param {Array<string>|string} data
         * @param {Function=} callback
         */

        APP.STORAGE.decompress = function(data, callback){

            if(callback && APP.WORKER['compress']){

                var id = 'job:' + (Math.random() * 99999999);
                job_index[id] = callback;

                if(DEBUG){

                    CORE.console.log("Worker Job Called: " + id);
                }

                APP.WORKER['compress'].postMessage({

                    'type': compressor.decompress,
                    'data': data,
                    'id': id,
                    'debug': DEBUG
                });
            }
            else{

                if(callback){

                    CORE.queue(function(){

                        callback(

                            lz_string[compressor.decompress](data)
                        );
                    });
                }
                else{

                    return lz_string[compressor.decompress](data);
                }
            }
        };
    };

    var determineLevel = function(){

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

                var compressed = lz_string[compression_levels[i].compress](

                    JSON.stringify(dummy)
                );

                window.localStorage.setItem('$$test$$', compressed);

                var decompressed = JSON.parse(

                    lz_string[compression_levels[i].decompress](

                        window.localStorage.getItem('$$test$$')
                    )
                );

                if(decompressed['data']
                && decompressed['data']['outer']
                && decompressed['data']['outer']['inner']
                && decompressed['data']['outer']['inner'][0] === 'test') {

                    window.localStorage.setItem('app_compression', '' + i);

                    registerCompressor(compression_levels[i]);

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

        window.localStorage.removeItem('$$test$$');
    };

    // install

    APP.WORKER.register(

        // name:
        'compress',

        // worker:
        function(){

            var lzstring;

            /** @lends {Worker} */
            self.onmessage = function(event){

                var data = event['data'];

                if(data){

                    if(data['debug']){

                        console.log("Worker Job Started: " + data['id']);
                    }

                    if(data['register']){

                        lzstring = new Function(

                            data['register'].substring(

                                data['register'].indexOf('{') + 1,
                                data['register'].lastIndexOf('}')
                            )
                        )();
                    }
                    else{

                        /** @lends {Worker} */
                        self.postMessage({

                            'data': lzstring[data['type']](data['data']),
                            'id': data['id']
                        });
                    }
                }
            };
        },

        // callback:
        function(event){

            var data = event['data'];

            if(data){

                var id = data['id'];

                if(DEBUG){

                    CORE.console.log("Worker Job Done: " + id);
                }

                if(id){

                    job_index[id](data['data']);
                    job_index[id] = null;
                    delete job_index[id];
                }
            }
        },

        // cores:
        cores
    );

    var fn_str = LZStringPlugin.toString();

    while(cores--){

        APP.WORKER['compress'].postMessage({

            'register': fn_str
        });
    }

    if(window.localStorage.getItem('app_compression')){

        registerCompressor(

            compression_levels[

                parseInt(window.localStorage.getItem('app_compression'), 10)
            ]
        );
    }
    else{

        determineLevel();
    }

    // cleanup

    fn_str = null;
    registerCompressor = null;
    determineLevel = null;
    LZStringPlugin = null;

    // http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

    /* utf.js - UTF-8 <=> UTF-16 convertion
     *
     * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
     * Version: 1.0
     * LastModified: Dec 25 1999
     * This library is free.  You can redistribute it and/or modify it.
     */

    /*
    function Utf8ArrayToStr(array) {

        var out, i, len, c;
        var char2, char3;

        out = "";
        len = array.length;
        i = 0;

        while(i < len) {

            c = array[i++];

            switch(c >> 4){

                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;

                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;

                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    }
    */

    // if(APP.WORKER['compress']) {
    //
    //     lz_string = null;
    // }

})();
