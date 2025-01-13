'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Emails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Members',
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      emailAddress: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      emailType: {
        allowNull: false,
        type: Sequelize.ENUM('Personal', 'Work', 'Other')
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
    options.tableName = "Emails";
    await queryInterface.dropTable(options);
  }
};