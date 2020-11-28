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

for (let i in qboard_count)
{
    qboard[i] = {
        title: qboard_title[i],
        content: qboard_content[i],
        u_id: qboard_u_id[i],
        reply: qboard_reply[i],
    }
}

// qboard => qboard[2].title