# Application Code Structure

| File / Path  | Description |
| ------------- | ------------- |
| <br>**Main Folders** | |
| `/`  | Project Root Folder |
| `/app/`  | App Source Code |
| `/public/`  | Build (Production) |
| `/doc/`  | Documentation (JSDoc, Markdown) |
| `/lib/`  | External Dependencies (they are __not__ a part of production build!) |
| `/log/`  | Log Folder |
| `/task/` | Xone CLI Automation Scripts (Compile, Build) |
| `/tmp/`  | Temporary Folder (required by the build process) |
| <br>**Root Folder** | |
| /app/`app.bat`            | Xone CLI |
| /app/`README.md`          | Documentation Index (Markup) |
| /app/`CHANGELOG.md`       | Development Changelog |
| /app/`.gitattributes`     | Git Config File (optional) |
| /app/`.gitignore`         | Git Config File (recommended) |
| /app/`.editorconfig`      | IDE Config File (optional) |
| /app/`jasmine.json`       | Jasmine Test Framework Config File (optional) |
| /app/`jsdoc.json`         | JSDoc Config File (optional) |
| /app/`ionic.project`      | Ionic Framework Config File (optional) |
| /app/`.jshintrc`          | JSHint Config File (optional) |
| /app/`.jscsrc`            | JSCS Config File (optional) |
| <br>**App Folder** | |
| /app/`asset/`            | Assets Folder |
| /app/`config/`            | Configuration Folder |
| /app/`css/`               | Stylesheets |
| /app/`font/`             | Fonts |
| /app/`img/`               | Images |
| /app/`js/`                | Javascript Codebase |
| /app/`lib/`               | External Dependencies (they are __also__ a part of production build!) |
| /app/`platform/`          | Platform Overrides & Appendix |
| /app/`test/`              | Unit Tests |
| /app/`view/`              | View Templates (Dynamic Views, HTML/CSS/LESS/JSON) |
| /app/view/`app/`          | App Layout Templates (Static Views, HTML/CSS/LESS/JSON) |
| /app/`index.html`         | App Start Page |
| /app/`.htaccess`          | Apache WebServer Configuration File (Provides Webapp Manifest Support, optional) |
| /app/`xone.appcache`      | Provides Webapp Manifest Support (optional) |
| /app/`manifest.json`      | Provides Webapp Manifest Support (optional) |
| /app/`cordova.js`         | Provides Cordova Local Fallback (optional) |
| /app/`cordova_plugins.js` | Provides Cordova Local Fallback (optional) |
| <br>**Config Folder** | |
| /app/config/`development/config.js`   | Development Environment Configuration File |
| /app/config/`production/config.js`    | Production Environment Configuration File |
| /app/config/`test/config.js`          | Test Environment Configuration File |
| /app/config/`env.js`                  | Select Environment (Development, Production, Test) |
| /app/config/`manifest.js`             | App Dependencies Configuration File |
| /app/config/`stub.js`                 | Local Test Stubs (optional) |
| <br>**Stylesheet Folder** | |
| /app/css/`app.less`       | Main Application Definitions |
| /app/css/`custom.less`    | Extend/Override Extern Library Definitions (optional) |
| /app/css/`effect.less`    | Animation & Effects Definitions (optional) |
| /app/css/`font.less`      | Fontstyle Definitions (optional) |
| /app/css/`build.less`     | Defines Application CSS/LESS Dependencies (Build Bundle: `/app/css/build.css`) |
| /app/css/`mobile.less`    | Exclusive Mobile Devices Definitions (optional) |
| /app/css/`print.less`     | Exclusive Print Devices Definitions (optional) |
| /app/css/`resource.less`  | Resources Definitions (optional) |
| /app/css/`style.css`      | Local Build-Fallback (should be empty) |
| /app/css/`theme.less`     | Themes Definitions |
| <br>**Auto-generated Files** | |
| /app/css/`build.css`      | CSS Build (Sources: `/app/css/loader.less`) |
| /app/js/`build.js`        | Compiled Codebase (including dependencies) |
| /app/js/`view.js`         | Compiled Layout Package |
| /app/js/`layout.js`       | Compiled View Package |
| /app/layout/`*.json`      | Compiled Layout Templates |
| /app/view/`*.json`        | Compiled View Templates |
| /app/tmp/`build_tmp.js`   | Temp Build File |
| /app/tmp/`style_tmp.css`  | Temp Build File |
| /log/`manifest.log`       | Temp Manifest File (Closure Compiler) |
| <br>**Codebase Folder** | |
| /app/js/`adapter/`    | Adapter Implementations |
| /app/js/`controller/` | Controller Implementations |
| /app/js/`event/`      | Event Listener Definitions |
| /app/js/`handler/`    | Event Handler Definitions |
| /app/js/`helper/`     | Model Helper/Application Helper Definitions |
| /app/js/`interface/`  | Interfaces |
| /app/js/`lang/`       | Language Definitions |
| /app/js/`mapper/`     | View Definitions/Model-To-View-Mapper |
| /app/js/`model/`      | Model Definitions |
| /app/js/`payload/`    | Controller Payload Definitions |
| /app/js/`route/`      | Route Definitions |
| /app/js/`service/`    | Service Implementations |
| /app/js/`worker/`     | WebWorker Implementations |
| /app/js/`changelog.js`| In-App-Changelog (JSON, optional) |
| /app/js/`init.js`     | Custom Javascript Initializations (Immediately) |
| /app/js/`main.js`     | Application Startup Function |
| /app/js/`migrate.js`  | Data Migration Definitions (optional) |
| /app/js/`pattern.js`  | Dynamic HTML Template/Pattern (Javascript, optional) |
| /app/js/`polyfill.js` | Provides Polyfills (optional) |
| /app/js/`require.js`  | Defines Application Codebase Dependencies (Closure Dependency Management) |
| /app/js/`setup.js`    | Custom Javascript Setup (Onload) |
| <br>**Extern Lib Folder** | |
| /app/`lib/`               | External Dependencies (they are __also__ a part of production build!) |
| /app/lib/`xone/`          | Xone AppKit Framework |
