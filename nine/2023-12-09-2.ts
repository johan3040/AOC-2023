import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
});

export const getAnswer = (inp = input) => {
  const lines = inp.split('\n');
  let tot = 0;
  for (let i = 0; i < lines.length; i++) {
    let currentNums = lines[i].split(' ').map((n) => parseInt(n, 10));
    const allLines = [currentNums];
    while (!allLines.at(-1).every((n) => n === 0)) {
      const nextLine = [];
      for (let j = 0; j < currentNums.length; j++) {
        if (j < currentNums.length - 1) {
          nextLine.push(currentNums[j + 1] - currentNums[j]);
        }
      }

      allLines.push(nextLine);
      currentNums = allLines.at(-1);
    }

    /**
     * We know that the last line is all 0s, so we can pop it off and duplicate the last number in the previous line
     */
    allLines.pop();
    
    console.log(allLines);
    for (let i = allLines.length - 1; i > 0; i--) {
      const curNum = allLines[i][0];
      const nextNum = allLines[i - 1][0];
      console.log({ curNum, nextNum });
      allLines[i - 1].unshift(curNum - nextNum);
    }

    tot += allLines[0][0];
  }
  // 21676 -> too high
  // console.log({ tot });
  return tot;
};

// getAnswer();
