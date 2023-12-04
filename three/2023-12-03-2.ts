import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
});
const data = input.split('\n');

const getNumberFromLine = (
  line: string,
  mIndex: number,
  match: RegExpMatchArray
) => {
  const a = Math.max(match.index ?? 0 - 1, 0);
  const index = mIndex + a;

  let nums: Array<string> = [];

  for (let i = index; i < line.length; i++) {
    if (!isNaN(parseInt(line[i]))) {
      nums.push(line[i]);
    } else {
      break;
    }
  }

  for (let i = index - 1; i >= 0; i--) {
    if (!isNaN(parseInt(line[i]))) {
      nums.unshift(line[i]);
    } else {
      break;
    }
  }
  return Number(nums.join(''));
};

export const getAnswer = (d = data) => {
  const x = d.reduce((acc, entry, lineIndex) => {
    const matches = [...entry.matchAll(/(\*)/g)];
    let tot = 0;

    for (let i = 0; i < matches.length; i++) {
      let nums: Array<number> = [];
      const match = matches[i];
      const matchIndex = match.index;

      /**
       *
       * [1, 2, 3]
       * [1, *, .]
       * [., ., .]
       */
      if (matchIndex !== undefined) {
        const startIndex = Math.max(matchIndex - 1, 0);
        const endIndex = matchIndex + 2;
        const prevLine = d[lineIndex - 1]?.slice(startIndex, endIndex);
        const nextLine = d[lineIndex + 1]?.slice(startIndex, endIndex);
        const currLine = d[lineIndex].slice(startIndex, endIndex);

        const matchOne = prevLine ? [...prevLine.matchAll(/(\d+)/g)] : [];
        const matchTwo = [...currLine.matchAll(/(\d+)/g)];
        const matchThree = nextLine ? [...nextLine.matchAll(/(\d+)/g)] : [];

        if (matchOne.length + matchTwo.length + matchThree.length === 2) {
          // console.log('Hit', matchOne, matchTwo, matchThree);

          matchOne.forEach((m) => {
            const num = getNumberFromLine(d[lineIndex - 1], matchIndex, m);
            if (num) nums.push(num);
          });

          matchTwo.forEach((m) => {
            const num = getNumberFromLine(d[lineIndex], matchIndex, m);
            if (num) nums.push(num);
          });

          matchThree.forEach((m) => {
            const num = getNumberFromLine(d[lineIndex + 1], matchIndex, m);
            if (num) nums.push(num);
          });

          let all = nums.reduce((a, c) => a * c, 1);
          console.log(nums, all);
          tot += all;
        } else {
          return acc;
        }
      }
    }

    return acc + tot;
  }, 0);
  console.log(x);
  return x;
};

// getAnswer();

// 64015041 -> too low
