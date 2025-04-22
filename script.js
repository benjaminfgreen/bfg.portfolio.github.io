function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const container = document.querySelector('.carousel-container');
const track = document.querySelector('.carousel-track');

// Touch handling variables
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startTranslateX = 0;
let currentTranslateX = 0;
let lastTranslateX = 0;
let animationID = null;

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

function setSlidePosition(position) {
    track.style.transform = `translateX(${position}%)`;
}

function moveCarousel(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    setSlidePosition(-currentSlide * 100);
    updateDots();
}

function goToSlide(index) {
    currentSlide = index;
    setSlidePosition(-currentSlide * 100);
    updateDots();
}

// Touch event handlers
function handleTouchStart(event) {
    if (event.target.closest('.carousel-dots')) return; // Ignore touch on dots
    
    isDragging = true;
    touchStartX = event.touches[0].clientX;
    startTranslateX = -currentSlide * 100;
    lastTranslateX = startTranslateX;
    cancelAnimationFrame(animationID);
}

function handleTouchMove(event) {
    if (!isDragging) return;
    event.preventDefault(); // Prevent scrolling while swiping
    
    const currentX = event.touches[0].clientX;
    const diff = currentX - touchStartX;
    const slideWidth = container.clientWidth;
    const percentageMoved = (diff / slideWidth) * 100;
    
    currentTranslateX = startTranslateX + percentageMoved;
    setSlidePosition(currentTranslateX);
}

function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const diff = currentTranslateX - lastTranslateX;
    const threshold = 15; // Lower threshold for easier swipe
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            if (currentSlide === 0) {
                // If at first slide and swiping right, go to last slide
                goToSlide(slides.length - 1);
            } else {
                moveCarousel(-1); // Swipe right
            }
        } else {
            if (currentSlide === slides.length - 1) {
                // If at last slide and swiping left, go to first slide
                goToSlide(0);
            } else {
                moveCarousel(1); // Swipe left
            }
        }
    } else {
        // Return to current slide if threshold not met
        goToSlide(currentSlide);
    }
}

// Add touch event listeners to container instead of track
if (container) {
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false }); // non-passive to prevent scrolling
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
}

// Auto advance slides
let autoAdvanceInterval = setInterval(() => moveCarousel(1), 8000);

// Reset auto advance timer on user interaction
function resetAutoAdvance() {
    clearInterval(autoAdvanceInterval);
    autoAdvanceInterval = setInterval(() => moveCarousel(1), 8000);
}

container.addEventListener('touchstart', resetAutoAdvance, { passive: true });

// Lissajous figure animation
function initLissajous(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let time = 0;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 15;
    const frequency1 = 3;
    const frequency2 = 2;

    function draw() {
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
        requestAnimationFrame(draw);
    }

    draw();
}

// Initialize both Lissajous figures
initLissajous('lissajous');
initLissajous('mobile-lissajous');

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