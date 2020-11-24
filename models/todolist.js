'use strict';
module.exports = (sequelize, DataTypes) => {
  var todolist = sequelize.define('todolist', {
    title: {
      type: DataTypes.STRING
    },
    date_year: {
      type: DataTypes.INTEGER
    },
    date_month: {
      type: DataTypes.INTEGER
    },
    date_day: {
      type: DataTypes.INTEGER
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
  });
  return todolist;
};