// Cache DOM elements to avoid repeated queries
const domElements = {
  header: document.querySelector("header"),
  hiddenElements: document.querySelectorAll(".hidden"),
  links: document.querySelectorAll("ul li a"),
  buttons: document.querySelectorAll(".tab-button"),
  tabs: document.querySelectorAll(".tabs > div"),
  bodyElement: document.body,
  imageElement: document.querySelector(".home .container .image img"),
};

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("overlay").classList.add("hide");
  setTimeout(() => {
    document.getElementById("overlay").style.display = "none";
  }, 1000);

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });
  domElements.hiddenElements.forEach((element) => observer.observe(element));
});

// Scroll event listener
window.addEventListener(
  "scroll",
  () => {
    domElements.header.classList.toggle("scroll", window.scrollY > 50);
    setActiveLink();
  },
  { passive: true }
);

// Active link setting
function removeActiveClass() {
  domElements.links.forEach((link) => link.classList.remove("active"));
}
function setActiveLink() {
  const scrollPos = window.screenY || document.documentElement.scrollTop + 200;
  domElements.links.forEach((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (
      target.offsetTop <= scrollPos &&
      target.offsetTop + target.offsetHeight > scrollPos
    ) {
      removeActiveClass();
      link.classList.add("active");
    }
  });
}

function toggleDarkMode() {
  domElements.bodyElement.classList.toggle("dark-mode");
  const isDarkMode = domElements.bodyElement.classList.contains("dark-mode");

  domElements.imageElement.setAttribute(
    "src",
    isDarkMode
      ? "images/AbubakrAlsheikhDark.jpeg"
      : "images/AbubakrAlsheikh.jpeg"
  );

  // Save the dark mode status to localStorage
  localStorage.setItem("darkMode", isDarkMode);
}

// Tab switching
document.addEventListener("DOMContentLoaded", () => {
  domElements.buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      domElements.buttons.forEach((btn) => btn.classList.remove("active"));
      domElements.tabs.forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      domElements.tabs[index].classList.add("active");
    });
  });
  domElements.buttons[0].click();
});