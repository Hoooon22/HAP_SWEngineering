const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');


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
      salt: salt
  })

  res.redirect("signup");
})

module.exports = router;