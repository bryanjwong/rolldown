var todoList = {
  todos: [],
  displayTodos: function() {
    if(this.todos.length === 0) {
      console.log("My Todo list is empty!");
    }
    else {
      console.log("My Todos:");
      this.todos.forEach((todo, i) => {
        var checkbox = "";
        if(todo.completed === true) {
          checkbox = "(x)";
        }
        else {
          checkbox = "( )";
        }
        console.log(checkbox, todo.todoText);
      });
    }
  },
  addTodos: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function() {
    var allCompleted = this.todos.every(function(todo) {
      return todo.completed;
    });
    var toggleValue = allCompleted ? false : true;
    for(let todo of this.todos) {
      todo.completed = toggleValue;
    }
    this.displayTodos();
  }
};

var displayTodosButton = document.getElementById('displayTodosButton');
displayTodosButton.addEventListener('click', function() {
  todoList.displayTodos();
});

var toggleTodosButton = document.getElementById('toggleTodosButton');
toggleTodosButton.addEventListener('click', function() {
  todoList.toggleAll();
});
