// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loader logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => loader.remove() });
    }
});

document.addEventListener("DOMContentLoaded", (event) => {
    
    // --- CUSTOM CURSOR ---
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll('a, button');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(255, 107, 0, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    // --- HERO SECTION ANIMATIONS ---
    const tlHero = gsap.timeline();
    
    tlHero.from(".navbar", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".hero-title .line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=0.5")
    .from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .from(".hero-btn", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.8")
    .from(".hero-img", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    }, "-=1")
    .from(".split-overlay", {
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    }, "-=1.5");

    // Hero Image Parallax effect on mouse move
    const heroSection = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-img');
    const splitOverlay = document.querySelector('.split-overlay');

    heroSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;

        gsap.to(heroImg, { x: x, y: y, duration: 1, ease: "power1.out" });
        gsap.to(splitOverlay, { x: -x*2, duration: 1, ease: "power1.out" });
    });

    // --- SYNOPSIS SECTION ANIMATION ---
    gsap.to(".synopsis-text", {
        scrollTrigger: {
            trigger: ".synopsis-section",
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });

    gsap.to(".synopsis-image", {
        scrollTrigger: {
            trigger: ".synopsis-section",
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
    });

    // --- DYNAMIC BLURRED BACKGROUNDS ---
    // Inject a blurred background behind main images to fill the empty black void
    const applyDynamicBlur = (containerSelector, imgSelector) => {
        document.querySelectorAll(containerSelector).forEach(container => {
            const img = container.querySelector(imgSelector);
            if (img && img.src) {
                const blurBg = document.createElement('img');
                blurBg.src = img.src;
                blurBg.className = 'dynamic-blur-bg';
                // Insert it as the first child so it sits behind everything
                container.insertBefore(blurBg, container.firstChild);
            }
        });
    };

    applyDynamicBlur('.trans-img-group', '.trans-img');
    applyDynamicBlur('.character-showcase', '.char-img');

    // --- TRANSFORMATIONS TIMELINE SECTION ---
    // Pinning the sections and animating steps based on scroll progress
    
    const transSections = document.querySelectorAll('.transformations-section');
    
    transSections.forEach(section => {
        const steps = section.querySelectorAll('.trans-info');
        const images = section.querySelectorAll('.trans-img-group');
        const totalSteps = steps.length;
        
        if (totalSteps === 0) return;
        
        // Calculate scroll distance based on number of steps (e.g. 500px per step)
        const scrollDistance = totalSteps * 500;
        
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${scrollDistance}`, // Dynamic scroll length
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    let activeIndex = Math.floor(progress * totalSteps);
                    if (activeIndex >= totalSteps) activeIndex = totalSteps - 1;
                    
                    steps.forEach((step, i) => {
                        if (i === activeIndex) {
                            step.classList.add('active');
                            if(images[i]) images[i].classList.add('active');
                        } else {
                            step.classList.remove('active');
                            if(images[i]) images[i].classList.remove('active');
                        }
                    });

                    // Optional: Change particle/accent colors based on active index (we can leave this global)
                    const colors = ['#ffcc00', '#ffaa00', '#ff0033', '#00ccff', '#ffffff', '#cc0033', '#ffffff', '#ff0033'];
                    const textColors = ['#000', '#000', '#fff', '#000', '#000', '#fff', '#000', '#fff'];
                    document.documentElement.style.setProperty('--accent-color', colors[activeIndex] || '#ffcc00');
                    document.documentElement.style.setProperty('--btn-text-color', textColors[activeIndex] || '#000');
                }
            }
        });
    });

    // Parallax effect for floating images (mouse move)
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX);
        const y = (window.innerHeight / 2 - e.pageY);
        
        document.querySelectorAll('.float-img').forEach(img => {
            const speed = parseFloat(img.getAttribute('data-speed')) || 0.05;
            gsap.to(img, { x: x * speed, y: y * speed, duration: 1, ease: "power1.out" });
        });
    });

    // --- CHARACTER SHOWCASE ANIMATIONS ---
    const showcases = gsap.utils.toArray(".character-showcase");
    
    showcases.forEach(showcase => {
        const tlChar = gsap.timeline({
            scrollTrigger: {
                trigger: showcase,
                start: "top 60%",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        tlChar.from(showcase.querySelector(".character-bg-text"), {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out"
        })
        .from(showcase.querySelector(".char-img"), {
            x: 200,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        }, "-=1")
        .from(showcase.querySelector(".char-rank"), {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=1.2")
        .from(showcase.querySelector(".char-name"), {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=1")
        .from(showcase.querySelector(".char-desc"), {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.8")
        .from(showcase.querySelector(".character-stats"), {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=1")
        .from(showcase.querySelectorAll(".character-stats li"), {
            x: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4");

        // Parallax background text in character showcase
        gsap.to(showcase.querySelector(".character-bg-text"), {
            scrollTrigger: {
                trigger: showcase,
                start: "top bottom",
                end: "bottom top",
                scrub: 1 // Link animation to scroll bar
            },
            x: -200,
            ease: "none"
        });
    });

});
