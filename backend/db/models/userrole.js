'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.hasMany(models.User, {
        foreignKey: "user",
        onDelete: "CASCADE",
      }),
      UserRole.hasMany(models.Role, {
        foreignKey: "role",
        onDelete: "CASCADE",
      })
    }
  }
  UserRole.init({
    user: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    role: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};