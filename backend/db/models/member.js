'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.belongsTo(models.User, { 
        foreignKey: 'userId' ,
        onDelete: 'CASCADE'
      });
    }
  }
  Member.init({
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'
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
      type: DataTypes.STRING
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    memberTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memberStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memberCivilStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    householdId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memberHash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: 'Users' 
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};