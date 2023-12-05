import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
});

export const getAnswer = (inp = input) => {
  const data = inp.split('\n').map((s) => s.trim());

  const grouped = data.reduce((acc, line, index) => {
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

    const numberOfWinningNumbers = existingNumbers.length;

    acc[index] = {
      numberOfWinningNumbers,
      multiplier: 1,
    };

    return acc;
  }, {} as Record<string, { numberOfWinningNumbers: number; multiplier: number }>);

  for (const key in grouped) {
    const { numberOfWinningNumbers, multiplier } = grouped[key];
    if (numberOfWinningNumbers > 0) {
      const start = Number(key) + 1;
      const end = start + numberOfWinningNumbers;

      for (let y = 0; y < multiplier; y++) {
        for (let i = start; i < end; i++) {
          grouped[i.toString()].multiplier += 1;
        }
      }
    }
  }

  return Object.values(grouped).reduce((acc, { multiplier }) => acc + multiplier, 0);
};
