import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
})
const data = input.split('\n');

const specialCharactersRegex = /[!"#$%&'()*+,\-\/:;<=>?@\[\]{}|\\^_`~]/;

export const getAnswer = (d = data) =>
  d.reduce((acc, entry, lineIndex) => {
    const chars = entry.split('');
    const matches = [...entry.matchAll(/(\d+)/g)];
    let tot = 0;

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const length = match[0].length;
      const index = match.index;

      if (index !== undefined && index >= 0 && index < chars.length) {
        const prevChar = chars[index - 1];
        const nextChar = chars[index + length];

        // Match against current line
        if (
          prevChar?.match(specialCharactersRegex) ||
          nextChar?.match(specialCharactersRegex)
        ) {
          tot += parseInt(match[0]);
        }

        // Continue to search in previous line
        if (lineIndex > 0) {
          const prevLine = d[lineIndex - 1].trim();
          const stringMatch = prevLine.substring(
            Math.max(index - 1, 0),
            index + length + 1
          );
          const prevLineMatch = stringMatch.match(specialCharactersRegex);

          if (prevLineMatch) {
            tot += parseInt(match[0]);
          }
        }

        // Continue to search in next line
        if (d[lineIndex + 1]) {
          const nextLine = d[lineIndex + 1].trim();

          const stringMatch = nextLine.substring(
            Math.max(index - 1, 0),
            index + length + 1
          );
          const nextLineMatch = stringMatch.match(specialCharactersRegex);
          if (match[0] === '633') {
          }
          if (nextLineMatch) {
            tot += parseInt(match[0]);
          }
        }
      }
    }
    return acc + tot;
  }, 0);