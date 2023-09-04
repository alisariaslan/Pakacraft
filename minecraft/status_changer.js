
var my_date = require('../my_modules/my_date');
var fs = require('fs');

exports.setStatON = function () {
    fs.writeFile('public/status.txt', 'Open', (err) => {
        if (err)
          console.log(my_date.getdatelog() + 'Eror! status.txt writing operation failed. (Open)');
        else
          console.log(my_date.getdatelog() + '"Open" text writed to status.txt');
      });
};

exports.setStatOFF = function () {
    fs.writeFile('public/status.txt', 'Closed', (err) => {
        if (err)
          console.log(my_date.getdatelog() + 'Error! status.txt writing operation failed. (Closed)');
        else
          console.log(my_date.getdatelog() + '"Closed" text writed to status.txt');
      });
};


