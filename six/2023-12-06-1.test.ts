import { getAnswer } from './2023-12-06-1';

describe('2023-12-06-1', () => {
  it('runns', () => {
    expect(getAnswer([7, 15, 30], [9, 40, 200])).toBe(288);
  });
});
