getTodoListFromDate = (date) =>{
    return $.ajax({
        url : "/getTodoListFromDate",
        method : "POST",
        data : date,
        dataType : "json"
    })    
}

getAllTodoList = () =>{
    return $.ajax({
        url : "/getAllTodoList",
        method : "POST",
        data : date,
        dataType : "json"
    })    
}