goog.provide('APP.MODEL.Todo');
goog.require('APP.MODEL');

/**
 * @type _model_helper
 */

APP.MODEL.Todo = (function(){

	var Todo = APP.MODEL.register('Todo', [

		'id', 'title', 'completed'
	]);

	// model events (callbacks):

	Todo.onCreate =
	Todo.onUpdate =
	Todo.onDelete = function(){

		APP.CONTROLLER.Main();
	};

	return Todo;

})();
