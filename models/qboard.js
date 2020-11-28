'use strict';
module.exports = (sequelize, DataTypes) => {
  var qboard = sequelize.define('qboard', {
    num: {
      type: DataTypes.INTEGER,
      unique: true
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    passwd: {
      type: DataTypes.INTEGER
    },
    regdate: {
      type: DataTypes.DATE
    },
    reply: {
      type: DataTypes.INTEGER
    },
    u_id: {
      type: DataTypes.STRING
    },
    subject: {
      type: DataTypes.STRING
    },
  });
  return qboard;
};