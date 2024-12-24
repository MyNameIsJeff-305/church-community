'use strict';

const { Gender } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Gender.bulkCreate([
      {
        gender: "Male"
      },
      {
        gender: "Female"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Genders';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      gender: { [Op.in]: ['Male', 'Female'] }
    }, {});
  }
};
