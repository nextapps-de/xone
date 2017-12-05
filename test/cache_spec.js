describe("FlexiCache Test", function(){

    it("Cache implements methods", function(){

        var cache = Util.Cache.new();

        expect(cache).toBeDefined();
        expect(cache).toHaveMethod('set');
        expect(cache).toHaveMethod('get');
        expect(cache).toHaveMethod('del');
        expect(cache).toHaveMethod('delete');
        expect(cache).toHaveMethod('rm');
        expect(cache).toHaveMethod('remove');
    });

    it("Set/Get Cache", function(done){

        var cache = Util.Cache.new();

        cache.set('foo', 'bar');
        expect(cache.get('foo')).toBe('bar');

        cache.set('foo', 'foobar');
        expect(cache.get('foo')).toBe('foobar');

        cache.set('foo', null);
        expect(cache.get('foo')).toBe(null);

        cache.set('foo', void 0);
        expect(cache.get('foo')).toBe(void 0);

        cache.set('foo', false);
        expect(cache.get('foo')).toBe(false);

        cache.set('foo', 0);
        expect(cache.get('foo')).toBe(0);

        cache.set('foo', '');
        expect(cache.get('foo')).toBe('');

        cache.set('foo', {});
        expect(cache.get('foo')).toEqualObject({});

        cache.set('foo', function(){});
        expect(cache.get('foo')).toEqualFunction(function(){});

        setTimeout(function(){

            expect(cache.get('foo')).toEqualFunction(function(){});
            done();

        }, 50);
    });

    it("Set/Get Cache (Expire)", function(done){

        var cache = Util.Cache.new(50);

        cache.set('foo', 'bar');
        expect(cache.get('foo')).toBe('bar');

        setTimeout(function(){

            expect(cache.get('foo')).toBe('bar');

            setTimeout(function(){

                expect(cache.get('foo')).toBe('bar');

                setTimeout(function(){

                    expect(cache.get('foo')).toBeUndefined();
                    done();

                }, 50);
            });
        });
    });

    it("Set/Get Cache (Renew Expiration)", function(done){

        var cache = Util.Cache.new(50);

        cache.set('foo', 'bar');
        expect(cache.get('foo')).toBe('bar');

        setTimeout(function(){

            expect(cache.get('foo')).toBe('bar');

            cache.set('foo', 'bar');

            setTimeout(function(){

                expect(cache.get('foo')).toBe('bar');

                cache.set('foo', 'bar');

                setTimeout(function(){

                    expect(cache.get('foo')).toBe('bar');

                    setTimeout(function(){

                        expect(cache.get('foo')).toBeUndefined();
                        done();

                    }, 25);
                }, 25);
            }, 25);
        });
    });

    it("Set/Get Cache (Revalidate Expiration)", function(done){

        var cache = Util.Cache.new(50);

        cache.set('foo', 'bar');
        expect(cache.get('foo')).toBe('bar');

        setTimeout(function(){

            expect(cache.get('foo')).toBe('bar');

            cache.set('foo', 'bar', 50);

            setTimeout(function(){

                expect(cache.get('foo')).toBe('bar');

                setTimeout(function(){

                    expect(cache.get('foo')).toBeUndefined();
                    done();

                }, 25);
            }, 25);
        }, 25);
    });

    it("Set/Get Cache (Limit)", function(done){

        var cache = Util.Cache.new(false, 2);

        // 1:
        cache.set('foo', 'foo');
        expect(cache.get('foo')).toBe('foo');

        // 2:
        cache.set('bar', 'bar');
        expect(cache.get('bar')).toBe('bar');

        // 3:
        cache.set('foobar', 'foobar');
        expect(cache.get('foobar')).toBe('foobar');
        expect(cache.get('bar')).toBe('bar');
        expect(cache.get('foo')).toBeUndefined();

        setTimeout(function(){

            expect(cache.get('foobar')).toBe('foobar');
            expect(cache.get('bar')).toBe('bar');
            done();

        }, 50);
    });

    it("Set/Get Cache (Auto Cleanup)", function(done){

        var cache = Util.Cache.new(false, false, true);

        cache.set('foo', 'foo');
        cache.set('bar', 'bar');
        expect(cache.get('foo')).toBe('foo');

        cache.cleanup(true);

        expect(cache.get('foo')).toBe('foo');
        expect(cache.get('bar')).toBeUndefined();

        cache.cleanup(false);
        cache.cleanup(false);

        expect(cache.get('foo')).toBe('foo');

        cache.cleanup(true);
        cache.cleanup(true);

        expect(cache.get('foo')).toBeUndefined();

        cache.set('foo', 'foo');

        setTimeout(function(){

            expect(cache.get('foo')).toBeUndefined();
            done();

        }, 50);
    });

    it("Remove Cache", function(){

        var cache = Util.Cache.new();

        cache.set('foo', 'foo');
        expect(cache.get('foo')).toBe('foo');
        expect(cache.remove('foo')).toBe('foo');
        expect(cache.get('foo')).toBeUndefined();
    });

    it("Delete Cache", function(){

        var cache = Util.Cache.new();

        cache.set('foo', 'foo');
        expect(cache.get('foo')).toBe('foo');
        cache.del('foo');
        expect(cache.get('foo')).toBeUndefined();
    });

    it("Get Cache Size", function(){

        var cache = Util.Cache.new();

        cache.set('foo', 'foo');
        cache.set('bar', 'bar');
        cache.set('foobar', 'foobar');

        expect(cache.count()).toBe(3);
        expect(cache.length).toBe(3);
        expect(cache.size).toBe(1000);
    });

    it("Clear Cache", function(){

        var cache = Util.Cache.new();

        cache.set('foo', 'foo');
        cache.set('bar', 'bar');
        cache.set('foobar', 'foobar');

        expect(cache.count()).toBe(3);

        cache.clear();

        expect(cache.count()).toBe(0);
    });

    it("Clone Cache", function(){

        var cache = Util.Cache.new();
        var obj = {foo: 'foo'};

        cache.set('foo', obj);
        expect(cache.get('foo')).toEqualObject(obj);

        obj.foo = 'bar';
        expect(cache.get('foo')).toEqualObject(obj);

        cache.get('foo').foo = 'bar';
        obj = {foo: 'bar'};
        expect(cache.get('foo')).toEqualObject(obj);

        cache.clone('foo').foo = 'foobar';
        obj = {foo: 'foobar'};
        expect(cache.get('foo')).not.toEqualObject(obj);
        expect(cache.get('foo')).toEqualObject({foo: 'bar'});
    });
});
