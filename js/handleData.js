import projects from "../data/projects.json" assert {type: "json"};
import certificates from "../data/certificates.json" assert {type: "json"};

const prosSection = document.querySelector(".projects .container");
window.addEventListener("DOMContentLoaded",function(){
    const pros = projects.map(function(project){
        return `<div class="box">
            <a
            href="${project["image-project"]}"
            data-lightbox="project"
            data-title="<a href='${project.url}'>See the website</a>"
            >
            <img src="${project["image-laptop"]}" alt="${project.title}" srcset="" />
            </a>
            <p>${project.title}</p>
        </div>`;
    });
    prosSection.innerHTML = pros.join("");
})

const certSection = document.querySelector(".certificates .container");
window.addEventListener("DOMContentLoaded",function(){
    const certs = certificates.map(function(certificate){
        return `<div class="box">
        <a 
        href="${certificate.image}" 
        data-lightbox="certificates" 
        data-title="<a href='${certificate.url}'>See the certificate</a>"
        >
          <img src="${certificate.image}" alt="${certificate.title}" srcset="" />
        </a>
        <p>${certificate.title}</p>
      </div>`;
    });
    certSection.innerHTML = certs.join("");
})