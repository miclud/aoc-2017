'use strict';

const spinLock = (iterations, createArray = true) => {
  const step = 366;
  let nextValue = 1;
  let values = [0];
  let currentPosition = 0;
  let indexToInsert = 0;
  let insertedAfter0 = 0;

  while(nextValue <= iterations) {
    currentPosition = ((currentPosition + step) % nextValue);
    indexToInsert = currentPosition + 1;

    if (createArray) {
      let toTheRight = values.slice(indexToInsert);
      let toTheLeft = values.slice(0, indexToInsert);
      let newEntry = [nextValue];
      values = toTheLeft.concat(newEntry, toTheRight);
    } else {
      if (indexToInsert === 1) {
        insertedAfter0 = nextValue;
      }
    }
    currentPosition = indexToInsert;
    nextValue++;
  }
  if (createArray) {
    return values;
  } else {
    console.log('Answer for part 2:', insertedAfter0); // => 37803463
  }
};

const values1 = spinLock(2017);
const indexOf2017 = values1.findIndex(num => num === 2017);
const answer1 = values1[indexOf2017 + 1];
console.log('Answer for part 1:', answer1); // => 1025

spinLock(50000000, false);
