gsap.registerPlugin(ScrollTrigger);

// Loader logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => loader.remove() });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    const panels = document.querySelectorAll('.comic-panel');

    panels.forEach((panel) => {
        const img = panel.querySelector('.comic-img');
        const bubbles = panel.querySelectorAll('.bubble');

        // 1. Panel Fade In effect
        gsap.from(panel, {
            scrollTrigger: {
                trigger: panel,
                start: "top 85%", 
                end: "bottom 15%",
                toggleActions: "play reverse play reverse"
            },
            opacity: 0.3,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });

        // 2. Parallax effect for the image inside the panel
        gsap.to(img, {
            scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: 50,
            scale: 1,
            ease: "none"
        });

        // 3. Speech Bubbles "Pop" animation
        if(bubbles.length > 0) {
            gsap.to(bubbles, {
                scrollTrigger: {
                    trigger: panel,
                    start: "top 50%", 
                    toggleActions: "play none none reverse",
                    onEnter: () => {
                        // Play sound effect when bubble pops in, if audio is not muted
                        if (sfxPop && bgm && !bgm.paused) {
                            sfxPop.currentTime = 0;
                            sfxPop.play().catch(e => console.log('Autoplay blocked'));
                        }
                    }
                },
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(2)",
                stagger: 0.3
            });
        }
    });

});
