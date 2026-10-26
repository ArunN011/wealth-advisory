
gsap.registerPlugin(ScrollTrigger);

const aboutHero = document.querySelector(".about-hero");

if (aboutHero) {
    const aboutBreadcrumb = aboutHero.querySelector(".about-breadcrumb");
    const aboutTitle = aboutHero.querySelector(".about-hero-top h1");
    const aboutLeft = aboutHero.querySelector(".about-hero-left");
    const aboutRight = aboutHero.querySelector(".about-hero-right");
    const aboutStats = aboutHero.querySelectorAll(".about-hero-stat");
    const aboutBadge = aboutHero.querySelector(".about-insights-badge");

    const aboutTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    aboutTimeline
        .from(aboutBreadcrumb, {
            y: -15,
            opacity: 0,
            duration: 0.5
        })
        .from(aboutTitle, {
            y: 25,
            opacity: 0,
            duration: 0.65
        }, "-=0.25")
        .from(aboutLeft, {
            x: -40,
            opacity: 0,
            duration: 0.8
        }, "-=0.2")
        .from(aboutRight, {
            x: 40,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(aboutBadge, {
            y: 15,
            opacity: 0,
            duration: 0.5
        }, "-=0.5")
        .from(aboutStats, {
            y: 15,
            opacity: 0,
            stagger: 0.15,
            duration: 0.5
        }, "-=0.25");
}

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const aboutFeatures = document.querySelector(".about-features");

    if (aboutFeatures) {
        const featureCards = aboutFeatures.querySelectorAll(".about-feature-card");
        const bottomContent = aboutFeatures.querySelector(".about-features-bottom-content");
        const visual = aboutFeatures.querySelector(".about-features-visual");
        const highlights = aboutFeatures.querySelectorAll(".about-highlight");
        const visualCards = aboutFeatures.querySelectorAll(".about-visual-card");

        gsap.from(featureCards, {
            scrollTrigger: {
                trigger: ".about-features-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out"
        });

        const aboutBottomTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-features-bottom",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        aboutBottomTimeline
            .from(bottomContent, {
                x: -40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            })
            .from(visual, {
                x: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5")
            .from(highlights, {
                y: 15,
                opacity: 0,
                duration: 0.45,
                stagger: 0.12,
                ease: "power2.out"
            }, "-=0.35")
            .from(visualCards, {
                scale: 0.9,
                opacity: 0,
                duration: 0.5,
                stagger: 0.15,
                ease: "power2.out"
            }, "-=0.3");
    }
}

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const visionMissionSection = document.querySelector(".about-vision-mission");

    if (visionMissionSection) {
        const imageColumn = visionMissionSection.querySelector(".vision-mission-image-column");
        const imageBadge = visionMissionSection.querySelector(".vision-image-badge");
        const heading = visionMissionSection.querySelector(".vision-mission-heading");
        const divider = visionMissionSection.querySelector(".vision-mission-divider");
        const cards = visionMissionSection.querySelectorAll(".vision-mission-card");

        const visionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: visionMissionSection,
                start: "top 78%",
                toggleActions: "play none none none"
            }
        });

        visionTimeline
            .from(imageColumn, {
                x: -45,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            })
            .from(heading, {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out"
            }, "-=0.5")
            .from(divider, {
                x: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.3")
            .from(cards, {
                y: 25,
                opacity: 0,
                duration: 0.6,
                stagger: 0.18,
                ease: "power3.out"
            }, "-=0.2")
            .from(imageBadge, {
                y: 15,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.3");
    }
}

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const whyFinorix = document.querySelector(".why-finorix");

    if (whyFinorix) {
        const header = whyFinorix.querySelector(".why-finorix-header");
        const cards = whyFinorix.querySelectorAll(".why-finorix-card");
        const bottom = whyFinorix.querySelector(".why-finorix-bottom");
        const icons = whyFinorix.querySelectorAll(".why-finorix-icon");

        const whyTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: whyFinorix,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        whyTimeline
            .from(header, {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out"
            })
            .from(cards, {
                y: 40,
                opacity: 0,
                duration: 0.65,
                stagger: 0.15,
                ease: "power3.out"
            }, "-=0.25")
            .from(icons, {
                scale: 0.7,
                duration: 0.4,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.35")
            .from(bottom, {
                y: 25,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.2");
    }
}

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const teamSection = document.querySelector(".finorix-team");

    if (teamSection) {
        const teamHeader = teamSection.querySelector(".finorix-team-header");
        const teamCards = teamSection.querySelectorAll(".finorix-team-card");
        const teamBottom = teamSection.querySelector(".finorix-team-bottom");

        gsap.from(teamHeader, {
            scrollTrigger: {
                trigger: teamSection,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        });

        gsap.from(teamCards, {
            scrollTrigger: {
                trigger: ".finorix-team-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 45,
            opacity: 0,
            scale: 0.97,
            duration: 0.7,
            stagger: 0.18,
            ease: "power3.out"
        });

        gsap.from(teamBottom, {
            scrollTrigger: {
                trigger: teamBottom,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        });
    }
}

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const achievementsSection = document.querySelector(".finorix-achievements");

    if (achievementsSection) {
        const achievementsHeader = achievementsSection.querySelector(".finorix-achievements-header");
        const achievementCards = achievementsSection.querySelectorAll(".finorix-achievement-card");
        const achievementsBottom = achievementsSection.querySelector(".finorix-achievements-bottom");

        gsap.from(achievementsHeader, {
            scrollTrigger: {
                trigger: achievementsSection,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        });

        gsap.from(achievementCards, {
            scrollTrigger: {
                trigger: ".finorix-achievements-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 35,
            opacity: 0,
            duration: 0.65,
            stagger: 0.15,
            ease: "power3.out"
        });

        achievementCards.forEach((card) => {
            const counter = card.querySelector(".achievement-counter");

            if (!counter) {
                return;
            }

            const target = Number(counter.dataset.target);

            if (!Number.isFinite(target)) {
                return;
            }

            const counterState = { value: 0 };

            gsap.to(counterState, {
                value: target,
                duration: 2,
                ease: "power2.out",
                snap: { value: 1 },
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                onUpdate: () => {
                    counter.textContent = Math.round(counterState.value).toLocaleString("en-IN");
                }
            });
        });

        gsap.from(achievementsBottom, {
            scrollTrigger: {
                trigger: achievementsBottom,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        });
    }
}
document.querySelectorAll(".finorix-faq").forEach((faqSection) => {
    const faqItems = faqSection.querySelectorAll(".finorix-faq-item");

    faqItems.forEach((item) => {
        const button = item.querySelector(".finorix-faq-question");
        const answer = item.querySelector(".finorix-faq-answer");
        const icon = button.querySelector(".finorix-faq-toggle i");

        button.addEventListener("click", () => {
            const shouldOpen = button.getAttribute("aria-expanded") !== "true";

            faqItems.forEach((otherItem) => {
                const otherButton = otherItem.querySelector(".finorix-faq-question");
                const otherAnswer = otherItem.querySelector(".finorix-faq-answer");
                const otherIcon = otherButton.querySelector(".finorix-faq-toggle i");

                otherButton.setAttribute("aria-expanded", "false");
                otherItem.classList.remove("active");
                otherAnswer.hidden = true;

                otherIcon.classList.remove("fa-minus");
                otherIcon.classList.add("fa-plus");
            });

            if (shouldOpen) {
                button.setAttribute("aria-expanded", "true");
                item.classList.add("active");
                answer.hidden = false;

                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            }
        });
    });
});

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".finorix-faq").forEach((section) => {
        const header = section.querySelector(".finorix-faq-header");
        const items = section.querySelectorAll(".finorix-faq-item");
        const contact = section.querySelector(".finorix-faq-contact");

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        timeline
            .from(header, {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out"
            })
            .from(items, {
                x: -25,
                opacity: 0,
                duration: 0.55,
                stagger: 0.12,
                ease: "power2.out"
            }, "-=0.25")
            .from(contact, {
                x: 25,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out"
            }, "-=0.4");
    });
}


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