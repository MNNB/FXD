let currentScroll = window.scrollY;
let targetScroll = window.scrollY;
const ease = 0.2;

function smoothScroll() {
  const diff = targetScroll - currentScroll;
  if (Math.abs(diff) < 0.5) {
    currentScroll = targetScroll;
  } else {
    currentScroll += diff * ease;
  }
  window.scrollTo(0, currentScroll);
  requestAnimationFrame(smoothScroll);
}

// Smooth scroll on anchor link clicks
function handleAnchorClick(e) {
  e.preventDefault();
  const anchor = e.currentTarget;
  const href = anchor.getAttribute('href');
  if (!href) return;
  const targetId = href.substring(1);
  const target = document.getElementById(targetId);
  if (target) {
    targetScroll = target.offsetTop;
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', handleAnchorClick);
});

window.addEventListener('wheel', (e) => {
  targetScroll += e.deltaY;
  currentScroll = targetScroll;
  e.preventDefault();
}, { passive: false });

requestAnimationFrame(smoothScroll);

// Animate sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-animate').forEach(section => {
  observer.observe(section);
});

const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    targetScroll = 0;
  });
}

// Initialize canvas
const canvas = document.getElementById('pixel-canvas');
const ctx = canvas.getContext('2d');
const pixelSize = canvas.width / 64;
let drawing = false;
let currentColor = '#000000';

// Load background image
const image = new Image();
image.src = '/public/images/projects/me.png';
image.onload = () => ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

// Color selection
const colors = document.querySelectorAll('.color');
colors.forEach(color => {
  color.addEventListener('click', (e) => {
    currentColor = e.target.dataset.color;
    colors.forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
  });
});

// Erase functionality
document.getElementById('erase-button').addEventListener('click', () => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
});

// Drawing functions
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  draw(e);
});

canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  draw(e);
});

function draw(e) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / pixelSize);
  const y = Math.floor((e.clientY - rect.top) / pixelSize);
  
  ctx.fillStyle = currentColor;
  ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}