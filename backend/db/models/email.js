'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    static associate(models) {
      Email.belongsTo(models.Member, {
        foreignKey: "memberId",
        onDelete: "CASCADE"
      })
    }
  }
  Email.init({
    memberId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Members',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    emailAddress: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    emailType: {
      allowNull: false,
      type: DataTypes.ENUM('Personal', 'Work', 'Other')
    }
  }, {
    sequelize,
    modelName: 'Email',
  });
  return Email;
};