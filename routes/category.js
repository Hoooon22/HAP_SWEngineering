var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/getCategoryList', async function (req, res, next) {
    let result = await models.subject.findAll({});
    
    var aJsonArray = new Array();
    for (let i in result)
    {
      aJsonArray.push(Object.assign(result[i].dataValues,{todoList :[]}))
    }
    console.log(aJsonArray);
    // TODO :: 쿼리를 통해 한번에 처리가능
    result = await models.todolist.findAll({});
    for (let i in result)
    {
      for(let j in aJsonArray){
        if(aJsonArray[j].id === result[i].category_id) {
          aJsonArray[j].todoList.push({
            title : result[i].title,
            date : result[i].date
          })
        }
      }
    }


    // TODO :: DB 에서 year, month 통해 TodoList 조회
    res.json(aJsonArray)
});

module.exports = router;
