'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Role } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Role.bulkCreate([
      {
        name: "Admin"
      },
      {
        name: "User"
      },
      {
        name: "SuperUser"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Roles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Admin', 'User', 'SuperUser'] }
    }, {});
  }
};
