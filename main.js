//ARGV-ARGC
var myArgs = process.argv.slice(2);
if (myArgs.length != 5)
  return console.log("Yetersiz argüman! (Ip, Port, MongoDB, Ram, Target)")

var listen_ip = myArgs[0];
var listen_port = myArgs[1];

//MY MODULES
var my_date = require('./my_modules/my_date');

//START SUB SCRIPTS
var XML = require('./src/xml');
var CMD = require('./src/cmd');
var DB = require('./src/db');
var JAVA = require('./src/java');

//MODULES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./router/router');
var https = require('https');
var fs = require('fs');

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

//HTTPS SERVER
const server = https.createServer({
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem'),
  address: listen_ip,
  port: listen_port
}, app);

server.listen(443);
