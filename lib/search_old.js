// goog.provide('Util.Search');
// goog.require('Util');
// goog.require('INTERFACE');
// goog.require('CORE.ASYNC');
// goog.require('Util.Cache');
//
// /**!
//  * BulkSearch - Superfast lightweight full text search library
//  * -----------------------------------------------------------
//  * @version: 0.1.2
//  * @author: Thomas Wilkerling
//  * @license: Apache 2.0 License
//  * https://github.com/nextapps-de/bulksearch
//  */
//
// Util.Search = (function(queue, cache){
//
//     "use strict";
//
//     /**
//      * @enum {number|string|boolean}
//      * @private
//      * @const
//      * @final
//      */
//
//     var defaults = {
//
//         // bitsize of assigned IDs (data type)
//         type: 'integer',
//
//         // type of information
//         result: 'id',
//
//         // type-save separator
//         separator: '~', // '^'
//
//         // match when starts from beginning
//         strict: false,
//
//         // handle multiple words as separated queries
//         multi: false,
//
//         // boolean model of multiple words
//         boolean: false,
//
//         // matching in strict order (multiple words)
//         ordered: false,
//
//         // use flexible cache (scales automatically)
//         cache: false,
//
//         // use flexible cache (scales automatically)
//         async: false,
//
//         // use on of built-in functions
//         // or pass custom encoding algorithm
//         encode: false,
//
//         // default chunk size
//         size: 4000, // 600 -> 2500 -> 4000 -> 5000 -> 10000
//
//         // depth of register
//         depth: 0
//     };
//
//     /**
//      * Phonetic Encoders
//      * @enum {Function|boolean}
//      * @private
//      * @const
//      * @final
//      */
//
//     var encoder = {
//
//         // case insensitive search
//
//         'icase': function(value){
//
//             return value.toLowerCase();
//         },
//
//         // simple phonetic normalization (latin)
//
//         'simple': (function(){
//
//             var regex_strip = regex('[^a-z0-9 ]'),
//                 regex_a = regex('[àáâãäå]'),
//                 regex_e = regex('[èéêë]'),
//                 regex_i = regex('[ìíîï]'),
//                 regex_o = regex('[òóôõöő]'),
//                 regex_u = regex('[ùúûüű]'),
//                 regex_y = regex('[ýŷÿ]'),
//                 regex_n = regex('ñ'),
//                 regex_c = regex('ç'),
//                 regex_s = regex('ß');
//
//             return function(str) {
//
//                 return (
//
//                     str.toLowerCase()
//                        .replace(regex_a, 'a')
//                        .replace(regex_e, 'e')
//                        .replace(regex_i, 'i')
//                        .replace(regex_o, 'o')
//                        .replace(regex_u, 'u')
//                        .replace(regex_y, 'y')
//                        .replace(regex_n, 'n')
//                        .replace(regex_c, 'c')
//                        .replace(regex_s, 's')
//                        .replace(regex_strip, '')
//                 );
//             };
//         }()),
//
//         // advanced phonetic transformation (latin)
//
//         'advanced': (function(){
//
//             var regex_space = regex(' '),
//                 regex_ae = regex('ae'),
//                 regex_oe = regex('oe'),
//                 regex_ue = regex('ue'),
//                 regex_ie = regex('ie'),
//                 regex_sz = regex('sz'),
//                 regex_zs = regex('zs'),
//                 regex_ck = regex('ck'),
//                 regex_cc = regex('cc'),
//                 regex_sh = regex('sh'),
//                 regex_th = regex('th'),
//                 regex_dt = regex('dt'),
//                 regex_ph = regex('ph'),
//                 regex_ou = regex('ou'),
//                 regex_uo = regex('uo');
//
//             return function(string, _skip_post_processing){
//
//                 if(!string){
//
//                     return string;
//                 }
//
//                 // perform simple encoding
//                 string = encoder['simple'](string);
//
//                 // normalize special pairs
//                 if(string.length > 2){
//
//                     string = string.replace(regex_ae, 'a')
//                                    .replace(regex_oe, 'o')
//                                    .replace(regex_ue, 'u')
//                                    .replace(regex_ie, 'i')
//                                    .replace(regex_sz, 's')
//                                    .replace(regex_zs, 's')
//                                    .replace(regex_sh, 's')
//                                    .replace(regex_ck, 'k')
//                                    .replace(regex_cc, 'k')
//                                    .replace(regex_th, 't')
//                                    .replace(regex_dt, 't')
//                                    .replace(regex_ph, 'f')
//                                    .replace(regex_ou, 'o')
//                                    .replace(regex_uo, 'u');
//                 }
//
//                 if(!_skip_post_processing){
//
//                     // remove white spaces
//                     string = string.replace(regex_space, '');
//
//                     // delete all repeating chars
//                     if(string.length > 1){
//
//                         string = collapseRepeatingChars(string);
//                     }
//                 }
//
//                 return string;
//             };
//
//         })(),
//
//         'extra': (function(){
//
//             var soundex_b = regex('p'),
//                 soundex_c = regex('[sz]'),
//                 soundex_k = regex('[gq]'),
//                 soundex_i = regex('[jy]'),
//                 soundex_m = regex('n'),
//                 soundex_t = regex('d'),
//                 soundex_f = regex('[vw]');
//
//             var regex_vowel = regex('[aeiouy]');
//
//             return function(str) {
//
//                 if(!str){
//
//                     return str;
//                 }
//
//                 // perform advanced encoding
//                 str = encoder['advanced'](str, /* skip post processing? */ true);
//
//                 if(str.length > 1){
//
//                     str = str.split(" ");
//
//                     for(var i = 0; i < str.length; i++){
//
//                         var current = str[i];
//
//                         if(current.length > 1){
//
//                             // remove all vowels after 2nd char
//                             str[i] = current[0] + current.substring(1)
//                                                          .replace(soundex_b, 'b')
//                                                          .replace(soundex_c, 'c')
//                                                          .replace(soundex_k, 'k')
//                                                          .replace(soundex_i, 'i')
//                                                          .replace(soundex_m, 'm')
//                                                          .replace(soundex_t, 't')
//                                                          .replace(soundex_f, 'f')
//                                                          .replace(regex_vowel, '');
//                         }
//                     }
//
//                     str = str.join("");
//                     str = collapseRepeatingChars(str);
//                 }
//
//                 return str;
//             };
//         })()
//
//         // TODO: provide some common encoder plugins
//         // soundex
//         // cologne
//         // metaphone
//         // caverphone
//         // levinshtein
//         // hamming
//         // matchrating
//         // ngram
//     };
//
//     /**
//      * @type {Array<Array>}
//      * @private
//      */
//
//     var custom_matchers = [];
//
//     /**
//      * @type {number}
//      * @private
//      */
//
//     var chunk_size = 10000;
//
//     /**
//      * @type {number}
//      * @private
//      */
//
//     var id_counter = 0;
//
//     /**
//      * @type {string}
//      * @private
//      */
//
//     var last_empty_query = "";
//
//     /**
//      * @type {Object<string, number>}
//      * @private
//      */
//
//     var scores = {};
//
//     /**
//      * @param {Object<string, number|string|boolean>=} options
//      * @constructor
//      * @implements _search_struct
//      * @private
//      */
//
//     function BulkSearch(options){
//
//         // generate UID
//
//         this.id = id_counter++;
//
//         // initialize index
//
//         this.init(options || defaults);
//     }
//
//     /**
//      * @param {Object<string, number|string|boolean>=} options
//      * @returns _search_struct
//      */
//
//     BulkSearch.create =
//     BulkSearch.new = function(options){
//
//         return new this(options);
//     };
//
//     /**
//      * @param {Object<string, string>} matcher
//      */
//
//     BulkSearch.addMatcher = function(matcher){
//
//         for(var key in matcher){
//
//             if(matcher.hasOwnProperty(key)){
//
//                 custom_matchers[custom_matchers.length] = [
//
//                     regex(key), matcher[key]
//                 ];
//             }
//         }
//     };
//
//     /**
//      * @param {Object<string, number|string|boolean>=} options
//      */
//
//     BulkSearch.prototype.init = function(options){
//
//         // apply options
//
//         if(options){
//
//             this.type = (
//
//                 options['type'] ||
//                 this.type ||
//                 defaults.type
//             );
//
//             this.result = (
//
//                 options['result'] ||
//                 this.result ||
//                 defaults.result
//             );
//
//             this.separator = (
//
//                 options['separator'] ||
//                 this.separator ||
//                 defaults.separator
//             );
//
//             this.strict = (
//
//                 options['strict'] ||
//                 this.strict ||
//                 defaults.strict
//             );
//
//             this.ordered = (
//
//                 options['ordered'] ||
//                 this.ordered ||
//                 defaults.ordered
//             );
//
//             this.multi = (
//
//                 options['multi'] ||
//                 this.multi ||
//                 defaults.multi
//             );
//
//             this.boolean = (
//
//                 options['boolean'] === 'or' ||
//                 this.boolean ||
//                 defaults.boolean
//             );
//
//             this.cache = (
//
//                 options['cache'] ||
//                 this.cache ||
//                 defaults.cache
//             );
//
//             this.async = (
//
//                 options['async'] ||
//                 this.async ||
//                 defaults.async
//             );
//
//             this.depth = (
//
//                 options['depth'] ||
//                 this.depth ||
//                 defaults.depth
//             );
//
//             this.encode = (
//
//                 (options['encode'] && encoder[options['encode']]) ||
//                 this.encode ||
//                 (defaults.encode && encoder[defaults.encode])
//             );
//
//             chunk_size = /** @type {number} */ (options['size'] || defaults.size);
//         }
//
//         // initialize index
//
//         this._index = [create_typed_array(this.type, chunk_size)];
//         this._marker = {};
//         this._fragment = {};
//         this._register = {};
//         this._bulk = [""];
//         this._chunk = 0;
//         this._status = true;
//         this._fragmented = 0;
//         this._cache = this.cache ?
//
//             /** @type _cache_struct */
//             (new cache(30 * 1000, 50, true))
//         :
//             false;
//     };
//
//     /**
//      * @param {!number|string} id
//      * @param {!string} content
//      */
//
//     BulkSearch.prototype.set =
//     BulkSearch.prototype.add = function(id, content){
//
//         if(content){
//
//             // check if index ID already exist
//
//             if(this._marker[id]){
//
//                 this.update(id, content);
//             }
//             else{
//
//                 if(this.encode){
//
//                     content = apply_encoding(
//
//                         content, this.encode, this.strict
//                     );
//                 }
//
//                 var bulk = this._bulk;
//                 var chunk_index = this._chunk;
//                 var fragment = this._fragment[content.length];
//                 var index;
//                 var marker;
//
//                 // check fragments
//
//                 // TODO: split fragments into reusable parts
//                 // if(!fragment && this._fragmented){
//                 //
//                 //     var fragment_keys = Object.keys(this._fragment);
//                 //
//                 //     for(var i = 0; i < fragment_keys.length; i++){
//                 //
//                 //         if(content.length < fragment_keys[i]){
//                 //
//                 //             fragment = this._fragment[fragment_keys[i]];
//                 //             break;
//                 //         }
//                 //     }
//                 // }
//
//                 if(fragment && fragment.length){
//
//                     marker = this._marker[id] = fragment.pop();
//                     index = marker[1];
//
//                     var chunk = bulk[marker[0]];
//
//                     bulk[marker[0]] = (
//
//                         chunk.substring(0, index) +
//                         content +
//                         chunk.substring(marker[2])
//                     );
//
//                     this._fragmented -= content.length;
//                 }
//                 else{
//
//                     index = bulk[chunk_index].length;
//
//                     // check chunk size limit
//
//                     if((index + content.length) > chunk_size){
//
//                         if(index < (chunk_size / 2)){
//
//                             chunk_size *= 2;
//                         }
//
//                         this._chunk = ++chunk_index;
//
//                         index = 0;
//                         bulk[chunk_index] = "";
//                         this._index[chunk_index] = create_typed_array(this.type, chunk_size);
//                     }
//
//                     // 32 bytes per marker --> Uint16Array = 8 bytes per marker
//                     marker = this._marker[id] = [
//
//                         chunk_index,
//                         index,
//                         0,
//                         0
//                     ];
//
//                     bulk[chunk_index] += content + this.separator;
//                 }
//
//                 if(this._index[chunk_index].constructor === Array){
//
//                     for(var i = 0; i < content.length; i++){
//
//                         this._index[chunk_index][index++] = id;
//                     }
//                 }
//                 else{
//
//                     this._index[chunk_index].fill(id, index, index + content.length + 1);
//
//                     index += content.length;
//                 }
//
//                 // assign end marker
//
//                 marker[2] = index;
//
//                 // push marker to the register
//
//                 if(this.depth){
//
//                     for(var i = this.depth; i > 1; i--){
//
//                         var key = content.substring(0, i);
//
//                         this._register[key] || (this._register[key] = []);
//                         this._register[key].push(marker);
//                     }
//                 }
//
//                 // update status
//
//                 this._status = false;
//             }
//         }
//
//         if(this.async){
//
//             return Promise.resolve(this);
//         }
//     };
//
//     BulkSearch.prototype.update = function(id, content){
//
//         var marker = this._marker[id];
//
//         if(marker){
//
//             if(content && this.encode){
//
//                 content = apply_encoding(
//
//                     content, this.encode, this.strict
//                 );
//             }
//
//             var min = marker[1];
//             var max = marker[2];
//             var old_length = max - min;
//             var overlap = content.length - old_length;
//             var old_content = content;
//
//             if(overlap > 0){
//
//                 // clear content (bypass)
//
//                 content = "";
//             }
//
//             // right-padding invalid index
//
//             while(content.length < old_length){
//
//                 content = (content + "                                                  ").substring(0, old_length);
//             }
//
//             var bulk = this._bulk;
//             var chunk_index = marker[0];
//             var chunk = bulk[chunk_index];
//
//             // submerge updated content to bulk
//
//             bulk[chunk_index] = chunk.substring(0, min) +
//                                 content +
//                                 chunk.substring(max);
//
//             // check if content length has enlarged
//
//             if(overlap > 0 || !old_content){
//
//                 // get fragments
//
//                 var current_fragment_length = this._fragment[old_length];
//
//                 if(!current_fragment_length){
//
//                     this._fragment[old_length] = [];
//
//                     current_fragment_length = 0;
//                 }
//                 else{
//
//                     current_fragment_length = current_fragment_length.length;
//                 }
//
//                 // add fragment
//
//                 this._fragment[old_length][current_fragment_length] = marker;
//                 this._fragmented += old_length;
//
//                 // delete marker
//
//                 this._marker[id] = null;
//
//                 // add overlapping contents to the end
//
//                 if(old_content) {
//
//                     this.add(id, old_content);
//                 }
//             }
//
//             // update status
//
//             this._status = false;
//         }
//
//         if(this.async){
//
//             return Promise.resolve(this);
//         }
//     };
//
//     BulkSearch.prototype.delete =
//     BulkSearch.prototype.remove = function(id){
//
//         this.update(id, '');
//     };
//
//     /**
//      * @param {string} query
//      * @param {number|Function} limit
//      * @param {Function=} callback
//      * @returns {Array}
//      */
//
//     BulkSearch.prototype.search =
//     BulkSearch.prototype.query =
//     BulkSearch.prototype.find = function(query, limit, callback){
//
//         if(typeof limit === 'function'){
//
//             callback = limit;
//             limit = 0;
//         }
//
//         if(callback){
//
//             var self = this;
//
//             queue(function(){
//
//                 callback(self.search(query, limit));
//
//             }, 'search-' + this.id);
//
//             queue(function(){
//
//                 self = null;
//             });
//
//             return null;
//         }
//
//         var _query = query;
//
//         // invalidate cache
//
//         if(!this._status){
//
//             if(this.cache){
//
//                 this._cache.reset();
//             }
//
//             this._status = true;
//         }
//
//         // validate cache
//
//         else if(this.cache){
//
//             var cache = this._cache.get(query);
//
//             if(cache){
//
//                 return cache;
//             }
//         }
//
//         else if(last_empty_query && (query.indexOf(last_empty_query) !== -1)){
//
//             return [];
//         }
//
//         // remove trailing spaces
//
//         var spaces = 0;
//
//         while(query[spaces] === " "){
//
//             spaces++;
//         }
//
//         if(spaces){
//
//             _query = query.substring(spaces);
//         }
//
//         if(!query){
//
//             return [];
//         }
//
//         // convert words into single components
//
//         var words = (
//
//             this.multi ?
//
//                 _query.split(' ')
//             :
//                 [_query]
//         );
//
//         var length = words.length;
//
//         // sort words by length
//
//         if((length > 1) && !this.boolean){
//
//             words.sort(sort_by_length);
//         }
//
//         var encoded = new Array(length);
//
//         // encode query
//
//         if(this.encode){
//
//             words[0] = apply_encoding(
//
//                 words[0], this.encode, false
//             );
//         }
//
//         // perform search
//
//         var result = [];
//
//         for(var z = 0; z < this._bulk.length; z++){
//
//             var start = 0;
//             var pos = 0;
//             var bulk = this._bulk[z];
//
//             while((pos = bulk.indexOf(words[0], start)) !== -1){
//
//                 var current_id = this._index[z][pos];
//                 var marker = this._marker[current_id];
//
//                 if(marker){
//
//                     var min = marker[1];
//                     var max = marker[2];
//                     var matched = true;
//                     var sub_bulk;
//
//                     // check multiple word components
//
//                     if(length > 1){
//
//                         sub_bulk = bulk.substring(min, max);
//
//                         for(var i = 1; i < length; i++){
//
//                             // encode query
//
//                             if(this.encode && !encoded[i]){
//
//                                 words[i] = apply_encoding(
//
//                                     words[i], this.encode, false
//                                 );
//
//                                 encoded[i] = true;
//                             }
//
//                             if(words[i]){
//
//                                 if(sub_bulk.indexOf(words[i]) === -1){
//
//                                     // boolean and:
//
//                                     if(!this.boolean){
//
//                                         matched = false;
//                                         break;
//                                     }
//                                     else{
//
//                                         matched = false;
//                                     }
//                                 }
//                                 else{
//
//                                     // boolean or:
//
//                                     if(this.boolean){
//
//                                         matched = true;
//                                         break;
//                                     }
//                                 }
//                             }
//                         }
//                     }
//
//                     if(matched){
//
//                         // increase score
//
//                         sub_bulk || (sub_bulk = bulk.substring(min, max));
//                         sub_bulk = sub_bulk.substring(0, this.depth);
//                         scores[sub_bulk] ? scores[sub_bulk]++ : scores[sub_bulk] = 1;
//
//                         // enrich result
//
//                         switch(this.result){
//
//                             case 'id':
//
//                                 result[result.length] = current_id;
//                                 break;
//
//                             case 'compact':
//
//                                 result[result.length] = {
//
//                                     'id': current_id,
//                                     'content': sub_bulk || bulk.substring(min, max),
//                                     'rank': scores[sub_bulk]
//                                 };
//
//                                 break;
//
//                             case 'full':
//
//                                 result[result.length] = {
//
//                                     'id': current_id,
//                                     'content': sub_bulk || bulk.substring(min, max),
//                                     'rank': scores[sub_bulk],
//                                     'score': 1.0
//                                 };
//
//                                 break;
//                         }
//
//                         // apply limit
//
//                         if(limit && (result.length === limit)){
//
//                             break;
//                         }
//                     }
//
//                     pos = max;
//                 }
//
//                 start = pos + 1;
//             }
//
//             if(limit && (result.length === limit)){
//
//                 break;
//             }
//         }
//
//         if(result.length){
//
//             last_empty_query = "";
//         }
//         else{
//
//             last_empty_query = query;
//         }
//
//         // store result to cache
//
//         if(this.cache) {
//
//             this._cache.set(query, result);
//         }
//
//         return result;
//     };
//
//     BulkSearch.prototype.optimize =
//     BulkSearch.prototype.cleanup = function(){
//
//         var old_bulk = this._bulk;
//         var old_marker = this._marker;
//         var old_cache = this._cache;
//         var old_register = this._register;
//
//         // reset index
//
//         this.reset();
//
//         // get ids
//
//         var score_keys = Object.keys(/** @type {!Object} */ (scores));
//         var register_keys = Object.keys(old_register);
//
//         // re-add contents
//
//         // for(var i = 0; i < score_keys.length; i++){
//         //
//         //     var key = score_keys[i];
//         //     var score = scores[key];
//         //
//         //     if(score){
//         //
//         //         for(var a = 0; a < register_keys.length; a++){
//         //
//         //             if(score_keys[i] === register_keys[a]){
//         //
//         //
//         //             }
//         //         }
//         //     }
//         // }
//
//         // get ids
//
//         var marker_keys = Object.keys(old_marker);
//
//         // re-add contents
//
//         for(var i = 0; i < marker_keys.length; i++){
//
//             var key = marker_keys[i];
//             var marker = old_marker[key];
//
//             if(marker){
//
//                 var bulk = old_bulk[marker[0]];
//                 var current_value = bulk.substring(marker[1], marker[2]);
//
//                 this.add(key, current_value);
//             }
//             else{
//
//                 delete old_marker[key];
//             }
//         }
//
//         // assign valid cache
//
//         if(old_cache){
//
//             this._cache = old_cache;
//         }
//
//         if(this.async){
//
//             return Promise.resolve(this);
//         }
//     };
//
//     BulkSearch.prototype.info = function(){
//
//         var fragmented = this._fragmented;
//         var marker_length = Object.keys(this._marker).length;
//         var bytes = 0;
//         var length = 0;
//         var index_length = 0;
//
//         for(var z = 0; z < this._bulk.length; z++){
//
//             length += this._bulk[z].length;
//         }
//
//         for(var z = 0; z < this._index.length; z++){
//
//             index_length += this._index[z].length;
//         }
//
//         if(length){
//
//             fragmented = ((100 / length * fragmented * 100) | 0) / 100;
//
//             bytes = (
//
//                 this._index[0].constructor === Array ?
//
//                     32 // ~ 16 chars
//                 :
//                     this._index[0].byteLength
//             );
//
//             this._index = [create_typed_array(this.type, chunk_size)];
//             this._marker = {};
//             this._fragment = {};
//             this._register = {};
//             this._bulk = [""];
//
//             bytes = (Object.keys(this._marker).join("").length * 2 + marker_length * 4 * 3) + (this._fragmented * 2) + (index_length * bytes);
//         }
//
//         return {
//
//             'id': this.id,
//             'length': marker_length,
//             'chunks': this._bulk.length,
//             'register': Object.keys(this._register).length,
//             'depth': this.depth,
//             'size': chunk_size,
//             'bytes': bytes,
//             'fragments': Object.keys(this._fragment).length,
//             'fragmented': fragmented,
//             'status': this._status,
//             'matchers': custom_matchers.length
//         };
//     };
//
//     BulkSearch.prototype.reset =
//     BulkSearch.prototype.clear = function(){
//
//         // destroy index
//
//         this.destroy();
//
//         // initialize index
//
//         this.init();
//     };
//
//     BulkSearch.prototype.destroy = function(){
//
//         // cleanup cache
//
//         if(this.cache){
//
//             this._cache.reset();
//         }
//
//         // release references
//
//         this._index = null;
//         this._marker = null;
//         this._fragment = null;
//         this._bulk = null;
//         this._register = null;
//         this._cache = null;
//     };
//
//     return BulkSearch;
//
//     // ---------------------------------------------------------
//     // Helpers
//
//     function create_typed_array(type, size){
//
//         return new ((
//
//             type === 'int' || type === 'integer' ?
//
//                 Uint32Array
//             :(
//                 type === 'short' ?
//
//                     Uint16Array
//                 :(
//                     type === 'float' || type === 'double' ?
//
//                         Float64Array
//                     :(
//                         type === 'byte' ?
//
//                             Uint8Array
//                         :
//                             null
//                     )
//                 )
//             )
//
//         ) || Array)(size);
//     }
//
//     function regex(str){
//
//         return new RegExp(str, 'g');
//     }
//
//     function apply_custom_matchers(str){
//
//         for(var i = 0; i < custom_matchers.length; i++){
//
//             var matcher = custom_matchers[i];
//
//             str = str.replace(matcher[0], matcher[1]);
//         }
//
//         return str;
//     }
//
//     function apply_encoding(content, encode, strict_mode){
//
//         if(strict_mode){
//
//             content = content.split(' ').map(function(value){
//
//                 value = encode(value);
//
//                 if(custom_matchers.length){
//
//                     value = apply_custom_matchers(value);
//                 }
//
//                 return value;
//
//             }).join(' ');
//         }
//         else{
//
//             content = encode(content);
//
//             if(custom_matchers.length){
//
//                 content = apply_custom_matchers(content);
//             }
//         }
//
//         return content;
//     }
//
//     function sort_by_length(a, b){
//
//         var diff = a.length - b.length;
//
//         return (
//
//             diff < 0 ?
//
//                 1
//             :(
//                 diff > 0 ?
//
//                     -1
//                 :
//                     0
//             )
//         );
//     }
//
//     /**
//      * @param {string} string
//      * @returns {string}
//      */
//
//     function collapseRepeatingChars(string){
//
//         var collapsed_string = '',
//             char_prev = '',
//             char_next = '';
//
//         for(var i = 0; i < string.length; i++){
//
//             var char = string[i];
//
//             if(char !== char_prev){
//
//                 if(i > 0 && char === 'h'){
//
//                     var char_prev_is_vowel = (
//
//                         char_prev === 'a' ||
//                         char_prev === 'e' ||
//                         char_prev === 'i' ||
//                         char_prev === 'o' ||
//                         char_prev === 'u' ||
//                         char_prev === 'y'
//                     );
//
//                     var char_next_is_vowel = (
//
//                         char_next === 'a' ||
//                         char_next === 'e' ||
//                         char_next === 'i' ||
//                         char_next === 'o' ||
//                         char_next === 'u' ||
//                         char_next === 'y'
//                     );
//
//                     if(char_prev_is_vowel && char_next_is_vowel){
//
//                         collapsed_string += char;
//                     }
//                 }
//                 else{
//
//                     collapsed_string += char;
//                 }
//             }
//
//             char_next = (
//
//                 (i === string.length - 1) ?
//
//                     ''
//                 :
//                     string[i + 1]
//             );
//
//             char_prev = char;
//         }
//
//         return collapsed_string;
//     }
// })(
//     // Xone Async Handler Fallback
//
//     (CORE && CORE.async) || (function(){
//
//         var stack = {};
//
//         return function(fn, id){
//
//             var timer = stack[id];
//
//             if(timer) {
//
//                 clearTimeout(timer);
//             }
//
//             return (
//
//                 stack[id] = setTimeout(fn)
//             );
//         };
//     })(),
//
//     // Xone Flexi-Cache Handler Fallback
//
//     (Util && Util.Cache) || (function(){
//
//         function Cache(){
//
//             this.cache = {};
//         }
//
//         Cache.prototype.reset = function(){
//
//             this.cache = {};
//         };
//
//         Cache.prototype.set = function(id, value){
//
//             this.cache[id] = value;
//         };
//
//         Cache.prototype.get = function(id){
//
//             return this.cache[id];
//         };
//
//         return Cache;
//     })()
// );
