const express = require('express')
const router = express.Router();
const panelController = require('../methods/sign_up');

//GET
router.get('/', function (req, res, next) { res.render('index'); });

router.get('/index', function (req, res, next) { res.render('index'); });
router.get('/notifs', function (req, res, next) { res.render('notifs'); });
router.get('/files', function (req, res, next) { res.render('files'); });
router.get('/error', function (req, res, next) { res.render('error'); });

router.get('/trynow', function (req, res, next) { res.render('trynow'); });
router.get('/verify_success', function (req, res, next) { res.render('verify_success'); });
router.get('/verify_warn', function (req, res, next) { res.render('verify_warn'); });

router.get('/banlist', function (req, res, next) { res.render('error'); });

router.get('/register', function (req, res, next) { res.render('register'); });
//POST
router.post('/sign_up', panelController.signUp);

module.exports = router;