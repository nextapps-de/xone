describe("Check DOM States", function() {

    it("Check if core contains all required functions", function() {

        expect(CORE).toHaveMethod("getById");
        expect(CORE).toHaveMethod("getValue");
        expect(CORE).toHaveMethod("setValue");
    });

    it("Check CORE.getById()", function() {

        expect(CORE.getById('test_wrapper'))
        .toBe(document.getElementById('test_wrapper'));

        // Check Cache
        expect(CORE.getById('test_wrapper'))
        .toBe(document.getElementById('test_wrapper'));
    });

    it("Check CORE.getByClass()", function() {

        expect(CORE.getByClass('scroll-to-top')[0])
        .toBe(document.getElementsByClassName('test_wrapper')[0]);

        expect(CORE.getByClass('scroll-to-top', CORE.getById('view-discover'))[0])
        .toBe(document.getElementsByClassName('test_wrapper', document.getElementById('view-discover'))[0]);
    });

    it("Check CORE.setValue()", function() {

        CORE.setValue('#test_wrapper', 'test');
        expect(CORE.getById('test_wrapper').value)
        .toBe("test");
    });

    it("Check CORE.getValue()", function() {

        CORE.getById('test_wrapper').value = 'test';
        expect(CORE.getValue('#test_wrapper'))
        .toBe("test");
    });
});
