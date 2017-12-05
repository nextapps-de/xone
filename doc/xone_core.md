# Xone Core API

#### DOM Query Helpers
```javascript
CORE.getById('element-id');
CORE.getByClass('active', 'context-element-id');
CORE.getByTag('td', 'context-element-id');
```
```javascript
CORE.query('#element-id .active');
CORE.query('#element-id img');
CORE.query('img.active');
```

#### DOM Class Helpers
```javascript
// register asynchron callbacks:
CORE.toggleClass('element-id', 'active', function(){
    
    // 'this' points to the target element:
    if(CORE.hasClass(this, 'active')) {
        
        // pass multiple targets:
        CORE.removeClass([
            
            '1st-id', 
            '2nd-id', 
            '3rd-id'
            
        ], 'active');
    }
    else {
        
        // pass multiple classes:
        CORE.addClass('element-id', [
            
            'active', 
            'hover'
        ]);
    }
});
```

#### DOM Paint Helpers
```javascript
// manipulate dom on next refresh (async):
CORE.paint(function(){
 
    // basic usage:
    if(CORE.getStyle('element-id', 'visibility') === 'visible'){
        
        // setting a style performs async paint automatically:
        CORE.setStyle('element-id', 'display', 'block');
    }
    
    // pass in array of elements and/or style:
    CORE.setStyle([
        
        '1st-id', 
        '2nd-id', 
        '3rd-id'
    ],{
        'display': 'block',
        'visibility': 'visible'
    });
    
    // shortcut:
    CORE.toggleStyle('element-id', 'display', [
        
        'block', 'none'
    ]);
});
```

#### Async Helpers
Unordered:
```javascript
CORE.async(function c(){
    alert("3rd");
}, 500);

CORE.async(function a(){
    alert("1st or 2nd");
});

CORE.async(function b(){
    alert("2nd or 1st");
});
```
Ordered:
```javascript
CORE.queue(function a(){
    alert("1st");
}, 500);

CORE.queue(function b(){
    alert("2nd");
});

CORE.queue(function c(){
    alert("3rd");
});
```
Unregister:
```javascript
var timer = CORE.async(function(){ /* ... */ }, 1000);

if(something_goes_wrong) CORE.clear(timer);
```

#### Debug Helpers
Global switch has to be set to true:
```javascript
CONFIG.debug = true;
```
Logger:
```javascript
Console.log("Message");
Console.log("Object loaded:", obj);
Console.warn("Warning Message");
Console.err("Error Message");
```
Manage Console:
```javascript
Console.show();
Console.hide();
Console.clear();
```
#### Basic Helpers
```javascript
var str = CORE.paramsToString(params);
var arr = CORE.unique(arr);
var arr = CORE.reverse(arr);
var arr = CORE.shuffle(arr);
var num = CORE.formatNumber(num, 2, '.', ',');
var str = CORE.crc32("something");
var has = CORE.contains(arr, item);
```
Loader:
```javascript
CORE.preloadImages([
    
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg'
    
], function(){
    
    alert("Ready!");
});
```
```javascript
CORE.loadScript([
                    
    'js/script_a.js',
    'js/script_b.js',
    'js/script_c.js'
    
], function(){
     
     alert("Ready!");
 });
```
```javascript
CORE.loadStyle([
                    
    'css/style_a.css',
    'css/style_b.css',
    'css/style_c.css'
    
], function(){
     
     alert("Ready!");
});
```
#### Native Helpers
Define Array Loop:
```javascript
var fn_each = CORE.registerEach(function(data){
    // do something with data
    console.log(data.value);
});
```
```javascript
fn_each([
    {value: 'foo'},
    {value: 'foo'},
    {value: 'foo'}
]);
```
Define Array Filter:
```javascript
var fn_filter = CORE.registerFilter(function(data){
    // keep only data with foo
    return data.value === 'foo';
});
```
```javascript
var arr_filtered = fn_filter([
    {value: 'foo'},
    {value: 'foo'},
    {value: 'foo'}
]);
```
Define Array Map:
```javascript
var fn_map = CORE.registerMap(function(data){
    // set each value to bar
    return 'bar';
});
```
```javascript
var arr_mapped = fn_map([
    {value: 'foo'},
    {value: 'foo'},
    {value: 'foo'}
]);
```
