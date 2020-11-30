var express = require('express');
var router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

var models = require('../models');

/* GET questionBoard listing. */
// 과목, qboard
router.get('/', async function(req, res, next) {
  let session = req.session

  let subject = await models.subject.findOne({
    where: {
      name: "소공"
    }
  })
  let qboard = await models.qboard.findAll({
    where: {
      subject : "소공"
    }
  })
  let user = await models.user.findAll({  })

  res.render("questionBoard", {
    seesion: session,
    subject: subject,
    qboards: qboard,
    users: user,
  })
});

router.post("/", async function(req, res, next){
  let session = req.session;
  let body = req.body;

  let result = models.qboard.create({
    title: body.title,
    content: body.content,
    regdate: body.date,
    reply: 0,
    subject: "소공",
    u_id: session.user_id,
})
.then( result => {
  res.redirect("questionBoard");
})
.catch( err => {
  console.log(err)
})
})

router.get('/read/:subject/:title', async function(req, res, next) {
  let session = req.session;

  let subject = await models.subject.findOne({
    where: {
      name: req.params.subject,
    }
  })

  let qboard = await models.qboard.findOne({
    where: {
      title: req.params.title,
    }
  })

  let qreply = await models.qreply.findAll({
    where: {
      qnum: qboard.id,
    }
  })

  let user = await models.user.findAll({  })

  res.render("questionBoard/read", {
    subject: subject,
    qboard: qboard,
    qreplies: qreply,
    users: user,
  })
});

// 질문 삭제
router.post("/read/questionDelete", async function(req, res, next){
  let session = req.session;
  let body = req.body;

  await models.qboard.destroy({
    where:{
      title: body.title,
      u_id: session.user_id, 
    }})

    res.redirect("/questionBoard")
})

// 질문 수정
router.post("/read/questionModify", async function(req, res, next){
  let session = req.session;
  let body = req.body;

  models.sequelize.query(query, { replacements: values })

  await models.qboard.update(
    {    
      title: body.title,
      content: body.content
    },
    {where:{
      title: body.pre_title,
      u_id: session.user_id,
    }})

    res.redirect("/questionBoard")  
  })

// 답글 추가
router.post("/read/createReply", async function(req, res, next){
    let session = req.session;
    let body = req.body;

    let qboard = await models.qboard.findOne({
      where:{
        id: body.q_id,
      }
    })
  
    let result = await models.qreply.create({
      content: body.qreply_content,
      qnum: body.q_id,
      u_id: session.user_id,
    })
  
  res.redirect("/questionBoard/read/"+qboard.subject+"/"+qboard.title);
})


module.exports = router;
