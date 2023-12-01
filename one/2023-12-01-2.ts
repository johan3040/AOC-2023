import { input } from './data';

const data = input.split('\n');

const regex =
  /(?=(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|(1)|(2)|(3)|(4)|(5)|(6)|(7)|(8)|(9))/g;

const mapper = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
} as Record<string, string>;

export const getNumber = (s: string) => {
  const matches = [...s.matchAll(regex)].map(v => v.filter(Boolean))
  const mappedValues = matches.map(([val]) =>
    isNaN(parseInt(val)) ? mapper[val] : val
  );
  const first = mappedValues[0];
  const last = mappedValues.at(-1);

  return `${first}${last}`;
};

export const getAnswer = (d = data) =>
  d.reduce((acc, curr) => {
    const val = parseInt(getNumber(curr)) || 0;
    return acc + val;
  }, 0);

