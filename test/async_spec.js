describe("Check Async Implementation", function() {

    var is_phantom = navigator.userAgent.indexOf('PhantomJS/1.9.8') !== -1;

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

            value = 'foobar';
        });

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).toBe('foobar');
            done();

        }, 25);
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

            }, 15);
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

                value = 'foobar 1';
            },

            function(){

                value = 'foobar 2';
            },

            function(){

                value = 'foobar 2';
            },

            function(){

                value = 'foobar 3';
            },

            function(){

                value = 'foobar 3';
            }
        ]);

        value = 'bar';

        expect(value).toBe('bar');

        window.setTimeout(function(){

            expect(value).toBe('foobar 1');

        }, 4);

        window.setTimeout(function(){

            expect(value).toBe('foobar 2');

        }, is_phantom ? 30 : 12);

        window.setTimeout(function(){

            expect(value).toBe('foobar 3');
            done();

        }, is_phantom ? 50 : 24);
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

        }, 4);
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

            }, 4);
        }, 4);
    });

    it("CORE.queue vs CORE.stack vs CORE.async", function(done) {

        CONFIG_TICK_PROCESS_TIME = 0;

        var value = 0;

        // 5.
        CORE.queue(function(){

            expect(++value).toBe(5);
            if(value === 7) done();
        });

        // 4.
        CORE.stack(function(){

            expect(++value).toBe(4);
            if(value === 7) done();
        });

        // 3.
        CORE.stack(function(){

            expect(++value).toBe(3);
            if(value === 7) done();
        });

        // 6.
        CORE.queue(function(){

            expect(++value).toBe(6);
            if(value === 7) done();
        });

        // 2.
        CORE.stack(function(){

            expect(++value).toBe(2);
            if(value === 7) done();
        });

        // 7.
        CORE.queue(function(){

            expect(++value).toBe(7);
            if(value === 7) done();
        });

        // TODO: mix with async may results in unpredictable test cases
        // 3.
        // CORE.async(function(){
        //
        //     expect(++value).toBe(3);
        //     if(value === 8) done();
        // });

        // 1.
        value++;
    });
});
