
document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("stacklyPreloader");

    if (!preloader) {
        return;
    }

    let isHidden = false;

    function hidePreloader() {
        if (isHidden) {
            return;
        }

        isHidden = true;
        preloader.classList.add("stackly-preloader-hidden");

        window.setTimeout(function () {
            preloader.remove();
        }, 600);
    }

    if (document.readyState === "complete") {
        window.setTimeout(hidePreloader, 500);
    } else {
        window.addEventListener("load", function () {
            window.setTimeout(hidePreloader, 500);
        }, { once: true });
    }

    window.setTimeout(hidePreloader, 8000);
});