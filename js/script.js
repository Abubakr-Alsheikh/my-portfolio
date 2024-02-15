// Cache DOM elements to avoid repeated queries
const domElements = {
  header: document.querySelector("header"),
  hiddenElements: document.querySelectorAll(".hidden"),
  links: document.querySelectorAll("ul li a"),
  buttons: document.querySelectorAll(".tab-button"),
  tabs: document.querySelectorAll(".tabs > div"),
  bodyElement: document.body,
  imageElement: document.querySelector(".home .container .image img")
};

// Get the dark mode status from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  let isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && (isDarkMode || localStorage.getItem('darkMode') === null )) {
    isDarkMode = true;
  }
  if (isDarkMode) {
    domElements.bodyElement.classList.add("dark-mode");
    domElements.imageElement.setAttribute("src", "images/AbubakrAlsheikhDark.jpeg");
  }
});

// Scroll event listener
window.addEventListener("scroll", () => {
  domElements.header.classList.toggle("scroll", window.scrollY > 50);
  setActiveLink();
}, { passive: true });

// Active link setting
function removeActiveClass() {
  domElements.links.forEach(link => link.classList.remove("active"));
}
function setActiveLink() {
  const scrollPos = window.screenY || document.documentElement.scrollTop + 200;
  domElements.links.forEach(link => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target.offsetTop <= scrollPos && target.offsetTop + target.offsetHeight > scrollPos) {
      removeActiveClass();
      link.classList.add("active");
    }
  });
}

// Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});
domElements.hiddenElements.forEach(element => observer.observe(element));

function toggleDarkMode() {
  domElements.bodyElement.classList.toggle("dark-mode");
  const isDarkMode = domElements.bodyElement.classList.contains("dark-mode");
  
  domElements.imageElement.setAttribute("src", isDarkMode ? "images/AbubakrAlsheikhDark.jpeg" : "images/AbubakrAlsheikh.jpeg");
  
  // Save the dark mode status to localStorage
  localStorage.setItem('darkMode', isDarkMode);
}

// Tab switching
document.addEventListener("DOMContentLoaded", () => {
  domElements.buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      domElements.buttons.forEach(btn => btn.classList.remove("active"));
      domElements.tabs.forEach(tab => tab.classList.remove("active"));
      button.classList.add("active");
      domElements.tabs[index].classList.add("active");
    });
  });
  domElements.buttons[0].click();
});