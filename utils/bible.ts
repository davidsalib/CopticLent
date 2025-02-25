interface DecodedVerseId {
  bookKey: string;
  chapter: number;
  verse: number;
}
export const decodeVerseId = (verseId: string): DecodedVerseId => {
  const verseIdLen = verseId.length;
  const bookKey = verseId.substring(0, verseIdLen - 6);
  const chapter = parseInt(
    verseId.substring(verseIdLen - 6, verseIdLen - 3),
    10
  );
  const verse = parseInt(verseId.substring(verseIdLen - 3, verseIdLen), 10);
  return { bookKey, chapter, verse };
};
