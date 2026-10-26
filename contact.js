document.addEventListener("DOMContentLoaded", function () {
    const finorixContactHero = document.querySelector(
        ".finorix-contact-hero"
    );

    if (!finorixContactHero) {
        return;
    }

    const finorixContactReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const finorixContactImage = finorixContactHero.querySelector(
        ".finorix-contact-image-frame"
    );

    const finorixContactFloatingCards = finorixContactHero.querySelectorAll(
        ".finorix-contact-floating-card"
    );

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined" ||
        finorixContactReducedMotion
    ) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const finorixContactBreadcrumb = finorixContactHero.querySelector(
        ".finorix-contact-breadcrumb"
    );

    const finorixContactLabel = finorixContactHero.querySelector(
        ".finorix-contact-label"
    );

    const finorixContactHeading = finorixContactHero.querySelector("h1");

    const finorixContactDescription = finorixContactHero.querySelector(
        ".finorix-contact-hero-description"
    );

    const finorixContactActions = finorixContactHero.querySelector(
        ".finorix-contact-hero-actions"
    );

    const finorixContactTrust = finorixContactHero.querySelector(
        ".finorix-contact-hero-trust"
    );

    const finorixContactTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    finorixContactTimeline
        .from(finorixContactBreadcrumb, {
            opacity: 0,
            y: 15,
            duration: 0.5
        })
        .from(
            finorixContactLabel,
            {
                opacity: 0,
                x: -20,
                duration: 0.5
            },
            "-=0.25"
        )
        .from(
            finorixContactHeading,
            {
                opacity: 0,
                y: 35,
                duration: 0.8
            },
            "-=0.2"
        )
        .from(
            finorixContactDescription,
            {
                opacity: 0,
                y: 20,
                duration: 0.6
            },
            "-=0.4"
        )
        .from(
            finorixContactActions,
            {
                opacity: 0,
                y: 18,
                duration: 0.5
            },
            "-=0.3"
        )
        .from(
            finorixContactTrust,
            {
                opacity: 0,
                y: 15,
                duration: 0.5
            },
            "-=0.2"
        );

    gsap.from(finorixContactImage, {
        opacity: 0,
        scale: 0.94,
        y: 25,
        duration: 1,
        delay: 0.25,
        ease: "power3.out"
    });

    gsap.from(finorixContactFloatingCards, {
        opacity: 0,
        y: 20,
        scale: 0.92,
        duration: 0.7,
        stagger: 0.18,
        delay: 0.65,
        ease: "back.out(1.5)"
    });

    gsap.to(
        finorixContactHero.querySelector(".finorix-contact-orb-one"),
        {
            x: 25,
            y: 20,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }
    );

    gsap.to(
        finorixContactHero.querySelector(".finorix-contact-orb-two"),
        {
            x: 20,
            y: -15,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }
    );

    gsap.to(finorixContactFloatingCards, {
        y: -7,
        duration: 2.2,
        stagger: 0.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const finorixForm = document.getElementById("finorixContactForm");

    if (!finorixForm) {
        return;
    }

    const finorixFields = {
        fullName: document.getElementById("finorixContactName"),
        email: document.getElementById("finorixContactEmail"),
        phone: document.getElementById("finorixContactPhone"),
        subject: document.getElementById("finorixContactSubject"),
        experience: document.getElementById("finorixContactBudget"),
        message: document.getElementById("finorixContactMessage"),
        consent: document.getElementById("finorixContactConsent")
    };

    const finorixErrorElements = {
        fullName: document.getElementById("finorixContactNameError"),
        email: document.getElementById("finorixContactEmailError"),
        phone: document.getElementById("finorixContactPhoneError"),
        subject: document.getElementById("finorixContactSubjectError"),
        experience: document.getElementById("finorixContactBudgetError"),
        message: document.getElementById("finorixContactMessageError"),
        consent: document.getElementById("finorixContactConsentError")
    };

    const finorixFormStatus = document.getElementById(
        "finorixContactFormStatus"
    );

    const finorixCharCount = document.getElementById(
        "finorixContactCharCount"
    );

    const finorixSubmitButton = document.getElementById(
        "finorixContactSubmit"
    );

    let finorixSubmitted = false;

    function finorixGetError(fieldName, value) {
        const trimmedValue = value.trim();

        if (fieldName === "fullName") {
            if (!trimmedValue) {
                return "Please enter your full name.";
            }

            if (trimmedValue.length < 2) {
                return "Name must contain at least 2 characters.";
            }

            if (trimmedValue.length > 60) {
                return "Name cannot exceed 60 characters.";
            }

            if (!/^[\p{L}][\p{L}\p{M}\s.'’-]*$/u.test(trimmedValue)) {
                return "Enter a valid name using letters and normal name punctuation.";
            }

            if (!/[\p{L}]/u.test(trimmedValue)) {
                return "Please enter a valid name.";
            }

            return "";
        }

        if (fieldName === "email") {
            if (!trimmedValue) {
                return "Please enter your email address.";
            }

            if (
                trimmedValue.length > 254 ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedValue)
            ) {
                return "Please enter a valid email address.";
            }

            return "";
        }

        if (fieldName === "phone") {
            if (!trimmedValue) {
                return "Please enter your mobile number.";
            }

            const digits = trimmedValue.replace(/\D/g, "");

            if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(trimmedValue.replace(/[\s()-]/g, ""))) {
                if (!/^(?:91)?[6-9]\d{9}$/.test(digits)) {
                    return "Enter a valid 10-digit Indian mobile number.";
                }
            }

            return "";
        }

        if (fieldName === "subject") {
            if (!trimmedValue) {
                return "Please select a subject.";
            }

            return "";
        }

        if (fieldName === "experience") {
            if (!trimmedValue) {
                return "Please select your investment experience.";
            }

            return "";
        }

        if (fieldName === "message") {
            if (!trimmedValue) {
                return "Please enter your message.";
            }

            if (trimmedValue.length < 20) {
                return "Your message must contain at least 20 characters.";
            }

            if (trimmedValue.length > 1500) {
                return "Your message cannot exceed 1500 characters.";
            }

            return "";
        }

        if (fieldName === "consent") {
            if (!finorixFields.consent.checked) {
                return "Please confirm the information and consent above.";
            }

            return "";
        }

        return "";
    }

    function finorixShowError(fieldName, message) {
        const field = finorixFields[fieldName];
        const errorElement = finorixErrorElements[fieldName];

        errorElement.textContent = message;

        if (fieldName === "consent") {
            field.setAttribute("aria-invalid", message ? "true" : "false");
            return;
        }

        field.classList.remove(
            "finorix-contact-invalid",
            "finorix-contact-valid"
        );

        if (message) {
            field.classList.add("finorix-contact-invalid");
            field.setAttribute("aria-invalid", "true");
        } else {
            field.removeAttribute("aria-invalid");

            if (field.value.trim()) {
                field.classList.add("finorix-contact-valid");
            }
        }
    }

    function finorixValidateField(fieldName) {
        const field = finorixFields[fieldName];

        let value = "";

        if (fieldName !== "consent") {
            value = field.value;
        }

        const errorMessage = finorixGetError(fieldName, value);

        finorixShowError(fieldName, errorMessage);

        return errorMessage === "";
    }

    function finorixUpdateCharacterCount() {
        finorixCharCount.textContent = finorixFields.message.value.length;
    }

    function finorixClearFormStatus() {
        finorixFormStatus.textContent = "";
        finorixFormStatus.classList.remove(
            "finorix-contact-status-visible"
        );
    }

    Object.keys(finorixFields).forEach(function (fieldName) {
        const field = finorixFields[fieldName];

        const eventName = fieldName === "consent" ? "change" : "input";

        field.addEventListener(eventName, function () {
            finorixClearFormStatus();

            if (fieldName === "message") {
                finorixUpdateCharacterCount();
            }

            if (
                finorixSubmitted ||
                field.classList.contains("finorix-contact-invalid") ||
                fieldName === "consent"
            ) {
                finorixValidateField(fieldName);
            }
        });

        if (fieldName === "subject" || fieldName === "experience") {
            field.addEventListener("change", function () {
                if (
                    finorixSubmitted ||
                    field.classList.contains("finorix-contact-invalid")
                ) {
                    finorixValidateField(fieldName);
                }
            });
        }

        field.addEventListener("blur", function () {
            if (finorixSubmitted) {
                finorixValidateField(fieldName);
            }
        });
    });

    finorixFields.phone.addEventListener("input", function () {
        finorixFields.phone.value = finorixFields.phone.value.replace(
            /[^0-9+\s()-]/g,
            ""
        );
    });

    finorixFields.message.addEventListener(
        "input",
        finorixUpdateCharacterCount
    );

    finorixForm.addEventListener("submit", function (event) {
        event.preventDefault();

        finorixSubmitted = true;
        finorixClearFormStatus();

        let formIsValid = true;
        let firstInvalidField = null;

        Object.keys(finorixFields).forEach(function (fieldName) {
            const isValid = finorixValidateField(fieldName);

            if (!isValid) {
                formIsValid = false;

                if (!firstInvalidField) {
                    firstInvalidField = finorixFields[fieldName];
                }
            }
        });

        if (!formIsValid) {
            finorixFormStatus.textContent =
                "Please correct the highlighted fields before submitting.";

            finorixFormStatus.classList.add(
                "finorix-contact-status-visible"
            );

            if (
                typeof gsap !== "undefined" &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                gsap.fromTo(
                    finorixFormStatus,
                    {
                        x: -5
                    },
                    {
                        x: 0,
                        duration: 0.35,
                        ease: "power2.out"
                    }
                );
            }

            if (firstInvalidField) {
                firstInvalidField.focus();

                firstInvalidField.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "center"
                });
            }

            return;
        }

        finorixSubmitButton.disabled = true;

        finorixSubmitButton.querySelector("span").textContent =
            "Submitting...";

        finorixSubmitButton.querySelector("i").className =
            "fa-solid fa-spinner fa-spin";

        sessionStorage.setItem("finorixContactSubmitted", "true");

        window.location.assign("error.html");
    });

    window.addEventListener("pageshow", function () {
        const submitted = sessionStorage.getItem(
            "finorixContactSubmitted"
        );

        if (submitted === "true") {
            sessionStorage.removeItem("finorixContactSubmitted");

            finorixForm.reset();

            finorixSubmitted = false;

            Object.keys(finorixFields).forEach(function (fieldName) {
                finorixShowError(fieldName, "");
            });

            finorixUpdateCharacterCount();
            finorixClearFormStatus();

            finorixSubmitButton.disabled = false;

            finorixSubmitButton.querySelector("span").textContent =
                "Submit Your Enquiry";

            finorixSubmitButton.querySelector("i").className =
                "fa-solid fa-arrow-right";
        }
    });

    finorixUpdateCharacterCount();
});


