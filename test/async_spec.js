describe("Check Async Implementation", function() {

    it("CORE.async(fn)", function(done) {

        var value = 'foo';

        CORE.async(function(){

            value = 'foobar';
        });

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).toBe('foobar');
            done();
        });
    });

    it("CORE.async(fn, delay)", function(done) {

        var value = 'foo';

        CORE.async(function(){

            value = 'foobar';

        }, 50);

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).not.toBe('foobar');

            window.setTimeout(function(){

                expect(value).toBe('foobar');
                done();

            }, 50);
        });
    });

    it("CORE.stack(fn)", function(done) {

        var value = 'foo';

        CORE.stack(function(){

            value = 'foobar';
        });

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).toBe('foobar');
            done();
        });
    });

    it("CORE.stack(fn, delay)", function(done) {

        var value = 'foo';

        CORE.stack(function(){

            value = 'foobar';

        }, 50);

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).not.toBe('foobar');

            window.setTimeout(function(){

                expect(value).toBe('foobar');
                done();

            }, 50);
        });
    });

    it("CORE.stack([fn])", function(done) {

        var value = 'foo';

        CORE.stack([

            function(){

                value = 'foobar 1';
            },

            function(){

                value = 'foobar 2';
            },

            function(){

                value = 'foobar 3';
            },
        ]);

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).toBe('foobar 1');

            window.setTimeout(function(){

                expect(value).toBe('foobar 2');

                window.setTimeout(function(){

                    expect(value).toBe('foobar 3');
                    done();
                });
            });
        });
    });

    it("CORE.stack([fn], delay)", function(done) {

        var value = 'foo';

        CORE.stack([

            function(){

                expect(value).toBe('bar');
            },

            function(){

                value = 'foobar 1';
            },

            function(){

                expect(value).toBe('foobar 1');
            },

            function(){

                value = 'foobar 2';
            },

            function(){

                expect(value).toBe('foobar 2');
            },

            function(){

                value = 'foobar 3';
            },

            function(){

                expect(value).toBe('foobar 3');
                done();
            },

        ], 10);

        value = 'bar';
    });
});
