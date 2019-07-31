//提供接口  然后去调dbhandlerjs exports出的方法
var express = require('express');
var router = express.Router();
const fs = require('fs');
var handler = require('./dbhandler.js');
var crypto = require('crypto');


var ObjectId = require('mongodb').ObjectId;

let returnObj = require('./return.js');

//上传图片
router.post('/upload_img',function(req,res){
  var splitIndex = req.body.name.indexOf('.');
  
  var imgName = req.body.name.substr(0,splitIndex);
  var imgPostfix = req.body.name.substr(splitIndex);
  
  var md5 = crypto.createHash('md5');
  var imgNameMD5 = md5.update(imgName).digest('base64');

  var imgData = req.body.img;

  imgData = imgData.replace(/^data:image\/\w+;base64,/, "");
  //获取当前时间
  var timestamp = new Date().getTime();
  
  var dataBuffer = new Buffer(imgData, 'base64');
  fs.writeFile("./saveImg/" + imgNameMD5 + timestamp + imgPostfix, dataBuffer, function(err) {
  		if(err){
        returnObj.hasFalse.msg = err;
  			res.send(returnObj.hasFalse);
  		}else{
        returnObj.hasTrueObj.msg = '保存成功';
        returnObj.hasTrueObj.data.url = `http://localhost:${global.port}/${imgNameMD5 + timestamp +imgPostfix}`;
  			res.send(returnObj.hasTrueObj);
  		}
  });
})




module.exports = router;