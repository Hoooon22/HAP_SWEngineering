getCategoryList = () =>{
    return $.ajax({
        url:"/category/getCategoryList",
        method:"GET"
    })

    // ...data,
    // todoList : [
    //     {
    //         title : ,
    //         date : ,
    //     }
    // ]
}

setTodoListOnBoard = (_categoryList) => {
    var html = '';
    for (let i =0; i<_categoryList.length;i++){
        html += `<div class="category">`;
        html += `<div class="name" style="background:${_categoryList[i].color}">`;
        html += `<div class="subjecthome">`;
        html += `<a href="subject/:${_categoryList[i].name}">`;
        html += `<img src="../public/images/home-outline.svg" />`;
        html += `</a>`; 
        html += `${_categoryList[i].name}</div>`;
        html += `</div>`;
        html += `<div class="todo-list">`;

        console.log(_categoryList);
        for(let j =0; j<_categoryList[i].todoList.length; j++){
            html += `<div class="todo">`
            html += `<div class="title">${_categoryList[i].todoList[j].title}</div>`
            html += `<div class="date">${_categoryList[i].todoList[j].date}</div>`
            html += `</div>`
        }
        html += `</div>`;
        html += `</div>`;
    }
    $(".container-wrap .container").html(html);
}



(async function () {

  

    await getCategoryList().done((_categoryList) => {
        setTodoListOnBoard(_categoryList)
    })
})()


