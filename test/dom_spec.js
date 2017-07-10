describe("Check DOM States", function() {

    var toArray = function(list){

        var array = new Array(list.length);

        for(var i = 0; i < list.length; i++){

            array[i] = list[i];
        }

        return array;
    };

    it("Check if core contains all required functions", function() {

        expect(CORE).toHaveMethod("query");
        expect(CORE).toHaveMethod("getById");
        expect(CORE).toHaveMethod("getByClass");
        expect(CORE).toHaveMethod("getByTag");
        expect(CORE).toHaveMethod("getValue");
        expect(CORE).toHaveMethod("setValue");
    });

    it("Check CORE.query()", function() {

        expect(CORE.query('#test_wrapper'))
            .toBe(document.getElementById('test_wrapper'));

        // Check Cache
        expect(CORE.query('#test_wrapper'))
            .toBe(document.getElementById('test_wrapper'));

        expect(toArray(CORE.query('ul')))
            .toEqual(toArray(document.querySelectorAll('ul')));

        expect(toArray(CORE.query('.ul_li')))
            .toEqual(toArray(document.querySelectorAll('.ul_li')));

        expect(toArray(CORE.query('#test_wrapper ul')))
            .toEqual(toArray(document.querySelectorAll('#test_wrapper ul')));

        expect(toArray(CORE.query('#test_wrapper .ul_li')))
            .toEqual(toArray(document.querySelectorAll('#test_wrapper .ul_li')));

        expect(toArray(CORE.query('#test_wrapper ul.ul_li')))
            .toEqual(toArray(document.querySelectorAll('#test_wrapper ul.ul_li')));

        expect(toArray(CORE.query('#test_wrapper ul li.ul_li')))
            .toEqual(toArray(document.querySelectorAll('#test_wrapper ul li.ul_li')));

        expect(toArray(CORE.query('#test_wrapper ul.ul_li')))
            .toEqual(toArray(document.querySelectorAll('#test_wrapper ul.ul_li')));
    });

    it("Check CORE.getById()", function() {

        expect(CORE.getById('test_wrapper'))
        .toBe(document.getElementById('test_wrapper'));

        // Check Cache
        expect(CORE.getById('test_wrapper'))
        .toBe(document.getElementById('test_wrapper'));
    });

    it("Check CORE.getByClass()", function() {

        expect(CORE.getByClass('ul_li')[0])
            .toBe(document.getElementsByClassName('ul_li')[0]);

        expect(CORE.getByClass('ul_li', CORE.getById('test_content'))[0])
            .toBe(document.getElementById('test_content').getElementsByClassName('ul_li')[0]);
    });

    it("Check CORE.getByTag()", function() {

        expect(CORE.getByTag('ul')[0])
            .toBe(document.getElementsByTagName('ul')[0]);

        expect(CORE.getByTag('ul', CORE.getById('test_content'))[0])
            .toBe(document.getElementById('test_content').getElementsByTagName('ul')[0]);
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
