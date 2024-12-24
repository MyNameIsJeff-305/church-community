'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneType extends Model {
    static associate(models) {
      PhoneType.belongsTo(models.Phone, {
        foreignKey: "phoneId",
        onDelete: "CASCADE"
      })
    }
  }
  PhoneType.init({
    phoneId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Phones',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    phoneType: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'PhoneType',
  });
  return PhoneType;
};