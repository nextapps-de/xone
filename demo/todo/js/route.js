goog.provide('APP.ROUTE.App');
goog.require('APP.CONTROLLER.Main');

APP.ROUTE = {

	'#/': APP.CONTROLLER.Main,

	'#/active': {

		to: APP.CONTROLLER.Main,
		params: 'active'
	},

	'#/completed': {

		to: APP.CONTROLLER.Main,
		params: 'completed'
	}
};
