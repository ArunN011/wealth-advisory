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

    const adminNameElement = document.getElementById("finorixClientAdminName");
    const headerNameElement = document.getElementById("finorixClientHeaderName");
    const yearElement = document.getElementById("finorixClientYear");

    if (adminNameElement) {
        adminNameElement.textContent = adminName;
    }

    if (headerNameElement) {
        headerNameElement.textContent = adminName;
    }

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const sidebar = document.getElementById("finorixClientSidebar");
    const overlay = document.getElementById("finorixClientOverlay");
    const menuButton = document.getElementById("finorixClientMenuButton");
    const logoutButton = document.getElementById("finorixClientLogout");

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

        document.body.classList.add("finorix-client-scroll-locked");
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

        document.body.classList.remove("finorix-client-scroll-locked");

        window.scrollTo(0, savedScrollPosition);
    }

    function openSidebar() {
        if (window.innerWidth > 991) {
            return;
        }

        lockPageScroll();

        sidebar.classList.add("mobile-open");
        overlay.classList.add("active");

        menuButton.innerHTML = '<i class="bi bi-x-lg"></i>';
        menuButton.setAttribute("aria-label", "Close navigation menu");
        menuButton.setAttribute("aria-expanded", "true");
    }

    function closeSidebar(restoreFocus = false) {
        sidebar.classList.remove("mobile-open");
        overlay.classList.remove("active");

        menuButton.innerHTML = '<i class="bi bi-list"></i>';
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");

        unlockPageScroll();

        if (restoreFocus && window.innerWidth <= 991) {
            menuButton.focus({ preventScroll: true });
        }
    }

    menuButton.addEventListener("click", function () {
        if (sidebar.classList.contains("mobile-open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    overlay.addEventListener("click", function () {
        closeSidebar(true);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            if (sidebar.classList.contains("mobile-open")) {
                closeSidebar(true);
            }

            if (clientModal.classList.contains("active")) {
                closeClientModal(true);
            }
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 991 && sidebar.classList.contains("mobile-open")) {
            closeSidebar();
        }
    });

    document.querySelectorAll(".finorix-client-navigation a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 991) {
                closeSidebar();
            }
        });
    });

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

    const clientSearch = document.getElementById("finorixClientSearch");
    const statusFilter = document.getElementById("finorixClientStatusFilter");
    const planFilter = document.getElementById("finorixClientPlanFilter");
    const resetFiltersButton = document.getElementById("finorixClientResetFilters");
    const tableBody = document.getElementById("finorixClientTableBody");
    const emptyState = document.getElementById("finorixClientEmpty");
    const resultCount = document.getElementById("finorixClientResultCount");
    const pageInfo = document.getElementById("finorixClientPageInfo");
    const pageNumber = document.getElementById("finorixClientPageNumber");
    const previousButton = document.getElementById("finorixClientPrev");
    const nextButton = document.getElementById("finorixClientNext");
    const exportButton = document.getElementById("finorixClientExport");

    const clientModal = document.getElementById("finorixClientModal");
    const modalBackdrop = document.getElementById("finorixClientModalBackdrop");
    const modalCloseButton = document.getElementById("finorixClientModalClose");
    const cancelButton = document.getElementById("finorixClientCancel");
    const addClientButton = document.getElementById("finorixClientAddButton");
    const clientForm = document.getElementById("finorixClientForm");
    const modalTitle = document.getElementById("finorixClientModalTitle");
    const editIdField = document.getElementById("finorixClientEditId");
    const nameField = document.getElementById("finorixClientName");
    const emailField = document.getElementById("finorixClientEmail");
    const phoneField = document.getElementById("finorixClientPhone");
    const financialPlanField = document.getElementById("finorixClientFinancialPlan");
    const formStatusField = document.getElementById("finorixClientFormStatus");
    const formMessage = document.getElementById("finorixClientFormMessage");
    const toast = document.getElementById("finorixClientToast");

    const defaultClients = [
        {
            id: "CL1001",
            name: "Arun Kumar",
            email: "arun@example.com",
            phone: "+91 90000 10001",
            plan: "Wealth Growth",
            joined: "2026-10-03",
            status: "Active"
        },
        {
            id: "CL1002",
            name: "Shreya Patel",
            email: "shreya@example.com",
            phone: "+91 90000 10002",
            plan: "Retirement Planning",
            joined: "2026-09-28",
            status: "Active"
        },
        {
            id: "CL1003",
            name: "Rahul Verma",
            email: "rahul@example.com",
            phone: "+91 90000 10003",
            plan: "Tax Planning",
            joined: "2026-09-21",
            status: "Pending"
        },
        {
            id: "CL1004",
            name: "Priya Menon",
            email: "priya@example.com",
            phone: "+91 90000 10004",
            plan: "Education Planning",
            joined: "2026-09-16",
            status: "Active"
        },
        {
            id: "CL1005",
            name: "Karthik Raj",
            email: "karthik@example.com",
            phone: "+91 90000 10005",
            plan: "Wealth Growth",
            joined: "2026-09-10",
            status: "Inactive"
        },
        {
            id: "CL1006",
            name: "Divya Sharma",
            email: "divya@example.com",
            phone: "+91 90000 10006",
            plan: "Retirement Planning",
            joined: "2026-09-05",
            status: "Active"
        },
        {
            id: "CL1007",
            name: "Vikram Singh",
            email: "vikram@example.com",
            phone: "+91 90000 10007",
            plan: "Not Assigned",
            joined: "2026-08-27",
            status: "Pending"
        },
        {
            id: "CL1008",
            name: "Meera Krishnan",
            email: "meera@example.com",
            phone: "+91 90000 10008",
            plan: "Wealth Growth",
            joined: "2026-08-19",
            status: "Active"
        }
    ];

    const CLIENT_STORAGE_KEY = "finorixAdminClients";
    const PAGE_SIZE = 5;
    let currentPage = 1;
    let toastTimer;

    function loadClients() {
        try {
            const storedClients = localStorage.getItem(CLIENT_STORAGE_KEY);

            if (storedClients !== null) {
                const parsedClients = JSON.parse(storedClients);

                if (Array.isArray(parsedClients)) {
                    return parsedClients;
                }
            }
        } catch (error) {
            showToast("Unable to read saved client records.");
        }

        return defaultClients.map(function (client) {
            return { ...client };
        });
    }

    let clients = loadClients();

    function saveClients() {
        try {
            localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clients));
            return true;
        } catch (error) {
            showToast("Unable to save records in browser storage.");
            return false;
        }
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[character];
        });
    }

    function getInitials(name) {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(function (part) {
                return part.charAt(0);
            })
            .join("")
            .toUpperCase();
    }

    function getAvatarClass(index) {
        const classes = [
            "avatar-green",
            "avatar-blue",
            "avatar-orange",
            "avatar-purple",
            "avatar-rose"
        ];

        return classes[index % classes.length];
    }

    function getStatusClass(status) {
        if (status === "Active") {
            return "status-active";
        }

        if (status === "Pending") {
            return "status-pending";
        }

        return "status-inactive";
    }

    function formatDate(dateString) {
        const date = new Date(dateString + "T00:00:00");

        if (Number.isNaN(date.getTime())) {
            return "—";
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    function getFilteredClients() {
        const searchTerm = clientSearch.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;
        const selectedPlan = planFilter.value;

        return clients.filter(function (client) {
            const searchableText = [
                client.id,
                client.name,
                client.email,
                client.phone,
                client.plan
            ].join(" ").toLowerCase();

            const matchesSearch = searchableText.includes(searchTerm);

            const matchesStatus =
                selectedStatus === "all" ||
                client.status === selectedStatus;

            const matchesPlan =
                selectedPlan === "all" ||
                client.plan === selectedPlan;

            return matchesSearch && matchesStatus && matchesPlan;
        });
    }

    function updateStats() {
        const total = clients.length;
        const active = clients.filter(function (client) {
            return client.status === "Active";
        }).length;

        const pending = clients.filter(function (client) {
            return client.status === "Pending";
        }).length;

        const planned = clients.filter(function (client) {
            return client.plan !== "Not Assigned";
        }).length;

        document.getElementById("finorixClientTotal").textContent = total;
        document.getElementById("finorixClientActive").textContent = active;
        document.getElementById("finorixClientReviews").textContent = pending;
        document.getElementById("finorixClientPlans").textContent = planned;
    }

    function renderClients() {
        const filteredClients = getFilteredClients();
        const totalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));

        currentPage = Math.min(currentPage, totalPages);

        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const visibleClients = filteredClients.slice(
            startIndex,
            startIndex + PAGE_SIZE
        );

        tableBody.innerHTML = visibleClients.map(function (client) {
            const originalIndex = clients.findIndex(function (item) {
                return item.id === client.id;
            });

            return `
                <tr>
                    <td>
                        <div class="finorix-client-person">
                            <span class="finorix-client-person-avatar ${getAvatarClass(originalIndex)}">
                                ${escapeHTML(getInitials(client.name))}
                            </span>

                            <div class="finorix-client-person-info">
                                <strong>${escapeHTML(client.name)}</strong>
                                <span>${escapeHTML(client.email)}</span>
                            </div>
                        </div>
                    </td>

                    <td>
                        <span class="finorix-client-id">
                            ${escapeHTML(client.id)}
                        </span>
                    </td>

                    <td>
                        <span class="finorix-client-plan">
                            ${escapeHTML(client.plan)}
                        </span>
                    </td>

                    <td>${escapeHTML(formatDate(client.joined))}</td>

                    <td>
                        <span class="finorix-client-status ${getStatusClass(client.status)}">
                            ${escapeHTML(client.status)}
                        </span>
                    </td>

                    <td>
                        <div class="finorix-client-row-actions">

                            <button type="button"
                                class="finorix-client-row-action"
                                data-action="view"
                                data-id="${escapeHTML(client.id)}"
                                aria-label="View ${escapeHTML(client.name)}">

                                <i class="bi bi-eye"></i>

                            </button>

                            <button type="button"
                                class="finorix-client-row-action"
                                data-action="edit"
                                data-id="${escapeHTML(client.id)}"
                                aria-label="Edit ${escapeHTML(client.name)}">

                                <i class="bi bi-pencil"></i>

                            </button>

                            <button type="button"
                                class="finorix-client-row-action delete"
                                data-action="delete"
                                data-id="${escapeHTML(client.id)}"
                                aria-label="Delete ${escapeHTML(client.name)}">

                                <i class="bi bi-trash3"></i>

                            </button>

                        </div>
                    </td>
                </tr>
            `;
        }).join("");

        emptyState.hidden = filteredClients.length !== 0;

        resultCount.textContent =
            `Showing ${filteredClients.length} ${filteredClients.length === 1 ? "client" : "clients"}`;

        if (filteredClients.length === 0) {
            pageInfo.textContent = "No client records to display";
        } else {
            const first = startIndex + 1;
            const last = Math.min(startIndex + PAGE_SIZE, filteredClients.length);

            pageInfo.textContent =
                `Showing ${first}–${last} of ${filteredClients.length} clients`;
        }

        pageNumber.textContent = currentPage;
        previousButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= totalPages;

        updateStats();
    }

    function showToast(message) {
        if (!toast) {
            return;
        }

        toast.textContent = message;
        toast.classList.add("active");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {
            toast.classList.remove("active");
        }, 2800);
    }

    function openClientModal(client = null, viewOnly = false) {
        clientForm.reset();
        formMessage.textContent = "";
        editIdField.value = "";

        const formFields = clientForm.querySelectorAll("input, select");

        formFields.forEach(function (field) {
            if (field.type !== "hidden") {
                field.disabled = viewOnly;
            }
        });

        document.getElementById("finorixClientSave").hidden = viewOnly;

        if (client) {
            modalTitle.textContent = viewOnly ? "Client Details" : "Edit Client";
            editIdField.value = client.id;
            nameField.value = client.name;
            emailField.value = client.email;
            phoneField.value = client.phone;
            financialPlanField.value = client.plan;
            formStatusField.value = client.status;
        } else {
            modalTitle.textContent = "Add New Client";
        }

        clientModal.classList.add("active");
        clientModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        setTimeout(function () {
            if (viewOnly) {
                modalCloseButton.focus();
            } else {
                nameField.focus();
            }
        }, 50);
    }

    function closeClientModal(restoreFocus = false) {
        clientModal.classList.remove("active");
        clientModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        clientForm.querySelectorAll("input, select").forEach(function (field) {
            field.disabled = false;
        });

        document.getElementById("finorixClientSave").hidden = false;
        formMessage.textContent = "";

        if (restoreFocus) {
            addClientButton.focus({ preventScroll: true });
        }
    }

    addClientButton.addEventListener("click", function () {
        openClientModal();
    });

    modalCloseButton.addEventListener("click", function () {
        closeClientModal();
    });

    cancelButton.addEventListener("click", function () {
        closeClientModal();
    });

    modalBackdrop.addEventListener("click", function () {
        closeClientModal();
    });

    clientSearch.addEventListener("input", function () {
        currentPage = 1;
        renderClients();
    });

    statusFilter.addEventListener("change", function () {
        currentPage = 1;
        renderClients();
    });

    planFilter.addEventListener("change", function () {
        currentPage = 1;
        renderClients();
    });

    resetFiltersButton.addEventListener("click", function () {
        clientSearch.value = "";
        statusFilter.value = "all";
        planFilter.value = "all";
        currentPage = 1;
        renderClients();
    });

    previousButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderClients();
        }
    });

    nextButton.addEventListener("click", function () {
        const totalPages = Math.max(
            1,
            Math.ceil(getFilteredClients().length / PAGE_SIZE)
        );

        if (currentPage < totalPages) {
            currentPage++;
            renderClients();
        }
    });

    tableBody.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        const client = clients.find(function (item) {
            return item.id === button.dataset.id;
        });

        if (!client) {
            return;
        }

        if (button.dataset.action === "view") {
            openClientModal(client, true);
            return;
        }

        if (button.dataset.action === "edit") {
            openClientModal(client);
            return;
        }

        if (button.dataset.action === "delete") {
            const confirmed = window.confirm(
                `Delete the demo record for ${client.name}?`
            );

            if (!confirmed) {
                return;
            }

            const previousClients = clients.slice();

            clients = clients.filter(function (item) {
                return item.id !== client.id;
            });

            if (!saveClients()) {
                clients = previousClients;
                renderClients();
                return;
            }

            renderClients();
            showToast("Client record deleted.");
        }
    });

    clientForm.addEventListener("submit", function (event) {
        event.preventDefault();
        formMessage.textContent = "";

        if (!clientForm.reportValidity()) {
            return;
        }

        const id = editIdField.value.trim();
        const name = nameField.value.trim();
        const email = emailField.value.trim().toLowerCase();
        const phone = phoneField.value.trim();
        const plan = financialPlanField.value;
        const status = formStatusField.value;

        if (!name || !email || !phone || !plan || !status) {
            formMessage.textContent = "Please complete all required fields.";
            return;
        }

        const duplicateEmail = clients.some(function (client) {
            return client.email.toLowerCase() === email && client.id !== id;
        });

        if (duplicateEmail) {
            formMessage.textContent =
                "A client with this email address already exists.";
            return;
        }

        const previousClients = clients.slice();

        if (id) {
            const index = clients.findIndex(function (client) {
                return client.id === id;
            });

            if (index === -1) {
                formMessage.textContent = "Client record not found.";
                return;
            }

            clients[index] = {
                ...clients[index],
                name,
                email,
                phone,
                plan,
                status
            };
        } else {
            const numericIds = clients
                .map(function (client) {
                    const match = client.id.match(/^CL(\d+)$/);
                    return match ? Number(match[1]) : 1000;
                });

            const nextId = Math.max(1000, ...numericIds) + 1;

            clients.unshift({
                id: "CL" + nextId,
                name,
                email,
                phone,
                plan,
                status,
                joined: new Date().toISOString().slice(0, 10)
            });
        }

        if (!saveClients()) {
            clients = previousClients;
            return;
        }

        currentPage = 1;
        clientSearch.value = "";
        statusFilter.value = "all";
        planFilter.value = "all";

        renderClients();
        closeClientModal();

        showToast(id ? "Client record updated." : "New client added.");
    });



    exportButton.addEventListener("click", function () {
        window.location.href="error.html";
   });

    renderClients();

    if (typeof gsap !== "undefined") {
        gsap.from(".finorix-client-welcome", {
            opacity: 0,
            y: 20,
            duration: 0.65,
            ease: "power3.out"
        });

        gsap.from(".finorix-client-stat-card", {
            opacity: 0,
            y: 14,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.1,
            ease: "power2.out"
        });

        gsap.from(".finorix-client-directory", {
            opacity: 0,
            y: 15,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out"
        });
    }
});