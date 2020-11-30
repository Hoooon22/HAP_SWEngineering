var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let session = req.session
  let user_id = req.session.user_id

  res.render("board", {
    session: session,
    user_id: user_id,
  });
});

module.exports = router;
