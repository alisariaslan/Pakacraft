var java = require('./java');

exports.signUp = async (req, res) => {
    var username = req.body.username;
    if (username == "" || username == null) {
        res.render('register', {
            haserror: true,
            errormessage: 'Please enter a acceptable username!'
        });
    }
    if(java.GetState().includes("Open"))
    {
        java.SendToProces('easywl add ' + username);
        res.render('success', {
            uname: username,
        });
    } else {
        res.render('register', {
            haserror: true,
            errormessage: 'You cannot add yourself to the whitelist while server is not open!'
        });
    }
}