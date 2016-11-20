var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';



router.get('/', function(req, res) {

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM todos', function(err, result) {
      done();


      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      res.send(result.rows);
    });
  });
});



router.post('/', function(req, res) {

  var newTodo = req.body;
  console.log(req.body);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO todos (title, description) ' +
      'VALUES ($1, $2)',
      [newTodo.title, newTodo.description],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });

});

router.delete('/:id', function(req, res) {
  var todoID = req.params.id;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'DELETE FROM todos WHERE id = $1',
      [todoID],
      function(err, result) {
        done();
        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});

router.put('/:id', function(req, res) {
  var todoID = req.params.id;
  var todo = req.body;


  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      "UPDATE todos SET title=$1, description=$2" +
       "WHERE id=$3",
      // array of values to use in the query above
      [todo.title, todo.description, todoID],
      function(err, result) {
        if(err) {
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});

module.exports = router;
