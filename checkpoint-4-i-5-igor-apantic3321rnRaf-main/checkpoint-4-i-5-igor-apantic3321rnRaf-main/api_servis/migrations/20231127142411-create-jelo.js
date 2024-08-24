'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jelos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      naziv: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      opis: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cena: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      kategorija_id: {
        allowNull: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jelos');
  }
};