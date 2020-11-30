var express = require('express');
var router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

// model loading
var models = require('../models');


/* GET home page. */
router.post('/getTodoListFromDate', async function (req, res, next) {
  let date = req.body;
  let { year, month } = date;

  // await models.todolist.update(
  //   {    
  //     date_year: year,
  //     date_month: month,
  //   },
  //   {where:{
  //     date: {
  //       [Op.like]: "%" + year + "-" + month + "%",
  //     },
  // }})
  let nextMonth = month >=12 ? {year:Number(year)+1,month:'01'} : {year : year,month : (Number(month)+1)>=10 ? (Number(month)+1):'0'+(Number(month)+1)}
  console.log(nextMonth);
  let result = await models.todolist.findAll({
    where: {
      date: {
        [Op.gte]: new Date(year + "-" + month + '-01'),
        [Op.lt]: new Date(nextMonth.year + "-" + nextMonth.month + "-01")
      }
    }
  })
  console.log(result);

  var aJsonArray = new Array();
  for (let i in result) {
    aJsonArray.push(result[i].dataValues)
  }
  console.log(aJsonArray)

  // TODO :: DB 에서 year, month 통해 TodoList 조회
  res.json(aJsonArray)
});

router.post('/addTodoList', function (req, res, next) {
  //AddTodoList data 가 넘어옴

  console.log(req.body);
});


module.exports = router;
