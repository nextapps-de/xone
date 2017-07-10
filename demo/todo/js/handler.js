goog.provide('APP.HANDLER.Event');
goog.require('APP.MODEL.Todo');

(function(HANDLER, Todo){

	HANDLER.createTodo = function(event, target){

		var value = CORE.trim(this.value);

		if(value){

			Todo.create({

				'id': CORE.randomString(8),
				'title': value,
				'completed': false
			});
		}
	};

	HANDLER.editTodo = function(event, target){

		var value = CORE.trim(this.value);

		if(value){

			Todo.update(target, 'title', value, /* save? */ true);
		}
		else{

			Todo.delete(target);
		}
	};

	HANDLER.cancelCreate = function(event, target){

		this.value = '';
	};

	HANDLER.cancelEdit = function(event, target){

		this.value = CORE.getClosest(target, '>.title').textContent;

		CORE.removeClass(target, 'editing');
	};

	HANDLER.updateState = function(event, target){

		Todo.find(target)
			.update('completed', this.checked)
			.save();
	};

	HANDLER.toggleAllStates = function(event, target){

		Todo.updateAll('completed', this.checked, /* save? */ true);
	};

	HANDLER.deleteCompleted = function(event, target){

		Todo.deleteWhere('completed', true);
	};

	HANDLER.deleteTodo = function(event, target){

		Todo.delete(target);
	};

	HANDLER.enterEditMode = function(event, target){

		CORE.addClass(target, 'editing');
		CORE.focusInput(CORE.getClosest(target, '>.edit'));
	};
})(
	APP.HANDLER,
    APP.MODEL.Todo
);
