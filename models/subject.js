'use strict';
module.exports = (sequelize, DataTypes) => {
  var subject = sequelize.define('subject', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
  });
  return subject;
};