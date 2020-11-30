getTodoListFromDate = (date) =>{
    return $.ajax({
        url : "/todo/getTodoListFromDate",
        method : "POST",
        data : {
            year : date.year,
            month : date.month >= 10 ? date.month : '0'+date.month
        },
        dataType : "json"
    })    
}

getAllTodoList = () =>{
    return $.ajax({
        url : "/todo/getAllTodoList",
        method : "POST",
        data : date,
        dataType : "json"
    })    
} 