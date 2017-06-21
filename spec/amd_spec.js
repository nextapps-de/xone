describe("Check AMD Implementation", function() {

    it("Check if core ist loaded", function() {

        expect(AMD).toBeDefined();
        expect(define).toBeDefined();
        expect(require).toBeDefined();
    });

    it("Check if framework contains all required functions", function() {

        expect(AMD).toHaveMethod("define");
        expect(AMD).toHaveMethod("require");
        expect(AMD).toHaveMethod("install");
        expect(AMD).toHaveMethod("export");
        expect(AMD).toHaveMethod("build");
        expect(AMD).toHaveMethod("out");
    });

    it("AMD.define(name)", function() {

        expect(require('val')).toBe(void 0);
        define('val');
        expect(require('val')).toBe(null);
    });

    it("AMD.define(name, value)", function() {

        define('val', 1);
        expect(require('val')).toBe(1);

        define('val', 2);
        define('val', 3);
        expect(require('val')).toBe(3);
    });

    it("AMD.define(name, fn)", function() {

        define('foo', function(){

            return 'foo';
        })

        expect(require('foo')).toBe('foo');
    });

    it("AMD.define(name, require, fn)", function() {

        define('bar', 'foo', function(foo){

            return foo;
        })

        expect(require('bar')).toBe('foo');
    });

    it("AMD.define(name, [require], fn)", function() {

        define('foobar', ['foo', 'bar', 'val'], function(foo, bar, val){

            return foo + bar + val;
        })

        expect(require('foobar')).toBe('foofoo3');
    });

    it("AMD.require(name)", function() {

        require('foobar', function(foobar){

            expect(foobar).toBe('foofoo3');
        });

        var foobar = require('foobar');
        expect(foobar).toBe('foofoo3');
    });

    it("Redefine", function() {

        define('a', [1]);
        define('b', [2]);

        define('c', ['a', 'b'], function(a, b){

            return a.concat(b);
        });

        expect(require('c')).toEqual([1, 2]);

        define('a', [2]);
        define('b', [3]);

        expect(require('c')).toEqual([2, 3]);
    });
});
