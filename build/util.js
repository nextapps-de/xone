goog.provide("DIST.UTIL");
goog.require('Util.Cache');
goog.require('Util.Ajax');
goog.require('Util.Search');

(function(){

    /** @export @dict */

    window.Util = {

        "Cache": {
            "new": Util.Cache.new,
            "create": Util.Cache.create,
            "register": Util.Cache.register,
            "caches": Util.Cache.caches
        },
        "Ajax": Util.Ajax,
        "Search": Util.Search
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

    })(Util, 'Util'));
    */

})();
