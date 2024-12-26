'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { UserRole } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await UserRole.bulkCreate([
      {
        user: 1,
        role: 1
      },
      {
        user: 2,
        role: 2
      },
      {
        user: 3,
        role: 3
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'UserRoles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
