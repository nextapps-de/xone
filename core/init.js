goog.provide('INIT');
goog.require('CONFIG');
goog.require('CORE');
goog.require('DEBUGGER');
goog.require('CORE.PAINT');
goog.require('CORE.EVENT');
goog.require('CORE.STORAGE');
goog.require('APP');
goog.require('APP.INIT');
goog.require('APP.SETUP');
goog.require('APP.MAIN');
goog.require('APP.VIEW');
goog.require('APP.HTML');
goog.require('APP.LAYOUT');

/*goog.require('CORE.RETINA');*/
/*goog.require('APP.VIEWPORT');*/
/*goog.require('APP.EVENT');*/
/*goog.require('APP.HANDLER');*/
/*goog.require('APP.MAPPER');*/
/*goog.require('APP.PAYLOAD');*/
/*goog.require('APP.ROUTE');*/
/*goog.require('APP.MODEL');*/
/*goog.require('APP.LAYOUT');*/
/*goog.require('APP.CONTROLLER');*/
/*goog.require('APP.PLUGIN');*/
/*goog.require('APP.INTERFACE');*/
/*goog.require('APP.WORKER');*/

(function(){

    var onload_already_triggered = false;

    var window_onload = function(){

        /* FIX: Handle Multiple Calls */

        if(onload_already_triggered) {

            return;
        }
        else {

            onload_already_triggered = true;
        }

        /* CALL CUSTOM INIT */

        APP.INIT();

        /* INIT APP AND DEPENDENCIES */

        CORE.stack([

            initialize_settings,
            initialize_storage,
            initialize_app,
            initialize_config,
            initialize_debug,
            initialize_layout,
            initialize_translations,
            initialize_views,
            //initialize_domcache,
            initialize_events,
            initialize_models,

            /* START MAIN */

            runApp,

            /* CLEANUP */

            function(){

                runApp = null;
            }
        ]);
    };

    /* Triggers main script execution */

    if(CORE.System.isCordova){

        document.addEventListener("deviceready", window_onload, false);
    }
    else{

        window.addEventListener("load", window_onload, false);
        document.addEventListener("ready", window_onload, false);
    }

    /**
     * @type {function()|number|null}
     */

    var runApp = function(){

        /* Wait for preloadings and prefetches */

        if(APP.CONFIG.PROC){

            return CORE.async(/** @type {Function} */ (runApp));
        }

        if(DEBUG) CORE.console.log('App initialized successfully.');

        APP.SETUP();

        //if(APP.VARS.CURRENT_USER) initialize_storage();

        /* Clean Up & Register to Garbage Collector */

        if(CORE.System.isCordova){

            document.removeEventListener("deviceready", window_onload);
        }
        else{

            document.removeEventListener("ready", window_onload);
            window.removeEventListener("load", window_onload);
        }

        APP.INIT = null;
        APP.SETUP = null;
        APP.MAIN = null;

        /* CLEANUP */

        initialize_settings = null;
        initialize_storage = null;
        initialize_app = null;
        initialize_config = null;
        initialize_debug = null;
        initialize_layout = null;
        initialize_translations = null;
        initialize_views = null;
        //initialize_domcache = null;
        initialize_events = null;
        initialize_models = null;
        //determine_storage_size = null;
        window_onload = null;
    };

    /** @type {Function|null} */
    var initialize_settings = function(){

        if(DEBUG){

            CORE.console.log('Initialize Settings');
        }

        /** @type {_storage_interface} */
        (APP.SETTINGS = new CORE.Storage('app_settings'));
        /** @type {_storage_interface} */
        (APP.STORAGE.VIEW = new CORE.Storage('app_view'));
    };

    /** @type {Function|null} */
    var initialize_app = function(){

        if(DEBUG) {

            CORE.console.log('Initialize App');

            if(CONFIG.SHOW_DEBUG){

                CORE.setStyle('#debug-log', 'display', 'block');
                CORE.setStyle('#debug-stats', 'display', 'block');
            }
        }

        if(CONFIG.RACK === 'webapp') {

            CORE.async(function(){

                var applicationCache = window['applicationCache'];

                if(applicationCache){

                    if(DEBUG) CORE.console.log('Check Update (ApplicationCache), Status: ' + applicationCache['status']);

                    applicationCache.addEventListener('updateready', function() {

                        if(applicationCache['status'] === applicationCache['UPDATEREADY']) {

                            applicationCache['swapCache']();

                            /*
                            APP.LAYOUT.show_confirmation('A new update of this app was installed successfully. Restart app to take effect changes?', function(){

                                //window.localStorage.clear();
                                if(APP.HANDLER['app_update']) APP.HANDLER['app_update']();
                                window.location.reload();
                            });
                            */

                            APP.LAYOUT.show_confirmation('A new update of this app was installed successfully. Restart app to take effect changes?', function(){

                                //window.localStorage.clear();
                                if(APP.HANDLER['app_update']) APP.HANDLER['app_update']();
                                window.location.reload();
                            });
                        }

                        else if(DEBUG) CORE.console.log("Status ApplicationCache: " + applicationCache['status']);

                    }, false);

                    try{

                        applicationCache['update'](); // Attempt to update the user's cache.
                    }
                    catch(e){}
                }
            })
        }
    };

    /** @type {Function|null} */
    var initialize_config = function() {

        if(DEBUG) CORE.console.log('Initialize Config');

        APP.CONFIG.LANG = (navigator.language || navigator['userLanguage'] || 'en').substring(0, 2);
    };

    /** @type {Function|null} */
    var initialize_debug = function() {

        if(DEBUG) {

            if(DEBUG) CORE.console.log('Initialize Debug');

            if(window['applicationCache']) {

                var logEvent = function (event) {

                    if(DEBUG) CORE.console.log(event.type);
                };

                var applicationCacheEvents = [

                    'checking',
                    'noupdate',
                    'downloading',
                    'cached',
                    'updateready',
                    'obsolete',
                    'error'
                ];

                for(var i = 0; i < applicationCacheEvents.length; i++) {

                    window['applicationCache'].addEventListener(applicationCacheEvents[i], logEvent, false);
                }
            }
        }
    };

    /** @type {Function|null} */
    var initialize_layout = function() {

        if(DEBUG) CORE.console.log('Initialize Layout');

        var definitions = APP.CONFIG.LAYOUT;

        if(/** @type {Array<string>} */ (definitions)) {

            var html = '';

            for(var i = 0; i < definitions.length; i++) {

                for(var a = 0; a < APP.HTML[definitions[i]].length; a++) {

                    var current = APP.HTML[definitions[i]][a];
                    var include = current.include;

                    if(include) {

                        if(APP.HTML[include]) {

                            for(var x = 0; x < APP.HTML[include].length; x++) {

                                // var current_2 = APP.HTML[include][x];
                                // var include_2 = current_2.include;
                                // if(include_2) {
                                //     for(var y = 0; y < APP.HTML[include_2].length; y++) {
                                //         if(y === 0) APP.HTML[include][x] = current_2 = APP.HTML[include_2][y];
                                //         else APP.HTML[include].splice(x + 1 + y, 0, APP.HTML[include_2][y]);
                                //     }
                                // }

                                if(x === 0) {

                                    APP.HTML[definitions[i]][a] = current = APP.HTML[include][x];
                                }
                                else {

                                    APP.HTML[definitions[i]].splice(a + x, 0, APP.HTML[include][x]);
                                }
                            }
                        }
                        else if(APP.VIEW[include]){

                            for(var x = 0; x < APP.VIEW[include].length; x++) {

                                if(x === 0) {

                                    APP.HTML[definitions[i]][a] = current = APP.VIEW[include][x];
                                }
                                else {

                                    APP.HTML[definitions[i]].splice(a + x, 0, APP.VIEW[include][x]);
                                }
                            }
                        }
                    }

                    html += current.data[0];
                }

                /* Friendly Garbage Collection */

                //delete APP.HTML[definitions[i]];
            }

            /* Register to Garbage Collector */

            delete APP.HTML;
            delete APP.CONFIG.LAYOUT;

            var destination = document.createElement('div');

            CORE.setHTML(destination, html, false);

            for(var i = destination.childNodes.length - 1; i >= 0; i--) {

                document.body.insertBefore(destination.childNodes[i], document.body.childNodes[0]);
            }

            definitions = null;
            html = null;

            // TODO:
            //if(DEBUG) window['inobounce']();

            /* Register to Garbage Collector */

            //delete window['inobounce'];
        }
    };

    /** @type {Function|null} */
    var initialize_views = function(){

        if(DEBUG) CORE.console.log('Initialize Views');

        var views = APP.VIEW;

        for(var view in views) {

            if(views.hasOwnProperty(view)) {

                var template = views[view];

                for(var i = 0; i < template.length; i++) {

                    /** @type {_template_struct} */

                    var block = template[i];

                    if(block.include) {

                        for(var x = 0; x < views[block.include].length; x++) {

                            // var block_2 = views[block.include][x];
                            // if(block_2.include) {
                            //     for(var y = 0; y < APP.HTML[block_2.include].length; y++) {
                            //         if(y === 0) views[block.include][x] = APP.HTML[block_2.include][y];
                            //         else views[block.include].splice(x + 1 + y, 0, APP.HTML[block_2.include][y]);
                            //     }
                            // }

                            if(x === 0){

                                template[i] = views[block.include][x];
                            }
                            else{

                                template.splice(i + x, 0, views[block.include][x]);
                            }
                        }

                        block = template[i];
                    }

                    if(block.if && CORE.isType(block.if, 'string')) {

                        block.if = Function('val', 'return (' + block.if + ') ? true : false;');
                    }
                }
            }
        }

        // TODO: compare 2 strategies
        /*
         var routes = APP.ROUTES;

         for(var key in routes){

         if(routes.hasOwnProperty(key) && routes[key].view){

         // creates an own execution context to register async calls in a loop
         // otherwise the var key was mutable, this is also a good lesson of working with execution contexts
         // if you have a good JavaScript linker in your dev environment, you will get a notification
         // the approach below is also called "Factory Pattern" (the return statement is not required)

         (function(view){

         APP.CONFIG.PROC++;

         CORE.ajax({
         type: 'GET',
         header: {
         'Accepted': 'application/json'
         },
         url: view + '.json',
         success: function(data){

         for(var i = 0; i < data.length; i++){

         var item = data[i];

         if(item.if){

         item.if = Function('val', item.if);
         }
         }

         APP.VIEW[view] = data;
         APP.CONFIG.PROC--;
         },
         async: true,
         cache: false
         });

         })(routes[key].view);
         }
         }
         */
    };

    /** @type {Function|null} */
    /*
    var initialize_domcache = function(){

        if(CONFIG.DOM_CACHE_ENABLED){

            CORE.DOM || (CORE.DOM = {});

            var dom = document.getElementsByTagName("*");
            var length = dom.length;
            var count = 0;
            var id;

            for(var i = 0; i < length; i++) {

                if(id = dom[i].id){

                    if(!CORE.DOM[id]){

                        CORE.DOM[id] = dom[i];
                        count++;
                    }
                }
            }

            if(DEBUG) CORE.console.log('Initialize DOM-Cache: ' + count + ' Objects', CORE.DOM);
        }
    };
    */

    /** @type {Function|null} */
    var initialize_events = function(){

        if(DEBUG) CORE.console.log('Initialize Events');

        /* Feature Detection: Passive Events */

        try {

            window.addEventListener('test', null, /** @type {?} */ (Object.defineProperty({}, 'passive', {

                'get': function() {

                    APP.CONFIG.EVENT_OPTIONS = {

                        'passive': true
                    };

                    if(DEBUG) CORE.console.log('Passive Events Supported');
                }
            })));

        } catch (e) {}

        for(var key in APP.EVENT){

            if(APP.EVENT.hasOwnProperty(key)){

                var events = APP.EVENT[key];

                if(!events) continue;

                var node = (

                    key === 'document' || key === '_document' ?

                        document
                    :
                        key === 'body' ?

                            document.body
                        :
                            CORE.getById(key)
                );

                if(!node){

                    if(DEBUG) CORE.console.warn('WARNING: Element ' + key + ' was missing for binding event.');
                    continue;
                }

                if(events) {

                    events.length || (events = [events]);

                    for(var i = 0; i < events.length; i++) {

                        /**
                         * @type _event_struct
                         */

                        var event = events[i];

                        /**
                         * @type {Function|null}
                         */

                        var event_caller = (

                            /* Connects to a request route */

                            event.to ?

                                (function(event) {

                                    return function(e) {

                                        APP.CONTROLLER.request(
                                            event.to,
                                            APP.PAYLOAD[event.to] ? APP.PAYLOAD[event.to].call(this, e) : APP.ROUTE[event.to].params
                                        );
                                    }

                                })(event)
                            :
                                /* Connects to an event route */

                                CORE.isType(event.do, 'string') ?

                                    APP.HANDLER[event.do]
                                :
                                    event.do || (

                                        event.go ?

                                            (function(event){

                                                return function(e){

                                                    APP.LAYOUT.handleCache(APP.LAYOUT.lastAction = event.go);
                                                }

                                            })(event)
                                        :
                                            void 0
                                    )
                        );

                        if(event.if) {

                            var delegateByClass = (event.if.charAt(0) === '.');
                            var delegateByTagClass = (delegateByClass === false && event.if.indexOf('.') > 0);

                            if(delegateByTagClass) {

                                // var tmp = event.if.split('.');
                                //
                                // CORE.delegateByTagClass(
                                //     node,
                                //     tmp[0],
                                //     tmp[1],
                                //     event.on,
                                //     event_caller,
                                //     event.preventDefault,
                                //     event.stopBubble
                                // );

                                CORE.on(
                                    node,
                                    event.if,
                                    event.on,
                                    event_caller,
                                    event.preventDefault,
                                    event.stopBubble,
                                    key
                                );
                            }
                            else {

                                //if(delegateByClass) event.if = event.if.substring(1);

                                // (delegateByClass ?
                                //
                                //         CORE.delegateByClass
                                //     :
                                //         CORE.delegateByTag
                                // )(
                                //     node,
                                //     event.if,
                                //     event.on,
                                //     event_caller,
                                //     event.preventDefault,
                                //     event.stopBubble
                                // );

                                CORE.on(
                                    node,
                                    event.if,
                                    event.on,
                                    event_caller,
                                    event.preventDefault,
                                    event.stopBubble,
                                    key
                                );
                            }
                        }
                        else {

                            // CORE.addEvent(
                            //     node,
                            //     event.on,
                            //     event_caller,
                            //     event.preventDefault,
                            //     event.stopBubble
                            // );

                            CORE.on(
                                node,
                                '',
                                event.on,
                                event_caller,
                                event.preventDefault,
                                event.stopBubble,
                                key
                            );
                        }
                    }
                }
            }

            // TODO: Unload Events
            //delete APP.EVENT[key];
        }
    };

    /** @type {Function|null} */
    var initialize_translations = function(){

        if(DEBUG) CORE.console.log('Initialize Translations');

        APP.CONTROLLER.changeLanguage(APP.CONFIG.LANG);
    };

    /** @type {Function|null} */
    var initialize_storage = function(){

        if(DEBUG) CORE.console.log('Load Storage');

        //determine_storage_size(/* error value: */39500);

        // for(var model in APP.MODEL){
        //
        //     if(APP.MODEL[model].all) {
        //
        //         var data = APP.MODEL[model].all();
        //
        //         if(data.length) if(DEBUG) CORE.console.log(model + ' loaded: ' + data.length);
        //     }
        // }
    };

    /** @type {Function|null} */
    var initialize_models = function(){

        if(DEBUG) CORE.console.log('Initialize Models');

        // var models = APP.MODEL;
        //
        // for(var model in APP.MODEL){
        //
        //     if(model !== 'register' && model !== 'new' && model !== 'create' && APP.MODEL.hasOwnProperty(model)){
        //
        //         APP.MODEL[model] = APP.MODEL.register.call(APP.MODEL, model, APP.MODEL[model]);
        //
        //         console.log(this);
        //         console.log(model);
        //         console.log(APP.MODEL[model]);
        //     }
        // }
    };

    /**
     * @type {function(number=)|null}
     */

    var determine_storage_size = function(error){

        // var requestedBytes = 1024*1024*280;
        //
        // navigator.webkitPersistentStorage.requestQuota (
        //     requestedBytes,
        //     function(){},
        //     function(){});

        var localStorage = window.localStorage;

        if(localStorage) {

            var minimalFound = APP.SETTINGS.get('localStorageMaxSize');

            if(minimalFound ){

                APP.VARS.MAX_STORAGE = parseInt(minimalFound, 10);

                var t = 0, len;

                for(var x in localStorage) {

                    if(localStorage.hasOwnProperty(x)){

                        len = localStorage[x].length;

                        if(len) t += (x.length + len) * 2;
                    }
                }

                APP.VARS.USED_STORAGE = t;

                if(DEBUG) CORE.console.log("Current Storage Usage: " +

                    (((APP.VARS.USED_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' / ' +
                    (((APP.VARS.MAX_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' Mb (' +
                    (((100 / APP.VARS.MAX_STORAGE * APP.VARS.USED_STORAGE * 100) | 0) / 100) + '%)'
                );

                if(APP.VARS.USED_STORAGE >= APP.VARS.MAX_STORAGE) {

                    if(DEBUG) CORE.console.warn('WARNING: Max storage limit was reached!');
                    localStorage.clear();
                }

                return;
            }
            else{

                minimalFound = 0;
                //progress_mult++;
            }

            //APP.CONFIG.PROC ? APP.CONFIG.PROC++ : APP.CONFIG.PROC = 1;

            var max = 10 * 1024 * 1024,
                i = 64,
                string1024 = '',
                string = '',
                // generate a random key
                testKey = 'size-test-' + Math.random().toString();

            error || (error = 25e4);

            // fill a string with 1024 symbols / bytes
            while(i--) string1024 += 1e16;

            i = max / 1024;

            // fill a string with 'max' amount of symbols / bytes
            while(i--) string += string1024;

            i = max;

            // binary search implementation

            (function procLocalStorageMaxSize(localStorage, testKey, string, minimalFound, i, error){

                if(i > 1 && (minimalFound < i - error)) {

                    try {

                        localStorage.setItem(testKey, string.substr(0, i));
                        localStorage.removeItem(testKey);

                        if(minimalFound < i - error) {

                            minimalFound = i;
                            i = i * 1.5;
                        }
                        //else break;

                    } catch (e) {

                        localStorage.removeItem(testKey);
                        i = minimalFound + (i - minimalFound) / 2;
                    }

                    CORE.async(function(){

                        procLocalStorageMaxSize(localStorage, testKey, string, minimalFound, i, error);

                    }, 1);
                }

                else {

                    //APP.CONFIG.PROC--;
                    APP.VARS.MAX_STORAGE = minimalFound;
                    APP.SETTINGS.set('localStorageMaxSize', '' + minimalFound);
                    if(DEBUG) CORE.console.log("Determine LocalStorage Capacity: " + (((APP.VARS.MAX_STORAGE / 1024 / 1024 * 100) | 0) / 100) + ' Mb');
                }

                if(APP.VARS.USED_STORAGE >= APP.VARS.MAX_STORAGE) {

                    if(DEBUG) CORE.console.warn('WARNING: Max storage limit was reached!');
                    //localStorage.clear();
                }

            })(localStorage, testKey, string, minimalFound, i, error);
        }
    };

})();
