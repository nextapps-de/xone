goog.provide('APP.EVENT.App');
goog.require('APP.EVENT');
goog.require('APP.HANDLER.Event');

(function(EVENT, HANDLER){

	EVENT['document'] = [{

		on: 'keyup:enter',
		if: 'input.new-todo',
		do: [HANDLER.createTodo, HANDLER.cancelCreate]
	},{

		on: 'keyup:esc',
		if: 'input.new-todo',
		do: HANDLER.cancelCreate
	},{

		on: ['keyup:enter', 'focusout'],
		if: 'input.edit',
		at: '< li',
		do: [HANDLER.editTodo, HANDLER.cancelEdit]
	},{

		on: 'keyup:esc',
		if: 'input.edit',
		at: '< li',
		do: HANDLER.cancelEdit
	},{

		on: 'change',
		if: 'input.toggle',
		at: '< li',
		do: HANDLER.updateState
	},{

		on: 'clickmove',
		if: 'button.destroy',
		at: '< li',
		do: HANDLER.deleteTodo
	},{

		on: 'dblclick',
		if: 'label.title',
		at: '< li',
		do: HANDLER.enterEditMode
	},{

		on: 'clickmove',
		if: 'button.clear-completed',
		do: HANDLER.deleteCompleted
	},{

		on: 'change',
		if: 'input.toggle-all',
		do: HANDLER.toggleAllStates
	}];
})(
	APP.EVENT,
	APP.HANDLER
);
