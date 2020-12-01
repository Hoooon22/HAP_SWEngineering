// var attendance = document.getElementById("attendanceToggle");

// attendance.addEventListener("click",toggle);

window.onload = function(e){
var userStatus = document.getElementById("userStatus").innerText; // 교수인지(0), 학생인지(s_Id)
var hwList = [];

var subjectName = document.getElementById("subjectName").innerText;

var material = document.getElementById("material").href +="/"+subjectName;
var dataRoom = document.getElementById("dataRoom").href +="/"+subjectName;
var questionBoard = document.getElementById("question").href += "/"+subjectName;

var h1 = {
    title:"10장 연습 문제",
    fileName: "소프트웨어 공학 개론 연습문제_10장.docx",
    deadline: "~2020/12/3 23:59",
    detail: "10장 연습문제 짝수번을 풀고 제출해주세요."
}

var h2 = {
    title:"테스트 케이스 작성",
    fileName: "test_case.hwp",
    deadline: "~2020/12/5 23:59",
    detail: "진행 중인 프로젝트의 테스트 케이스를 작성하여 제출해주세요."
}

var h3 = {
    title:"코딩",
    fileName:"null",
    deadline:"~2020/12/1 23:59",
    detail: "프로젝트 코딩을 완료 하고 코딩을 제출하여 주세요."
}

hwList[0] = h3;
hwList[1] = h1;
hwList[2] = h2;

var prev = document.getElementById("prevBox");
var now = document.getElementById("nowBox");
var next = document.getElementById("nextBox");

var boxList=[];
boxList[0]=prev;
boxList[1]=now;
boxList[2]=next;

if(userStatus!='0')
    document.getElementsByClassName("register_button")[0].remove();
    
var action="";

// var subjectColor=document.getElementById("subjectColor"); // 과목 색상
// subjectColor.style.background = "blue"; // 과목 색상 동적으로 넣어주기

var created = false;

var subjectList = [];
var studentAttend = [];

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();

attend_count = document.getElementById("attend_count").innerText;
subject_value = document.getElementById("subject_value").innerText;
subject_value = subject_value.split(',');
s_id_value = document.getElementById("s_id_value").innerText;
s_id_value = s_id_value.split(',');
date_value = document.getElementById("date_value").innerText;
date_value = date_value.split(',');
num_value = document.getElementById("num_value").innerText;
num_value = num_value.split(',');
status_value = document.getElementById("status_value").innerText;
status_value = status_value.split(',');
// subject_students = document.getElementById("subject_students").innerText;
// subject_students = subject_students.split(',');

attend_count = parseInt(attend_count)+1;

for (var i = 0 ;  i < attend_count ; i ++)
{
    studentAttend[i] = {
        subject: subject_value[i],
        s_id: s_id_value[i],
        date: date_value[i],
        num: num_value[i],
        status: status_value[i],
    };
}

// 로그인 유저의 과목
user_subject = document.getElementById("user_subject").innerText;
user_subject = user_subject.split(',');
subjectList = user_subject;


var sidebar = document.getElementsByClassName("sidebar_button")[0];
var sidebar_page = document.getElementsByClassName("sidebar_page")[0]; 
loadSideBar(subjectList);

var userAttend = [];
var rangedAttend = [];
var attendList= [];

var profAttend = [{
    date: String,
    status: String
},
{
    date: String,
    status: String
},
{
    date: String,
    status: String
}];

var statusList = [];// 교수용, 출결 정보 저장
var weekList = [];

if(userStatus == '0') {
    for(var i = 0 ; i < attend_count ; i++) { // 범위 안의 전체 학생 출석 값 추출
        if(checkDate(studentAttend[i].num , year , month , day))
            rangedAttend.push(studentAttend[i]);
    }

    for( var i = 0 ; i < rangedAttend.length ; i++){ // 범위 안의 주차 추가

        for(var j = 0 ; j <= weekList.length ; j++){
            if(!weekList.includes(rangedAttend[i].date)){
                weekList.push(rangedAttend[i].date);
            }
        }
    }

    for( var i = 0 ; i < weekList.length ; i++) { // statusList 초기화
        statusList[i]= {
            attend : 0,
            late : 0,
            absent: 0
        };
    }

    console.log(weekList);
    console.log(rangedAttend);

    for(var i = 0 ; i < weekList.length ; i++) { // statusList 값 입력
        for(var j = 0 ; j < rangedAttend.length ; j++) {
            if(rangedAttend[j].date != weekList[i])
                continue;
            else {
                if (rangedAttend[j].status == '출석')
                    statusList[i].attend++;
                else if(rangedAttend[j].status == '지각')
                    statusList[i].late++;
                else if(rangedAttend[j].status == '결석')
                    statusList[i].absent++;
            }
        }
    }


    profAttend[0].date = weekList[weekList.length-2];
    profAttend[0].status = String(statusList[statusList.length-2].attend)+"|"+String(statusList[statusList.length-2].late)+"|"+String(statusList[statusList.length-2].absent);
    profAttend[1].date = weekList[weekList.length-1];
    profAttend[1].status = String(statusList[statusList.length-1].attend)+"|"+String(statusList[statusList.length-1].late)+"|"+String(statusList[statusList.length-1].absent);
    
    if(profAttend[1].date!="15주차 2강"){
        var num = 0;
        for(var i = 0 ; i < date_value.length ; i++){
            if(date_value[i]==weekList[weekList.length-1])
                num = i;
        }
        var l = 0;
        var a = 0;
        var ab = 0;

        for(var i = 0 ; i < rangedAttend.length ; i++){
            if(rangedAttend[i].date==date_value[num]){
                if (rangedAttend[i].status == '출석')
                    a++;
                else if(rangedAttend[i].status == '지각')
                    l++;
                else if(rangedAttend[i].status == '결석')
                    ab++;
            }
        }
        profAttend[2].date = date_value[num];
        profAttend[2].status = String(a)+"|"+String(l)+"|"+String(ab);
        console.log(profAttend[2]);
    }
}

else {
    for (var i = 0; i < attend_count ; i++) { // 전체 학생 출석 값에서 본인의 출석만 추출
        if(studentAttend[i].s_id==userStatus)
            userAttend.push(studentAttend[i]);
    }

    for (var i = 0 ; i < userAttend.length ; i++) { // 전체 출석 값에서 당일 기준 출석만 추출
        if(checkDate(userAttend[i].num,year,month,day)) 
            rangedAttend.push(userAttend[i]);
    }

    attendList[0] = rangedAttend[rangedAttend.length-2]; // 범위 안의 출석 값 중 prev 선정
    attendList[1] = rangedAttend[rangedAttend.length-1]; // 범위 안의 출석 값 중 now  선정
    if(attendList[1].date=="15주차 2강")
    document.getElementById("next").style.display="none";
    
    if(attendList[1].date[0]=='0'){ // 1 ~9 주차
       if(attendList[1].date[1]=='9') { // 9주차 
          if(attendList[1].date[5]=='2') // 2강 일때
             for(var i = 0 ; i < userAttend.length ; i++){
                 if(userAttend[i].date[0]=='1' && userAttend[i].date[1]=='0')
                   if(userAttend[i].date[5]=='1')
                    attendList[2]=userAttend[i];
             }
          else {
            for(var i = 0 ; i < userAttend.length ; i++){
                if(userAttend[i].date[1]=='9')
                  if(userAttend[i].date[5]=='2')
                   attendList[2]=userAttend[i];
            }
          }
       }
       else { // 1 ~ 8 주차
          if(attendList[1].date[5]=='1'){
            for(var i = 0 ; i < userAttend.length ; i++){
                if(userAttend[i].date[1]==attendList[1].date[1])
                  if(userAttend[i].date[5]=='2')
                   attendList[2]=userAttend[i];
            }
          }
          
          else{
            for(var i = 0 ; i < userAttend.length ; i++){
                if(userAttend[i].date[1]==String(parseInt(userAttend[1].date[1])+1))
                  if(userAttend[i].date[5]=='1')
                   attendList[2]=userAttend[i];
            }
          }
       }
    }
    else if(attendList[1].date[0]=='1'){ // 10 ~ 15주차 
      if(attendList[1].date[5]=='1'){
          for(var i = 0 ; i < userAttend.length ; i++){
            if(userAttend[i].date[0]==attendList[1].date[0] && userAttend[i].date[1]==attendList[1].date[1])
              if(userAttend[i].date[5]=='2')
                 attendList[2]=userAttend[i];
        }
      }
      else {
        for(var i = 0 ; i < userAttend.length ; i++){
            if(userAttend[i].date[0]==attendList[1].date[0] && userAttend[i].date[1]==String(parseInt(attendList[1].date[1])+1))
              if(userAttend[i].date[5]=='2')
                 attendList[2]=userAttend[i];
        }
      }
    }
}

var studentList = [];

// var prev = document.getElementById("prevBox");
// var now = document.getElementById("nowBox");
// var next = document.getElementById("nextBox");

// var boxList=[];
// boxList[0]=prev;
// boxList[1]=now;
// boxList[2]=next;

if(userStatus=='0'){
    for(var i=0;i<3;i++){
    boxList[i].addEventListener("click",function(e){
        document.getElementById("modal").style.display="flex";
        document.getElementsByClassName("modal_homework")[0].style.display="none";
        document.getElementsByClassName("modal_attend")[0].style.display="flex";
        document.getElementsByClassName("modal_register").style.display = "none";
    });
    }
    loadModalPage();

//     var save = document.querySelector(".save");

// save.addEventListener("click",saveAttend);
}


var sidebar = document.getElementsByClassName("sidebar_button")[0];
var sidebar_page = document.getElementsByClassName("sidebar_page")[0]; 

sidebar.addEventListener('mouseover',function(e){
    sidebar_page.style.display="flex"; // 수정
    sidebar.style.display = "none";
});

sidebar_page.addEventListener('mouseleave',function(e){
    sidebar_page.style.display="none";
    sidebar.style.display="flex";
})

var close = document.getElementsByClassName("close");

for(var i=0;close.length>i;i++){
    close[i].addEventListener('click',function(e){
        document.getElementById("modal").style.display="none";
    })
}

if(userStatus=='0'){
var register_button = document.getElementById("prof_new");
register_button.addEventListener("click",function(e){
    document.getElementsByClassName("modal_homework")[0].style.display = "none";
    document.getElementsByClassName("modal_attend")[0].style.display = "none";
    document.getElementsByClassName("modal_register")[0].style.display = "flex";
    document.getElementById("modal").style.display="flex";
});
    }
        
        loadHomework(hwList);
        loadAttendance(attendList);
 }


