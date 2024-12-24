'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailTypes extends Model {
    static associate(models) {
      EmailTypes.belongsTo(models.Email, {
        foreignKey: "emailTypeId",
        onDelete: "CASCADE"
      })
    }
  }
  EmailTypes.init({
    emailType: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {
    sequelize,
    modelName: 'EmailTypes',
  });
  return EmailTypes;
};