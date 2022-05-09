let slideIndex = 0;

function cargarSlider(){

    showSlides(slideIndex);

    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");

    prev.addEventListener("click",function(){
        showSlides(slideIndex-1);
    });

    next.addEventListener("click",function(){
        showSlides(slideIndex+1);
    });

    let slides = document.getElementsByClassName("mySlides");

    for (let x = 0; x< slides.length ; x++){
        slides[x].addEventListener("click",function(){
            showSlides(x);
        });
    }

}

function showSlides(n) {


    let i;
    let slides = document.getElementsByClassName("mySlides");
    let display = document.getElementById("img_display");

    slideIndex = n;
    if (n >= slides.length) {slideIndex = 0}  
    if (n < 0) {
        slideIndex = slides.length-1;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].className = "mySlides";
    }

    slides[slideIndex].className = "mySlides active";
    display.src=slides[slideIndex].src;

    display.classList.remove('fade'); // reset animation
    void display.offsetWidth; // trigger reflow
    display.classList.add('fade'); // start animation
   
}