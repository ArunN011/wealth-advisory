document.addEventListener("DOMContentLoaded", function () {
    const savedEmail =
        localStorage.getItem("userEmail") ||
        localStorage.getItem("stacklyUserEmail") ||
        "";

    const savedRole = (
        localStorage.getItem("userRole") ||
        localStorage.getItem("stacklyUserRole") ||
        ""
    ).trim().toLowerCase();

    const isLoggedIn =
        localStorage.getItem("stacklyLoggedIn") === "true" ||
        localStorage.getItem("isLoggedIn") === "true" ||
        Boolean(savedEmail && savedRole);

    if (!savedEmail || !savedRole || !isLoggedIn) {
        window.location.replace("login.html");
        return;
    }

    if (savedRole === "admin") {
        window.location.replace("admin-dashboard.html");
        return;
    }

    if (savedRole !== "user") {
        window.location.replace("login.html");
        return;
    }

    const sidebar = document.getElementById("financialSidebar");
    const overlay = document.getElementById("financialOverlay");
    const menuButton = document.getElementById("financialMenuButton");
    const logoutButton = document.getElementById("financialLogout");

    const displayName =
        localStorage.getItem("stacklyUsername") ||
        localStorage.getItem("userName") ||
        savedEmail.split("@")[0];

    const sidebarName = document.getElementById("financialSidebarName");
    const headerName = document.getElementById("financialHeaderName");
    const currentDate = document.getElementById("financialCurrentDate");
    const currentYear = document.getElementById("financialCurrentYear");

    if (sidebarName) {
        sidebarName.textContent = savedEmail;
        sidebarName.title = savedEmail;
    }

    if (headerName) {
        headerName.textContent = displayName;
        headerName.title = displayName;
    }

    if (currentDate) {
        currentDate.textContent = new Date()
            .toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            })
            .toUpperCase();
    }

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    let scrollLocked = false;
    let savedScrollPosition = 0;

    function lockFinancialPageScroll() {
        if (scrollLocked) {
            return;
        }

        savedScrollPosition = window.scrollY;
        scrollLocked = true;

        document.documentElement.style.overflow = "hidden";

        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollPosition}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";

        document.body.classList.add("financial-sidebar-open");
    }

    function unlockFinancialPageScroll() {
        if (!scrollLocked) {
            return;
        }

        scrollLocked = false;

        document.documentElement.style.overflow = "";

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";

        document.body.classList.remove("financial-sidebar-open");

        window.scrollTo(0, savedScrollPosition);
    }

    function openFinancialSidebar() {
        if (
            window.innerWidth > 991 ||
            !sidebar ||
            !overlay
        ) {
            return;
        }

        lockFinancialPageScroll();

        sidebar.classList.add("mobile-open");
        overlay.classList.add("active");

        if (menuButton) {
            menuButton.innerHTML = '<i class="bi bi-x-lg"></i>';
            menuButton.setAttribute("aria-label", "Close navigation menu");
            menuButton.setAttribute("aria-expanded", "true");
        }
    }

    function closeFinancialSidebar(restoreFocus = false) {
        if (!sidebar || !overlay) {
            return;
        }

        sidebar.classList.remove("mobile-open");
        overlay.classList.remove("active");

        if (menuButton) {
            menuButton.innerHTML = '<i class="bi bi-list"></i>';
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.setAttribute("aria-expanded", "false");
        }

        unlockFinancialPageScroll();

        if (restoreFocus && menuButton && window.innerWidth <= 991) {
            menuButton.focus({ preventScroll: true });
        }
    }

    if (menuButton) {
        menuButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (sidebar.classList.contains("mobile-open")) {
                closeFinancialSidebar();
            } else {
                openFinancialSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", function () {
            closeFinancialSidebar(true);
        });
    }

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            sidebar &&
            sidebar.classList.contains("mobile-open")
        ) {
            closeFinancialSidebar(true);
        }
    });

    window.addEventListener("resize", function () {
        if (
            window.innerWidth > 991 &&
            sidebar &&
            sidebar.classList.contains("mobile-open")
        ) {
            closeFinancialSidebar();
        }
    });

    document.querySelectorAll(".financial-navigation a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 991) {
                closeFinancialSidebar();
            }
        });
    });

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            [
                "userEmail",
                "userRole",
                "userName",
                "stacklyUserEmail",
                "stacklyUserRole",
                "stacklyUsername",
                "stacklyLoggedIn",
                "isLoggedIn",
                "stacklyUserPassword",
                "rememberMe",
                "stacklyRememberMe"
            ].forEach(function (key) {
                localStorage.removeItem(key);
            });

            sessionStorage.clear();

            window.location.replace("login.html");
        });
    }

    if (typeof Chart !== "undefined") {
        const contributionCanvas = document.getElementById(
            "financialContributionChart"
        );

        if (contributionCanvas) {
            new Chart(contributionCanvas, {
                type: "bar",
                data: {
                    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
                    datasets: [
                        {
                            label: "Monthly contribution",
                            data: [15000, 20000, 18000, 25000, 22000, 25000],
                            backgroundColor: [
                                "#b6d8c8",
                                "#b6d8c8",
                                "#b6d8c8",
                                "#328e80",
                                "#b6d8c8",
                                "#328e80"
                            ],
                            borderRadius: 6,
                            maxBarThickness: 32
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: "#102c26",
                            padding: 12,
                            callbacks: {
                                label: function (context) {
                                    return "Contribution: " +
                                        new Intl.NumberFormat("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                            maximumFractionDigits: 0
                                        }).format(context.parsed.y);
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            border: {
                                display: false
                            },
                            ticks: {
                                color: "#7c8b81",
                                font: {
                                    size: 10
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            border: {
                                display: false
                            },
                            grid: {
                                color: "#edf2ee"
                            },
                            ticks: {
                                color: "#7c8b81",
                                font: {
                                    size: 10
                                },
                                maxTicksLimit: 5,
                                callback: function (value) {
                                    return "₹" + (value / 1000) + "k";
                                }
                            }
                        }
                    }
                }
            });
        }

        const distributionCanvas = document.getElementById(
            "financialDistributionChart"
        );

        if (distributionCanvas) {
            new Chart(distributionCanvas, {
                type: "doughnut",
                data: {
                    labels: [
                        "Dream Home",
                        "Education",
                        "Retirement",
                        "Emergency"
                    ],
                    datasets: [
                        {
                            data: [500000, 250000, 200000, 100000],
                            backgroundColor: [
                                "#328e80",
                                "#6d9ed8",
                                "#d6a657",
                                "#a7b4ab"
                            ],
                            borderWidth: 0,
                            spacing: 3,
                            borderRadius: 4,
                            hoverOffset: 5
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "76%",
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: "#102c26",
                            padding: 12,
                            callbacks: {
                                label: function (context) {
                                    const total = context.dataset.data.reduce(
                                        (sum, value) => sum + value,
                                        0
                                    );

                                    const percentage = (
                                        context.parsed / total * 100
                                    ).toFixed(1);

                                    return context.label + ": " + percentage + "%";
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    if (typeof gsap !== "undefined") {
        gsap.from(".financial-hero", {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out"
        });

        gsap.from(".financial-overview-card", {
            opacity: 0,
            y: 15,
            duration: 0.45,
            stagger: 0.08,
            delay: 0.1,
            ease: "power2.out"
        });

        gsap.from(".financial-goal-card", {
            opacity: 0,
            y: 18,
            duration: 0.45,
            stagger: 0.09,
            delay: 0.15,
            ease: "power2.out"
        });

        gsap.from(".financial-panel, .financial-planning-card, .financial-reminder", {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            ease: "power2.out"
        });

        gsap.to(".financial-circle-one", {
            rotation: 360,
            duration: 30,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".financial-circle-two", {
            rotation: -360,
            duration: 22,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".financial-hero-center", {
            y: -5,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".financial-floating-card", {
            y: -5,
            duration: 1.6,
            repeat: -1,
            yoyo: true,
            stagger: 0.4,
            ease: "sine.inOut"
        });
    }
});