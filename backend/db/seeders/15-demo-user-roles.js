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
        userId: 1,
        roleId: 1
      },
      {
        userId: 2,
        roleId: 2
      },
      {
        userId: 3,
        roleId: 3
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'UserRoles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
