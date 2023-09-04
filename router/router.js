const express = require('express')
const router = express.Router();
const panelController = require('../methods/sign_up');

//GET
router.get('/', function (req, res, next) { res.render('index'); });

router.get('/index', function (req, res, next) { res.render('index'); });
router.get('/register', function (req, res, next) { res.render('register'); });
router.get('/register_success', function (req, res, next) { res.render('register_success'); });
router.get('/notifications', function (req, res, next) { res.render('notifications'); });
router.get('/files', function (req, res, next) { res.render('files'); });
router.get('/banlist', function (req, res, next) { res.render('banlist'); });
router.get('/error', function (req, res, next) { res.render('error'); });
router.get('/perms', function (req, res, next) { res.render('perms'); });
router.get('/location', function (req, res, next) { res.render('location'); });
router.get('/gallery', function (req, res, next) { res.render('gallery'); });
router.get('/vip', function (req, res, next) { res.render('vip'); });
//POST
router.post('/sign_up', panelController.signUp);

module.exports = router;