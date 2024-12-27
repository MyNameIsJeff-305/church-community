'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: 'UserRole',
        as: 'users',
        foreignKey: 'roleId',
        otherKey: 'userId'
      });
    }
  }
  Role.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};