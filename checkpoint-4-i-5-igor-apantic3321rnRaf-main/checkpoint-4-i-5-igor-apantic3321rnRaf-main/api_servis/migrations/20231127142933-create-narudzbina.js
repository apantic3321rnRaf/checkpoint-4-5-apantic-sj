'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Narudzbinas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vreme_narucivanja: {
        allowNull: false,
        type: Sequelize.DATE
      },
      zakazano_vreme: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adresa: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telefon: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ime_prezime: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Narudzbinas');
  }
};