if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {
    gsap.registerPlugin(ScrollTrigger);

    const serviceHero = document.querySelector(".finorix-service-hero");

    if (serviceHero) {
        const breadcrumb = serviceHero.querySelector(
            ".finorix-service-breadcrumb"
        );

        const eyebrow = serviceHero.querySelector(
            ".finorix-service-eyebrow"
        );

        const heading = serviceHero.querySelector(
            ".finorix-service-hero-content h1"
        );

        const description = serviceHero.querySelector(
            ".finorix-service-hero-description"
        );

        const actions = serviceHero.querySelector(
            ".finorix-service-hero-actions"
        );

        const trust = serviceHero.querySelector(
            ".finorix-service-hero-trust"
        );

        const visual = serviceHero.querySelector(
            ".finorix-service-hero-visual"
        );

        const floatingCard = serviceHero.querySelector(
            ".finorix-service-floating-card"
        );

        const decorations = serviceHero.querySelectorAll(
            ".finorix-service-decoration"
        );

        const serviceTimeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        serviceTimeline
            .from(breadcrumb, {
                y: 15,
                opacity: 0,
                duration: 0.45
            })
            .from(eyebrow, {
                y: 18,
                opacity: 0,
                duration: 0.5
            }, "-=0.2")
            .from(heading, {
                y: 35,
                opacity: 0,
                duration: 0.8
            }, "-=0.15")
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
            .from(trust, {
                y: 15,
                opacity: 0,
                duration: 0.5
            }, "-=0.25")
            .from(visual, {
                x: 35,
                opacity: 0,
                duration: 0.85
            }, "-=1")
            .from(floatingCard, {
                y: 20,
                opacity: 0,
                duration: 0.5
            }, "-=0.25")
            .from(decorations, {
                scale: 0.7,
                opacity: 0,
                duration: 0.5,
                stagger: 0.12
            }, "-=0.35");

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.to(floatingCard, {
                y: -7,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.2
            });
        }
    }
}


