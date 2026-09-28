const checkoutForm =
    document.querySelector("#checkout-form");

const checkoutItems =
    document.querySelector("#checkout-items");

const checkoutTotal =
    document.querySelector("#checkout-total");

const orderSuccess =
    document.querySelector("#order-success");

const orderNumber =
    document.querySelector("#order-number");


let cart = [];
let products = [];


/* ================================
   Load checkout
================================ */

async function loadCheckout() {

    try {

        /* Get products */

        const response =
            await fetch("../data/products.json");

        products =
            await response.json();


        /* Get cart */

        cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        /* Check if cart is empty */

        if (cart.length === 0) {

            checkoutItems.innerHTML = `
                <p>Your cart is empty.</p>
            `;

            checkoutTotal.textContent =
                "Rs. 0";

            checkoutForm.style.display =
                "none";

            return;
        }


        displayOrderSummary();


    } catch (error) {

        console.error(
            "Could not load checkout:",
            error
        );

    }

}


/* ================================
   Order summary
================================ */

function displayOrderSummary() {

    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (!product) {
            return;
        }


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;


        const itemElement =
            document.createElement("div");

        itemElement.classList.add(
            "checkout-item"
        );


        itemElement.innerHTML = `

            <div>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Quantity: ${item.quantity}
                </p>

            </div>

            <span>
                Rs. ${itemTotal.toLocaleString()}
            </span>

        `;


        checkoutItems.appendChild(
            itemElement
        );

    });


    checkoutTotal.textContent =
        `Rs. ${total.toLocaleString()}`;

}


/* ================================
   Form validation
================================ */

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        clearErrors();


        const fullName =
            document.querySelector("#full-name")
                .value.trim();

        const email =
            document.querySelector("#email")
                .value.trim();

        const address =
            document.querySelector("#address")
                .value.trim();

        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        let valid = true;


        /* Full name */

        if (fullName === "") {

            showError(
                "full-name-error",
                "Please enter your full name."
            );

            valid = false;

        }


        /* Email */

        if (email === "") {

            showError(
                "email-error",
                "Please enter your email."
            );

            valid = false;

        }

        else if (!isValidEmail(email)) {

            showError(
                "email-error",
                "Please enter a valid email address."
            );

            valid = false;

        }


        /* Address */

        if (address === "") {

            showError(
                "address-error",
                "Please enter your delivery address."
            );

            valid = false;

        }


        /* Payment */

        if (!payment) {

            showError(
                "payment-error",
                "Please select a payment method."
            );

            valid = false;

        }


        /* Stop if invalid */

        if (!valid) {
            return;
        }


        /* Complete order */

        completeOrder(
            fullName,
            email,
            address,
            payment.value
        );

    }
);


/* ================================
   Email validation
================================ */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* ================================
   Show error
================================ */

function showError(
    elementId,
    message
) {

    document.querySelector(
        `#${elementId}`
    ).textContent = message;

}


/* ================================
   Clear errors
================================ */

function clearErrors() {

    const errors =
        document.querySelectorAll(
            ".error-message"
        );


    errors.forEach(error => {

        error.textContent = "";

    });

}


/* ================================
   Complete order
================================ */

function completeOrder(
    fullName,
    email,
    address,
    payment
) {

    /* Calculate total */

    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (product) {

            total +=
                product.price *
                item.quantity;

        }

    });


    /* Create order */

    const order = {

        orderId:
            "TH-" +
            Date.now(),

        date:
            new Date().toISOString(),

        customer: {

            fullName:
                fullName,

            email:
                email,

            address:
                address

        },

        paymentMethod:
            payment,

        items:
            cart,

        total:
            total

    };


    /* Get existing orders */

    let orderHistory =
        JSON.parse(
            localStorage.getItem(
                "orderHistory"
            )
        ) || [];


    /* Add new order */

    orderHistory.push(order);


    /* Save order history */

    localStorage.setItem(
        "orderHistory",
        JSON.stringify(orderHistory)
    );


    /* Clear cart */

    localStorage.removeItem("cart");


    /* Show success */

    showSuccess(order.orderId);

}


/* ================================
   Success
================================ */

function showSuccess(orderId) {

    checkoutForm.style.display =
        "none";

    document.querySelector(
        ".order-summary"
    ).style.display = "none";


    orderSuccess.hidden = false;


    orderNumber.textContent =
        `Order number: ${orderId}`;

}


loadCheckout();