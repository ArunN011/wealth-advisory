
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("finorixRegisterForm");
    const fullName = document.getElementById("finorixFullName");
    const email = document.getElementById("finorixRegisterEmail");
    const phone = document.getElementById("finorixPhone");
    const role = document.getElementById("finorixRegisterRole");
    const password = document.getElementById("finorixRegisterPassword");
    const confirmPassword = document.getElementById("finorixConfirmPassword");
    const terms = document.getElementById("finorixRegisterTerms");
    const message = document.getElementById("finorixRegisterMessage");
    const passwordBar = document.getElementById("finorixPasswordStrengthBar");
    const passwordStrengthText = document.getElementById("finorixPasswordStrengthText");
    const yearElement = document.getElementById("finorixRegisterYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    function setFieldState(input, errorId, errorText) {
        const errorElement = document.getElementById(errorId);
        const wrapper = input.closest(".finorix-register-input-wrapper");

        if (errorElement) {
            errorElement.textContent = errorText;
        }

        if (wrapper) {
            wrapper.classList.toggle("invalid", Boolean(errorText));
            wrapper.classList.toggle("valid", !errorText && input.value.trim() !== "");
        }

        input.setAttribute("aria-invalid", errorText ? "true" : "false");

        return errorText === "";
    }

    function clearMessage() {
        message.textContent = "";
        message.className = "finorix-register-message";
    }

    function validateName() {
        const value = fullName.value.trim();
        let error = "";

        if (!value) {
            error = "Please enter your full name.";
        } else if (value.length < 2) {
            error = "Name must contain at least 2 characters.";
        } else if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(value)) {
            error = "Please enter a valid name.";
        }

        return setFieldState(fullName, "finorixFullNameError", error);
    }

    function validateEmail() {
        const value = email.value.trim();
        let error = "";

        if (!value) {
            error = "Please enter your email address.";
        } else if (value.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
            error = "Please enter a valid email address.";
        }

        return setFieldState(email, "finorixRegisterEmailError", error);
    }

    function validatePhone() {
        const value = phone.value.trim();
        let error = "";

        if (!value) {
            error = "Please enter your phone number.";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
            error = "Enter a valid 10-digit Indian mobile number.";
        }

        return setFieldState(phone, "finorixPhoneError", error);
    }

    function validateRole() {
        let error = "";

        if (!role.value) {
            error = "Please select Client or User.";
        } else if (!["client", "user"].includes(role.value)) {
            error = "Please select a valid account type.";
        }

        return setFieldState(role, "finorixRegisterRoleError", error);
    }

    function getPasswordStrength(value) {
        let score = 0;

        if (value.length >= 8) score++;
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
        if (/\d/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        return score;
    }

    function updatePasswordStrength() {
        const value = password.value;
        const score = getPasswordStrength(value);

        const levels = [
            { width: "0%", color: "#dc3545", text: "Use at least 8 characters" },
            { width: "25%", color: "#dc3545", text: "Weak password" },
            { width: "50%", color: "#e5a23d", text: "Fair password" },
            { width: "75%", color: "#328e80", text: "Good password" },
            { width: "100%", color: "#168b65", text: "Strong password" }
        ];

        const level = value.length === 0 ? levels[0] : levels[score];

        passwordBar.style.width = level.width;
        passwordBar.style.backgroundColor = level.color;
        passwordStrengthText.textContent = level.text;
        passwordStrengthText.style.color = value.length ? level.color : "#87948c";
    }

    function validatePassword() {
        const value = password.value;
        let error = "";

        if (!value) {
            error = "Please create a password.";
        } else if (value.length < 8) {
            error = "Password must contain at least 8 characters.";
        } else if (value.length > 64) {
            error = "Password cannot exceed 64 characters.";
        } else if (!/[A-Z]/.test(value)) {
            error = "Include at least one uppercase letter.";
        } else if (!/[a-z]/.test(value)) {
            error = "Include at least one lowercase letter.";
        } else if (!/\d/.test(value)) {
            error = "Include at least one number.";
        } else if (!/[^A-Za-z0-9]/.test(value)) {
            error = "Include at least one special character.";
        }

        const valid = setFieldState(password, "finorixRegisterPasswordError", error);

        updatePasswordStrength();

        if (confirmPassword.value) {
            validateConfirmPassword();
        }

        return valid;
    }

    function validateConfirmPassword() {
        let error = "";

        if (!confirmPassword.value) {
            error = "Please confirm your password.";
        } else if (confirmPassword.value !== password.value) {
            error = "Passwords do not match.";
        }

        return setFieldState(confirmPassword, "finorixConfirmPasswordError", error);
    }

    function validateTerms() {
        const errorElement = document.getElementById("finorixRegisterTermsError");
        const error = terms.checked
            ? ""
            : "Please accept the Terms and Conditions and Privacy Policy.";

        errorElement.textContent = error;
        terms.setAttribute("aria-invalid", error ? "true" : "false");

        return error === "";
    }

    function validateForm() {
        const results = [
            validateName(),
            validateEmail(),
            validatePhone(),
            validateRole(),
            validatePassword(),
            validateConfirmPassword(),
            validateTerms()
        ];

        return results.every(Boolean);
    }

    fullName.addEventListener("input", function () {
        clearMessage();
        validateName();
    });

    email.addEventListener("input", function () {
        clearMessage();
        validateEmail();
    });

    phone.addEventListener("input", function () {
        phone.value = phone.value.replace(/\D/g, "").slice(0, 10);
        clearMessage();
        validatePhone();
    });

    role.addEventListener("change", function () {
        clearMessage();
        validateRole();
    });

    password.addEventListener("input", function () {
        clearMessage();
        updatePasswordStrength();

        if (password.value) {
            validatePassword();
        } else {
            setFieldState(password, "finorixRegisterPasswordError", "");
        }
    });

    confirmPassword.addEventListener("input", function () {
        clearMessage();

        if (confirmPassword.value) {
            validateConfirmPassword();
        } else {
            setFieldState(confirmPassword, "finorixConfirmPasswordError", "");
        }
    });

    terms.addEventListener("change", function () {
        clearMessage();
        validateTerms();
    });

    document.querySelectorAll(".finorix-register-password-toggle").forEach(function (button) {
        button.addEventListener("click", function () {
            const target = document.getElementById(button.dataset.target);

            if (!target) {
                return;
            }

            const showPassword = target.type === "password";
            target.type = showPassword ? "text" : "password";

            button.innerHTML = showPassword
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

            button.setAttribute(
                "aria-label",
                showPassword ? "Hide password" : "Show password"
            );
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearMessage();

        if (!validateForm()) {
            const firstInvalid = form.querySelector('[aria-invalid="true"]');

            if (firstInvalid) {
                firstInvalid.focus();
            }

            return;
        }

        window.location.href = "login.html";
    });

    if (
        typeof gsap !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        gsap.from(".finorix-register-promo-content", {
            opacity: 0,
            x: -20,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from(".finorix-register-form-wrapper", {
            opacity: 0,
            y: 16,
            duration: 0.7,
            delay: 0.12,
            ease: "power2.out"
        });
    }
});
