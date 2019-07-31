//提供接口  然后去调dbhandlerjs exports出的方法
var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');

//加密
var crypto = require('crypto');

var ObjectId = require('mongodb').ObjectId;
let returnObj = require('./return.js');



//登录
router.post('/login',function(req,res,next){
  //对密码进行加密
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.passwd).digest('base64');
  //调用数据库方法去查询
  handler(req, res, "user", {username: req.body.username},function(data){
		if(data.length===0){
			res.end('{"err":"抱歉，系统中并无该用户，如有需要，请向管理员申请"}');
		}else if(data[0].passwd !== password){
			res.end('{"err":"密码不正确"}');
		}else if(data.length!==0&&data[0].passwd===password){
			
			req.session.username = req.body.username; //存session
			req.session.password = password;
			
			res.end('{"success":"true"}');
		}
		
	});
})


//退出
router.post('/logout', function(req, res, next){
	req.session.username = '';
	req.session.passwd = '';
	res.end('{"success":"true"}');
})

router.post('/testPost', function (req, res, next) {
	res.end('{"success":"true"}');
});


//获取文章列表页面
router.get('/getArticleList', function(req,res,next){
	//分类
	const articleType = req.query.type;
	//标签
	const articleLabel = req.query.label;
	//page 页数
	const pageNum = req.query.pageNum;
	//条数
	let number = req.query.number;
	const selectData = [{ type: articleType, label: articleLabel }, { pageNum: pageNum, number: number }];
	handler(req, res, 'articles', selectData, function(data){
		returnObj.hasTrue.data = data;
		res.json(returnObj.hasTrue);
		res.end();
	})
});



//发布文章
router.post("/publishArticle", (req, res, next) => {

	const publishData = { 
		time: req.body.time, 
		title: req.body.title, 
		content: req.body.content, 
		htmlContent:req.body.htmlContent,
		type: req.body.type, 
		label: req.body.label, 
		bannerImg: req.body.bannerImg 
	};
	handler(req, res, "articles", publishData, data => {
		returnObj.hasTrue.data = data;
		res.json(returnObj.hasTrue);
		res.end();
  });
});


//编辑文章
router.post("/updateArticle",(req, res, next) => {

	//查询条件
	const whereData = { _id: ObjectId(req.body.id) };
	//更新内容
	const updateData = {$set: {
		time: req.body.time,
		title: req.body.title,
		content: req.body.content,
		htmlContent:req.body.htmlContent,
		type: req.body.type,
		label: req.body.label,
		bannerImg: req.body.img
	}};
	const changeData = [whereData, updateData];
	handler(req, res, "articles", changeData, data => {
    returnObj.hasTrue.data = data;
		res.json(returnObj.hasTrue);
		res.end();
  });
});


//删除文章
router.post("/deleteArticle", (req, res, next) => {
	const articleId = ObjectId(req.body.id);
	handler(req, res, "articles", { _id: articleId }, data => {
    returnObj.hasTrue.data = data;
		res.json(returnObj.hasTrue);
		res.end();
  });
});

//获取文章内容
router.get('/getArticleContent', function (req, res, next) {
	const articleId = ObjectId(req.query.id);
	handler(req, res, "articles", { _id: articleId }, data => {
		returnObj.hasTrue.data = data;
		res.json(returnObj.hasTrue);
		res.end();
	});
})


//获取标签分类
router.get('/getLabel', (req, res) => {
	
	//参数传一个type 根据type返回相应的label
	let type = req.query.type;
	let selectorData = type == '' ? '' : { type: type };
	handler(req, res, 'articles', selectorData, data => {
		returnObj.hasTrue.data = data;
		res.json(returnObj.hasTrue);
		res.end();
	})
})








module.exports = router;



// 标题 时间  内容  分类type 标签 banner图 文章id
/* 
 *	分页
 * 2、接口list
 * 	2.1 登录
 * 	2.2 登出
 * 	2.3 获取文章列表页
 *  2.4 发布文章
 *  2.5 编辑文章
 *  2.6 删除文章
 *  2.7 筛选
 *  2.8 获取文章内容
 */