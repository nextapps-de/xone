goog.provide('APP.ROUTE.App');
goog.require('APP.CONTROLLER.Main');

(function(ROUTE, CONTROLLER){

	ROUTE['#/'] = (

		CONTROLLER.Main
	);

	ROUTE['#/active'] = {

		to: CONTROLLER.Main,
		params: 'active'
	};

	ROUTE['#/completed'] = {

		to: CONTROLLER.Main,
		params: 'completed'
	};
})(
	APP.ROUTE,
	APP.CONTROLLER
);
