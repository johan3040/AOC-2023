import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/testInput.txt', {
  encoding: 'utf8',
});

import { getAnswer } from './2023-12-05-1';

describe('2023-12-05-1', () => {
  it('runns with mocked input', () => {
    expect(getAnswer(input)).toBe(true);
  });
});
