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

//Basic Auth Middleware for API
var Middlewares = require('../../src/middlewares/auth.js');

//Api Using Sequilize MySql DB WITH NODE AND EXPRESS JS WITHOUT USED TYPE SCRIPT
//Swagger Reference - https://mherman.org/blog/swagger-and-nodejs/
//Update profile of user by user-id
router.put("/api/v1/user/profile/:id",
Middlewares.basicAuth, //Basic Auth verify with username and password Authorize
ApiController.update);

   /**
    * @Author        : Shubham Gupta
    * @Last modified : <30-03-2020>
    * @Project       : <Basic Node JS Application>
    * @Function      : <Routes Define>
    * @Description   : <this route will delete user info BY user-id from users table>
    * @Parameters    : <YES>
    * @Method        : <DELETE>
    * @Returns       : <YES>
    * @Return Type   : <json>
	* @Swagger       : <YES>
    */

	/**
	* @swagger
	* securityDefinsecurityDefinitions:
  	*	basicAuth:
    *	type: apiKey
    *	name: basicAuth
    *	in: header
    *	description: Requests should pass an basicAuth header.
	*	security: 
	*	- basicAuth: []
	* /user/delete/{id}:
	*   delete:
	*     tags:
	*       - Users
	*     summary: Delete User by User-Id
	*     description: Delete a single User by User-id
	*     produces:
	*       - application/json
	*     parameters:
 	*       - name: id
 	*         description: User's id
 	*         in: path
 	*         required: true
 	*         type: integer
	*     responses: {
	*      200: {
	*         description: "Success",
	* 			type: String,
	* 		 },
	* 		500: {
	* 			description: "Internal Server Error",
	* 			type: String,
	* 		},
	*      400: {
	* 			description: "Validation Error",
	*		 	type: String,
	*     	},
	*		401: {
	*      	description: "Unathorized",
	* 			type: String,
	* 		}
	*  }
	*/
	router.delete("/api/v1/user/delete/:id",
	Middlewares.basicAuth, //Basic Auth verify with username and password Authorize
	Middlewares.bearerAuth, //Bearer Auth verify when login time provide token
	ApiController.delete);

   /**
    * @Author        : Shubham Gupta
    * @Last modified : <30-03-2020>
    * @Project       : <Basic Node JS Application>
    * @Function      : <Routes Define>
    * @Description   : <this route will fetch user info BY user-id from users table>
    * @Parameters    : <YES>
    * @Method        : <GET>
    * @Returns       : <YES>
    * @Return Type   : <json>
	* @Swagger       : <YES>
    */

	/**
	* @swagger
	*securityDefinsecurityDefinitions:
  	*	basicAuth:
    *	type: apiKey
    *	name: basicAuth
    *	in: header
    *	description: Requests should pass an basicAuth header.
	*	security: 
	*	- basicAuth: []
	* /user/{id}:
	*   get:
	*     tags:
	*       - Users
	*     summary: Return User Info by User-Id
	*     description: Returns a single User
	*     produces:
	*       - application/json
	*     parameters:
 	*       - name: id
 	*         description: User's id
 	*         in: path
 	*         required: true
 	*         type: integer
	*     responses: {
	*      200: {
	*         description: "Success",
	* 			type: String,
	* 		 },
	* 		500: {
	* 			description: "Internal Server Error",
	* 			type: String,
	* 		},
	*      400: {
	* 			description: "Validation Error",
	*		 	type: String,
	*     	},
	*		401: {
	*      	description: "Unathorized",
	* 			type: String,
	* 		}
	*  }
	*/
	router.get("/api/v1/user/:id",
	Middlewares.basicAuth, //Basic Auth verify with username and password Authorize
	Middlewares.bearerAuth, //Bearer Auth verify when login time provide token
	ApiController.findOne);
	
	 /**
    * @Author        : Shubham Gupta
    * @Last modified : <30-03-2020>
    * @Project       : <Basic Node JS Application>
    * @Function      : <Routes Define>
    * @Description   : <this route will fetch all user from users table>
    * @Parameters    : <YES>
    * @Method        : <GET>
    * @Returns       : <YES>
    * @Return Type   : <json>
	* @Swagger       : <YES>
    */

   /**
	* @swagger
	* securityDefinsecurityDefinitions:
  	*	basicAuth:
    *	type: apiKey
    *	name: basicAuth
    *	in: header
    *	description: Requests should pass an basicAuth header.
	*	security: 
	*	- basicAuth: []
	* /users/list:
	*   get:
	*     tags:
	*       - Users
	*     summary: All User List
	*     description: Returns all Users
	*     produces:
	*       - application/json
	*     responses: {
	*      200: {
	*         description: "Success",
	* 			type: String,
	* 		 },
	* 		500: {
	* 			description: "Internal Server Error",
	* 			type: String,
	* 		},
	*      400: {
	* 			description: "Validation Error",
	*		 	type: String,
	*     	},
	*		401: {
	*      	description: "Unathorized",
	* 			type: String,
	* 		}
	*  }
	*/
	router.get("/api/v1/users/list",
	Middlewares.basicAuth, //Basic Auth verify with username and password Authorize
	Middlewares.bearerAuth, //Bearer Auth verify when login time provide token
	ApiController.findAll);

	/**
    * @Author        : Shubham Gupta
    * @Last modified : <30-03-2020>
    * @Project       : <Basic Node JS Application>
    * @Function      : <Routes Define>
    * @Description   : <this route will used for register a user(Register Standard API)>
    * @Parameters    : <YES>
    * @Method        : <POST>
    * @Returns       : <YES>
    * @Return Type   : <json>
	* @Swagger       : <YES>
    */
	
	/**
	* @swagger
	* securityDefinsecurityDefinitions:
  	*	basicAuth:
    *	type: apiKey
    *	name: basicAuth
    *	in: header
    *	description: Requests should pass an basicAuth header.
	*	security: 
	*	- basicAuth: []
	* /register:
	*   post:
	*     tags:
	*       - Users
	*     name: Register
	*     summary: Register in a user
	*     consumes:
	*       - application/json
	*     parameters:
	*       - name: body
	*         in: body
	*         schema:
	*           type: object
	*           properties: {
	*			  phone:{
	*               type : integer,
	*             },
	*             email: {
	*               type: string,
	*             },
	*             name: {
	*               type: string,
	*             },
	*             password: {
	*               type: string,
	*               format: password
	*             }
	*		  }
	*         required:
	*           - mail
	*           - password
	*     responses: {
	*       200: {
	*         description: "User found and logged in successfully",
	*		  type: String
	*		},
	* 		500: {
	* 			description: "Internal Server Error",
	* 			type: String,
	* 		},
	*       400: {
	* 			description: "Validation Error",
	*		 	type: String,
	*     	},
	*		401: {
	*      	description: "Unathorized",
	* 			type: String,
	* 		}
	*	}
	*/
	router.post('/api/v1/register', celebrate({
		body: {
			name: commonValidation.VALIDATION.REGISTER.NAME,
			email: commonValidation.VALIDATION.REGISTER.EMAIL,
			phone: commonValidation.VALIDATION.REGISTER.PHONE,
			password: commonValidation.VALIDATION.REGISTER.PASSWORD,
		},
	}),
	Middlewares.basicAuth, //Basic Auth verify with username and password Authorize
	(req, res) => {
		ApiController.create(req, res);
	});

	/**
    * @Author        : Shubham Gupta
    * @Last modified : <31-03-2020>
    * @Project       : <Basic Node JS Application>
    * @Function      : <Routes Define>
    * @Description   : <this route will used for login user(Login Standard API))>
    * @Parameters    : <YES>
    * @Method        : <POST>
    * @Returns       : <YES>
    * @Return Type   : <json>
	* @Swagger       : <YES>
    */

	/**
	* @swagger
	* /login:
	*   post:
	*     tags:
	*       - Users
	*     name: Login
	*     summary: Logs in a user
	*     consumes:
	*       - application/json
	*     parameters:
	*       - name: body
	*         in: body
	*         schema:
	*           type: object
	*           properties:
	*             email:
	*               type: string
	*             password:
	*               type: string
	*               format: password
	*         required:
	*           - email
	*           - password
	*     responses: {
	*       200: {
	*         description: "User found and logged in successfully",
	*		  type: String
	*		},
	* 		500: {
	* 			description: "Internal Server Error",
	* 			type: String,
	* 		},
	*       400: {
	* 			description: "Validation Error",
	*		 	type: String,
	*     	},
	*		401: {
	*      	description: "Unathorized",
	* 			type: String,
	* 		}
	*	}
	*/

//Login Standard API 
	router.post('/api/v1/login', celebrate({
		body: {
			email: commonValidation.VALIDATION.LOGIN.EMAIL,
			password: commonValidation.VALIDATION.LOGIN.PASSWORD,
		},
	}),
	Middlewares.basicAuth, //Basic Auth verify with username and password Authorize
	(req, res) => {
		ApiController.login(req, res);
	});

//Register Api ->Old Api process for beginner
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