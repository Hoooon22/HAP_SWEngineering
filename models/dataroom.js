'use strict';
module.exports = (sequelize, DataTypes) => {
  var dataroom = sequelize.define('dataroom', {
    name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    subject_name: {
      type: DataTypes.STRING
    },
  });
  return dataroom;
};