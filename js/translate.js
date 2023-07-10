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
    let translation = await Translator.getTranslation(this._lang);
    this.translate(translation);
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
  }

  toggleLangTag() {
    if (document.documentElement.lang !== this._lang) {
      document.documentElement.lang = this._lang;
    }
  }

  static async getTranslation(lang) {
    try {
      let translation = await fetch(`../data/lang/${lang}.json`);
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
    if(lang == "ar") document.dir = "rtl"; else document.dir = "ltr";
    translator.load(lang);
    activeItem.classList.remove("active");
    item.classList.add("active");
    activeItem = item;
  });
});


let translator=null;
window.addEventListener("DOMContentLoaded",()=>{
    console.log("object Lang");
    translator = new Translator();
    window.I18N_LANGUAGES = ["en", "ar"];
    translator.load();
})


 