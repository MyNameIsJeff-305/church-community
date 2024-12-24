'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { CivilStatus } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await CivilStatus.bulkCreate([
      {
        civilStatus: 'Single'
      },
      {
        civilStatus: 'Married'
      },
      {
        civilStatus: 'Widowed'
      },
      {
        civilStatus: 'Divorced'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CivilStatus';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      civilStatus: { [Op.in]: ['Single', 'Married', 'Widowed', 'Suspended'] }
    }, {});
  }
};
