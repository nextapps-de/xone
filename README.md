<p align="center">
    <img src="http://nextapps.de/img/xone.svg" alt="Xone Javascript Development Environment">
    <br>
    <a target="_blank" href="https://www.npmjs.com/package/xone"><img src="https://img.shields.io/npm/v/xone.svg"></a>
    <img src="https://img.shields.io/badge/status-ALPHA-orange.svg">
    <a target="_blank" href="https://travis-ci.org/next-apps/xone"><img src="https://travis-ci.org/next-apps/xone.svg?branch=master"></a>
    <a target="_blank" href="https://coveralls.io/github/next-apps/xone?branch=master"><img src="https://coveralls.io/repos/github/next-apps/xone/badge.svg?branch=master"></a>
    <a target="_blank" href="https://github.com/next-apps/xone/issues"><img src="https://img.shields.io/github/issues/next-apps/xone.svg"></a>
    <a target="_blank" href="https://github.com/next-apps/xone/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/xone.svg"></a>
</p>

<h1></h1>

<h3>Javascript framework for building modern web applications</h3>

__Xone__ provides a lightweight full stack environment to develop beautiful applications for every use and enables the optimal integration of an universal codebase into a wide range of systems (e.g. mobile devices, tablets, desktops, browser environments).

> __Notice:__ Actually this is an alpha state of this repository. Some breaking changes could possibly be introduced in upcoming versions. Do not use for production until this message has been removed.

* [License](LICENSE.md)
* [Installation](doc/install.md)
* [API](doc/api.md) (work in progress)
* [Codebase Structure](doc/code_structure.md)
* [Global App Configuration](doc/app_config.md)
* [Basic Examples: MVC Pattern / Routes / Events / Templates / Dev Tools](doc/xone.md)
* [Persistent Models](doc/xone_model.md)
* [Core Library](doc/xone_core.md)
* [AMD Loader, Build Plugin & Depedency Sorting](doc/xone_amd.md)
* [Validations](doc/xone_validate.md)

---

### Overview

* Manage and execute production, development and test environments seamlessly at the same time
* Integrates fast development in a web browser environment (develop > build > deploy)
* Provides HTML-CSS-friendly templating system with which designers (non-coders) can also work
* Xone libraries completely compiles with your codebase (only the used code remains in a single javascript binary file)
* Therefore you will get the most lightweight footprint possible
* Provides advanced MVC architecture for your app (e.g. persistent models, routes, request controller, event controller, handlers, views, mapper)
* Incredibly accellerate DOM changes through a performance optimized render engine
* Simple, fast and natural usage out of the box
* Targeting products: hybrid apps, progressive web apps, cordova/phonegap/ionic, single-page web apps, browser apps

---

Xone basically is available in 3 different versions:

1. __Xone Project__ (Development Environment)
    * initial project created by `xone create`
    * Provides you a scalable development stack for modern web-based applications on top of Node.js
    * Is intended for a compilation/build
