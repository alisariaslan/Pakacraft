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
        console.log(my_date.getdatelog() + "This user trying to register again: " + uname);
        res.render('register', {
            haserror: true,
            errormessage: 'User already exists!'
        });
    } else {
        if((JAVA.GetServerState()).includes("Open") == false)
        {
            res.render('register', {
                haserror: true,
                errormessage: 'You cannot register when the server is not open!'
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
            console.log(my_date.getdatelog() + "New user has been registered: " + uname);
            JAVA.sendToProcess('easywl add ' + uname);
            JAVA.sendToProcess('say ' + uname + ' whitelisted. He will be with us soon, lets say welcome all together.');
            res.render('register_success', {
                uname: newUser.username,
                pass: newUser.password
            });
        } else {
            console.log(my_date.getdatelog() + "Error occured while new user registration! -> " + error);
            return res.redirect('error');
        }
    }
}