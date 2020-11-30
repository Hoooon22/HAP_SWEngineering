var express = require('express');
var router = express.Router();
const sequelize = require("sequelize");
const crypto = require('crypto');
const { Calendar } = require('calendar');
const Op = sequelize.Op;

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
    res.redirect("login");
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

  models.studentattend.create({
    subject: "소공",
    s_id: "2018112081",
    date: "1주차 1강",
    num: "2020-09-01",
    status: "출석",   
  })

  models.studentattend.create({
    subject: "소공",
    s_id: "2018112028",
    date: "1주차 1강",
    num: "2020-09-01",
    status: "출석",   
  })

  models.studentattend.create({
    subject: "소공",
    s_id: "2018112081",
    date: "1주차 2강",
    num: "2020-09-03",
    status: "출석",   
  })

  models.studentattend.create({
    subject: "소공",
    s_id: "2018112028",
    date: "1주차 2강",
    num: "2020-09-03",
    status: "지각",   
  })

  models.studentattend.create({
    subject: "소공",
    s_id: "2018112081",
    date: "2주차 1강",
    num: "2020-09-08",
    status: "결석",   
  })

  models.studentattend.create({
    subject: "소공",
    s_id: "2018112028",
    date: "2주차 1강",
    num: "2020-09-08",
    status: "결석",   
  })

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
    req.session.user_name = result.user_name;
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

// subject
router.get('/subject', async function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id

  let attend = await models.studentattend.findAll({
    where: {
        subject : "소공"
    },
    order: [
      ['date', 'ASC'],
    ],
  });

  let subject_student = await models.user.findAll({
    where: {
      user_subject: {
        [Op.like]: "%" + "소공" + "%",
      },
    },
  })

  models.subject.findOne({
    where: {name : "소공"}
  }).then( result => {
    res.render("subject", {
      posts: result,
      session: session,
      user_id: user_id,
      attends: attend,
      subject_students: subject_student,
    });
  });

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

// material
router.get('/material', function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id
  
  models.material.findAll({
    where: {subject : "소공"}
  }).then( result => {
    res.render("material", {
      materials: result,
      session: session,
      user_id: user_id,
    });
  });
});


module.exports = router;