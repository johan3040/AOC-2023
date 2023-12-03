import { data } from './2023-12-02-1';

export const getResult = (d = data) =>
    d.reduce((acc, curr) => {
        const rounds = curr
            .replace(/Game (\d+): /, '')
            .split(';')
            .map((x) => x.split(',').map((y) => y.trim()));

        /**
         * [
            { blue: 1, green: 13, red: 14 },
            { green: 11, blue: 11, red: 7 },
            { red: 2, blue: 1, green: 2 },
            { blue: 10, red: 15 }
            ]
        */
        const formattedRounds = rounds.map((round) =>
            round.reduce((acc, cur) => {
                const [num, val] = cur.split(' ');
                acc[val] = Number(num);
                return acc;
            }, {} as Record<string, number>)
        );

        /**
         *  {
                blue: [1, 11, 1, 10],
                green: [13, 11, 2],
                red: [14, 7, 2, 15],
            }
         */
        const colorsWithValues = formattedRounds.reduce((acc, cur) => {
            Object.entries(cur).forEach(([key, val]) => {
                if (acc[key]) {
                    acc[key].push(Number(val));
                } else {
                    acc[key] = [Number(val)];
                }
            });

            return acc;
        }, {} as Record<string | number, number[]>);

        const cubedValue = Object.entries(colorsWithValues).reduce(
            (acc, [_key, val]) => {
                const v = val.sort((a, b) => b - a).at(0) ?? 0;
                return acc * v;
            },
            1
        );

        return acc + cubedValue;
    }, 0);
