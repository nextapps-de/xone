goog.provide('APP.CONTROLLER.Main');
goog.require('APP.CONTROLLER');
goog.require('APP.MODEL.Todo');

APP.CONTROLLER.Main = (function(Todo){

	var current_filter;

	return function MainController(params, target){

		// update select state:

		if(target){

			current_filter = params;

			CORE.toggleClass(['a.selected', target], 'selected');
		}

		// render view:

		APP.CONTROLLER.render({

			// uses view "app/view/todo/list.shtml"
			view: 'view/todo/list',

			// models to render
			data: filterTodosBy(current_filter),

			// destination dom element
			target: 'ul.todo-list',

			// callback
			callback: updateView
		});
	};

	// private helpers:

	function filterTodosBy(filter){

		return filter ?

			Todo.where('completed', filter === 'completed')
		:
			Todo.all();
	}

	function updateView(){

		var count_all = Todo.count();
		var count_active = Todo.count('completed', false);
		var count_completed = count_all - count_active;

		// update container visibility
		CORE.setStyle(['.main', '.footer'], 'display',
			count_all ? 'block' : 'none'
		);

		// update button visibility
		CORE.setStyle('.clear-completed', 'display',
			count_completed ? 'block' : 'none'
		);

		// update counter
		CORE.setHTML('.todo-count',
			'<strong>' + count_active + '</strong> item' + (count_active === 1 ? '' : 's') + ' left'
		);

		// update checkbox
		CORE.getById('toggle-all').checked = !count_active;
	}

})(APP.MODEL.Todo);
