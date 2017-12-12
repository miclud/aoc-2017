'use strict';

const input = require('./input/12');

const map = input.trim().split('\n').reduce((accumulated, current) => {
  const split = current.replace(' <-> ', ',').trim().split(',');
  const parent = split[0];
  const children = split.slice(1).map(item => item.trim());

  let newItem = [];
  if (accumulated[parent]) {
    newItem = [
      ...accumulated[parent],
      ...children
    ];
  } else {
    newItem = [
      ...children
    ];
  }
  return {
    ...accumulated,
    [parent]: newItem
  }
}, {});

const getGroups = (structure) => {
  const allGroups = new Map();
  const visited = new Set();
  const queue = [];

  Object.keys(structure).forEach(key => {
    if (!visited.has(key)) {
      queue.push(key);
      visited.add(key);
      const groupKeys = new Set();
      groupKeys.add(key);

      while (queue.length !== 0) {
        let currentKey = queue.pop();
        const children = map[currentKey];
        children.forEach(child => {
          if (!visited.has(child)) {
            visited.add(child);
            queue.push(child);
            if (!groupKeys.has(child)) {
              groupKeys.add(child);
            }
          }
        });
      }
      allGroups.set(key, groupKeys);
    }
  });

  return allGroups;
}

const programs = getGroups(map);

console.log('Answer for part 1 is', programs.get('0').size); // => 141
console.log('Answer for part 2 is', programs.size); // => 171
