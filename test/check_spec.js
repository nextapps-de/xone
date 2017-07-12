describe("Checks", function() {

    it("Check if core contains all required functions", function() {

        expect(CORE).toHaveMethod("contains");
        expect(CORE).toHaveMethod("isArray");
        expect(CORE).toHaveMethod("isBlank");
        expect(CORE).toHaveMethod("isDefined");
        expect(CORE).toHaveMethod("isEmpty");
        expect(CORE).toHaveMethod("isObject");
        expect(CORE).toHaveMethod("isType");
        expect(CORE).toHaveMethod("hasValue");
        expect(CORE).toHaveMethod("hasValues");
    });

    it("CORE.contains(array, item)", function() {

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

        expect(CORE.contains(test_array, 0))
            .toBe(false);

        expect(CORE.contains(test_array, 'key'))
            .toBe(true);

        expect(CORE.contains(test_array, void 0))
            .toBe(true);
    });

    it("CORE.isArray(array)", function() {

        expect(CORE.isArray([]))
            .toBe(true);

        expect(CORE.isArray(Array()))
            .toBe(true);

        expect(CORE.isArray({}))
            .toBe(false);
    });

    it("CORE.isObject(object)", function() {

        expect(CORE.isObject([]))
            .toBe(false);

        expect(CORE.isObject(Array()))
            .toBe(false);

        expect(CORE.isObject(function(){}))
            .toBe(false);

        expect(CORE.isObject({}))
            .toBe(true);
    });

    it("CORE.isBlank(array)", function() {

        expect(CORE.isBlank([]))
            .toBe(false);

        expect(CORE.isBlank(Array()))
            .toBe(false);

        expect(CORE.isBlank({}))
            .toBe(false);

        expect(CORE.isBlank(0))
            .toBe(false);

        expect(CORE.isBlank(""))
            .toBe(true);

        expect(CORE.isBlank(String()))
            .toBe(true);
    });

    it("CORE.isEmpty(array)", function() {

        expect(CORE.isEmpty([]))
            .toBe(true);

        expect(CORE.isEmpty(Array()))
            .toBe(true);

        expect(CORE.hasKeys({}))
            .toBe(false);

        expect(CORE.isEmpty(0))
            .toBe(false);

        expect(CORE.isEmpty(""))
            .toBe(false);

        expect(CORE.isEmpty(String()))
            .toBe(false);
    });

    it("CORE.isDefined(*)", function() {

        expect(CORE.isDefined())
            .toBe(false);

        expect(CORE.isDefined(void 0))
            .toBe(false);

        expect(CORE.isDefined(null))
            .toBe(true);

        expect(CORE.isDefined(""))
            .toBe(true);

        expect(CORE.isDefined(0))
            .toBe(true);

        expect(CORE.isDefined(false))
            .toBe(true);

        expect(CORE.isDefined(NaN))
            .toBe(true);
    });

    it("CORE.isType(*)", function() {

        expect(CORE.isType())
            .toBe(false);

        expect(CORE.isType(void 0))
            .toBe(false);

        expect(CORE.isType(null))
            .toBe(true);

        expect(CORE.isType(""))
            .toBe(true);

        expect(CORE.isType(0))
            .toBe(true);

        expect(CORE.isType(false))
            .toBe(true);

        expect(CORE.isType(NaN))
            .toBe(true);
    });

    it("CORE.isString(*)", function() {

        expect(CORE.isString())
            .toBe(false);

        expect(CORE.isString(void 0))
            .toBe(false);

        expect(CORE.isString(null))
            .toBe(false);

        expect(CORE.isString(""))
            .toBe(true);

        expect(CORE.isString(0))
            .toBe(false);

        expect(CORE.isString(false))
            .toBe(false);

        expect(CORE.isString(NaN))
            .toBe(false);
    });

    it("CORE.isNumber(*)", function() {

        expect(CORE.isNumber())
            .toBe(false);

        expect(CORE.isNumber(void 0))
            .toBe(false);

        expect(CORE.isNumber(null))
            .toBe(false);

        expect(CORE.isNumber("0"))
            .toBe(false);

        expect(CORE.isNumber(0))
            .toBe(true);

        expect(CORE.isNumber(false))
            .toBe(false);

        expect(CORE.isNumber(NaN))
            .toBe(true);
    });

    it("CORE.isBoolean(*)", function() {

        expect(CORE.isBoolean())
            .toBe(false);

        expect(CORE.isBoolean(void 0))
            .toBe(false);

        expect(CORE.isBoolean(null))
            .toBe(false);

        expect(CORE.isBoolean("0"))
            .toBe(false);

        expect(CORE.isBoolean(0))
            .toBe(false);

        expect(CORE.isBoolean(false))
            .toBe(true);

        expect(CORE.isBoolean(NaN))
            .toBe(false);
    });

    it("CORE.isCollection(*)", function() {

        expect(CORE.isCollection())
            .toBe(false);

        expect(CORE.isCollection([CORE.queryOne('.ul_li'), CORE.queryOne('.ul_li')]))
            .toBe(false);

        expect(CORE.isCollection(CORE.query('.ul_li')))
            .toBe(true);
    });

    it("CORE.isNode(*)", function() {

        expect(CORE.isNode())
            .toBe(false);

        expect(CORE.isNode(CORE.queryOne('.ul_li')))
            .toBe(true);

        expect(CORE.isNode(CORE.query('.ul_li')))
            .toBe(false);
    });

    it("CORE.hasValue(*)", function() {

        expect(CORE.hasValue())
            .toBe(false);

        expect(CORE.hasValue(void 0))
            .toBe(false);

        expect(CORE.hasValue(null))
            .toBe(false);

        expect(CORE.hasValue(""))
            .toBe(true);

        expect(CORE.hasValue(0))
            .toBe(true);

        expect(CORE.hasValue(false))
            .toBe(true);

        expect(CORE.hasValue(NaN))
            .toBe(false);
    });

    it("CORE.hasValues(*)", function() {

        expect(CORE.hasValues([]))
            .toBe(false);

        expect(CORE.hasValues({}))
            .toBe(false);

        expect(CORE.hasValues([1]))
            .toBe(true);

        expect(CORE.hasValues({a: 1}))
            .toBe(false);

        expect(CORE.hasValues(Array(1)))
            .toBe(false);

        expect(CORE.hasValues([false]))
            .toBe(true);

        expect(CORE.hasValues([NaN]))
            .toBe(false);

        expect(CORE.hasValues([,,,]))
            .toBe(false);
    });
});
