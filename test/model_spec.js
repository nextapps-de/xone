describe("Check Model Implementation", function(){

    it("Check if model is registered", function(){

        expect(APP).toHaveObject("MODEL");
        expect(APP.MODEL).toHaveMethod("register");
        expect(APP.MODEL.constructor.prototype).toHaveMethod("register");
        expect(APP.MODEL.TestRecord).toBeUndefined();

        (function registerModel(MODEL){

            MODEL.TestRecord = MODEL.register('TestRecord', (function(){

                function ClassTestRecord(data){

                    this.id = data.id;
                    this.version = data.version;
                    this.name = data.name;
                }

                ClassTestRecord.prototype.modelPrototype = function(){

                    return "ModelPrototype";
                };

                return ClassTestRecord;

            })());

            MODEL.TestRecord.modelHelper = function(){

                return "ModelHelper";
            };

        })(APP.MODEL);

        expect(APP.MODEL.TestRecord).toBeDefined();
        expect(APP.MODEL.TestRecord.modelHelper).toBeDefined();
        expect(APP.MODEL.TestRecord.modelHelper()).toBe("ModelHelper");
    });

    it("Check if model is registered", function(){

        expect(APP.MODEL.TestRecord2).toBeUndefined();

        APP.MODEL.TestRecord2 = APP.MODEL.register('TestRecord2', ['id', 'version', 'name']);

        expect(APP.MODEL.TestRecord2).toBeDefined();

        APP.MODEL.TestRecord2.deleteAll();

        var model = APP.MODEL.TestRecord2.new();

        expect(Object.keys(model)).toEqual(['id', 'version', 'name']);
        expect(APP.MODEL.TestRecord2.count()).toBe(0);
        expect(APP.MODEL.TestRecord2.all().length).toBe(0);

        var model = APP.MODEL.TestRecord2.create();

        expect(Object.keys(model)).toEqual(['id', 'version', 'name']);
        expect(APP.MODEL.TestRecord2.count()).toBe(0);
        expect(APP.MODEL.TestRecord2.all().length).toBe(0);

        var model = APP.MODEL.TestRecord2.new({id: 0});

        expect(Object.keys(model)).toEqual(['id', 'version', 'name']);
        expect(APP.MODEL.TestRecord2.count()).toBe(0);
        expect(APP.MODEL.TestRecord2.all().length).toBe(0);

        var model = APP.MODEL.TestRecord2.create({id: Math.random(), name: 'foobar'});

        expect(Object.keys(model)).toEqual(['id', 'version', 'name']);
        expect(APP.MODEL.TestRecord2.count()).toBe(1);
        expect(APP.MODEL.TestRecord2.count("name", "foobar")).toBe(1);
        expect(APP.MODEL.TestRecord2.all().length).toBe(1);

        APP.MODEL.TestRecord2.deleteAll();

        expect(APP.MODEL.TestRecord2.count()).toBe(0);
        expect(APP.MODEL.TestRecord2.all().length).toBe(0);
    });

    it("Check if model is registered (ENABLE_MODEL_CACHE = true)", function(){

        expect(APP.MODEL.TestRecord3).toBeUndefined();

        CONFIG.ENABLE_MODEL_CACHE = true;

        APP.MODEL.TestRecord3 = APP.MODEL.register('TestRecord3', {

            id: true,
            version: false,
            name: true
        });

        expect(APP.MODEL.TestRecord3).toBeDefined();

        var model = APP.MODEL.TestRecord3.create({id: Math.random(), name: 'foobar', version: 1});

        expect(Object.keys(model)).toEqual(['id', 'version', 'name']);
        expect(APP.MODEL.TestRecord3.count()).toBe(1);
        expect(APP.MODEL.TestRecord3.count("name", "foobar")).toBe(1);
        expect(APP.MODEL.TestRecord3.count("version", 1)).toBe(1);
        expect(APP.MODEL.TestRecord3.count("version", void 0)).toBe(0);
        expect(APP.MODEL.TestRecord3.all().length).toBe(1);

        APP.MODEL.TestRecord3.deleteAll();

        expect(APP.MODEL.TestRecord3.count()).toBe(0);
        expect(APP.MODEL.TestRecord3.all().length).toBe(0);

        CONFIG.ENABLE_MODEL_CACHE = false;
    });

    it("Check if model is registered (ENABLE_MODEL_CACHE = false)", function(){

        expect(APP.MODEL.TestRecord4).toBeUndefined();

        CONFIG.ENABLE_MODEL_CACHE = false;

        APP.MODEL.TestRecord4 = APP.MODEL.register('TestRecord4', {

            id: true,
            version: false,
            name: true
        });

        expect(APP.MODEL.TestRecord4).toBeDefined();

        var model = APP.MODEL.TestRecord4.create({id: Math.random(), name: 'foobar', version: 1});

        expect(Object.keys(model)).toEqual(['id', 'version', 'name']);
        expect(APP.MODEL.TestRecord4.count()).toBe(1);
        expect(APP.MODEL.TestRecord4.count("name", "foobar")).toBe(1);
        expect(APP.MODEL.TestRecord4.count("version", 1)).toBe(0);
        expect(APP.MODEL.TestRecord4.count("version", void 0)).toBe(1);
        expect(APP.MODEL.TestRecord4.all().length).toBe(1);

        APP.MODEL.TestRecord4.deleteAll();

        expect(APP.MODEL.TestRecord4.count()).toBe(0);
        expect(APP.MODEL.TestRecord4.all().length).toBe(0);
    });

    it("Check if model is created", function(done){

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

    it("Check if model is created and saved", function(done){

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

    it("Check if model is created and saved (Alternative 1)", function(done){

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

    it("Check if model is created and saved (Alternative 2)", function(done){

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

    it("Check model callbacks", function(){

        CONFIG.ENABLE_MODEL_CACHE = true;

        var check_str = "";

        (function registerModel(MODEL){

            MODEL.TestRecord = MODEL.register('TestRecord', (function(){

                function ClassTestRecord(data){

                    this.id = data.id;
                    this.version = data.version;
                    this.name = data.name;
                }

                ClassTestRecord.prototype.beforeUpdate = function(){
                    check_str += "beforeUpdate";
                };
                ClassTestRecord.prototype.beforeCreate = function(){
                    check_str += "beforeCreate";
                };
                ClassTestRecord.prototype.beforeSave = function(){
                    check_str += "beforeSave";
                };
                ClassTestRecord.prototype.beforeDelete = function(){
                    check_str += "beforeDelete";
                };
                ClassTestRecord.prototype.onCreate = function(){
                    check_str += "onCreate";
                };
                ClassTestRecord.prototype.onUpdate = function(){
                    check_str += "onUpdate";
                };
                ClassTestRecord.prototype.onSave = function(){
                    check_str += "onSave";
                };
                ClassTestRecord.prototype.onDelete = function(){
                    check_str += "onDelete";
                };

                return ClassTestRecord;

            })());

        })(APP.MODEL);

        expect(APP.MODEL.TestRecord).toBeDefined();
        expect(APP.MODEL.TestRecord.beforeUpdate).toBeUndefined();
        expect(APP.MODEL.TestRecord.beforeCreate).toBeUndefined();
        expect(APP.MODEL.TestRecord.Model.prototype.beforeUpdate).toBeDefined();
        expect(APP.MODEL.TestRecord.Model.prototype.beforeCreate).toBeDefined();

        //beforeCreate
        var model = APP.MODEL.TestRecord.new({

            id: Math.random(),
            version: 'version',
            name: 'name'
        });
        //onCreate

        //beforeUpdate
        model.update("name", "test");
        //onUpdate

        //beforeSave
        model.save();
        //onSave

        //beforeDelete
        model.delete();
        //onDelete

        expect(check_str).toBe([

            "beforeCreate",
            "onCreate",
            "beforeUpdate",
            "onUpdate",
            "beforeSave",
            "onSave",
            "beforeDelete",
            "onDelete"

        ].join(""));

        expect(APP.MODEL.TestRecord.count()).toBe(0);
        expect(APP.MODEL.TestRecord.all().length).toBe(0);

        check_str = "";

        //beforeCreate
        //beforeSave
        var models = APP.MODEL.TestRecord.create([{
            id: Math.random(),
            version: 'version',
            name: 'name'
        },{
            id: Math.random(),
            version: 'version',
            name: 'name'
        },{
            id: Math.random(),
            version: 'version',
            name: 'name'
        }]);
        //onSave
        //onCreate

        //beforeUpdate
        //beforeSave
        APP.MODEL.TestRecord.updateAll(APP.MODEL.TestRecord.all(), "name", "test1", true);
        //onSave
        //onUpdate

        //beforeDelete
        APP.MODEL.TestRecord.deleteAll();
        //onDelete

        expect(check_str).toBe([

            "beforeCreate",
            "beforeSave",
            "onSave",
            "onCreate",
            "beforeCreate",
            "beforeSave",
            "onSave",
            "onCreate",
            "beforeCreate",
            "beforeSave",
            "onSave",
            "onCreate",

            "beforeUpdate",
            "beforeSave",
            "onSave",
            "onUpdate",
            "beforeUpdate",
            "beforeSave",
            "onSave",
            "onUpdate",
            "beforeUpdate",
            "beforeSave",
            "onSave",
            "onUpdate",

            "beforeDelete",
            "onDelete",
            "beforeDelete",
            "onDelete",
            "beforeDelete",
            "onDelete"

        ].join(""));

        expect(APP.MODEL.TestRecord.count()).toBe(0);
        expect(APP.MODEL.TestRecord.all().length).toBe(0);

        CONFIG.ENABLE_MODEL_CACHE = false;
    });

    it("Check model callbacks", function(){

        CONFIG.ENABLE_MODEL_CACHE = true;

        var check_str = "";

        (function registerModel(MODEL){

            MODEL.TestRecord = MODEL.register('TestRecord', function ClassTestRecord(data){

                this.id = data.id;
                this.version = data.version;
                this.name = data.name;
            });

            MODEL.TestRecord.beforeUpdate = function(){
                check_str += "beforeUpdate";
            };
            MODEL.TestRecord.beforeCreate = function(){
                check_str += "beforeCreate";
            };
            MODEL.TestRecord.beforeSave = function(){
                check_str += "beforeSave";
            };
            MODEL.TestRecord.beforeDelete = function(){
                check_str += "beforeDelete";
            };
            MODEL.TestRecord.onCreate = function(){
                check_str += "onCreate";
            };
            MODEL.TestRecord.onUpdate = function(){
                check_str += "onUpdate";
            };
            MODEL.TestRecord.onSave = function(){
                check_str += "onSave";
            };
            MODEL.TestRecord.onDelete = function(){
                check_str += "onDelete";
            };

        })(APP.MODEL);

        expect(APP.MODEL.TestRecord).toBeDefined();
        expect(APP.MODEL.TestRecord.beforeUpdate).toBeDefined();
        expect(APP.MODEL.TestRecord.beforeCreate).toBeDefined();
        expect(APP.MODEL.TestRecord.Model.prototype.beforeUpdate).toBeUndefined();
        expect(APP.MODEL.TestRecord.Model.prototype.beforeCreate).toBeUndefined();

        //beforeCreate
        var model = APP.MODEL.TestRecord.new({

            id: Math.random(),
            version: 'version',
            name: 'name'
        });
        //onCreate

        //beforeUpdate
        model.update("name", "test");
        //onUpdate

        //beforeSave
        model.save();
        //onSave

        //beforeDelete
        model.delete();
        //onDelete

        expect(check_str).toBe([

            "beforeCreate",
            "onCreate",
            "beforeUpdate",
            "onUpdate",
            "beforeSave",
            "onSave",
            "beforeDelete",
            "onDelete"

        ].join(""));

        expect(APP.MODEL.TestRecord.count()).toBe(0);
        expect(APP.MODEL.TestRecord.all().length).toBe(0);

        check_str = "";

        //beforeCreate
        //beforeSave
        var models = APP.MODEL.TestRecord.create([{
            id: Math.random(),
            version: 'version',
            name: 'name'
        },{
            id: Math.random(),
            version: 'version',
            name: 'name'
        },{
            id: Math.random(),
            version: 'version',
            name: 'name'
        },{
            id: Math.random(),
            version: 'version',
            name: 'name'
        },{
            id: Math.random(),
            version: 'version',
            name: 'name'
        }]);
        //onSave
        //onCreate

        //beforeUpdate
        //beforeSave
        APP.MODEL.TestRecord.updateAll({"name": "test"}, true);
        //onSave
        //onUpdate

        //beforeDelete
        APP.MODEL.TestRecord.deleteAll();
        //onDelete

        expect(check_str).toBe([

            "beforeCreate",
            "beforeSave",
            "onSave",
            "onCreate",

            "beforeUpdate",
            "beforeSave",
            "onSave",
            "onUpdate",

            "beforeDelete",
            "onDelete"

        ].join(""));

        expect(APP.MODEL.TestRecord.count()).toBe(0);
        expect(APP.MODEL.TestRecord.all().length).toBe(0);

        CONFIG.ENABLE_MODEL_CACHE = false;
    });
});
