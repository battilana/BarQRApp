const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loggedIn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
  });
};
