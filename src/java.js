var myArgs = process.argv.slice(2);

var minram = myArgs[4];
var maxram = myArgs[5];
var serverjar = myArgs[3];

var { spawn } = require('child_process');
var my_date = require('./../my_modules/my_date');
var XML = require('./xml');
var CMD = require('./cmd');
var os = require('os');

//MINECRAFT
var minecraft_server = `cd minecraft_server && java ${minram} ${maxram} -jar ${serverjar}`;
var manuel_kapama = 0;

var current_process = null;
var begin = process => {

  process.on('spawn', function (data) {  //ON START
    console.log(my_date.getdatelog() + 'Minecraft sunucusu başlatılıyor...');
    XML.UpdateXML('public/info.xml', 'state', 'Başlatılıyor...');
  });

  process.on('close', () => {  //ON CLOSE
    if (!manuel_kapama) {
      console.log(my_date.getdatelog() + 'Minecraft sunucusu ÇÖKTÜ! Otomatik olarak yeniden başlatılacak.');
      begin(spawn(minecraft_server, { shell: true }));
    }
    else {
      console.log(my_date.getdatelog() + 'Minecraft sunucusu MANUEL KAPATILDI. Sunucu otomatik olarak yeniden başlatılmayacak!');
      XML.UpdateXML('public/info.xml', 'state', 'Kapalı');
      CMD.WaitInput();
    }
  })

  process.stdout.on('data', function (data) {   //ON DATA
    //console.log('stdout: ' + data);
    if (data.includes("INFO]: Stopping the server"))
      manuel_kapama = 1;
    if (data.includes("Done (")) {
      console.log(my_date.getdatelog() + 'Minecraft sunucusunun AKTİF olduğu bilgisi alındı.');
      XML.UpdateXML('public/info.xml', 'state', 'Açık');
    }
    if (data.includes("Stopping the server")) {
      console.log(my_date.getdatelog() + 'Minecraft sunucusu STOP komutu aldı! Sunucu kapatılıyor...')
      XML.UpdateXML('public/info.xml', 'state', 'Kapatılıyor...');
    }
  });
  process.stderr.on('data', function (data) {   //ON ERROR
    console.log(my_date.getdatelog() + 'İşlem UYARI: ' + data);
  });
  current_process = process;
}

var StartMCServer = exports.StartMCServer = function () {
  begin(spawn(minecraft_server, { shell: true }));
}

exports.GetServerState = function () {
  return XML.GetXML('public/info.xml','state');
}

var sendToProces = exports.sendToProcess = function (data) {
  current_process.stdin.write(data);
  current_process.stdin.write(os.EOL);
};
