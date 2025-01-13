'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.hasMany(models.Email, {
        foreignKey: "memberId",
        onDelete: "CASCADE",
      }),
      Member.hasMany(models.Phone, {
        foreignKey: "memberId",
        onDelete: "CASCADE",
      }),
      Member.hasMany(models.Address, {
        foreignKey: "memberId",
        onDelete: "CASCADE",
      }),
      Member.hasOne(models.Household, {
        foreignKey: "householdHeadId",
        onDelete: "CASCADE",
      }),
      Member.belongsTo(models.Household, {
        foreignKey: "id",
        onDelete: "CASCADE",
      })
    }
  }
  Member.init({
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
    gender: {
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull: false
    },
    householdId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    memberType: {
      type: DataTypes.ENUM('Member', 'Leader', 'Pastor', 'Deacon'),
      allowNull: false
    },
    memberStatus: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Deceased', 'Moved'),
      allowNull: false
    },
    memberCivilStatus: {
      type: DataTypes.ENUM('Single', 'Married', 'Widowed', 'Divorced'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};