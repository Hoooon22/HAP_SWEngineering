'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('qreplys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      num: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      regdate: {
        type: Sequelize.DATE
      },
      qnum: {
        type: Sequelize.INTEGER
      },
      u_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('qreplys');
  }
};
