'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'reservations',
      'date', {
        type : Sequelize.STRING,
        allowNull : false
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'reservations',
      'date')
  }
};
