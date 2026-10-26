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

    if (savedRole !== "admin") {
        if (savedRole === "user") {
            window.location.replace("user-dashboard.html");
        } else {
            window.location.replace("login.html");
        }

        return;
    }

    const adminName =
        localStorage.getItem("stacklyUsername") ||
        localStorage.getItem("userName") ||
        "Administrator";

    const sidebarName = document.getElementById("finorixAdminSidebarName");
    const headerName = document.getElementById("finorixAdminHeaderName");
    const welcomeName = document.getElementById("finorixAdminWelcomeName");
    const currentDate = document.getElementById("finorixAdminCurrentDate");
    const currentYear = document.getElementById("finorixAdminCurrentYear");

    if (sidebarName) {
        sidebarName.textContent = adminName;
        sidebarName.title = adminName;
    }

    if (headerName) {
        headerName.textContent = adminName;
        headerName.title = adminName;
    }

    if (welcomeName) {
        welcomeName.textContent = adminName.toUpperCase();
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

    const sidebar = document.getElementById("finorixAdminSidebar");
    const overlay = document.getElementById("finorixAdminOverlay");
    const menuButton = document.getElementById("finorixAdminMenuButton");
    const logoutButton = document.getElementById("finorixAdminLogout");

    let scrollLocked = false;
    let savedScrollPosition = 0;

    function lockAdminPageScroll() {
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

        document.body.classList.add("finorix-admin-sidebar-open");
    }

    function unlockAdminPageScroll() {
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

        document.body.classList.remove("finorix-admin-sidebar-open");

        window.scrollTo(0, savedScrollPosition);
    }

    function openAdminSidebar() {
        if (
            window.innerWidth > 991 ||
            !sidebar ||
            !overlay
        ) {
            return;
        }

        lockAdminPageScroll();

        sidebar.classList.add("mobile-open");
        overlay.classList.add("active");

        if (menuButton) {
            menuButton.innerHTML = '<i class="bi bi-x-lg"></i>';
            menuButton.setAttribute("aria-label", "Close navigation menu");
            menuButton.setAttribute("aria-expanded", "true");
        }
    }

    function closeAdminSidebar(restoreFocus = false) {
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

        unlockAdminPageScroll();

        if (restoreFocus && menuButton && window.innerWidth <= 991) {
            menuButton.focus({ preventScroll: true });
        }
    }

    if (menuButton) {
        menuButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (sidebar.classList.contains("mobile-open")) {
                closeAdminSidebar();
            } else {
                openAdminSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", function () {
            closeAdminSidebar(true);
        });
    }

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            sidebar &&
            sidebar.classList.contains("mobile-open")
        ) {
            closeAdminSidebar(true);
        }
    });

    window.addEventListener("resize", function () {
        if (
            window.innerWidth > 991 &&
            sidebar &&
            sidebar.classList.contains("mobile-open")
        ) {
            closeAdminSidebar();
        }
    });

    document.querySelectorAll(".finorix-admin-navigation a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 991) {
                closeAdminSidebar();
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
        const performanceCanvas = document.getElementById(
            "finorixAdminPerformanceChart"
        );

        if (performanceCanvas) {
            new Chart(performanceCanvas, {
                type: "line",
                data: {
                    labels: [
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct"
                    ],
                    datasets: [
                        {
                            label: "Portfolio value",
                            data: [
                                72000000,
                                75500000,
                                74000000,
                                78500000,
                                81000000,
                                84200000
                            ],
                            borderColor: "#328e80",
                            backgroundColor: "rgba(50, 142, 128, 0.12)",
                            borderWidth: 2.5,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 3,
                            pointHoverRadius: 5,
                            pointBackgroundColor: "#328e80",
                            pointBorderColor: "#ffffff",
                            pointBorderWidth: 2
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
                                    return "Portfolio value: " +
                                        new Intl.NumberFormat("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                            notation: "compact",
                                            maximumFractionDigits: 2
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
                            beginAtZero: false,
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
                                    return "₹" + (value / 10000000).toFixed(1) + "Cr";
                                }
                            }
                        }
                    }
                }
            });
        }

        const allocationCanvas = document.getElementById(
            "finorixAdminAllocationChart"
        );

        if (allocationCanvas) {
            new Chart(allocationCanvas, {
                type: "doughnut",
                data: {
                    labels: [
                        "Equity",
                        "Debt",
                        "Mutual Funds",
                        "Other Assets"
                    ],
                    datasets: [
                        {
                            data: [45, 25, 20, 10],
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
                                    return context.label + ": " +
                                        context.parsed + "%";
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    if (typeof gsap !== "undefined") {
        gsap.from(".finorix-admin-hero", {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out"
        });

        gsap.from(".finorix-admin-stat-card", {
            opacity: 0,
            y: 15,
            duration: 0.45,
            stagger: 0.08,
            delay: 0.1,
            ease: "power2.out"
        });

        gsap.from(".finorix-admin-action-card", {
            opacity: 0,
            y: 12,
            duration: 0.4,
            stagger: 0.07,
            delay: 0.15,
            ease: "power2.out"
        });

        gsap.from(".finorix-admin-panel, .finorix-admin-insight", {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            ease: "power2.out"
        });

        gsap.to(".finorix-admin-orbit-one", {
            rotation: 360,
            duration: 30,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".finorix-admin-orbit-two", {
            rotation: -360,
            duration: 22,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".finorix-admin-orbit-center", {
            y: -5,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
});