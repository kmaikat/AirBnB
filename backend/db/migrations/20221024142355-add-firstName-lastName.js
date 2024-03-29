'use strict';

/** @type {import('sequelize-cli').Migration} */

const { sequelize } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.addColumn("Users", "firstName", {
        type: Sequelize.STRING,
      });

      await queryInterface.addColumn("Users", "lastName", {
        type: Sequelize.STRING
      });
    } catch (error) {
      console.error(error);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    try {
      await queryInterface.removeColumn("Users", "firstName");
      await queryInterface.removeColumn("Users", "lastName");
    } catch (error) {
      console.error(error);
    }
  }
};
