const currentPage = window.location.pathname;


/* Determine the page */

const isHomepage = currentPage.endsWith("/") ||
                   currentPage.endsWith("index.html");

const isCheckout = currentPage.endsWith("checkout.html");


/* Paths */
// if isHomePage check if ends with / or index.html) "perform this if true":""
const imagePath = isHomepage ? "images/" : "../images/";
const pagePath = isHomepage ? "pages/" : "";



let header;

if (isCheckout){
      header = `
        <header class="checkout-header">

            <a href="../index.html" class="logo">
                <img src="../images/logo.png" alt="Toy Haven logo">
                <span>Toy Haven</span>
            </a>

        </header>
    `;  
} else {

header = `
<header>
        <div class="header-top">
            <!-- Hamburger -->
            <button class="hamburger" aria-label="Open navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <a href="${isHomepage ?"index.html" : "../index.html"}" class="logo">
                <img src="${imagePath}logo.png" alt="Toy Haven logo">
                <span>Toy Haven</span>
            </a>

            <form class="search-bar" id="search-form">
                <input
                    type="search"
                    id="search-input"
                    placeholder="Search toys..."
                >

                <button type="submit">
                    <img src="${imagePath}search-outline.png" alt="Search">
                </button>
            </form>
            <button
                class="mobile-search-button"
                id="mobile-search-button"
                type="button">

                <img src="${imagePath}search-outline.png" alt="Search">

            </button>

            <a href="${pagePath}wishlist.html" class="wishlist"><img src="${imagePath}heart-outline.png"><span>Wishlist</span></a>

            <a href="${pagePath}cart.html" class="cart">
                <img src="${imagePath}cart-outline.png">
                <span>Cart</span>
            </a>

            
            
        </div>

    



        <nav>
            <ul class="nav-links">
                <li><a href="${pagePath}products.html">All Our Toys</a></li>
                <li><a href="${pagePath}about.html">About Us</a></li>
                <li><a href="${pagePath}contact.html">Contact Us</a></li>
                
                
            </ul>
        </nav>
</header> `;
}
// need to use back tick to span mulitple lines
const footer = `
<footer>

    <div class="footer-content">

        <div class="footer-brand">
            <img src="${imagePath}logo.png" alt="Toy Haven logo">
            <h2>Toy Haven</h2>
            <p>
                Bringing imagination to life, one toy at a time.
            </p>
        </div>

        <div class="footer-links">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="${isHomepage ? "index.html" : "../index.html"}">Home</a></li>
                <li><a href="${pagePath}products.html">Products</a></li>
                <li><a href="${pagePath}about.html">About Us</a></li>
                
            </ul>
        </div>

        <div class="footer-links">
            <h3>Customer Service</h3>
            <ul>
                <li><a href="${pagePath}contact.html">Contact Us</a></li>
                <li><a href="${pagePath}feedback.html">Feedback</a></li>
            </ul>
        </div>

    </div>

    <div class="footer-bottom">
        <p>&copy; 2026 Toy Haven. All rights reserved.</p>
    </div>

</footer>`;



document.body.insertAdjacentHTML("afterbegin", header);

document.body.insertAdjacentHTML("beforeend", footer);


