# Abubakr Alsheikh - Personal Portfolio Website

This is the repository for my personal portfolio website. It's a clean, modern, and fully responsive single-page application designed to showcase my skills, projects, certificates, and professional background as a web developer and designer. The site is built with vanilla HTML, CSS, and JavaScript, and features dynamic content loading, an interactive UI, and an integrated AI chatbot.

### [➡️ Live Demo](https://abubakr-alsheikh.github.io/my-portfolio/)


## ✨ Features

-   **Fully Responsive Design:** Adapts seamlessly to any screen size, from mobile phones to desktops.
-   **Dynamic Content:** All major content sections (Projects, Certificates, Education, Skills) are loaded dynamically from JavaScript, making updates easy without touching the HTML.
-   **Dark/Light Mode:** A theme switcher to toggle between dark and light modes. The user's preference is saved in `localStorage` for future visits.
-   **AI Chatbot:** An integrated AI chatbot (powered by a custom backend) to answer visitor questions in real-time.
-   **Interactive UI:**
    -   Tabbed interface for the "About" section (Me, Education, Skills).
    -   Filterable galleries for projects and certificates.
    -   Image viewer (Lightbox2) for a detailed look at project mockups and certificates.
    -   Smooth "reveal on scroll" animations using the Intersection Observer API.
-   **Functional Contact Form:** A working contact form integrated with [Formspree](https://formspree.io/) for easy message submission.
-   **SEO Friendly:** Includes meta tags for description, keywords, author, and Google Site Verification.


## 🛠️ Tech Stack

-   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
-   **Libraries:** jQuery, [Lightbox2](https://lokeshdhakar.com/projects/lightbox2/)
-   **Tools & Platforms:**
    -   [Font Awesome](https://fontawesome.com/) (for icons)
    -   [Google Fonts](https://fonts.google.com/) (Inter)
    -   [Formspree](https://formspree.io/) (for contact form)
    -   [Google Analytics](https://analytics.google.com/)
-   **Backend (Chatbot):** The AI chatbot is powered by a custom Python backend hosted on [PythonAnywhere](https://www.pythonanywhere.com/).


## 📂 Project Structure

The project is organized with a clear and logical directory structure:

```
abubakr-alsheikh-my-portfolio/
├── data/                    # JSON files for content (reference/backup)
│   ├── certificates.json
│   ├── education.json
│   ├── platforms.json
│   ├── projects.json
│   ├── skills.json
│   └── lang/                # Language files for i18n
│       ├── ar.json
│       └── en.json
├── js/                      # JavaScript files
│   ├── chatScript.js        # Logic for the AI chatbot
│   ├── contact-script.js    # Formspree contact form handling
│   ├── handleData.js        # Main script to load all dynamic content
│   ├── script.js            # General UI interactions (theme, animations)
│   └── translate.js         # (Inactive) Internationalization logic
├── style/                   # CSS files
│   ├── rtl-style.css        # (Inactive) Right-to-left language support
│   └── style.css            # Main stylesheet with dark/light themes
├── webfonts/                # Font Awesome webfonts
├── index.html               # The main HTML file for the single-page app
└── google*.html             # Google site verification file
```
