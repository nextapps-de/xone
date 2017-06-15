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
            "layout/layout.js",
            "view/view.js",
            "js/require.js",
            "js/main.js",
            "js/setup.js"
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
};
