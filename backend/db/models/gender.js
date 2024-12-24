'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {

    static associate(models) {
      Gender.hasMany(models.Member, {
        foreignKey: "genderId",
        onDelete: "CASCADE"
      })
    }
  }
  Gender.init({
    gender: { 
      type: DataTypes.STRING(50),
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Gender',
  });
  return Gender;
};