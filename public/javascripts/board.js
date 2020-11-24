getCategoryList = () =>{
    return $.ajax({
        url:"/category/getCategoryList",
        method:"GET"
    })
}

setTodoListOnBoard = (_categoryList) => {
    var html = '';
    for (let i =0; i<_categoryList.length;i++){
        html += `<div class="category">`;
        html += `<div class="name" style="background:${_categoryList[i].color}">${_categoryList[i].name}</div>`;
        html += `<div class="todo-list">`;
        for(let j =0; j<_categoryList[i].todoList.length; j++){
            html += `<div class="todo">`
            html += `<div class="title">${_categoryList[i].todoList[j].title}</div>`
            html += `<div class="date">${convertDateObjectToFormatDate(_categoryList[i].todoList[j].date)}</div>`
            html += `</div>`
        }
        html += `</div>`;
        html += `</div>`;
    }
    $(".container-wrap .container").html(html);
}



(async function () {

    await whoAmI().done((_userInfo) => {
        userInfo = _userInfo
        $('header .welcome').html(`${_userInfo.name} 님 안녕하세요`);
    });

    await getCategoryList().done((_categoryList) => {
        setTodoListOnBoard(_categoryList)
    })
})()


