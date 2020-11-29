window.onload=function(e){
    loadData();
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

var categoryList = ["c1","c2"];
var fileList = [];

var f1 = {
    name: "f1",
    category: "c1",
    src: "",
    extension: "hwp"
}

var f2 = {
    name: "f2",
    category: "c1",
    src: "",
    extension:"zip"
}

var f3 = {
    name: "f3",
    category: "c1",
    src: "",
    extension: "ppt"
}

var f4 = {
    name: "f4",
    category: "c1",
    src: "",
    extension: "doc"
}

var f5 = {
    name: "f5",
    category: "c2",
    src: "",
    extension: "doc"
}

var f6 = {
    name: "f6",
    category: "c2",
    src: "",
    extension: "etc"
}

var f7 = {
    name: "f7",
    category: "c2",
    category: "root",
    src: "",
    extension: "docx"
}

var f8 = {
    name: "f8",
    category: "root",
    src: "",
    extension: "pptx"
}

var f9 = {
    name: "f9",
    category: "root",
    src: "",
    extension: "zip"

}

fileList[0] = f1;
fileList[1] = f2;
fileList[2] = f3;
fileList[3] = f4;
fileList[4] = f5;
fileList[5] = f6;
fileList[6] = f7;
fileList[7] = f8;
fileList[8] = f9;



var path = "root";

var userStatus = 0; // 교수인지(0), 학생인지(1)

var subjectName=document.getElementById("subjectName"); // 과목명
subjectName.innerText = "과목명"+"학습 자료실"; // 과목명 동적으로 넣어주기


var subjectColor=document.getElementById("subjectColor"); // 과목 색상
subjectColor.style.background = "blue"; // 과목 색상 동적으로 넣어주기

var modal_close = document.getElementsByClassName("close")[0];
modal_close.addEventListener("click",popOff);

var add_category = document.getElementById("add");
add_category.addEventListener("click",popUp);

var modal_add_button = document.getElementById("modal_add_button");
modal_add_button.addEventListener("click",addCategory);

var modal_back_button = document.getElementById("modal_");

var goBack = document.getElementById("back");
goBack.addEventListener("click",move_back);

function popUp(){
    document.getElementById("modal").style.display="flex";
}

function popOff(){
    document.getElementById("modal").style.display="none";
}

function addCategory(){
    categoryList.push(document.getElementsyId("modal_add_name").value);
}

function loadData(){
    var container = document.getElementById("container");
    var back = document.getElementById("back");

     if(categoryList!=null) {
        for(var i = 0 ; i < categoryList.length ; i++){
            var newBox = document.createElement("button");
            newBox.setAttribute("class","box category");
            var newBlock = document.createElement("div");
            newBlock.setAttribute("class","block");
            var newTab = document.createElement("div");
            newTab.setAttribute("class","table");
            
            var newName = document.createElement("div");
            newName.setAttribute("class","name");
            newName.innerHTML = categoryList[i];

            newBox.setAttribute("name",categoryList[i]);
            newBlock.appendChild(newTab);
            newBox.appendChild(newBlock);
            newBox.appendChild(newName);
            container.insertBefore(newBox,back);
            
        }

        for(var i=0; i < fileList.length ; i++){
           if(fileList[i].category=="root") {
            var newBox = document.createElement("div");
            newBox.setAttribute("class","box");
            
            var newBlock = document.createElement("img");
            newBlock.setAttribute("class","imgbox");
            newBlock.setAttribute("src",checkExtension(fileList[i].extension,"root"));
            
            var newName = document.createElement("div");
            newName.setAttribute("class","name");
            newName.innerHTML = fileList[i].name;
            
            newBox.appendChild(newBlock);
            newBox.appendChild(newName);
            container.insertBefore(newBox,back);
           }

           else {
                var categ = fileList[i].category;

                var newQuarter = document.createElement("img");
                newQuarter.setAttribute("class","quarter");
                newQuarter.setAttribute("src",checkExtension(fileList[i].extension,fileList[i].extension));
                document.getElementsByName(categ)[0].childNodes[0].childNodes[0].appendChild(newQuarter);
           }
        }
     }

     else {
        for(var i=0; i < fileList.length ; i++) {
            var newBox = document.createElement("div");
            newBox.setAttribute("class","box");
            var newBlock = document.createElement("img");
            newBlock.setAttribute("src",checkExtension(fileList[i].extension),"root");
            newBlock.setAttribute("class","block");
            var newName = document.createElement("div");
            newName.setAttribute("class","name");
            newName.innerHTML = fileList[i].name;
            newBox.appendChild(newBlock);
            newBox.appendChild(newName);
            container.insertBefore(newBox,back);
        }
     }
}

function move_to(destination){
    if(destination=="root")
        if(path!=root)
            loadData();
    else{
        console.log("reached");
        var boxList = document.getElementsByClassName("box");
        for(var i = 0 ; i < boxList -2 ; i++ ){
            boxList[i].remove();
        }
    }
}

function checkExtension(extension,path) {
if(path=="root"){
    if(extension == 'doc' || extension == 'docx')
        return "../source/word_big.png";
    

    else if(extension == 'ppt' || extension == 'pptx')
        return "../source/ppt_big.png";
    

    else if(extension == 'hwp')
        return "../source/hwp_big.png";
    

    else if(extension == 'zip')
        return "../source/zip_big.png";
    

    else
        return "../source/file_big.png";
    
}

else{
    if(extension == 'doc' || extension == 'docx')
        return "../source/word.png";
    

    else if(extension == 'ppt' || extension == 'pptx')
        return "../source/ppt.png";
    

    else if(extension == 'hwp')
        return "../source/hwp.png";
    

    else if(extension == 'zip')
        return "../source/zip.png";
    

    else
        return "../source/file.png";
    }
}

function move_back(){
    path = "root";
    move_to("root");
}

function dynamicBinding(){
    var parent = document.getElementsByClassName('block');
}