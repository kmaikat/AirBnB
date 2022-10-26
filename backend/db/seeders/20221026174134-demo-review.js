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
    await queryInterface.bulkInsert("Reviews", [
      {
        spotId: 1,
        userId: 1,
        review: "Too small, overpriced",
        stars: 1
      },
      {
        spotId: 2,
        userId: 2,
        review: "Why is this even listed?",
        stars: 1
      },
      {
        spotId: 2,
        userId: 3,
        review: "Super nice, would come back",
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: "Good place, plenty of room",
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: "Eh, it's not big enough",
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: "Eh, it's too small",
        stars: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
