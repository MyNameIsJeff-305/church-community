'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MemberStatus extends Model {
    static associate(models) {
      MemberStatus.hasMany(models.Member, {
        foreignKey: "memberStatusId",
        onDelete: "CASCADE"
      })
    }
  }
  MemberStatus.init({
    status: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {
    sequelize,
    modelName: 'MemberStatus',
  });
  return MemberStatus;
};