var attendance = document.getElementById("attendance");
attendance.addEventListener("click",toggle);

function toggle(){
    if(document.getElementById('attendanceToggle').style.display=="none")
        document.getElementById('attendanceToggle').style.display="flex"; 
    
    else
        document.getElementById('attendanceToggle').style.display= 'none';
}

function checkStatus(s){
    if(s=='출석')
        return "green"
    else if(s=='지각')
        return "orange"
    else
        return "red"
}

function loadAttendance(attendList){   
var prev = document.getElementById("prevBox");
var now = document.getElementById("nowBox");
var next = document.getElementById("nextBox"); 

        if(userStatus != '0') {
            if(attendList[0]!=null) {
            var prevW = document.getElementById("prevWeek");
            var prevC = document.createElement("div");
            prevW.innerHTML = attendList[0].date;
            prevC.setAttribute("class","circle");
            prevC.setAttribute("id","studentAttendance");
            prevC.style.backgroundColor=checkStatus(attendList[0].status);
            prev.appendChild(prevC);
            prev.append(attendList[0].status);
            }

            var nowW = document.getElementById("nowWeek");
            var nowC = document.createElement("div");
            nowW.innerHTML = attendList[1].date;
            nowC.setAttribute("class","circle");
            nowC.setAttribute("id","studentAttendance");
            nowC.style.width="80px";
            nowC.style.height="80px";
            nowC.style.backgroundColor=checkStatus(attendList[1].status);
            now.appendChild(nowC);
            now.append(attendList[1].status);

            if(attendList[2]!=null) {
            var nextW = document.getElementById("nextWeek");
            var nextC = document.createElement("div");
            nextW.innerHTML = attendList[2].date;
            nextC.setAttribute("class","circle");
            nextC.setAttribute("id","studentAttendance");
            nextC.style.backgroundColor=checkStatus(attendList[2].status);
            next.appendChild(nextC);
            next.append(attendList[2].status);
            }
        }
    
        else {
            for( var i = 0 ; i < 3 ; i++ ){
                document.querySelectorAll(".box")[i].style.flexDirection="row";
            }

            prev.style.justifyContent="space-around";
            now.style.justifyContent = "space-around";
            next.style.justifyContent="space-around";
            var prevList = [];
            var nowList = [];
            var nextList = [];
            var week;

            week = document.getElementById("prevWeek");
            week.innerHTML = profAttend[0].date;
            week = document.getElementById("nowWeek");
            week.innerHTML = profAttend[1].date;
            week = document.getElementById("nextWeek");
            week.innerHTML = profAttend[2].date;
            

            for(var i = 0 ; i < 3 ; i++){
                prevList[i] = document.createElement("div");
                prevList[i].setAttribute("class","circle");
                prevList[i].setAttribute("id","professorAttendance");
                

                nowList[i] = document.createElement("div");
                nowList[i].setAttribute("class","circle");
                nowList[i].setAttribute("id","professorAttendance");
                nowList[i].style.width="50px";
                nowList[i].style.height = "50px";
                

                nextList[i] = document.createElement("div");
                nextList[i].setAttribute("class","circle");
                nextList[i].setAttribute("id","professorAttendance");
                
                if(i==0){
                    prevList[i].style.backgroundColor="green";
                    nowList[i].style.backgroundColor="green";
                    nextList[i].style.backgroundColor="green";
                }
                else if(i==1){
                    prevList[i].style.backgroundColor="orange";
                    nowList[i].style.backgroundColor="orange";
                    nextList[i].style.backgroundColor="orange";
                }
                else{
                    prevList[i].style.backgroundColor="red";
                    nowList[i].style.backgroundColor="red";
                    nextList[i].style.backgroundColor="red";
                }

                prev.appendChild(prevList[i]);
                now.appendChild(nowList[i]);
                next.appendChild(nextList[i]);
            }
            prev.append(profAttend[0].status);
            now.append(profAttend[1].status);
            next.append(profAttend[2].status);
        }
    
    created = true;
    
}

