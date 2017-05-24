### Xone MVC Pattern
#### MVC: Assign Route
*app/js/route/record.js*
```javascript
ROUTE['v1/record/:id'] = {
    // only the fields 'to' and 'view' are required, the other ones have values by default
    to: 'record_show',
    view: 'view/record/show',
    type: 'GET',
    cache: true,
    params: {
        'id': function(){ 
            // ...
            return id; 
        }
    }
};
```

#### MVC: Assign Controller
*app/js/controller/record.js*
```javascript
CONTROLLER['record_show'] = function(record){
    // render is a controller built-in (connects to the view controller)
    // this will render the data into the DOM
    // if no template was given as 2nd parameter, the default template view is used instead (defined in routes)
    // in this example the passed template is same as the default template from this route
    CONTROLLER.render({
        target: 'dom-element-id', 
        route: 'view/record/show', 
        data: record
    });
    // or use the short form:
    CONTROLLER.render('dom-element-id', 'view/record/show', record);
};
```

#### MVC: Assign View
*app/view/user/show.shtml*
```html
<div data-user="{{ user.id }}">
    <span class="test_class1">{{ user.name }}</span>
    <span class="test_class1">{{ user.email }}</span>
</div>
```
*app/view/media/show.shtml*
```html
<div data-index="{{ index }}">
    <div>{{ title }}</div>
    <img src="{{ src }}">
</div>
```
*app/view/record/show.shtml*
```html
<div data-record="{{ id }}">
    <span class="test_class1">{{ title }}</span>
    <span class="test_class2">{{ date }}</span>
    <span class="test_class3">{{ time }}</span>
    {{ if(user && user.media) }}
        {{ include(view/user/show) }}
    {{ endif }}
    {{ for(user.media) }}
        {{ include(view/media/show) }}
    {{ endfor }}
</div>
```
Since the Template Compiler is working recursively, you can embed multiple dimensions in the same way of this dead simple templating mechanism.

#### MVC: Implement Model (OOP)
*app/js/model/record.js*
```javascript
// Model Constructor:
function Record(data){
    /** @export */
    this.id = data.id;
    /** @export */
    this.title = data.title;
    /** @export */
    this.date = data.date;
    /** @export */
    this.user = data.user;
}

// Model Functions:
MODEL.Record = {

    loop_through_all_records: function(records){

        for(var i = 0; i < records.length; i++){

            console.log('Record found: ', /** @type {Record} */ (records[i]));
        }
    }
};
```

#### MVC: Final Usage

```javascript
CONTROLLER.request('v1/records/:id', { id: 1 }, function(records){
    // data is in json format by default
    // do some extra work with data or use as callback
    APP.MODEL.Record.loop_through_all_records(records);
});
```

#### Request Routes VS. Event Routes
All routing requests follows an built-in chain: the controller perform the request through the route specification and calls the view with the served data. Connecting an event handler to a specific request route is very simple, but keep in mind you also connecting to the controller chain.
Sometimes you don't need the default controller chain, e.g. if you bind a scroll listener. In this case you can define an event handler in *APP.HANDLER* to keep the controller code clean.

A request route is meant to be connected to the controller (aka the "request controller"). An event route is able to connects to either: to a request route with its default chain, or to its corresponding event handler (within you are also able to initiate controller chain).

#### Route Events through the Controller
NOTE: *Event Delegation* is used for multiple events of same functionality, e.g. list of nodes.

Simple Event Binding (used for unique events / elements, e.g. a node by id):
```javascript
// Register/routes a click event to a dom element
EVENT['dom-element-id'] = {
    on: 'click',
    to: 'v1/records/:id', // routes to the request controller and to its chain
    params: function(){   // inline defined function which creates the payload dynamically
        id: this.dataset['user_id']
    }
};
```
Alternatively you can assign a payload externally in *APP.PAYLOAD* to keep the event router clean.

Event Delegation by Class:
```javascript
EVENT['dom-element-id'] = {
    on: 'click',
    if: '.row', // the leading dot indicates a classname
    // instead of using a specific controller like above you can assign a custom handler function
    // the default controller chain will not executed
    // not extra handler definition is required
    do: function(event){
        alert('Clicked node with id: ', this.id);
    }
};
```

Delegate Multiple Event on the same Target:
```javascript
EVENT['dom-element-id'] = [{
    on: 'click',
    if: '.row',
    do: 'my_callback_row'
},{
    on: 'click',
    if: '.column',
    do: 'my_callback_column'
}];
```

Event Delegation by Tag:
```javascript
EVENT['dom-element-id'] = {
    on: 'click',
    if: 'td', // no leading dot indicates a tagname
    to: 'v1/records/:id'
};
```
NOTE: when you are using 'to'-shortcut to a route which requires dynamic params and no params field was set inline, you have to assign a payload respectively on *APP.PAYLOAD*.
    
