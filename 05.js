'use strict';
const input = require('./input/05');

const getNumSteps = (maze, calculateIncrement) => {
  let numMoves = 0;
  let currentLocation = 0;
  let numSteps = 0;
  let input = maze.slice();

  while (currentLocation < input.length) {
    numSteps = input[currentLocation];
    input[currentLocation] += calculateIncrement(numSteps);
    currentLocation = currentLocation + numSteps;
    numMoves++;
  }
  return numMoves;
}

const answer1 = getNumSteps(input, (input) => 1);
console.log('Answer for part 1:', answer1); // => 375042

const answer2 = getNumSteps(input, (input) => input >= 3 ? -1 : 1);
console.log('Answer for part 2:', answer2); // => 28707598