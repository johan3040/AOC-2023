import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
});

const [timeRow, distanceRow] = input.split('\n');
const t = Number(
  timeRow
    .split(/\s{2,}|\t/)
    .splice(1)
    .join('')
);
const d = Number(
  distanceRow
    .split(/\s{2,}|\t/)
    .splice(1)
    .join('')
);

export const getAnswer = (time = t, distance = d) => {
  const recordDistance = distance;
  let tot = 0;
  for(let i = 0; i < time; i++) {
    const holdTime = i + 1;
    const travelTime = time - holdTime;
    const distanceTraveled = holdTime * travelTime;
    if(distanceTraveled > recordDistance) {
      tot += 1;
    }
  }
  return tot;
};
