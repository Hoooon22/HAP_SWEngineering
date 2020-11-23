setTodoListOnSchedule = (todoList) => {
    var html = '';
    for (let i = 0; i < todoList.length; i++) {
        html += `<div class="todo">`
        html += `<div class="label" style="background:${todoList[i].category.color}"></div>`
        html += `<div class="title">${todoList[i].title}</div>`
        html += `</div>`
    }
    $('.schedule .contents').html(html);
}
setTodoListOnCalendar = async (todoList) => {
    for (let i = 0; i < todoList.length; i++) {
        let day = todoList[i].date.day.toString();
        let html = await $(`.${day} + .todo-list`).html();
        if (!html) {
            html = ''
        }
        console.log(html);
        html += `<div class="todo">`;
        html += `<div class="label" style="background:${todoList[i].category.color}"></div>`;
        html += `<div class="title">${todoList[i].title}</div>`
        html += `</div>`
        await $(`.${day} + .todo-list`).html(html);
    }
}
setTodoListonBoard = (todoList) => 



(async function () {

    await whoAmI().done((_userInfo) => {
        userInfo = _userInfo
        $('header .welcome').html(`${_userInfo.name} 님 안녕하세요`);
    });

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


