export type EmphasisPart = { readonly text: string; readonly em: boolean };

export const emphasize = (text: string, phrase: string | undefined): readonly EmphasisPart[] => {
  const at = phrase ? text.indexOf(phrase) : -1;
  if (!phrase || at === -1) return [{ text, em: false }];
  return [
    { text: text.slice(0, at), em: false },
    { text: phrase, em: true },
    { text: text.slice(at + phrase.length), em: false },
  ].filter((part) => part.text.length > 0);
};
