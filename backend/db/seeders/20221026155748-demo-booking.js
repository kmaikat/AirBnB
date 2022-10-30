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
   await queryInterface.bulkInsert("Bookings", [
    {
      spotId: 1,
      userId: 1,
      startDate: "2023-10-28",
      endDate: "2023-10-31",
    },
    {
      spotId: 2,
      userId: 2,
      startDate: "2023-12-25",
      endDate: "2024-01-01",
    },
    {
      spotId: 3,
      userId: 3,
      startDate: "2023-11-24",
      endDate: "2023-11-26",
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
    await queryInterface.bulkDelete("Bookings", {
      id: [1, 2, 3]
    });
  }
};
