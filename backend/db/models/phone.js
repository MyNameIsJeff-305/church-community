'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    static associate(models) {
      Phone.belongsTo(models.Member, {
        foreignKey: "memberId",
        onDelete: "CASCADE"
      }),
      Phone.hasMany(models.PhoneType, {
        foreignKey: "phoneId",
        onDelete: "CASCADE"
      })
    }
  }
  Phone.init({
    memberId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Members',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Phone',
  });
  return Phone;
};