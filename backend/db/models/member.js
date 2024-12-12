'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.hasOne(models.User, {
        foreignKey: "userId",
        onDelete: "SET NULL",
      })
    }
  }
  Member.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: "SET NULL",
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: true
    },
    idNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    householdId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    memberTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memberStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memberCivilStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};