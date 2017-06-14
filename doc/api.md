### Xone API

Uppercase identifiers helps you to determine:

* __static vars__ (e.g. API namespaces, global configs, constants, flags, switches)
* __read-only values__
* __special definitions__ in object notation to fulfill conventions of Xone automated system
* __special members__ and classes also used by the automated system

> __Note:__ Therefore all members of `APP.*` are uppercase to symbolize that they a part of the automated concept. Corresponding types are described by its interfaces. The descision to use these concept is open to you, also most of them can be used directly outside the automated chain.

## Global Constants

* __`ENV`__
* __`RACK`__
* __`PLATFORM`__
* __`DEBUG`__

## Global Namespaces

* __`APP`__
* __`CORE`__
* __`CONFIG`__
<!--
* __`UTILS`__
-->
<!--
* __`VARS`__
-->

## CONFIG.*

_Constants: (read-only)_

* CONFIG.__`ENV`__
* CONFIG.__`RACK`__
* CONFIG.__`PLATFORM`__
* CONFIG.__`DEBUG`__

_read full description [here](app_config.md)_

## APP.*

#### Static Methods:

* APP.__`INIT`__: function()
* APP.__`SETUP`__: function()
* APP.__`MAIN`__: function()

#### MVC Methods

* APP.__`MODEL`__
    * _Methods:_
        * APP.MODEL.__`new`__: function(model, data<, persistent>)
        * APP.MODEL.__`create`__: function(model, data)
        * APP.MODEL.__`register`__: function(name, model)
* APP.__`CONTROLLER`__
    * _Methods:_
        * APP.CONTROLLER.__`build`__: function build(view<, data>)
        * APP.CONTROLLER.__`render`__: function render(target<, data>)
        * ~~APP.CONTROLLER.__`changeLanguage`__: function(lang)~~ _(deprecated)_

#### MVC Definitions

* APP.__`MODEL`__: Array([model]) implements ___ModelInterface___
* APP.__`CONTROLLER`__: Array([controller]) implements ___ControllerInterface___
* APP.__`ROUTE`__: Array([route]) implements ___RouteInterface___
* APP.__`PAYLOAD`__: Array([function])
* APP.__`MAPPER`__: Array([object])
* APP.__`LANG`__: Array([object])

#### APP Definitions

* APP.__`EVENT`__: Array([event]) implements ___EventInterface___
* APP.__`HANDLER`__: Array([function])
* APP.__`HELPER`__: Array([function])
* APP.__`INTERFACE`__: Array([interface])
* APP.__`ADAPTER`__: Array([class])
* APP.__`REQUIRE`__
* ~~APP.__`CHANGELOG`__: Array([object])~~ _(dropped)_
* APP.__`MIGRATE`__ _(in progress)_
* APP.__`PLUGIN`__

#### APP Base

* APP.__`VIEWPORT`__
    * _Constants: (read-only)_
        * APP.VIEWPORT.__`ASPECT_RATIO`__
        * APP.VIEWPORT.__`PIXEL_RATIO`__
        * APP.VIEWPORT.__`ORIENTATION`__
        * APP.VIEWPORT.__`WIDTH`__
        * APP.VIEWPORT.__`HEIGHT`__
        * APP.VIEWPORT.__`SCALE`__
        * APP.VIEWPORT.__`ZOOM`__
    * _Methods:_
        * APP.VIEWPORT.__`lockOrientation`__: function(orientation)
        * APP.VIEWPORT.__`update`__: function()
* APP.__`DEVICE`__ _(coming soon)_
    * _Constants: (read-only)_
        * APP.DEVICE.__`ASPECT_RATIO`__
        * APP.DEVICE.__`PIXEL_RATIO`__
        * APP.DEVICE.__`ORIENTATION`__
        * APP.DEVICE.__`WIDTH`__
        * APP.DEVICE.__`HEIGHT`__
        * APP.DEVICE.__`SCALE`__
        * APP.DEVICE.__`ZOOM`__
* APP.__`CONFIG`__
    * _Constants: (read-only)_
        * APP.CONFIG.__`LANG`__: String
        * ~~APP.CONFIG.__`PROC`__~~ _(deprecated)_
        * APP.CONFIG.__`GZIP`__: Boolean
        * ~~APP.CONFIG.__`PASSIVE_EVENTS`__~~ _(deprecated)_
        * ~~APP.CONFIG.__`EVENT_OPTIONS`__~~ _(deprecated)_
        * APP.CONFIG.__`LAYOUT`__: Array([string])
    * _Switches:_
        * ~~APP.CONFIG.__`SHOW_DEBUG`__~~ _(deprecated)_
        * ~~APP.CONFIG.__`SHOW_GRAPH`__~~ _(deprecated)_
        * ~~APP.CONFIG.__`SHOW_STATS`__~~ _(deprecated)_
