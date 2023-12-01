import { input } from './data.ts';

const data = input.split('\n');

const res = data.reduce((acc, curr) => {
  const nums = curr.split('').filter((c) => !isNaN(parseInt(c)));
  const first = parseInt(nums[0] ?? '0')
  const last = parseInt(nums.at(-1) ?? '0');
  return acc + parseInt(`${first}${last}`);
}, 0)

// res = 54667