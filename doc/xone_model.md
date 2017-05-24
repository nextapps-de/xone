# Xone Active Model

#### Define Model
*app/js/model/record.js*
```javascript
var Record = MODEL.register('Record', (function(){

    /**
     * @constructor
     * @param {Object<string, *>} data
     * @struct
     */

    function RecordClass(data){

        this.id = data.id;
        this.title = data.title;
        this.date = data.date;
        
        /* A model can include further models */

        this.user = MODEL.User.new(data.user);
        this.image = MODEL.Media.new(data.image);
    }
    
    /* Define Prototype (Shared Functions) */
    
    RecordClass.prototype.showID = function(){
        
        console.log(this.id); // 'this' points to a record
    };
    
    return RecordClass;
})());

/* Define Helpers: */

Record.msg = function(str){

    console.log(str);
};

Record.helperID = function(record){

    this.msg(record.id); // 'this' points to the corresponding model class of a record
};
```
#### Prototypes VS. Helpers
The decision of where the method has to be defined is simple: if the method deals with a record you should use prototype (where 'this' points to a record), if the method deals with the model you should define it as a helper (where 'this' points to a model). 

#### Working with Active Models

Create from passed params
```javascript
var record = MODEL.Record.new({
    id: 1,
    title: 'record',
    date: new Date()
});
```
Same as:
```javascript
var record = MODEL.new('Record', {
    id: 1,
    title: 'record',
    date: new Date()
});
```
Call methods:
```javascript
// call the prototype method from the example above:
record.showID(); // --> 1

// call the model helper method from the example above:
MODEL.Record.helperID(record); // --> 1
```

Edit and saves the model to the storage:
```javascript
Record.title = 'New title';
Record.save();
```

Find a model
```javascript
// find by id;
var record = MODEL.Record.find(8);

// find by one custom attribute;
var record = MODEL.Record.findBy('title', 'My Record');
```

Find multiple models by a custom query;
```javascript
var result = MODEL.Record.where({
    visibility: 'public'
});
```

Find multiple models by a custom filter;
```javascript
var result = MODEL.Record.where(function(){
    return this.start > 123673242 && this.end < 123774241;
});
```

Find multiple models by a like-query;
```javascript
var result = MODEL.Record.like({
    visibility: ' PuBLic ' // --> matches 'public'
});
```

Get all entries from a model:
```javascript
var all_records = MODEL.Record.all();
```

Get entries count from a model:
```javascript
var count = MODEL.Record.count();
```

Get ranged entries from a model:
```javascript
var result = MODEL.Record.range(3);    // max 3
var result = MODEL.Record.range(0, 3); // 0, 1 and 2
```

Update entry and save to storage:
```javascript
var record = MODEL.Record.find(8).update({title: 'New Title'}).save();
```

Delete entry: (will also delete from storage)
```javascript
MODEL.Record.find(8).delete();
```

Sorting models by a custom filter:
```javascript
MODEL.Record.sort(function(a, b){
    return a.date > b.date;
});
```

Batch through a list:
```javascript
MODEL.Record.newFromList([/* Array of Record Params */]);
MODEL.Record.createFromList([/* Array of Record Params */]);
MODEL.Record.uppdateAll([/* Array of Records */], { date: new Date() });
MODEL.Record.saveAll([/* Array of Records */]);
MODEL.Record.deleteAll([/* Array of Records */]);
```
