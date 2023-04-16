
var my_date = require('../my_modules/my_date');
var fs = require('fs');

exports.setStatON = function () {
    fs.writeFile('public/status.txt', 'Açık', (err) => {
        if (err)
          console.log(my_date.getdatelog() + 'Hata! status.txt dosyasına yazım başarısız.');
        else
          console.log(my_date.getdatelog() + 'status.txt dosyasına "Aktif" yazıldı.');
      });
};

exports.setStatOFF = function () {
    fs.writeFile('public/status.txt', 'Kapalı', (err) => {
        if (err)
          console.log(my_date.getdatelog() + 'Hata! status.txt dosyasına yazım başarısız.');
        else
          console.log(my_date.getdatelog() + 'status.txt dosyasına "Pasif" yazıldı.');
      });
};


