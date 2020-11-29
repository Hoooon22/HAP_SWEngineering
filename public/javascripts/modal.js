var modal = document.getElementsByClassName("modal")[0];
var modal_button = document.getElementById("modal_button");
var close_button = document.getElementById("close_button");
var sidebar = document.getElementsByClassName("sidebar_button")[0];
var sidebar_page = document.getElementsByClassName("sidebar_page")[0]; 

modal_button.addEventListener("click",function(e){
    modal.style.display = "flex";
});

close_button.addEventListener("click",function(e){
    modal.style.display = "none";
   
});

sidebar.addEventListener('mouseover',function(e){
    sidebar_page.style.display="block"; // 수정
    sidebar.style.display = "none";
});

sidebar_page.addEventListener('mouseleave',function(e){
    sidebar_page.style.display="none";
    sidebar.style.display="flex";
})
