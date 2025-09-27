'use strict';

const { Member } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
      {
        profileImg: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png',
        firstName: 'John',
        lastName: 'Doe',
        alias: 'johndoe',
        birthDate: new Date('1990-01-01'),
        memberTypeId: 1,
        memberStatusId: 1,
        memberCivilStatus: 1,
        householdId: 1,
        memberHash: 'someUniqueHash1',
        userId: 1,
      },
      {
        profileImg: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png',
        firstName: 'Jane',
        lastName: 'Doe',
        alias: 'janedoe',
        birthDate: new Date('1992-02-02'),
        memberTypeId: 1,
        memberStatusId: 1,
        memberCivilStatus: 1,
        householdId: 1,
        memberHash: 'someUniqueHash2',
        userId: 2
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Members';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      memberHash: { [Op.in]: ['someUniqueHash1', 'someUniqueHash2'] }
    }, {});
  }
};
