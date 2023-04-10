/*

var spawner = 'cd minecraft_server && java -Xms4G -Xmx4G -jar paper-1.19.3-368.jar';
var os = require("os");
var status_changer = require('./status_changer');

var fs = require('fs');

//CHILD PROCESS
var { spawn } = require('child_process');
var process = spawn(spawner, [""], { shell: true });
process.stdin.setEncoding('utf-8');


//WHEN PROCESS HAS DATA
process.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
  if (data.includes("[Server] Sunucu aktif. Web hizmetlerine bilgi veriliyor...")) {
    status_changer.setStatON();
  }
});

//WHEN CHILD PROCESS HAS ERROR
process.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

//WHEN CHILD PROCESS ON CLOSE
process.on('close', function (data) {
  console.log(my_date.getdatelog() + 'Minecraft sunucusu kapandı.');
  status_changer.setStatOFF();
  process = spawn(spawner, [""], { shell: true });
  process.stdin.setEncoding('utf-8');
});

//WHEN CHILD PROCESS ON START




setTimeout(function () {
  sendToProces('say Sunucu aktif. Web hizmetlerine bilgi veriliyor...');
}, 60000)

//CONTANTLY READS AND APPLYS COMMANDS INSIDE TXT FILE
var fileloc = './minecraft_cmd/applyconst.txt';
var applyConstantly = function () {
  fs.readFile(fileloc, 'utf8', function (err, data) {
    if (data) {
      sendToProces(data);
      console.log(my_date.getdatelog() + 'applyconst.txt dosyası okundu & uygulandı -> ' + data)
      fs.writeFile(fileloc, '', function (err) {
        if (err) {
          console.log(my_date.getdatelog() + 'applyconst.txt yazma hatası verdi! -> ' + err)
        }
      });
    }
    if (err) {
      console.log(my_date.getdatelog() + 'applyconst.txt okuma hatası verdi! -> ' + err)
    }
  });

  setTimeout(applyConstantly, 60000);
};

setTimeout(applyConstantly, 60000);

*/