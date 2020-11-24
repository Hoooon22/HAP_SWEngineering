var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getCategoryList', function (req, res, next) {
    res.json([
        {
            id : 1,
            name : "데이터통신입문",
            color : "#a81d0d"
        },
        {
            id : 2,
            name : "SW 공학",
            color : "#27245c"
        },
        {
            id : 3,
            name : "객체지향언어",
            color : "#ababab"
        },
        {
            id : 1,
            name : "암호학",
            color : "#000000"
        },
    ])
});

module.exports = router;
