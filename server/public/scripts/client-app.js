$(document).ready(function () {

    getTodos();

    // add a book
    $('#Tasksubmit').on('click', postTodos);
    // delete a book
    $("#todo-list").on('click', '.delete', deleteTodo);
    // update a book
    $("#todo-list").on('click', '.update', updateTodos);

});

function getTodos() {
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: function(todos) {
      appendTodos(todos);
    },
    error: function() {
      console.log('Database error');
    }
  });
}

function postTodos() {
  event.preventDefault();

  var todo = {};

  $.each($('#todoForm').serializeArray(), function (i, field) {
    todo[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/todo',
    data: todos,
    success: function(todos) {
      getTodos();
    },
    error: function() {
      console.log('could not post a new task');
    }
  })

}

function deleteTodo() {
  var id = $(this).parent().data('id');

  $.ajax({
    type: 'DELETE',
    url: '/todo/' + id,
    success: function(todos) {
      getTodos();
    },
    error: function(result) {
      console.log('could not delete task.');
    }
  });
}

function updateTodos() {
  var id = $(this).parent().data('id');
  console.log(id);

  // make book object
  var todos= {};
  var fields = $(this).parent().children().serializeArray();
  fields.forEach(function(field) {
    todos[field.name] = field.value;
  });

  $.ajax({
    type: 'PUT',
    url: '/todo/' + id,
    data: todo,
    success: function(todos) {
      getTodos();
    },
    error: function(todos) {
      console.log('could not update task!');
    }
  });
}

function appendTodos(todos) {
  $("#todo-list").empty();

  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
    $("#todo-list").append('<div class="row todo"></div>');
    $el = $('#todo-list').children().last();

    $el.data('id', todo.id);

    $el.append('<input type="text" name="title" value="' + todo.title + '" />');
    $el.append('<input type="text" name="author" value="' + todo.description + '" />');
    // $el.append('<input type="text" name="genre" value="' + book.genre + '" />');

    $el.append('<button class="update">Update</button>');
    $el.append('<button class="delete">Delete</button>');
  }
}
