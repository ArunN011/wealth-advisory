
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("finorixAdminSidebar");
    const overlay = document.getElementById("finorixAdminOverlay");
    const menuButton = document.getElementById("finorixAdminMenuButton");
    const logoutButton = document.getElementById("finorixAdminLogout");
    const username = document.getElementById("finorixAdminUsername");
    const topUsername = document.getElementById("finorixAdminTopUsername");
    const dateElement = document.getElementById("finorixAdminDate");
    const yearElement = document.getElementById("finorixAdminYear");
    const searchInput = document.getElementById("finorixAdminInvestmentSearch");
    const tableBody = document.getElementById("finorixAdminInvestmentBody");
    const noResults = document.getElementById("finorixAdminNoResults");
    const investmentCount = document.getElementById("finorixAdminInvestmentCount");
    const exportButton = document.getElementById("finorixAdminExport");
    const performancePeriod = document.getElementById("finorixAdminPerformancePeriod");

    const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

    let performanceChart = null;
    let allocationChart = null;
    let previousBodyOverflow = "";
    let previousBodyPosition = "";
    let previousBodyTop = "";
    let previousBodyWidth = "";
    let savedScrollY = 0;

    function getStoredValue(keys) {
        for (const key of keys) {
            const value = localStorage.getItem(key);
            if (value && value.trim()) {
                return value.trim();
            }
        }

        return "";
    }

    function displayUsername() {
        const storedName = getStoredValue([
            "stacklyUsername",
            "userName",
            "username",
            "stacklyUserName"
        ]);

        const storedEmail = getStoredValue([
            "stacklyUserEmail",
            "userEmail"
        ]);

        let displayName = storedName;

        if (!displayName && storedEmail) {
            displayName = storedEmail.split("@")[0];
        }

        if (!displayName) {
            displayName = "mohanrk2003";
        }

        if (username) {
            username.textContent = displayName;
        }

        if (topUsername) {
            topUsername.textContent = displayName;
        }
    }

    function updateDate() {
        if (dateElement) {
            dateElement.textContent = new Intl.DateTimeFormat("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }).format(new Date()).toUpperCase();
        }

        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    function lockBackgroundScroll() {
        if (!mobileBreakpoint.matches) {
            return;
        }

        savedScrollY = window.scrollY;

        previousBodyOverflow = document.body.style.overflow;
        previousBodyPosition = document.body.style.position;
        previousBodyTop = document.body.style.top;
        previousBodyWidth = document.body.style.width;

        document.body.classList.add("finorix-admin-scroll-locked");
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.width = "100%";
    }

    function unlockBackgroundScroll() {
        document.body.classList.remove("finorix-admin-scroll-locked");
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.position = previousBodyPosition;
        document.body.style.top = previousBodyTop;
        document.body.style.width = previousBodyWidth;

        window.scrollTo(0, savedScrollY);
    }

    function openSidebar() {
        if (!mobileBreakpoint.matches || !sidebar || !overlay) {
            return;
        }

        sidebar.classList.add("mobile-open");
        overlay.classList.add("active");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "true");
            menuButton.setAttribute("aria-label", "Close navigation menu");
            menuButton.innerHTML = '<i class="bi bi-x-lg"></i>';
        }

        lockBackgroundScroll();
    }

    function closeSidebar() {
        if (!sidebar || !overlay) {
            return;
        }

        sidebar.classList.remove("mobile-open");
        overlay.classList.remove("active");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.innerHTML = '<i class="bi bi-list"></i>';
        }

        unlockBackgroundScroll();
    }

    function toggleSidebar() {
        if (!mobileBreakpoint.matches) {
            return;
        }

        if (sidebar.classList.contains("mobile-open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    if (menuButton) {
        menuButton.addEventListener("click", toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && sidebar && sidebar.classList.contains("mobile-open")) {
            closeSidebar();
        }
    });

    if (sidebar) {
        sidebar.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                if (mobileBreakpoint.matches) {
                    closeSidebar();
                }
            });
        });
    }

    mobileBreakpoint.addEventListener("change", function (event) {
        if (!event.matches && sidebar && sidebar.classList.contains("mobile-open")) {
            closeSidebar();
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            const shouldLogout = window.confirm("Are you sure you want to log out?");

            if (!shouldLogout) {
                return;
            }

            [
                "userEmail",
                "userRole",
                "userName",
                "username",
                "stacklyUserEmail",
                "stacklyUserRole",
                "stacklyUsername",
                "stacklyUserName",
                "isLoggedIn",
                "stacklyLoggedIn"
            ].forEach(function (key) {
                localStorage.removeItem(key);
            });

            window.location.href = "login.html";
        });
    }

    const investmentRows = Array.from(
        tableBody ? tableBody.querySelectorAll("tr") : []
    );

    function filterInvestments() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
        let visibleCount = 0;

        investmentRows.forEach(function (row) {
            const matches = row.textContent.toLowerCase().includes(query);

            row.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }

        if (investmentCount) {
            investmentCount.textContent = `Showing ${visibleCount} investment${visibleCount === 1 ? "" : "s"}`;
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterInvestments);
    }

    function exportInvestments() {
        window.location.href="error.html";
    }

    if (exportButton) {
        exportButton.addEventListener("click", exportInvestments);
    }

    function initializeCharts() {
        if (typeof Chart === "undefined") {
            return;
        }

        const performanceCanvas = document.getElementById("finorixAdminPerformanceChart");
        const allocationCanvas = document.getElementById("finorixAdminAllocationChart");

        if (performanceCanvas) {
            performanceChart = new Chart(performanceCanvas, {
                type: "line",
                data: {
                    labels: [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ],
                    datasets: [{
                        label: "Portfolio Value",
                        data: [18.2, 18.8, 19.1, 18.9, 20.3, 20.8, 21.4, 21.1, 22.3, 22.8, 23.9, 24.85],
                        borderColor: "#328e80",
                        backgroundColor: function (context) {
                            const chart = context.chart;
                            const chartArea = chart.chartArea;

                            if (!chartArea) {
                                return "rgba(50, 142, 128, 0.08)";
                            }

                            const gradient = chart.ctx.createLinearGradient(
                                0,
                                chartArea.top,
                                0,
                                chartArea.bottom
                            );

                            gradient.addColorStop(0, "rgba(50, 142, 128, 0.22)");
                            gradient.addColorStop(1, "rgba(50, 142, 128, 0.01)");

                            return gradient;
                        },
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2.5,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#328e80",
                        pointHoverBorderColor: "#ffffff",
                        pointHoverBorderWidth: 2
                    }]
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
                            padding: 10,
                            displayColors: false,
                            callbacks: {
                                label: function (context) {
                                    return `Portfolio: ₹${context.parsed.y.toFixed(2)}L`;
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
                                color: "#8a9890",
                                font: {
                                    size: 10
                                }
                            }
                        },
                        y: {
                            min: 15,
                            max: 27,
                            ticks: {
                                stepSize: 3,
                                color: "#8a9890",
                                font: {
                                    size: 10
                                },
                                callback: function (value) {
                                    return `₹${value}L`;
                                }
                            },
                            grid: {
                                color: "#edf1ed",
                                drawTicks: false
                            },
                            border: {
                                display: false,
                                dash: [4, 4]
                            }
                        }
                    }
                }
            });
        }

        if (allocationCanvas) {
            allocationChart = new Chart(allocationCanvas, {
                type: "doughnut",
                data: {
                    labels: ["Equity", "Mutual Funds", "Fixed Income", "Other Assets"],
                    datasets: [{
                        data: [45, 30, 15, 10],
                        backgroundColor: ["#102c26", "#328e80", "#b99358", "#b8c5bc"],
                        borderWidth: 3,
                        borderColor: "#ffffff",
                        hoverOffset: 5,
                        borderRadius: 3
                    }]
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
                            padding: 10,
                            callbacks: {
                                label: function (context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    function updatePerformancePeriod() {
        if (!performanceChart || !performancePeriod) {
            return;
        }

        const fullLabels = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const fullData = [
            18.2, 18.8, 19.1, 18.9, 20.3, 20.8,
            21.4, 21.1, 22.3, 22.8, 23.9, 24.85
        ];

        const months = Number(performancePeriod.value);
        const selectedLabels = fullLabels.slice(-months);
        const selectedData = fullData.slice(-months);

        performanceChart.data.labels = selectedLabels;
        performanceChart.data.datasets[0].data = selectedData;
        performanceChart.update();
    }

    if (performancePeriod) {
        performancePeriod.addEventListener("change", updatePerformancePeriod);
    }

    function animateDashboard() {
        if (typeof gsap === "undefined") {
            return;
        }

        gsap.from(".finorix-admin-welcome", {
            opacity: 0,
            y: 18,
            duration: 0.65,
            ease: "power2.out"
        });

        gsap.from(".finorix-admin-summary-card", {
            opacity: 0,
            y: 16,
            duration: 0.45,
            stagger: 0.08,
            delay: 0.1,
            ease: "power2.out"
        });

        gsap.from(".finorix-admin-dashboard-grid .finorix-admin-panel", {
            opacity: 0,
            y: 14,
            duration: 0.5,
            stagger: 0.12,
            delay: 0.2,
            ease: "power2.out"
        });

        gsap.from(".finorix-admin-investments-panel", {
            opacity: 0,
            y: 14,
            duration: 0.5,
            delay: 0.35,
            ease: "power2.out"
        });
    }

    displayUsername();
    updateDate();
    initializeCharts();
    animateDashboard();
});