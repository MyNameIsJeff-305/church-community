'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profileImg: {
        type: Sequelize.STRING(256),
        allowNull: true,
        defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      alias: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      idNumber: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: false
      },
      householdId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      memberType: {
        type: Sequelize.ENUM('Member', 'Leader', 'Pastor', 'Deacon'),
        allowNull: false
      },
      memberStatus: {
        type: Sequelize.ENUM('Active', 'Inactive', 'Deceased', 'Moved'),
        allowNull: false,
      },
      memberCivilStatus: {
        type: Sequelize.ENUM('Single', 'Married', 'Widowed', 'Divorced'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Members";
    await queryInterface.dropTable(options);
  }
};