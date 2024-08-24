'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sastojaks',
    [
      {id:"1",naziv:"Kečap"},
      {id:"2",naziv:"Kačkavalj"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sastojci', null, {});
  }
};
