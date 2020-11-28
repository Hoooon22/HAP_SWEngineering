var socket = io()

//connect 되었을 때 실행
socket.on('connect', function() {
  var name = document.getElementById("user_id").innerText
  
  socket.emit('newUser', name)//서버에 새로운 유저가 왔다고 알림
})

//서버로 부터 새로운 데이터
socket.on('update', function(data) {
  var chat = document.getElementById('chat')

  var message = document.createElement('div')
  var node = document.createTextNode(`${data.name}: ${data.message}`)
  var className = ''

  // 타입에 따라 적용할 클래스를 다르게 지정
  switch(data.type) {
    case 'message': //유저 메세지
      className = 'other'
      break

    case 'connect': //접속
      className = 'connect'
      break

    case 'disconnect': //접속 종료
      className = 'disconnect'
      break
  }

  message.classList.add(className) 
  message.appendChild(node) 
  chat.appendChild(message)
})

/* 메시지 전송 함수 */
function send() {// 입력되어있는 데이터 가져오기
  var message = document.getElementById('text_send').value 
  
  // 가져왔으니 데이터 빈칸으로 변경
  document.getElementById('text_send').value = ''

  // 내가 전송할 메시지 클라이언트에게 표시
  var chat = document.getElementById('chat')
  var msg = document.createElement('div')
  var node = document.createTextNode(message)
  msg.classList.add('me')
  msg.appendChild(node)
  chat.appendChild(msg)

  // 서버로 message 이벤트 전달 + 데이터와 함께
  socket.emit('message', {type: 'message', message: message})
}
