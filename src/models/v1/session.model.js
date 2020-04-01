module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      web_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jwt_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Session;
  };