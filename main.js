//ARGV-ARGC
var myArgs = process.argv.slice(2);
if (myArgs.length < 6)
  return console.log('Invalid Args! Example: "node main.js localhost 80 mongodb://127.0.0.1:27017/Minecraft 4 server.jar -http"');

var listen_ip = myArgs[0];
var listen_port = myArgs[1];
var htt_type = myArgs[5];

//MODULES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./router/router');
var https = require('https');
var fs = require('fs');

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

//HTTPS SERVER
function start_https() {
  if (myArgs.length < 8) {
    console.log('Invalid Args! Example: "node main.js localhost 80 mongodb://127.0.0.1:27017/Minecraft 4 server.jar -https key.ex cert.ex" ');
    return;
  }
  var ssl_key = myArgs[6];
  var ssl_cert = myArgs[7];
  const server = https.createServer({
    key: fs.readFileSync('ssl/' + ssl_key),
    cert: fs.readFileSync('ssl/' + ssl_cert),
    ca: myArgs[8] != null ? fs.readFileSync('ssl/' + myArgs[8]) : null,
    address: listen_ip,
    port: listen_port
  }, app);
  server.listen(443);
  console.log('Web sunucusu şu adreste çalışmaya başladı -> https://%s:%s', listen_ip, listen_port);
  start_subscripts();
}

function start_http() {
  var server = app.listen(listen_port, listen_ip, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Web sunucusu şu adreste çalışmaya başladı -> http://%s:%s', host, port);
    start_subscripts();
  });
}

if (htt_type.includes('-https'))
  start_https();
else if (htt_type.includes('-http'))
  start_http();
else
  console.log('Invalid Args! Example: "node main.js localhost 80 -http / -https');

function start_subscripts() {

  var XML = require('./src/xml');
  var CMD = require('./src/cmd');
  var DB = require('./src/db');
  var JAVA = require('./src/java');
}