import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import vnm from './Languages/en';
import en from './Languages/vnm';

i18n
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                translations: en
            },
            vnm: {
                translations: vnm
            }
        },
        fallbackLng: 'en',

// have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

        react: {
            wait: true
        }
    });

i18n.changeLanguage('vnm');

export default i18n;
