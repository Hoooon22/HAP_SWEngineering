window.onload=function(e){
    user_subject = document.getElementById("user_subject").innerText;
    user_subject = user_subject.split(',');
    subjectList = user_subject;
    
    
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
    loadSideBar(subjectList);
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

var userInfo;
var date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
}

getMonthDays = (_date) => {
    return $.ajax({
        url: `/calendar/getMonthDays/${_date.year}/${_date.month}`,
        method: "GET"
    })
}

setCalendarHeader = (date) => {
    $('.calendar .header .ym').html(`${date.year}년 ${date.month}월`);
}

setCalendarDate = (monthDay) => {
    var html = '';
    for (let i = 0; i < monthDay.length; i++) {
        let row = monthDay[i];
        html += `<div class="box-row ">`;
        for (let j = 0; j < row.length; j++) {
            html += `<div class="box clickable" onclick="floatAddTodoPop(${row[j]})">`;
            html += `<div class="date ${row[j] === 0 ? '' : row[j]}">${row[j] === 0 ? '' : row[j]}</div>`;
            html += `<div class="todo-list"></div>`
            html += `</div>`;
        }
        html += `</div>`;
    }
    $(".date-wrap").html(html);
}

setTodoListOnSchedule = (todoList) => {
    var html = '';
    for (let i = 0; i < todoList.length; i++) {
        console.log(todoList[i]);

        console.log(todoList[i].category_color);
        html += `<button id="todo-btn" onclick="floatAddTodoPop();" style="cursor:pointer">`;
        html += `<div class="todo">`;
        html += `<div class="label" style="background:${todoList[i].category_color}"></div>`;
        html += `<div class="title">${todoList[i].title}</div>`;
        html += `</div>`;
        html += `</button>`;
    }
    $('.schedule .contents').html(html);
}

setTodoListOnCalendar = async (todoList) => {
    for (let i = 0; i < todoList.length; i++) {
        let day = new Date(todoList[i].date).getDate();
        let html = await $(`.${day} + .todo-list`).html();
        if (!html) {
            html = ''
        }
        html += `<button id="todo-btn" onclick="alert('일정이 등록되었습니다.');" style="cursor:pointer">`;
        html += `<div class="todo">`;
        html += `<div class="label" style="background:${todoList[i].category_color}"></div>`;
        html += `<div class="title">${todoList[i].title}</div>`;
        html += `</div>`;
        html += `</button>`;
        await $(`.${day} + .todo-list`).html(html);
    }
}

setPopupCategoryList = (categoryList) => {
    let html = '';
    for (let i = 0; i < categoryList.length; i++) {
        html += `<option value=${categoryList[i].name}>${categoryList[i].name}</option>`;
    }
    $('#addTodoPop .modal-content .category').html(html);
}

getCategoryList = () => {
    return $.ajax({
        url: `/category/getCategoryList`,
        method: "GET"
    })
};

////////////////////////////////////////////////////////////////
floatTodoPop = async (todoList) => {



    await $('#addTodoPop').show();
};
/////////////////////////////////////////////////////////////////////

floatAddTodoPop = async (day) => {
    let ymd = getFormatDate(new Date(date.year, date.month, day));

    $('#addTodoPop .modal-content .due-date')[0].value = ymd
    await $('#addTodoPop').show();
};

closeAddTodoPop = () => {
    $('#addTodoPop').hide();
}


handleAddTodoList = async () => {
    const title = $('#addTodoPop .modal-content .title')[0].value;
    const dueDate = $('#addTodoPop .modal-content .due-date')[0].value;
    const category = $('#addTodoPop .modal-content .category')[0].value;
    const content = $('#addTodoPop .modal-content .content')[0].value;

    const data =  {
        title : title,
        dueDate : dueDate,
        category : category,
        content : content,
    }

    console.log(data);

    await addTodoList(data);
    await closeAddTodoPop();
}

modifyAddTodoList = async () =>{
    
}


addTodoList = (data)=>{
    return $.ajax({
        url: `/todo/addTodoList`,
        method: "POST",
        data : data
    })
}

var today = new Date();
function prevCalendar(date){

    today = new Date(today.getFullYear(), today.getMonth() -1, today.getDate());
    date = {
        year: today.getFullYear(),
        month: today.getMonth()+1
    }
    setCalendarHeader(date);
    getMonthDays(date).done((_monthDays) => {
        setCalendarDate(_monthDays);
    })
    getTodoListFromDate(date).done((_todoList) => {
        setTodoListOnSchedule(_todoList);
        setTodoListOnCalendar(_todoList);
    })
}


function nextCalendar(date){ 
   
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    date = {
        year: today.getFullYear(),
        month: today.getMonth() +1
    }
    setCalendarHeader(date);
    getMonthDays(date).done((_monthDays) => {
        setCalendarDate(_monthDays);
    })
    getTodoListFromDate(date).done((_todoList) => {
        setTodoListOnSchedule(_todoList);
        setTodoListOnCalendar(_todoList);
    })
}

// initialize

(async function () {


    await setCalendarHeader(date);

    await getMonthDays(date).done((_monthDays) => {
        setCalendarDate(_monthDays);
    })

    await getTodoListFromDate(date).done((_todoList) => {
        setTodoListOnSchedule(_todoList);
        setTodoListOnCalendar(_todoList);
    })
    await getCategoryList().done((_categoryList) => {
        setPopupCategoryList(_categoryList);
    })
})()


