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
      }),
      Email.hasMany(models.EmailTypes, {
        foreignKey: "emailTypeId",
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
    emailTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'EmailTypes',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Email',
  });
  return Email;
};