getTodoListFromDate = (date) =>{
    return $.ajax({
        url : "/todo/getTodoListFromDate",
        method : "POST",
        data : date,
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