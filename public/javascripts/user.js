whoAmI = () =>{
    return $.ajax({
        // TODO :: convert to server URL
        url : "/whoAmI",
        method : "GET",
        dataType : "json"
    })
}