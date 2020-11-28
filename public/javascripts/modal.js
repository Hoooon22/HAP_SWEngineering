var modal = document.getElementsByClassName("modal")[0];
var modal_button = document.getElementById("modal_button");
var close_button = document.getElementById("close_button");

modal_button.addEventListener("click",function(e){
    modal.style.display = "flex";
});

close_button.addEventListener("click",function(e){
    modal.style.display = "none";
   
});

