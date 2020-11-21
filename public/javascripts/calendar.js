getMonthDays = (_date) => { // modify
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
        html += `<div class="box-row">`;
        for (let j = 0; j < row.length; j++) {
            html += `<div class="box">`;
            html += `<div class="date ${row[j]===0 ? '':row[j]}">${row[j] === 0 ? '' : row[j]}</div>`;
            html += `<div class="todo-list"></div>`
            html += `</div>`;
        }
        html += `</div>`;
    }
    $(".date-wrap").html(html);
}

setTodoListOnSchedule = (todoList) =>{
    var html = '';
    for(let i = 0 ; i < todoList.length ; i++ ){
        html += `<div class="todo">` 
        html += `<div class="label" style="background:${todoList[i].category_color}"></div>`
        html += `<div class="title">${todoList[i].title}</div>`
        html += `</div>`
    }
    $('.schedule .contents').html(html);
}

setTodoListOnCalendar = async (todoList) =>{
    for(let i = 0 ; i < todoList.length ; i++ ){
        let day = todoList[i].date_day.toString();
        let html = await $(`.${day} + .todo-list`).html();
        if(!html) {html = ''};
        console.log(html);
        html += `<div class="todo">`;
        html += `<div class="label" style="background:${todoList[i].category_color}"></div>`;
        html += `<div class="title">${todoList[i].title}</div>`
        html += `</div>`
        await $(`.${day} + .todo-list`).html(html);
    }
}


// initialize

(async function(){

var userInfo;
var date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
}

await setCalendarHeader(date);

await getMonthDays(date).done((_monthDays) => {
    setCalendarDate(_monthDays);
})

await getTodoListFromDate(date).done((_todoList) => {
    setTodoListOnSchedule(_todoList);
    setTodoListOnCalendar(_todoList);
})
})()