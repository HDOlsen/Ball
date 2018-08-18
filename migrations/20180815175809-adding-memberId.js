'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
    'reservations',
    'memberId', {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'members',
          key : 'id'
    }
  })
},

  down: (queryInterface, Sequelize) => {
    
    queryInterface.removeColumn(
      'reservations',
      'memberId'
    )
  }
};
