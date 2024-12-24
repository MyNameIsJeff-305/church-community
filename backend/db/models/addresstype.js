'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AddressType extends Model {
    static associate(models) {
      AddressType.belongsTo(models.Address, {
        foreignKey: "addressTypeId",
        onDelete: "CASCADE"
      })
    }
  }
  AddressType.init({
    addressId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Address',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    addressType: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'AddressType',
  });
  return AddressType;
};