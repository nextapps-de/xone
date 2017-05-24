describe("Check Core Initialize Status", function() {

    it("Check if core ist loaded", function() {

        expect(CORE).toBeDefined();
        expect(CONFIG).toBeDefined();
        expect(APP).toBeDefined();
    });

    it("Check if framework contains all required functions", function() {

        expect(APP.EVENT).toBeDefined();
        expect(APP.MAPPER).toBeDefined();
        expect(APP.MODEL).toBeDefined();
        expect(APP.ROUTE).toBeDefined();
        expect(APP.CONTROLLER).toBeDefined();
        expect(APP.LAYOUT).toBeDefined();
        expect(APP.CONFIG).toBeDefined();
        expect(APP.CRC32).toBeDefined();
        expect(APP.DEVICE).toBeDefined();
        expect(APP.HANDLER).toBeDefined();
        expect(APP.HELPER).toBeDefined();
        expect(APP.HTML).toBeDefined();
        expect(APP.STORAGE).toBeDefined();
        expect(APP.VARS).toBeDefined();
        expect(APP.VIEW).toBeDefined();
        expect(APP.LANG).toBeDefined();
        expect(APP.PAYLOAD).toBeDefined();
        expect(APP.PLUGIN).toBeDefined();
        expect(APP.WORKER).toBeDefined();

        //expect(APP.INIT).toBeDefined();
        expect(APP.MAIN).toBeDefined();
        expect(APP.SETUP).toBeDefined();
    });

    it("Check if core contains all required functions", function() {

        expect(CORE.getById).toBeDefined();
        expect(CORE.getValue).toBeDefined();
        expect(CORE.setValue).toBeDefined();
        expect(CORE.preventEvent).toBeDefined();
        expect(CORE.addClass).toBeDefined();
        expect(CORE.removeClass).toBeDefined();
        expect(CORE.toggleClass).toBeDefined();
        expect(CORE.hasClass).toBeDefined();
        expect(CORE.setStyle).toBeDefined();
        expect(CORE.getStyle).toBeDefined();
        expect(CORE.parseNode).toBeDefined();
        expect(CORE.buildPattern).toBeDefined();
        expect(CORE.setTextContent).toBeDefined();
        expect(CORE.ajax).toBeDefined();
        expect(CORE.console).toBeDefined();
    });

    it("Check CORE.getById()", function() {

        expect(CORE.getById('test_wrapper'))
            .toBe(document.getElementById('test_wrapper'));

        // Check Cache
        expect(CORE.getById('test_wrapper'))
            .toBe(document.getElementById('test_wrapper'));
    });

    it("Check CORE.getByClass()", function() {

        expect(CORE.getByClass('scroll-to-top')[0])
            .toBe(document.getElementsByClassName('test_wrapper')[0]);

        expect(CORE.getByClass('scroll-to-top', CORE.getById('view-discover'))[0])
            .toBe(document.getElementsByClassName('test_wrapper', document.getElementById('view-discover'))[0]);
    });

    it("Check CORE.setValue()", function() {

        CORE.setValue('#test_wrapper', 'test');
        expect(CORE.getById('test_wrapper').value)
            .toBe("test");
    });

    it("Check CORE.getValue()", function() {

        CORE.getById('test_wrapper').value = 'test';
        expect(CORE.getValue('#test_wrapper'))
            .toBe("test");
    });

    it("Check CORE.getStyle()", function() {

        document.getElementById('test_wrapper').style.width = "638px";
        expect(CORE.getStyle('#test_wrapper', 'width'))
            .toBe("638px");
    });

    it("Check CORE.getStyle()", function() {

        expect(CORE.getStyle('#test_wrapper'))
            .toBe(document.getElementById('test_wrapper').style);
    });

    it("Check CORE.setStyle()", function() {

        CORE.setStyle('#test_wrapper', 'width', 'auto');
        expect(CORE.getStyle('#test_wrapper', 'width'))
            .toBe('auto');
    });

    it("Check CORE.addClass() and CORE.hasClass()", function() {

        CORE.addClass('#test_wrapper', 'test');
        expect(CORE.hasClass('#test_wrapper', 'test'))
            .toBe(true);
    });

    it("Check CORE.removeClass()", function() {

        CORE.removeClass('#test_wrapper', 'test');
        expect(CORE.hasClass('#test_wrapper', 'test'))
            .toBe(false);
    });

    it("Check CORE.toggleClass()", function() {

        CORE.toggleClass('#test_wrapper', 'test');
        expect(CORE.hasClass('#test_wrapper', 'test'))
            .toBe(true);
    });

    it("Check CORE.parseNode()", function() {

        var node = CORE.parseNode({
            tag: "div",
            attr: {
                class: "test",
                id: "test"
            }
        });

        expect(CORE.hasClass(node, 'test')).toBe(true);
        expect(node.id).toBe("test");
    });

    it("Check CORE.buildPattern()", function() {

        var node = CORE.buildPattern([{

            tag: "div",
            attr: {
                class: "test",
                id: "test"
            },
            child: [{
                tag: "div",
                attr: {
                    class: "test_child",
                    id: "test_child",
                    style: 'display: none;',
                    'data-id': 'id_1'
                }
            }]

        }], document.createElement("div"));

        node = node.firstChild;
        expect(CORE.hasClass(node, 'test')).toBe(true);
        expect(node.id).toBe("test");

        node = node.firstChild;
        expect(CORE.hasClass(node, 'test_child')).toBe(true);
        expect(CORE.getStyle(node, 'display')).toBe('none');
        expect(node.id).toBe("test_child");
        expect(node.dataset.id).toBe('id_1');
    });

    it("Check CORE.setTextContent()", function() {

        CORE.setTextContent('#test_layer', 'test');
        expect(CORE.getById('test_layer').textContent)
            .toBe("test");
    });

    //it("Check CORE.setMouseTouchEvent()", function() {
    //
    //    CORE.setMouseTouchEvent('search-input-field', function(){}, true);
    //    expect(CORE.getById('search-input-field').onmousedown)
    //        .toBe(CORE.getById('search-input-field').ontouchstart);
    //});

    /* Xone Tests */

    it("Check CORE.setStyle() + CORE.getStyle()", function() {

        /* Init Test */

        CORE.getById('test_layer').style.width = "100px";
        CORE.getById('test_layer')._style = {};
        CORE.getById('test_layer')._style_new = {};
        CORE.getById('test_layer')._style_keys = [];

        /* Test Initial Style */

        CORE.setStyle('#test_layer', 'width', '638px');

        expect(CORE.getStyle('#test_layer', 'width'))
            .toBe("638px");
        expect(CORE.getById('test_layer').style.width)
            .toBe("100px");
        expect(CORE.getById('test_layer')._style.width)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._style_new.width)
            .toBe('638px');
        expect(CORE.getById('test_layer')._style_keys)
            .toContain('width');

        /* Test Additional Style */

        CORE.setStyle('#test_layer', 'width', '620px');

        expect(CORE.getStyle('#test_layer', 'width'))
            .toBe("620px");
        expect(CORE.getById('test_layer').style.width)
            .toBe("100px");
        expect(CORE.getById('test_layer')._style.width)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._style_new.width)
            .toBe('620px');
        expect(CORE.getById('test_layer')._style_keys)
            .toContain('width');

        /* Test No-Changes Style */

        CORE.setStyle('#test_layer', 'width', '100px');

        expect(CORE.getStyle('#test_layer', 'width'))
            .toBe("100px");
        expect(CORE.getById('test_layer').style.width)
            .toBe("100px");
        expect(CORE.getById('test_layer')._style.width)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._style_new.width)
            .toBe('100px');
    });

    it("Async Check CORE.setStyle() + CORE.getStyle()", function(done) {

        /* Init Test */

        CORE.getById('test_layer').style.width = "100px";
        CORE.getById('test_layer')._style = {};
        CORE.getById('test_layer')._style_new = {};
        CORE.getById('test_layer')._style_keys = [];

        CORE.paint(function(){

            CORE.setStyle('#test_layer', 'width', '100px');

            CORE.paint(function(){

                /* Test Initial Style */

                CORE.setStyle('#test_layer', 'width', '638px');

                expect(CORE.getStyle('#test_layer', 'width'))
                    .toBe("638px");
                expect(CORE.getById('test_layer').style.width)
                    .toBe("100px");
                expect(CORE.getById('test_layer')._style.width)
                    .toBe('100px');
                expect(CORE.getById('test_layer')._style_new.width)
                    .toBe('638px');
                expect(CORE.getById('test_layer')._style_keys.length)
                    .toBe(1);
                expect(CORE.getById('test_layer')._style_keys)
                    .toContain('width');

                /* Test Additional Style */

                CORE.setStyle('#test_layer', 'width', '620px');

                expect(CORE.getStyle('#test_layer', 'width'))
                    .toBe("620px");
                expect(CORE.getById('test_layer').style.width)
                    .toBe("100px");
                expect(CORE.getById('test_layer')._style.width)
                    .toBe('100px');
                expect(CORE.getById('test_layer')._style_new.width)
                    .toBe('620px');
                expect(CORE.getById('test_layer')._style_keys.length)
                    .toBe(1);
                expect(CORE.getById('test_layer')._style_keys)
                    .toContain('width');

                /* Test No-Changes Style */

                CORE.setStyle('#test_layer', 'width', '100px');

                expect(CORE.getStyle('#test_layer', 'width'))
                    .toBe("100px");
                expect(CORE.getById('test_layer').style.width)
                    .toBe("100px");
                expect(CORE.getById('test_layer')._style.width)
                    .toBe('100px');
                expect(CORE.getById('test_layer')._style_new.width)
                    .toBe(false);
                expect(CORE.getById('test_layer')._style_keys.length)
                    .toBe(1);
                expect(CORE.getById('test_layer')._style_keys)
                    .toContain('width');

                done();
            });
        });
    });

    it("Check CORE.setHTML() + CORE.getHTML()", function() {

        /* Init Test */

        CORE.getById('test_layer').innerHTML = 'Foo';
        CORE.getById('test_layer')._html = void 0;
        CORE.getById('test_layer')._html_new = void 0;

        /* Test Initial Style */

        CORE.setHTML('#test_layer', 'Bar', true);

        expect(CORE.getHTML('#test_layer'))
            .toBe("Bar");
        expect(CORE.getById('test_layer').innerHTML)
            .toBe("Foo");
        expect(CORE.getById('test_layer')._html)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._html_new)
            .toBe('Bar');

        /* Test Additional Style */

        CORE.setHTML('#test_layer', 'Foobar', true);

        expect(CORE.getHTML('#test_layer'))
            .toBe("Foobar");
        expect(CORE.getById('test_layer').innerHTML)
            .toBe("Foo");
        expect(CORE.getById('test_layer')._html)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._html_new)
            .toBe('Foobar');

        /* Test No-Changes Style */

        CORE.setHTML('#test_layer', 'Foo', true);

        expect(CORE.getHTML('#test_layer'))
            .toBe("Foo");
        expect(CORE.getById('test_layer').innerHTML)
            .toBe("Foo");
        expect(CORE.getById('test_layer')._html)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._html_new)
            .toBe('Foo');
    });

    it("Async Check CORE.setHTML() + CORE.getHTML()", function(done) {

        /* Init Test */

        CORE.getById('test_layer').innerHTML = 'Foo';
        CORE.getById('test_layer')._html = void 0;
        CORE.getById('test_layer')._html_new = void 0;

        CORE.paint(function(){

            CORE.setHTML('#test_layer', 'Foo', true);

            CORE.paint(function(){

                /* Test Initial Style */

                CORE.setHTML('#test_layer', 'Bar', true);

                expect(CORE.getHTML('#test_layer'))
                    .toBe("Bar");
                expect(CORE.getById('test_layer').innerHTML)
                    .toBe("Foo");
                expect(CORE.getById('test_layer')._html)
                    .toBe('Foo');
                expect(CORE.getById('test_layer')._html_new)
                    .toBe('Bar');

                /* Test Additional Style */

                CORE.setHTML('#test_layer', 'Foobar', true);

                expect(CORE.getHTML('#test_layer'))
                    .toBe("Foobar");
                expect(CORE.getById('test_layer').innerHTML)
                    .toBe("Foo");
                expect(CORE.getById('test_layer')._html)
                    .toBe('Foo');
                expect(CORE.getById('test_layer')._html_new)
                    .toBe('Foobar');

                /* Test No-Changes Style */

                CORE.setHTML('#test_layer', 'Foo', true);

                expect(CORE.getHTML('#test_layer'))
                    .toBe("Foo");
                expect(CORE.getById('test_layer').innerHTML)
                    .toBe("Foo");
                expect(CORE.getById('test_layer')._html)
                    .toBe('Foo');
                expect(CORE.getById('test_layer')._html_new)
                    .toBe(false);

                done();
            });
        });
    });

    it("Check CORE.addClass() + CORE.removeClass() + CORE.toggleClass() + CORE.hasClass()", function() {

        /* Init Test */

        CORE.getById('test_layer').className = 'foo';
        delete CORE.getById('test_layer')._class;
        delete CORE.getById('test_layer')._class_new;
        delete CORE.getById('test_layer')._class_keys;

        /* Test Initial Style */

        CORE.addClass('#test_layer', 'bar');

        expect(CORE.hasClass('#test_layer', 'foo'))
            .toBe(true);
        expect(CORE.hasClass('#test_layer', 'bar'))
            .toBe(true);
        expect(CORE.getById('test_layer').className)
            .toBe('foo');
        expect(CORE.getById('test_layer')._class.foo)
            .toBe(1);
        expect(CORE.getById('test_layer')._class.bar)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._class_new.foo)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._class_new.bar)
            .toBe(1);
        expect(CORE.getById('test_layer')._class_keys.length)
            .toBe(1);
        expect(CORE.getById('test_layer')._class_keys)
            .toContain('bar');

        /* Test Additional Style */

        CORE.addClass('#test_layer', 'foobar');

        expect(CORE.hasClass('#test_layer', 'foo'))
            .toBe(true);
        expect(CORE.hasClass('#test_layer', 'bar'))
            .toBe(true);
        expect(CORE.hasClass('#test_layer', 'foobar'))
            .toBe(true);
        expect(CORE.getById('test_layer').className)
            .toBe('foo');
        expect(CORE.getById('test_layer')._class.foo)
            .toBe(1);
        expect(CORE.getById('test_layer')._class.bar)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._class.foobar)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._class_new.foo)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._class_new.bar)
            .toBe(1);
        expect(CORE.getById('test_layer')._class_new.foobar)
            .toBe(1);
        expect(CORE.getById('test_layer')._class_keys.length)
            .toBe(2);
        expect(CORE.getById('test_layer')._class_keys)
            .toContain('foobar');

        /* Test No-Changes Style */

        CORE.addClass('#test_layer', 'foo');

        expect(CORE.hasClass('#test_layer', 'foo'))
            .toBe(true);
        expect(CORE.hasClass('#test_layer', 'bar'))
            .toBe(true);
        expect(CORE.hasClass('#test_layer', 'foobar'))
            .toBe(true);
        expect(CORE.getById('test_layer').className)
            .toBe('foo');
        expect(CORE.getById('test_layer')._class.foo)
            .toBe(1);
        expect(CORE.getById('test_layer')._class.bar)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._class.foobar)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._class_new.foo)
            .toBe(false);
        expect(CORE.getById('test_layer')._class_new.bar)
            .toBe(1);
        expect(CORE.getById('test_layer')._class_new.foobar)
            .toBe(1);
        expect(CORE.getById('test_layer')._class_keys.length)
            .toBe(2);
        expect(CORE.getById('test_layer')._class_keys)
            .toContain('foobar');

        /* Test No-Changes Style */

        CORE.removeClass('#test_layer', 'bar');
        CORE.toggleClass('#test_layer', 'foobar');

        expect(CORE.hasClass('#test_layer', 'foo'))
            .toBe(true);
        expect(CORE.hasClass('#test_layer', 'bar'))
            .toBe(false);
        expect(CORE.hasClass('#test_layer', 'foobar'))
            .toBe(false);
        expect(CORE.getById('test_layer').className)
            .toBe('foo');
        expect(CORE.getById('test_layer')._class.foo)
            .toBe(1);
        expect(CORE.getById('test_layer')._class.bar)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._class.foobar)
            .toBe(undefined);
        expect(CORE.getById('test_layer')._class_new.foo)
            .toBe(false);
        expect(CORE.getById('test_layer')._class_new.bar)
            .toBe(0);
        expect(CORE.getById('test_layer')._class_new.foobar)
            .toBe(0);
        expect(CORE.getById('test_layer')._class_keys.length)
            .toBe(2);
        expect(CORE.getById('test_layer')._class_keys)
            .toContain('bar');
        expect(CORE.getById('test_layer')._class_keys)
            .toContain('foobar');
    });

    it("Async Check CORE.addClass() + CORE.removeClass() + CORE.toggleClass() + CORE.hasClass()", function(done) {

        /* Init Test */

        CORE.getById('test_layer').className = 'foo';
        CORE.getById('test_layer')._class = {};
        CORE.getById('test_layer')._class_new = {};
        CORE.getById('test_layer')._class_keys = [];

        CORE.paint(function(){

            CORE.addClass('#test_layer', 'foo');

            CORE.paint(function(){

                /* Test Initial Style */

                CORE.addClass('#test_layer', 'bar');

                expect(CORE.hasClass('#test_layer', 'foo'))
                    .toBe(true);
                expect(CORE.hasClass('#test_layer', 'bar'))
                    .toBe(true);
                expect(CORE.getById('test_layer').className)
                    .toBe('foo');
                expect(CORE.getById('test_layer')._class.foo)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class.bar)
                    .toBe(undefined);
                expect(CORE.getById('test_layer')._class_new.foo)
                    .toBe(false);
                expect(CORE.getById('test_layer')._class_new.bar)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class_keys.length)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class_keys)
                    .toContain('bar');

                /* Test Additional Style */

                CORE.addClass('#test_layer', 'foobar');

                expect(CORE.hasClass('#test_layer', 'foo'))
                    .toBe(true);
                expect(CORE.hasClass('#test_layer', 'bar'))
                    .toBe(true);
                expect(CORE.hasClass('#test_layer', 'foobar'))
                    .toBe(true);
                expect(CORE.getById('test_layer').className)
                    .toBe('foo');
                expect(CORE.getById('test_layer')._class.foo)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class.bar)
                    .toBe(undefined);
                expect(CORE.getById('test_layer')._class.foobar)
                    .toBe(undefined);
                expect(CORE.getById('test_layer')._class_new.foo)
                    .toBe(false);
                expect(CORE.getById('test_layer')._class_new.bar)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class_new.foobar)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class_keys.length)
                    .toBe(2);
                expect(CORE.getById('test_layer')._class_keys)
                    .toContain('foobar');

                /* Test No-Changes Style */

                CORE.addClass('#test_layer', 'foo');

                expect(CORE.hasClass('#test_layer', 'foo'))
                    .toBe(true);
                expect(CORE.hasClass('#test_layer', 'bar'))
                    .toBe(true);
                expect(CORE.hasClass('#test_layer', 'foobar'))
                    .toBe(true);
                expect(CORE.getById('test_layer').className)
                    .toBe('foo');
                expect(CORE.getById('test_layer')._class.foo)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class.bar)
                    .toBe(undefined);
                expect(CORE.getById('test_layer')._class.foobar)
                    .toBe(undefined);
                expect(CORE.getById('test_layer')._class_new.foo)
                    .toBe(false);
                expect(CORE.getById('test_layer')._class_new.bar)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class_new.foobar)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class_keys.length)
                    .toBe(2);
                expect(CORE.getById('test_layer')._class_keys)
                    .toContain('foobar');

                /* Test No-Changes Style */

                CORE.removeClass('#test_layer', 'bar');
                CORE.toggleClass('#test_layer', 'foobar');

                expect(CORE.hasClass('#test_layer', 'foo'))
                    .toBe(true);
                expect(CORE.hasClass('#test_layer', 'bar'))
                    .toBe(false);
                expect(CORE.hasClass('#test_layer', 'foobar'))
                    .toBe(false);
                expect(CORE.getById('test_layer').className)
                    .toBe('foo');
                expect(CORE.getById('test_layer')._class.foo)
                    .toBe(1);
                expect(CORE.getById('test_layer')._class.bar)
                    .toBe(undefined);
                expect(CORE.getById('test_layer')._class.foobar)
                    .toBe(undefined);
                expect(CORE.getById('test_layer')._class_new.foo)
                    .toBe(false);
                expect(CORE.getById('test_layer')._class_new.bar)
                    .toBe(0);
                expect(CORE.getById('test_layer')._class_new.foobar)
                    .toBe(0);
                expect(CORE.getById('test_layer')._class_keys.length)
                    .toBe(2);
                expect(CORE.getById('test_layer')._class_keys)
                    .toContain('bar');
                expect(CORE.getById('test_layer')._class_keys)
                    .toContain('foobar');

                done();
            });
        });
    });


    it("Mixed Paint + Style + Class", function(done) {

        /* Inline Styles */

        expect(CORE.getById('test_wrapper').style.top)
            .toBe('100px');
        expect(CORE.getById('test_wrapper').style.position)
            .toBe('');
        expect(CORE.getById('test_wrapper').style.height)
            .toBe('');

        /* Computed Styles */

        expect(window.getComputedStyle(CORE.getById('test_wrapper'), null).getPropertyValue('top'))
            .toBe('100px');
        expect(window.getComputedStyle(CORE.getById('test_wrapper'), null).getPropertyValue('position'))
            .toBe('absolute');
        expect(window.getComputedStyle(CORE.getById('test_wrapper'), null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getById('test_wrapper').clientHeight + 'px');

        /* Helper Methods */

        expect(CORE.getStyle('#test_wrapper', 'top'))
            .toBe('100px');
        expect(CORE.getStyle('#test_wrapper', 'position'))
            .toBe('absolute');
        expect(CORE.getStyle('#test_wrapper', 'height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getById('test_wrapper').clientHeight + 'px');

        // -------------------------------------------------------------------------

        expect(CORE.getById('test_content').style.top)
            .toBe('200px');
        expect(CORE.getById('test_content').style.position)
            .toBe('relative');
        expect(CORE.getById('test_content').style.height)
            .toBe('auto');

        /* Computed Styles */

        expect(window.getComputedStyle(CORE.getById('test_content'), null).getPropertyValue('top'))
            .toBe('200px');
        expect(window.getComputedStyle(CORE.getById('test_content'), null).getPropertyValue('position'))
            .toBe('relative');
        expect(window.getComputedStyle(CORE.getById('test_content'), null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getById('test_content').clientHeight + 'px');

        /* Helper Methods */

        expect(CORE.getStyle('#test_content', 'top'))
            .toBe('200px');
        expect(CORE.getStyle('#test_content', 'position'))
            .toBe('relative');
        expect(CORE.getStyle('#test_content', 'height'))
            // TODO:
            // NOTE: Cascade Style NOT Converted To Computed Style
            .toBe('auto');

        // -------------------------------------------------------------------------

        expect(CORE.getByTag('ul', 'test_content')[0].style.top)
            .toBe('300px');
        expect(CORE.getByTag('ul', 'test_content')[0].style.position)
            .toBe('');
        expect(CORE.getByTag('ul', 'test_content')[0].style.height)
            .toBe('100%');
        expect(CORE.getByTag('ul', 'test_content')[1].style.top)
            .toBe('');
        expect(CORE.getByTag('ul', 'test_content')[1].style.position)
            .toBe('');
        expect(CORE.getByTag('ul', 'test_content')[1].style.height)
            .toBe('');

        /* Computed Styles */

        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[0], null).getPropertyValue('top'))
            .toBe('300px');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[0], null).getPropertyValue('position'))
            .toBe('relative');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[0], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('ul', 'test_content')[0].clientHeight + 'px');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[1], null).getPropertyValue('top'))
            .toBe('5px');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[1], null).getPropertyValue('position'))
            .toBe('relative');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[1], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('ul', 'test_content')[1].clientHeight + 'px');

        /* Helper Methods */

        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[0], 'top'))
            .toBe('300px');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[0], 'position'))
            .toBe('relative');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[0], 'height'))
            // TODO:
            // NOTE: Cascade Style NOT Converted To Computed Style
            .toBe('100%');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[1], 'top'))
            .toBe('5px');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[1], 'position'))
            .toBe('relative');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[1], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('ul', 'test_content')[1].clientHeight + 'px');

        // -------------------------------------------------------------------------

        expect(CORE.getByTag('li', 'test_content')[0].style.top)
            .toBe('400px');
        expect(CORE.getByTag('li', 'test_content')[0].style.position)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[0].style.height)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[1].style.top)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[1].style.position)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[1].style.height)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[2].style.top)
            .toBe('444px');
        expect(CORE.getByTag('li', 'test_content')[2].style.position)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[2].style.height)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[3].style.top)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[3].style.position)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[3].style.height)
            .toBe('');

        /* Computed Styles */

        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[0], null).getPropertyValue('top'))
            .toBe('400px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[0], null).getPropertyValue('position'))
            .toBe('relative');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[0], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[0].clientHeight + 'px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[1], null).getPropertyValue('top'))
            .toBe('6px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[1], null).getPropertyValue('position'))
            .toBe('relative');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[1], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[1].clientHeight + 'px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[2], null).getPropertyValue('top'))
            .toBe('444px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[2], null).getPropertyValue('position'))
            .toBe('relative');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[2], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[2].clientHeight + 'px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[3], null).getPropertyValue('top'))
            .toBe('6px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[3], null).getPropertyValue('position'))
            .toBe('relative');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[3], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[3].clientHeight + 'px');

        /* Helper Methods */

        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[0], 'top'))
            .toBe('400px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[0], 'position'))
            .toBe('relative');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[0], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[0].clientHeight + 'px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[1], 'top'))
            .toBe('6px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[1], 'position'))
            .toBe('relative');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[1], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[1].clientHeight + 'px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[2], 'top'))
            .toBe('444px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[2], 'position'))
            .toBe('relative');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[2], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[2].clientHeight + 'px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[3], 'top'))
            .toBe('6px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[3], 'position'))
            .toBe('relative');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[3], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[3].clientHeight + 'px');

        // ############################################################################
        // ############################################################################

        CORE.getById('test_wrapper')._style = {};
        CORE.getById('test_wrapper')._style_new = {};
        CORE.getById('test_wrapper')._style_keys = [];
        CORE.getById('test_layer')._style = {};
        CORE.getById('test_layer')._style_new = {};
        CORE.getById('test_layer')._style_keys = [];

        CORE.getByTag('ul', 'test_content')[0]._style = {};
        CORE.getByTag('ul', 'test_content')[0]._style_new = {};
        CORE.getByTag('ul', 'test_content')[0]._style_keys = [];
        CORE.getByTag('ul', 'test_content')[1]._style = {};
        CORE.getByTag('ul', 'test_content')[1]._style_new = {};
        CORE.getByTag('ul', 'test_content')[1]._style_keys = [];

        CORE.getByTag('li', 'test_content')[0]._style = {};
        CORE.getByTag('li', 'test_content')[0]._style_new = {};
        CORE.getByTag('li', 'test_content')[0]._style_keys = [];
        CORE.getByTag('li', 'test_content')[1]._style = {};
        CORE.getByTag('li', 'test_content')[1]._style_new = {};
        CORE.getByTag('li', 'test_content')[1]._style_keys = [];
        CORE.getByTag('li', 'test_content')[2]._style = {};
        CORE.getByTag('li', 'test_content')[2]._style_new = {};
        CORE.getByTag('li', 'test_content')[2]._style_keys = [];
        CORE.getByTag('li', 'test_content')[3]._style = {};
        CORE.getByTag('li', 'test_content')[3]._style_new = {};
        CORE.getByTag('li', 'test_content')[3]._style_keys = [];

        CORE.getById('test_wrapper').style.top = '101px';
        CORE.getById('test_content').style.height = '111px';
        CORE.getByTag('li', 'test_content')[2].style.top = '555px';
        CORE.getByTag('li', 'test_content')[3].style.top = '9px';
        CORE.getById('test_wrapper').classList.add('active');
        CORE.getById('test_content').classList.add('active');

        /* Inline Styles */

        expect(CORE.getById('test_wrapper').style.top)
            .toBe('101px');
        expect(CORE.getById('test_wrapper').style.position)
            .toBe('');
        expect(CORE.getById('test_wrapper').style.height)
            .toBe('');

        /* Computed Styles */

        expect(window.getComputedStyle(CORE.getById('test_wrapper'), null).getPropertyValue('top'))
            .toBe('101px');
        expect(window.getComputedStyle(CORE.getById('test_wrapper'), null).getPropertyValue('position'))
            .toBe('absolute');
        expect(window.getComputedStyle(CORE.getById('test_wrapper'), null).getPropertyValue('height'))
        // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getById('test_wrapper').clientHeight + 'px');

        /* Helper Methods */

        expect(CORE.getStyle('#test_wrapper', 'top'))
            .toBe('101px');
        expect(CORE.getStyle('#test_wrapper', 'position'))
            .toBe('absolute');
        expect(CORE.getStyle('#test_wrapper', 'height'))
        // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getById('test_wrapper').clientHeight + 'px');

        // -------------------------------------------------------------------------

        expect(CORE.getById('test_content').style.top)
            .toBe('200px');
        expect(CORE.getById('test_content').style.position)
            .toBe('relative');
        expect(CORE.getById('test_content').style.height)
            .toBe('111px');

        /* Computed Styles */

        expect(window.getComputedStyle(CORE.getById('test_content'), null).getPropertyValue('top'))
            .toBe('200px');
        expect(window.getComputedStyle(CORE.getById('test_content'), null).getPropertyValue('position'))
            .toBe('relative');
        expect(window.getComputedStyle(CORE.getById('test_content'), null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe('111px');

        /* Helper Methods */

        expect(CORE.getStyle('#test_content', 'top'))
            .toBe('200px');
        expect(CORE.getStyle('#test_content', 'position'))
            .toBe('relative');
        expect(CORE.getStyle('#test_content', 'height'))
            // TODO:
            // NOTE: Cascade Style NOT Converted To Computed Style
            .toBe('auto');

        // -------------------------------------------------------------------------

        expect(CORE.getByTag('ul', 'test_content')[0].style.top)
            .toBe('300px');
        expect(CORE.getByTag('ul', 'test_content')[0].style.position)
            .toBe('');
        expect(CORE.getByTag('ul', 'test_content')[0].style.height)
            .toBe('100%');
        expect(CORE.getByTag('ul', 'test_content')[1].style.top)
            .toBe('');
        expect(CORE.getByTag('ul', 'test_content')[1].style.position)
            .toBe('');
        expect(CORE.getByTag('ul', 'test_content')[1].style.height)
            .toBe('');

        /* Computed Styles */

        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[0], null).getPropertyValue('top'))
            .toBe('300px');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[0], null).getPropertyValue('position'))
            .toBe('absolute');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[0], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('ul', 'test_content')[0].clientHeight + 'px');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[1], null).getPropertyValue('top'))
            .toBe('7px');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[1], null).getPropertyValue('position'))
            .toBe('absolute');
        expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[1], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('ul', 'test_content')[1].clientHeight + 'px');

        /* Helper Methods */

        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[0], 'top'))
            .toBe('300px');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[0], 'position'))
            .toBe('absolute');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[0], 'height'))
            // TODO:
            // NOTE: Cascade Style NOT Converted To Computed Style
            .toBe('100%');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[1], 'top'))
            .toBe('7px');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[1], 'position'))
            .toBe('absolute');
        expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[1], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('ul', 'test_content')[1].clientHeight + 'px');

        // -------------------------------------------------------------------------

        expect(CORE.getByTag('li', 'test_content')[0].style.top)
            .toBe('400px');
        expect(CORE.getByTag('li', 'test_content')[0].style.position)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[0].style.height)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[1].style.top)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[1].style.position)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[1].style.height)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[2].style.top)
            .toBe('555px');
        expect(CORE.getByTag('li', 'test_content')[2].style.position)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[2].style.height)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[3].style.top)
            .toBe('9px');
        expect(CORE.getByTag('li', 'test_content')[3].style.position)
            .toBe('');
        expect(CORE.getByTag('li', 'test_content')[3].style.height)
            .toBe('');

        /* Computed Styles */

        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[0], null).getPropertyValue('top'))
            .toBe('400px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[0], null).getPropertyValue('position'))
            .toBe('absolute');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[0], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[0].clientHeight + 'px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[1], null).getPropertyValue('top'))
            .toBe('8px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[1], null).getPropertyValue('position'))
            .toBe('absolute');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[1], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[1].clientHeight + 'px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[2], null).getPropertyValue('top'))
            .toBe('555px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[2], null).getPropertyValue('position'))
            .toBe('absolute');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[2], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[2].clientHeight + 'px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[3], null).getPropertyValue('top'))
            .toBe('9px');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[3], null).getPropertyValue('position'))
            .toBe('absolute');
        expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[3], null).getPropertyValue('height'))
            // NOTE: Cascade Style Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[3].clientHeight + 'px');

        /* Helper Methods */

        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[0], 'top'))
            .toBe('400px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[0], 'position'))
            .toBe('absolute');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[0], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[0].clientHeight + 'px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[1], 'top'))
            .toBe('8px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[1], 'position'))
            .toBe('absolute');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[1], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[1].clientHeight + 'px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[2], 'top'))
            .toBe('555px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[2], 'position'))
            .toBe('absolute');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[2], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[2].clientHeight + 'px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[3], 'top'))
            .toBe('9px');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[3], 'position'))
            .toBe('absolute');
        expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[3], 'height'))
            // TODO:
            // NOTE: Cascade Style Was Converted To Computed Style
            .toBe(CORE.getByTag('li', 'test_content')[3].clientHeight + 'px');

        // ############################################################################
        // ############################################################################

        CORE.getById('test_wrapper')._style = {};
        CORE.getById('test_wrapper')._style_new = {};
        CORE.getById('test_wrapper')._style_keys = [];
        CORE.getById('test_wrapper').className = '';
        CORE.getById('test_layer')._style = {};
        CORE.getById('test_layer')._style_new = {};
        CORE.getById('test_layer')._style_keys = [];
        CORE.getById('test_layer').className = '';

        CORE.getByTag('ul', 'test_content')[0]._style = {};
        CORE.getByTag('ul', 'test_content')[0]._style_new = {};
        CORE.getByTag('ul', 'test_content')[0]._style_keys = [];
        CORE.getByTag('ul', 'test_content')[1]._style = {};
        CORE.getByTag('ul', 'test_content')[1]._style_new = {};
        CORE.getByTag('ul', 'test_content')[1]._style_keys = [];

        CORE.getByTag('li', 'test_content')[0]._style = {};
        CORE.getByTag('li', 'test_content')[0]._style_new = {};
        CORE.getByTag('li', 'test_content')[0]._style_keys = [];
        CORE.getByTag('li', 'test_content')[1]._style = {};
        CORE.getByTag('li', 'test_content')[1]._style_new = {};
        CORE.getByTag('li', 'test_content')[1]._style_keys = [];
        CORE.getByTag('li', 'test_content')[2]._style = {};
        CORE.getByTag('li', 'test_content')[2]._style_new = {};
        CORE.getByTag('li', 'test_content')[2]._style_keys = [];
        CORE.getByTag('li', 'test_content')[3]._style = {};
        CORE.getByTag('li', 'test_content')[3]._style_new = {};
        CORE.getByTag('li', 'test_content')[3]._style_keys = [];

        CORE.paint(function(){

            CORE.setStyle('#test_wrapper', 'top', '101px');
            CORE.setStyle('#test_content', 'height', '111px');
            CORE.setStyle(CORE.getByTag('li', 'test_content')[2], 'top', '555px');
            CORE.setStyle(CORE.getByTag('li', 'test_content')[3], 'top', '9px');
            CORE.addClass('#test_wrapper', 'active');
            CORE.addClass('#test_content', 'active');

            CORE.paint(function(){

                /* Inline Styles */

                expect(CORE.getById('test_wrapper').style.top)
                    .toBe('101px');
                expect(CORE.getById('test_wrapper').style.position)
                    .toBe('');
                expect(CORE.getById('test_wrapper').style.height)
                    .toBe('');

                /* Computed Styles */

                expect(window.getComputedStyle(CORE.getById('test_wrapper'), null).getPropertyValue('top'))
                    .toBe('101px');
                expect(window.getComputedStyle(CORE.getById('test_wrapper'), null).getPropertyValue('position'))
                    .toBe('absolute');
                expect(window.getComputedStyle(CORE.getById('test_wrapper'), null).getPropertyValue('height'))
                // NOTE: Cascade Style Converted To Computed Style
                    .toBe(CORE.getById('test_wrapper').clientHeight + 'px');

                /* Helper Methods */

                expect(CORE.getStyle('#test_wrapper', 'top'))
                    .toBe('101px');
                expect(CORE.getStyle('#test_wrapper', 'position'))
                    .toBe('absolute');
                expect(CORE.getStyle('#test_wrapper', 'height'))
                // NOTE: Cascade Style Converted To Computed Style
                    .toBe(CORE.getById('test_wrapper').clientHeight + 'px');

                // -------------------------------------------------------------------------

                expect(CORE.getById('test_content').style.top)
                    .toBe('200px');
                expect(CORE.getById('test_content').style.position)
                    .toBe('relative');
                expect(CORE.getById('test_content').style.height)
                    .toBe('111px');

                /* Computed Styles */

                expect(window.getComputedStyle(CORE.getById('test_content'), null).getPropertyValue('top'))
                    .toBe('200px');
                expect(window.getComputedStyle(CORE.getById('test_content'), null).getPropertyValue('position'))
                    .toBe('relative');
                expect(window.getComputedStyle(CORE.getById('test_content'), null).getPropertyValue('height'))
                // NOTE: Cascade Style Converted To Computed Style
                    .toBe('111px');

                /* Helper Methods */

                expect(CORE.getStyle('#test_content', 'top'))
                    .toBe('200px');
                expect(CORE.getStyle('#test_content', 'position'))
                    .toBe('relative');
                expect(CORE.getStyle('#test_content', 'height'))
                    // TODO:
                    // NOTE: Cascade Style Was Converted To Computed Style
                    .toBe(CORE.getById( 'test_content').clientHeight + 'px');

                // -------------------------------------------------------------------------

                expect(CORE.getByTag('ul', 'test_content')[0].style.top)
                    .toBe('300px');
                expect(CORE.getByTag('ul', 'test_content')[0].style.position)
                    .toBe('');
                expect(CORE.getByTag('ul', 'test_content')[0].style.height)
                    .toBe('100%');
                expect(CORE.getByTag('ul', 'test_content')[1].style.top)
                    .toBe('');
                expect(CORE.getByTag('ul', 'test_content')[1].style.position)
                    .toBe('');
                expect(CORE.getByTag('ul', 'test_content')[1].style.height)
                    .toBe('');

                /* Computed Styles */

                expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[0], null).getPropertyValue('top'))
                    .toBe('300px');
                expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[0], null).getPropertyValue('position'))
                    .toBe('absolute');
                expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[0], null).getPropertyValue('height'))
                // NOTE: Cascade Style Converted To Computed Style
                    .toBe(CORE.getByTag('ul', 'test_content')[0].clientHeight + 'px');
                expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[1], null).getPropertyValue('top'))
                    .toBe('7px');
                expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[1], null).getPropertyValue('position'))
                    .toBe('absolute');
                expect(window.getComputedStyle(CORE.getByTag('ul', 'test_content')[1], null).getPropertyValue('height'))
                // NOTE: Cascade Style Converted To Computed Style
                    .toBe(CORE.getByTag('ul', 'test_content')[1].clientHeight + 'px');

                /* Helper Methods */

                expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[0], 'top'))
                    .toBe('300px');
                expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[0], 'position'))
                    .toBe('absolute');
                expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[0], 'height'))
                // TODO:
                // NOTE: Cascade Style NOT Converted To Computed Style
                    .toBe('100%');
                expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[1], 'top'))
                    .toBe('7px');
                expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[1], 'position'))
                    .toBe('absolute');
                expect(CORE.getStyle(CORE.getByTag('ul', 'test_content')[1], 'height'))
                // TODO:
                // NOTE: Cascade Style Was Converted To Computed Style
                    .toBe(CORE.getByTag('ul', 'test_content')[1].clientHeight + 'px');

                // -------------------------------------------------------------------------

                expect(CORE.getByTag('li', 'test_content')[0].style.top)
                    .toBe('400px');
                expect(CORE.getByTag('li', 'test_content')[0].style.position)
                    .toBe('');
                expect(CORE.getByTag('li', 'test_content')[0].style.height)
                    .toBe('');
                expect(CORE.getByTag('li', 'test_content')[1].style.top)
                    .toBe('');
                expect(CORE.getByTag('li', 'test_content')[1].style.position)
                    .toBe('');
                expect(CORE.getByTag('li', 'test_content')[1].style.height)
                    .toBe('');
                expect(CORE.getByTag('li', 'test_content')[2].style.top)
                    .toBe('555px');
                expect(CORE.getByTag('li', 'test_content')[2].style.position)
                    .toBe('');
                expect(CORE.getByTag('li', 'test_content')[2].style.height)
                    .toBe('');
                expect(CORE.getByTag('li', 'test_content')[3].style.top)
                    .toBe('9px');
                expect(CORE.getByTag('li', 'test_content')[3].style.position)
                    .toBe('');
                expect(CORE.getByTag('li', 'test_content')[3].style.height)
                    .toBe('');

                /* Computed Styles */

                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[0], null).getPropertyValue('top'))
                    .toBe('400px');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[0], null).getPropertyValue('position'))
                    .toBe('absolute');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[0], null).getPropertyValue('height'))
                // NOTE: Cascade Style Converted To Computed Style
                    .toBe(CORE.getByTag('li', 'test_content')[0].clientHeight + 'px');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[1], null).getPropertyValue('top'))
                    .toBe('8px');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[1], null).getPropertyValue('position'))
                    .toBe('absolute');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[1], null).getPropertyValue('height'))
                // NOTE: Cascade Style Converted To Computed Style
                    .toBe(CORE.getByTag('li', 'test_content')[1].clientHeight + 'px');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[2], null).getPropertyValue('top'))
                    .toBe('555px');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[2], null).getPropertyValue('position'))
                    .toBe('absolute');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[2], null).getPropertyValue('height'))
                // NOTE: Cascade Style Converted To Computed Style
                    .toBe(CORE.getByTag('li', 'test_content')[2].clientHeight + 'px');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[3], null).getPropertyValue('top'))
                    .toBe('9px');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[3], null).getPropertyValue('position'))
                    .toBe('absolute');
                expect(window.getComputedStyle(CORE.getByTag('li', 'test_content')[3], null).getPropertyValue('height'))
                // NOTE: Cascade Style Converted To Computed Style
                    .toBe(CORE.getByTag('li', 'test_content')[3].clientHeight + 'px');

                /* Helper Methods */

                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[0], 'top'))
                    .toBe('400px');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[0], 'position'))
                    .toBe('absolute');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[0], 'height'))
                // TODO:
                // NOTE: Cascade Style Was Converted To Computed Style
                    .toBe(CORE.getByTag('li', 'test_content')[0].clientHeight + 'px');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[1], 'top'))
                    .toBe('8px');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[1], 'position'))
                    .toBe('absolute');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[1], 'height'))
                // TODO:
                // NOTE: Cascade Style Was Converted To Computed Style
                    .toBe(CORE.getByTag('li', 'test_content')[1].clientHeight + 'px');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[2], 'top'))
                    .toBe('555px');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[2], 'position'))
                    .toBe('absolute');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[2], 'height'))
                // TODO:
                // NOTE: Cascade Style Was Converted To Computed Style
                    .toBe(CORE.getByTag('li', 'test_content')[2].clientHeight + 'px');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[3], 'top'))
                    .toBe('9px');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[3], 'position'))
                    .toBe('absolute');
                expect(CORE.getStyle(CORE.getByTag('li', 'test_content')[3], 'height'))
                // TODO:
                // NOTE: Cascade Style Was Converted To Computed Style
                    .toBe(CORE.getByTag('li', 'test_content')[3].clientHeight + 'px');

                done();
            });
        });
    });

    // '<div id="test_wrapper" style="top: 100px;">' +
    // '<div id="test_content" style="position: relative; top: 200px; height:auto;">' +
    // '<ul class="ul" style="top: 300px; height:100%;">' +
    // '<li class="ul_li" style="top: 400px;"></li>' +
    // '<li class="ul_li"></li>' +
    // '</ul>' +
    // '<ul class="ul">' +
    // '<li class="ul_li" style="top: 444px !important;"></li>' +
    // '<li class="ul_li"></li>' +
    // '</ul>' +
    // '</div>' +
    // '</div>' +
});