function loadHomework(hwList){
    var n = hwList.length;
    var botContent = document.getElementById("botContent");
    
    if(n > 0){
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

        newTop.innerHTML=imoji[0]+" "+hwList[i].title;
        newHwList.appendChild(newTop);
        
        if(userStatus!='0') {
            newButton = document.createElement("button");
            newButton.setAttribute("class","submit");
            if(!hwList[i].submitted)
                newButton.innerHTML="제출";
            else
                newButton.innerHTML="수정";
            newButton.addEventListener('click',function(e){
                document.getElementsByClassName("modal_homework")[0].style.display="flex";
                document.getElementsByClassName("modal_attend")[0].style.display="none";
                document.getElementById("modal").style.display= "flex";
            });
            newTop.appendChild(newButton);
        }

        newMid = document.createElement("div");
        newMid.setAttribute("class","mid");
        
        newMid.innerHTML=imoji[1]+" "+ hwList[i].fileName+imoji[2]+" "+hwList[i].deadline;
        newHwList.appendChild(newMid);

        newBot = document.createElement("div");
        newBot.setAttribute("class","bot");
        newBot.innerHTML=hwList[i].detail;
        newHwList.appendChild(newBot);
    }
}

function loadModalPage(){
    var newFrame;
    var newImg;
    var newInfo;
    var newID;
    var newStatus;
    var newBar;
    var newRadio;
    var newForm;
    

    var total = studentList.length;
    var none = 0;
    var attend = 0;
    var late = 0;
    var absent = 0;

    for(var i=0;i<studentList.length;i++){
        if(studentList[i].status=='none')
            none++;
        else if(studentList[i].status=='attend')
            attend++;
        else if(studentList[i].status=='late')
            late++;
        else if(studentList[i].status=='absent')
            absent++;
    }

    document.getElementById("attendance_status").innerHTML = "총원 "+total+"명 / 출석 " +attend+"명 / 결석 "+absent+"명 / 지각 "+late+"명 / 미처리 "+none+"명";

    for(var i=0;i<studentList.length;i++){
        newFrame = document.createElement("div");
        newFrame.setAttribute("class","attendance_frame");
        

        newImg = document.createElement("div");
        newImg.setAttribute("class","img_box");
        newFrame.appendChild(newImg);
        
        newInfo = document.createElement("div");
        newInfo.setAttribute("class",'info_box');

        newID = document.createElement("div");
        newID.setAttribute("class","id_box");
        newID.innerHTML=studentList[i].sId+" "+studentList[i].name;
        newInfo.appendChild(newID);

        newStatus = document.createElement("div");
        newStatus.setAttribute("class","status_box");

        newBar = document.createElement("div");
        newBar.setAttribute("class","bar");

        for(var k = 0;k<3;k++){
            var sBox = document.createElement("div");
            sBox.setAttribute("class","sBox");
            if(k==0)
                sBox.innerHTML = "출석";
            else if(k==1)
                sBox.innerHTML = "지각";
            else if(k==2)
                sBox.innerHTML = '결석';
            newBar.appendChild(sBox);
        }
    
        newStatus.appendChild(newBar);
        newForm = document.createElement("form");
        newForm.setAttribute("class","attend_form");
        newForm.setAttribute("action",action);

        for(var j=0;j<3;j++){
            newRadio=document.createElement("input");
            newRadio.setAttribute("class","status_element");
            newRadio.setAttribute("type","radio");


            if(j == 0){
                newRadio.setAttribute("name","attendance");
                newRadio.setAttribute("value","attend");
                if(studentList[i].status=='attend')
                    newRadio.setAttribute("checked","checked");
            }
            
            else if(j == 2){
                newRadio.setAttribute("name","attendance");
                newRadio.setAttribute("value","absent");
                if(studentList[i].status=='absent')
                    newRadio.setAttribute("checked","checked");
            }
            
            else if(j == 1){
                newRadio.setAttribute("name","attendance");
                newRadio.setAttribute("value","late");
                if(studentList[i].status=='late')
                    newRadio.setAttribute("checked","checked");
            }

            newForm.appendChild(newRadio);
        }
        newStatus.appendChild(newForm);
        newInfo.appendChild(newStatus);
        
        newFrame.appendChild(newInfo);

        document.getElementById("modal_attend_content").appendChild(newFrame);
    }

    var saveButton = document.createElement("input");
    saveButton.setAttribute("type","submit");
    saveButton.setAttribute("class","save");
    saveButton.innerHTML="저장";
    document.getElementById("modal_attend_content").appendChild(saveButton);
    
}

