var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Use for Model sync
var cors = require('cors');
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
//app.use(cors());

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

// for parsing application/json
var multer = require('multer');
var upload = multer();

// for parsing multipart/form-data
app.use(upload.array()); 

var routes = require("./routes/v1/api.js");
app.use(routes);

//var resMiddleware = require('./src/middlewares/response.middleware.js');
const { errors } = require('celebrate');
app.use(errors());

//using JOI Validation of Login and signup API
var loginRoutes = require("./routes/v1/login.js");
app.use(loginRoutes);


const db = require("./src/models/v1/app.model.js");

//Table Create Only
//db.sequelize.sync();

//MySql Connection using sequelize
var Sequelize = require('sequelize');
var dbs = require('./src/database/sequelize-mysql.db.js');
//dbs.sequelize.sync();

//Create Schema for demo table
/*var Demo = sequelize.define('demo', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

//Insert Schema for demo table
sequelize.sync().then(function() {
  return Demo.create({
    username: 'Shubham',
    birthday: new Date(1996, 7, 3)
  });
}).then(function(shubham) {
  console.log(shubham.get({
    plain: true
  }));
});*/

//.env constant access
app.listen(process.env.PORT, process.env.HOST);
console.log('Server running at ' + process.env.baseURL);

//Creating a server
// var server = http.createServer(function(req, res){

//     res.writeHead(200, {'contet-type': 'text/plain'});
//     res.end('Node js Started');
// });
// server.listen(3000, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:3000/ ');