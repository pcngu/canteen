mysql = require("mysql");

config = {
	host : "localhost",
	user : "root",
	password : "",
	database : "dummy"
}

pool = mysql.createPool(config);

module.exports = pool;
