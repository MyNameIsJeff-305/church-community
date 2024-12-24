'use strict';

const { MemberType } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await MemberType.bulkCreate([
      {
        memberType: 'Member'
      },
      {
        memberType: 'Leader'
      },
      {
        memberType: 'Pastor'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'MemberTypes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      idNumber: { [Op.in]: ['1234567890'] }
    }, {});
  }
};
