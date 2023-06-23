var my_date = require('../my_modules/my_date');
var User = require('../models/user');

var XML = require('../src/xml');
var CMD = require('../src/cmd');
var DB = require('../src/db');
var JAVA = require('../src/java');

//SING UP FORM
exports.signUp = async (req, res) => {
    var uname = req.body.username;
    var email = req.body.email;

    //CHECK
    if (uname == "" || email == "" || uname < 3 || uname > 20 || email < 3 || email > 40)
        return res.redirect('error');


    var user = await User.findOne({ username: uname });
    if (user != null) {
        console.log(my_date.getdatelog() + "Daha önceden kayıt olmuş bir kullanıcı tekrar kayıt olmaya çalıştı: " + uname);
        res.render('register', {
            haserror: true,
            errormessage: 'Böyle bir kullanıcı zaten mevcut!'
        });
    } else {
        if((JAVA.GetServerState()).includes("Açık") == false)
        {
            res.render('register', {
                haserror: true,
                errormessage: 'Sunucu aktif değilken kayıt yaptıramazsınız!'
             });
        return;
        }

        var newUser = new User({
            username: uname,
            email: email,
            password: Math.floor(Math.random() * 1000000),
            emailVerified: false,
            isInTheWhitelist: false,
            sysRegisterDate: my_date.getdate()
        });
        const s = await newUser.save();
        if(s!=null)
        {
            console.log(my_date.getdatelog() + "Yeni kullanıcı oluşturuldu: " + uname);
            JAVA.sendToProcess('easywl add ' + uname);
            JAVA.sendToProcess('say ' + uname + ' whitelist kaydini yaptirdi. Birazdan aramizda olur hep beraber hos geldin diyelim.');
            res.render('verify_warn', {
                uname: newUser.username,
                pass: newUser.password
            });
        } else {
            console.log(my_date.getdatelog() + "Yeni kullanıcı oluşturulurken HATA ALINDI! -> " + error);
            return res.redirect('error');
        }
    }
}