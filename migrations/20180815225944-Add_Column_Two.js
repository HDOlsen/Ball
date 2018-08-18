'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
    'admins',
    'userName', {
      type : Sequelize.STRING,
      allowNull : false
  }),
    queryInterface.addColumn(
      'admins',
      'password', {
        type : Sequelize.STRING,
        allowNull : false
    }
  ),
  queryInterface.removeColumn(
    'admins',
    'empId', {
  }
)
},

  down: (queryInterface, Sequelize) => {
    
    queryInterface.removeColumn(
      'admins',
      'userName'),
      queryInterface.removeColumn(
        'admins',
        'password'),
        queryInterface.addColumn(
          'admins',
          'empId', {
            type : Sequelize.STRING
  })
 }
};
