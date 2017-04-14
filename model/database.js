var http = require('http');
var url = require("url");
var mysql      = require('mysql');


function con(){

	

	
}

con.prototype.find = function(){
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'test'
	});
	 
	connection.connect();
	
}

module.exports = con;