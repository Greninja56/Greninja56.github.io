// Floating images
const container = document.querySelector('.floating-images');
const images = Array.from(container.querySelectorAll('img'));
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

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));

// Theme toggle
const themeToggle = document.querySelector(".theme-toggle");

function setTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load saved theme
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setTheme(savedTheme);
});

themeToggle.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark-theme"));
});
