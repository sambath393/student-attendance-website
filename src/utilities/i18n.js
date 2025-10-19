import { en, zh } from '@locales';

/**
 * @typedef {object} ReturnLocale
 * @property {string} locale
 * @property {string} cx
 */

/**
 * @param {'en' | 'zh'} locale
 * @returns {ReturnLocale}
 */
export const tran = (locale) => {
  switch (locale) {
    case 'en':
      return { locale: en, cx: `en` };
    case 'zh':
      return { locale: zh, cx: `zh` };
    default:
      return { locale: zh, cx: `zh` };
  }
};
