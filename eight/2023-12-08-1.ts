import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
});

const [dirs, , ...steps] = input.split('\n');

const getAnswer = () => {
  let index = steps.findIndex((s) => s.startsWith('AAA'));
  let directionIndex = 0;
  let iterations = 0;
  while (!steps[index].startsWith('ZZZ')) {
    const dirIndex = ((directionIndex % dirs.length) + dirs.length) % dirs.length;
    const dir = dirs[dirIndex];
    const step = steps[index];
    const [, coors] = step.split(' = ');
    const [left, right] = coors.split(', ').map((c) => c.replace(/\(|\)/, ''));
    if (dir === 'L') {
      // Go left
      index = steps.findIndex((s) => s.startsWith(left));
    } else {
      // Go right
      index = steps.findIndex((s) => s.startsWith(right));
    }
    directionIndex++;
    iterations++;
  }
  return iterations;
}

/**
 *
 * Using recursion causes "RangeError: Maximum call stack size exceeded" using real data
 *
 
const traverse = (directionIndex, index, iterations = 0) => {
  const dirIndex = ((directionIndex % dirs.length) + dirs.length) % dirs.length;

  if (steps[index].startsWith('ZZZ')) return iterations;
  const dir = dirs[dirIndex];
  const step = steps[index];
  const [, coors] = step.split(' = ');
  const [l, r] = coors.split(', ').map((c) => c.replace(/\(|\)/, ''));
  let nextIndex: number;
  if (dir === 'L') {
    // Go left
    nextIndex = steps.findIndex((s) => s.startsWith(l));
  } else {
    // Go right
    nextIndex = steps.findIndex((s) => s.startsWith(r));
  }
  return traverse(directionIndex + 1, nextIndex, iterations + 1);
};

const getAnswer = () => {
  const startIndex = steps.findIndex((s) => s.startsWith('AAA'));
  let totalSteps = traverse(0, startIndex);
  console.log({ totalSteps });
  return totalSteps;
};

* */
