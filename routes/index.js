var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const { Calendar } = require('calendar');
const sequelize = require("sequelize");
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

// 로그인 GET
router.get('/', async function(req, res, next) {
  let session = req.session;

  res.render("login", {
      session : session,
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
  res.redirect("/");
});

router.get("/logout", function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("/")
})

// subject
router.get('/subject/:name', async function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id

  let attend = await models.studentattend.findAll({
    where: {
        subject : req.params.name,
    },
    order: [
      ['date', 'ASC'],
    ],
  });

  let user_session = await models.user.findOne({
    where:{
      user_id: session.user_id
    }
  })

  models.subject.findOne({
    where: {name : req.params.name}
  }).then( result => {
    res.render("subject", {
      session: session,
      posts: result,
      user_session: user_session,
      user_id: user_id,
      attends: attend,
    });
  });

});

//chat
router.get('/chat/:subject', function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id
  
  models.subject.findOne({
    where: {name : req.params.subject}
  }).then( result => {
    res.render("chat", {
      posts: result,
      session: session,
      user_id: user_id,
    });
  });
})

// material
router.get('/material/:subject', async function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id

  let user_session = await models.user.findOne({
    where:{
      user_id: session.user_id
    }
  })

  let subject = models.subject.findOne({
    where:{
      name: req.params.subject,
    }
  })
  
  models.material.findAll({
    where: {subject : req.params.subject}
  }).then( result => {
    res.render("material", {
      posts: subject,
      materials: result,
      session: session,
      user_id: user_id,
      user_session: user_session,
    });
  });
});


module.exports = router;