if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const blogHero = document.querySelector(".finorix-blog-hero");

    if (blogHero) {
        const breadcrumb = blogHero.querySelector(".finorix-blog-breadcrumb");
        const eyebrow = blogHero.querySelector(".finorix-blog-eyebrow");
        const heading = blogHero.querySelector(".finorix-blog-hero-content h1");
        const description = blogHero.querySelector(".finorix-blog-description");
        const actions = blogHero.querySelector(".finorix-blog-hero-actions");
        const meta = blogHero.querySelector(".finorix-blog-hero-meta");
        const visual = blogHero.querySelector(".finorix-blog-hero-visual");
        const floatingCard = blogHero.querySelector(".finorix-blog-floating-card");

        const heroTimeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        heroTimeline
            .from(breadcrumb, {
                y: 15,
                opacity: 0,
                duration: 0.5
            })
            .from(eyebrow, {
                y: 18,
                opacity: 0,
                duration: 0.5
            }, "-=0.25")
            .from(heading, {
                y: 35,
                opacity: 0,
                duration: 0.8
            }, "-=0.2")
            .from(description, {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, "-=0.4")
            .from(actions, {
                y: 18,
                opacity: 0,
                duration: 0.5
            }, "-=0.3")
            .from(meta, {
                y: 18,
                opacity: 0,
                duration: 0.5
            }, "-=0.25")
            .from(visual, {
                x: 35,
                opacity: 0,
                duration: 0.9
            }, "-=1")
            .from(floatingCard, {
                y: 18,
                opacity: 0,
                duration: 0.5
            }, "-=0.3");
    }
}


if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {
    gsap.registerPlugin(ScrollTrigger);

    const featuredArticles = document.querySelector(
        ".finorix-featured-articles"
    );

    if (featuredArticles) {
        const heading = featuredArticles.querySelector(
            ".finorix-articles-heading"
        );

        const articleCards = featuredArticles.querySelectorAll(
            ".finorix-article-card"
        );

        const bottomText = featuredArticles.querySelector(
            ".finorix-articles-bottom"
        );

        gsap.from(heading, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                once: true
            }
        });

        gsap.from(articleCards, {
            y: 45,
            opacity: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
                trigger: featuredArticles,
                start: "top 75%",
                once: true
            }
        });

        gsap.from(bottomText, {
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bottomText,
                start: "top 95%",
                once: true
            }
        });
    }
}