function loadSideBar(subjectList){
    var newSubject;
    var sidebar = document.getElementsByClassName("sidebar_button")[0];
    var sidebar_page = document.getElementsByClassName("sidebar_page")[0]; 

    for(var i=0;subjectList.length>i;i++){
        newSubject = document.createElement("a");
        newSubject.setAttribute("class","sidebar_subject");
        newSubject.innerHTML=subjectList[i];
        var url = "/subject/"+subjectList[i];
        newSubject.setAttribute("href",url);

        sidebar_page.appendChild(newSubject);
    }   
}

function saveAttend(){
    var allChecked=true;
    var checked;
    var close;
    var radioList;
    var formList = document.getElementsByClassName("attend_form");
    
    for(var i=0;formList.length>i;i++) {
        radioList = formList[i].getElementsByTagName("input");
        for(var j=0;radioList.length>j;j++){
            if(radioList[j].checked == true){
                checked = true;
                break;
            }
        }
        if(checked)
            checked = false;
        else{
            allChecked=false;
            break;
        }
    }

    if(!allChecked){
        close = confirm("모든 학생의 출석 정보가 저장되지 않았습니다.\n이대로 출석 정보를 저장하시겠습니까?");
        
        if(close)
            document.getElementById("modal").style.display = "none";
    }
    else
        document.getElementById("modal").style.display = "none";
}

function submitHomework(){
    
}

function registerHomework(){

}

function checkDate(num,year,month,day){

    var dateData = new Date(num);
    
    var tYear = dateData.getFullYear();
    var tMonth = dateData.getMonth()+1;
    var tDay = dateData.getDate();

    if(tYear <= year) { 
        if(tYear==year) {
            if(tMonth <= month) {
                if(tMonth == month) {
                    if(tDay <= day){
                        return true;
                    }
                }

                else
                    return true;
            }
        }

        else
            return true;
    }

        return false;
}
