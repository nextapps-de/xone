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

    it("CORE.queue(fn)", function(done) {

        var value = 'foo';

        CORE.queue(function(){

            value = 'foobar';
        });

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).toBe('foobar');
            done();
        });
    });

    it("CORE.queue(fn, delay)", function(done) {

        var value = 'foo';

        CORE.queue(function(){

            value = 'foobar';

        }, 25);

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

    it("CORE.queue([fn])", function(done) {

        var value = 'foo';

        CORE.queue([

            function(){

                value = 'foobar 1';
            },

            function(){

                value = 'foobar 2';
            },

            function(){

                value = 'foobar 3';
            }
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

    it("CORE.queue([fn], delay)", function(done) {

        var value = 'foo';

        CORE.queue([

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
            }

        ], 10);

        value = 'bar';
    });

    it("CORE.stack(fn)", function(done) {

        var value = 'foo';

        CORE.stack(function(){

            value = 'foobar';
        });

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).toBe('bar');

            window.setTimeout(function(){

                expect(value).toBe('foobar');
                done();

            }, 25);
        });
    });

    it("CORE.stack(fn, delay)", function(done) {

        var value = 'foo';

        CORE.stack(function(){

            value = 'foobar';

        }, 25);

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

    it("CORE.queue vs CORE.stack vs CORE.async", function(done) {

        var value = 0;

        // 6.
        CORE.queue(function(){

            expect(++value).toBe(7);
        });

        // 5.
        CORE.stack(function(){

            expect(++value).toBe(6);
        });

        // 4.
        CORE.async(function(){

            expect(++value).toBe(5);
        });

        // 3.
        CORE.stack(function(){

            expect(++value).toBe(4);
        });

        // 7.
        CORE.queue(function(){

            expect(++value).toBe(8);
        });

        // 2.
        CORE.stack(function(){

            expect(++value).toBe(3);
        });

        // 8.
        CORE.queue(function(){

            expect(++value).toBe(9);

            done();
        });

        // 1.
        CORE.async(function(){

            expect(++value).toBe(2);
        });

        value++;
    });
});
