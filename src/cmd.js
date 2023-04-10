var promptasync = require("prompt-async");
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
  console.log('start: Minecraft sunucusunu başlatır.');
  console.log('wait: 10 Saniye boyunca giriş bekletir.');
  console.log('wait long: 60 Saniye boyunca giriş bekletir.');
  WaitInput();
}

var WaitInput = exports.WaitInput = async function () {
  promptasync.start();
  const { input } = await promptasync.get(["input"]);
  if (input.includes("start"))
    JAVA.StartMCServer();
  else if (input.includes("help"))
    ShowHelp();
  else if (input.includes("wait long"))
    setInterval(WaitInput, 60000);
  else if (input.includes("wait"))
    setInterval(WaitInput, 10000);
  else if (input.includes("get")) {
    var c = XML.GetXML('public/info.xml', 'pc_link');
    console.log(c);
    WaitInput();
  } else if (input.includes("set")) {
    XML.UpdateXML('public/info.xml', 'version', '1.19.3');
    WaitInput();
  } else if (input.includes("exit")) {
    process.exit(1);
  } else if (input.includes("state")) {
    var state = JAVA.GetServerState();
    console.log(state);
    WaitInput();
  }
  else {
    console.log('Geçersiz Komut! (help)');
    WaitInput();
  }
}