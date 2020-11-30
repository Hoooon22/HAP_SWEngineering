function getFormatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth());
    month = month >= 10 ? month : '0' + month;
    if(month === '00'){
        year = year-1;
        month = 12;
    }
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

function convertDateObjectToFormatDate(_date){
    return _date.year + "/" + _date.month + "/" + _date.day
}