'use strict';

const input = [11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11];

const getIndexOfHighestNum = (input) => {
  return input.indexOf(Math.max(...input));
};

const isSeenBefore = (seenBefore, input) => {
  let string = input.toString();
  const index = seenBefore.indexOf(string);
  return index >= 0;
}

const getAnswer = (input, saveInitial = false) => {
  let foundEqual = false;
  let toDistribute = 0;
  let index = 0;
  let cycles = 0;
  let seenBefore = [];

  if (saveInitial) {
    seenBefore.push(input.toString());
  }

  while (!foundEqual) {
    index = getIndexOfHighestNum(input);
    toDistribute = input[index];
    input[index] = 0;

    while (toDistribute !== 0) {
      index++;
      if (typeof input[index] === 'undefined') {
        index = 0;
      }
      input[index]++;
      toDistribute--;
    }
    foundEqual = isSeenBefore(seenBefore, input);
    seenBefore.push(input.toString());
    cycles++;
  }
  return cycles;
};

const answer1 = getAnswer(input);
console.log('Answer for part 1 is', answer1); // => 4074

const answer2 = getAnswer(input, true); // Good thing js don't deep copy input ^^
console.log('Answer for part 2 is', answer2); // => 2793