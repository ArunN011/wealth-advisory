
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const navLinks = document.getElementById("navLinks");
const menuOverlay = document.getElementById("menuOverlay");
const menuIcon = menuToggle.querySelector("i");
const mobileQuery = window.matchMedia("(max-width: 900px)");

function openMenu() {
    if (!mobileQuery.matches) return;

    navigation.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.classList.add("menu-open");

    menuIcon.classList.replace("fa-bars", "fa-xmark");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    menuOverlay.setAttribute("aria-hidden", "false");
}

function closeMenu() {
    navigation.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuIcon.classList.replace("fa-xmark", "fa-bars");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuOverlay.setAttribute("aria-hidden", "true");
}

menuToggle.addEventListener("click", function () {
    if (navigation.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

menuOverlay.addEventListener("click", closeMenu);

navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function (event) {
        const href = link.getAttribute("href");

        if (!href || href === "#") {
            event.preventDefault();
            closeMenu();
            return;
        }

        closeMenu();

        if (link.target === "_blank" || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            return;
        }

        if (href.startsWith("#")) {
            const target = document.querySelector(href);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", href);
            }
        }
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navigation.classList.contains("active")) {
        closeMenu();
        menuToggle.focus();
    }
});

mobileQuery.addEventListener("change", function (event) {
    if (!event.matches) {
        closeMenu();
    }
});

menuOverlay.setAttribute("aria-hidden", "true");

