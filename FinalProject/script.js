document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.floating-images');
    const images = container ? Array.from(container.querySelectorAll('img')) : [];
    const spots = [
        { x: 20, y: 20 },
        { x: 200, y: 20 },
        { x: 20, y: 200 },
        { x: 200, y: 200 }
    ];

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    shuffle(spots);

    images.forEach((img, index) => {
        const spot = spots[index % spots.length];
        img.style.left = `${spot.x}px`;
        img.style.top = `${spot.y}px`;

        const floatAmount = Math.random() * 10 + 5;
        const duration = 2000 + Math.random() * 2000;

        img.animate(
            [
                { transform: 'translateY(0px)' },
                { transform: `translateY(-${floatAmount}px)` },
                { transform: 'translateY(0px)' }
            ],
            { duration, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
        );
    });

    function positionImages() {
        if (window.innerWidth >= 768) {
            images.forEach((img, index) => {
                const spot = spots[index % spots.length];
                img.style.left = `${spot.x}px`;
                img.style.top = `${spot.y}px`;
            });
        } else {
            images.forEach(img => {
                img.style.left = '';
                img.style.top = '';
            });
        }
    }

    window.addEventListener('resize', positionImages);
    positionImages();

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const themeToggle = document.querySelector(".theme-toggle");
    const focusableSelectors = 'a, button';
    const focusableNavLinks = navLinks ? navLinks.querySelectorAll(focusableSelectors) : [];

    function setTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    if (themeToggle) {
        themeToggle.textContent = isDark ? "☀️" : "🌙";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
        );
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
}


    const savedTheme = localStorage.getItem("theme") === "dark";
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            setTheme(!document.body.classList.contains("dark-theme"));
        });
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
            hamburger.setAttribute("aria-expanded", !isExpanded);
            navLinks.classList.toggle("active");

            if (!isExpanded && focusableNavLinks.length) {
                focusableNavLinks[0].focus();
            }
        });

        navLinks.addEventListener("keydown", (e) => {
            if (!navLinks.classList.contains("active")) return;

            const first = focusableNavLinks[0];
            const last = focusableNavLinks[focusableNavLinks.length - 1];

            if (e.key === "Tab") {
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }

            if (e.key === "Escape") {
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.focus();
            }
        });
    }
});