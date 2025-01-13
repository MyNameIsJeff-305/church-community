'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Household } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Household.bulkCreate([
      {
        name: 'Household 1',
        householdHeadId: 1
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Phones';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      phoneNumber: { [Op.in]: ['Household 1'] }
    }, {});
  }
};
