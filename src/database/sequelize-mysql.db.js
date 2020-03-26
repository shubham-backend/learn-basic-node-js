var Sequelize = require('sequelize');
//var UserModel = require("../models/v1/app.model.js");
var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});

sequelize.authenticate()
  .then(function(err) {
    console.log('MySql Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
});



//const User = UserModel(sequelize, Sequelize)
//module.exports = db;

//const UserModel = require("../models/v1/app.model.js")
//UserModel(sequelize, Sequelize);


// module.exports = {
//   UserModel,
// }

//Important line to create table
//sequelize.sync({ force: true });
//https://www.youtube.com/watch?v=1Wvs5h3K_As
var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../models/v1/app.model.js")(sequelize, Sequelize);
module.exports = db;

//var User = UserModel(sequelize, Sequelize);
//module.exports = User;
// db.users = require("../models/v1/app.model.js")(sequelize, Sequelize);

//module.exports = db;

//Hints - https://bezkoder.com/node-js-express-sequelize-mysql/
// First five parameters are for MySQL connection.
// pool is optional, it will be used for Sequelize connection pool configuration:

// max: maximum number of connection in pool
// min: minimum number of connection in pool
// idle: maximum time, in milliseconds, that a connection can be idle before being released
// acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
