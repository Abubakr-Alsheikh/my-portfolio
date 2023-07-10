const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scroll", window.scrollY > 50);
});

//To show elements in nice way
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }else{
            entry.target.classList.remove("show");
        }
    });
});
const hidenElements = document.querySelectorAll(".hidden");
hidenElements.forEach((element) => observer.observe(element));

//switch between dark and light mode
function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
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

