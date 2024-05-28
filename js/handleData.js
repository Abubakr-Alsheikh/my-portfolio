import projects from "../data/projects.json" assert { type: "json" };
import certificates from "../data/certificates.json" assert { type: "json" };
import education from "../data/education.json" assert { type: "json" };
import skills from "../data/skills.json" assert { type: "json" };
import platforms from "../data/platforms.json" assert { type: "json" };

window.addEventListener("DOMContentLoaded", () => {
  loadData(projects, showProjects, ".projects", "top");
  loadData(certificates, showCertificates, ".certificates", "top");
  loadEducation();
  loadSkills();
  loadPlatforms();
  updateBoxFillter();
});

function updateBoxFillter(){
  // const boxes = document.querySelectorAll('.projects .container .box');
  const boxes = document.querySelectorAll('.projects .container .box, .certificates .container .box');
        
  window.addEventListener('scroll', function() {
    boxes.forEach(box => {
      const boxRect = box.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the box is in the middle of the viewport
      const isCentered = boxRect.top <= (windowHeight / 2) && 
                        boxRect.bottom >= (windowHeight / 2);

      if (isCentered) {
        box.querySelector('img').style.filter = 'grayscale(0)';
      } else {
        box.querySelector('img').style.filter = 'grayscale(1)';
      }
    });
  });
}

function loadData(data, showFunction, sectionClass, typeToShow) {
  const section = document.querySelector(`${sectionClass} .container`);
  const btns = document.querySelector(`${sectionClass} .btns`);
  showFunction(
    typeToShow != "all"
      ? data.reverse().filter((item) => item.type == typeToShow)
      : data.reverse(),
    section
  );
  showBtns(data, btns, typeToShow);

  btns.addEventListener("click", (e) => {
    if (e.target.dataset.type == undefined) return;
    addClassActive(e);
    const typeData = e.target.dataset.type;
    showFunction(
      typeData == "all" ? data : data.filter((item) => item.type == typeData),
      section
    );
    updateBoxFillter();
  });
}

function showProjects(projectData, section) {
  section.innerHTML = projectData
    .map(
      (project) =>
        `<div class="box"><a href="${project["image-project"]}" data-lightbox="project" data-title="${project.title}<br>You can see the website by <a href='${project.url}' target='_blank'>Clicking Here</a>"><img src="${project["image-laptop"]}" alt="${project.title}" srcset="" /></a><p>${project.title}</p></div>`
    )
    .join("");
}

function showCertificates(certificateData, section) {
  section.innerHTML = certificateData
    .map(
      (certificate) =>
        `<div class="box"><a href="${certificate.image}" data-lightbox="certificates" data-title="${certificate.title}<br>If you want to see the certificate <a href='${certificate.url}' target='_blank'>Click Here</a>"><img src="${certificate.image}" alt="${certificate.title}"/></a><p>${certificate.title}</p></div>`
    )
    .join("");
}

function showBtns(data, btns, typeToShow) {
  btns.innerHTML = data
    .reduce(
      (values, item) =>
        !values.includes(item.type) ? values.push(item.type) && values : values,
      ["all"]
    )
    .map(
      (type) =>
        `<button data-type="${type}" class="text-shadow ${
          type == typeToShow ? "active" : ""
        }"  >${type}</button>`
    )
    .join("");
}

function loadEducation() {
  document.querySelector(".timeline").innerHTML = education
    .map(
      (item) =>
        `<div class="educat">${
          item.degree
            ? '<i class="fas fa-graduation-cap"></i>'
            : '<i class="fas fa-book-open"></i>'
        }<h4 class="title">${item.title}</h4><span class="place">${
          item.place
        }</span><br><span class="date">${
          item.date
        }</span><span class="degree" style="display:${
          item.degree ? "inline" : "none"
        }"> | ${item.degree}</span></div>`
    )
    .reverse()
    .join("");
}

function addClassActive(e) {
  e.currentTarget
    .querySelectorAll("button")
    .forEach((element) => element.classList.remove("active"));
  e.target.classList.add("active");
}

function loadSkills() {
  let skillsContainer = document.querySelector(".skills-container");
  skillsContainer.innerHTML = "";
  Object.keys(skills).forEach((categoryTitle) => {
    let categoryHTML = `<div class="category"><div class="title"><h4>${categoryTitle}</h4><i class="fa fa-arrow-down"></i></div><div class="menu">${skills[
      categoryTitle
    ]
      .map(
        (item) =>
          `<div class="skill"><h5>${item.skill}</h5><div class="porgrass-container"><span class="prograss" style="width: ${item.prograss};"></span></div></div>`
      )
      .join("")}</div></div>`;
    skillsContainer.innerHTML += categoryHTML;
  });

  document
    .querySelectorAll(".skills-container .category")
    .forEach((category) => {
      category.querySelector(".title").addEventListener("click", function () {
        let activeCategory = document.querySelector(
          ".skills-container .category.active"
        );
        if (activeCategory && activeCategory !== category)
          activeCategory.classList.remove("active");
        category.classList.toggle("active");
      });
    });
}

function loadPlatforms() {
  document.querySelector(".platforms-container").innerHTML = platforms
    .map(
      (platform) =>
        `<div class="platform"><img src="${platform.img}" alt="platform.title"><div class="info"><h3 class="title">${platform.title}</h3><a href="${platform["url-profile"]}" target="_blank" >View Profile</a></div></div>`
    )
    .join("");
}