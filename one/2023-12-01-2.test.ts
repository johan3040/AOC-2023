import { getAnswer, getNumber } from './2023-12-01-2';

const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const data = input.split('\n');

describe('getAnswer', () => {
  it('runns correctly', () => {
    expect(getAnswer(data)).toBe(281);
  });

  it('accepts falsy data', () => {
    expect(getAnswer(['dsa'])).toBe(0);
  });

  it('works with overlaping characters', () => {
    expect(getAnswer(['eightwo'])).toBe(82);
    expect(getAnswer(['oneight'])).toBe(18);
  })
  
  it('runns with correct data', () => {
    expect(getAnswer()).toBe(54203);
  });
});

describe('getNumber', () => {
  it('return correct', () => {
    const res = data.map(getNumber);
    expect(res).toEqual(['29', '83', '13', '24', '42', '14', '76']);
  });
});
