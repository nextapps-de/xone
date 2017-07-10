describe("Array Tests", function() {

    var is_phantom = navigator.userAgent.indexOf('PhantomJS/1.9.8') !== -1;

    it("Check if core contains all required functions", function() {

        expect(CORE).toHaveMethod("merge");
        expect(CORE).toHaveMethod("unique");
        expect(CORE).toHaveMethod("registerEach");
        expect(CORE).toHaveMethod("registerFilter");
        expect(CORE).toHaveMethod("registerMap");
        expect(CORE).toHaveMethod("reverse");
        expect(CORE).toHaveMethod("shuffle");
        expect(CORE).toHaveMethod("fill");
        expect(CORE).toHaveMethod("sort");
        expect(CORE).toHaveMethod("sortAsc");
        expect(CORE).toHaveMethod("sortDesc");
        expect(CORE).toHaveMethod("sortNum");
        expect(CORE).toHaveMethod("sortNumAsc");
        expect(CORE).toHaveMethod("sortNumDesc");
        //expect(CORE).toHaveMethod("sortBy");
        //expect(CORE).toHaveMethod("sortByAsc");
        //expect(CORE).toHaveMethod("sortByDesc");
        expect(CORE).toHaveMethod("getKeys");
        expect(CORE).toHaveMethod("replace");
        expect(CORE).toHaveMethod("count");
    });

    it("CORE.merge([array])", function() {

        var test_arrays = [

            [1],
            [],
            ["3"],
            [{
                foo: 'bar'
            }],
            [null],
            null,
            [[5]]
        ];

        expect(CORE.merge.apply(this, test_arrays))
            .toEqual([

                1,
                "3",
                Object({foo: 'bar'}),
                null,
                [5]
            ]);
    });

    it("CORE.unique(array)", function() {

        var test_array = [

            1,
            ,
            [5],
            "3",
            {
                foo: 'bar'
            },
            ,
            1,
            "3",
            null,
            NaN,
            void 0,
            [5],
            {
                foo: 'bar'
            },
            null,
            undefined
        ];

        expect(CORE.unique(test_array))
            .toEqual([

                1,
                undefined,
                [5],
                '3',
                Object({foo: 'bar'}),
                null,
                NaN
            ]);
    });

    it("CORE.reverse(array)", function() {

        var test_array = [

            1,
            ,
            [5],
            void 0,
            "3",
            {
                foo: 'bar'
            },
            ,
            1,
            NaN,
            "3",
            null,
            [5],
            {
                foo: 'bar'
            },
            null
        ];

        expect(CORE.reverse(test_array))
            .toEqual([

                null,
                Object({foo: 'bar'}),
                [5],
                null,
                '3',
                NaN,
                1,
                undefined,
                Object({foo: 'bar'}),
                '3',
                void 0,
                [5],
                undefined,
                1
            ]);
    });

    it("CORE.fill(array)", function() {

        var test_array = new Array(3);

        expect(CORE.fill(test_array, {foo: 'bar'}))
            .toEqual([

                {foo: 'bar'},
                {foo: 'bar'},
                {foo: 'bar'}
            ]);

        test_array = new Array(3);

        expect(CORE.fill(test_array, {bar: 'foo'}, 1, 1))
            .toEqual([

                undefined,
                {bar: 'foo'},
                undefined
            ]);

        test_array = new Array(3);

        expect(CORE.fill(test_array, {bar: 'foo'}, 2, 0))
            .toEqual([

                undefined,
                undefined,
                undefined
            ]);

        test_array = new Array(3);

        expect(CORE.fill(test_array, {bar: 'foo'}, 0, 20))
            .toEqual([

                {bar: 'foo'},
                {bar: 'foo'},
                {bar: 'foo'}
            ]);
    });

    it("CORE.shuffle(array)", function() {

        var test_array = Array.apply(null, Array(100)).map(function(value){

            return ("" + Math.random()).substring(2);
        });

        expect(CORE.shuffle(test_array.slice(0)))
            .not.toEqual(test_array);
    });

    it("CORE.sort(array), CORE.sortAsc(array), CORE.sortDesc(array)", function() {

        var test_array = [

            1,
            ,
            [5],
            void 0,
            "3",
            {
                foo: 'bar'
            },
            ,
            1,
            NaN,
            "3",
            null,
            [5],
            {
                foo: 'bar'
            },
            null
        ];

        if(is_phantom){

            expect(CORE.sort(test_array.slice(0)))
                .toEqual([

                    1,
                    1,
                    '3',
                    '3',
                    [5],
                    [5],
                    NaN,
                    Object({foo: 'bar'}),
                    Object({foo: 'bar'}),
                    null,
                    null,
                    undefined,
                    undefined,
                    undefined
                ]);

            expect(CORE.sortAsc(test_array.slice(0)))
                .toEqual([

                    1,
                    1,
                    '3',
                    '3',
                    [5],
                    [5],
                    NaN,
                    Object({foo: 'bar'}),
                    Object({foo: 'bar'}),
                    null,
                    null,
                    undefined,
                    undefined,
                    undefined
                ]);

            expect(CORE.sortDesc(test_array.slice(0)))
                .toEqual([

                    null,
                    null,
                    Object({ foo: 'bar' }),
                    Object({ foo: 'bar' }),
                    NaN,
                    [5],
                    [5],
                    '3',
                    '3',
                    1,
                    1,
                    undefined,
                    undefined,
                    undefined
                ]);
        }
        else{

            expect(CORE.sort(test_array.slice(0)))
                .toEqual([

                    Object({foo: 'bar'}),
                    Object({foo: 'bar'}),
                    1,
                    1,
                    '3',
                    '3',
                    [5],
                    [5],
                    NaN,
                    null,
                    null,
                    undefined,
                    undefined,
                    undefined
                ]);

            expect(CORE.sortAsc(test_array.slice(0)))
                .toEqual([

                    Object({ foo: 'bar' }),
                    Object({ foo: 'bar' }),
                    1,
                    1,
                    '3',
                    '3',
                    [5],
                    [5],
                    NaN,
                    null,
                    null,
                    undefined,
                    undefined,
                    undefined
                ]);

            expect(CORE.sortDesc(test_array.slice(0)))
                .toEqual([

                    null,
                    null,
                    NaN,
                    [5],
                    [5],
                    '3',
                    '3',
                    1,
                    1,
                    Object({ foo: 'bar' }),
                    Object({ foo: 'bar' }),
                    undefined,
                    undefined,
                    undefined
                ]);
        }
    });

    it("CORE.sortNum(array), CORE.sortNumAsc(array), CORE.sortNumDesc(array)", function() {

        var test_array = [

            1,
            ,
            5,
            25,
            0,
            3,
            NaN,
            ,
            1,
            -25,
            NaN,
            3,
            null,
            0,
            5,
            2,
            null
        ];

        expect(CORE.sortNum(test_array.slice(0)))
            .toEqual([

                -25,
                0,
                0,
                1,
                1,
                2,
                3,
                3,
                5,
                5,
                25,
                NaN,
                NaN,
                null,
                null,
                undefined,
                undefined
            ]);

        expect(CORE.sortNumAsc(test_array.slice(0)))
            .toEqual([

                -25,
                0,
                0,
                1,
                1,
                2,
                3,
                3,
                5,
                5,
                25,
                NaN,
                NaN,
                null,
                null,
                undefined,
                undefined
            ]);

        expect(CORE.sortNumDesc(test_array.slice(0)))
            .toEqual([

                25,
                5,
                5,
                3,
                3,
                2,
                1,
                1,
                0,
                0,
                -25,
                NaN,
                NaN,
                null,
                null,
                undefined,
                undefined
            ]);
    });

    it("CORE.getKeys(array)", function() {

        var test_array = {

            key_1: true,
            'key_1': true,
            'key_2': true,
            3: true,
            '4': true,
            null: true,
            NaN: true,
            "": true
        };

        expect(CORE.getKeys(test_array))
            .toContainAnyOf(Object.keys(test_array));

        if(is_phantom){

            expect(CORE.getKeys(test_array))
                .toEqual([

                    'key_1',
                    'key_2',
                    '3',
                    '4',
                    'null',
                    'NaN',
                    ''
                ]);
        }
        else{

            expect(CORE.getKeys(test_array))
                .toEqual([

                    '3',
                    '4',
                    'key_1',
                    'key_2',
                    'null',
                    'NaN',
                    ''
                ]);
        }
    });

    it("CORE.replace(array)", function() {

        var test_array = [

            'key',
            'key',
            ,
            3,
            '4',
            null,
            'key',
            NaN,
            ""
        ];

        expect(CORE.replace(test_array.slice(0), 'key', 'foobar'))
            .toEqual([

                'foobar',
                'foobar',
                undefined,
                3,
                '4',
                null,
                'foobar',
                NaN,
                ''
            ]);
    });

    it("CORE.replace(string)", function() {

        var str = 'key' + 'key' + 3 + '4' + null + 'key' + NaN + '';

        expect(CORE.replace(str, 'key', 'foobar'))
            .toEqual('foobar' + 'foobar' + 3 + '4' + null + 'foobar' + NaN + '');
    });

    it("CORE.count(array)", function() {

        var test_array = [

            'key',
            'key',
            ,
            3,
            '4',
            null,
            'key',
            NaN,
            ""
        ];

        expect(CORE.count(test_array.slice(0), 'key'))
            .toBe(3);
    });

    it("CORE.count(string)", function() {

        var str = 'key' + 'key' + 3 + '4' + null + 'key' + NaN + '';

        expect(CORE.count(str, 'key'))
            .toBe(3);
    });

    it("CORE.registerMap(function)", function() {

        var map = CORE.registerMap(function(value){

            return value * 2;
        });

        expect(map([1, 2, 3, 4, 5, , null, ""]))
            .toEqual([2, 4, 6, 8, 10, NaN, 0, 0]);
    });

    it("CORE.registerFilter(function)", function() {

        var filter = CORE.registerFilter(function(value){

            return value % 2;
        });

        expect(filter([1, 2, 3, 4, 5, , null, ""]))
            .toEqual([1, 3, 5]);
    });

    // it("CORE.registerEach(function)", function() {
    //
    //     // TODO: cannot access to local context
    //     str = '';
    //
    //     var each = CORE.registerEach(function(value){
    //
    //         str += value;
    //     });
    //
    //     each([1, 2, 3, 4, 5, , null, ""]);
    //
    //     expect(str)
    //         .toEqual("12345undefinednull");
    // });
});
