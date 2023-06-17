const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scroll", window.scrollY > 50);
});

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

 // Get all the links in the header
const links = document.querySelectorAll('ul li a');

// Function to remove the active class from all links
function removeActiveClass() {
  links.forEach(link => {
    link.classList.remove('active');
  });
}

// Function to add the active class to the link corresponding to the current section
function setActiveLink() {
  // Get the current scroll position
  const scrollPos = window.screenY || document.documentElement.scrollTop + 200;

  // Loop through all the links
  links.forEach(link => {
    // Get the target section
    const target = document.querySelector(link.getAttribute('href'));
    // Check if the scroll position is within the target section
    if (target.offsetTop <= scrollPos && target.offsetTop + target.offsetHeight > scrollPos) {
      // Remove the active class from all links
      removeActiveClass();

      // Add the active class to the current link
      link.classList.add('active');
    }
  });
}

// Set the initial active link on page load
setActiveLink();

// Update the active link on scroll
window.addEventListener('scroll', setActiveLink, { passive: true });
