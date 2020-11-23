// # 출석 객체들 애니메이션 효과
window.onload = loadHomework;

var userStatus = document.getElementById("userStatus").innerText; // 교수인지(0), 학생인지(1)

var subjectName= document.getElementById("subjectName_value").innerText; // 과목명 동적으로 넣어주기

var subjectColor=document.getElementById("subjectColor"); // 과목 색상
subjectColor.style.background = document.getElementById("subjectColor_value").innerText; // 과목 색상 동적으로 넣어주기

var created = false;
var attendance = []; // string으로 출석 정보 전달

var prev = document.getElementById("prev");
var now = document.getElementById("now");
var next = document.getElementById("next");

var hwList = [];

// homework instance
var homework1 = { // 과제 정보
    title : "Homework 1",
    deadline: "~2020.12.2 23:59",
    detail : "Homework 1 제출하세요.",
    fileName: "file1",
    submitted: true
}

var homework2 = { // 과제 정보
    title : "Homework 2",
    deadline: "~2020.11.27 23:59",
    detail : "Homework 2 제출하세요.",
    fileName: "file2",
    submitted: false
}

var homework3 = { // 과제 정보
    title : "Homework 3",
    deadline: "~ 2020.12.24 15:00",
    detail : "Homework 3 제출하세요.",
    fileName: "file3",
    submitted: false
}


hwList[0]=homework1;
hwList[1]=homework2;
hwList[2]=homework3;


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

attendance.addEventListener("click",createAttendanceStatus);

function createAttendanceStatus(){
    if(!created){    
        if(userStatus == 1) {
            var prevC = document.createElement("div");
            prevC.setAttribute("class","circle");
            prevC.setAttribute("id","studentAttendance");
        
            var nowC  = document.createElement("div");
            nowC.setAttribute("class","circle");
            nowC.setAttribute("id","studentAttendance");

            var nextC = document.createElement("div");
            nextC.setAttribute("class","circle");
            nextC.setAttribute("id","studentAttendance");
            

            var status = document.getElementById("prevStatus");
            prev.insertBefore(prevC,status);

            var status = document.getElementById("nowStatus");
            now.insertBefore(nowC,status);

            var status = document.getElementById("nextStatus");
            next.insertBefore(nextC,status);
        }
    
        else {
            var prevList = [];
            var nowList = [];
            var nextList = [];
            var status;

            var status = document.getElementById("prevStatus");
            for(var i = 0 ; i < 3 ; i++){
                prevList[i] = document.createElement("div");
                prevList[i].setAttribute("class","circle");
                prevList[i].setAttribute("id","professorAttendance");
                prev.insertBefore(prevList[i],status);
            }

            var status = document.getElementById("nowStatus");
            for(var i = 0 ; i < 3 ; i++){
                nowList[i] = document.createElement("div");
                nowList[i].setAttribute("class","circle");
                nowList[i].setAttribute("id","professorAttendance");
                now.insertBefore(nowList[i],status);
            }

            var status = document.getElementById("nextStatus");
            for(var i = 0 ; i < 3 ; i++){
                nextList[i] = document.createElement("div");
                nextList[i].setAttribute("class","circle");
                nextList[i].setAttribute("id","professorAttendance");
                next.insertBefore(nextList[i],status);
            }
        }
    
    created = true;
    }
}

function loadHomework(){
    var n = hwList.length;
    var botContent = document.getElementById("botContent");
    
    if(n>0){
        botContent.removeChild(document.getElementById("noHw"));
    }

    var newHwList;
    var newTop;
    var newButton;
    var newMid;
    var newBot;
    var imoji = ["&#x1F4CC;","&#x1F4C1","&#x1F4C6;"];

    for( var i = 0 ; i < n ; i++) {
        newHwList = document.createElement("div");
        newHwList.setAttribute("class","hwList");
        botContent.appendChild(newHwList);

        newTop = document.createElement("div");
        newTop.setAttribute("class","top");
        newTop.innerHTML=imoji[0]+hwList[i].title;
        newHwList.appendChild(newTop);
        
        newButton = document.createElement("button");
        newButton.setAttribute("class","submit");
        if(!hwList[i].submitted)
            newButton.innerHTML="제출";
        else
            newButton.innerHTML="수정";
        newTop.appendChild(newButton);

        newMid = document.createElement("div");
        newMid.setAttribute("class","mid");
        newMid.innerHTML=imoji[1]+" "+ hwList[i].fileName+imoji[2]+hwList[i].deadline;
        newHwList.appendChild(newMid);

        newBot = document.createElement("div");
        newBot.setAttribute("class","bot");
        newBot.innerHTML=hwList[i].detail;
        newHwList.appendChild(newBot);
    }
}