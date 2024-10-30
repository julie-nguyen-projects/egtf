var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'En Geek Ton Fil' });
});

module.exports = router;
