'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CivilStatus extends Model {
    static associate(models) {
      CivilStatus.hasMany(models.Member, {
        foreignKey: "memberCivilStatusId",
        onDelete: "CASCADE"
      })
    }
  }
  CivilStatus.init({
    civilStatus: {
      allowNull: false,
      type: DataTypes.STRING(50)
    }
  }, {
    sequelize,
    modelName: 'CivilStatus',
  });
  return CivilStatus;
};