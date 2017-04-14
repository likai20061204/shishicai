var http = require('http');
var url = require("url");
var mysql      = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
});
 
connection.connect();

var df = true;

http.createServer(function (req, res) {

var pathname = url.parse(req.url).pathname;

	if(df){
		connection.query('select * from numAll', function (error, results, fields) {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
			res.write('callback(\'{\"msg\": '+JSON.stringify(results)+'}\')');
			res.end();
		});
	}

	if(pathname == '/add'){
		var str = '';

		//封装数据和字符串
		req.on('data',function(data){
			var a = decodeURIComponent(data).replace(/=/g,'":"').replace(/&/g,'","')
			var data = JSON.parse('{"'+a+'"}');
			var shuzi = data.shuzi.split('');

			str = `insert into numAll(time,serialNumber,num1,num2,num3,num4,num5) values ('2017-04-12',${data.xuhao},${shuzi[0]},${shuzi[1]},${shuzi[2]},${shuzi[3]},${shuzi[4]})`
		})

		//插入数据
		req.on('end',function(){
			connection.query(str,function(error, results, fields){
				res.redirect('/details');
			})
		})
		
	}

	df = false;

}).listen(3000,'127.0.0.1');