* APP.__`VARS`__
    * _Globals:_
        * APP.VARS.__`CURRENT_USER`__: Object
        * APP.VARS.__`HEADER`__: Object
        * APP.VARS.__`AUTH`__: String
* APP.__`STATS`__: Object
* APP.__`SETTINGS`__ (implements ___StorageInterface___)
    * _Methods:_
        * APP.SETTINGS.__`clear`__: function()
        * APP.SETTINGS.__`del`__: function(index)
        * APP.SETTINGS.__`get`__: function(index)
        * APP.SETTINGS.__`keys`__: function()
        * APP.SETTINGS.__`set`__: function(index, value)
        * APP.SETTINGS.__`update`__: function(index, value)
* APP.__`LAYOUT`__ _(deprecated)_
* APP.__`STORAGE`__ _(in progress)_
* APP.__`WORKER`__
    * _Methods:_
        * APP.WORKER.__`register`__: function(name, worker<, callback>)

## CORE.*

#### Math

* CORE.__`Math`__
    * _Methods:_
        * CORE.Math.__`min`__: function(a, b<, c, d, ...>)
        * CORE.Math.__`max`__: function(a, b<, c, d, ...>)
        * CORE.Math.__`med`__: function(a, b<, c, d, ...>)
        * CORE.Math.__`rad`__: function(num)
        * CORE.Math.__`cos`__: function(num)
        * CORE.Math.__`sin`__: function(num)
        * CORE.Math.__`abs`__: function(num)
        * CORE.Math.__`round`__: function(num)
        * CORE.Math.__`rand`__: function(\<seed>)

#### DOM

* CORE.__`query`__: function(query)
* CORE.__`getByClass`__: function(classname, context)
* CORE.__`getById`__: function(id)
* CORE.__`getByTag`__: function(tag, context)
* CORE.__`getHTML`__: function(node)
* CORE.__`getNode`__: function(element)
* CORE.__`getValue`__: function(node)
* CORE.__`setHTML`__: function(node, html, async)
* CORE.__`setTextContent`__: function(node, val)
* CORE.__`setValue`__: function(node, value)

#### Styles

* CORE.__`css`__: function(obj, style, val)
* CORE.__`paint`__: function(fn, delay)
* ~~CORE.__`addByClass`__: function(name, node<, callback>)~~ _(deprecated)_
* CORE.__`addCssRule`__: function(selector, rules, value)
* CORE.__`addClass`__: function(node, name<, callback>)
* CORE.__`animate`__: function(obj, params)
* CORE.__`getStyle`__: function(obj, style)
* CORE.__`scrollTo`__: function(node, from, to<, duration>)
* CORE.__`scrollToTop`__: function(node)
* ~~CORE.__`removeByClass`__: function(name, node, callback)~~ _(deprecated)_
* CORE.__`removeClass`__: function(node, name, callback)
* CORE.__`removeNodes`__: function(element)
* CORE.__`hasClass`__: function(node, name)
* ~~CORE.__`toggleByClass`__: function(name, node, callback)~~ _(deprecated)_
* CORE.__`toggleClass`__: function(node, name, callback)
* CORE.__`toggleStyle`__: function(obj, css, val)
* CORE.__`setStyle`__: function(obj, css, val)

#### Event

* CORE.__`on`__: function(elem, query, event, fn<, preventDefault, stopBubble, key>)
* CORE.__`addEvent`__: function(elem, event, fn<, preventDefault, stopBubble>)
* CORE.__`addInputEvent`__: function(node, fn<, preventDefault>)
* CORE.__`addMouseWheelScroll`__: function(node, fn)
* CORE.__`addTouchEvent`__: function(node, fn<, preventDefault, stopBubble>)
* CORE.__`addTouchMoveEvent`__: function(node, fn<, preventDefault, stopBubble>)
* CORE.__`delegateByClass`__: function(node, classname, event, fn<, preventDefault, stopBubble>)
* CORE.__`delegateByTag`__: function(node, tag, event, fn<, preventDefault, stopBubble>)
* CORE.__`delegateByTagClass`__: function(node, tag, classname, event, fn<, preventDefault, stopBubble>)
* CORE.__`handleEvent`__: function(event, elem, fn, preventDefault, stopBubble)
* CORE.__`preventEvent`__: function(event, prevent, stop)
* CORE.__`triggerMouseEvent`__: function(node, event)

#### Checks

* CORE.__`contains`__: function(array, item)
* CORE.__`isArray`__: function(value)
* CORE.__`isBlank`__: function(value)
* CORE.__`isDefined`__: function(value)
* CORE.__`isEmpty`__: function(value)
* CORE.__`isObject`__: function(value)
* CORE.__`isType`__: function(value<, type>)
* CORE.__`hasValue`__: function(value)
* CORE.__`hasValues`__: function(value)