2. __Xone Extern Bundle__ (Standalone)
    * [_xone.bundle.js_](//cdn.rawgit.com/next-apps/xone/master/dist/xone.bundle.js)  >  [_xone.bundle.min.js_](//cdn.rawgit.com/next-apps/xone/master/dist/xone.bundle.min.js)
    * Alternatively use this bundle to add Xone as a dependency to an already existing build/compiler system (compatible with Closure Compiler "Advanced Mode")
    * Is intended for a compilation/build
3. __Xone Extern Library__ (Standalone)
    * [_xone.lib.js_](//cdn.rawgit.com/next-apps/xone/master/dist/xone.lib.js)  >  [_xone.lib.min.js_](//cdn.rawgit.com/next-apps/xone/master/dist/xone.lib.min.js)
    * Skips the build part completely and make Xone using like a jQuery library in your web-based project
    * Is not intended for a compilation

#### Xone Comparison: 1. Project, 2. Bundle, 3. Library

| Features by default | Xone Project (Environment) | Xone Bundle (Standalone) | Xone Library (Standalone) |
| ------------- | ------------- | ------------- | ------------- |
| Final project filesize | smallest | small | normal |
| Core Library | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| MVC Framework | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Render Engine | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Unit Tests | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Debugging Tools | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Environments | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Global App Configuration | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Build/Compile Project | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Manage Platforms | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Dynamic Templates (HTML > JSON) | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Dependency Management | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Initial Codebase | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| CLI Tools | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |
| Support Closure Compiler Advanced Mode | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Dead Code Removal | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Not strictly bound by Conventions | - | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Does not require Node.js | - | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Use as a Standalone Library (like jQuery/Underscore) | - | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Use as a Framework (like Bootstrap/Angular) | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Use as a Dev Environment (like Sencha/Meteor) | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - | - |

## Installation (Xone Project)

```bash
> npm install -g xone
```
> __Note:__ To make the _Xone CLI_ globally available, you have to install Xone as a global npm module (also in addition to any local installation if you want to keep simple as most as possible). You can also use a local custom versions of Xone as well as using the CLI without any global installations (read further).

> __Note:__ Xone Project binaries typically has to be installed via "xone create" or "xone install" and comes with its own pre-defined folder structure (followed by some conventions). You can pick one of the two [stand-alone](//github.com/next-apps/xone/tree/master/dist) versions optionally to skip as many conventions as possible (e.g. Xone acts like an extern Javascript Plugin).

#### Windows

Alternatively in the root of your project you can use the local CLI shortcut _app_ instead for _xone_, e.g.:
```bash
my_project> app build
```
> __Note:__ The options _create_ and _install_ both are not available over the shortcut _app_.

#### MacOS/Linux

On a linux machine you may use:
```bash
sudo npm install -g xone
```

If the global "xone" identifier is not registered properly try one of these lines:
```bash
hash xone
hash -r
```

<!--
If you also like to make the shortcut _app_ in your terminal available, you need to add the Xone _bin_ folder to the _PATH_ of your system:
-->
<!--
export PATH=$PATH:/path/to/node_modules/xone/bin/
-->

Alternatively you can use the local CLI fallback like:
```bash
bash xone build
```

---

### Create New Xone Project

Create a new project inside the directory _workspace/my_project_:
```bash
workspace> xone create my_project
```

Works, but it is generally not recommended to use whitespaces in a project folder name:
```bash
workspace> xone create "my project"
```

[Read further](doc/install.md)

---

### Update existing Xone project

To update Xone of an already existing project you basically need __2 steps__:

1. Fetch and install latest version via npm:
```bash
> npm install -g xone
```

2. Install update to a Xone project (automatically fetches sources from _npm_modules_)
```bash
workspace/my_project> xone install
```
> __Note:__ This will not overwrite any of your project files! Only projects xone library files located in _app/lib/xone/_ are updated.

[Read further](doc/install.md)

---

### Build Xone project

Un-compiled sources located in: _workspace/my_project/app/*_
```bash
my_project> xone build
```
Production build located in: _workspace/my_project/bin/www/*_

> __Note:__ We recommended to use production builds for any external/public release and use the sources only for developing, testing and may some other internal purposes. To skip the build integration of Xone, you have to use the standalone version instead.

#### Run Xone project (Local Webserver)
```bash
my_project> xone server
```
Open your preferred webrowser and goto _'http://localhost/app/'_ or _'http://localhost/bin/www/'_

Optionally you can pass custom host and port:
```bash
my_project> xone server localhost 8080
```
Open your preferred webrowser and goto _'http://localhost:8080'_

#### Run Xone project (Local Filesystem)

Open _app/index.html_ from sources or _bin/www/index.html_ from production build in your preferred browser. 

#### Deploy Xone project (Cordova, Web, etc.)

Use production builds located in _workspace/my_project/bin/*_ to move forward into your Cordova-based projects or upload to a webserver. 

---

### Manage platforms

Xone provides custom platform injections to perform platform specific production builds. Therefore all those builds only includes necessary code and dependencies for their related platform.

Show currently defined platforms:
```bash
my_project> xone platform
```

Perform platform specific compilation:
```bash
my_project> xone compile android
```
Compiled files remains in: _workspace/my_project/app/*_

Perform platform specific builds:
```bash
my_project> xone build android
```
Build destination: _workspace/my_project/bin/android/*_

#### Add custom platforms

You can add unlimited custom platforms, e.g. create a platform 'webapp':
```bash
my_project> xone platform add webapp
my_project> xone build webapp
```
Build destination: _workspace/my_project/bin/webapp/*_

---

### Build Xone Standalone

```bash
my_project> xone build bundle
```
Build destination: _workspace/my_project/app/lib/xone/dist/xone.bundle.js_

```bash
my_project> xone build lib
```
Build destination: _workspace/my_project/app/lib/xone/dist/xone.lib.js_

```bash
my_project> xone build lib min ./app/js/
```
Build destination: _workspace/my_project/app/js/xone.lib.min.js_

> __Note:__ The order of passed parameters cannot be changed actually.

---

### Configure Build Tool

Xone build uses the Google Closure Compiler. All Xone libraries also supports compilation in _"Advanced Mode"_. The build properties can be configured in `xone.json`. The Closure Compiler also provides a simple dependency management system (provide/require) you should make use of to improve dead code removal.

> __Note:__ Actually Xone supports 2 different versions of closure compiler: 1. requires Java, 2. requires Javascript (Node). It is recommended to have a Java (JRE) properly installed on your machine to unlock some benefits of the Closure Compiler Java version. To change the type of the compiler you need to change the value of the field `closure_compiler_lib_type` from `"js"` into `"jar"` in `xone.json` accordingly.

> __Note:__ If you have less experience with the Closure Compiler you can optionally set the compilation level to _"simple"_ on the field `closure_compiler_level` within the xone config file.

#### Comparison: Closure Compiler (Java) VS. Closure Compiler (Javascript)

| Features by default | Closure Compiler (Java) | Closure Compiler (Javascript) |
| ------------- | ------------- | ------------- |
| Dependency Management | <img src="http://nextapps.de/img/icon_check.png?v=2"> | <img src="http://nextapps.de/img/icon_check.png?v=2"> |
| Auto Sort Dependencies | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| "Strict" Dependencies (Entry Point) | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| "Pretty Print" Compilation | <img src="http://nextapps.de/img/icon_check.png?v=2"> | - |
| Build Performance | Normal | Slow |
| Compression Ratio | Best | Good |
| Memory Consumption | Normal | Extreme |

---

### Generating Docs (JSDoc)
```bash
my_project> xone docs
```
Docs will be generated in _'docs/api/'_.

---

## Using Xone Standalone Library

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <!-- END_OF_BODY -->
    <!-- LOAD XONE: -->
    <script src="js/xone.lib.min.js"></script>
    <!-- YOUR APP CODE: -->
    <script src="js/app.js"></script>
</body>
</html>
```

---

### Xone Render Engine

The render engine provides an optional "fast mode" to get the most out of performance. All internal processes of Xone takes advantage when "fast mode" is enabled (e.g. render templates, animate elements, toggle views). When it runs in "fast mode" the render engine has a very closed infrastructure you should keep notice:

1. CSS Styles
    * Change styles
    * Get styles
2. CSS Classes
    * Change classes
    * Get classes
3. HTML Content
    * Change contents
    * Get contents

> __Note:__ When "fast mode" is enabled it should not be mixed by any other external manipulations of the same category listed above. We recommended to disable the "fast mode" when style issues occurs by any direct style manipulations (e.g. when using an extern library).

> __Note:__ The "fast mode" is enabled by default in a _Xone Project_ (may change in future) and is disabled by default in the _Xone Extern Library_.

###### Performance Comparison: Native VS. jQuery VS. Xone

* https://jsperf.com/xone-style-performance
* https://jsperf.com/xone-dom-selector-performance

###### Restrictions (when "fast mode" is enabled)

The problem:

```js
var display;

// get style direct:
display = document.getElementById('my_div').style.display;
console.log(display); // -> 'block'

// set style Xone:
CORE.setStyle('my_div', 'display', 'none');

// get style Xone:
display = CORE.getStyle('my_div', 'display');
console.log(display); // -> 'none'

// get style direct:
display = document.getElementById('my_div').style.display;
console.log(display); // -> 'block' !!!
```

Instead do this:

```js
var display;

// set style Xone:
CORE.setStyle('my_div', 'display', 'none');

// do on next refresh:
CORE.paint(function(){

    // get style direct:
    display = document.getElementById('my_div').style.display;
    console.log(display); // -> 'none'
});

```

---

### TODO

- [x] Provide Standalone Version (dependency-less)
- [x] Create/Install (CLI)
- [x] Use npm modules for system tasks (supports all platforms)
- [ ] Improve Environment Mappings
- [x] Improve Worker Integration
- [x] ~~Provide Plugin Management~~ (was replaced by dependency management)
- [ ] Replace Closure Dependency Loader
- [x] Improve Dependency Management
- [x] Improve Platform Management
- [ ] Support Hooks
- [ ] Support Animations
- [ ] Support Asynchronous Module Definitions
- [x] Improve Versioning
- [ ] Improve Migration
- [ ] Improve Benchmark Integration
- [ ] Refactor API
- [ ] Add Documentation
- [ ] Add Demos / Examples
- [ ] Add JSDoc
- [ ] Add Unit Tets
    - [ ] Core Tests
    - [ ] MVC Tests
    - [ ] Plugin Tests
    - [ ] Compiler Tests
    - [ ] Build Tests
    - [ ] Support Xone Standalone
- [x] Platform Support
    - [x] MacOS
    - [x] Windows
    - [x] Linux

---

### Features

* Manage Development Environments:
    * production, development, test, benchmark
* Manage Process Environments (Rack):
    * webapp, cordova, native, local, browser
* Manage Platform Environments:
    * Android, iOS, Windows, Webkit, Mozilla, MSIE
* Model-View-Controller
    * Supports persistent model management
* Full MVC-managed environment:
    * Routes
    * Events
    * Handlers
    * Controller
    * Interfaces
    * Adapter
    * Models
    * Mapper
    * Views
    * Payloads
    * Threads / Worker
    * Stubs / Mocks
    * Translations
* Javascript Core Library
* Codebase Dependency Management
* Supports DOM pattern in JSON format
* Template System
    * Static Content
    * Dynamic Content
    * Partials
    * Locales
* Build System
* Template Compiler
* Local Webserver
* Layout Manager
* Multi-Platform-Injections
* Event Delegation
* NoSQL Persistent Storage
* GZIP Storage Data Compression
* FlexiCache (auto-scale, auto-clean)
* Multi Language Support
* Unit Test Integration
* Versioning & Migrations
* Dev Task Hooks (Compile, Build, Deploy, Process)
* Xone Library Hooks (MVC, Storage, Handlers, Events)
* Debug Mode
    * Debugger Tools
    * Performance Tools
    * Analytics/Statistic Tools
* Benchmark Integration
* Closure Compiler Integration ("Advanced Mode")
* Less CSS Integration
* CSS Compressor Integration
* JSDoc Integration
* Provides the most possible performance while ensuring maximum crossplatform support
* Compatible with almost each library out there (also can be mixed with similar technologies like: Angular or React)

<!--
<img src="http://nextapps.de/img/xone_workflow.png">
-->
