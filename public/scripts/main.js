//let currentScroll = window.scrollY;
//let targetScroll = window.scrollY;
//const ease = 0.2;
//
//function smoothScroll() {
//  const diff = targetScroll - currentScroll;
//  if (Math.abs(diff) < 0.5) {
//    currentScroll = targetScroll;
//  } else {
//    currentScroll += diff * ease;
//  }
//  window.scrollTo(0, currentScroll);
//  requestAnimationFrame(smoothScroll);
//}

// Smooth scroll on anchor link clicks
//function handleAnchorClick(e) {
//  e.preventDefault();
//  const anchor = e.currentTarget;
//  const href = anchor.getAttribute("href");
//  if (!href) return;
//  const targetId = href.substring(1);
//  const target = document.getElementById(targetId);
//  if (target) {
//    targetScroll = target.offsetTop;
//  }
//}
//
//document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//  anchor.addEventListener("click", handleAnchorClick);
//});
//
//window.addEventListener(
//  "wheel",
//  (e) => {
//    targetScroll += e.deltaY;
//    currentScroll = targetScroll; // This might make the scroll a bit jumpy with wheel, consider adjusting targetScroll directly or removing this immediate currentScroll update.
//    e.preventDefault();
//  },
//  { passive: false },
//);
//
//requestAnimationFrame(smoothScroll);
//
//// Animate sections on scroll
//const observer = new IntersectionObserver(
//  (entries) => {
//    entries.forEach((entry) => {
//      if (entry.isIntersecting) {
//        entry.target.classList.add("visible");
//      }
//    });
//  },
//  { threshold: 0.1 },
//);
//
//document.querySelectorAll(".section-animate").forEach((section) => {
//  observer.observe(section);
//});

// Back to Top button functionality
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      // Show button after 100px scroll
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior if it's a link
    targetScroll = 0; // Set target for smooth scroll
    // Smooth scroll will handle the animation via requestAnimationFrame
  });
}

// Note: The Pixel Art Canvas JavaScript has been moved to PixelArt.astro component.
