import * as fs from "fs";
import * as path from "path";
import { decode } from 'html-entities';
import * as gtranslate from "./google-translate.js";

const DESTINATION = "./src/translations.js";
const DEFAULT_LOCALE = "en";
const TRANSLATIONS_DIR = "./translations";

(async function() {
    const translations = getTranslations();
    const updated = checkForUpdates(translations);
    if (updated) {
        await updateTranslations(translations);
        writeTranslationsToFile(translations);
        console.log(`Translations written to ${DESTINATION}`);
    } else {
        console.log(`Translations up-to-date`);
    }
})();

function getTranslations() {
    const jsonFiles = fs
        .readdirSync(TRANSLATIONS_DIR)
        .filter((file) => path.extname(file) === ".json");
    
    let translations = {};
    
    jsonFiles.forEach((file) => {
        const fileData = fs.readFileSync(path.join(TRANSLATIONS_DIR, file));
        const filename = file.replace(".json", "").toLowerCase();
        const json = JSON.parse(fileData.toString());
        translations[filename] = json;
    });
    
    return translations;
}

async function updateTranslations(translations) {
    let defaults = translations[DEFAULT_LOCALE]["default"];

    let opts = {from: 'en', to: ''};

    let keys = [];
    let src = [];
    for (const str in defaults) {
        keys.push(str);
        src.push(defaults[str]);
    }

    for (const lang in translations) {
        if (lang == DEFAULT_LOCALE) {
            continue;
        }
        opts.to = lang;
        let translatedStrs = await gtranslate.translate(src, opts);

        for (let i = 0; i < keys.length; i++) {
            translations[lang]["default"][keys[i]] = decode(translatedStrs[i].translatedText);
        }

        // write out
        const translationsString = JSON.stringify(translations[lang], null, 4);
        fs.writeFileSync(TRANSLATIONS_DIR + '/' + lang + '.json', translationsString);
    }   
    
}

function checkForUpdates(translations) {
    const translationsString = JSON.stringify(translations);
    const translationsObj = `export const translations = ${translationsString};`;
    const fileData = fs.readFileSync(DESTINATION).toString();
    if (fileData == translationsObj) {
        return false;
    }
    return true;
}

function writeTranslationsToFile(translations) {
    const translationsString = JSON.stringify(translations);
    const translationsObj = `export const translations = ${translationsString};`;
    fs.writeFileSync(DESTINATION, translationsObj);
}