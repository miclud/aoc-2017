'use strict';

const input = require('./input/09');

const removeCancelledChars = (row) => {
  let cleaned = row.replace(/!./g, '');
  return cleaned;
};

const getAnswers = (row) => {
  let sum = 0;
  let chars = row.split('');
  let level = 0;
  let inGarbage = false;
  let garbageCount = 0;
  for (let i = 0; i < chars.length; i++) {
    const currentChar = chars[i];

    if (!inGarbage && currentChar === '<') {
      inGarbage = true;
      continue;
    }
    if (currentChar === '>') {
      inGarbage = false;
      continue;
    }
    if (inGarbage) {
      garbageCount++;
    }

    if (!inGarbage) {
      if (currentChar === '{') {
        level++;
      }
      if (currentChar === '}') {
        sum += level;
        level--;
      }
    }
  }
  console.log('Answer for part 1 is', sum); // => 14421
  console.log('Answer for part 2 is', garbageCount); // => 6817
};

const cleaned = removeCancelledChars(input);
getAnswers(cleaned);
