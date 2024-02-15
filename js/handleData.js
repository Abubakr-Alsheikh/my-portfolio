import projects from "../data/projects.json" assert { type: "json" };
import certificates from "../data/certificates.json" assert { type: "json" };
import education from "../data/education.json" assert { type: "json" };
import skills from "../data/skills.json" assert { type: "json" };
import platforms from "../data/platforms.json" assert { type: "json" };

window.addEventListener("DOMContentLoaded", function () {
  showProjects(projects.reverse());
  showProjectBtns();
  showCertificates(
    certificates.reverse().filter(function (certificate) {
      return certificate.type == "specialization";
    })
  );
  showCertificateBtns();
  
  loadEducation();
  loadSkills();
  loadPlatforms();
});

// Projects
const prosSection = document.querySelector(".projects .container");
function showProjects(projectData) {
  const pros = projectData.map(function (project) {
    return `<div class="box">
            <a
            href="${project["image-project"]}"
            data-lightbox="project"
            data-title="You can see the website by <a href='${project.url}' target='_blank'>Clicking Here</a>"
            >
            <img src="${project["image-laptop"]}" alt="${project.title}" srcset="" />
            </a>
            <p>${project.title}</p>
        </div>`;
  });
  prosSection.innerHTML = pros.join("");
}

const prosBtns = document.querySelector(".projects .btns");
prosBtns.addEventListener("click", function (e) {
  if (e.target.dataset.type == undefined) return;
  addClassActive(e);
  const typeProject = e.target.dataset.type;

  let projecttype = projects.filter(function (project) {
    return project.type == typeProject;
  });
  showProjects(typeProject == "all" ? projects : projecttype);
});
function showProjectBtns() {
  let typeBtns = projects.reduce(
    function (values, project) {
      if (!values.includes(project.type)) values.push(project.type);
      return values;
    },
    ["all"]
  );
  prosBtns.innerHTML = typeBtns
    .map(function (type) {
      return `<button data-type="${type}" data-i18n="projects-${type}-button" class="${type == "all" ? "active" : ""}"  >${type}</button>`;
    })
    .join("");
}

// Certificates
const certSection = document.querySelector(".certificates .container");
function showCertificates(certificateData) {
  const certs = certificateData.map(function (certificate) {
    return `<div class="box">
        <a 
        href="${certificate.image}" 
        data-lightbox="certificates" 
        data-title="If you want to see the certificate <a href='${certificate.url}' target='_blank'>Click Here</a>"
        >
          <img src="${certificate.image}" alt="${certificate.title}"/>
        </a>
        <p>${certificate.title}</p>
      </div>`;
  });
  certSection.innerHTML = certs.join("");
}

const certBtns = document.querySelector(".certificates .btns");
certBtns.addEventListener("click", function (e) {
  if (e.target.dataset.type == undefined) return;
  addClassActive(e);
  const typecertificate = e.target.dataset.type;
  let certificatetype = certificates.filter(function (certificate) {
    return certificate.type == typecertificate;
  });
  showCertificates(typecertificate == "all" ? certificates : certificatetype);
});
function showCertificateBtns() {
  let typeBtns = certificates.reduce(
    function (values, certificate) {
      if (!values.includes(certificate.type)) values.push(certificate.type);
      return values;
    },
    ["all"]
  );
  certBtns.innerHTML = typeBtns
    .map(function (type) {
      return `<button data-type="${type}" class="${type == "specialization" ? "active" : ""}" data-i18n="certificates-${type}-button" >${type}</button>`;
    })
    .join("");
}

// Education
function loadEducation() {
  let html = education
    .map((item) => {
      return `
          <div class="educat">
              ${
                item.degree
                  ? '<i class="fas fa-graduation-cap"></i>'
                  : '<i class="fas fa-book-open"></i>'
              }
              <h4 class="title">${item.title}</h4>
              <span class="place">${item.place}</span><br>
              <span class="date">${item.date}</span>
              <span class="degree" style="display:${
                item.degree ? "inline" : "none"
              }"> | ${item.degree}</span>
          </div>
      `;
    })
    .reverse()
    .join("");

  document.querySelector(".timeline").innerHTML = html;
}

// Global function
function addClassActive(e) {
  e.currentTarget.querySelectorAll("button").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}

function loadSkills() {
  let skillsContainer = document.querySelector(".skills-container");

  // Clear the container
  skillsContainer.innerHTML = "";

  // Generate categories and skills
  Object.keys(skills).forEach((categoryTitle) => {
    let categoryHTML = `
      <div class="category">
        <div class="title">
          <h4>${categoryTitle}</h4>
          <i class="fa fa-arrow-down"></i>
        </div>
        <div class="menu">
          ${skills[categoryTitle]
            .map(
              (item) => `
            <div class="skill">
              <h5>${item.skill}</h5>
              <div class="porgrass-container">
                <span class="prograss" style="width: ${item.prograss};"></span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    // Append the category to the container
    skillsContainer.innerHTML += categoryHTML;
  });

  // Add event listeners for the titles
  let categories = document.querySelectorAll(".skills-container .category");
  categories.forEach((category) => {
    category.querySelector(".title").addEventListener("click", function () {
      let activeCategory = document.querySelector(
        ".skills-container .category.active"
      );

      if (activeCategory && activeCategory !== category) {
        activeCategory.classList.remove("active");
      }

      category.classList.toggle("active");
    });
  });
}

function loadPlatforms(){
  let container = document.querySelector('.platforms-container');

  let platform = platforms.map(platform => {
    return `
      <div class="platform">
        <img src="${platform.img}" alt="platform.title">
        <div class="info">
          <h3 class="title">${platform.title}</h3>
          <a href="${platform['url-profile']}" target="_blank" >View Profile</a>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = platform;
}