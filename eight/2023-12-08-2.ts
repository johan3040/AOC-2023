import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
});

const [dirs, , ...steps] = input.split('\n');

const stepsWithIndex = steps.reduce((acc, step, i) => {
  const [key] = step.split(' = ');
  acc[key] = i;
  return acc;
}, {} as Record<number, string>);

const getAnswer = () => {
  const startIndexes = steps.reduce((acc, step, i) => {
    const [key] = step.split(' = ');
    if (key.endsWith('A')) acc.push(i);
    return acc;
  }, [] as number[]);
  // console.log({startIndexes})

  const arr: [number, string][] = startIndexes.map((index) => {
    const step: string = steps[index];
    const [key] = step.split(' = ');
    return [index, key];
  });
  // console.log({arr});

  const isDone = () => arr.every(([, key]) => key.endsWith('Z'));

  let directionIndex = 0;
  let iterations = 0;
  while (!isDone()) {
    const dirIndex =
      ((directionIndex % dirs.length) + dirs.length) % dirs.length;
    const dir = dirs[dirIndex];

    for (let i = 0; i < arr.length; i++) {
      const [index, key] = arr[i];
      const step = steps[index];
      const [, coors] = step.split(' = ');
      const [left, right] = coors
        .split(', ')
        .map((c) => c.replace(/\(|\)/, ''));
      if (dir === 'L') {
        // Go left
        arr[i] = [stepsWithIndex[left], left];
      } else {
        // Go right
        arr[i] = [stepsWithIndex[right], right];
      }
      // console.log({ arr });
    }

    directionIndex++;
    iterations++;
  }
  console.log({ iterations });
  return iterations;
};

// getAnswer();