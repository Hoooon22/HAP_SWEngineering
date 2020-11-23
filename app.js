var createError = require('http-errors');
const socket = require('socket.io') //socket.io 모듈 
const http = require('http') //node js 기본 내장 모듈 불러오기
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileUploadRouter = require('./routes/upload');
var questionBoardRouter = require('./routes/questionBoard');

const { sequelize } = require('./models');
const session = require('express-session');

var app = express(); //1121토
sequelize.sync();
const server = http.createServer(app) //express http 서버 생성
const io = socket(server) //생성된 서버를 socket.io에 바인딩

//socket
app.io = require('socket.io')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));

//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/static', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public')); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', fileUploadRouter);
app.use('/questionBoard', questionBoardRouter);

app.use('/upload', express.static('uploads'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// DB 연결
const models = require("./models/index.js");

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
});

app.io.on('connection', function(socket) {

  //새로운 유저가 접속했을 경우 다른 소켓에 알려줌
  socket.on('newUser', function(name) {
    console.log(name + ' 님이 접속하였습니다.')

    socket.name = name//소켓에 이름 저장

    //모든 소켓에 전송
    io.sockets.emit('update', {type: 'connect', name: ' >> notice ', message: name + '님이 접속하였습니다.'})
  })

  //전송한 메세지 받기
  socket.on('message', function(data) {
    data.name = socket.name//받은 데이터에 누가 보냈는지 이름 추가
    
    console.log(data)
    socket.broadcast.emit('update', data);//메세지를 보낸 유저를 제외하고 나머지 유저에게 메시지 전송
  })

  //접속 종료
  socket.on('disconnect', function() {
    console.log(socket.name + '님이 나가셨습니다.')

    //접속을 종료한 사람을 제외하고 나머지 유저에게 메시지 전송
    socket.broadcast.emit('update', {type: 'disconnect', name: ' >> notice ', message: socket.name + '님이 나가셨습니다.'});
  })
})

module.exports = app;
