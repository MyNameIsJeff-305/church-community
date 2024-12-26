'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsTo(models.UserRole, {
        foreignKey: "role",
        onDelete: "CASCADE",
      })
    }
  }
  Role.init({
    name: {
      type: {
        allowNull: false,
        type: DataTypes.STRING
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};