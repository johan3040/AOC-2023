import { getResult } from './2023-12-02-1';

describe('2023-12-02-1', () => {
    it('runns', () => {
        const input = `Game 1: 1 green, 1 blue, 1 red; 1 green, 8 red, 7 blue; 6 blue, 10 red; 4 red, 9 blue, 2 green; 1 green, 3 blue; 4 red, 1 green, 10 blue
        Game 2: 42 green, 1 blue, 1 red; 1 green, 8 red, 7 blue; 6 blue, 10 red; 4 red, 9 blue, 2 green; 1 green, 3 blue; 4 red, 1 green, 10 blue`;
        const data = input.split('\n');
        expect(getResult(data)).toBe(1);
    });

    it('runns with correct data', () => {
        expect(getResult()).toBe(3035);
    });
});
