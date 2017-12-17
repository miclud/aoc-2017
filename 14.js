'use strict';

const { knotHash } = require('./Utils/KnotHash');
const input = 'flqrgnkx'; // Test input
// const input = 'ffayrhll';

const hexToBin = (hex) => {
  return hex.split('').reduce((accumulated, current) => {
    return accumulated.concat(Number.parseInt(current, 16).toString(2));
  }, '');
};

let squares = [...Array(128).keys()].map(i => {
  let hashInput = `${input}-${i}`;
  let hash = knotHash(hashInput);
  return hexToBin(hash).split('');
});

const getBusy = (input) => {
  return input.reduce((acc, curr) => {
    return acc + curr.filter(i => i === '1').length;
  }, 0);
};

const answer1 = getBusy(squares);
console.log('Answer for part 1:', answer1); // 8190

const shouldCheck = (input, i, j) => {
  if (i < 0 || j < 0 || i > 127 || j > 127) {
    return false;
  }
  return input[i][j] == 1;
}

const inQueue = (queue, i, j) => {
  let r = queue.find(element => {
    const [x, y] = element;
    return x === i && y === j
  });
  return typeof r !== 'undefined';
};

const getGroups = (input) => {
  let groups = 0;
  let visited = new Set();
  let queue = [];

  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
      const value = Number.parseInt(input[i][j], 10);
      const key = `${i},${j}`;
      if (value !== 1 || visited.has(key)) {
        continue;
      }
      groups++;

      queue.push([Number.parseInt(i, 10), Number.parseInt(j, 10)]);

      while (queue.length !== 0) {
        const currentNode = queue.pop();
        const [currentX, currentY] = currentNode;
        const value2 = input[currentX][currentY];
        const key2 = `${currentX},${currentY}`;

        if (!visited.has(key2)) {
          visited.add(key2);
          if (value2 == 1) {
            [
              [currentX + 1, currentY],
              [currentX - 1, currentY],
              [currentX, currentY + 1],
              [currentX, currentY - 1],
            ].forEach(node => {
              const [siblingX, siblingY] = node;
              const key3 = `${siblingX},${siblingY}`;
              if (
                shouldCheck(input, siblingX, siblingY)
                && !visited.has(key3)
                && !inQueue(queue, siblingX, siblingY)
            ) {
                queue.push(node);
              }
            });
          }
        }
      }
    }
  }
  console.log('anwer2', groups);
}

getGroups(squares);
