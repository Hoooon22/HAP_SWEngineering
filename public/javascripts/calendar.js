var userInfo;
var date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
}

getMonthDays = (_date) => {
    return $.ajax({
        url: `/getMonthDays/${_date.year}/${_date.month}`,
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
        html += `<div class="todo">`
        html += `<div class="label" style="background:${todoList[i].category_color}"></div>`
        html += `<div class="title">${todoList[i].title}</div>`
        html += `</div>`
    }
    $('.schedule .contents').html(html);
}

setTodoListOnCalendar = async (todoList) => {
    for (let i = 0; i < todoList.length; i++) {
        let day = todoList[i].date_day.toString();
        let html = await $(`.${day} + .todo-list`).html();
        if (!html) {
            html = ''
        }
        console.log(html);
        html += `<div class="todo">`;
        html += `<div class="label" style="background:${todoList[i].category_color}"></div>`;
        html += `<div class="title">${todoList[i].title}</div>`
        html += `</div>`
        await $(`.${day} + .todo-list`).html(html);
    }
}

setPopupCategoryList = (categoryList) => {
    let html = '';
    for (let i = 0; i < categoryList.length; i++) {
        html += `<option value=${categoryList[i].name}>${categoryList[i].name}</option>`;
    }
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


