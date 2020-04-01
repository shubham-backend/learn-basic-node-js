//Practics 1
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

//Pratics 2
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