document.addEventListener("DOMContentLoaded", function () {
    const finorixLoginForm = document.getElementById("finorixLoginForm");

    if (!finorixLoginForm) {
        return;
    }

    const finorixEmailInput = document.getElementById("finorixEmail");
    const finorixPasswordInput = document.getElementById("finorixPassword");
    const finorixRememberInput = document.getElementById("finorixRemember");
    const finorixPasswordToggle = document.getElementById("finorixPasswordToggle");
    const finorixRoleStatus = document.getElementById("finorixRoleStatus");
    const finorixGeneralError = document.getElementById("finorixLoginGeneralError");
    const finorixSubmitButton = finorixLoginForm.querySelector(".finorix-login-submit");
    const finorixRoleCards = document.querySelectorAll(".finorix-role-card");

    let finorixSelectedRole = "user";

    function finorixSetFieldError(input, errorElement, message) {
        const wrapper = input.closest(".finorix-login-input-wrapper");

        errorElement.textContent = message;

        if (wrapper) {
            wrapper.classList.toggle("invalid", Boolean(message));
        }

        input.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function finorixClearGeneralError() {
        finorixGeneralError.textContent = "";
        finorixGeneralError.classList.remove("visible");
    }

    function finorixShowGeneralError(message) {
        finorixGeneralError.textContent = message;
        finorixGeneralError.classList.add("visible");
    }

    function finorixValidateEmail() {
        const email = finorixEmailInput.value.trim();
        const emailError = document.getElementById("finorixEmailError");

        if (!email) {
            finorixSetFieldError(
                finorixEmailInput,
                emailError,
                "Please enter your email address."
            );
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            finorixSetFieldError(
                finorixEmailInput,
                emailError,
                "Please enter a valid email address."
            );
            return false;
        }

        finorixSetFieldError(finorixEmailInput, emailError, "");
        return true;
    }

    function finorixValidatePassword() {
        const password = finorixPasswordInput.value;
        const passwordError = document.getElementById("finorixPasswordError");

        if (!password.trim()) {
            finorixSetFieldError(
                finorixPasswordInput,
                passwordError,
                "Please enter your password."
            );
            return false;
        }

        finorixSetFieldError(finorixPasswordInput, passwordError, "");
        return true;
    }

    finorixRoleCards.forEach(function (card) {
        card.addEventListener("click", function () {
            finorixSelectedRole = card.dataset.role;

            finorixRoleCards.forEach(function (roleCard) {
                const isSelected = roleCard === card;

                roleCard.classList.toggle("active", isSelected);
                roleCard.setAttribute("aria-pressed", String(isSelected));
            });

            const roleLabel = finorixSelectedRole === "admin" ? "Admin" : "User";

            finorixRoleStatus.querySelector("span").textContent =
                roleLabel + " login selected";

            finorixClearGeneralError();
        });
    });

    finorixPasswordToggle.addEventListener("click", function () {
        const isPasswordHidden = finorixPasswordInput.type === "password";

        finorixPasswordInput.type = isPasswordHidden ? "text" : "password";

        finorixPasswordToggle.innerHTML = isPasswordHidden
            ? '<i class="fa-regular fa-eye-slash"></i>'
            : '<i class="fa-regular fa-eye"></i>';

        finorixPasswordToggle.setAttribute(
            "aria-label",
            isPasswordHidden ? "Hide password" : "Show password"
        );
    });

    finorixEmailInput.addEventListener("input", function () {
        finorixValidateEmail();
        finorixClearGeneralError();
    });

    finorixPasswordInput.addEventListener("input", function () {
        finorixValidatePassword();
        finorixClearGeneralError();
    });

    function finorixRestoreRememberedEmail() {
        try {
            const rememberedEmail = localStorage.getItem("finorixRememberedEmail");

            if (rememberedEmail) {
                finorixEmailInput.value = rememberedEmail;
                finorixRememberInput.checked = true;
            }
        } catch (error) {
            finorixRememberInput.checked = false;
        }
    }

    finorixRestoreRememberedEmail();

    finorixLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        finorixClearGeneralError();

        const emailValid = finorixValidateEmail();
        const passwordValid = finorixValidatePassword();

        if (!emailValid || !passwordValid) {
            const firstInvalidInput = finorixLoginForm.querySelector(
                '.finorix-login-input-wrapper.invalid input'
            );

            if (firstInvalidInput) {
                firstInvalidInput.focus();
            }

            return;
        }

        const email = finorixEmailInput.value.trim().toLowerCase();
        const password = finorixPasswordInput.value;

        finorixSubmitButton.disabled = true;
        finorixSubmitButton.classList.add("loading");

        try {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userRole", finorixSelectedRole);
            localStorage.setItem("stacklyUsername", email.split("@")[0]);

            if (finorixRememberInput.checked) {
                localStorage.setItem("finorixRememberedEmail", email);
            } else {
                localStorage.removeItem("finorixRememberedEmail");
            }

            sessionStorage.setItem("finorixLoginAttempt", "true");

            if (finorixSelectedRole === "admin") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "user-dashboard.html";
            }
        } catch (error) {
            finorixSubmitButton.disabled = false;
            finorixSubmitButton.classList.remove("loading");

            finorixShowGeneralError(
                "Your browser could not save the session information. Please enable site storage and try again."
            );
        }
    });

    if (typeof gsap !== "undefined") {
        const finorixLoginShell = document.querySelector(".finorix-login-shell");
        const finorixPromo = document.querySelector(".finorix-login-promo");
        const finorixFormWrapper = document.querySelector(".finorix-login-form-wrapper");

        if (finorixLoginShell) {
            gsap.from(finorixLoginShell, {
                opacity: 0,
                y: 20,
                duration: 0.7,
                ease: "power3.out"
            });
        }

        if (finorixPromo && window.matchMedia("(min-width: 761px)").matches) {
            gsap.from(finorixPromo, {
                opacity: 0,
                x: -25,
                duration: 0.8,
                delay: 0.1,
                ease: "power3.out"
            });
        }

        if (finorixFormWrapper) {
            gsap.from(finorixFormWrapper, {
                opacity: 0,
                y: 18,
                duration: 0.7,
                delay: 0.15,
                ease: "power3.out"
            });
        }
    }
});
window.addEventListener("pageshow", function () {
    const loginButton = document.querySelector(".finorix-login-submit");
    const loginForm = document.getElementById("finorixLoginForm");

    if (!loginButton || !loginForm) {
        return;
    }

    loginButton.disabled = false;
    loginButton.classList.remove("loading");

    const buttonText = loginButton.querySelector("span");

    if (buttonText && !buttonText.classList.contains("finorix-login-loader")) {
        buttonText.textContent = "Sign In";
    }

    const loader = loginButton.querySelector(".finorix-login-loader");

    if (loader) {
        loader.style.display = "";
    }
});