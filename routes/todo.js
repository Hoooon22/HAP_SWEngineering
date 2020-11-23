var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/getTodoListFromDate', function (req, res, next) {
    let date = req.body;
    let {year, month} = date;

    // TODO :: DB 에서 year, month 통해 TodoList 조회
    res.json(
        [
            {
                title: "과제 1",
                date: {
                    year: 2020,
                    month: 11,
                    day: 2
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
                    day: 17
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

router.post('/addTodoList', function (req, res, next) {
    //AddTodoList data 가 넘어옴

    console.log(req.body);
});


module.exports = router;