if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {
    gsap.registerPlugin(ScrollTrigger);

    const servicesOverview = document.querySelector(
        ".finorix-services-overview"
    );

    if (servicesOverview) {
        const servicesHeading = servicesOverview.querySelector(
            ".finorix-services-heading"
        );

        const serviceCards = servicesOverview.querySelectorAll(
            ".finorix-service-card"
        );

        const servicesBottom = servicesOverview.querySelector(
            ".finorix-services-bottom"
        );

        gsap.from(servicesHeading, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: servicesHeading,
                start: "top 85%",
                once: true
            }
        });

        gsap.from(serviceCards, {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: serviceCards[0],
                start: "top 85%",
                once: true
            }
        });

        gsap.from(servicesBottom, {
            y: 22,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: servicesBottom,
                start: "top 90%",
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

    const whyFinorixSection = document.querySelector(
        ".finorix-why-services"
    );

    if (whyFinorixSection) {
        const whyVisual = whyFinorixSection.querySelector(
            ".finorix-why-visual"
        );

        const whyContent = whyFinorixSection.querySelector(
            ".finorix-why-content"
        );

        const whyBenefits = whyFinorixSection.querySelectorAll(
            ".finorix-why-benefit"
        );

        const whyFloatingCard = whyFinorixSection.querySelector(
            ".finorix-why-floating-card"
        );

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        gsap.from(whyVisual, {
            x: -35,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
                trigger: whyFinorixSection,
                start: "top 75%",
                once: true
            }
        });

        gsap.from(whyContent, {
            x: 35,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
                trigger: whyContent,
                start: "top 80%",
                once: true
            }
        });

        gsap.from(whyBenefits, {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: whyBenefits[0],
                start: "top 85%",
                once: true
            }
        });

        if (!reducedMotion) {
            gsap.to(whyFloatingCard, {
                y: -6,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.8
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const pricingSection = document.querySelector(".finorix-pricing");

    if (!pricingSection) {
        return;
    }

    const pricingToggle = pricingSection.querySelector("#pricingToggle");
    const monthlyLabel = pricingSection.querySelector("#monthlyLabel");
    const yearlyLabel = pricingSection.querySelector("#yearlyLabel");

    const priceAmounts = pricingSection.querySelectorAll(
        ".finorix-price-amount"
    );

    const pricePeriods = pricingSection.querySelectorAll(
        ".finorix-price-period"
    );

    const billingNotes = pricingSection.querySelectorAll(
        ".finorix-pricing-billing-note"
    );

    function formatPrice(value) {
        return Number(value).toLocaleString("en-IN");
    }

    function updatePricing(isYearly) {
        pricingToggle.setAttribute(
            "aria-pressed",
            String(isYearly)
        );

        monthlyLabel.classList.toggle("active", !isYearly);
        yearlyLabel.classList.toggle("active", isYearly);

        priceAmounts.forEach(function (price) {
            const value = isYearly
                ? price.dataset.yearly
                : price.dataset.monthly;

            price.textContent = formatPrice(value);
        });

        pricePeriods.forEach(function (period) {
            period.textContent = isYearly ? "/ year" : "/ month";
        });

        billingNotes.forEach(function (note) {
            note.textContent = isYearly
                ? "Billed annually"
                : "Billed monthly";
        });
    }

    pricingToggle.addEventListener("click", function () {
        const isYearly =
            pricingToggle.getAttribute("aria-pressed") !== "true";

        updatePricing(isYearly);
    });

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {
        gsap.registerPlugin(ScrollTrigger);

        const heading = pricingSection.querySelector(
            ".finorix-pricing-heading"
        );

        const pricingCards = pricingSection.querySelectorAll(
            ".finorix-pricing-card"
        );

        const bottomCard = pricingSection.querySelector(
            ".finorix-pricing-bottom"
        );

        gsap.from(heading, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                once: true
            }
        });

        gsap.from(pricingCards, {
            y: 40,
            opacity: 0,
            duration: 0.75,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: pricingCards[0],
                start: "top 85%",
                once: true
            }
        });

        gsap.from(bottomCard, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bottomCard,
                start: "top 90%",
                once: true
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const finorixProcessSection = document.querySelector(".finorix-process");

    if (!finorixProcessSection) {
        return;
    }

    const finorixProcessCards = finorixProcessSection.querySelectorAll(
        ".finorix-process-card"
    );

    const finorixProcessHeading = finorixProcessSection.querySelector(
        ".finorix-process-heading"
    );

    const finorixProcessCta = finorixProcessSection.querySelector(
        ".finorix-process-cta"
    );

    const finorixProcessLineProgress = finorixProcessSection.querySelector(
        ".finorix-process-line-progress"
    );

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        finorixProcessCards.forEach(function (card) {
            card.style.opacity = "1";
            card.style.visibility = "visible";
            card.style.transform = "none";
        });

        if (finorixProcessHeading) {
            finorixProcessHeading.style.opacity = "1";
        }

        if (finorixProcessCta) {
            finorixProcessCta.style.opacity = "1";
        }

        if (finorixProcessLineProgress) {
            finorixProcessLineProgress.style.transform = "scaleY(1)";
        }

        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const finorixProcessMotionReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (finorixProcessMotionReduced) {
        return;
    }

    gsap.from(finorixProcessHeading, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: finorixProcessHeading,
            start: "top 85%",
            once: true
        }
    });

    finorixProcessCards.forEach(function (card, index) {
        gsap.from(card, {
            opacity: 0,
            y: 45,
            duration: 0.8,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true
            }
        });
    });

    if (finorixProcessLineProgress) {
        gsap.to(finorixProcessLineProgress, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: finorixProcessSection.querySelector(
                    ".finorix-process-timeline"
                ),
                start: "top 70%",
                end: "bottom 65%",
                scrub: 0.8
            }
        });
    }

    if (finorixProcessCta) {
        gsap.from(finorixProcessCta, {
            opacity: 0,
            y: 35,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: finorixProcessCta,
                start: "top 88%",
                once: true
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const finorixTestimonialsSection = document.querySelector(
        ".finorix-testimonials"
    );

    if (!finorixTestimonialsSection) {
        return;
    }

    const finorixTestimonialsHeading = finorixTestimonialsSection.querySelector(
        ".finorix-testimonials-heading"
    );

    const finorixTestimonialsCards = finorixTestimonialsSection.querySelectorAll(
        ".finorix-testimonial-card"
    );

    const finorixTestimonialsBottom = finorixTestimonialsSection.querySelector(
        ".finorix-testimonials-bottom"
    );

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const finorixTestimonialsReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (finorixTestimonialsReducedMotion) {
        return;
    }

    gsap.from(finorixTestimonialsHeading, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: finorixTestimonialsHeading,
            start: "top 85%",
            once: true
        }
    });

    gsap.from(finorixTestimonialsCards, {
        opacity: 0,
        y: 45,
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
            trigger: finorixTestimonialsCards[0],
            start: "top 85%",
            once: true
        }
    });

    gsap.from(finorixTestimonialsBottom, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: finorixTestimonialsBottom,
            start: "top 90%",
            once: true
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const finorixFaqSection = document.querySelector(".finorix-faq");

    if (!finorixFaqSection) {
        return;
    }

    const finorixFaqItems = finorixFaqSection.querySelectorAll(
        ".finorix-faq-item"
    );

    const finorixFaqReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function finorixCloseFaqItem(item) {
        const button = item.querySelector(".finorix-faq-question");
        const answer = item.querySelector(".finorix-faq-answer");
        const icon = button.querySelector(".finorix-faq-toggle i");

        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
        icon.className = "fa-solid fa-plus";

        if (typeof gsap !== "undefined" && !finorixFaqReducedMotion) {
            gsap.killTweensOf(answer);

            if (!answer.hidden) {
                gsap.to(answer, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: function () {
                        answer.hidden = true;
                        answer.style.removeProperty("height");
                        answer.style.removeProperty("opacity");
                    }
                });
            } else {
                answer.hidden = true;
            }
        } else {
            answer.hidden = true;
            answer.style.removeProperty("height");
            answer.style.removeProperty("opacity");
        }
    }

    function finorixOpenFaqItem(item) {
        const button = item.querySelector(".finorix-faq-question");
        const answer = item.querySelector(".finorix-faq-answer");
        const icon = button.querySelector(".finorix-faq-toggle i");

        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        icon.className = "fa-solid fa-minus";
        answer.hidden = false;

        if (typeof gsap !== "undefined" && !finorixFaqReducedMotion) {
            gsap.killTweensOf(answer);

            gsap.fromTo(
                answer,
                {
                    height: 0,
                    opacity: 0
                },
                {
                    height: "auto",
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                    clearProps: "height,opacity"
                }
            );
        } else {
            answer.style.removeProperty("height");
            answer.style.removeProperty("opacity");
        }
    }

    finorixFaqItems.forEach(function (item) {
        const button = item.querySelector(".finorix-faq-question");

        button.addEventListener("click", function () {
            const isOpen = item.classList.contains("active");

            finorixFaqItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    finorixCloseFaqItem(otherItem);
                }
            });

            if (isOpen) {
                finorixCloseFaqItem(item);
            } else {
                finorixOpenFaqItem(item);
            }
        });
    });

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined" &&
        !finorixFaqReducedMotion
    ) {
        gsap.registerPlugin(ScrollTrigger);

        const finorixFaqIntro = finorixFaqSection.querySelector(
            ".finorix-faq-intro"
        );

        const finorixFaqContent = finorixFaqSection.querySelector(
            ".finorix-faq-content"
        );

        gsap.from(finorixFaqIntro, {
            opacity: 0,
            x: -35,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: finorixFaqSection,
                start: "top 80%",
                once: true
            }
        });

        gsap.from(finorixFaqContent, {
            opacity: 0,
            x: 35,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: finorixFaqContent,
                start: "top 82%",
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