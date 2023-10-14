import projects from "../data/projects.json" assert { type: "json" };
import certificates from "../data/certificates.json" assert { type: "json" };
// import { Translator } from "./translate.js";

window.addEventListener("DOMContentLoaded", function () {
  console.log("object");
  showProjects(projects.reverse());
  showProjectBtns();

  // showCertificates(certificates);
  showCertificates(
    certificates.reverse().filter(function (certificate) {
      return certificate.type == "specialization";
    })
  );
  showCertificateBtns();
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
let proPreviousType = "all";
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
          <img src="${certificate.image}" alt="${certificate.title}" srcset=""
          width="320px" height="260px"/>
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

// Global function
function addClassActive(e) {
  e.currentTarget.querySelectorAll("button").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}
