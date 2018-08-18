'use strict';
module.exports = (sequelize, DataTypes) => {
  var member = sequelize.define('member', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    memType: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  member.associate = function(models) {
    // associations can be defined here
    member.hasMany(models.reservation, {
      foreignKey: 'memberId',
      as: 'reservations',
    })
  };
  return member
}