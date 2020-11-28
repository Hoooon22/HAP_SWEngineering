var express = require('express');
var router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

var models = require('../models');

/* GET questionBoard listing. */
// 과목, qboard
router.get('/', async function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id

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

  res.render("questionBoard", {
    subject: subject,
    qboards: qboard,
  })
});

router.post("/", async function(req, res, next){
  let body = req.body;

  let result = models.qboard.create({
    title: body.title,
    content: body.content,
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

router.get('/read', function(req, res, next) {
  res.render("read");
});

module.exports = router;
