var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getCategoryList', function (req, res, next) {
    res.json([
        {
            id : 1,
            name : "데이터통신입문",
            color : "#a81d0d",
            todoList : [
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                }
            ]
        },
        {
            id : 1,
            name : "데이터통신입문",
            color : "#a81d0d",
            todoList : [
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                }
            ]
        },
        {
            id : 1,
            name : "데이터통신입문",
            color : "#a81d0d",
            todoList : [
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                }
            ]
        },
        {
            id : 1,
            name : "데이터통신입문",
            color : "#a81d0d",
            todoList : [
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                }
            ]
        },
        {
            id : 2,
            name : "SW 공학",
            color : "#27245c",
            todoList : [
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                }
            ]
        },
        {
            id : 3,
            name : "객체지향언어",
            color : "#ababab",
            todoList : [
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                }
            ]
        },
        {
            id : 1,
            name : "암호학",
            color : "#000000",
            todoList : [
                {
                    title : "과제1",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제2",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                },
                {
                    title : "과제3",
                    date: {
                        year: 2020,
                        month: 11,
                        day: 8
                    },
                    content: "암호학입니다"
                }
            ]
        },
    ])
});

module.exports = router;
