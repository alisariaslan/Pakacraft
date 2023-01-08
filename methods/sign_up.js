var my_date = require('../my_modules/my_date');
var User = require('../models/user');
var mc_server = require('../minecraft_cmd/start');

//SING UP FORM
exports.signUp = (req, res) => {
    var uname = req.body.username;
    var email = req.body.email;

    //CHECK
    if (uname == "" || email == "" || uname < 3 || uname > 20 || email < 3 || email > 40)
        return res.redirect('error');

    User.findOne({ username: uname }, function (err, user) {
        if (user) {
            console.log(my_date.getdatelog() + "Daha önceden kayıt olmuş bir kullanıcı tekrar kayıt olmaya çalıştı. -> " + uname);
            res.render('register', {
                already: true
            });
        }
        else {
            console.log(my_date.getdatelog() + "Yeni kullanıcı oluşturuluyor. -> " + uname);
            var newUser = new User({
                username: uname,
                email: email,
                password: Math.floor(Math.random() * 1000000),
                emailVerified: false,
                isInTheWhitelist: false,
                sysRegisterDate: my_date.getdate()
            });
            newUser.save((error, data) => {
                if (error) {
                    console.log(my_date.getdatelog() + error);
                    return res.redirect('error');
                }
                else {
                    console.log(my_date.getdatelog() + "Yeni kullanıcı oluşturuldu.\n" + data);
                    //mc_server.sendToProcess('easywl add ' + uname);
                    //mc_server.sendToProcess('say ' + uname + ' whitelist kaydını yaptırdı. Birazdan aramızda olur hep beraber hoş geldin diyelim.');
                    res.render('verify_warn', {
                        uname: newUser.username,
                        pass: newUser.password
                    });
                }
            });
        }
    });
}