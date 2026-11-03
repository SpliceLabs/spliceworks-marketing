export const WORDS_PER_MINUTE = 250;

const stripMarkup = (body: string): string =>
  body
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/https?:\/\/\S+/g, " ");

export const wordCount = (body: string): number =>
  stripMarkup(body)
    .split(/\s+/)
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;

export const readingMinutes = (body: string): number => Math.ceil(wordCount(body) / WORDS_PER_MINUTE);
