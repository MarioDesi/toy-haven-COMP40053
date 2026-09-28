const mobileSearchButton =
    document.querySelector("#mobile-search-button");

const searchBar =
    document.querySelector("#search-form");


mobileSearchButton.addEventListener("click", () => {

    searchBar.classList.toggle("show");

});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

if (searchForm) {

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const searchTerm = searchInput.value.trim();

        if (searchTerm === "") {
            return;
        }

        window.location.href =
            `/pages/products.html?search=${encodeURIComponent(searchTerm)}`;

    });

}