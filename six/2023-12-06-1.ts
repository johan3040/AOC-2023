import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
});

const [timeRow, distanceRow] = input.split('\n');
const t = timeRow
  .split(/\s{2,}|\t/)
  .splice(1)
  .map(Number);
const d = distanceRow
  .split(/\s{2,}|\t/)
  .splice(1)
  .map(Number);

export const getAnswer = (time = t, distance = d) => {
  return time.reduce((acc, curr, index) => {
    const recordDistance = distance[index];

    const values = Array.from({ length: curr })
      .map((_, i) => {
        const holdTime = i + 1;
        const travelTime = curr - holdTime;
        const distanceTraveled = holdTime * travelTime;
        return [holdTime, distanceTraveled];
      })
      .filter(
        ([_, distanceTraveled]) => distanceTraveled > recordDistance
      )
      .map(([holdTime]) => holdTime);

    if(acc === 0) return values.length
    return acc * values.length;
  }, 0);
};

