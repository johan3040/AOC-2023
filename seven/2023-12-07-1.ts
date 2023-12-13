import * as fs from 'fs';
const input = fs.readFileSync(__dirname + '/input.txt', {
  encoding: 'utf8',
});

const d: [string, number][] = input
  .split('\n')
  .map((line) => line.split(' '))
  .map(([a, b]) => [a, parseInt(b, 10)]);

const rules = {
  isFiveOfAKind: (hand: string[]) => hand.every((card) => card === hand[0]),
  isFourOfAKind: (hand: string[]) => {
    const cardCounts = hand.reduce((counts, card) => {
      counts[card] = (counts[card] || 0) + 1;
      return counts;
    }, {});

    return Object.values(cardCounts).some((count) => count === 4);
  },
  isFullHouse: (hand: string[]) => {
    const cardCounts = hand.reduce((counts, card) => {
      counts[card] = (counts[card] || 0) + 1;
      return counts;
    }, {});

    return (
      Object.values(cardCounts).some((count) => count === 3) &&
      Object.values(cardCounts).some((count) => count === 2)
    );
  },
  isThreeOfAKind: (hand: string[]) => {
    const cardCounts = hand.reduce((counts, card) => {
      counts[card] = (counts[card] || 0) + 1;
      return counts;
    }, {});

    return Object.values(cardCounts).some((count) => count === 3);
  },
  isTwoPairs: (hand: string[]) => {
    const cardCounts = hand.reduce((counts, card) => {
      counts[card] = (counts[card] || 0) + 1;
      return counts;
    }, {});

    return (
      Object.values(cardCounts).filter((count) => count === 2).length === 2
    );
  },
  isPair: (hand: string[]) => {
    const cardCounts = hand.reduce((counts, card) => {
      counts[card] = (counts[card] || 0) + 1;
      return counts;
    }, {});

    return Object.values(cardCounts).some((count) => count === 2);
  },
  isHighCard: (hand: string[]) => {
    const cardCounts = hand.reduce((counts, card) => {
      counts[card] = (counts[card] || 0) + 1;
      return counts;
    }, {});

    return Object.values(cardCounts).some((count) => count === 1);
  },
};

const priority = Object.keys(rules)
  .toReversed()
  .reduce((acc, method, index) => {
    acc[method] = index;
    return acc;
  }, {});

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const sortInternal = (a: string, b: string) => {
  const first = a.split('');
  const second = b.split('');
  for (let i = 0; i < first.length; i++) {
    if (cards.indexOf(first[i]) > cards.indexOf(second[i])) return -1;
    if (cards.indexOf(first[i]) < cards.indexOf(second[i])) return 1;
  }
  return 0;
};

export const getAnswer = (data = d) => {
  const methods = Object.keys(rules);
  const groupByRank = data.reduce((acc, [hand, bid]) => {
    const rank = methods.find((method) => rules[method](hand.split('')));
    if (!acc[rank]) acc[rank] = [];
    acc[rank].push([hand, bid]);
    return acc;
  }, {} as Record<string, [string, number][]>);
  
  const ranksWithPriority = Object.entries(groupByRank).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        priority: priority[key],
        value: value.sort((a, b) => sortInternal(a[0], b[0])),
      };
      return acc;
    },
    {} as Record<string, { priority: number; value: [string, number][] }>
  );

  const sortedByPriority: [string, number, number][] = Object.entries(
    ranksWithPriority
  )
    .toSorted(([, a], [, b]) => a.priority - b.priority)
    .map(([, value]) => value.value)
    .flat()
    .map((value, i) => [...value, i + 1]);

  return sortedByPriority.reduce((acc, [hand, bid, rank]) => {
    return acc + bid * rank;
  }, 0);
};
