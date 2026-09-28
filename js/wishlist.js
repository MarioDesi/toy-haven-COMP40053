const interestedContainer =
    document.querySelector("#interested-products");

const notInterestedContainer =
    document.querySelector("#not-interested-products");

const ownedContainer =
    document.querySelector("#owned-products");


const interestedEmpty =
    document.querySelector("#interested-empty");

const notInterestedEmpty =
    document.querySelector("#not-interested-empty");

const ownedEmpty =
    document.querySelector("#owned-empty");


async function loadWishlist() {

    try {

        /* Get products from JSON */

        const response =
            await fetch("../data/products.json");

        const products =
            await response.json();


        /* Get wishlist from localStorage */

        const wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];


        /* Display each status */

        displayWishlist(
            wishlist,
            products,
            "interested",
            interestedContainer,
            interestedEmpty
        );

        displayWishlist(
            wishlist,
            products,
            "not-interested",
            notInterestedContainer,
            notInterestedEmpty
        );

        displayWishlist(
            wishlist,
            products,
            "owned",
            ownedContainer,
            ownedEmpty
        );


    } catch (error) {

        console.error(
            "Could not load wishlist:",
            error
        );

    }

}


function displayWishlist(
    wishlist,
    products,
    status,
    container,
    emptyMessage
) {

    container.innerHTML = "";


    /* Find products with this status */

    const wishlistProducts =
        wishlist.filter(
            item => item.status === status
        );


    /* Show empty message */

    if (wishlistProducts.length === 0) {

        emptyMessage.hidden = false;

        return;

    }


    emptyMessage.hidden = true;


    /* Create cards */

    wishlistProducts.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        /* Product no longer exists */

        if (!product) {
            return;
        }


        const card =
            document.createElement("article");

        card.classList.add("wishlist-card");


        card.innerHTML = `

            <a href="product.html?id=${product.id}">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </a>


            <div class="wishlist-card-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Rs. ${product.price.toLocaleString()}
                </p>


                <a
                    href="product.html?id=${product.id}"
                    class="view-product"
                >
                    View Product
                </a>


                <button
                    class="remove-wishlist"
                    data-id="${product.id}"
                    type="button"
                >
                    Remove
                </button>

            </div>

        `;


        container.appendChild(card);

    });


    /* Add remove functionality */

    const removeButtons =
        container.querySelectorAll(
            ".remove-wishlist"
        );


    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                removeFromWishlist(
                    Number(button.dataset.id)
                );

            }
        );

    });

}


function removeFromWishlist(productId) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    wishlist =
        wishlist.filter(
            item => item.id !== productId
        );


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    /* Refresh page */

    loadWishlist();

}


loadWishlist();