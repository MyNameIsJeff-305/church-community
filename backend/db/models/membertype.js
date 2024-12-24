'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MemberType extends Model {
    static associate(models) {
      MemberType.hasMany(models.Member, {
        foreignKey: "memberTypeId",
        onDelete: "CASCADE"
      })
    }
  }
  MemberType.init({
    memberType: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {
    sequelize,
    modelName: 'MemberType',
  });
  return MemberType;
};