'use strict';
// const input = require('./input/18');

const input = `
set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2
`;

const parseInput = (input) => {
  return input.trim().split('\n');
};

const doActions = (input) => {
  const map = new Map();
  let sound = null;
  input.forEach(([instruction, target, getFrom]) => {
    // const instruction = element[0];
    let fromVal = map.has(getFrom) || 0;
    let current = map.has(target) || 0;
    if (instruction === 'snd') {
      // const key = element[1];
      sound = map.get(x);
    } else {
      let newVal = 0;
    }
      map.set(target, fromVal);
    } else if (instruction === 'add') {
      map.set(target, current += fromVal);
    } else if (instruction === 'mul')
  });
};

const parsed = parseInput(input);

