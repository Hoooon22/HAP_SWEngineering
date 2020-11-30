var slideIndex = 0; //slide index

// HTML 로드가 끝난 후 동작
window.onload=function(){
  showSlides(slideIndex);

  // Auto Move Slide
  var sec = 3000;
  setInterval(function(){
    slideIndex++;
    showSlides(slideIndex);

  }, sec);

  var sidebar = document.getElementsByClassName("sidebar_button")[0];
var sidebar_page = document.getElementsByClassName("sidebar_page")[0]; 

sidebar.addEventListener('mouseover',function(e){
    sidebar_page.style.display="block"; // 수정
    sidebar.style.display = "none";
});

sidebar_page.addEventListener('mouseleave',function(e){
    sidebar_page.style.display="none";
    sidebar.style.display="flex";
})

user_subject = document.getElementById("user_subject").innerText;
user_subject = user_subject.split(',');
subjectList = user_subject;
loadSideBar(subjectList);
}

function loadSideBar(subjectList){
  var newSubject;
  var sidebar = document.getElementsByClassName("sidebar_button")[0];
  var sidebar_page = document.getElementsByClassName("sidebar_page")[0]; 

  for(var i=0;subjectList.length>i;i++){
      newSubject = document.createElement("button");
      newSubject.setAttribute("class","sidebar_subject");
      newSubject.innerHTML=subjectList[i];
      var url = subjectList[i];

      newSubject.addEventListener('click',function(e){
          // 링크로 이동하기
      });

      sidebar_page.appendChild(newSubject);
  }   
}

// Next/previous controls
function moveSlides(n) {
  slideIndex = slideIndex + n
  showSlides(slideIndex);
}

// Thumbnail image controls
function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {

  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  var size = slides.length;

  if ((n+1) > size) {
    slideIndex = 0; n = 0;
  }else if (n < 0) {
    slideIndex = (size-1);
    n = (size-1);
  }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[n].style.display = "block";
  dots[n].className += " active";
}
