const productGrid = document.querySelector("#product-grid");
const categoryFilter = document.querySelector("#category-filter");
const sortProducts = document.querySelector("#sort-products");
const noProducts = document.querySelector("#no-products");

/* 
Takes the query string
example, in product.html?category=baby_toys
?category=baby_toys is the query string
*/
const params = new URLSearchParams(window.location.search);
//get the value associated with category
const category = params.get("category");

// create empty array for the json file to be loaded into
let products = [];




/* Load products from JSON */

// asynchronous function that needs to wait for the json file to load
async function loadProducts() {
    // trys the code and handles the error
    try {
        // This is where product data is taken
        const response = await fetch("../data/products.json");

        // await waits until fetch is done before proceeding, takes the data in response and converts to js objects using .json()
        products = await response.json();

        // does the display products function which is defined later
        displayProducts(products);

    } catch (error) {
        console.error("Could not load products:", error);
    }
}
if (category) {
    products = products.filter(product => product.category === category);
}

/* Display products */

function displayProducts(productsToDisplay) {

    // clears everything inside product grid before loading new product list
    productGrid.innerHTML = "";
    // if no list was found it displays this error message
    if (productsToDisplay.length === 0) {
        noProducts.hidden = false;
        return;
    }

    // noProducts message in the html document it makes it visible 
    noProducts.hidden = true;


    // Loops through each product object
    productsToDisplay.forEach(product => {
        
        // creates article element
        const card = document.createElement("article");

        // add the product-card class to article element
        card.classList.add("product-card");

        // add this html inside the article element
        // toLocaleString(), give number the formatting of 3000 to 3,000
        card.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            </a>

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h2 class="product-name">
                    ${product.name}
                </h2>

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
        `;
        
        // add the article element created above or the card into the product-grid
        productGrid.appendChild(card);
    });
}


/* Filter and sort products */

function updateProducts() {

    let filteredProducts = [...products];


    /* Category filter */
    const category = categoryFilter.value;

    if (category !== "all") {

        filteredProducts = filteredProducts.filter(
            product => product.category === category
        );

    }


    /* Sorting */
    const sort = sortProducts.value;

    if (sort === "default") {

        // Put featured products first
        filteredProducts.sort(
            (a, b) => Number(b.featured) - Number(a.featured)
        );

    }

    else if (sort === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (sort === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }

    else if (sort === "name") {

        filteredProducts.sort(
            (a, b) => a.name.localeCompare(b.name)
        );

    }


    displayProducts(filteredProducts);
}



/* Listen for filter changes */
categoryFilter.addEventListener(
    "change",
    updateProducts
);

sortProducts.addEventListener(
    "change",
    updateProducts
);



/* Start */
loadProducts();