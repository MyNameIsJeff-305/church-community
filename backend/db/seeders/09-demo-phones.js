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
        phoneNumber: '09123456789'
      },
      {
        memberId: 1,
        phoneNumber: '09123456788'
      },
      {
        memberId: 1,
        phoneNumber: '09123456787'
      },
      {
        memberId: 1,
        phoneNumber: '09123456786'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Phones';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      phoneNumber: { [Op.in]: ['09123456789'] }
    }, {});
  }
};
