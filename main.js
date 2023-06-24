//ARGV-ARGC
var myArgs = process.argv.slice(2);

if (myArgs.length < 6) {
  console.log('Invalid Args! Example: "node main.js localhost 80 mongodb://127.0.0.1:27017/Minecraft paper-1.19.3-368.jar -Xms4G -Xmx4G -nogui -autostart"');
  return;
}

var listen_ip = myArgs[0];
var listen_port = myArgs[1];
var db_conn = myArgs[2];
var serverjar = myArgs[3];
var minram = myArgs[4];
var maxram = myArgs[5];
var nogui = myArgs[6];
var autostart = myArgs[7];

//MODULES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./router/router');

//MY MODULES
var my_date = require('./my_modules/my_date');

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
    console.log('Web sunucusu şu adreste çalışmaya başladı -> http://%s:%s', host, port);
    start_subscripts();
  });
}

start_http();

function start_subscripts() {

  var XML = require('./src/xml');
  var CMD = require('./src/cmd');
  var DB = require('./src/db');
  var JAVA = require('./src/java');
}