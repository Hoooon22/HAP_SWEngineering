window.onload = function(e){
    loadHomework();
    loadAttendance();
    loadSideBar();

    if(userStatus==1)
        document.getElementById("prof_new").remove();
}
var userStatus = document.getElementById("userStatus").innerText; // 교수인지(0), 학생인지(s_Id)

var action="";

var pageName=document.getElementById("pageName"); // 과목명
pageName.innerText = "과목명"; // 과목명 동적으로 넣어주기

// var subjectColor=document.getElementById("subjectColor"); // 과목 색상
// subjectColor.style.background = "blue"; // 과목 색상 동적으로 넣어주기

var created = false;

subjectList = [];
var studentAttend = [];
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

for (let i in attend_count)
{
    studentAttend[i] = {
        subject: subject_value[i],
        s_id: s_id_value[i],
        date: date_value[i],
        num: num_value[i],
        status: status_value[i],
    }
}

var profAttend = [];
var studentList = [];

var prev = document.getElementById("prevBox");
var now = document.getElementById("nowBox");
var next = document.getElementById("nextBox");

boxList=[];
boxList[0]=prev;
boxList[1]=now;
boxList[2]=next;

if(userStatus==0){
    for(var i=0;i<3;i++){
    boxList[i].addEventListener("click",function(e){
        document.getElementById("modal").style.display="flex";
        document.getElementsByClassName("modal_homework")[0].style.display="none";
        document.getElementsByClassName("modal_attend")[0].style.display="flex";
        document.getElementsByClassName("modal_register").style.display = "none";
    });
    }
    loadModalPage();

    var save = document.querySelector(".save");

save.addEventListener("click",saveAttend);
}

var hwList = [];

var sidebar = document.getElementsByClassName("sidebar_button")[0];
var sidebar_page = document.getElementsByClassName("sidebar_page")[0]; 

sidebar.addEventListener('mouseover',function(e){
    sidebar_page.style.display="block"; // 수정
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


var attendance = document.getElementById("attendance");
var toggled = true
attendance.addEventListener("click",toggle);
if(userStatus==0){
var register_button = document.getElementById("prof_new");
register_button.addEventListener("click",function(e){
    document.getElementsByClassName("modal_homework")[0].style.display = "none";
    document.getElementsByClassName("modal_attend")[0].style.display = "none";
    document.getElementsByClassName("modal_register")[0].style.display = "flex";
    document.getElementById("modal").style.display="flex";
});
}

function toggle(){
    if(!toggled){
        document.getElementById('attendanceToggle').style.display="flex"; 
        toggled = true;
    }
    else{
        document.getElementById('attendanceToggle').style.display= 'none';
        toggled = false; 
    }
}

function checkStatus(s){
    if(s=='출석')
        return "green"
    else if(s=='지각')
        return "orange"
    else
        return "red"
}

function loadAttendance(){    
        if(userStatus == 1) {
            var prevW = document.getElementById("prevWeek");
            var prevC = document.createElement("div");
            prevW.innerHTML = studentAttend[0].date;
            prevC.setAttribute("class","circle");
            prevC.setAttribute("id","studentAttendance");
            prevC.style.backgroundColor=checkStatus(studentAttend[0].status);
            prev.appendChild(prevC);
            prev.append(studentAttend[0].status);
            
            var nowW = document.getElementById("nowWeek");
            var nowC = document.createElement("div");
            nowW.innerHTML = studentAttend[1].date;
            nowC.setAttribute("class","circle");
            nowC.setAttribute("id","studentAttendance");
            nowC.style.width="80px";
            nowC.style.height="80px";
            nowC.style.backgroundColor=checkStatus(studentAttend[1].status);
            now.appendChild(nowC);
            now.append(studentAttend[1].status);

            var nextW = document.getElementById("nextWeek");
            var nextC = document.createElement("div");
            nextW.innerHTML = studentAttend[2].date;
            nextC.setAttribute("class","circle");
            nextC.setAttribute("id","studentAttendance");
            nextC.style.backgroundColor=checkStatus(studentAttend[2].status);
            next.appendChild(nextC);
            next.append(studentAttend[2].status);
        }
    
        else {
            for(var i=0;i<3;i++){
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

function loadHomework(){
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
        var nbsp = "";
        var strlen = hwList[i].title.length;
        for(var cnt = 0 ; cnt < 126 - strlen ; cnt++){
            nbsp += "&nbsp;";
        }
        newTop.innerHTML=imoji[0]+" "+hwList[i].title+nbsp;
        newHwList.appendChild(newTop);
        
        if(userStatus==1) {
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
        
        nbsp="";
        strlen = hwList[i].fileName.length;
        
        for(var cnt = 0 ; cnt < 55 - strlen ; cnt++){
            nbsp += "&nbsp;";
        }
        
        newMid.innerHTML=imoji[1]+" "+ hwList[i].fileName+nbsp+imoji[2]+" "+hwList[i].deadline;
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

function loadSideBar(){
    var newSubject;

    for(var i=0;subjectList.length>i;i++){
        newSubject = document.createElement("button");
        newSubject.setAttribute("class","sidebar_subject");
        newSubject.innerHTML=subjectList[i].name;
        var url = subjectList[i].link;

        newSubject.addEventListener('click',function(e){
            // 링크로 이동하기
            console.log(url);
        });
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