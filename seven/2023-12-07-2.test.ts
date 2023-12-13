import { getAnswer } from './2023-12-07-1';

describe('2023-12-07-2', () => {
  it('should work', () => {
    expect(
      getAnswer([
        ['32T3K', 765],
        ['T55J5', 684],
        ['KK677', 28],
        ['KTJJT', 220],
        ['QQQJA', 483],
      ])
    ).toBe(5905);
  });
});
