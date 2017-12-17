'use strict';

const moves = require('./input/16');

const letsDance = (programs, danceMoves) => {
  danceMoves.forEach(move => {
    const danceType = move.slice(0, 1);
    const rest = move.slice(1);
    if (danceType === 's') {
      const numSpin = Number.parseInt(rest, 10);
      let adjusted = [];
      programs.forEach((program, index) => {
        const newIndex = (index + numSpin) % programs.length;
        adjusted[newIndex] = program;
      })
      programs = adjusted;
    } else {
      let firstIndex = 0;
      let secondIndex = 0;
      let firstValue = 0;
      let secondValue = 0;

      if (danceType === 'x') {
        const r = rest.split('/');
        firstIndex = Number.parseInt(r[0], 10);
        secondIndex = Number.parseInt(r[1], 10);
        firstValue = programs[firstIndex];
        secondValue = programs[secondIndex];
      } else {
        [firstValue, secondValue] = rest.split('/');
        firstIndex = programs.findIndex(program => program === firstValue);
        secondIndex = programs.findIndex(program => program === secondValue);
      }
      programs[firstIndex] = secondValue;
      programs[secondIndex] = firstValue;
    }
  });

  return programs;
};

const getPermutations = (initialState, danceMoves) => {
  let permutations = new Map();
  permutations.set(0, initialState);
  let programs = initialState.split('');
  let foundAll = false;
  let numIterations = 0;
  while (!foundAll) {
    programs = letsDance(programs, danceMoves);
    let programOrder = programs.join('');
    if (initialState === programOrder) {
      foundAll = true;
    }
    permutations.set(numIterations, programOrder);
    numIterations++;

  }
  return permutations;
}

const danceMoves = moves.trim().split(',');
const initialState = 'abcdefghijklmnop';
const permutations = getPermutations(initialState, danceMoves);

console.log('Answer for part 1:', permutations.get(0)); // => lbdiomkhgcjanefp

const patternAtIteration = 1000000000 % (permutations.size);
console.log('Answer for part 2:', permutations.get(patternAtIteration - 1)); // => ejkflpgnamhdcboi
