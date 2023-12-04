import { getAnswer } from './2023-12-03-1';

describe('2023-12-03-1', () => {
  it('runns correctly - 3', () => {
    const data = `467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`;
    
    const input = data.split('\n').map(s => s.trim());
    expect(getAnswer(input)).toBe(4361);
  });

  it('runns correctly - final', () => {
    expect(getAnswer()).toBe(539637);
  });
});
