'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { EmailTypes } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await EmailTypes.bulkCreate([
      {
        emailType: 'Personal'
      },
      {
        emailType: 'Work'
      },
      {
        emailType: 'School'
      },
      {
        emailType: 'Other'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EmailTypes';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
          type: { [Op.in]: ['Personal', 'Work', 'School', 'Other'] }
        }, {});
  }
};
