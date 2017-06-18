# Model Validation

```javascript
var Record = MODEL.register('Record', (function(){

    function RecordClass(data){

        this.id = data.id;
        this.name = data.name;
    }
    
    /* Define Model Validation */

    RecordClass.prototype.validate = function(){
        
        return this.id >= 0;
    };
    
    return RecordClass;
})());
```

Once a validation has been defined to its model, each write process of a model executes the validation and skip persistent modifications if an invalidation occurs. You are also able to perform validations directly:

```javascript
var record = MODEL.Record.create({

    id: -1,
    name: 'foobar'
});

console.log(record.validate()); // -> ["Model Validation failed"]
console.log(record.isValid()); // -> false
```

> __Note:__ Calling `.validate()` returns an ___array___ of error strings. If the returned array is empty all validations perform successfully. You may prefer using the model helper `.isValid()` which returns a ___boolean___.

#### Multiple Validations

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
    name: ""
});

console.log(record.validate()); // -> ["Record has valid ID", "Record has valid Name"]
console.log(record.isValid()); // -> false
```

# Form Validation

Built-in Types:

* integer, int
* numeric, num
* text, txt
* float, decimal, dec
* alphanumeric, anum
* filename, file
* url
* email

Additional Options:

* min
* max
* charset
* regex

### Examples

```html
<input class="form-validate"
       type="number"
       value="35"
       data-validate-type="integer"
       data-validate-min="1"
       data-validate-max="99"> <!-- min/max: numeric value -->
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
       data-validate-min="5"
       data-validate-max="5"> <!-- min/max: text length -->
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

> __Note:__ Custom regex definitions from above will be performed as `new Regex(/[A-Z]/, 'g')` internally.

### Register Custom Validation Types

Define Validation:

```js
APP.VALIDATE['whitespace'] = function(value){
    
    return value.indexOf(' ') === -1;
};
```

Usage:

```html
<input class="form-validate" 
       type="text" 
       value="x_o_n_e"
       data-validate-type="whitespace">
```
