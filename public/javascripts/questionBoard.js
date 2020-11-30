var qboard = [];
var qboard_title = document.getElementById("title_value").innerText;
qboard_title = qboard_title.split(',');
var qboard_content = document.getElementById("content_value").innerText;
qboard_content = qboard_content.split(',');
var qboard_u_id = document.getElementById("u_id_value").innerText;
qboard_u_id = qboard_u_id.split(',');
var qboard_reply = document.getElementById("reply_value").innerText;
qboard_reply = qboard_reply.split(',');
// count 
var qboard_count = document.getElementById("count_value").innerText;
var rowCount = 10;
var pageCount = 0;
var printDate;

for (let i in qboard_count) {
    qboard[i] = {
        title: qboard_title[i],
        content: qboard_content[i],
        u_id: qboard_u_id[i],
        reply: qboard_reply[i],
    }
    if (rowCount % 15) pageCount++;
}

rowCount; //게시판의 총 개수
pageCount; //게시판의 페이지 개수

function btn_submit_click() {
    const NOW_DATE = new Date()  
    var nowDay = "";
    switch (NOW_DATE.getDay()) {
        case 0:
            nowDay = "SUN";
            break;
        case 1:
            nowDay = "MON";
            break;
        case 2:
            nowDay = "TUE";
            break;
        case 3:
            nowDay = "WED";
            break;
        case 4:
            nowDay = "THU";
            break;
        case 5:
            nowDay = "FRI";
            break;
        case 6:
            nowDay = "SAT";
            break;
        default:
            nowDay = " ";
            break;
    }
    //document.write(NOW_DATE.getFullYear()+NOW_MONTH);
    const NOW_MONTH = NOW_DATE.getMonth() + 1;
    //document.write(NOW_MONTH);
    //document.write(NOW_DATE.getDate());
    //document.write(nowDay);
    //document.write(NOW_DATE.getHours());
    //document.write(NOW_DATE.getMinutes());


    var printDate = NOW_DATE.getFullYear()+NOW_MONTH+NOW_DATE.getDate()+nowday+NOW_DATE.getHours()+NOW_DATE.getMinutes();
    document.getElementById("date_value").value=printDate;
}



// qboard => qboard[2].title