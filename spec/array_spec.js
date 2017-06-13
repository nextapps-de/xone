describe("Array Tests", function() {

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

    it("Check CORE.merge()", function() {

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

    it("Check CORE.unique()", function() {

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

    it("Check CORE.reverse()", function() {

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
});
