var args = process.argv.slice(2);
var ip = args[0];
var port = args[1];
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./src/router');
var java = require('./src/java');
var cmd = require('./src/cmd');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(routes);
var handlebars = require('express3-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

function start_http() {
  var server = app.listen(port, ip, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Web server started at -> http://%s:%s', host, port);
    if (args.includes('-autostart'))
      java.StartServer();
    else
      cmd.ShowHelp(0);
  });
}

start_http();