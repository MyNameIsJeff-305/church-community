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
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alias: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      memberTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      memberStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      memberCivilStatus: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      householdId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      memberHash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'Users' 
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Members";
    return queryInterface.dropTable(options);
  }
};