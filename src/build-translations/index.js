import * as fs from "fs";
import * as path from "path";
import { decode } from 'html-entities';
import * as gtranslate from "./google-translate.js";

const DESTINATION = "./src/translations.js";
const DEFAULT_LOCALE = "en";
const TRANSLATIONS_DIR = "./translations";
const README = "./readme.md";
const README_KEYS = ["name", "short_description", "long_description", "installation_instructions"];

(async function() {
    const translations = getTranslations();

    updateAppDetailsIfNecessary(translations);
    
    const updated = checkForUpdates(translations);
    if (updated) {
        await updateTranslations(translations);
        writeTranslationsToFile(translations);
        console.log(`Translations written to ${DESTINATION}`);
    } else {
        console.log(`Translations up-to-date`);
    }
})();

function updateAppDetailsIfNecessary(translations) {
    const readme = fs.readFileSync(README).toString();

    let updated = false;
    let appObj = {};
    for (let key of README_KEYS) {
        let rx = new RegExp(`# ${key.replace("_", " ")}\\n([\\s\\S]*?)\\n# `, "im");
        let matches = readme.match(rx);
        if (matches.length > 1) {
            if (appObj[key] != matches[1].trim()) {
                appObj[key] = matches[1].trim();
                updated = true;
            }
        }
    }

    let prx = new RegExp(`## Parameters([\\s\\S]*?)\\n# `, "im");
    let pMatches = readme.match(prx);
    let params = translations[DEFAULT_LOCALE]["app"]["parameters"];
    if (pMatches.length > 1) {
        prx = new RegExp(`<!-- ([\\s\\S]*?) -->\\n\\* \\*\\*([\\s\\S]*?)\\*\\*[-:] ([\\s\\S]*?)\\n`, "g");
        pMatches = pMatches[1].matchAll(prx);
        for (const match of pMatches) {
            let pname = match[1];
            let plabel = match[2];
            let phelp = match[3];
            if (params[pname]) {
                if (params[pname]["label"] != plabel) {
                    params[pname]["label"] = plabel;
                    updated = true;
                }
                if (params[pname]["helpText"] != phelp) {
                    params[pname]["helpText"] = phelp;
                    updated = true;
                }
            } else {
                params[pname] = {
                    "label": plabel,
                    "helpText": phelp
                }
                updated = true;
            }
        }
    }

    if (updated) {
        for (let key in appObj) {
            translations[DEFAULT_LOCALE]["app"][key] = appObj[key];
        }

        const translationsString = JSON.stringify(translations[DEFAULT_LOCALE], null, 4);
        fs.writeFileSync(TRANSLATIONS_DIR + '/' + DEFAULT_LOCALE + '.json', translationsString);
    }
    return appObj;
}

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