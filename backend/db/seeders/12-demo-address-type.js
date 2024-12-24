'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { AddressType } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await AddressType.bulkCreate([
      {
        addressId: 1,
        addressType: 'Home'
      },
      {
        addressId: 2,
        addressType: 'Work'
      },
      {
        addressId: 3,
        addressType: 'Business'
      },
      {
        addressId: 4,
        addressType: 'School'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'AddressTypes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      phoneType: { [Op.in]: ['Home', 'Work', 'Business', 'School'] }
    }, {});
  }
};
