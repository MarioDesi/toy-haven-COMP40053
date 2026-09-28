const productContainer =
    document.querySelector("#product-container");


/* Get product ID from URL */

const params =
    new URLSearchParams(window.location.search);

const productId =
    params.get("id");


/* Load product data */

async function loadProduct() {

    try {

        const response =
            await fetch("../data/products.json");

        const products =
            await response.json();


        /* Find the product */

        const product =
            products.find(
                product => product.id === Number(productId)
            );


        /* Product doesn't exist */

        if (!product) {

            productContainer.innerHTML = `
                <h1>Product Not Found</h1>
                <p>
                    Sorry, we couldn't find that product.
                </p>

                <a href="products.html">
                    Back to Products
                </a>
            `;

            return;
        }


        /* Display product */

        displayProduct(product);


    } catch (error) {

        console.error(
            "Could not load product:",
            error
        );

    }

}


function displayProduct(product) {

    productContainer.innerHTML = `

        <div class="product-details">

            <div class="product-image-container">

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-information">

                <p class="product-category">
                    ${product.category}
                </p>

                <h1 class="product-title">
                    ${product.name}
                </h1>

                <p class="product-price">
                    Rs. ${product.price.toLocaleString()}
                </p>

                <p class="product-description">
                    ${product.description || "A great addition to your toy collection."}
                </p>


                <div class="product-actions">

                    <button
                        class="add-to-cart-button"
                        id="add-to-cart"
                        type="button"
                    >
                        Add to Cart
                    </button>

                </div>


                <div class="wishlist-section">

                    <h2>Wishlist</h2>

                    <div class="wishlist-options">

                        <button
                            class="wishlist-button"
                            data-status="interested"
                            type="button"
                        >
                            Interested
                        </button>

                        <button
                            class="wishlist-button"
                            data-status="not-interested"
                            type="button"
                        >
                            Not Interested
                        </button>

                        <button
                            class="wishlist-button"
                            data-status="owned"
                            type="button"
                        >
                            Owned
                        </button>

                    </div>

                </div>


                <p
                    class="product-message"
                    id="product-message"
                ></p>

            </div>

        </div>

    `;


    setupProductButtons(product);

}


function setupProductButtons(product) {

    const cartButton =
        document.querySelector("#add-to-cart");

    const wishlistButtons =
        document.querySelectorAll(".wishlist-button");

    const message =
        document.querySelector("#product-message");


    /* Add to cart */

    cartButton.addEventListener("click", function () {

        addToCart(product);

        message.textContent =
            `${product.name} added to cart.`;

    });


    /* Wishlist */

    wishlistButtons.forEach(button => {

        button.addEventListener("click", function () {

            const status =
                button.dataset.status;

            updateWishlist(product, status);

            wishlistButtons.forEach(button => {
                button.classList.remove("active");
            });

            button.classList.add("active");

            message.textContent =
                `Wishlist status: ${button.textContent}`;

        });

    });


    /* Show existing wishlist status */

    showWishlistStatus(
        product,
        wishlistButtons
    );

}


/* ================================
   Cart
================================ */

function addToCart(product) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(
            item => item.id === product.id
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* ================================
   Wishlist
================================ */

function updateWishlist(product, status) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    const existingProduct =
        wishlist.find(
            item => item.id === product.id
        );


    if (existingProduct) {

        existingProduct.status = status;

    } else {

        wishlist.push({
            id: product.id,
            status: status
        });

    }


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}


/* Show current wishlist status */

function showWishlistStatus(
    product,
    buttons
) {

    const wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    const savedProduct =
        wishlist.find(
            item => item.id === product.id
        );


    if (!savedProduct) {
        return;
    }


    buttons.forEach(button => {

        if (
            button.dataset.status ===
            savedProduct.status
        ) {

            button.classList.add("active");

        }

    });

}


loadProduct();