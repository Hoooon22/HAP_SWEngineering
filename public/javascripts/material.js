window.onload=function(e){
    loadMaterial();
    dynamicBinding();
    
    user_subject = document.getElementById("user_subject").innerText;
user_subject = user_subject.split(',');
subjectList = user_subject;


var sidebar = document.getElementsByClassName("sidebar_button")[0];
var sidebar_page = document.getElementsByClassName("sidebar_page")[0]; 
loadSideBar(subjectList);


    var uploadFile = document.getElementById("uploadImg");
    uploadFile.addEventListener("click",function(e) { // 사진 넣으면 사진 뜨기
        var input = document.createElement("input");
        input.setAttribute("type","file");
        input.setAttribute("name","imgFile");
        input.setAttribute("style","display: none;");
        uploadFile.parentElement.appendChild(input);
        input.click();
        input.addEventListener("change",function(e){
            input.parentElement.style.background="yellow";
        })
    });


    if(userStatus != 0) {
        document.getElementById("add").style.display="none";
    }
}

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

var materialList = [];

var m1 = {
    name: "부교재",
    maxNum: 3,
    num: 3
}

var m2 = {
    name: "아두이노",
    maxNum: 5,
    num: 3
}

var m3 = {
    name: "모니터",
    maxNum: 2,
    num: 1
}

var m4 = {
    name: "라즈베리 파이",
    maxNum: 1,
    num: 1
}

materialList[0]=m1;
materialList[1]=m2;
materialList[2]=m3;
materialList[3]=m4;

var userStatus = 0; // 교수인지(0), 학생인지(1)

// var subjectName=document.getElementById("subjectName"); // 과목명
// subjectName.innerText = "과목명"+"기자재 요청"; // 과목명 동적으로 넣어주기


// var subjectColor=document.getElementById("subjectColor"); // 과목 색상
// subjectColor.style.background = "blue"; // 과목 색상 동적으로 넣어주기

var add = document.getElementById("add");
add.addEventListener("click",function(e){
    document.getElementsByClassName("modal_prof")[0].style.display="flex";
    document.getElementsByClassName("modal_content")[0].style.display="none";
    popUp();
});
closeButton_add =document.getElementsByClassName("close")[1];
closeButton_add.addEventListener("click",popOff);
var registerButton = document.getElementById("register_button");
registerButton.addEventListener("click",submit);

var closeButton_obj = document.getElementsByClassName("close")[0];
closeButton_obj.addEventListener("click",popOff);

function loadMaterial(){
    var container = document.getElementById("container");
    var add = document.getElementById("add");
    var newBox;
    var newBlock;
    var newImg;
    var newName;

    for(var i = 0 ; i < materialList.length ; i++){
        newBox = document.createElement("div");
        newBox.setAttribute("class","box");
        container.insertBefore(newBox,add);

        newBlock = document.createElement("button");
        newBlock.setAttribute("class","block");
        newImg = document.createElement("img");
        newImg.setAttribute("src","../upload/material/"+materialList[i].name+".png");
        newImg.setAttribute("class","image");
        newBlock.appendChild(newImg);
        newBox.appendChild(newBlock);

        newName = document.createElement("div");
        newName.setAttribute("class","name");

        newName.innerHTML = materialList[i].name;
        newBox.appendChild(newName);        
    }
}

function popUp(){
    document.getElementById("modal").style.display="flex";
    document.getElementById("modal").style.justifyContent = "center";
    document.getElementById("modal").style.alignItems = "center";
}

function popOff(){
    document.getElementById("modal").style.display="none";
}

function submit(){
        var isFull = false; 
        
        // isFull 검사(이미지 제외)

        if(!isFull){
            var newBox = document.createElement("div");
            var newBlock = document.createElement("button");
            var newImg = document.createElement("img");
            var newName = document.createElement("div");
            newBox.setAttribute("class","box");
            newBlock.setAttribute("class","block");
            newImg.setAttribute("class","iamge");
            newImg.setAttribute("src",""); // 이미지 넣기
            newName.setAttribute("class","name");

            var container = document.getElementById("container");
            newBlock.appendChild(newImg);
            newBox.appendChild(newBlock);
            newBox.appendChild(newName);
            container.insertBefore(newBox,add);
            console.log("done");
        }

        else{
            alert("alert");
        }
}

function rentMaterial(){

}

function registerMaterial(){

}

function dynamicBinding(){
    var parent = document.getElementsByClassName('block');
    var child = document.getElementsByClassName('image');

    for(var i = 0 ; i < parent.length-1 ; i++){
        parent[i].addEventListener('click',function(e){
            var name = e.target.parentElement.getElementsByClassName("name")[0].innerText;
            var num;
            var maxNum;

            document.getElementsByClassName("student_modal_name")[0].innerHTML = name;
            
            for(var j=0;j<materialList.length;j++){
                if(name == materialList[j].name) {
                    num = String(materialList[j].num);
                    maxNum = String(materialList[j].maxNum);
                    break;
                }
            }
            
            document.getElementsByClassName("student_modal_number")[0].innerHTML= num + " / " + maxNum;
            
            document.getElementsByClassName("modal_content")[0].style.display = "flex";
            document.getElementsByClassName("modal_prof")[0].style.display = "none";
            popUp();
        })

        child[i].addEventListener('click',function(e){
            var name = e.target.parentElement.parentElement.getElementsByClassName("name")[0].innerText;
            var num;
            var maxNum;

            document.getElementsByClassName("student_modal_name")[0].innerHTML = name;
            for(var j=0;j<materialList.length;j++){
                if(name == materialList[j].name) {
                    num = String(materialList[j].num);
                    maxNum = String(materialList[j].maxNum);
                    break;
                }
            }
            document.getElementsByClassName("student_modal_number")[0].placeholder = "최대 수량: " + maxNum + "개";

            
            document.getElementsByClassName("student_modal_number")[0].innerHTML= num + " / " + maxNum;
            
            document.getElementsByClassName("modal_content")[0].style.display = "flex";
            document.getElementsByClassName("modal_prof")[0].style.display = "none";
            popUp();
        })
    }
}

function loadSideBar(subjectList){
    var newSubject;
    var sidebar = document.getElementsByClassName("sidebar_button")[0];
    var sidebar_page = document.getElementsByClassName("sidebar_page")[0]; 

    for(var i=0;subjectList.length>i;i++){
        newSubject = document.createElement("button");
        newSubject.setAttribute("class","sidebar_subject");
        newSubject.innerHTML=subjectList[i];
        var url = subjectList[i];

        newSubject.addEventListener('click',function(e){
            // 링크로 이동하기
        });

        sidebar_page.appendChild(newSubject);
    }   
}