if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {
    gsap.registerPlugin(ScrollTrigger);

    const categoriesSection = document.querySelector(
        ".finorix-blog-categories"
    );

    if (categoriesSection) {
        const categoriesHeading = categoriesSection.querySelector(
            ".finorix-categories-heading"
        );

        const categoryCards = categoriesSection.querySelectorAll(
            ".finorix-category-card"
        );

        const categoriesFooter = categoriesSection.querySelector(
            ".finorix-categories-footer"
        );

        gsap.from(categoriesHeading, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: categoriesHeading,
                start: "top 85%",
                once: true
            }
        });

        gsap.from(categoryCards, {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: categoryCards[0],
                start: "top 85%",
                once: true
            }
        });

        gsap.from(categoriesFooter, {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: categoriesFooter,
                start: "top 90%",
                once: true
            }
        });
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const insightsSection = document.querySelector(
        ".finorix-latest-insights"
    );

    if (!insightsSection) {
        return;
    }

    const cards = Array.from(
        insightsSection.querySelectorAll(".finorix-insight-card")
    );

    const filterButtons = Array.from(
        insightsSection.querySelectorAll(".finorix-filter-btn")
    );

    const searchForm = insightsSection.querySelector(
        "#insightsSearchForm"
    );

    const searchInput = insightsSection.querySelector(
        "#insightsSearchInput"
    );

    const grid = insightsSection.querySelector("#insightsGrid");
    const emptyState = insightsSection.querySelector("#insightsEmpty");
    const pagination = insightsSection.querySelector(
        "#insightsPagination"
    );

    const pageNumbers = insightsSection.querySelector(
        "#insightsPageNumbers"
    );

    const previousButton = insightsSection.querySelector("#insightsPrev");
    const nextButton = insightsSection.querySelector("#insightsNext");
    const resetButton = insightsSection.querySelector("#resetInsights");
    const countElement = insightsSection.querySelector("#insightCount");
    const statusElement = insightsSection.querySelector(
        "#insightsPageStatus"
    );

    const pageSize = 3;

    let currentPage = 1;
    let activeFilter = "all";
    let searchTerm = "";

    function getFilteredCards() {
        return cards.filter(function (card) {
            const category = card.dataset.category || "";
            const title = card.dataset.title || "";
            const description = card.dataset.description || "";
            const cardText = (
                title + " " + description + " " + category
            ).toLowerCase();

            const matchesCategory =
                activeFilter === "all" || category === activeFilter;

            const matchesSearch = cardText.includes(searchTerm);

            return matchesCategory && matchesSearch;
        });
    }

    function renderPagination(totalPages) {
        pageNumbers.replaceChildren();

        for (let page = 1; page <= totalPages; page++) {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "finorix-page-number";
            button.textContent = String(page);
            button.setAttribute(
                "aria-label",
                "Go to page " + page
            );

            if (page === currentPage) {
                button.classList.add("active");
                button.setAttribute("aria-current", "page");
            }

            button.addEventListener("click", function () {
                currentPage = page;
                renderArticles(true);
            });

            pageNumbers.appendChild(button);
        }

        pagination.hidden = totalPages <= 1;

        previousButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= totalPages;
    }

    function renderArticles(shouldScroll) {
        const filteredCards = getFilteredCards();
        const totalPages = Math.ceil(filteredCards.length / pageSize);

        if (totalPages > 0 && currentPage > totalPages) {
            currentPage = totalPages;
        }

        if (totalPages === 0) {
            currentPage = 1;
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const visibleCards = filteredCards.slice(startIndex, endIndex);

        cards.forEach(function (card) {
            card.hidden = true;
        });

        visibleCards.forEach(function (card) {
            card.hidden = false;
        });

        countElement.textContent = String(filteredCards.length).padStart(
            2,
            "0"
        );

        emptyState.hidden = filteredCards.length !== 0;
        grid.hidden = filteredCards.length === 0;

        renderPagination(totalPages);

        if (filteredCards.length > 0) {
            statusElement.textContent =
                "Showing " +
                (startIndex + 1) +
                "–" +
                Math.min(endIndex, filteredCards.length) +
                " of " +
                filteredCards.length +
                " articles";
        } else {
            statusElement.textContent = "No articles match your search.";
        }

        if (
            shouldScroll &&
            typeof gsap !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            insightsSection.scrollIntoView({
                behavior: "auto",
                block: "start"
            });
        } else if (shouldScroll) {
            insightsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        if (
            typeof gsap !== "undefined" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            gsap.fromTo(
                visibleCards,
                {
                    y: 15,
                    opacity: 1
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.35,
                    stagger: 0.07,
                    ease: "power2.out",
                    clearProps: "transform"
                }
            );
        }
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.dataset.filter || "all";
            currentPage = 1;

            filterButtons.forEach(function (filterButton) {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            renderArticles(false);
        });
    });

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        searchTerm = searchInput.value.trim().toLowerCase();
        currentPage = 1;

        renderArticles(false);
    });

    searchInput.addEventListener("input", function () {
        searchTerm = searchInput.value.trim().toLowerCase();
        currentPage = 1;

        renderArticles(false);
    });

    previousButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderArticles(true);
        }
    });

    nextButton.addEventListener("click", function () {
        const totalPages = Math.ceil(
            getFilteredCards().length / pageSize
        );

        if (currentPage < totalPages) {
            currentPage++;
            renderArticles(true);
        }
    });

    resetButton.addEventListener("click", function () {
        activeFilter = "all";
        searchTerm = "";
        currentPage = 1;

        searchInput.value = "";

        filterButtons.forEach(function (button) {
            const isActive = button.dataset.filter === "all";

            button.classList.toggle("active", isActive);
            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });

        renderArticles(false);
    });

    renderArticles(false);

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {
        gsap.registerPlugin(ScrollTrigger);

        const heading = insightsSection.querySelector(
            ".finorix-insights-heading"
        );

        const toolbar = insightsSection.querySelector(
            ".finorix-insights-toolbar"
        );

        gsap.from(heading, {
            y: 30,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                once: true
            }
        });

        gsap.from(toolbar, {
            y: 20,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: toolbar,
                start: "top 90%",
                once: true
            }
        });

        gsap.from(cards, {
            y: 30,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: grid,
                start: "top 85%",
                once: true
            }
        });
    }
});


const finorixFooter = document.querySelector(".finorix-footer");

if (finorixFooter) {
    const footerBrand = finorixFooter.querySelector(".footer-brand");
    const footerColumns = finorixFooter.querySelectorAll(".footer-column");
    const footerTrustItems = finorixFooter.querySelectorAll(".footer-trust-item");
    const footerBottom = finorixFooter.querySelector(".footer-bottom");

    const footerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: finorixFooter,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    footerTimeline
        .from(footerBrand, {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        })
        .from(footerColumns, {
            y: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out"
        }, "-=0.4")
        .from(footerTrustItems, {
            y: 18,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.2")
        .from(footerBottom, {
            opacity: 0,
            duration: 0.5
        }, "-=0.15");
}