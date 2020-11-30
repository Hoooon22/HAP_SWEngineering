var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/getCategoryList', async function (req, res, next) {
  let session = req.session;
  
  let subjects = await models.subject.findAll({  });

  let todolists = await models.todolist.findAll({
      where:{
        user_id: session.user_id,
      }
    });

    var aJsonArray = new Array();
    for (let i in subjects)
    {
      for (let j in todolists)
      {
        if (subjects[j].name == todolists[i].category_name)
        {         
          aJsonArray.push(subjects[i].dataValues);
          aJsonArray.subjects[i].push(todolists[j].dataValues);
          break;
        }
      }
    }
    console.log("dfsfsdfsdfsdfsdfsdfsdfsdf")
    console.log(aJsonArray)
  
    // TODO :: DB 에서 year, month 통해 TodoList 조회
    res.json(aJsonArray)
});

module.exports = router;
