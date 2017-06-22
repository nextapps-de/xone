describe("Check AMD Implementation", function(){

    it("Check if core ist loaded", function(){

        expect(AMD).toBeDefined();
        expect(define).toBeDefined();
        expect(require).toBeDefined();
    });

    it("Check if framework contains all required functions", function(){

        expect(AMD).toHaveMethod("define");
        expect(AMD).toHaveMethod("require");
        expect(AMD).toHaveMethod("install");
        expect(AMD).toHaveMethod("export");
        expect(AMD).toHaveMethod("build");
        expect(AMD).toHaveMethod("out");
    });

    it("AMD.define(name)", function(){

        expect(require('val')).toBe(void 0);
        define('val');
        expect(require('val')).toBe(null);
    });

    it("AMD.define(name, value)", function(){

        define('val', 1);
        expect(require('val')).toBe(1);

        define('val', 2);
        define('val', 3);
        expect(require('val')).toBe(3);
    });

    it("AMD.define(name, fn)", function(){

        define('foo', function(){

            return 'foo';
        })

        expect(require('foo')).toBe('foo');
    });

    it("AMD.define(name, require, fn)", function(){

        define('bar', 'foo', function(foo){

            return foo;
        })

        expect(require('bar')).toBe('foo');
    });

    it("AMD.define(name, [require], fn)", function(){

        define('foobar', ['foo', 'bar', 'val'], function(foo, bar, val){

            return foo + bar + val;
        })

        expect(require('foobar')).toBe('foofoo3');
    });

    it("AMD.define(name, fn, self)", function(){

        define('this', function(foo, bar, val){

            return this;

        }, window.document.body);

        expect(require('this')).toBe(window.document.body);
    });

    it("AMD.require(name)", function(){

        var foobar = require('foobar');
        expect(foobar).toBe('foofoo3');
    });

    it("AMD.require(name, fn)", function(){

        require('foobar', function(foobar){

            expect(foobar).toBe('foofoo3');
        });
    });

    it("AMD.require(name, fn, self)", function(){

        require('foobar', function(foobar){

            expect(this).toBe(window.document.body);

        }, window.document.body);
    });

    it("Redefine", function(){

        define('a', [1]);
        define('b', [2]);

        define('c', ['a', 'b'], function(a, b){

            return a.concat(b);
        });

        expect(require('c')).toEqual([1, 2]);

        define('a', [2]);
        define('b', [3]);

        expect(require('c')).toEqual([2, 3]);

        // TODO:
        // define('a', [3]);
        // define('b', [4]);
        //
        // expect(require('c')).toEqual([3, 4]);

        // define('d', 'c', function(c){
        //
        //     return [c];
        // });
        //
        // define('a', [3]);
        // define('b', [4]);
        //
        // expect(require('d')).toEqual([[3, 4]]);
    });

    // TODO:
    // it("Undefine", function(){
    //
    //     define('a', [1]);
    //     define('b', [2]);
    //     expect(require('a')).toEqual([1]);
    //     expect(require('b')).toEqual([2]);
    //
    //     define('a', void 0);
    //     define('b', void 0);
    //     expect(require('a')).toBe(null);
    //     expect(require('b')).toBe(null);
    //
    //     define('a', [1]);
    //     define('b', [2]);
    //     expect(require('a')).toEqual([1]);
    //     expect(require('b')).toEqual([2]);
    //
    //     define('c', ['a', 'b'], function(a, b){
    //
    //         return a.concat(b);
    //     });
    //
    //     expect(require('c')).toEqual([1, 2]);
    //
    //     define('a', [2]);
    //     define('b', [3]);
    //     //AMD.undefine('a');
    //     //AMD.undefine('b');
    //
    //     expect(require('c')).toEqual([1, 2]);
    // });

    it("AMD.install(namespace)", function(){

        AMD.install('foobar');
        expect(window).toHaveProperty('foobar');
    });

    it("AMD.install(namespace, target)", function(){

        AMD.install('foobar', window.document);
        expect(window.document).toHaveProperty('foobar');
    });

    it("AMD.install(deep_namespace, target)", function(){

        define('Foobar', 1);
        define('Foobar.foo', 2);
        define('Foobar.bar', 3);
        define('Foobar.foobar', 4);
        define('Foobar.foo.bar', 5);
        define('Foobar.bar.foo', 6);
        define('Foobar.foo.barfoo', 7);

        var obj = {};

        AMD.install('Foobar.foo.bar', obj);
        expect(obj).toHaveProperty('bar');
        expect(obj).not.toHaveProperty('foo');

        obj = {};

        AMD.install('Foobar.foo', obj);
        expect(obj).toHaveProperty('foo');
        expect(obj).not.toHaveProperty('bar');

        obj = {};

        AMD.install('Foobar', obj);
        expect(obj).toHaveProperty('Foobar');
        expect(obj).not.toHaveProperty('foo');
        expect(obj).not.toHaveProperty('bar');

        //TODO:
        //expect(obj.Foobar).toHaveProperty('foo');
        //expect(obj.Foobar).toHaveProperty('bar');
    });

    it("AMD.install(namespace, target, rename)", function(){

        AMD.install('foobar', window, 'foobar-new');
        expect(window).toHaveProperty('foobar-new');
    });

    it("AMD.export(namespace)", function(){

        delete window.foobar;

        AMD.export('Foobar');
        expect(window).toHaveProperty('foo');
        expect(window).toHaveProperty('bar');
        expect(window).toHaveProperty('foobar');
        //TODO:
        //expect(window.foo).toHaveProperty('bar');
        //expect(window.bar).toHaveProperty('foo');
        expect(window).not.toHaveProperty('Foobar');
        expect(window).not.toHaveProperty('barfoo');
    });

    it("AMD.export(namespace, target)", function(){

        AMD.export('Foobar', window.document);
        expect(window.document).toHaveProperty('foo');
        expect(window.document).toHaveProperty('bar');
        expect(window.document).toHaveProperty('foobar');
    });

    it("AMD.export(deep_namespace, target)", function(){

        define('Foobar', 1);
        define('Foobar.foo', 2);
        define('Foobar.bar', 3);
        define('Foobar.foobar', 4);
        define('Foobar.foo.bar', 5);
        define('Foobar.bar.foo', 6);
        define('Foobar.foo.barfoo', 7);

        var obj = {};

        AMD.export('Foobar.foo', obj);
        expect(obj).toHaveProperty('bar');
        expect(obj).toHaveProperty('barfoo');
        expect(obj).not.toHaveProperty('foo');

        obj = {};

        AMD.export('Foobar', obj);
        expect(obj).toHaveProperty('foo');
        expect(obj).toHaveProperty('bar');
        expect(obj).not.toHaveProperty('Foobar');
    });

    it("AMD.export(namespace, target, rename)", function(){

        var obj = {};

        AMD.export('Foobar', obj, 'foo-new');
        expect(obj).not.toHaveProperty('foo-new');
        expect(obj).toHaveProperty('foo');
        expect(obj).toHaveProperty('bar');
        expect(obj).toHaveProperty('foobar');
    });
});
