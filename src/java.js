var myArgs = process.argv.slice(2);
var serverjar = myArgs[2];
var minram = myArgs[3];
var maxram = myArgs[4];
var { spawn } = require('child_process');
var my_date = require('./../my_modules/my_date');
var xml = require('./xml');
var cmd = require('./cmd');
var os = require('os');
var nogui = "";
if (myArgs.includes('-nogui')) {
  nogui = '-nogui';
}
var minecraft_server = `cd Pakacraft && java ${minram} ${maxram} -jar ${serverjar} ${nogui}`;
var closed_manually = 0;
var current_process = null;

var StartServer = exports.StartServer = function () {
  begin(spawn(minecraft_server, { shell: true }));
}
var StopServer = exports.StopServer = function () {
  if (current_process != null) {
    closed_manually = 1;
    SendToProces('stop');
  } else {
    console.log(my_date.getdatelog() + 'Server is not running!');
  }
}

var KillServer = exports.KillServer = function () {
  if (current_process != null) {
    current_process.kill();
    current_process = null;
    console.log(my_date.getdatelog() + 'Forced to shutdown instant.');
  } else {
    console.log(my_date.getdatelog() + 'Server is not running!');
  }
}

var GetState = exports.GetState = function () {
  return xml.GetXML('public/info.xml', 'state');
}

var SendToProces = exports.SendToProces = function (data) {
  if (current_process != null) {
    current_process.stdin.write(data);
    current_process.stdin.write(os.EOL);
  } else {
    console.log(my_date.getdatelog() + 'Server is not running!');
  }
};

var begin = process => {
  process.on('spawn', function (data) {  //ON START
    console.log(my_date.getdatelog() + 'Minecraft Server starting...');
    xml.UpdateXML('public/info.xml', 'state', 'Starting');
  });

  process.on('close', () => {  //ON CLOSE
    if (!closed_manually) {
      console.log(my_date.getdatelog() + 'Minecraft Server CRASHED! It will restart automatically.');
      StartServer();
    }
    else {
      console.log(my_date.getdatelog() + 'Minecraft server manually closed. Minecraft Server will not restart automatically!');
      xml.UpdateXML('public/info.xml', 'state', 'Closed');
      cmd.ShowHelp(0);
    }
  })

  process.stdout.on('data', async function (data) {   //ON DATA
    if (myArgs.includes('-nogui'))
      console.log(my_date.getdatelog() +  'SERVER: ' + data);
    if (data.includes('For help, type "help"')) {
      console.log(my_date.getdatelog() + 'Active information came from Minecraft Server. Status changed.');
      xml.UpdateXML('public/info.xml', 'state', 'Open');
      await new Promise(resolve => setTimeout(resolve, 10000));
      cmd.ShowHelp(1);
    }
    if (data.includes("Stopping the server")) {
      console.log(my_date.getdatelog() + 'Minecraft Server received STOP command. Server is closing...')
      xml.UpdateXML('public/info.xml', 'state', 'Closing');
      await new Promise(resolve => setTimeout(resolve, 30000));
      var state = GetState();
      if (state.includes('Closing')) {
        console.log(my_date.getdatelog() + 'Closing process freezed! Forcing to shutdown instant.');
        KillServer();
      }
    }
  });
  process.stderr.on('data', function (data) {   //ON ERROR
    console.log(my_date.getdatelog() + 'SERVER ERROR: ' + data);
  });
  current_process = process;
}
