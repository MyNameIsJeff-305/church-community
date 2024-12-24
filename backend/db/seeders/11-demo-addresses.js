'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Address } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Address.bulkCreate([
      {
        memberId: 1,
        line1: '1234 Demo St.',
        line2: 'Apt 3',
        city: 'Demo City',
        stateProvince: 'Demo Province',
        zipPostalCode: '1234'
      },
      {
        memberId: 1,
        line1: '1235 Demo St.',
        city: 'Demo City',
        stateProvince: 'Demo Province',
        zipPostalCode: '1234'
      },
      {
        memberId: 1,
        line1: '1236 Demo St.',
        line2: 'Apt 3',
        city: 'Demo City',
        stateProvince: 'Demo Province',
        zipPostalCode: '1234'
      },
      {
        memberId: 1,
        line1: '1237 Demo St.',
        line2: 'Apt 3',
        city: 'Demo City',
        stateProvince: 'Demo Province',
        zipPostalCode: '1234'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Addresses';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      phoneType: { [Op.in]: ['1234 Demo St.', '1235 Demo St.', '1236 Demo St.', '1237 Demo St.'] }
    }, {});
  }
};
