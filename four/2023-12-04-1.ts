import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
});

export const getAnswer = (inp = input) => {
  const data = inp.split('\n').map((s) => s.trim());

  return data.reduce((acc, line) => {
    const [myNumbers, luckyNumbers] = line
      .replace(/Card \d+: /, '')
      .split(' | ')
      .map((line) => line.trim());

    const winningNumbers = luckyNumbers
      .split(' ')
      .filter((value) => value !== '');
    const existingNumbers = myNumbers
      .split(' ')
      .filter((n) => winningNumbers.includes(n))
      .map(Number);

    const roundScore = existingNumbers.reduce(
      (a) => (a === 0 ? a + 1 : a * 2),
      0
    );
    return acc + roundScore;
  }, 0);
};
