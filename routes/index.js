var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const { Calendar } = require('calendar');

// model loading
var models = require('../models');

// sign-up
router.get('/signup', function(req, res, next) {
  res.render("signup");
});

router.post("/signup", async function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  let result = models.user.create({
      user_id: body.id,
      user_password: hashPassword,
      user_name : body.name,
      user_job : body.job,
      salt: salt
  })
  .then( result => {
    res.redirect("signup");
  })
  .catch( err => {
    console.log(err)
  })
})

// login
// 메인 페이지
router.get('/', function(req, res, next) {
  res.send('환영합니다~');

  // models.todolist.create({
  //   title: "222",
  //   date_year: 2020,
  //   date_month: 11,
  //   date_day: 17,
  //   category_id: 2,
  //   category_name: "SW 공학",
  //   category_color: "#27245c",
  //   content: "과제2 소공",   
  // })

});

// 로그인 GET
router.get('/login', function(req, res, next) {
  let session = req.session;

  res.render("login", {
      session : session
  });
});

// 로그인 POST
router.post("/login", async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne({
      where: {
          user_id : body.id
      }
  });

  let dbPassword = result.dataValues.user_password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    console.log("비밀번호 일치");
    // 세션 설정
    req.session.user_id = body.id;
  }
  else{
      console.log("비밀번호 불일치");
  }
  res.redirect("login");
});

router.get("/logout", function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("login")
})

// Question
router.get('/subject', function(req, res, next) {
  res.render('subject', { title: 'Subject' });
});

// calendar
router.get('/calendar', function(req, res, next){
  let session = req.session
  let user_id = req.session.user_id
  
  res.render("calendar", {
    session: session,
    user_id: user_id,
  });
})
router.get('/getMonthDays/:year/:month', function(req, res, next) {
  let _year = Number(req.params.year);
  let _month = Number(req.params.month);
  let cal = new Calendar();

  let m = cal.monthDays(_year,_month);

  res.send(m);
});
router.post('/getTodoListFromDate', async function (req, res, next) {
  let date = req.body;
  let {year,month} = date;

  let result = await models.todolist.findAll({});

  var aJsonArray = new Array();
  for (let i in result)
  {
    aJsonArray.push(result[i].dataValues)
  }
  console.log(aJsonArray)

  // TODO :: DB 에서 year, month 통해 TodoList 조회
  res.json(aJsonArray)

});

//chat
router.get('/chat', function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id
  
  models.subject.findOne({
    where: {name : "소공"}
  }).then( result => {
    res.render("chat", {
      posts: result,
      session: session,
      user_id: user_id,
    });
  });
})


module.exports = router;