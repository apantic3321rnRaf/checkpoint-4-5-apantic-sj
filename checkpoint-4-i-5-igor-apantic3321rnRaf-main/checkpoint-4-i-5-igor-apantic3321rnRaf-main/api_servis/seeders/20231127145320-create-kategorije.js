'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kategorijas',
    [
      {id:"1",naziv:"Pizza"},
      {id:"2",naziv:"Sendvič"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kategorije', null, {});
  }
};
