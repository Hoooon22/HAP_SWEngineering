whoAmI = () =>{
    return $.ajax({
        // TODO :: convert to server URL
        url : "/user/whoAmI",
        method : "GET",
        dataType : "json"
    })
}