document.addEventListener("DOMContentLoaded", function () {
    const finorixFaqItems = document.querySelectorAll(".finorix-faq-item");

    finorixFaqItems.forEach(function (item) {
        const question = item.querySelector(".finorix-faq-question");

        question.addEventListener("click", function () {
            const isCurrentlyOpen = item.classList.contains("active");

            finorixFaqItems.forEach(function (faqItem) {
                faqItem.classList.remove("active");

                const faqButton = faqItem.querySelector(".finorix-faq-question");
                faqButton.setAttribute("aria-expanded", "false");
            });

            if (!isCurrentlyOpen) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }
        });
    });

    if (typeof gsap !== "undefined") {
        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const finorixFaqHeader = document.querySelector(".finorix-faq-header");
        const finorixFaqSidebar = document.querySelector(".finorix-faq-sidebar");
        const finorixFaqQuestions = document.querySelectorAll(".finorix-faq-item");
        const finorixFaqBottom = document.querySelector(".finorix-faq-bottom");

        if (finorixFaqHeader) {
            gsap.from(finorixFaqHeader, {
                y: 35,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: typeof ScrollTrigger !== "undefined" ? {
                    trigger: finorixFaqHeader,
                    start: "top 85%",
                    once: true
                } : undefined
            });
        }

        if (finorixFaqSidebar) {
            gsap.from(finorixFaqSidebar, {
                x: -35,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: typeof ScrollTrigger !== "undefined" ? {
                    trigger: finorixFaqSidebar,
                    start: "top 85%",
                    once: true
                } : undefined
            });
        }

        if (finorixFaqQuestions.length) {
            gsap.from(finorixFaqQuestions, {
                x: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: typeof ScrollTrigger !== "undefined" ? {
                    trigger: ".finorix-faq-list",
                    start: "top 85%",
                    once: true
                } : undefined
            });
        }

        if (finorixFaqBottom) {
            gsap.from(finorixFaqBottom, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: typeof ScrollTrigger !== "undefined" ? {
                    trigger: finorixFaqBottom,
                    start: "top 95%",
                    once: true
                } : undefined
            });
        }
    }
});


const finorixFooter = document.querySelector(".finorix-footer");

if (finorixFooter) {
    const footerBrand = finorixFooter.querySelector(".footer-brand");
    const footerColumns = finorixFooter.querySelectorAll(".footer-column");
    const footerTrustItems = finorixFooter.querySelectorAll(".footer-trust-item");
    const footerBottom = finorixFooter.querySelector(".footer-bottom");

    const footerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: finorixFooter,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    footerTimeline
        .from(footerBrand, {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        })
        .from(footerColumns, {
            y: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out"
        }, "-=0.4")
        .from(footerTrustItems, {
            y: 18,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.2")
        .from(footerBottom, {
            opacity: 0,
            duration: 0.5
        }, "-=0.15");
}