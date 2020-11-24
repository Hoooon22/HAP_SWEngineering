var express = require('express');
const { Calendar } = require('calendar');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('calendar', { title: 'Express' });
});

router.get('/getMonthDays/:year/:month', function(req, res, next) {
  let _year = Number(req.params.year);
  let _month = Number(req.params.month);
  let cal = new Calendar();

  let m = cal.monthDays(_year,_month-1);

  res.send(m);
});

module.exports = router;
