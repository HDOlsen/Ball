'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'admins',
      'adminType', {
        type : Sequelize.STRING,
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'admins',
      'adminType')
  }
};
