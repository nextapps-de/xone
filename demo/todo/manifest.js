/**
 * @type {JSON}
 */

var MANIFEST = {

    "dependencies": {

        "calculate": false,
		"xone": "lib/xone/",
        "copy": [
            "index.html"
        ],
        "css": [
        	"node_modules/todomvc-common/base.css",
			"node_modules/todomvc-app-css/index.css"
        ],
        "js_extern": [
			"node_modules/todomvc-common/base.js"
		],
        "js": [
			"js/model.js",
			"js/handler.js",
			"js/event.js",
			"js/controller.js",
			"js/route.js",
			"js/main.js"
		]
    },
	"config": {

    	"STORAGE_PREFIX": "todos-xone:",
		"ENABLE_DOM_CACHE": true,
		"ENABLE_STYLE_CACHE": true,
		"ENABLE_CLASS_CACHE": true,
		"ENABLE_EVENT_CACHE": true,
		"ENABLE_STORAGE_CACHE": true,
		"ENABLE_MAPPER_CACHE": true,
		"ENABLE_MODEL_CACHE": true,
		"ENABLE_HTML_CACHE": false
	}
};
