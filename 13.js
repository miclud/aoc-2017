'use strict';

const input = require('./input/13');

const getSeverity = (startSecond, input) => {
  let severity = null;
  const keys = Object.keys(input);
  const numLayers = keys[keys.length - 1];

  for (let i = 0; i <= numLayers; i++) {
    if (input[i]) {
      const range = input[i];
      const currentSecond = startSecond + i;
      const numSecondsToTop = (range - 1) * 2;

      if (currentSecond % numSecondsToTop === 0) {
        if (startSecond > 0) { // Not interrested in the actual severit when > 0.
          return 1;
        }
        if (severity === null) {
          severity = 0;
        }
        severity += i * range;
      }
    }
  }
  return severity;
}

const calculateDelay = (input) => {
  let hit = true;
  let delay = 0;
  while (hit) {
    delay++;
    const severity = getSeverity(delay, input);
    if (severity === null) {
      hit = false;
    }
  }
  return delay;
};


const answer1 = getSeverity(0, input);
console.log('Answer for part 1:', answer1); // => 1624
const answer2 = calculateDelay(input);
console.log('Answer for part 2:', answer2) // => 3923436