#### Environment

* CORE.__`Browser`__
    * _Constants: (read-only)_
        * CORE.Browser.__`isOpera`__: Boolean
        * CORE.Browser.__`isFirefox`__: Boolean
        * CORE.Browser.__`isSafari`__: Boolean
        * CORE.Browser.__`isMSIE`__: Boolean
        * CORE.Browser.__`isChrome`__: Boolean
* CORE.__`System`__
    * _Constants: (read-only)_
        * CORE.System.__`isIphone`__: Boolean
        * CORE.System.__`isIpod`__: Boolean
        * CORE.System.__`isIpad`__: Boolean
        * CORE.System.__`isAndroid`__: Boolean
        * CORE.System.__`isIOS`__: Boolean
        * CORE.System.__`isWindows`__: Boolean
        * CORE.System.__`isCordova`__: Boolean
        * CORE.System.__`isWebapp`__: Boolean
* CORE.__`Device`__
    * _Constants: (read-only)_
        * CORE.Device.__`isMobile`__: Boolean
        * CORE.Device.__`isRetina`__: Boolean
        * CORE.Device.__`isTouch`__: Boolean
        * CORE.Device.__`isOnline`__: Boolean
        * CORE.Device.__`isOffline`__: Boolean
  
#### Array

* CORE.__`merge`__: function(a, b<, c, d, ...>)
* CORE.__`unique`__: function(array<, field>)
* CORE.__`registerEach`__: function(fn)
* CORE.__`registerFilter`__: function(fn)
* CORE.__`registerMap`__: function(fn)
* CORE.__`reverse`__: function(array)
* CORE.__`shuffle`__: function(array<, times>)
* CORE.__`fill`__: function(array, content)
* CORE.__`sort`__: function(array<, compare>)
* CORE.__`sortAsc`__: function(array)
* CORE.__`sortDesc`__: function(array)
* CORE.__`sortNum`__: function(array<, compare>)
* CORE.__`sortNumAsc`__: function(array)
* CORE.__`sortNumDesc`__: function(array)
* CORE.__`sortBy`__: function(array, field<, compare>) _(in progress)_
* CORE.__`sortByAsc`__: function(array, field) _(in progress)_
* CORE.__`sortByDesc`__: function(array, field) _(in progress)_
* CORE.__`getKeys`__: function(data)
* CORE.__`replace`__: function(array, find, replace)
* CORE.__`count`__: function(array, find)

#### String

* CORE.__`replace`__: function(string, find, replace)
* CORE.__`count`__: function(string, find)

#### Process

* CORE.__`async`__: function(fn<, delay>)
* CORE.__`stack`__: function(fn<, delay>)
* CORE.__`clear`__: function(id)
* CORE.__`time`__: function()
* ~~CORE.__`getStackLength`__: function()~~ _(deprecated)_

#### Ajax

* ~~CORE.__`ajax`__: function(params)~~ _(deprecated)_
* CORE.__`xhr`__:
    * _Methods:_
        * CORE.xhr.__`get`__: function(host, payload, callback)
        * CORE.xhr.__`post`__: function(host, payload<, callback>)
        * CORE.xhr.__`patch`__: function(host<, payload, callback>)
        * CORE.xhr.__`delete`__: function(host<, payload, callback>)
        * CORE.xhr.__`download`__: function(host, destination<, callback>) _(in progress)_
        * CORE.xhr.__`upload`__: function(host, source<, callback>) _(in progress)_
* CORE.__`request`__: function(type<, payload, callback>)
* CORE.__`paramsToString`__: function(params)

#### Format

* CORE.__`formatDate`__: function(date)
* CORE.__`capitalize`__: function(text)
* CORE.__`formatNumber`__: function(number, places, decimal, seperator)

#### Template

* CORE.__`buildData`__: function(pattern, parent<, data>)
* CORE.__`buildPattern`__: function(pattern, parent<, data>)
* CORE.__`parseNode`__: function(pattern, data)

#### Debug

* CORE.__`console`__
    * _Methods:_
        * CORE.console.__`log`__: function(msg)
        * CORE.console.__`warn`__: function(msg)
        * CORE.console.__`err`__: function(msg)
        * CORE.console.__`info`__: function(msg)
        * CORE.console.__`show`__: function()
        * CORE.console.__`hide`__: function()

#### Helpers

* CORE.__`Storage`__: ___StorageAdapter___ implements ___StorageInterface___
* CORE.__`crc32`__: function(str)
* CORE.__`imageToDataUrl`__: function(src, callback, format, quality)
* ~~CORE.__`initRetina`__: function(data, context)~~ _(deprecated)_
* CORE.__`loadScript`__: function(src, callback)
* CORE.__`loadStyle`__: function(src, media)
* ~~CORE.__`prefix`__~~ _(deprecated)_
* ~~CORE.__`preloadImages`__: function(images)~~ _(deprecated)_

