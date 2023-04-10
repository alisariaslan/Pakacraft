const date = require('date-and-time');

exports.getdate = function () {
    return Date();
};

exports.getdatelog = function () {
    const now  =  new Date();
    const value = date.format(now,'hh:MM:ss');
    return value + " -> ";
};
