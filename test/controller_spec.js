describe("Test Controller Implementation", function(){

    APP.CONTROLLER.test1 = function(){};

    APP.ROUTE['#/test1'] = {

        to: 'test1',
        params: {foo: 'bar'}
    };

    APP.ROUTE['#/test2'] = {

        do: function(params){},
        params: 'foobar'
    };

    APP.ROUTE['#/test3'] = function(params){};

    APP.ROUTE['#/test4'] = {

        do: function(params){},
        action: 'foobar',
        params: 'foobar'
    };

    it("Test if controller was routed properly", function(){

        spyOn(Console, "warn");

        DEBUG = true;
        APP.CONTROLLER.request('');
        DEBUG = false;

        expect(Console.warn).toHaveBeenCalled();
    });

    it("Test if controller was routed properly", function(){

        APP.ROUTE['#/'] = {

            do: function(){}
        };

        spyOn(Console, "warn");
        spyOn(APP.ROUTE['#/'], "do");

        DEBUG = true;
        APP.CONTROLLER.request();
        DEBUG = false;

        expect(Console.warn).not.toHaveBeenCalled();
        expect(APP.ROUTE['#/'].do).toHaveBeenCalled();

        delete APP.ROUTE['#/'];
    });

    it("Test if controller was routed properly", function(){

        APP.ROUTE['#!/'] = {

            do: function(){}
        };

        spyOn(Console, "warn");
        spyOn(APP.ROUTE['#!/'], "do");

        DEBUG = true;
        APP.CONTROLLER.request();
        DEBUG = false;

        expect(Console.warn).not.toHaveBeenCalled();
        expect(APP.ROUTE['#!/'].do).toHaveBeenCalled();

        delete APP.ROUTE['#!/'];
    });

    it("Test if controller was routed properly", function(){

        spyOn(Console, "warn");

        DEBUG = true;
        APP.CONTROLLER.request('#/unknown');
        DEBUG = false;

        expect(Console.warn).toHaveBeenCalled();
    });

    it("Test if controller was routed properly", function(){

        var callback = {
            fn: function(){}
        };

        spyOn(callback, 'fn');

        APP.CONTROLLER.request('#/test1', null, callback.fn);

        expect(callback.fn).toHaveBeenCalled();
    });

    it("Test if controller was routed properly", function(){

        spyOn(APP.ROUTE['#/test1'], 'to');

        APP.CONTROLLER.request('#/test1');

        expect(APP.ROUTE['#/test1'].to).toHaveBeenCalled();
    });

    it("Test if controller was routed properly", function(){

        spyOn(APP.ROUTE['#/test2'], 'do');

        APP.CONTROLLER.request('#/test2');

        expect(APP.ROUTE['#/test2'].do).toHaveBeenCalled();
    });

    it("Test if controller was routed properly", function(){

        spyOn(APP.ROUTE, '#/test3');

        APP.CONTROLLER.request('#/test3');

        expect(APP.ROUTE['#/test3']).toHaveBeenCalled();
    });

    it("Test if controller was routed properly", function(){

        var callback = {
            fn: function(){}
        };

        spyOn(callback, 'fn');
        spyOn(APP.ROUTE, '#/test3');

        APP.CONTROLLER.request('#/test3', callback.fn);

        expect(APP.ROUTE['#/test3']).not.toHaveBeenCalled();
        expect(callback.fn).toHaveBeenCalled();
    });

    it("Test if controller was routed properly", function(){

        spyOn(APP.ROUTE['#/test4'], 'do');

        APP.CONTROLLER.request('#/test4');

        expect(APP.ROUTE['#/test4'].do).toHaveBeenCalled();
    });

    it("Test controller batch", function(){

        spyOn(APP.ROUTE['#/test1'], 'to');
        spyOn(APP.ROUTE['#/test2'], 'do');
        spyOn(APP.ROUTE, '#/test3');

        APP.CONTROLLER.request(['#/test1', '#/test2', '#/test3']);

        expect(APP.ROUTE['#/test1'].to).toHaveBeenCalled();
        expect(APP.ROUTE['#/test2'].do).toHaveBeenCalled();
        expect(APP.ROUTE['#/test3']).toHaveBeenCalled();
    });

    it("Test controller render", function(){

        var custom_data = (function(count){

            var data = new Array(count);

            for(var i = 0; i < count; i++){

                data[i] = {

                    id:"id",
                    title: 'title',
                    startDate: 'startDate',
                    endDate:"endDate",
                    createdAt:"createdAt",
                    updatedAt:"updatedAt",
                    commentsCounter:"commentsCounter",
                    likes:"likes",
                    reslotsCounter:"reslotsCounter",
                    creator:"creator",
                    location:"location",
                    media:"media",
                    notes:"notes",
                    settings:"settings",
                    slotter:"slotter",
                    visibility:"visibility"
                }
            }

            return data;

        })(5);

        APP.TEMPLATE = {

            "view/suite/test": [{data:["<div id=\"test_id1\"><div id=\"test_id2\"><div id=\"test_id3\"><span class=\"test_class3\">","","</span><span class=\"test_class1\">","","</span><span class=\"test_class2\">","","</span><span class=\"test_class3\">","","</span><span class=\"test_class2\">","","</span><span class=\"test_class2\">","","</span><span class=\"test_class1\">","","</span><span class=\"test_class3\">","","</span><span class=\"test_class1\">","","</span><span class=\"test_class2\">","","</span><span class=\"test_class2\">","","</span><span class=\"test_class3\">","","</span><span class=\"test_class2\">","","</span><span class=\"test_class3\">","","</span><span class=\"test_class1\">","","</span><span class=\"test_class2\">","","</span><div id=\"user\"></div></div></div></div> "],map:[0,"id",2,"title",4,"startDate",6,"endDate",8,"createdAt",10,"updatedAt",12,"commentsCounter",14,"likes",16,"reslotsCounter",18,"creator",20,"location",22,"media",24,"notes",26,"settings",28,"slotter",30,"visibility",32],if:false,else:false}]
        };

        var check_html = '<div id="test_id1"><div id="test_id2"><div id="test_id3"><span class="test_class3">id</span><span class="test_class1">title</span><span class="test_class2">startDate</span><span class="test_class3">endDate</span><span class="test_class2">createdAt</span><span class="test_class2">updatedAt</span><span class="test_class1">commentsCounter</span><span class="test_class3">likes</span><span class="test_class1">reslotsCounter</span><span class="test_class2">creator</span><span class="test_class2">location</span><span class="test_class3">media</span><span class="test_class2">notes</span><span class="test_class3">settings</span><span class="test_class1">slotter</span><span class="test_class2">visibility</span><div id="user"></div></div></div></div><div id="test_id1"><div id="test_id2"><div id="test_id3"><span class="test_class3">id</span><span class="test_class1">title</span><span class="test_class2">startDate</span><span class="test_class3">endDate</span><span class="test_class2">createdAt</span><span class="test_class2">updatedAt</span><span class="test_class1">commentsCounter</span><span class="test_class3">likes</span><span class="test_class1">reslotsCounter</span><span class="test_class2">creator</span><span class="test_class2">location</span><span class="test_class3">media</span><span class="test_class2">notes</span><span class="test_class3">settings</span><span class="test_class1">slotter</span><span class="test_class2">visibility</span><div id="user"></div></div></div></div><div id="test_id1"><div id="test_id2"><div id="test_id3"><span class="test_class3">id</span><span class="test_class1">title</span><span class="test_class2">startDate</span><span class="test_class3">endDate</span><span class="test_class2">createdAt</span><span class="test_class2">updatedAt</span><span class="test_class1">commentsCounter</span><span class="test_class3">likes</span><span class="test_class1">reslotsCounter</span><span class="test_class2">creator</span><span class="test_class2">location</span><span class="test_class3">media</span><span class="test_class2">notes</span><span class="test_class3">settings</span><span class="test_class1">slotter</span><span class="test_class2">visibility</span><div id="user"></div></div></div></div><div id="test_id1"><div id="test_id2"><div id="test_id3"><span class="test_class3">id</span><span class="test_class1">title</span><span class="test_class2">startDate</span><span class="test_class3">endDate</span><span class="test_class2">createdAt</span><span class="test_class2">updatedAt</span><span class="test_class1">commentsCounter</span><span class="test_class3">likes</span><span class="test_class1">reslotsCounter</span><span class="test_class2">creator</span><span class="test_class2">location</span><span class="test_class3">media</span><span class="test_class2">notes</span><span class="test_class3">settings</span><span class="test_class1">slotter</span><span class="test_class2">visibility</span><div id="user"></div></div></div></div><div id="test_id1"><div id="test_id2"><div id="test_id3"><span class="test_class3">id</span><span class="test_class1">title</span><span class="test_class2">startDate</span><span class="test_class3">endDate</span><span class="test_class2">createdAt</span><span class="test_class2">updatedAt</span><span class="test_class1">commentsCounter</span><span class="test_class3">likes</span><span class="test_class1">reslotsCounter</span><span class="test_class2">creator</span><span class="test_class2">location</span><span class="test_class3">media</span><span class="test_class2">notes</span><span class="test_class3">settings</span><span class="test_class1">slotter</span><span class="test_class2">visibility</span><div id="user"></div></div></div></div>';

        expect(APP.CONTROLLER.build("view/suite/test", custom_data).replace(/> /g, '>')).toBe(check_html);

        var node = document.createElement('div');

        APP.CONTROLLER.render({
            template: "view/suite/test",
            target: node,
            data: custom_data
        });

        expect(node.innerHTML.replace(/> /g, '>')).toBe('<vdom>' + check_html + '</vdom>');

        node.innerHTML = '';

        var html_arr = [{
            "tag": "div",
            "attr": {
                "id": "test_id1"
            },
            "child": [{
                "tag": "div",
                "attr": {
                    "id": "test_id2"
                },
                "child": [{
                    "tag": "div",
                    "attr": {
                        "id": "test_id3"
                    },
                    "child": [{
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class3"
                            ]
                        },
                        "text": "id"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class1"
                            ]
                        },
                        "text": "title"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class2"
                            ]
                        },
                        "text": "startDate"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class3"
                            ]
                        },
                        "text": "endDate"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class2"
                            ]
                        },
                        "text": "createdAt"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class2"
                            ]
                        },
                        "text": "updatedAt"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class1"
                            ]
                        },
                        "text": "commentsCounter"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class3"
                            ]
                        },
                        "text": "likes"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class1"
                            ]
                        },
                        "text": "reslotsCounter"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class2"
                            ]
                        },
                        "text": "creator"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class2"
                            ]
                        },
                        "text": "location"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class3"
                            ]
                        },
                        "text": "media"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class2"
                            ]
                        },
                        "text": "notes"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class3"
                            ]
                        },
                        "text": "settings"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class1"
                            ]
                        },
                        "text": "slotter"
                    }, {
                        "tag": "span",
                        "attr": {
                            "className": [
                                "test_class2"
                            ]
                        },
                        "text": "visibility"
                    }, {
                        "tag": "div",
                        "attr": {
                            "id": "user"
                        }
                    }]
                }]
            }]
        }];

        html_arr.push(html_arr[0]);
        html_arr.push(html_arr[0]);
        html_arr.push(html_arr[0]);
        html_arr.push(html_arr[0]);

        APP.CONTROLLER.render(node, html_arr);

        expect(node.innerHTML.replace(/> /g, '>')).toBe(check_html);
    });

});
