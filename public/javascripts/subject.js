// # 출석 객체들 애니메이션 효과
// # 모달창 생성

var userStatus = document.getElementById("user_id").innerText; // 교수인지(0), 학생인지(1)

var subjectColor=document.getElementById("subjectColor"); // 과목 색상
subjectColor.style.background = "blue"; // 과목 색상 동적으로 넣어주기

var attendance = []; // string으로 출석 정보 전달 => ★string은 어떤 형태로?

var prev = document.getElementById("prev");
var now = document.getElementById("now");
var next = document.getElementById("next");

var homework = { // 과제 정보 => ★ 과제에 들어갈 건 이게 다인가??, 이거 준경누나랑 todolist맞추면 좋을거같음
    title : "Homework 1",
    deadline: "2020.12.2",
    detail : "Homework 1 제출하세요."
    // 첨부파일은 어떻게 해야되지?
}

var attendance = document.getElementById("attendance");
var toggled = false
attendance.addEventListener("click",toggle);

function toggle(){
    if(!toggled){
        document.getElementById('attendanceToggle').style.display="block"; 
        toggled = true;
    }
    else{
        document.getElementById('attendanceToggle').style.display= 'none';
        toggled = false; 
    }
}

document.addEventListener("load",updateAttendanceStatus);

function updateAttendanceStatus(){
    if(userStatus == 1) {
        var prevC = document.createELement("div");
        prevC.setAtttribute("class","circle");
        var nowC  = document.createElement("div");
        nowC.setAtttribute("class","circle");
        var nextC = document.createElement("div");
        nextC.setAtttribute("class","circle");

        prev.insertBefore(prevC,prevS);
        now.insertBefore(nowC,nowS);
        next.insertBefore(nextC,nextS);
        
    }
    
    else {

    }
}