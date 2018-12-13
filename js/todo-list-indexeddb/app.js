/** @file The main logic for the Todo List App.*/

window.onload = function() {
	todoDB.open(refreshTodos); // Display the todo items.
	var newTodoForm = document.getElementById('new-todo-form'); // Get references to the form elements.
	var newTodoInput = document.getElementById('new-todo');
	newTodoForm.onsubmit = function() {	// Handle new todo item form submissions.
		var text = newTodoInput.value; // Get the todo text.
		// Check to make sure the text is not blank (or just spaces).
		if (text.replace(/ /g,'') != '') {
			// Create the todo item
			 todoDB.createTodo(text, function(todo) {refreshTodos();});
		}
		// Reset the input field.
		newTodoInput.value = '';
		return false;// Don't send the form.
	};
	
}

// Update the list of todo items.
function refreshTodos() {	
	todoDB.fetchTodos(function(todos) {
		var todoList = document.getElementById('todo-items');
		todoList.innerHTML = '';
		
		for(var i = 0; i < todos.length; i++) {
			// Read the todo items backwards (most recent first).
			var todo = todos[(todos.length - 1 - i)];

			var li = document.createElement('li');
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.className = "todo-checkbox";
			checkbox.setAttribute("data-id", todo.timestamp);
			
			li.appendChild(checkbox);
			
			var span = document.createElement('span');
			span.innerHTML = todo.text;
			
			li.appendChild(span);
			
			todoList.appendChild(li);
			
			// Setup an event listener for the checkbox.
			checkbox.addEventListener('click', function(e) {
				var id = parseInt(e.target.getAttribute('data-id'));

				todoDB.deleteTodo(id, refreshTodos);
			});
		}

	});
}
