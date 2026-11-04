const PRICE = /[$€£]\s?\d|\b\d[\d,.]*\s?(?:USD|EUR|GBP)\b/i;
const TIME_BAND = /\b\d+\s*(?:hours?|hrs?|days?)\s*(?:\/|a\s|per\s)\s*(?:week|wk|month|mo)\b/i;

export const mentionsPriceOrTimeBand = (text: string): boolean => PRICE.test(text) || TIME_BAND.test(text);
