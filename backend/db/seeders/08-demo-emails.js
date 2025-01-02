
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Email } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Email.bulkCreate([
      {
        memberId: 1,
        emailAddress: 'demo@app.io',
        emailType: 'Work'
      },
      {
        memberId: 1,
        emailAddress: 'demogmail@gmail.com',
        emailType: 'Personal'
      },
      {
        memberId: 1,
        emailAddress: 'other@demo.io',
        emailType: 'Other'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Emails';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      emailAddress: { [Op.in]: ['demo@app.io'] }
    }, {});
  }
};
