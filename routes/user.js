var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/whoAmI', function(req, res, next) {
  res.json({
    name : "hk"
  })
});

module.exports = router;
