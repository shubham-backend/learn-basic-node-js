//MySql Connection
var connection = require('../../mysql.js');
var resMiddleware = require('../../src/middlewares/response.middleware.js');

//https://www.npmjs.com/package/joi
const Joi = require('joi');

var loginRouter = function(app) {
	
	//Demo Api
    app.get("/api/v1/demo-api", function(req, res) {
        res.send("Hello World");
    });

    //Register Api
    app.post("/api/v1/register", (req, res, next) => {

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
                res.status(422).json({
                    success: false,
			        code: 400,
			        key: err.details[0].context.key,
			        message: err.details[0].message.replace(/"/g, '')
                });
  
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
        					res.json({
								success: false,
								code:400,
								message:"Email already exists."
							});
        			}else{

        				connection.query('INSERT INTO app_users SET ?', registerData, function (error, results, fields) {
        		
			        		if (error) {
								console.log("error ocurred",error);
								res.json({
								 success: false,
								 code:400,
								 message:"Something went wrong."
								});
							}
							else{
								const id = results.insertId;
				                res.json({
				                    status: true,
				                    code: 200,
				                    message: 'User created successfully',
				                    data: Object.assign({id}, value)
			            		});
			            	}
				        });		
        			}
        		});
            }
	    });
    });

    //Login Api
    app.post("/api/v1/login", (req, res, next) => {

    	const data = req.body;

    	// define the validation schema
    	const schema = Joi.object().keys({

	        email: Joi.string().email().required().trim(),

	        password: Joi.string().required().trim(),
    	});

    	// validate the request data against the schema
	    Joi.validate(data, schema, (err, value) => {

	    	if (err) {
                res.status(422).json({
                    success: false,
			        code: 400,
			        key: err.details[0].context.key,
			        message: err.details[0].message.replace(/"/g, '')
                });
  
            } 
            else {
            	console.log(data);
            	connection.query('SELECT * FROM app_users WHERE email = ?',[data.email], function (error, results, fields) {
            		
            		if (error) {
						console.log("error ocurred",error);
						res.json({
						 success: false,
						 code:400,
						 message:"Something went wrong."
						});
					}
					else{
						if(results.length >0){
							if(results[0].password == data.password){
								const id = 1;//results.insertId;
				                res.json({
				                    status: true,
				                    code: 200,
				                    message: 'Login successfully',
				                    data: Object.assign({id}, value)
		                		});
                			}
                			else{
			                 	res.json({
				                  	success: false,
				                    code:400,
				                    message:"Email or password does not match"
			                    });
			                }
			            }
			            else{
		            		res.json({
			                  	success: false,
			                    code:400,
			                    message:"Email does not exists."
		                    });
			            }
			        }    
                });
            }
	    });

    });
}

module.exports = loginRouter;