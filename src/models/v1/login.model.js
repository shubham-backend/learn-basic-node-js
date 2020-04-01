//Pactics 1 Start Here
//MySql Connection
var connection = require('../../../mysql.js')
//Response middleware Used
var resMiddleware = require('../../middlewares/response.middleware.js');

//Session maintain
const db = require('../../database/sequelize-mysql.db.js');
const Session = db.sessions;
const UserModel = db.users;

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

    connection.query("SELECT * FROM users WHERE email = ?", [data.email], async function (err, results, fields) {

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
                
                //Previous token delete if already exist without logout
                await Session.destroy({ where: { web_token: '1234', userId: id } });
            
                //insert-data to session table
                let dataToInsert = {
                    userId: id,
                    name: results[0].name,
                    email: results[0].email,
                    web_token: '1234',
                    jwt_token: accessToken,
                };
                await Session.create(dataToInsert);
                
                let updateData = {
                    is_login: 1 
                };
                //update on users table for user logged in 
                await UserModel.update(updateData, { where: { id: id } });

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

User.logout = async function (payloadData, sessionData, callback){
    
    connection.query("SELECT * FROM users WHERE email = ?", [sessionData.email], async function (err, results, fields) {
        if(err) {
        	return callback(err, "Something went wrong.");
        }else{
             
            //console.log("TOKEN - ",token); //fetch routes then send token
            //JWT serves a different purpose than a session and it is not possible to forcefully delete or invalidate an existing token.
            //let destroyToken = await Jwt.destroy(token);
            //console.log(destroyToken);return false;
    
            let query = {};
            if(payloadData.webToken !=undefined){
                query = {where:{ jwt_token:payloadData.webToken }}
            }else{
                query = {where:{ userId:sessionData.userId }}
            }

            //Distroy token from session table
            await Session.destroy(query);
            
            //update on users table for user logout 
            let updateData = {
                is_login: false
            };
            //console.log(sessionData);
            await UserModel.update(updateData, { where: { id: sessionData.userId } });
            
            return callback(null, {'success': true, "message": "User logout successfully"});
        }
    }); 
};

module.exports= User;
//################################################Above all line uncomment abd used for login api ###########################################
//Pactics 1 End  Here