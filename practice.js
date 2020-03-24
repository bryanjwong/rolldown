var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var allCompleted = this.todos.every(function(todo) {
      return todo.completed;
    });
    var toggleValue = allCompleted ? false : true;
    this.todos.forEach(function(todo) {
      todo.completed = toggleValue;
    });

  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = "";
    todoList.todos.forEach((todo, i) => {
      var checkbox = "";
      if(todo.completed === true) {
        checkbox = "(x) ";
      }
      else {
        checkbox = "( ) ";
      }
      var todoLi = document.createElement('li');
      todoLi.id = i;
      todoLi.textContent = checkbox + todo.todoText;
      todoLi.appendChild(this.createDeleteButton(i));
      todosUl.appendChild(todoLi);
    });
  },
  createDeleteButton: function(i) {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if(elementClicked.className == 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        view.displayTodos();
      }
    });
  }
};

view.setupEventListeners();

function runWithDebugger(ourFunction) {
  debugger;
  ourFunction();
}