## Interfaces

#### Model implements ModelHelper

> Each model class provide some built ins.

* Model.__`register`__
* Model.__`new`__
* Model.__`create`__
* ~~Model.__`newFromList`__~~ _(deprecated)_
* ~~Model.__`createFromList`__~~ _(deprecated)_
* Model.__`parse`__
* Model.__`find`__
* Model.__`all`__
* Model.__`range`__
* Model.__`count`__
* Model.__`findBy`__
* Model.__`each`__
* Model.__`where`__
* Model.__`like`__
* Model.__`saveAll`__
* Model.__`deleteAll`__
* Model.__`updateAll`__

#### Model implements ModelClass

> All instances of a model provide some built ins.

* Model.__`save`__
* Model.__`update`__
* Model.__`restore`__
* Model.__`delete`__
    * Constructor:
        * Model.constructor.__`beforeUpdate`__
        * Model.constructor.__`beforeCreate`__
        * Model.constructor.__`beforeSave`__
        * Model.constructor.__`onCreate`__
        * Model.constructor.__`onUpdate`__
        * Model.constructor.__`onSave`__

#### Controller implements ControllerInterface

> The controller can be used directly or can be automatically connected to a chain via definitions.

* Controller.__`render`__
* Controller.__`build`__
* Controller.__`request`__
* Controller.__`requestBatch`__
* Controller.__`requestSync`__

#### Route implements RouteInterface

> A route definition connects either: a __request controller__ with its default chain or an __event controller__ chain.

* Route.__`to`__
* Route.__`action`__
* Route.__`type`__
* Route.__`field`__
* Route.__`limit`__
* Route.__`last`__
* Route.__`params`__
* Route.__`header`__
* Route.__`cache`__
* Route.__`clear`__
* Route.__`async`__
* Route.__`default`__
* Route.__`sort`__
* Route.__`error`__
* Route.__`filter`__
* Route.__`map`__
* Route.__`arrayfilter`__
* Route.__`arraymap`__

#### Mapper implements MapperInterface

> A mapper definition maps a model to a __different representations__ (e.g. model > server, model > storage, storage > model)

* Mapper.__`mapToView`__
* Mapper.__`mapToPayload`__ _(in progress)_
* Mapper.__`mapToData`__ _(in progress)_
* Mapper.__`mapFromPayload`__ _(in progress)_
* Mapper.__`mapFromData`__ _(in progress)_

#### Template implements TemplateStruct _(comming soon)_

> Templates will be __auto generated__ at the moment (compile).

* Template.__`if`__
* Template.__`map`__
* Template.__`data`__
* Template.__`loop`__
* Template.__`else`__
* Template.__`include`__

#### ViewModel implements ViewModelStruct

> A viewmodel payload has to be passed when calling the __view controller__ by `Controller.render()` directly.

* ViewModel.__`data`__
* ViewModel.__`target`__
* ViewModel.__`view`__
* ViewModel.__`default`__
* ViewModel.__`callback`__

#### ViewCache implements StorageInterface

> The view cache is automatically used by the __view controller__. 

* ViewCache.__`set`__
* ViewCache.__`get`__
* ViewCache.__`update`__
* ViewCache.__`del`__
* ViewCache.__`clear`__
* ViewCache.__`keys`__

#### Pattern implements PatternStruct

> This pattern scheme is used to __render templates__ from JSON into DOM elements  by `CORE.build()`

* Pattern.__`tag`__
* Pattern.__`attr`__
* Pattern.__`text`__
* Pattern.__`child`__
* Pattern.__`length`__

#### Event implements EventStruct

> An event definition is used to make __event delegation__ more simple.

* Event.__`on`__
* Event.__`if`__
* Event.__`to`__
* Event.__`do`__
* Event.__`go`__
* Event.__`stopBubble`__
* Event.__`preventDefault`__

#### Request implements RequestStruct

> An request definition is used to __setup server calls__ or when calling the request controller directly by `CONTROLLER.request()`.

* Request.__`type`__
* Request.__`url`__
* Request.__`params`__
* Request.__`success`__
* Request.__`error`__
* Request.__`header`__
* Request.__`async`__
* Request.__`clear`__
* Request.__`cache`__

#### Storage implements StorageInterface

> A storage can be one of both: __persistent__ or __temporary__.

* Storage.__`get`__
* Storage.__`set`__
* Storage.__`update`__
* Storage.__`del`__
* Storage.__`clear`__
* Storage.__`keys`__

#### FileSystem implements FilesystemInterface

> The filesystem provides access to __larger capacity__ and can also be one of both: __persistent__ or __temporary__.

* FileSystem.__`init`__
* FileSystem.__`load`__
* FileSystem.__`save`__
* FileSystem.__`delete`__
* FileSystem.__`exist`__
