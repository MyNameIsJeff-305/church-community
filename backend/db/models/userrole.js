'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
    }
  }
  UserRole.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Ensure this matches the defined model name if using Sequelize auto table creation
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role', // Ensure this matches the defined model name
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};