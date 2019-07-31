var express = require('express');
var router = express.Router();
var path = require('path');

// 博客首页
router.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});


module.exports = router;