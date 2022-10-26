'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Nunya Business St.',
        city: 'Austin',
        state: 'Texas',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'The Place',
        description: 'Big bathrooms, no beds and pullout sofa only',
        price: 150,
      },
      {
        ownerId: 2,
        address: '246 Tu Casa Blvd',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'The Place 1',
        description: 'Small room, nice view',
        price: 300,
      },
      {
        ownerId: 3,
        address: '153 Monkey Dr',
        city: 'Houston',
        state: 'Texas',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Frat Central',
        description: 'Big fridges for your IPA and seltzers',
        price: 200,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return await queryInterface.bulkDelete("Spots", {
       address: { [Op.in]: ["Some address", "Some address2", "Some address3"] }
     });
  }
};