Event Delegation by Tag with Classname:
```javascript
EVENT['dom-element-id'] = {
    on: 'click',
    if: 'td.classname', // indicates a tag with a specific classname
    do: 'record_message'  // assign an event route to an event handler
};
```
NOTE: In handy to use this 'do'-shortcut you need to register a event handler explained below.

Control Event Delegation:
```javascript
EVENT['dom-element-id'] = {
    on: 'scroll',
    preventDefault: true,
    stopBubble: true,
    returnValue: false
};
```

#### Register Handlers for Non-Request-Controller Events (optionally)
```javascript
HANDLER['record_message'] = function(event){

    console.log("You clicked on element node with ID: ", this.id);
};
```

#### Register Payloads for Event Routes (optionally)
A payload definitions are used to create request parameters from dynamic data. Once a payload was defined it is automatically connected to the event router. If you provide both: a params field in the event routings (inline payload) as well as a payload function, the params field in the event routing was skipped (it is "shadowed").
```javascript
PAYLOAD['record_message'] = function() {

    return {

        id: this.dataset['user_id']
    };
};
```
Alternatively you can assign payloads to the even router inline by assigning the field 'params'.

#### Register Data Mappings (optionally)
You can assign mappings to each model which transforms data into different representations:
```javascript
MAPPER['Record'] = {

    // mapping definition from model data to view data
    // (client model --> view model
    mapToView: {
        'date': function(value){
            return value ? value.substring(0, 10) : value;
        },
        'image': function(value){
            return value || 'img/placeholder.jpg';
        }
    },

    // mapping definition from model data to server payload
    // client model --> server model
    mapToPayload: {
        'username': 'name',
        'date': 'today'
    },

    // mapping definition from server payload to model
    // server model --> client model
    mapToModel: {
        'name': 'username',
        'today': 'date'
    }
};
```
Each mapping definition is bind automatically to the corresponding model and/or controller.

#### Create Specs (Jasmine)
*app/spec/main_spec.js*
```javascript
describe("Validate Record Methods", function() {

    it("Check if record has method 'loop_through_all_records'", function() {

        expect(APP.MODEL.Record.loop_through_all_records).toBeDefined();
    });
});
```

#### Compile Views (Pre-Build)

```bash
>node compile # compiles show.html to show.json
```
<!--
*app/js/view/record/show.json*
```json
[{
    "tag": "div",
    "attr": {
        "id": "test_id"
    },
    "child": [{
        "tag": "span",
        "attr": {
            "class": [
                "test_class1"
            ],
            "style": {
                "display": "block"
            },
            "data": {
                "title": 0
            }
        }
    },{
        "tag": "div",
        "attr": {
            "id": "user_id"
        },
        "child": [{
            "tag": "span",
            "attr": {
                "class": [
                    "test_class1"
                ],
                "style": {
                    "display": "block"
                },
                "data": {
                    "username": 0
                }
            }
        }]
    }]
}]
```
NOTE: The dataset fields gets automatically value by the view controller
-->

#### Build Dynamic Patterns and Templates
```javascript
document.getElementById('my-div').appendChild(
    
    // template
    CORE.buildPattern({
    
        tag: "div",
        attr: {
            "id": "test_id"
        },
        child: [{
            tag: "span",
            attr: {
                "class": [
                    "test_class1"
                ],
                "style": {
                    "display": "block"
                }
            },
            data: {
                "title": user.name
            }
        },{
            tag: "div",
            attr: {
                "id": "user_id"
            },
            child: [{
                tag: "span",
                attr: {
                    "class": [
                        "test_class1"
                    ],
                    "style": {
                        "display": "block"
                    }
                },
                data: {
                    "username": user.name
                }
            }]
        }]
    })
);
```

Another Usage:

```javascript
CORE.buildPattern(document.getElementById('my-div'), {

    // template
});
``` 

#### Build Dynamic Templates By Data
```javascript
CORE.buildData(
    
    // target dom:
    document.getElementById('my-div'), 
    
    // template:
    function(data){ return {   
        tag: "img",
        attr: {
            "src": data.src,
            "alt": data.title
        }
    }}, 

    // data:
    [{
        title: 'Image A',
        src: 'image_a.png'
    },{
        title: 'Image B',
        src: 'image_b.png'
    },{
        title: 'Image C',
        src: 'image_c.png'
    }]
);
``` 

### Xone Dev Tools
#### Build Project (All-In-One):

```bash
>app build
```
Update file contents only (skips compiler):
```bash
>app refresh
```
Compile views (pre-build):
```bash
>app compile
```
Extract source packackes (during first installation):
```bash
>app install
```

#### Create documentation (JSDoc):

```bash
>app docs
```

#### Run test suites:

```bash
>app specs
```
