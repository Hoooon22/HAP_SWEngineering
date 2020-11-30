var express = require('express');
var router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

// model loading
var models = require('../models');


/* GET home page. */
router.post('/getTodoListFromDate', async function (req, res, next) {
  let date = req.body;
  let {year,month} = date;


  console.log(12122121212121);
  console.log("%" + year + "-" + month + "%");
 
  console.log(12122121212121);

  await models.todolist.update(
    {    
      date_year: year,
      date_month: month,
    },
    {where:{
      date: {
        [Op.like]: "%" + year + "-" + month + "%",
      },
  }})

  let result = await models.todolist.findAll({  });

  var aJsonArray = new Array();
  for (let i in result)
  {
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
