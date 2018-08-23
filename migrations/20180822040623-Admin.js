'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'admins',
      'adminType', {
        type : Sequelize.STRING,
    }),
      queryInterface.addColumn(
        'admins',
        'phone', {
          type : Sequelize.STRING
      }
    ),
    queryInterface.addColumn(
      'admins',
      'photo', {
        type : Sequelize.STRING
    }
  )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'admins',
      'userName'),
      queryInterface.removeColumn(
        'admins',
        'phone'),
        queryInterface.removeColumn(
          'admins',
          'photo')
  }
};
