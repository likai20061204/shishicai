var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');
var app = express();
var con = require('./model/database.js');
var http = require('http');
var url = require("url");
var mysql      = require('mysql');
var bodyParser = require('body-parser');


app.set('views','./views');
app.set('view engine','jade');

//解析url
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
});
 
connection.connect();

connection.query('select * from numAll', function (error, results, fields) {
	var results = results;
	app.get('/',function(req,res){
		res.render('index',{
			'title':'首页',
			data:results
		})
	})
});


app.get('/details',function(req,res){
	res.render('details',{
		'title':'详情页'
	})
})

//初始化数据
app.post('/initData',function(req,res){
	var date = new Date().getFullYear()+'-'+parseInt(new Date().getMonth() + 1)+'-'+new Date().getDate();
	//按照序号排序
	connection.query(`select * from numAll where time="${date}" order by id`,function(error, results, fields){
		res.write('callback(\'{\"msg\": '+JSON.stringify(results)+'}\')');
		res.end();
	});
})

//删除该条数据
app.post('/delData',function(req,res){
	// var _id = req.param('id');
	var _id = req.body.id;
	connection.query(`delete from numAll where id="${_id}"`,function(error, results, fields){
		if(results){
			res.end('yes');
		}
	})
})

//增加一条数据
app.post('/add',function(req,res){
	var shuzi = req.body.shuzi.split('');
	var date = new Date().getFullYear()+'-'+parseInt(new Date().getMonth() + 1)+'-'+new Date().getDate();
	
	var str = '';
	str = `insert into numAll(time,num1,num2,num3,num4,num5) values ('${date}',${shuzi[0]},${shuzi[1]},${shuzi[2]},${shuzi[3]},${shuzi[4]})`
	connection.query(str,function(e,r,f){
		res.redirect('/');
	})
	
})