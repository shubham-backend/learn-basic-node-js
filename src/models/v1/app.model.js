// console.log('Model work here.');

// //Pactics 1 Start Here
// //MySql Connection
// var connection = require('../../../mysql.js')
// //Response middleware Used
// var resMiddleware = require('../../middlewares/response.middleware.js');

// //User object constructor
// var User = function(user){
//     this.name = user.name;
//     this.email = user.email;
//     this.phone = user.phone;
//     this.password = user.password;
//     this.created_at = new Date();
// };

// User.login = function (data, callback) { 

//     connection.query("SELECT * FROM app_users WHERE email = ?", [data.email], function (err, results, fields) {

//         if(err) {
//         	// resMiddleware.sendError(res,"Something went wrong.");
//         	// return callback(new Error("Something went wrong."));
//         	return callback(err, "Something went wrong.");
//         }
//         else{
//         	if(results.length >0){
// 				if(results[0].password == data.password){
// 					const id = results[0].id;	
//             		return callback(null, Object.assign({id}, data))
//     			}
//     			else{
//     				return callback(err, "Email or password does not match.");
//                 }
//             }
//             else{
//             		return callback(err,"Email does not exists.");
//             }
//         }
//     });           
// };

// module.exports= User;
//Pactics 1 End  Here


//Practics 2
// var Sequelize = require('sequelize');
// var db = require('../../database/sequelize-mysql.db.js');

// module.exports = db.sequelize.define(
//     'user', 
//     {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       name: {
//         type: Sequelize.STRING
//       },
//       email: {
//         type: Sequelize.STRING
//       },
//       phone: {
//         type: Sequelize.INTEGER
//       },
//       password: {
//         type: Sequelize.STRING
//       },
//       created_at: {
//         type: Sequelize.DATE,
//         defaultValue:Sequelize.NOW
//       }
//     },
//       {
//         timestamps:false
//       }
// );

//delete table and data and generate new table with schema(Drop and re-sync db)
//db.sequelize.sync({ force: true });
//Important line to modify table ONLY
////db.sequelize.sync({ alter: true });

//Pratics3
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.BOOLEAN
    },
  });

  return User;
};