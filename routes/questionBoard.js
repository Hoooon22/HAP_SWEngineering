//table의 글 제목 클릭 시
//데이터베이스 내용 불러와서
//read.html 형식으로 데이터베이스 내용 출력

//writeform.html
//등록 버튼 클릭시
//데이터베이스에 입력한 내용을 저장
//저장된 후, read.html형식으로 데이터 베이스 내용 출력
//취소 버튼 클릭 시
//게시판 목록, 즉 questionBoard.html로 이동


//upadateform.html
//수정 버튼 클릭시
//데이터베이스에 수정된 내용으로 업데이트
//+업데이트 완료된 상태의 read.html형식으로 데이터베이스 내용 출력
//취소 버튼 클릭시
//아무런 변화 없이, 해당 게시글로(read.html의 수정버튼 클릭하기 전 페이지) 이동

var express = require('express');
var router = express.Router();

module.exports = router;

var express = require('express');
var router = express.Router();
var db_questionBoard = require('../models');

/* GET questionBoard listing. */
router.get('/', function(req, res, next) {
  res.render('questionBoard', { "title" : '게시판' });
});

router.get('/write', function (req, res, next) {
  res.render('questionBoard/writeform', { "title" : "글쓰기" });
});

router.post('/write', function (req, res, next) {
  console.log('req.body', req.body);

  var title = req.body.title;
  var content = req.body.content;
  var passwd = req.body.passwd;

  var datas = [title, content, passwd];
  db_questionBoard.write(datas, function (success) {

    if (!success)
      res.end('<head><meta charset="UTF-8">' +
               '<script>alert("에러가 발생하여 되돌아갑니다.");history.back();</script> </head>');
    else {
      res.redirect('questionBoard');
    }
  });
});

router.get('/:page', function (req, res, next) {
  var page = req.params.page;
  page = parseInt(page, 10);

  console.log(page);
  db_questionBoard.questionBoard(page, function (datas) {
    res.render('questionBoard', datas);
  });
});


router.get('/write300', function (req, res) {

  for (var i = 1; i <=300; i++) {
    var title = i + "번째 글 입니다.";
    var content = i * Math.floor(200 * Math.random());
    var passwd = '1234';
    var datas = [title, content, passwd];

    db_questionBoard.write(datas, function (success) {

    });
  }

  res.send('<head><meta charset="utf-8"></head><script>alert("300개의 글이 생성되었습니다."></script>');
});

router.get('/read/:page/:num', function (req, res, next) {
  var page = req.params.page;
  var num = req.params.num;

  db_questionBoard.read(num, function (data) {
    res.render('questionBoard/read', {"title" : "글 읽기", "data" : data, "page" : page});
  });
});

router.get('/update/:page/:num', function (req, res, next) {
  var page = req.params.page;
  var num = req.params.num;

  db_questionBoard.updateform(num, function (data) {
    res.render('questionBoard/updateform', {"title" : "수정하기", "data" : data, "page" : page});
  });
});

router.post('/update', function (req, res, next) {
  var page = req.body.page;
  var datas = [req.body.title, req.body.content, req.body.num, req.body.passwd];

  db_questionBoard.update(datas, function (data) {
    res.redirect('/questionBoard/list/' + page);  })
});

router.post('/delete', function (req, res, next) {
  console.log('req.body', req.body);
  var num = req.body.num;
  var page = req.body.page;
  var passwd = req.body.passwd;

  var datas = [num, passwd];

  db_questionBoard.delete(datas, function (data) {
    //res.json({result : data});
    if (data){
      res.redirect('/questionBoard/list/'+page);
    } else {
      res.end('<head><meta charset="utf-8"><script>alert("비밀번호가 틀려서 되돌아갑니다.");history.back();</script></head>');
    }
  });
});

module.exports = router;
