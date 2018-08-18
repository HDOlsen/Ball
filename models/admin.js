'use strict';
module.exports = (sequelize, DataTypes) => {
  var admin = sequelize.define('admin', {
    empId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};