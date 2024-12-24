'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.hasOne(models.User, {
        foreignKey: "userId",
        onDelete: "SET NULL",
      }),
      Member.belongsTo(models.Gender, {
        foreignKey: "genderId",
        onDelete: "CASCADE",
      }),
      Member.belongsTo(models.MemberType, {
        foreignKey: "memberTypeId",
        onDelete: "CASCADE",
      }),
      Member.belongsTo(models.MemberStatus, {
        foreignKey: "memberStatusId",
        onDelete: "CASCADE",
      }),
      Member.belongsTo(models.CivilStatus, {
        foreignKey: "memberCivilStatusId",
        onDelete: "CASCADE",
      }),
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
      allowNull: false,
      references: {
        model: 'Genders',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    householdId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    memberTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MemberTypes',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    memberStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MemberStatuses',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    memberCivilStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CivilStatus',
        key: 'id'
      },
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};