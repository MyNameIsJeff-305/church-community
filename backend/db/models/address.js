'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.Member, {
        foreignKey: "memberId",
        onDelete: "CASCADE"
      })
    }
  }
  Address.init({
    memberId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Members",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    addressType: {
      allowNull: false,
      type: DataTypes.ENUM('Home', 'Work', 'Other')
    },
    line1: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('Home', 'Work', 'Other')
    },
    line2: {
      allowNull: true,
      type: DataTypes.STRING
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    stateProvince: {
      type: DataTypes.STRING
    },
    zipPostalCode: {
      type: DataTypes.STRING
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};