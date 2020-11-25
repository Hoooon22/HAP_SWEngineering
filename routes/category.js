var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/getCategoryList', async function (req, res, next) {
    let result = await models.subject.findAll({});

    var aJsonArray = new Array();
    for (let i in result)
    {
      aJsonArray.push(result[i].dataValues)
    }
    console.log(aJsonArray)
  
    // TODO :: DB 에서 year, month 통해 TodoList 조회
    res.json(aJsonArray)
});

module.exports = router;
