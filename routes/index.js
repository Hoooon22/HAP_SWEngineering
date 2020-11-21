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
  res.render('calendar', { title: 'Calendar' })
})
router.get('/getMonthDays/:year/:month', function(req, res, next) {
  let _year = Number(req.params.year);
  let _month = Number(req.params.month);
  let cal = new Calendar();

  let m = cal.monthDays(_year,_month);

  res.send(m);
});
router.post('/getTodoListFromDate', function (req, res, next) {
  let date = req.body;
  let {year,month} = date;

  // TODO :: DB 에서 year, month 통해 TodoList 조회
  res.json(
    [
      {
        title: "11",
        date: {
          year: 2020,
          month: 11,
          day: 1
        },
        category: {
          id: 1,
          name: "데이터통신입문",
          color: "#a81d0d"
        },
        content: "과제1 데이터통신"
      },
      {
        title: "222",
        date: {
          year: 2020,
          month: 11,
          day:17 
        },
        category: {
          id: 2,
          name: "SW 공학",
          color: "#27245c"
        },
        content: "과제2 소공"
      },
      {
        title: "44545",
        date: {
          year: 2020,
          month: 11,
          day: 5
        },
        category: {
          id: 3,
          name: "객체지향언어",
          color: "#ababab"
        },
        content: "과제3 객제지향언어입니다"
      },
      {
        title: "4444",
        date: {
          year: 2020,
          month: 11,
          day: 1
        },
        category: {
          id: 1,
          name: "암호학",
          color: "#000000"
        },
        content: "암호학입니다"
      },
      {
        title: "55555",
        date: {
          year: 2020,
          month: 11,
          day: 8
        },
        category: {
          id: 1,
          name: "암호학",
          color: "#9340c7"
        },
        content: "암호학입니다"
      },
      {
        title: "6666666",
        date: {
          year: 2020,
          month: 11,
          day: 10
        },
        category: {
          id: 1,
          name: "암호학",
          color: "#9340c7"
        },
        content: "암호학입니다"
      },
      {
        title: "과제1",
        date: {
          year: 2020,
          month: 11,
          day: 23
        },
        category: {
          id: 1,
          name: "암호학",
          color: "#9340c7"
        },
        content: "암호학입니다"
      },
    ]
  )
});
router.get('/whoAmI', function(req, res, next) {
  res.json({
    name : "hk"
  })
});


module.exports = router;