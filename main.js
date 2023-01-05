//VARIABLES
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var my_date = require('./my_modules/my_date');
var routes = require('./router/router');
var mcserver = require('./minecraft_cmd/start');

//USE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({ cookie: { maxAge: null } }));
app.use(routes);

//HANDLEBAR
const handlebars = require('express3-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
})

//MONGODB
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/pakacraft');
var db = mongoose.connection;
db.on('error', console.log.bind(console, my_date.getdatelog() + "MongoDB veritabanı bağlantısı hatalı!"));
db.once('open', function (callback) {
  console.log(my_date.getdatelog() + "MongoDB veritabanı bağlantısı başarılı.");
})

//LISTEN
var server = app.listen(88, '192.168.1.101', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(my_date.getdatelog() + 'Web sunucusu şu adreste çalışmaya başladı -> http://%s:%s', host, port);
});

