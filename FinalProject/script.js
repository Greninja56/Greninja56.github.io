const container = document.querySelector('.floating-images');
const images = Array.from(container.querySelectorAll('img'));
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;
const imgSize = 150; 

const spots = [
    { x: 20, y: 20 },
    { x: 200, y: 20 },
    { x: 20, y: 200 },
    { x: 200, y: 200 }
];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

const shuffledSpots = shuffle(spots);

images.forEach((img, index) => {
    const spot = shuffledSpots[index % shuffledSpots.length];
    img.style.left = `${spot.x}px`;
    img.style.top = `${spot.y}px`;

    const floatAmount = Math.random() * 10 + 5; 
    const duration = 2000 + Math.random() * 2000; 
    img.animate(
        [
            { transform: `translateY(0px)` },
            { transform: `translateY(-${floatAmount}px)` },
            { transform: `translateY(0px)` }
        ],
        {
            duration: duration,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        }
    );
});
