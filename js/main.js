const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

const previousButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentSlide = 0;
let slideTimer;


/* Show a particular slide */

function showSlide(index) {

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}


/* Next slide */

function nextSlide() {
    showSlide(currentSlide + 1);
}


/* Previous slide */

function previousSlide() {
    showSlide(currentSlide - 1);
}


/* Reset automatic timer */

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 5000);
}


/* Arrow buttons */

nextButton.addEventListener("click", () => {
    nextSlide();
    resetTimer();
});

previousButton.addEventListener("click", () => {
    previousSlide();
    resetTimer();
});


/* Dots */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
        showSlide(index);
        resetTimer();
    });

});


/* Start automatic rotation */

resetTimer();