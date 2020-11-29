'use strict';
module.exports = (sequelize, DataTypes) => {
  var todolist = sequelize.define('todolist', {
    title: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    },
    category_id: {
      type: DataTypes.INTEGER
    },
    category_name: {
      type: DataTypes.STRING
    },
    category_color: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.STRING
    },
  });
  return todolist;
};