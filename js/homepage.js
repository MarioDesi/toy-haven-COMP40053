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

const featuredProductsContainer =
    document.querySelector("#featured-products");


async function loadFeaturedProducts() {

    try {

        const response = await fetch("data/products.json");

        const products = await response.json();

        const featuredProducts = products.filter(
            product => product.featured === true
        );

        displayFeaturedProducts(featuredProducts);

    } catch (error) {

        console.error("Could not load products:", error);

    }
}


function displayFeaturedProducts(products) {

    featuredProductsContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("article");

        card.classList.add("product-card");

        card.innerHTML = `
            <a href="pages/product.html?id=${product.id}">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            </a>

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-price">
                    Rs. ${product.price.toLocaleString()}
                </p>

                <a
                    href="product.html?id=${product.id}"
                    class="product-button"
                >
                    View Product
                </a>

                </div>

            </div>
        `;

        featuredProductsContainer.appendChild(card);

    });
}


loadFeaturedProducts();