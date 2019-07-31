var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');

require('babel-register');
var bodyParser = require('body-parser');
var index = require('./server/index.js');
var user = require('./server/user.js');
var api = require('./server/api.js');
var fs = require('fs');

// var history = require('connect-history-api-fallback');

// app.use(history({
//   verbose: true,
//   index: '/',
//   htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
// }));


app.use(express.static(path.join(__dirname, '/dist')));


global.port = 4001;

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://host-edubraincloud:2333"); //为了跨域保持session，所以指定地址，不能用*
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true); 
  next();
});


var session = require('express-session');
app.use(session({
  secret: 'jymblog751314',  //设置session签名
  name: 'jymblog',
  cookie: {maxAge: 60 * 1000 * 60 * 24},  //储存时间23小时
  resave: false,  //每次请求都重新设置session
  saveUninitialized: true
}))



//设置请求的最大数据量。默认为'100kb'
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded(
  {limit: '50mb', extended: true}
));





//静态文件资源
app.use(express.static('./saveImg'));
app.use(cookieParser());


app.use('/', index);
app.use('/user', user);
app.use('/api', api);



var server = app.listen(global.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});