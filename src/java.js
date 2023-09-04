var myArgs = process.argv.slice(2);

var serverjar = myArgs[3];
var minram = myArgs[4];
var maxram = myArgs[5];

var nogui = "";
if (myArgs.includes('-nogui')) {
  nogui = '-nogui';
}

var { spawn } = require('child_process');
var my_date = require('./../my_modules/my_date');
var XML = require('./xml');
var CMD = require('./cmd');
var os = require('os');

//MINECRAFT
var minecraft_server = `cd minecraft_server && java ${minram} ${maxram} -jar ${serverjar} ${nogui}`;
var manuel_kapama = 0;

var current_process = null;
var begin = process => {

  process.on('spawn', function (data) {  //ON START
    console.log(my_date.getdatelog() + 'Minecraft Server starting...');
    XML.UpdateXML('public/info.xml', 'state', 'Starting');
  });

  process.on('close', () => {  //ON CLOSE
    if (!manuel_kapama) {
      console.log(my_date.getdatelog() + 'Minecraft Server CRASHED! It will restart automatically.');
      begin(spawn(minecraft_server, { shell: true }));
    }
    else {
      console.log(my_date.getdatelog() + 'Minecraft server manually closed. Minecraft Server will not restart automatically!');
      XML.UpdateXML('public/info.xml', 'state', 'Closed');
      CMD.WaitInput();
    }
  })

  process.stdout.on('data', async function (data) {   //ON DATA
    if (myArgs.includes('-nogui'))
      console.log('stdout: ' + data);
    if (data.includes("INFO]: Stopping the server"))
      manuel_kapama = 1;
    if (data.includes('For help, type "help"')) {
      console.log(my_date.getdatelog() + 'Active information came from Minecraft Server. Status changed.');
      XML.UpdateXML('public/info.xml', 'state', 'Open');
   
        await new Promise(resolve => setTimeout(resolve, 10000));
        CMD.ShowHelp();
      
    }
    if (data.includes("Stopping the server")) {
      console.log(my_date.getdatelog() + 'Minecraft Server received STOP command. Server is closing...')
      XML.UpdateXML('public/info.xml', 'state', 'Closing');
      await new Promise(resolve => setTimeout(resolve, 30000));
      var state = getstate();
      if(state.includes('Closing')) {
        console.log(my_date.getdatelog() + 'Closing process freezed! Forcing to shutdown instant.');
        current_process.kill(); 
      }
    }
  });
  process.stderr.on('data', function (data) {   //ON ERROR
    console.log(my_date.getdatelog() + 'Process Warning: ' + data);
  });
  current_process = process;
}

var StartMCServer = exports.StartMCServer = function () {
  begin(spawn(minecraft_server, { shell: true }));
}

var getstate = exports.GetServerState = function () {
  return XML.GetXML('public/info.xml', 'state');
}

var sendToProces = exports.sendToProcess = function (data) {
  current_process.stdin.write(data);
  current_process.stdin.write(os.EOL);
};
