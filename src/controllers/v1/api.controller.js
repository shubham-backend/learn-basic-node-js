'use strict';
//MySql Connection
var connection = require('../../../mysql.js')
//JOI Connection
var Joi = require('joi');
//Response middleware Used
var resMiddleware = require('../../middlewares/response.middleware.js');
//Common Middleware Used
var commonValidation = require('../../common/validation.common.js');

//Model Used
// var UserModel = require('../../models/v1/app.model.js');
// var user = UserModel;
// console.log(user);

//Using Sequilize
//var User = UserModel.login;
// console.log(User);
// const Op = userModel.Sequelize;

const db = require('../../database/sequelize-mysql.db.js');
const User = db.users;
const Op = db.Sequelize.Op;

//Reference- https://bezkoder.com/node-js-express-sequelize-mysql/

//Delete once User by user-id
exports.delete = (req, res) => {
	const id = req.params.id;
  
	User.destroy({
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
			resMiddleware.sendResponse(res,"User deleted successfully",id);
		} else {
			resMiddleware.sendError(res, `Cannot delete User with id=${id}. Maybe User was not found!`);
		}
	  })
	  .catch(err => {
		resMiddleware.sendError(res, "Could not delete User with id=" + id);
	  });
};
//User Details Find by user-id
exports.findOne = (req, res) => {
	const id = req.params.id;

	User.findByPk(id)
	 .then(data => {
		if(data == null){
		res.status(500).send({
			message: "User does not exist with id=" + id
			});
		}else{
		res.send(data);
		}
	})
	.catch(err => {
	res.status(500).send({
		message: "Error" + err
	});
	});
};
//User profile update API
exports.update = (req, res) => {	
	const id = req.params.id;
  
	User.update(req.body, {
	  where: { id: id }
	})
	  .then(num => {
		if (num == 1) {
			resMiddleware.sendResponse(res,"Profile updated successfully",id);	
		} else {
			resMiddleware.sendError(res, `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`);
		}
	  })
	  .catch(err => {
		//resMiddleware.sendError(res, err);
		resMiddleware.sendError(res, "Error updating User with id=" + id);
	  });
};
//User List Api
exports.findAll = (req, res) => {
  //const name = req.query.name;
  //var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  //User.findAll({ where: condition })
  User.findAll({ where:{} })
	.then(data => {
	res.send(data);
	})
	.catch(err => {
	res.status(500).send({
		message:
		err.message || "Some error occurred while retrieving users."
	});
	});
};
//Register APi
exports.create = (req, res) => {
	// Create a User
	var data = req.body;
	var user = {
		"name":data.name,
		"email":data.email,
		"phone":data.phone,
		"password":data.password,
	};
	console.log(user);
	// Save User in the database
	User.create(user)
	  .then(data => {
		resMiddleware.sendResponse(res,"User created successfully",data);	
		//res.send(data);
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while creating the User."
		});
	  });
};


exports.login_rnd = (req, res) => {
  var param = req.body;
  console.log(param);
	User.findAll({  //Error in this line
		where: {
			email: param.email
		}
	}).than(user => {
		if(param.password == user.password){
			resMiddleware.sendResponse(res,"User Login Successfully.",user);	
		}else{
			resMiddleware.sendError(res, "User does not exist");
		}
	}).catch(err => {
		resMiddleware.sendError(res, err);
	});
};


//var userModel = require('../../models/v1/app.model.js');   //Uncomment line when login api hit
//Important Line - Before the login api hit -> go to app.model,js and uncomment practics1 and comment practics3

//Well Standard API using Controller Model and Routes and Common Validation
exports.login = function(req, res) {
	const data = req.body;
	userModel.login(data, function(err, user) {
		
	if(err == null && user !==null && user.hasOwnProperty('id'))
	{
		resMiddleware.sendResponse(res,"User Login Successfully.",user);	
	}
	else{
		resMiddleware.sendError(res, user);
	}
	});
};

exports.getUsers = (req,res,next) => {
	connection.query('select * from users', function (error, results, fields) {
    	if (error) throw error;
    	res.send(results)
    });
};

//Login API
exports.login1 = (req, res, next) => {

	const data = req.body;

	// define the validation schema
	const schema = Joi.object().keys({

        email: commonValidation.VALIDATION.LOGIN.EMAIL,
        password: commonValidation.VALIDATION.LOGIN.PASSWORD,
	});

	// validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {

    	if (err) {
            resMiddleware.ErrorHandler(err,req,res,next);
        } 
        else {
        	console.log(data);
        	connection.query('SELECT * FROM app_users WHERE email = ?',[data.email], function (error, results, fields) {
        		
        		if (error) {
					//console.log("error ocurred",error);
					resMiddleware.sendError(res,"Something went wrong.");
				}
				else{
					if(results.length >0){
						if(results[0].password == data.password){
							const id = results[0].id;
							resMiddleware.sendResponse(res,"Login successfully",Object.assign({id}, value));	
            			}
            			else{
            				resMiddleware.sendError(res,"Email or password does not match.");
		                }
		            }
		            else{
		            	resMiddleware.sendError(res,"Email does not exists.");
		            }
		        }    
            });
        }
    });
};

//Register API
exports.register = (req, res, next) => {

	const data = req.body;

    	// define the validation schema
    	const schema = Joi.object().keys({

			name: commonValidation.VALIDATION.REGISTER.NAME,

	        email: commonValidation.VALIDATION.REGISTER.EMAIL,

	        phone: commonValidation.VALIDATION.REGISTER.PHONE,

	        password: commonValidation.VALIDATION.REGISTER.PASSWORD,

	        confirmPassword: commonValidation.VALIDATION.REGISTER.CONFIRMPASSWORD,

    	});

    	// validate the request data against the schema
	    Joi.validate(data, schema, (err, value) => {
    
            if (err) {
            	resMiddleware.ErrorHandler(err,req,res,next);
            } 
            else 
            {
     			var today = new Date();
        		var registerData = {
        			"name":data.name,
					"email":data.email,
					"phone":data.phone,
					"password":data.password,
					"created_at" :today,
        		};
        		connection.query('SELECT * FROM app_users WHERE email = ?',[data.email], function (error, results, fields) {
        			if(results.length >0){
        				resMiddleware.sendError(res,"Email already exists.");
        			}else{

        				connection.query('INSERT INTO app_users SET ?', registerData, function (error, results, fields) {
        		
			        		if (error) {
								//console.log("error ocurred",error);
			        			resMiddleware.sendError(res,"Something went wrong.");
							}
							else{
								const id = results.insertId;
								resMiddleware.sendResponse(res,"User created successfully",Object.assign({id}, value));	
			            	}
				        });		
        			}
        		});
            }
	    });
};