'use strict';
module.exports = (sequelize, DataTypes) => {
  var qreply = sequelize.define('qreply', {
    num: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING
    },
    regdate: {
      type: DataTypes.DATE
    },
    qnum: {
      type: DataTypes.INTEGER
    },
    u_id: {
      type: DataTypes.INTEGER
    },
  });
  return qreply;
};