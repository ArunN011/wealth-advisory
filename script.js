
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















gsap.registerPlugin(ScrollTrigger);

const financialCards = document.querySelectorAll(".financial-service-card");

gsap.fromTo(
    financialCards,
    {
        y: 65,
        opacity: 0,
        scale: 0.96
    },
    {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".financial-services-section",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    }
);

gsap.from(".service-icon", {
    scale: 0.5,
    rotation: -15,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".financial-services-section",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.registerPlugin(ScrollTrigger);

const aboutSection = document.querySelector(".about-finorix-section");

if (aboutSection) {
    const aboutImage = aboutSection.querySelector(".about-main-image");
    const planningCard = aboutSection.querySelector(".planning-card");
    const experienceBadge = aboutSection.querySelector(".about-experience-badge");
    const aboutHeading = aboutSection.querySelector(".about-content h2");
    const aboutEyebrow = aboutSection.querySelector(".about-eyebrow");
    const aboutDescriptions = aboutSection.querySelectorAll(
        ".about-description, .about-secondary-description"
    );
    const aboutBenefits = aboutSection.querySelectorAll(".about-benefit");
    const aboutStats = aboutSection.querySelectorAll(".about-stat");
    const aboutButton = aboutSection.querySelector(".about-cta");
    const progressBars = aboutSection.querySelectorAll(".planning-progress-track span");

    const aboutTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: aboutSection,
            start: "top 78%",
            toggleActions: "play none none none"
        }
    });

    aboutTimeline
        .from(aboutImage, {
            x: -65,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        .from(experienceBadge, {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.5)"
        }, "-=0.55")
        .from(planningCard, {
            x: 55,
            y: 25,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.4")
        .from(aboutEyebrow, {
            y: 15,
            opacity: 0,
            duration: 0.4
        }, "-=0.7")
        .from(aboutHeading, {
            y: 35,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.25")
        .from(aboutDescriptions, {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.15
        }, "-=0.4")
        .from(aboutBenefits, {
            x: 20,
            opacity: 0,
            duration: 0.45,
            stagger: 0.12
        }, "-=0.25")
        .from(aboutStats, {
            y: 25,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15
        }, "-=0.2")
        .from(aboutButton, {
            y: 15,
            opacity: 0,
            duration: 0.45
        }, "-=0.2")
        .from(progressBars, {
            scaleX: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out"
        }, "-=0.8");

    aboutStats.forEach((stat) => {
        const numberElement = stat.querySelector(".stat-number");

        if (!numberElement) {
            return;
        }

        const target = Number(numberElement.dataset.target);

        if (!Number.isFinite(target)) {
            return;
        }

        const counter = { value: 0 };

        gsap.to(counter, {
            value: target,
            duration: 1.8,
            ease: "power1.out",
            snap: { value: 1 },
            scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            onUpdate: () => {
                numberElement.textContent = Math.round(counter.value).toLocaleString("en-IN");
            }
        });
    });
}



gsap.registerPlugin(ScrollTrigger);

const servicesSection = document.querySelector(".finorix-services");

if (servicesSection) {
    const servicesHeading = servicesSection.querySelector(".services-heading");
    const serviceCards = servicesSection.querySelectorAll(".service-item");
    const servicesBottom = servicesSection.querySelector(".services-bottom");
    const serviceIcons = servicesSection.querySelectorAll(".service-icon");

    const servicesTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: servicesSection,
            start: "top 78%",
            toggleActions: "play none none none"
        }
    });

    servicesTimeline
        .from(servicesHeading, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from(serviceCards, {
            y: 55,
            opacity: 0,
            scale: 0.96,
            duration: 0.75,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.35")
        .from(serviceIcons, {
            scale: 0.6,
            rotation: -12,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .from(servicesBottom, {
            y: 25,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2");
}


gsap.registerPlugin(ScrollTrigger);

const whyFinorixSection = document.querySelector(".why-finorix-section");

if (whyFinorixSection) {
    const whyHeading = whyFinorixSection.querySelector(".why-finorix-header");
    const whyCards = whyFinorixSection.querySelectorAll(".why-feature-card");
    const whyBottom = whyFinorixSection.querySelector(".why-finorix-bottom");
    const whyIcons = whyFinorixSection.querySelectorAll(".why-feature-icon");

    const whyTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: whyFinorixSection,
            start: "top 78%",
            toggleActions: "play none none none"
        }
    });

    whyTimeline
        .from(whyHeading, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from(whyCards, {
            y: 50,
            opacity: 0,
            scale: 0.96,
            duration: 0.7,
            stagger: 0.14,
            ease: "power3.out"
        }, "-=0.3")
        .from(whyIcons, {
            scale: 0.6,
            rotation: -12,
            opacity: 0,
            duration: 0.45,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .from(whyBottom, {
            y: 25,
            opacity: 0,
            duration: 0.65,
            ease: "power2.out"
        }, "-=0.15");
}


gsap.registerPlugin(ScrollTrigger);

const pricingSection = document.querySelector(".finorix-pricing");

if (pricingSection) {
    const pricingButtons = pricingSection.querySelectorAll(".pricing-period");
    const pricingValues = pricingSection.querySelectorAll(".pricing-value");
    const pricingDurations = pricingSection.querySelectorAll(".pricing-duration");

    pricingButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedPeriod = button.dataset.period;

            pricingButtons.forEach((item) => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            pricingValues.forEach((value) => {
                const nextValue = value.dataset[
                    selectedPeriod === "yearly" ? "yearly" : "monthly"
                ];

                gsap.to(value, {
                    opacity: 0,
                    y: 8,
                    duration: 0.15,
                    onComplete: () => {
                        value.textContent = Number(nextValue).toLocaleString("en-US");

                        gsap.to(value, {
                            opacity: 1,
                            y: 0,
                            duration: 0.25,
                            ease: "power2.out"
                        });
                    }
                });
            });

            pricingDurations.forEach((duration) => {
                duration.textContent = selectedPeriod === "yearly" ? "/Year" : "/Month";
            });
        });
    });

    const pricingHeading = pricingSection.querySelector(".pricing-heading");
    const pricingCards = pricingSection.querySelectorAll(".pricing-card");
    const pricingFooter = pricingSection.querySelector(".pricing-footer");

    gsap.timeline({
        scrollTrigger: {
            trigger: pricingSection,
            start: "top 75%",
            toggleActions: "play none none none"
        }
    })
    .from(pricingHeading, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(pricingCards, {
        y: 65,
        opacity: 0,
        scale: 0.97,
        duration: 0.75,
        stagger: 0.18,
        ease: "power3.out"
    }, "-=0.3")
    .from(pricingFooter, {
        y: 25,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.2");
}


gsap.registerPlugin(ScrollTrigger);

const testimonialsSection = document.querySelector(".finorix-testimonials");

if (testimonialsSection) {
    const testimonialsHeader = testimonialsSection.querySelector(".testimonials-header");
    const featuredTestimonial = testimonialsSection.querySelector(".testimonial-featured");
    const testimonialCards = testimonialsSection.querySelectorAll(".testimonial-card");
    const testimonialsBottom = testimonialsSection.querySelector(".testimonials-bottom");
    const testimonialIcons = testimonialsSection.querySelectorAll(
        ".testimonial-quote-icon, .testimonial-small-quote"
    );

    const testimonialsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 78%",
            toggleActions: "play none none none"
        }
    });

    testimonialsTimeline
        .from(testimonialsHeader, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from(featuredTestimonial, {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.25")
        .from(testimonialCards, {
            x: 45,
            opacity: 0,
            duration: 0.7,
            stagger: 0.18,
            ease: "power3.out"
        }, "-=0.45")
        .from(testimonialIcons, {
            scale: 0.6,
            opacity: 0,
            duration: 0.45,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .from(testimonialsBottom, {
            y: 25,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.15");
}

gsap.registerPlugin(ScrollTrigger);

const finorixCta = document.querySelector(".finorix-cta");

if (finorixCta) {
    const ctaContent = finorixCta.querySelector(".cta-content");
    const ctaVisual = finorixCta.querySelector(".cta-visual");
    const ctaButtons = finorixCta.querySelectorAll(".cta-actions a");
    const ctaTrustItems = finorixCta.querySelectorAll(".cta-trust-item");
    const ctaFloatingCards = finorixCta.querySelectorAll(".cta-floating-card");
    const ctaMainIcon = finorixCta.querySelector(".cta-main-icon");
    const ctaDots = finorixCta.querySelectorAll(".cta-decoration-dot");

    const ctaTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: finorixCta,
            start: "top 78%",
            toggleActions: "play none none none"
        }
    });

    ctaTimeline
        .from(ctaContent, {
            x: -45,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
        })
        .from(ctaVisual, {
            x: 45,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
        }, "-=0.65")
        .from(ctaButtons, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.45")
        .from(ctaTrustItems, {
            y: 12,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.25")
        .from(ctaFloatingCards, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.5)"
        }, "-=0.4")
        .from(ctaMainIcon, {
            scale: 0.7,
            rotation: -15,
            duration: 0.65,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .from(ctaDots, {
            scale: 0,
            opacity: 0,
            duration: 0.35,
            stagger: 0.1,
            ease: "back.out(2)"
        }, "-=0.3");

    gsap.to(ctaMainIcon, {
        y: -9,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(ctaFloatingCards, {
        y: -5,
        duration: 2.5,
        stagger: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

const footerYear = document.getElementById("footerYear");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

gsap.registerPlugin(ScrollTrigger);

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