var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var index = require('./routes/index');
var todo = require('./routes/todo');
var port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/todo', todo);

app.get('/', index);
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || port);
console.log("Listening on port: ", port);
