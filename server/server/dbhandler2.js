
//插入测试数据

var MongoClient = require('mongodb').MongoClient;
//断言
var assert = require('assert');
var Urls = 'mongodb://127.0.0.1:27017/';

MongoClient.connect(Urls, {useNewUrlParser: true}, (err, db) => {
  assert.equal(null, err);
  console.log('数据库已创建，但是里面没有数据，所以不显示');
  var dbv = db.db('vueblog1');
  
  var adminObj = [
    {username: 'admin', password: 'admin'},
    {username: 'admin1', password: 'admin2'},
    {username: 'admin2', password: 'admin2'},
    {username: 'admin3', password: 'admin3'},
    {username: 'admin4', password: 'admin4'},
    {username: 'admin5', password: 'admin'},
    {username: 'admin6', password: 'admin'},
    {username: 'admin7', password: 'admin'},
    {username: 'admin8', password: 'admin'},
    {username: 'admin9', password: 'admin'},
  ];
  dbv.collection('user').insertMany(adminObj, (err, res) => {
    assert.equal(null, err);
    console.log('文档插入成功');
    db.close();
  })
  const articleArr = [
    {
      time: '2018-09月05日',
      title: '办公软件',
      content: '',
      type: 'technology',
      label: '前端',
      bannerImg: ''
    },
    {
      time: '2018年09月05日',
      title: '媒体工具',
      content: '',
      type: 'life',
      label: '后端',
      bannerImg: ''
    },
    {
      time: '2018年09月07日',
      title: '实用工具',
      content: '',
      type: 'life',
      label: '样式',
      bannerImg: ''
    },
    {
      time: '2018年09月09日',
      title: '桌面工具',
      content: '',
      type: 'technology',
      label: '人工智能',
      bannerImg: ''
    },
    {
      time: '2018年09月10日',
      title: '电脑技巧',
      content: '',
      type: 'life',
      label: '电子竞技',
      bannerImg: ''
    },
    {
      time: '2018年09月15日',
      title: '系统工具',
      content: '',
      type: 'technology',
      label: 'nodejs',
      bannerImg: ''
    },
    {
      time: '2018年09月16日',
      title: '美化主题',
      content: '',
      type: 'technology',
      label: 'Python',
      bannerImg: ''
    },
    {
      time: '2018年09月22日',
      title: '我最喜爱',
      content: '',
      type: 'life',
      label: '吃喝',
      bannerImg: ''
    },
    {
      time: '2018年09月23日',
      title: '每日发现',
      content: '',
      type: 'technology',
      label: 'css3',
      bannerImg: ''
    },
    {
      time: '2018年09月24日',
      title: '管理工具',
      content: '',
      type: 'life',
      label: '人工智能',
      bannerImg: ''
    },
    {
      time: '2018年09月25日',
      title: '手机应用',
      content: '',
      type: 'life',
      label: '电子竞技',
      bannerImg: ''
    },
    {
      time: '2018年09月26日',
      title: 'Mac',
      content: '',
      type: 'technology',
      label: 'Python',
      bannerImg: ''
    },
    {
      time: '2018年09月27日',
      title: 'AutoHotKey',
      content: '',
      type: 'life',
      label: '前端',
      bannerImg: ''
    }
  ]
  dbv.collection('articles').insertMany(articleArr, (err, res) => {
    assert.equal(null, err);
    console.log('文档插入成功');
    db.close();
  })

})





/* 
 * req: 前端请求的信息
 * res: 返回的信息
 * collections: 请求的数据库的表名
 * selector: 前端发送的 条件
 * fn 回调函数
 */
module.exports = function(req,res,collections,selector,fn){
  MongoClient.connect(Urls, {useNewUrlParser: true}, function(err,db) {
    assert.equal(null,err);
    console.log('正确连接到服务器');
    //mongo2.0 不需要这句  直接传入db就行 mongo3.0 需要写这个 并且把 dbo 传入
    var dbo = db.db('vueblog1');

    //防止前端直接操作数据库
    //mongo2.0是这样写的
    // methodType[req.route.path.substr(1)](db,collections,selector,fn);
    methodType[req.route.path.substr(1)](db,dbo,collections,selector,fn);
    db.close();
  })
};