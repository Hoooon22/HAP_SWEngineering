var express = require('express');
const { Calendar } = require('calendar');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id
  
  models.subject.findAll({
  }).then( result => {
    res.render("calendar", {
      posts: result,
      session: session,
      user_id: user_id
    });
  });
});

router.get('/getMonthDays/:year/:month', function(req, res, next) {
  let _year = Number(req.params.year);
  let _month = Number(req.params.month);
  let cal = new Calendar();

  let m = cal.monthDays(_year,_month-1);

  res.send(m);
});

router.post("/", async function(req,res,next){
  let body = req.body;
  let session = req.session;

  let result = models.todolist.create({
      title: body.title,
      date: body.date,
      
      //category_id : ,
      category_name: body.category,
      content : body.content,
      user_id : session.user_id,
  })
  .then( result => {
    res.redirect("calendar");
  })
  .catch( err => {
    console.log(err)
  })
})

module.exports = router;
