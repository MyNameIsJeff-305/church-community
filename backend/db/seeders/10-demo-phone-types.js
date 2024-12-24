'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { PhoneType } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await PhoneType.bulkCreate([
      {
        phoneId: 1,
        phoneType: 'Mobile'
      },
      {
        phoneId: 2,
        phoneType: 'Landline'
      },
      {
        phoneId: 3,
        phoneType: 'Fax'
      },
      {
        phoneId: 4,
        phoneType: 'Pager'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PhoneTypes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      phoneType: { [Op.in]: ['Mobile', 'Landline', 'Fax', 'Pager'] }
    }, {});
  }
};
