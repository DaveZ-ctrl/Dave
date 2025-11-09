// ===== 🚀 SCROLL SNAPPING (Desktop only) =====
const main = document.getElementById("main");
const sections = Array.from(document.querySelectorAll("main > section"));
let isScrolling = false;

function scrollToSection(index) {
  if (index < 0) index = 0;
  if (index >= sections.length) index = sections.length - 1;
  isScrolling = true;
  sections[index].scrollIntoView({ behavior: "smooth" });
  setTimeout(() => (isScrolling = false), 700);
}

function getCurrentIndex() {
  const top = main.scrollTop + 10;
  for (let i = 0; i < sections.length; i++) {
    const rectTop = sections[i].offsetTop - main.offsetTop;
    if (top < rectTop + sections[i].offsetHeight) return i;
  }
  return sections.length - 1;
}

// 🖱️ Enable only on desktop (to avoid mobile errors)
if (window.innerWidth > 1024) {
  main.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0) scrollToSection(getCurrentIndex() + 1);
    else scrollToSection(getCurrentIndex() - 1);
  });
}

// ===== 🌗 THEME TOGGLE =====
const modeToggle = document.getElementById("modeToggle");
let light = false;

modeToggle.addEventListener("click", () => {
  light = !light;
  document.body.classList.toggle("light-mode", light);
  modeToggle.innerHTML = light
    ? '<i class="bx bx-sun"></i>'
    : '<i class="bx bx-moon"></i>';
});

// ===== 🍔 MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("bx-x");
  });

  // Hide menu after clicking a link
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.remove("bx-x");
    })
  );
}

// ===== 💫 SKILL BARS ANIMATION =====
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress");

  progressBars.forEach((bar) => {
    const percentText = bar.nextElementSibling;
    const target = parseInt(bar.dataset.percent, 10);
    let count = 0;

    // Animate bar fill and number
    const fill = setInterval(() => {
      if (count >= target) clearInterval(fill);
      else {
        count++;
        bar.style.width = count + "%";
        percentText.textContent = count + "%";
      }
    }, 30);

    // Sparkle particles inside bar
    createBarStars(bar);
  });
});

// ===== ✨ TINY STARS INSIDE BARS =====
function createBarStars(bar) {
  const numStars = 15;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("bar-star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    bar.appendChild(star);
  }
}

// ===== 📅 AUTO YEAR =====
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
