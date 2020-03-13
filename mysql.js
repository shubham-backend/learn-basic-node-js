//Reference - https://www.npmjs.com/package/dotenv
require('dotenv').config('')
var mysql = require('mysql'); 

//For Development Env Access
//require('dotenv').config({ path: './.env.development' })
//console.log(process.env.TestDevEnv);

//start mysql connection
var connection = mysql.createConnection({
    host     : process.env.DB_HOST, //mysql database host name
    user     : process.env.DB_USERNAME, //mysql database user name
    password : process.env.DB_PASSWORD, //mysql database password
    database : process.env.DB_DATABASE //mysql database name
  });
connection.connect(function(err) {
	if (err) throw err
	console.log('You are now connected with mysql database...')
});

module.exports = connection;