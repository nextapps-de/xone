# Xone Validation

> __Note:__ Work in progress.

## Model Validation

```javascript
var Record = MODEL.register('Record', (function(){

    function RecordClass(data){

        // ...
    }
    
    /* Define Model Validation */

    RecordClass.prototype.validate = function(){
        
        return this.id >= 0 ? true : false;
    };
    
    return RecordClass;
})());
```

Once a validation has been defined to its model, each write process of a model executes the validation and skip persistent modifications if an invalidation orccurs. You are also able to perform validations directly:

```javascript
var record = MODEL.Record.create({

    id: -1,
    name: 'foobar'
});

console.log(record.validate()); // -> false
```

#### Named Validations

```javascript
    
    /* Define Model Validation */

    RecordClass.prototype.validate = {
    
        'Record has valid ID': function(){
        
            return this.id >= 0;
        },
        
        'Record has valid Name': function(){
                
            return this.name.length ? true : false;
        }
    };
```

Example: 

```javascript
var record = MODEL.Record.create({

    id: -1,
    name: 'foobar'
});

console.log(record.validate()); // -> 'Failed: Record has valid ID', -> false
```


## Form Validation

Supported Built-in Types:

* "integer", "int"
* "numeric", "num"
* "text", "txt"
* "float", "decimal"
* "alphanumeric"
* "filename", "file"

### Examples

```html
<input class="form-validate" 
       type="number" 
       value="35"
       data-validate-type="integer" 
       data-validate-min="1"   <!-- minimum numeric value -->
       data-validate-max="99"> <!-- maximum numeric value -->
```

```html
<input class="form-validate" 
       type="number" 
       value="3.5"
       data-validate-type="float" 
       data-validate-min="-9.99"
       data-validate-max="+9.99">
```

```html
<input class="form-validate" 
       type="text" 
       value="A25i9"
       data-validate-type="alphanumeric"
       data-validate-min="5"  <!-- minimum text length -->
       data-validate-max="5"> <!-- maximum text length -->
```

```html
<input class="form-validate" 
       type="text" 
       value="ABabAc"
       data-validate-charset="ABCabc">
```

```html
<input class="form-validate" 
       type="text" 
       value="XONE"
       data-validate-regex="[A-Z]">
```

### Register Custom Validation Types

Define Validation:

```js
APP.VALIDATE['whitespace'] = function(value){
    
    return value.replace(/ /g, '_');
};
```

Usage:

```html
<input class="form-validate" 
       type="text" 
       value="x_o_n_e"
       data-validate-type="whitespace">
```
