'use strict';

const { Phone } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Phone.bulkCreate([
      {
        memberId: 1,
        phoneNumber: '09123456789',
        phoneType: 'Home'
      },
      {
        memberId: 1,
        phoneNumber: '09123456788',
        phoneType: 'Work'
      },
      {
        memberId: 1,
        phoneNumber: '09123456787',
        phoneType: 'Mobile'
      },
      {
        memberId: 1,
        phoneNumber: '09123456786',
        phoneType: 'Other'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Phones';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      phoneNumber: { [Op.in]: ['09123456789', '09123456788', '09123456787', '09123456786'] }
    }, {});
  }
};
