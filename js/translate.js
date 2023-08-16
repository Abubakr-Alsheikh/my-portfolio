import ar from "../data/lang/ar.json" assert { type: "json" };
import en from "../data/lang/en.json" assert { type: "json" };

class Translator {
  constructor() {
    this._lang = this.getLanguage();
    this._elements = document.querySelectorAll("[data-i18n]");
  }

  getLanguage() {
    let lang = navigator.languages
      ? navigator.languages[0]
      : navigator.language;
    return lang.substr(0, 2);
  }

  async load(lang = null) {
    if (lang) {
      if (!window.I18N_LANGUAGES.includes(lang)) return;
      this._lang = lang;
    }
    // let translation = await Translator.getTranslation(this._lang);
    if (this._lang == "en") this.translate(en);
    else this.translate(ar);
    this.toggleLangTag();
  }

  async translate(translation) {
    this._elements.forEach((element) => {
      let keys = element.dataset.i18n.split(".");
      let text = keys.reduce((obj, i) => obj[i], translation);
      if (text) {
        element.innerHTML = text;
      } else {
        element.innerHTML = element.dataset.i18n;
      }
    });

    document.querySelector("[name='name']").placeholder = translation["content-input-fullanme"];
    document.querySelector("[name='email']").placeholder = translation["content-input-email"];
    document.querySelector("[name='project']").placeholder = translation["content-input-project"];
    document.querySelector("[name='message']").placeholder = translation["content-input-message"];
    document.getElementById("my-form-button").value = translation["content-submit-button"];
  }

  toggleLangTag() {
    if (document.documentElement.lang !== this._lang) {
      document.documentElement.lang = this._lang;
    }
  }

  static async getTranslation(lang) {
    try {
      let translation;
      if (lang == "en") {
        translation = await fetch("../data/lang/en.json");
      } else {
        translation = await fetch("../data/lang/ar.json");
      }
      return await translation.json();
    } catch (err) {
      console.error(err);
    }
  }
}

let listItems = document.querySelectorAll(".language li");
let activeItem = document.querySelector(".language li.active");
listItems.forEach((item) => {
  item.addEventListener("click", () => {
    let lang = item.textContent === "English" ? "en" : "ar";
    if (lang == "ar") document.dir = "rtl";
    else document.dir = "ltr";
    translator.load(lang);
    activeItem.classList.remove("active");
    item.classList.add("active");
    activeItem = item;
  });
});

let translator = null;
window.addEventListener("DOMContentLoaded", () => {
  translator = new Translator();
  window.I18N_LANGUAGES = ["en", "ar"];
  translator.load();
});
