
document.addEventListener("DOMContentLoaded", function () {
    const goBackButton = document.getElementById("finorixGoBack");
    const yearElement = document.getElementById("finorixErrorYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    function goBack() {
        const params = new URLSearchParams(window.location.search);
        const returnSection = params.get("return");

        if (returnSection && /^[a-zA-Z0-9_-]+$/.test(returnSection)) {
            const previousUrl = document.referrer;

            if (previousUrl) {
                try {
                    const url = new URL(previousUrl);

                    if (url.origin === window.location.origin) {
                        url.hash = returnSection;
                        window.location.href = url.href;
                        return;
                    }
                } catch (error) {
                    window.location.href = "index.html#" + encodeURIComponent(returnSection);
                    return;
                }
            }

            window.location.href = "index.html#" + encodeURIComponent(returnSection);
            return;
        }

        if (window.history.length > 1 && document.referrer) {
            try {
                const previousUrl = new URL(document.referrer);

                if (previousUrl.origin === window.location.origin) {
                    window.history.back();
                    return;
                }
            } catch (error) {
                window.location.href = "index.html";
                return;
            }
        }

        window.location.href = "index.html";
    }

    if (goBackButton) {
        goBackButton.addEventListener("click", goBack);
    }

    if (
        typeof gsap !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        gsap.from(".finorix-error-visual", {
            opacity: 0,
            x: -25,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from(".finorix-error-copy", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out"
        });

        gsap.from(".finorix-error-floating-card", {
            opacity: 0,
            y: 12,
            duration: 0.6,
            stagger: 0.12,
            delay: 0.45,
            ease: "power2.out"
        });
    }
});