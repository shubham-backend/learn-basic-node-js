//const router = require('express').Router();

var express = require('express');
var router = express.Router();

var ApiController = require('../../src/controllers/v1/api.controller.js');

router.get('/first-api-using-controller', ApiController.getUsers)

var connection = require('../../mysql.js');

var appRouter = function(app) {
    
    //Demo Api
    app.get("/", function(req, res) {
        res.send("Welcome to Node Js");
    });

    //Demo Api
    app.get("/api/demo-api", function(req, res) {
        res.send("Hello World");
    });

    //Get All Users
    app.get('/api/all-users', function (req, res) {
        connection.query('select * from users', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });

    //Api to get a single user data
    app.get('/api/user/:id', function (req, res) {
        connection.query('select * from users where Id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });

    //Api to update record into mysql database
    app.put('/api/update-user', function (req, res) {
    	console.log(req.body);
        connection.query('UPDATE `users` SET `name`=?,`email`=?,`mobile`=?,`password`=? where `Id`=?', [req.body.name,req.body.email, req.body.mobile, req.body.password, req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });

    //Api to delete record from mysql database
    app.delete('/api/delete-user', function (req, res) {
        console.log(req.body);
        connection.query('DELETE FROM `users` WHERE `Id`=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted successfully.!');
        });
    });

    //Contact-Us API Submitted
    app.post("/api/contact-us", function(req, res) {
        
        var params  = req.body;
        var today = new Date();
        var users = {
			"name":req.body.name,
			"email":req.body.email,
			"message":req.body.message,
			"created_at" :today,
		}
        console.log(users);
        connection.query('INSERT INTO contact_us SET ?', users, function (error, results, fields) {
        
        if (error) {
			console.log("error ocurred",error);
			res.send({
			  "code":400,
			  "failed":"error ocurred"
			})
		}else{
        	res.send({
		        "code":200,
		        "success":"Contact-us form submitted successfully.",
		        "data":results
		    });
		}
	        //res.end(JSON.stringify(results));
	    });
    });
}

//module.exports = appRouter;
module.exports = router;