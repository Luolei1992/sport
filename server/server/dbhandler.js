var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

//断言
var assert = require('assert');
var Urls = 'mongodb://127.0.0.1:27017/vueblog1';

/*MongoClient.connect(Urls, {useNewUrlParser: true}, (err, db) => {
  assert.equal(null, err);
  console.log('数据库已创建，但是里面没有数据，所以不显示');
  var dbv = db.db('vueblog1');
  dbv.createCollection('user',(err, res) => {
    assert.equal(null, err);
    console.log('创建集合，就是创建表');
    // dbv.close();
  });
  var adminObj = {username: 'admin', password: 'admin'};
  dbv.collection('user').insertOne(adminObj, (err, res) => {
    assert.equal(null, err);
    console.log('文档插入成功');
    db.close();
  })
})*/

//查找用户
var find = function(db,dbo,collections,selector,fn){
  var collection = dbo.collection(collections);
  collection.find(selector).toArray(function(err,result){
    try{
      assert.equal(err,null);
    }catch(e){
      result = [];
    }
    fn(result);
    db.close();
  })
}

//分页查询
var findArticle = function (db, dbo, collections, selector, fn) {
  var collection = dbo.collection(collections);
  const pageNum = selector[1].pageNum - 0;
  const number = selector[1].number - 0;
  let filterData;
  if(selector[0].type == '' && selector[0].label == ''){
    filterData = {};
  }else if(selector[0].type == '' && selector[0].label != ''){
    filterData = {
      label: selector[0].label
    }
  }else if(selector[0].type != '' && selector[0].label == ''){
    filterData = {
      type: selector[0].type
    }
  }else{
    filterData = selector[0];
  }

  collection
    .find(filterData)
    .skip((pageNum - 1) * number)
    .limit(number)
    .toArray(function(err, result) {
      try {
        assert.equal(err, null);
      } catch (e) {
        result = [];
      }
      fn(result);
      db.close();
    });
}

const add = (db, dbo, collections, selector, fn) => {
  const collection = dbo.collection(collections);
  collection.insertMany([selector], (err, result) => {
    try {
      assert.equal(err, null);
      assert.notStrictEqual(0, result.result.n);
    } catch (e) {
      result.result = "";
    }
    fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
    db.close();
  })
}

const update = (db, dbo, collections, selector, fn) => {
  const collection = dbo.collection(collections);
  collection.updateOne(selector[0], selector[1], (err, result) => {
    try {
      assert.equal(err, null);
    } catch (e) {
      result = [];
    }
    fn(result);
    db.close();
  });
};

const deletes = (db, dbo, collections, selector, fn) => {
  var collection = dbo.collection(collections);
  collection.deleteOne(selector, function(err, result) {
    try {
      assert.equal(err, null);
      assert.notStrictEqual(0, result.result.n);
    } catch (e) {
      result.result = "";
    }

    fn(result.result ? [result.result] : []); //如果没报错且返回数据不是0，那么表示操作成功。
    db.close;
  });
};

//查询文章内容
const findAritcle = (db, dbo, collections, selector, fn) => {
  var collection = dbo.collection(collections);
  let data = {};

  //查询文章当前数据
  collection.find(selector).toArray((err, result) => {
    try {
      assert.equal(err, null);
    } catch (e) {
      result = [];
    }
    data.article = result;
  });

  const selectorPrev = {"_id":{"$lt": ObjectId(selector._id)}};

  //查询上一条数据
  collection.find(selectorPrev).sort({_id: -1}).limit(1).toArray((errPrev, resultPrev) => {
    try {
      assert.equal(errPrev, null);
    } catch (e) {
      resultPrev = [];
    }
    let prev;
    if(resultPrev.length != 0){
      prev = {title:resultPrev[0].title, id:resultPrev[0]._id};
    }else{
      prev = {title:'没有上一篇',id:''}
    }
    data.prev = prev;
  })

  const selectorNext = {"_id":{"$gt": ObjectId(selector._id)}};
  //查询下一条数据
  collection.find(selectorNext).sort({_id: 1}).limit(1).toArray((errNext, resultNext) => {
    try {
      assert.equal(errNext, null);
    } catch (e) {
      resultNext = [];
    }
    let next;
    if(resultNext.length != 0){
      next = {title:resultNext[0].title, id:resultNext[0]._id};
    }else{
      next = {title:'没有下一篇',id:''}
    }
    data.next = next;
    
    fn(data);
    db.close;
  })
  
};

//查询label
const findLabel = (db, dbo, collections, selector, fn) => {
  var collection = dbo.collection(collections);
  let labelArr = [];
  collection.find(selector).toArray((err, result) => {
    try {
      assert.equal(err, null);
    } catch (e) {
      result = [];
    }
    for (let key of result){
      labelArr.push(key.label);
    }
    let articleTotal = labelArr.length;
    let data = {total:articleTotal, label:new Set(labelArr)}
    fn(data);
    db.close();
  });
}





//防止前端请求，直接操作你的数据库
var methodType = {
  login: find,
  getArticleList: findArticle,
  publishArticle: add,
  updateArticle: update,
  deleteArticle: deletes,
  getLabel: findLabel,
  getArticleContent: findAritcle
};


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
    //mongo2.0 不需要这句  直接传入db就行 mongo3.0 需要写这个 并且把 dbo 传入
    var dbo = db.db('vueblog1');
    
    //防止前端直接操作数据库
    //mongo2.0是这样写的
    // methodType[req.route.path.substr(1)](db,collections,selector,fn);
    methodType[req.route.path.substr(1)](db,dbo,collections,selector,fn);
    db.close();
  })
};