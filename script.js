function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

// Create dots
const dotsContainer = document.querySelector('.carousel-dots');
slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');
if (dots.length > 0) dots[0].classList.add('active');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveCarousel(direction) {
    const track = document.querySelector('.carousel-track');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

function goToSlide(index) {
    currentSlide = index;
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

// Auto advance slides
setInterval(() => moveCarousel(1), 8000);

// Lissajous figure animation
const canvas = document.getElementById('lissajous');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

let time = 0;
const centerX = width / 2;
const centerY = height / 2;
const radius = 15;
const frequency1 = 3;
const frequency2 = 2;

function drawLissajous() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 180, 0, 0.6)';
    ctx.lineWidth = 1.5;
    
    for (let t = 0; t <= 200; t++) {
        const angle = (t / 200) * Math.PI * 2;
        const x = centerX + radius * Math.sin(frequency1 * angle + time);
        const y = centerY + radius * Math.sin(frequency2 * angle + time * 0.5);
        
        if (t === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    time += 0.02;
    requestAnimationFrame(drawLissajous);
}

drawLissajous();

// Dropdown functionality
function toggleDropdown(button) {
    // Close any open dropdowns first
    const allDropdowns = document.querySelectorAll('.dropdown-content.active');
    const allButtons = document.querySelectorAll('.dropdown-btn.active');
    
    allDropdowns.forEach((dropdown, index) => {
        if (dropdown !== button.nextElementSibling) {
            dropdown.classList.remove('active');
            allButtons[index].classList.remove('active');
            const arrow = allButtons[index].querySelector('.dropdown-arrow');
            arrow.textContent = '+';
        }
    });

    // Toggle the clicked dropdown
    const content = button.nextElementSibling;
    const arrow = button.querySelector('.dropdown-arrow');
    content.classList.toggle('active');
    button.classList.toggle('active');
    
    // Change plus to x or back
    if (content.classList.contains('active')) {
        arrow.textContent = '×';
    } else {
        arrow.textContent = '+';
    }
}