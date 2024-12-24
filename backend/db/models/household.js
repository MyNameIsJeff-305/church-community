'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Household extends Model {
    static associate(models) {
      Household.hasMany(models.Member, {
        foreignKey: "householdId",
        onDelete: "CASCADE"
      }),
      Household.belongsTo(models.Member, {
        foreignKey: "householdHeadId",
        onDelete: "CASCADE"
      })
    }
  }
  Household.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    householdHeadId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Member',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Household',
  });
  return Household;
};