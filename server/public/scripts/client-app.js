$(document).ready(function () {

    getTodos();

    $('#taskSubmit').on('click', function (){
      postTodos();
      $('#todoForm').find('input').val('');
    });

    $("#todo-list").on('click', '.delete', deleteTodo);

    $("#todo-list").on('click', '.update', updateTodos);

    $("#todo-list").on('click', '.complete', completeTodo);

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
    data: todo,
    success: function(response) {
      getTodos();
      console.log(response);
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
    data: todos,
    success: function(todos) {
      getTodos();
    },
    error: function(todos) {
      console.log('could not update task!');
    }
  });
}

function completeTodo () {

  $(this).parent().removeClass('incomplete').addClass('completed');

  var id = $(this).parent().data('id');


}

function appendTodos(todos) {
  $("#todo-list").empty();
  $("#finished-list").empty();


  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
    $("#todo-list").append('<div class="row incomplete"></div>');
    $el = $('#todo-list').children().last();

    $el.data('id', todo.id);

    $el.append('<input type="text" name="title" value="' + todo.title + '" />');
    $el.append('<input type="text" name="description" value="' + todo.description + '" />');
    $el.append('<button class="update">Update</button>');
    $el.append('<button class="delete">Delete</button>');
    $el.append('<button class="complete">Complete</button>');


    }
}
