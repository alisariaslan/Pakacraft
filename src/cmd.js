var promptasync = require('prompt-async');
var xml = require('./xml');
var java = require('./java');
var cmd_state = 0;

var ShowHelp = exports.ShowHelp = function (type = 0) {
  if (type == 0) {
    console.log('FOR PROJECT COMMANDS');
    console.log('exit:            Closes the project.');
    console.log('help:            Shows avaible commands.');
    console.log('clear:           Console clear.');
    console.log('start:           Starts Minecraft Server.');
    console.log('wait:            Waits 10 seconds.');
    console.log('wait long:       Waits 60 seconds.');
    console.log('ip:              Shows IP in the info.xml');
    console.log('state:           Shows STATE in the info.xml');
    console.log('state 0-1-2:     Updates STATE in the info.xml -> 0: Closed, 1: Open, 2: In Maintenance');
  }
  else {
    console.log('FOR PROCESS COMMANDS');
    console.log('stop:            Sends stop signal to process.');
    console.log('send "command":  Sends command to process.');
  }
  WaitInput();
}

var WaitInput = exports.WaitInput = async function () {
  if (cmd_state == 1)
    return;
  cmd_state = 1;
  promptasync.start();
  const { input } = await promptasync.get(['input']);

  if (input.includes("exit")) {
    process.exit(1);
  }
  else if (input.includes('help')) {
    ShowHelp();
  }
  else if (input.includes('clear')) {
    console.clear();
  }
  else if (input.includes('start')) {
    java.StartServer();
  }
  else if (input.includes('wait')) {
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  else if (input.includes('wait long')) {
    await new Promise(resolve => setTimeout(resolve, 60000));
  }
  else if (input.includes('ip')) {
    var c = xml.GetXML('public/info.xml', 'pc_link');
    console.log(c);
  } else if (input.includes('state')) {
    var state;
    if (input.includes('0'))
      xml.UpdateXML('public/info.xml', 'state', state = 'Closed');
    else if (input.includes('1'))
      xml.UpdateXML('public/info.xml', 'state', state = 'Open');
    else if (input.includes('2'))
      xml.UpdateXML('public/info.xml', 'state', state = 'In Maintenance');
    else
      console.log("Server state: " + java.GetState());
  }
  else if (input.includes('stop')) {
    java.StopServer();
  }
  else if (input.startsWith('send')) {
    var rawcmd = input.substring(5);
    java.SendToProces(rawcmd);
  }
  else {
    console.log('Invalid command! (help)');
  }
  cmd_state = 0;
  WaitInput();
}