import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/testInput.txt', {
  encoding: 'utf8',
});

const getRange = (start: number, len: number) => {
  return Array.from({ length: len }, (_, i) => start + i);
};

const getRanges = (str: string) => {
  const [dest, source, len] = str.split(' ');
  const destMap = getRange(Number(dest), Number(len));
  const sourceMap = getRange(Number(source), Number(len));
  // console.log({ destMap, sourceMap });
  return sourceMap.reduce((acc, cur, i) => {
    if (!acc[cur]) {
      acc[cur] = destMap[i];
    }
    return acc;
  }, {});
};

const isInRange = (a, b, c) => {
  return c >= a && c <= b;
};

const getSourceToDest = (dest, source, len = 0, num) => {
  if (!isInRange(source, source + len - 1, num)) {
    return num;
  }

  if (!isInRange(dest, dest + len - 1, num)) {
    return num;
  }

  const end1 = source + len - 1;
  const end2 = dest + len - 1;

  const index = dest + len - num;

  console.log(index + dest);

  if (num >= source && num <= end1) {
    return dest + index;
  }

  return num;
};

/**
 * '52 50 48'
 */
export const getAnswer = (inp: string = input) => {
  const splitted = inp.split(/\n\s*\n/);

  const consumalbeData = splitted.map((s) =>
    s.split(/(.+:)/).filter(Boolean)[1].split('\n').filter(Boolean)
  );
  const [seeds, ...data] = consumalbeData;

  const seedsToBePlanted = seeds[0].split(' ').filter(Boolean);

  const seed2Soil = `50 98 2
  52 50 48`;
  // const a = data[0].map(getRanges).reduce((acc, cur) => ({ ...acc, ...cur }), {});
  // console.log({a})
  // const res = ;
  // data.forEach((d) => {
  //   console.log("inhere")
  //   const obj = d.map(getRanges).reduce((acc, cur) => ({ ...acc, ...cur }), {});
  //   console.log(obj)
  // });
  // console.log(data);

  const x = seed2Soil
    .split('\n')
    .map((s) => s.trim())
    .map(getRanges)
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

  // console.log("Hello")
  // console.log(x);

  const filterSeeds = seedsToBePlanted
    .map((s) => {
      const soil = x[s];
      // console.log(s)
      if (soil) {
        return soil;
      }
      return null;
    })
    .filter(Boolean);
  // console.log(filterSeeds)

  // console.log(x[50] ?? 13);
  return x;
};

// console.log(getRanges('52 50 48'));

getAnswer();
