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

    const sidebar = document.getElementById("investmentSidebar");
    const overlay = document.getElementById("investmentOverlay");
    const menuButton = document.getElementById("investmentMenuButton");
    const logoutButton = document.getElementById("investmentLogout");

    const displayName =
        localStorage.getItem("stacklyUsername") ||
        localStorage.getItem("userName") ||
        savedEmail.split("@")[0];

    const sidebarName = document.getElementById("investmentSidebarName");
    const headerName = document.getElementById("investmentHeaderName");
    const currentDate = document.getElementById("investmentCurrentDate");
    const currentYear = document.getElementById("investmentCurrentYear");

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

    function lockPageScroll() {
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

        document.body.classList.add("investment-sidebar-open");
    }

    function unlockPageScroll() {
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

        document.body.classList.remove("investment-sidebar-open");

        window.scrollTo(0, savedScrollPosition);
    }

    function openInvestmentSidebar() {
        if (window.innerWidth > 991 || !sidebar || !overlay) {
            return;
        }

        lockPageScroll();

        sidebar.classList.add("mobile-open");
        overlay.classList.add("active");

        if (menuButton) {
            menuButton.innerHTML = '<i class="bi bi-x-lg"></i>';
            menuButton.setAttribute("aria-label", "Close navigation menu");
            menuButton.setAttribute("aria-expanded", "true");
        }
    }

    function closeInvestmentSidebar(restoreFocus = false) {
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

        unlockPageScroll();

        if (restoreFocus && menuButton && window.innerWidth <= 991) {
            menuButton.focus({ preventScroll: true });
        }
    }

    if (menuButton) {
        menuButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (sidebar.classList.contains("mobile-open")) {
                closeInvestmentSidebar();
            } else {
                openInvestmentSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", function () {
            closeInvestmentSidebar(true);
        });
    }

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            sidebar &&
            sidebar.classList.contains("mobile-open")
        ) {
            closeInvestmentSidebar(true);
        }
    });

    window.addEventListener("resize", function () {
        if (
            window.innerWidth > 991 &&
            sidebar &&
            sidebar.classList.contains("mobile-open")
        ) {
            closeInvestmentSidebar();
        }
    });

    document.querySelectorAll(".investment-navigation a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 991) {
                closeInvestmentSidebar();
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

    const mobileHoldings = document.getElementById("investmentMobileHoldings");

    if (mobileHoldings) {
        const holdingRows = document.querySelectorAll(".investment-table tbody tr");

        holdingRows.forEach(function (row) {
            const productName =
                row.querySelector(".investment-product strong")?.textContent || "";

            const productDescription =
                row.querySelector(".investment-product span")?.textContent || "";

            const productIcon =
                row.querySelector(".investment-product-icon")?.innerHTML || "";

            const assetClass =
                row.querySelector(".investment-asset-badge")?.textContent || "";

            const investedAmount = row.children[2]?.textContent || "";
            const currentValue = row.children[3]?.textContent || "";
            const change = row.children[4]?.textContent || "";
            const isLoss = change.trim().startsWith("-");

            const card = document.createElement("article");
            card.className = "investment-mobile-holding";

            card.innerHTML = `
                <div class="investment-mobile-holding-top">
                    <div class="investment-product-icon">
                        ${productIcon}
                    </div>
                    <div>
                        <strong>${productName}</strong>
                        <span>${productDescription} · ${assetClass}</span>
                    </div>
                </div>
                <div class="investment-mobile-holding-bottom">
                    <div>
                        <span>Invested amount</span>
                        <strong>${investedAmount}</strong>
                    </div>
                    <div>
                        <span>Current value</span>
                        <strong>${currentValue}</strong>
                    </div>
                    <div>
                        <span>Change</span>
                        <strong class="${isLoss ? "investment-loss" : "investment-gain"}">
                            ${change}
                        </strong>
                    </div>
                    <div>
                        <span>Data status</span>
                        <strong>Illustrative</strong>
                    </div>
                </div>
            `;

            mobileHoldings.appendChild(card);
        });
    }

    if (typeof Chart !== "undefined") {
        const performanceCanvas = document.getElementById(
            "investmentPerformanceChart"
        );

        if (performanceCanvas) {
            new Chart(performanceCanvas, {
                type: "line",
                data: {
                    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
                    datasets: [
                        {
                            label: "Portfolio value",
                            data: [950000, 1010000, 985000, 1090000, 1160000, 1250000],
                            borderColor: "#328e80",
                            backgroundColor: "rgba(50, 142, 128, 0.12)",
                            borderWidth: 2.5,
                            fill: true,
                            tension: 0.38,
                            pointRadius: 3,
                            pointHoverRadius: 5,
                            pointBackgroundColor: "#328e80"
                        },
                        {
                            label: "Reference index",
                            data: [950000, 975000, 1000000, 1030000, 1070000, 1110000],
                            borderColor: "#b8c5bd",
                            backgroundColor: "transparent",
                            borderWidth: 2,
                            borderDash: [5, 5],
                            fill: false,
                            tension: 0.35,
                            pointRadius: 2,
                            pointHoverRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: "index"
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: "#102c26",
                            padding: 12,
                            titleFont: {
                                size: 11
                            },
                            bodyFont: {
                                size: 11
                            },
                            callbacks: {
                                label: function (context) {
                                    return context.dataset.label + ": " +
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
                                    return "₹" + (value / 100000).toFixed(1) + "L";
                                }
                            }
                        }
                    }
                }
            });
        }

        const allocationCanvas = document.getElementById(
            "investmentAllocationChart"
        );

        if (allocationCanvas) {
            new Chart(allocationCanvas, {
                type: "doughnut",
                data: {
                    labels: ["Equity", "Debt", "Gold", "Cash"],
                    datasets: [
                        {
                            data: [45, 30, 15, 10],
                            backgroundColor: [
                                "#328e80",
                                "#6d9ed8",
                                "#d6a657",
                                "#a7b4ab"
                            ],
                            borderWidth: 0,
                            hoverOffset: 5,
                            spacing: 3,
                            borderRadius: 4
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
                                    return context.label + ": " + context.parsed + "%";
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    if (typeof gsap !== "undefined") {
        gsap.from(".investment-hero", {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out"
        });

        gsap.from(".investment-metric-card", {
            opacity: 0,
            y: 15,
            duration: 0.45,
            stagger: 0.08,
            delay: 0.1,
            ease: "power2.out"
        });

        gsap.from(".investment-panel", {
            opacity: 0,
            y: 15,
            duration: 0.45,
            stagger: 0.08,
            delay: 0.2,
            ease: "power2.out"
        });

        gsap.to(".investment-orbit-one", {
            rotation: 360,
            duration: 28,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".investment-orbit-two", {
            rotation: -360,
            duration: 19,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".investment-orbit-dot", {
            scale: 1.4,
            opacity: 0.55,
            duration: 1.1,
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
            ease: "sine.inOut"
        });

        gsap.to(".investment-orbit-core", {
            y: -5,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
});