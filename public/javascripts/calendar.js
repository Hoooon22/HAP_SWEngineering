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
var todoList;
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
        html += `<button id="todo-btn" onclick='floatEditTodoPop(${i});' style="cursor:pointer">`;
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
        html += `<button id="todo-btn" style="cursor:pointer">`;
        html += `<div class="todo">`;
        html += `<div class="label" style="background:${todoList[i].category_color}"></div>`;
        html += `<div class="title">${todoList[i].title}</div>`;
        html += `</div>`;
        html += `</button>`;
        console.log(html);
        await $(`.${day} + .todo-list`).html(html);
    }
}

setPopupCategoryList = (categoryList) => {
    let html = '';
    for (let i = 0; i < categoryList.length; i++) {
        html += `<option value=${categoryList[i].name}>${categoryList[i].name}</option>`;
    }

    console.log(123435);
    console.log(html);
    $('#addTodoPop .modal-content .category').html(html);
}

getCategoryList = () => {
    return $.ajax({
        url: `/category/getCategoryList`,
        method: "GET"
    })
};


floatAddTodoPop = async (day) => {
    let ymd = getFormatDate(new Date(date.year, date.month, day));
    $('#addTodoPop .modal-content .due-date')[0].value = ymd
    await $('#addTodoPop').show();
};

floatEditTodoPop = async (todo_idx) => {
    let todoInfo = this.todoList[todo_idx];
    let ymd = getFormatDate(new Date(todoInfo.date));
    console.log(12353426);
    console.log(todoInfo.category_name);
    $('#editTodoPop .modal-content .due-date')[0].value = ymd
    $('#editTodoPop .modal-content .title')[0].value = todoInfo.title
    $('#editTodoPop .modal-content .category')[0].value = todoInfo.category_name
    $('#editTodoPop .modal-content .content')[0].value = todoInfo.content
    await $('#editTodoPop').show();
};

closeAddTodoPop = () => {
    $('#addTodoPop').hide();
    $('#editTodoPop').hide();
}

deleteTodo = () => {

    $('#modifyTodoPop').hide();
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

async function prevCalendar(date){
    console.log(date);
    if(date.month ===1){
        date = {
            year: date.year-1,
            month: 12
        }
    }else{
        date = {
            year: date.year,
            month: date.month-1
        }
    }
    this.date = date;

    await setCalendarHeader(date);
    await getMonthDays(date).done((_monthDays) => {
        setCalendarDate(_monthDays);
    })
    await getTodoListFromDate(date).done((_todoList) => {
        this.todoList = _todoList;
        setTodoListOnSchedule(_todoList);
        setTodoListOnCalendar(_todoList);
    })
}


async function nextCalendar(date){ 
    console.log(date);
    if(date.month === 12){
        date = {
            year: date.year+1,
            month: 1
        }
    }else{
        date = {
            year: date.year,
            month: date.month +1
        }
    }
    this.date = date;
   
    await setCalendarHeader(date);
    await getMonthDays(date).done((_monthDays) => {
        setCalendarDate(_monthDays);
    })
    await getTodoListFromDate(date).done((_todoList) => {
        this.todoList = _todoList;
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
        this.todoList = _todoList;
        setTodoListOnSchedule(_todoList);
        setTodoListOnCalendar(_todoList);
    })
    await getCategoryList().done((_categoryList) => {
        setPopupCategoryList(_categoryList);
    })
})()


