
//MySql Connection
var connection = require('../../../mysql.js')
//JOI Connection
const Joi = require('joi');
//Response middleware Used
var resMiddleware = require('../../middlewares/response.middleware.js');
//Common Middleware Used
var commonValidation = require('../../common/validation.common.js');

exports.getUsers = (req,res,next) => {
	connection.query('select * from users', function (error, results, fields) {
    	if (error) throw error;
    	res.send(results)
    });
}

//Login API
exports.login = (req, res, next) => {

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
			                res.json({
			                    status: true,
			                    code: 200,
			                    message: 'Login successfully',
			                    data: Object.assign({id}, value)
	                		});
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
}

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
}

