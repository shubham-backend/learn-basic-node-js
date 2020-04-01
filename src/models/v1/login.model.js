//Pactics 1 Start Here
//MySql Connection
var connection = require('../../../mysql.js')
//Response middleware Used
var resMiddleware = require('../../middlewares/response.middleware.js');

//User object constructor
var User = function(user){
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.password = user.password;
    this.created_at = new Date();
};

var accessBearerToken =  require( '../../middlewares/TokenManager');

User.login = async function (data, callback) { 

    connection.query("SELECT * FROM app_users WHERE email = ?", [data.email], async function (err, results, fields) {

        if(err) {
        	// resMiddleware.sendError(res,"Something went wrong.");
        	// return callback(new Error("Something went wrong."));
        	return callback(err, "Something went wrong.");
        }
        else{
        	if(results.length >0){
				if(results[0].password == data.password){
          let tokenObject = {
              userId: results[0].id,
              email: results[0].email,
              name: results[0].name,
              //time : + new Date()
            }
            let accessToken =  await accessBearerToken.generateUserToken({ 'type': 'USER_LOGIN', 'object': tokenObject });
            //console.log(accessToken);
            const id = results[0].id;	
            data['accessToken'] = accessToken;
            return callback(null, Object.assign({id}, data))
    			}
    			else{
    				return callback(err, "Email or password does not match.");
                }
            }
            else{
            		return callback(err,"Email does not exists.");
            }
        }
    });           
};

module.exports= User;
//################################################Above all line uncomment abd used for login api ###########################################
//Pactics 1 End  Here