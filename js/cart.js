const cartItemsContainer =
    document.querySelector("#cart-items");

const cartTotal =
    document.querySelector("#cart-total");

const emptyCart =
    document.querySelector("#empty-cart");



/* Load cart */

async function loadCart() {

    try {

        /* Get products from JSON */

        const response =
            await fetch("../data/products.json");

        const products =
            await response.json();


        /* Get cart from localStorage */

        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        displayCart(cart, products);


    } catch (error) {

        console.error(
            "Could not load cart:",
            error
        );

    }

}


/* Display cart */

function displayCart(cart, products) {

    cartItemsContainer.innerHTML = "";


    /* Empty cart */

    if (cart.length === 0) {

        emptyCart.hidden = false;

        cartTotal.textContent = "Rs. 0";

        return;

    }


    emptyCart.hidden = true;


    let total = 0;


    cart.forEach(item => {

        /* Find product in JSON */

        const product =
            products.find(
                product => product.id === item.id
            );


        /* Product doesn't exist */

        if (!product) {
            return;
        }


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;


        /* Create card */

        const cartItem =
            document.createElement("article");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <a href="product.html?id=${product.id}">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </a>


            <div class="cart-item-info">

                <h2>
                    ${product.name}
                </h2>

                <p>
                    Rs. ${product.price.toLocaleString()}
                </p>


                <div class="quantity-controls">

                    <button
                        class="quantity-decrease"
                        data-id="${product.id}"
                        type="button"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-increase"
                        data-id="${product.id}"
                        type="button"
                    >
                        +
                    </button>

                </div>


                <p class="item-total">
                    Rs. ${itemTotal.toLocaleString()}
                </p>


                <button
                    class="remove-cart-item"
                    data-id="${product.id}"
                    type="button"
                >
                    Remove
                </button>

            </div>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    /* Display total */

    cartTotal.textContent =
        `Rs. ${total.toLocaleString()}`;


    setupCartButtons();

}


/* ================================
   Cart buttons
================================ */

function setupCartButtons() {

    const increaseButtons =
        document.querySelectorAll(
            ".quantity-increase"
        );

    const decreaseButtons =
        document.querySelectorAll(
            ".quantity-decrease"
        );

    const removeButtons =
        document.querySelectorAll(
            ".remove-cart-item"
        );


    /* Increase quantity */

    increaseButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                updateQuantity(
                    Number(button.dataset.id),
                    1
                );

            }
        );

    });


    /* Decrease quantity */

    decreaseButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                updateQuantity(
                    Number(button.dataset.id),
                    -1
                );

            }
        );

    });


    /* Remove item */

    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                removeFromCart(
                    Number(button.dataset.id)
                );

            }
        );

    });

}


/* ================================
   Update quantity
================================ */

function updateQuantity(
    productId,
    change
) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const item =
        cart.find(
            item => item.id === productId
        );


    if (!item) {
        return;
    }


    item.quantity += change;


    /* Remove if quantity reaches zero */

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}


/* ================================
   Remove item
================================ */

function removeFromCart(productId) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart =
        cart.filter(
            item => item.id !== productId
        );


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}


loadCart();

document.querySelector("#checkout-button")
    .addEventListener("click", function () {

        window.location.href = "checkout.html";

    });