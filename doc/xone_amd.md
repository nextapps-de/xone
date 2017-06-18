# Xone Asynchronous Module Definition (AMD)

> __Note:__ Work in progress.

### API Overview

Global Methods:

* __`define`__: function(namespace<, dependencies>, factory<, bind>)
* __`require`__: function(namespace<, callback, bind>)
* __`install`__: function(namespace<, target>)
* __`export`__: function(namespace<, target>)
* __`build`__ _(in progress)_
* __`convert`__ _(in progress)_
* __`undefine`__: function(namespace)
* __`run`__: function(namespace<, async, ordered>)

> __Note:__ The amd methods are only available in local development environments. When performing `xone build` compilation/build, all amd modules are resolved and converted, the amd library itself is removed completely, therefore access on `require` or `define` by example isn't possible anymore (e.g. in production releases). Read further notes at the bottom of this site.

## Define

Defines a function/value ___MyLib.foo___:

```javascript
define("MyLib.foo", function(){

    return function(str){

        alert(str);
    };
});
```

Defines a function/value ___MyLib.foo___ which includes ___MyLib.foo___:

```javascript
define("MyLib.bar", "MyLib.foo", function(foo){

    return function(str){

        foo("Hello World"); // --> "Hello World"
    };
});
```

Defines a function/value ___MyLib.foobar___ which includes multiple dependencies:

```javascript
define("MyLib.foobar", ["MyLib.foo", "MyLib.bar"], function(foo, bar){

    return function(){

        foo("Hello World"); // --> "Hello World"
        bar(); // --> "Hello World"
    };
});
```

Defines a function/value ___MyLib.test___ which has custom `this` injected:

```javascript
define("MyLib.test", "MyLib.foobar", function(foobar){

    return function(){

        this.setTimeout(foobar); // --> "Hello World" x 2
    };
    
}, /* pass this: */ window);
```

```javascript
define("MyLib.run", function(){

    return function(){

        this(); // --> "Hello World" x 2
    };
    
}, /* require this: */ "MyLib.test");
```

Defines an object ___MyLib.object___:

```javascript
define("MyLib.object", ["MyLib.foo", "MyLib.bar"], function(_foo, _bar){

    return {

        foo: _foo,
        bar: _bar
    };
});
```

Defines an simple array ___MyLib.array___:

```javascript
define("MyLib.array", function(){

    return [];
});
```

Define constants:

```javascript
define("MyLib.constString", "MY_CONST_STRING");
```
```javascript
define("MyLib.constNumber", 3.14);
```
```javascript
define("MyLib.constArray", [0, 1, 2, 5]);
```
```javascript
define("MyLib.constEnum", {

    'r': 255,
    'g': 255,
    'b': 255
});
```

## Require

Require a defined function/value:

```javascript
require("MyLib", function(MyLib){
            
    MyLib.foo();
    MyLib.bar();
});
```

Require multiple defined functions/values:

```javascript
require(["MyLib", "MyNewLib"], function(MyLib, MyNewLib){
            
    MyLib.foo();
    MyNewLib.bar();
});
```

Require a reference/namespace by:

```javascript
var MyNewLib = require("MyLib");
MyNewLib.foo();
```
```javascript
require("MyLib").foo();
```

Usage of plain `require()` is one way to force loading "hidden" dependencies during build process, e.g.:

```javascript
require([
            
    "MyLib.foo",
    "MyLib.bar"
]);
```

> __Note:__ When passing an array wihtout a callback function, `require()` returns `undefined`.

## Run

Executes defined functions in order (without any parameters):

```javascript
run([
            
    "MyLib.foo",
    "MyLib.bar"
]);
```

Executes defined functions ___asynchronously___ in ___non-strict order___ (without any parameters):

```javascript
run([
            
    "MyLib.foo",
    "MyLib.bar"
    
], /* async: */ true);
```

Executes defined functions ___asynchronously___ in ___strict order___ (without any parameters):

```javascript
run([
            
    "MyLib.foo",
    "MyLib.bar"
    
], /* async: */ true, /* ordered: */ true);
```

## Install

Install a definition globally:
```javascript
// installs MyLib to window.MyLib when no 2nd parameter was passed
install("MyLib");

// now you can access:
MyLib.foo();
```

Install to a custom object:

```javascript
// installs MyLib to MyNewLib
install("MyLib", MyNewLib);

// now you can access:
MyNewLib.MyLib.foo();
```

## Export

Export a definition to an existing object/namespace:

```javascript
// exports all methods of MyLib to MyNewLib
export("MyLib", MyNewLib);

// foo is now a member of MyNewLib:
MyNewLib.foo();
```

## Important Notice

> All AMD calls should be placed in global scope or at least have to be executed/evaluated in place (supports async). That may differ from other AMD libraries. The reason for this restriction is simply: the final build does not need any AMD directives anymore so it does __not__ include AMD code.

Therefore inner calls are only possible, if their holders (functions) are executed/evaluated anywhere in place e.g.:

```javascript
if(ENV === 'production') defineFlag() : defineFlagDev();

function defineFlag(){

    define("MyLib.flag", true);
}

function defineFlagDev(){

    var flag = require("MyConfig.flag");
    define("MyLib.switch", flag);
}
```

Usually this will __fail__ in production builds:

```javascript
define("MyLib.foo", function(){

    return function(str){

        define("MyLib.bar", function(){
        
            return function(str){
        
                alert(str);
            };
        });
    };
});
```

When you call `require("MyLib.foo");` somewhere in place, the example from above should work, because the inner definition will executes during ___dependency evaluation runtime___.

By the way this also works __fine__, but those usage is not very common:

```javascript
define("MyLib.foo", function(){

    define("MyLib.bar", function(){
        
        return function(str){
    
            alert(str);
        };
    });

    return require("MyLib.bar");
});
```
