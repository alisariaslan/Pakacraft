var promptasync = require('prompt-async');
var XML = require('./xml');
var JAVA = require('./java');
var preparestate = 0;

exports.PrepareForInput = function () {
  preparestate++;
  if (preparestate == 1)
    ShowHelp();
}

var ShowHelp = exports.ShowHelp = function () {
  console.log('KOMUTLAR');
  console.log('exit: Projeyi kapatır.');
  console.log('clear: Konsolu temizler.');
  console.log('start: Minecraft sunucusunu başlatır.');
  console.log('wait: 10 Saniye boyunca giriş bekletir.');
  console.log('wait long: 60 Saniye boyunca giriş bekletir.');
  console.log('get ip: Sunucuya ait ip adresini getirir.');
  console.log('get state: Web sunucusunun durumunu getirir.');
  console.log('set state 0-1-2: Web sunucusunun durumunu günceller. 0 Closed, 1 Open, 2 In Maintenance');
  console.log('exit: Projeyi kapatır.');
  console.log('OYUN İÇİ');
  console.log('stop: Sunucuya dur komutunu gönderir.');
  console.log('pakaCMD "command": Sunucuya komut gönderir.');
  WaitInput();
}

var WaitInput = exports.WaitInput = async function () {
  promptasync.start();
  const { input } = await promptasync.get(['input']);
  if (input.includes('start'))
    JAVA.StartMCServer();
  else if (input.includes('help'))
    ShowHelp();
  else if (input.includes('clear')) {
    console.clear();
    WaitInput();
  }
  else if (input.includes('wait long')) {
    await new Promise(resolve => setTimeout(resolve, 60000));
    WaitInput();
  }
  else if (input.includes('wait')) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    WaitInput();
  }
  else if (input.includes('pakaCMD')) {
    var rawcmd = input.substring(8);
    console.log(rawcmd);
    JAVA.sendToProcess(rawcmd);
    WaitInput();
  } else if (input.includes('stop'))
    JAVA.sendToProcess('stop');
  else if (input.includes('get ip')) {
    var c = XML.GetXML('public/info.xml', 'pc_link');
    console.log(c);
    WaitInput();
  } else if (input.includes('set state')) {
    var state;
    if (input.includes('0'))
      XML.UpdateXML('public/info.xml', 'state', state = 'Closed');
    else if (input.includes('1'))
      XML.UpdateXML('public/info.xml', 'state', state = 'Open');
    else if (input.includes('2'))
      XML.UpdateXML('public/info.xml', 'state', state = 'In Maintenance');
    console.log("Server state changed to: " + state);
    WaitInput();
  } else if (input.includes("exit")) {
    process.exit(1);
  } else if (input.includes("get state")) {
    var state = JAVA.GetServerState();
    console.log(state);
    WaitInput();
  }
  else {
    console.log('Invalid command! (help)');
    WaitInput();
  }
}