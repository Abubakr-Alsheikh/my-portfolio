const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scroll", window.scrollY > 50);
});

//To show elements in nice way
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});
const hidenElements = document.querySelectorAll(".hidden");
hidenElements.forEach((element) => observer.observe(element));

//switch between dark and light mode
function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  if(element.classList.contains("dark-mode")){
    document.querySelector(".home .container .image img").setAttribute("src","https://drive.google.com/uc?id=1a4sydYUxBZ37RwqxWf2_dcvmt14-TYDX");
  }else{
    document.querySelector(".home .container .image img").setAttribute("src","https://drive.google.com/uc?id=1ysY1Yx_H5ExMaUJ1OM-I-89LJNFlpgdd");
  }
}
// Scroll script
const links = document.querySelectorAll('ul li a');
function removeActiveClass() {
  links.forEach(link => {
    link.classList.remove('active');
  });
}
function setActiveLink() {
  const scrollPos = window.screenY || document.documentElement.scrollTop + 200;
  links.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target.offsetTop <= scrollPos && target.offsetTop + target.offsetHeight > scrollPos) {
      removeActiveClass();
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });

// JavaScript
document.addEventListener('DOMContentLoaded', (event) => {
  const buttons = document.querySelectorAll('.tab-button');
  const tabs = document.querySelectorAll('.tabs > div');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('active'));
      tabs.forEach((tab) => tab.classList.remove('active'));

      button.classList.add('active');
      tabs[index].classList.add('active');
    });
  });

  // Automatically click the first button to show the first tab
  buttons[0].click();
});


