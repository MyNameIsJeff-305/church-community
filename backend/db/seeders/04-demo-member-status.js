'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { MemberStatus } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await MemberStatus.bulkCreate([
      {
        status: 'Active'
      },
      {
        status: 'Inactive'
      },
      {
        status: 'Dead'
      },
      {
        status: 'Suspended'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'MemberStatus';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      status: { [Op.in]: ['Active', 'Inactive', 'Dead', 'Suspended'] }
    }, {});
  }
};
