goog.provide("DIST.APP");

(function(){

    /** @export @dict */

    window.APP = {

        "MODEL": APP.MODEL,
        "VIEW": APP.VIEW,
        "CONTROLLER": {
            "build": APP.CONTROLLER.build,
            "render": APP.CONTROLLER.render,
            "changeLanguage": APP.CONTROLLER.changeLanguage
        },
        "ROUTE": APP.ROUTE,
        "PAYLOAD": APP.PAYLOAD,
        "EVENT": APP.EVENT,
        "HANDLER": APP.HANDLER,
        "HELPER": APP.HELPER,
        "STORAGE": {
            // "DATA": APP.STORAGE.DATA,
            // "CACHE": APP.STORAGE.CACHE,
            // "SESSION": APP.STORAGE.SESSION,
            // "VIEW": APP.STORAGE.VIEW,
            "compress": APP.STORAGE.compress,
            "decompress": APP.STORAGE.decompress
        },
        "MAPPER": APP.MAPPER,
        "LAYOUT": {
            // "update_menu_state": APP.LAYOUT.update_menu_state,
            // "lastAction": APP.LAYOUT.lastAction,
            // "add_preloader": APP.LAYOUT.add_preloader,
            // "remove_preloader": APP.LAYOUT.remove_preloader,
            // "toggle_view": APP.LAYOUT.toggle_view,
            // "show_popup": APP.LAYOUT.show_popup,
            // "hide_popup": APP.LAYOUT.hide_popup,
            // "slide_popup": APP.LAYOUT.slide_popup,
            // "slideout_popup": APP.LAYOUT.slideout_popup,
            // "toggle_popup": APP.LAYOUT.toggle_popup,
            // "toggleout_popup": APP.LAYOUT.toggleout_popup,
            // "show_message": APP.LAYOUT.show_message,
            // "hide_message": APP.LAYOUT.hide_message,
            // "show_confirmation": APP.LAYOUT.show_confirmation,
            // "hide_confirmation": APP.LAYOUT.hide_confirmation,
            // "handleCache": APP.LAYOUT.handleCache,
            // "addSwipe": APP.LAYOUT.addSwipe,
            // "initPullToRefresh": APP.LAYOUT.initPullToRefresh,
            // "lockOrientation": APP.LAYOUT.lockOrientation
        },
        "WORKER": {
            "register": APP.WORKER.register
            //"test": APP.WORKER.test
        },
        "DEVICE": APP.DEVICE,
        "LANG": APP.LANG /*{
            "de": APP.LANG.de,
            "en": APP.LANG.en
        }*/,
        "CONFIG": {
            "LANG": APP.CONFIG.LANG,
            "PROC": APP.CONFIG.PROC,
            "GZIP": APP.CONFIG.GZIP,
            "PASSIVE_EVENTS": APP.CONFIG.PASSIVE_EVENTS,
            "EVENT_OPTIONS": APP.CONFIG.EVENT_OPTIONS,
            "SHOW_DEBUG": APP.CONFIG.SHOW_DEBUG,
            "SHOW_GRAPH": APP.CONFIG.SHOW_GRAPH,
            "SHOW_STATS": APP.CONFIG.SHOW_STATS
        },
        "VARS": {
            "CURRENT_USER": APP.VARS.CURRENT_USER,
            "HEADER": APP.VARS.HEADER,
            "AUTH": APP.VARS.AUTH,
            "ZOOM": APP.VARS.ZOOM,
            "WIDTH": APP.VARS.WIDTH,
            "HEIGHT": APP.VARS.HEIGHT,
            "DPR": APP.VARS.DPR
        },
        "STATS": APP.STATS,
        "SETTINGS": APP.SETTINGS,
        "CACHE": APP.CACHE,
        "CRC32": APP.CRC32,
        "PLUGIN": APP.PLUGIN,
        "INTERFACE": APP.INTERFACE,
        "ADAPTER": APP.ADAPTER,
        "SERVICE": APP.SERVICE,
        "REQUIRE": APP.REQUIRE,
        "CHANGELOG": APP.CHANGELOG,
        "MIGRATE": APP.MIGRATE
    };

    /*
    console.log((function parseObject(obj, name){

        var tmp = '';

        for(var key in obj){

            if(obj.hasOwnProperty(key)){

                if(obj[key] && obj[key].constructor === Object){

                    tmp += '"' + key + '": {\n' + parseObject(obj[key], name + '.' + key) + "\n},\n";
                }

                else{

                    tmp += '"' + key + '": ' + name + '.' + key + ",\n";
                }
            }
        }

        return tmp;

    })(APP, 'APP'));
    */

})();
