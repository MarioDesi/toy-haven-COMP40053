/* ================================
   Feedback Form
================================ */

const feedbackForm =
    document.querySelector("#feedback-form");

const feedbackSuccess =
    document.querySelector("#feedback-success");


feedbackForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        clearErrors();


        const name =
            document.querySelector("#feedback-name")
                .value.trim();

        const email =
            document.querySelector("#feedback-email")
                .value.trim();

        const message =
            document.querySelector("#feedback-message")
                .value.trim();


        let valid = true;


        /* ============================
           Validate Name
        ============================ */

        if (name === "") {

            showError(
                "name-error",
                "Please enter your name."
            );

            valid = false;

        }


        /* ============================
           Validate Email
        ============================ */

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


        /* ============================
           Validate Message
        ============================ */

        if (message === "") {

            showError(
                "message-error",
                "Please enter a message."
            );

            valid = false;

        }

        else if (message.length < 10) {

            showError(
                "message-error",
                "Message must be at least 10 characters."
            );

            valid = false;

        }


        /* Stop if invalid */

        if (!valid) {
            return;
        }


        /* Save feedback */

        saveFeedback(
            name,
            email,
            message
        );


        /* Show confirmation */

        feedbackForm.hidden = true;

        feedbackSuccess.hidden = false;

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
   Save feedback
================================ */

function saveFeedback(
    name,
    email,
    message
) {

    /* Get existing feedback */

    let feedback =
        JSON.parse(
            localStorage.getItem("feedback")
        ) || [];


    /* Create feedback object */

    const newFeedback = {

        id: Date.now(),

        name: name,

        email: email,

        message: message,

        date: new Date().toISOString()

    };


    /* Add new feedback */

    feedback.push(newFeedback);


    /* Save */

    localStorage.setItem(
        "feedback",
        JSON.stringify(feedback)
    );

}


/* ================================
   FAQ Accordion
================================ */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        function () {

            const faqItem =
                question.parentElement;

            const answer =
                faqItem.querySelector(
                    ".faq-answer"
                );


            /* Close other FAQ items */

            document.querySelectorAll(
                ".faq-item"
            ).forEach(item => {

                if (item !== faqItem) {

                    item.classList.remove(
                        "active"
                    );

                    item.querySelector(
                        ".faq-answer"
                    ).style.maxHeight = null;

                }

            });


            /* Toggle current */

            faqItem.classList.toggle(
                "active"
            );


            if (faqItem.classList.contains("active")) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

            else {

                answer.style.maxHeight = null;

            }

        }
    );

});