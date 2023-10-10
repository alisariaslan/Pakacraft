//ARGV-ARGC
var myArgs = process.argv.slice(2);
var listen_ip = myArgs[0];
var listen_port = myArgs[1];

//MODULES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./router/router');

//USE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(routes);
//HANDLEBAR
var handlebars = require('express3-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

function start_http() {
  var server = app.listen(listen_port, listen_ip, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Web server started at -> http://%s:%s', host, port);
  });
}

start_http();

