goog.provide('APP.HANDLER.Event');
goog.require('APP.MODEL.Todo');

APP.HANDLER = (function(Todo){

	return {

		createTodo: function(event, target){

			var value = CORE.trim(this.value);

			if(value){

				Todo.create({

					'id': CORE.randomString(8),
					'title': value,
					'completed': false
				});
			}
		},

		editTodo: function(event, target){

			var value = CORE.trim(this.value);

			if(value){

				Todo.update(target, 'title', value, /* save? */ true);
			}
			else{

				Todo.delete(target);
			}
		},

		cancelCreate: function(event, target){

			this.value = '';
		},

		cancelEdit: function(event, target){

			this.value = CORE.getClosest(target, '>.title').textContent;

			CORE.removeClass(target, 'editing');
		},

		updateState: function(event, target){

			Todo.find(target)
				.update('completed', this.checked)
				.save();
		},

		toggleAllStates: function(event, target){

			Todo.updateAll('completed', this.checked, /* save? */ true);
		},

		deleteCompleted: function(event, target){

			Todo.deleteWhere('completed', true);
		},

		deleteTodo: function(event, target){

			Todo.delete(target);
		},

		enterEditMode: function(event, target){

			CORE.addClass(target, 'editing');
			CORE.focusInput(CORE.getClosest(target, '>.edit'));
		}
	};

})(APP.MODEL.Todo);
