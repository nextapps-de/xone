describe("Check Model Implementation", function(){

    // var ENABLE_MODEL_CACHE;
    //
    // beforeEach(function() {
    //
    //     ENABLE_MODEL_CACHE = CONFIG.ENABLE_MODEL_CACHE;
    //     CONFIG.ENABLE_MODEL_CACHE = false;
    // });
    //
    // afterEach(function() {
    //
    //     CONFIG.ENABLE_MODEL_CACHE = ENABLE_MODEL_CACHE;
    // });

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

        expect(APP.MODEL.TestRecord3.find(model.id)).toBe(model);
        expect(APP.MODEL.TestRecord3.findBy('id', model.id)).toBe(model);
        expect(APP.MODEL.TestRecord3.where('id', model.id)[0]).toBe(model);
        expect(APP.MODEL.TestRecord3.where({id: model.id})[0]).toBe(model);

        APP.MODEL.TestRecord3.delete(model.id);

        expect(APP.MODEL.TestRecord3.count()).toBe(0);
        expect(APP.MODEL.TestRecord3.all().length).toBe(0);

        model = APP.MODEL.TestRecord3.create({id: Math.random(), name: 'foobar', version: 1});
        expect(APP.MODEL.TestRecord3.count()).toBe(1);

        APP.MODEL.TestRecord3.delete(model);

        expect(APP.MODEL.TestRecord3.count()).toBe(0);
        expect(APP.MODEL.TestRecord3.all().length).toBe(0);

        model = APP.MODEL.TestRecord3.create({id: Math.random(), name: 'foobar', version: 1});
        expect(APP.MODEL.TestRecord3.count()).toBe(1);

        var node = document.createElement('div');
        node.setAttribute('data-id', model.id);

        expect(APP.MODEL.TestRecord3.find(node)).toBe(model);

        node = document.createElement('div');
        node.dataset.id = model.id;

        APP.MODEL.TestRecord3.delete(node);

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

    it("Check if model is created (1/2)", function(done){

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

            test_record = APP.MODEL.TestRecord.new(test_record);
            test_record = APP.MODEL.TestRecord.new({id: test_record.id, version: 'version', name: 'name'});
            test_record = APP.MODEL.TestRecord.new(test_record);

            CORE.stack(function(){

                expect(test_record).toBeDefined();
                expect(test_record.version).toBe('version');
                expect(APP.MODEL.TestRecord.count()).toBe(0);
                expect(APP.MODEL.TestRecord.all().length).toBe(0);

                done();
            });
        });
    });

    it("Check if model is created (2/2)", function(done){

        expect(APP.MODEL.TestRecord.count()).toBe(0);
        expect(APP.MODEL.TestRecord.all().length).toBe(0);

        var test_record = APP.MODEL.new('TestRecord', {

            id: Math.random(),
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_record).toBeDefined();
            expect(test_record.version).toBe('version');
            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            test_record = APP.MODEL.new('TestRecord', test_record);
            test_record = APP.MODEL.new('TestRecord', {id: test_record.id, version: 'version', name: 'name'});
            test_record = APP.MODEL.new('TestRecord', test_record);

            CORE.stack(function(){

                expect(test_record).toBeDefined();
                expect(test_record.version).toBe('version');
                expect(APP.MODEL.TestRecord.count()).toBe(0);
                expect(APP.MODEL.TestRecord.all().length).toBe(0);

                done();
            });
        });
    });

    it("Check if model is created and saved (1/2)", function(done){

        APP.MODEL.register('TestRecord', ['id', 'version', 'name']);

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

            test_record = APP.MODEL.TestRecord.create(test_record);
            test_record = APP.MODEL.TestRecord.create({id: test_record.id, version: 'version', name: 'name'});
            test_record = APP.MODEL.TestRecord.create(test_record);

            CORE.stack(function(){

                expect(test_record).toBeDefined();
                expect(test_record.version).toBe('version');
                expect(APP.MODEL.TestRecord.count()).toBe(1);
                expect(APP.MODEL.TestRecord.all().length).toBe(1);

                APP.MODEL.TestRecord.deleteAll();

                expect(APP.MODEL.TestRecord.count()).toBe(0);
                expect(APP.MODEL.TestRecord.all().length).toBe(0);

                done();
            });
        });
    });

    it("Check if model is created and saved (2/2)", function(done){

        var test_record = APP.MODEL.create('TestRecord', {

            id: Math.random(),
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_record).toBeDefined();
            expect(test_record.version).toBe('version');
            expect(APP.MODEL.TestRecord.count()).toBe(1);
            expect(APP.MODEL.TestRecord.all().length).toBe(1);

            test_record = APP.MODEL.create('TestRecord', test_record);
            test_record = APP.MODEL.create('TestRecord', {id: test_record.id, version: 'version', name: 'name'});
            test_record = APP.MODEL.create('TestRecord', test_record);

            CORE.stack(function(){

                expect(test_record).toBeDefined();
                expect(test_record.version).toBe('version');
                expect(APP.MODEL.TestRecord.count()).toBe(1);
                expect(APP.MODEL.TestRecord.all().length).toBe(1);

                APP.MODEL.TestRecord.deleteAll();

                expect(APP.MODEL.TestRecord.count()).toBe(0);
                expect(APP.MODEL.TestRecord.all().length).toBe(0);

                done();
            });
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

            APP.MODEL.TestRecord.deleteAll();

            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            done();
        });
    });

    it("Check if multiple models was created", function(done){

        var test_records = APP.MODEL.TestRecord.new([{

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

        CORE.stack(function(){

            expect(test_records).toBeDefined();
            expect(test_records.length).toBe(3);
            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            APP.MODEL.TestRecord.deleteAll();

            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            done();
        });
    });

    it("Check if multiple models was created and saved (1/2)", function(done){

        var test_records = APP.MODEL.TestRecord.create([{

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

        CORE.stack(function(){

            expect(test_records).toBeDefined();
            expect(test_records.length).toBe(3);
            expect(APP.MODEL.TestRecord.count()).toBe(3);
            expect(APP.MODEL.TestRecord.all().length).toBe(3);

            APP.MODEL.TestRecord.deleteAll();

            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            done();
        });
    });

    it("Check if multiple models was created and saved (2/2)", function(done){

        var test_records = APP.MODEL.TestRecord.createFromList([{

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

        CORE.stack(function(){

            expect(test_records).toBeDefined();
            expect(test_records.length).toBe(3);
            expect(APP.MODEL.TestRecord.count()).toBe(3);
            expect(APP.MODEL.TestRecord.all().length).toBe(3);

            APP.MODEL.TestRecord.deleteAll();

            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            done();
        });
    });

    it("Check if sub-model was created", function(done){

        var test_record_sub = APP.MODEL.TestRecord.new({

            id: Math.random(),
            version: 'version',
            name: 'name'
        });

        APP.MODEL.register('TestRecordExtended', ['id', 'version', 'record', 'name']);

        var test_record_extended = APP.MODEL.TestRecordExtended.new({

            id: Math.random(),
            record: test_record_sub,
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_record_sub).toBeDefined();
            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            expect(test_record_extended).toBeDefined();
            expect(APP.MODEL.TestRecordExtended.count()).toBe(0);
            expect(APP.MODEL.TestRecordExtended.all().length).toBe(0);

            expect(test_record_extended.record).toEqual(test_record_sub);

            APP.MODEL.TestRecord.deleteAll();
            APP.MODEL.TestRecordExtended.deleteAll();

            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            expect(APP.MODEL.TestRecordExtended.count()).toBe(0);
            expect(APP.MODEL.TestRecordExtended.all().length).toBe(0);

            done();
        });
    });

    it("Check if sub-model was created and saved", function(done){

        var test_record_sub = APP.MODEL.TestRecord.create({

            id: Math.random(),
            version: 'version',
            name: 'name'
        });

        APP.MODEL.register('TestRecordExtended', ['id', 'version', 'record', 'object', 'name']);

        var test_record_extended = APP.MODEL.TestRecordExtended.create({

            id: Math.random(),
            record: test_record_sub,
            object: {
                version: 'version',
                name: 'name'
            },
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_record_sub).toBeDefined();
            expect(APP.MODEL.TestRecord.count()).toBe(1);
            expect(APP.MODEL.TestRecord.all().length).toBe(1);

            expect(test_record_extended).toBeDefined();
            expect(APP.MODEL.TestRecordExtended.count()).toBe(1);
            expect(APP.MODEL.TestRecordExtended.all().length).toBe(1);

            expect(test_record_extended.record).toEqual(test_record_sub);

            APP.MODEL.TestRecord.deleteAll();
            APP.MODEL.TestRecordExtended.deleteAll();

            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.all().length).toBe(0);

            expect(APP.MODEL.TestRecordExtended.count()).toBe(0);
            expect(APP.MODEL.TestRecordExtended.all().length).toBe(0);

            done();
        });
    });

    it("Check if multiple sub-models was created and saved", function(done){

        var test_records_sub = APP.MODEL.TestRecord.createFromList([{

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

        APP.MODEL.register('TestRecordExtended', ['id', 'version', 'records', 'name']);

        var test_record_extended = APP.MODEL.TestRecordExtended.create({

            id: Math.random(),
            records: test_records_sub,
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_records_sub).toBeDefined();
            expect(APP.MODEL.TestRecord.count()).toBe(3);
            expect(APP.MODEL.TestRecord.all().length).toBe(3);

            expect(test_record_extended).toBeDefined();
            expect(APP.MODEL.TestRecordExtended.count()).toBe(1);
            expect(APP.MODEL.TestRecordExtended.all().length).toBe(1);

            expect(test_record_extended.records).toEqual(test_records_sub);

            APP.MODEL.TestRecord.deleteAll();
            APP.MODEL.TestRecordExtended.deleteAll();

            CORE.stack(function(){

                expect(APP.MODEL.TestRecord.count()).toBe(0);
                expect(APP.MODEL.TestRecord.all().length).toBe(0);

                expect(APP.MODEL.TestRecordExtended.count()).toBe(0);
                expect(APP.MODEL.TestRecordExtended.all().length).toBe(0);

                done();
            });
        });
    });

    it("Check if model was updated (1/3)", function(done){

        CONFIG.ENABLE_MODEL_CACHE = true;
        CONFIG.ENABLE_STORAGE_CACHE = true;
        CONFIG.ENABLE_MAPPER_CACHE = true;

        var test_record = APP.MODEL.TestRecord.create({

            id: Math.random(),
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_record).toBeDefined();
            expect(APP.MODEL.TestRecord.count()).toBe(1);
            expect(APP.MODEL.TestRecord.all().length).toBe(1);

            test_record.update({name: 'foobar'});
            expect(test_record.name).toBe('foobar');

            test_record.restore();
            expect(test_record.name).toBe('foobar');

            test_record.update('name', 'foobar1');
            expect(test_record.name).toBe('foobar1');

            CORE.stack(function(){

                expect(APP.MODEL.TestRecord.find(test_record.id)).toEqual(test_record);
                expect(APP.MODEL.TestRecord.findBy('name', 'foobar1')).toEqual(test_record);
                expect(APP.MODEL.TestRecord.where('name', 'foobar1')[0]).toEqual(test_record);
                expect(APP.MODEL.TestRecord.where({name: 'foobar1'})[0]).toEqual(test_record);

                APP.MODEL.TestRecord.deleteAll();
                expect(APP.MODEL.TestRecord.count()).toBe(0);

                CORE.stack(function(){

                    CONFIG.ENABLE_MODEL_CACHE = false;
                    CONFIG.ENABLE_STORAGE_CACHE = false;

                    done();
                });
            });
        });

        CONFIG.ENABLE_MODEL_CACHE = false;
        CONFIG.ENABLE_STORAGE_CACHE = false;
        CONFIG.ENABLE_MAPPER_CACHE = false;
    });

    it("Check if model was updated (2/3)", function(done){

        expect(APP.MODEL.TestRecord.count()).toBe(0);

        CONFIG.ENABLE_MODEL_CACHE = false;
        CONFIG.ENABLE_STORAGE_CACHE = false;
        CONFIG.ENABLE_MAPPER_CACHE = false;

        var test_record = APP.MODEL.TestRecord.create({

            id: Math.random(),
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_record).toBeDefined();
            expect(APP.MODEL.TestRecord.count()).toBe(1);
            expect(APP.MODEL.TestRecord.all().length).toBe(1);
            expect(test_record.name).toBe('name');

            test_record.update('name', 'foobar1');
            expect(test_record.name).toBe('foobar1');

            CORE.stack(function(){

                expect(APP.MODEL.TestRecord.find(test_record.id)).toEqual(test_record);
                expect(APP.MODEL.TestRecord.findBy('name', 'foobar1')).toEqual(test_record);
                expect(APP.MODEL.TestRecord.where('name', 'foobar1')[0]).toEqual(test_record);
                expect(APP.MODEL.TestRecord.where({name: 'foobar1'})[0]).toEqual(test_record);

                APP.MODEL.TestRecord.deleteAll();
                expect(APP.MODEL.TestRecord.count()).toBe(0);

                done();
            });
        });
    });

    it("Check if model was updated (3/3)", function(done){

        expect(APP.MODEL.TestRecord.count()).toBe(0);

        var test_record = APP.MODEL.TestRecord.create({

            id: Math.random(),
            version: 'version',
            name: 'name'
        });

        CORE.stack(function(){

            expect(test_record).toBeDefined();
            expect(APP.MODEL.TestRecord.count()).toBe(1);
            expect(APP.MODEL.TestRecord.all().length).toBe(1);
            expect(test_record.name).toBe('name');

            APP.MODEL.TestRecord.update(test_record, 'name', 'foobar1');

            CORE.stack(function(){

                expect(APP.MODEL.TestRecord.find(test_record.id).name).toBe('foobar1');

                var node = document.createElement('div');
                node.dataset.id = test_record.id;

                APP.MODEL.TestRecord.update(node, 'name', 'foobar2');
                expect(APP.MODEL.TestRecord.find(test_record.id).name).toBe('foobar2');

                APP.MODEL.TestRecord.deleteAll();
                expect(APP.MODEL.TestRecord.count()).toBe(0);

                done();
            });
        });
    });

    it("Check if model found by like", function(done){

        CONFIG.ENABLE_MODEL_CACHE = true;
        CONFIG.ENABLE_STORAGE_CACHE = false;
        CONFIG.ENABLE_MAPPER_CACHE = true;

        expect(APP.MODEL.TestRecord.count()).toBe(0);

        var test_records = APP.MODEL.TestRecord.newFromList([{

            id: Math.random(),
            version: 'Version',
            name: 'name'
        },{
            id: Math.random(),
            version: 'veRSion',
            name: 'name'
        },{
            id: Math.random(),
            version: 'VERSION',
            name: 'name'
        },{
            id: Math.random(),
            version: '_VERSION_',
            name: 'name'
        }]);

        CORE.stack(function(){

            expect(test_records.length).toBe(4);
            expect(APP.MODEL.TestRecord.count()).toBe(0);
            expect(APP.MODEL.TestRecord.where({version: 'version'}).length).toBe(0);
            expect(APP.MODEL.TestRecord.like({version: 'version'}).length).toBe(0);

            APP.MODEL.TestRecord.saveAll(test_records);

            CORE.stack(function(){

                expect(APP.MODEL.TestRecord.count()).toBe(4);
                expect(APP.MODEL.TestRecord.where({version: 'version'}).length).toBe(0);
                expect(APP.MODEL.TestRecord.like({version: 'version'}).length).toBe(3);
                expect(APP.MODEL.TestRecord.like({version: 'version'})).toContain(test_records[0]);
                expect(APP.MODEL.TestRecord.like({version: 'version'})).toContain(test_records[1]);
                expect(APP.MODEL.TestRecord.like({version: 'version'})).toContain(test_records[2]);
                expect(APP.MODEL.TestRecord.like({version: 'version'})).not.toContain(test_records[3]);

                APP.MODEL.TestRecord.updateAll(test_records, 'version', 'version');
                expect(APP.MODEL.TestRecord.where({version: 'version'}).length).toBe(4);

                CORE.stack(function(){

                    APP.MODEL.TestRecord.deleteAll('version', 'version');
                    expect(APP.MODEL.TestRecord.count()).toBe(0);

                    CONFIG.ENABLE_MODEL_CACHE = false;
                    CONFIG.ENABLE_STORAGE_CACHE = false;
                    CONFIG.ENABLE_MAPPER_CACHE = false;

                    done();
                });
            });
        });
    });

    it("Check if invalid model was not created", function(){

        expect(APP.MODEL.TestRecord.count()).toBe(0);

        var test_record = APP.MODEL.TestRecord.new({

            id: '',
            version: 'Version',
            name: 'name'
        });

        expect(APP.MODEL.TestRecord.count()).toBe(0);
        expect(test_record.id).toBe('');

        test_record = APP.MODEL.TestRecord.create({

            id: '',
            version: 'Version',
            name: 'name'
        });

        expect(APP.MODEL.TestRecord.count()).toBe(0);
        expect(test_record.id).toBe('');

        DEBUG = true;
        spyOn(CORE.console, 'warn');
        test_record.save();
        DEBUG = false;

        expect(CORE.console.warn).toHaveBeenCalled();
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
