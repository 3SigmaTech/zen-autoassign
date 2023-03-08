import { translations } from "./translations.js";

var DEFAULT_LOCALE = "en";

export function processUserLocale(userLocale) {
    userLocale = userLocale.toLowerCase();

    let supportedLocales = Object.keys(translations).map((item) => {
        return item.toLowerCase();
    });
    
    let locale = DEFAULT_LOCALE;
    if (supportedLocales.includes(userLocale)) {
        locale = userLocale;
    }
    
    document.querySelectorAll("[data-i18n-key]").forEach((element) => {
        translateElement(element, locale);
    });
    
    return locale;
}

export function translateElement(element, locale) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[locale]["default"][key];
    element.innerText = translation;
}

export function getTranslation(locale, key) {
    if (Object.keys(translations[locale]["default"]).includes(key)) {
        return translations[locale]["default"][key];
    }
    else if (Object.keys(translations["en"]["default"]).includes(key)) {
        return translations[DEFAULT_LOCALE]["default"][key];
    }
    return "I18N ERROR: Unknown translation";
}
