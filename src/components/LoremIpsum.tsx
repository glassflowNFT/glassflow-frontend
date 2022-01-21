import { LoremIpsum } from "lorem-ipsum";

export const loremIpsum = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 10,
    min: 4
  }
});

export const generateWords = (count: number) => {
  return loremIpsum.generateWords(count);
}

export const generateSentences = (count: number) => {
  return loremIpsum.generateSentences(count);
}
