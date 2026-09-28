const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let isValid = true;


    // Get values
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");


    // Clear previous errors
    clearErrors();


    // Name validation
    if (name.value.trim() === "") {

        showError(
            name,
            "nameError",
            "Please enter your name."
        );

        isValid = false;
    }


    // Email validation
    if (email.value.trim() === "") {

        showError(
            email,
            "emailError",
            "Please enter your email."
        );

        isValid = false;

    } else if (!isValidEmail(email.value)) {

        showError(
            email,
            "emailError",
            "Please enter a valid email address."
        );

        isValid = false;
    }


    // Subject validation
    if (subject.value.trim() === "") {

        showError(
            subject,
            "subjectError",
            "Please enter a subject."
        );

        isValid = false;
    }


    // Message validation
    if (message.value.trim() === "") {

        showError(
            message,
            "messageError",
            "Please enter your message."
        );

        isValid = false;

    } else if (message.value.trim().length < 10) {

        showError(
            message,
            "messageError",
            "Message must be at least 10 characters."
        );

        isValid = false;
    }


    // If everything is valid
    if (isValid) {

        const feedback = {
            name: name.value.trim(),
            email: email.value.trim(),
            subject: subject.value.trim(),
            message: message.value.trim(),
            date: new Date().toISOString()
        };


        // Get existing messages
        const messages =
            JSON.parse(localStorage.getItem("contactMessages")) || [];


        // Add new message
        messages.push(feedback);


        // Save to localStorage
        localStorage.setItem(
            "contactMessages",
            JSON.stringify(messages)
        );


        // Show confirmation
        document
            .getElementById("formSuccess")
            .classList.add("show");


        // Clear form
        contactForm.reset();
    }

});


/* ========================================
   SHOW ERROR
======================================== */

function showError(input, errorId, message) {

    input.classList.add("error");

    document.getElementById(errorId).textContent = message;
}


/* ========================================
   CLEAR ERRORS
======================================== */

function clearErrors() {

    document
        .querySelectorAll(".error-message")
        .forEach(function (error) {

            error.textContent = "";

        });


    document
        .querySelectorAll("input, textarea")
        .forEach(function (input) {

            input.classList.remove("error");

        });
}


/* ========================================
   EMAIL VALIDATION
======================================== */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}