goog.provide('APP.MAIN');
goog.require('APP.EVENT.App');
goog.require('APP.ROUTE.App');

// define app layout:

APP.CONFIG.LAYOUT = [

	'layout/app' // points to "app/layout/app.shtml"
];

// provide entry point:

APP.MAIN = function(){

	APP.CONTROLLER.request(window.location.hash);
};
