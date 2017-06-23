# Xone Dependency Management & Calculation

> __Note:__ Work in progress.

Xone provides 3 ways of managing dependencies:

### 1. Xone Dependency Calculation

Define dependencies with `goog.provide` and `goog.require` in the top of each javascript file:

```javascript
goog.provide("MyLib.foobar");
goog.require("MyLib.foo");
goog.require("MyLib.bar");
```

> __Note:__ Xone uses a fallback for `goog.provide` and `goog.require` if closure compiler is not available.

In `app/manifest.js` set to `true`:

```json
"calculate": true
```

Execute CLI script:

```bash
workspace\my_project> xone deps
```

> __Note:__ This scripts also automatically executed in background when running `xone compile` or `xone build`.

### 2. Closure Compiler (jar)

Define dependencies with `goog.provide` and `goog.require` in the top of each javascript file:

```javascript
goog.provide("MyLib.foobar");
goog.require("MyLib.foo");
goog.require("MyLib.bar");
```

In `app/manifest.js` manage your codebase dependencies in any order (supports wildcards):

```json
"dependencies": {
    "calculate": false,
    "js": [
        "js/main.js",
        "js/lib/**/*.js",
        "js/layout/*.js",
        "js/view/*.js",
        "js/init.js"
    ]
}
```

Execute CLI script:

```bash
workspace\my_project> xone compile
```

> __Note:__ Closure Compiler Javascript Version actually do not support dependency sorting by `goog.provide` and `goog.require`. For this case you have to use method 1. or 3. in order.

### 3. Manual Dependency Definition

In `app/manifest.js` manage your codebase dependencies manually ordered (did __not__ support wildcards):

```json
"dependencies": {
    "js": [
        "js/init.js",
        "js/layout.js",
        "js/view.js",
        "js/setup.js",
        "js/main.js"
    ],
    "production": [],
    "development": [],
    "benchmark": [],
    "test": [],
    "spec": [
        "spec/helper.js",
        "spec/main_spec.js"
    ]
}
```
