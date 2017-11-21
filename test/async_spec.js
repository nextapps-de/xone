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

        }, 50);
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

            }, 100);
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

        }, 50);
    });

    it("CORE.queue(fn, delay)", function(done) {

        var value = 'foo';

        CORE.queue(function(){

            CORE.queue(function(){

                value = 'foobar';
            });
        });

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).toBe('foobar');
            done();
        });
    });

    it("CORE.queue(fn, delay)", function(done) {

        CONFIG_TICK_PROCESS_TIME = 0;

        var value = 'foo';

        CORE.queue(function(){

            CORE.queue(function(){

                value = 'foobar';
            });
        });

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).not.toBe('foobar');

            window.setTimeout(function(){

                expect(value).toBe('foobar');
                done();
            });
        });
    });

    it("CORE.queue([fn])", function(done) {

        CONFIG_TICK_PROCESS_TIME = 0;

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

        CONFIG_TICK_PROCESS_TIME = 0;

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
        ]);

        value = 'bar';
    });

    it("CORE.stack(fn)", function(done) {

        CONFIG_TICK_PROCESS_TIME = 3;

        var value = 'foo';

        CORE.stack(function(){

            CORE.stack(function(){

                value = 'foobar';
            });
        });

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).toBe('foobar');
            done();
        });
    });

    it("CORE.stack(fn, delay)", function(done) {

        CONFIG_TICK_PROCESS_TIME = 0;

        var value = 'foo';

        CORE.stack(function(){

            CORE.stack(function(){

                value = 'foobar';
            });
        });

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).not.toBe('foobar');

            window.setTimeout(function(){

                expect(value).toBe('foobar');
                done();
            });
        });
    });

    it("CORE.queue vs CORE.stack vs CORE.async", function(done) {

        CONFIG_TICK_PROCESS_TIME = 0;

        var value = 0;

        // 6.
        CORE.queue(function(){

            expect(++value).toBe(7);
        });

        // 5.
        CORE.stack(function(){

            expect(++value).toBe(6);
        });

        // 2.
        CORE.async(function(){

            expect(++value).toBe(3);
        });

        // 4.
        CORE.stack(function(){

            expect(++value).toBe(5);
        });

        // 7.
        CORE.queue(function(){

            expect(++value).toBe(8);
        });

        // 1.
        CORE.stack(function(){

            expect(++value).toBe(2);
        });

        // 8.
        CORE.queue(function(){

            expect(++value).toBe(9);

            CONFIG_TICK_PROCESS_TIME = 3;

            done();
        });

        // 3.
        CORE.async(function(){

            expect(++value).toBe(4);
        });

        value++;
    });
});
