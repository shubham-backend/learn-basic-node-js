//MySql Connection
var connection = require('../../mysql.js');
//Middleware Add
var resMiddleware = require('../../src/middlewares/response.middleware.js');
//https://www.npmjs.com/package/joi
//const Joi = require('joi');

//API Controller Used for data travel
var ApiController = require('../../src/controllers/v1/api.controller.js');
//Common Validation
var commonValidation = require('../../src/common/validation.common.js');

//const Joi = require('@hapi/joi');
//Celebrate Routes
const { celebrate, Joi, errors, Segments } = require('celebrate');
//Router Defined
var express = require('express');
var router = express.Router(); //valuable entaintement

//Api Using Sequilize MySql DB WITH NODE AND EXPRESS JS WITHOUT USED TYPE SCRIPT
//Fetch data by using user_id
router.get("/api/v1/:id", ApiController.findOne);
//Update profile of user by user-id
router.put("/api/v1/user/profile/:id", ApiController.update);
//Delete User Profile by user-id
router.delete("/api/v1/user/delete/:id", ApiController.delete);
//Fetch all user api
router.get("/api/v1/users/list", ApiController.findAll);
//Register Standard API 
router.post('/api/v1/register', celebrate({
	body: {
		name: commonValidation.VALIDATION.REGISTER.NAME,
		email: commonValidation.VALIDATION.REGISTER.EMAIL,
		phone: commonValidation.VALIDATION.REGISTER.PHONE,
    	password: commonValidation.VALIDATION.REGISTER.PASSWORD,
	},
  }), (req, res) => {
  	ApiController.create(req, res);
});

//Login Standard API 
router.post('/api/v1/login', celebrate({
	body: {
	    email: commonValidation.VALIDATION.LOGIN.EMAIL,
    	password: commonValidation.VALIDATION.LOGIN.PASSWORD,
	},
  }), (req, res) => {
  	ApiController.login(req, res);
});

//Register Api
router.post('/api/v1/register', ApiController.register)

//Old Method for Beginner developer for practics only
var loginRouter = function(app) {
	
	//Demo Api
    app.get("/api/v1/demo-api", function(req, res) {
        res.send("Hello World");
    });

    //Register Api
    app.post("/register", (req, res, next) => {

    	const data = req.body;

    	// define the validation schema
    	const schema = Joi.object().keys({

			name: Joi.string().min(3).max(50).required(),

	        email: Joi.string().email().required().trim(),

	        phone: Joi.string().min(10).trim().regex(/^[0-9]{7,10}$/).required(),

	        password: Joi.string().min(7).alphanum().required().trim(),

	        confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict().trim()

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
    });

    //Login Api
    app.post("/login", (req, res, next) => {

    	const data = req.body;

    	// define the validation schema
    	const schema = Joi.object().keys({

	        email: Joi.string().email().required().trim(),

	        password: Joi.string().required().trim(),
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
								console.log('here');
								console.log(results);
								console.log(results['RowDataPacket']);
								console.log(results.RowDataPacket);
								const id = 1;//results.insertId;
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

    });
};
//module.exports = loginRouter;

module.exports = router;