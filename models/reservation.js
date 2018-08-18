'use strict';
module.exports = (sequelize, DataTypes) => {
  var reservation = sequelize.define('reservation', {
    date: DataTypes.STRING,
    court: DataTypes.INTEGER,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
  }, {});
  reservation.associate = function(models) {
    // associations can be defined here
   reservation.belongsTo(models.member, {
      foreignKey: 'memberId',
      as: 'members',
      onDelete: 'CASCADE',
    })
  };
  return reservation;
};