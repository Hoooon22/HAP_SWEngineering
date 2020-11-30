'use strict';
module.exports = (sequelize, DataTypes) => {
  var studentattend = sequelize.define('studentattend', {
    subject: {
      type: DataTypes.STRING
    },
    s_id: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING
    },
    num: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING
    },
  });
  return studentattend;
};