import { getAnswer } from './2023-12-09-2';
import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/testInput.txt', {
  encoding: 'utf8',
});
describe.skip('2023-12-09-1', () => {
  it('should work', () => {
    expect(getAnswer(input)).toBe(2);
  });
});
