var http = require('http');

var express = require('express');
var app = express();
var routes = require("./routes/v1/api.js");


app.listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');

//Creating a server
// var server = http.createServer(function(req, res){

//     res.writeHead(200, {'contet-type': 'text/plain'});
//     res.end('Node js Started');
// });
// server.listen(3000, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:3000/ ');