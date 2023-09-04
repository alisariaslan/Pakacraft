var my_date = require('./../my_modules/my_date');
var CMD = require('./cmd');
var JAVA = require('./java');

var myArgs = process.argv.slice(2);
var mongodb_connection_string = myArgs[2];


//MONGODB
var mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(mongodb_connection_string);
var db = mongoose.connection;
db.on('error', console.log.bind(console, my_date.getdatelog() + "MongoDB connection error!"));
db.once('open', function (callback) {
  console.log(my_date.getdatelog() + "MongoDB connection success.");
  if (myArgs.includes('-autostart'))
    JAVA.StartMCServer();
  else CMD.ShowHelp();
})