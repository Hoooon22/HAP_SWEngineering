'use strict';
module.exports = (sequelize, DataTypes) => {
  var homework = sequelize.define('homework', {
    title: {
      type: DataTypes.STRING
    },
    file: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    subject: {
      type: DataTypes.STRING
    },
  });
  return homework;
};