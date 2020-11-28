'use strict';
module.exports = (sequelize, DataTypes) => {
  var material = sequelize.define('material', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    maxNum: {
      type: DataTypes.INTEGER,
    },
    num: {
      type: DataTypes.INTEGER,
    },
    subject: {
      type: DataTypes.STRING,
    },
  });
  return material;
};