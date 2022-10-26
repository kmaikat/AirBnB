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
   await queryInterface.bulkInsert("ReviewImages", [
      {
        reviewId: 5,
        url: 'https://a0.muscache.com/im/pictures/85f68601-2f15-45ba-8461-b238c8d1906f.jpg?im_w=720'
      },
      {
        reviewId: 5,
        url: 'https://a0.muscache.com/im/pictures/ef3f5c56-e292-4022-a900-59b64c70570b.jpg?im_w=1200'
      },
      {
        reviewId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45178572/original/89c81801-e2dc-4da9-93bb-94f29960b033.jpeg?im_w=720'
      },
      {
        reviewId: 3,
        url: 'https://a0.muscache.com/im/pictures/45855985/fd3d54f3_original.jpg?im_w=720'
      },
      {
        reviewId: 6,
        url: 'https://a0.muscache.com/im/pictures/79842535/88a89ca7_original.jpg?im_w=720'
      },
      {
        reviewId: 2,
        url: 'https://a0.muscache.com/im/pictures/82be8c4a-9ce4-4e82-9b11-91083fe49ff1.jpg?im_w=720'
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
  }
};
