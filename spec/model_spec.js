describe("Check Model Implementation", function() {

    it("Check if model is registered", function() {

        expect(APP).toHaveObject("MODEL");
        expect(APP.MODEL).toHaveMethod("register");
        expect(APP.MODEL.constructor.prototype).toHaveMethod("register");
        expect(APP.MODEL.TestRecord).toBeUndefined();

        (function registerModel(MODEL) {

            MODEL.TestRecord = MODEL.register('TestRecord', (function () {

                function ClassTestRecord(data) {

                    this.id = data.id;
                    this.version = data.version;
                    this.name = data.name;
                }

                ClassTestRecord.prototype.modelPrototype = function () {

                    return "ModelPrototype";
                };

                return ClassTestRecord;

            })());

            MODEL.TestRecord.modelHelper = function () {

                return "ModelHelper";
            };

        })(APP.MODEL);

        expect(APP.MODEL.TestRecord).toBeDefined();
        expect(APP.MODEL.TestRecord.modelHelper).toBeDefined();
        expect(APP.MODEL.TestRecord.modelHelper()).toBe("ModelHelper");
    });

    it("Check if model is created", function(done) {

        expect(APP.MODEL.TestRecord.count()).toBe(0);
        expect(APP.MODEL.TestRecord.all().length).toBe(0);

        var test_record = APP.MODEL.TestRecord.new({

            id: Math.random(),
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_record).toBeDefined();
            expect(test_record.version).toBe('version');
            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            done();
        });
    });

    it("Check if model is created and saved", function(done) {

        var test_record = APP.MODEL.TestRecord.create({

            id: Math.random(),
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_record).toBeDefined();
            expect(test_record.version).toBe('version');
            expect(APP.MODEL.TestRecord.count()).toBe(1);
            expect(APP.MODEL.TestRecord.all().length).toBe(1);
            expect(APP.MODEL.TestRecord.all()[0].modelPrototype()).toBe("ModelPrototype");

            APP.MODEL.TestRecord.deleteAll();

            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            done();
        });
    });

    it("Check if model is created and saved (Alternative 1)", function(done) {

        var test_record = APP.MODEL.TestRecord.new({

            id: Math.random(),
            version: 'version',
            name: 'name'

        }).save(true);

        CORE.stack(function(){

            expect(test_record).toBeDefined();
            expect(test_record.version).toBe('version');
            expect(APP.MODEL.TestRecord.count()).toBe(1);
            expect(APP.MODEL.TestRecord.all().length).toBe(1);
            expect(APP.MODEL.TestRecord.all()[0].modelPrototype()).toBe("ModelPrototype");

            APP.MODEL.TestRecord.deleteAll();

            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            done();
        });
    });

    it("Check if model is created and saved (Alternative 2)", function(done) {

        var test_record = APP.MODEL.TestRecord.new({

            id: Math.random(),
            version: 'version',
            name: 'name'

        }, true);

        CORE.stack(function(){

            expect(test_record).toBeDefined();
            expect(test_record.version).toBe('version');
            expect(APP.MODEL.TestRecord.count()).toBe(1);
            expect(APP.MODEL.TestRecord.all().length).toBe(1);
            expect(APP.MODEL.TestRecord.all()[0].modelPrototype()).toBe("ModelPrototype");

            APP.MODEL.TestRecord.deleteAll();

            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            done();
        });
    });
});
