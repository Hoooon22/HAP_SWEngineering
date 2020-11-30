var express = require('express');
var router = express.Router();

// model loading
var models = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id

  let subject = await models.subject.findAll({})

  res.render("board", {
    session: session,
    user_id: user_id,
    subjects: subject,
  });
});

module.exports = router;
