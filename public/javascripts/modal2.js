/*modify form*/
var modal2 = document.getElementsByClassName("modal2")[0];
var modal_button2 = document.getElementById("modal_button2");
var close_button = document.getElementById("close_button");
var btn_submit = document.getElementById("btn_submit");

modal_button2.addEventListener("click",function(e){
    modal2.style.display = "flex";
});


close_button.addEventListener("click",function(e){
   
    modal2.style.display="none";    

}); 

btn_submit.addEventListener("click",function(e){

    modal2.style.display="none";
});