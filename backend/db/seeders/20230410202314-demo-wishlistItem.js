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
   await queryInterface.bulkInsert("WishlistItems", [
    {
      wishlistId: 1,
      userId: 1,
      spotId: 1
    },
    {
      wishlistId: 1,
      userId: 1,
      spotId: 2
    },
    {
      wishlistId: 1,
      userId: 1,
      spotId: 3
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("WishlistItems", {
      id: [1, 2, 3]
    })
  }
};
