/**
 * MANIFEST
 * @const
 * @type {JSON}
 */

var MANIFEST = {

    /**
     * Set the local environment to one of these:
     * 1. "production"
     * 2. "development"
     * 3. "benchmark"
     * 4. "test"
     */

    "env": "development",

    // Change local platform here:
    "platform": "www",

    // Manage project dependencies and externals
    "dependencies": {

        // Enable dependency autosort (strict mode)
        "calculate": false,

        "xone": "lib/xone/", //"../node_modules/xone/",

        "build": [

            "index.html",
            "img",
            "font"
        ],
        "deploy": {

        },
        "css": [

            "css/style.css"
        ],
        "less": [

            "css/build.less"
        ],
        "less_fallback": [

            "css/build.css"
        ],
        "js_extern": [],
        "js": [

            "js/init.js",
            "js/main.js"
        ],
        "production": [],
        "development": [],
        "benchmark": [],
        "test": [],
        "spec": [

            "test/helper.js",
            "test/main_spec.js"
        ]
    },

    // Define default configs for all environments
    "config": {

        "ENABLE_EVENT_CACHE": true,
        "ENABLE_MODEL_CACHE": true,
        "ENABLE_STORAGE_CACHE": true,
        "ENABLE_MAPPER_CACHE": true,
        "ENABLE_DOM_CACHE": false,
        "ENABLE_STYLE_CACHE": false,
        "ENABLE_CLASS_CACHE": false,
        "ENABLE_HTML_CACHE": false
    }
};
