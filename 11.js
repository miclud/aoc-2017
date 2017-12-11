'use strict';

const input = require('./input/11').trim().split(',');

const getMove = (direction) => {
  const stepMap = {
    n: { x: 0, y: 1, z: -1 },
    ne: { x: 1, y: 0, z: -1 },
    nw: { x: -1, y: 1, z: 0 },
    s: { x: 0, y: -1, z: 1 },
    sw: { x: -1, y: 0, z: 1 },
    se: { x: 1, y: -1, z: 0 },
  };

  return stepMap[direction];
}

const getDistance = (first, second) => {
  const x = Math.abs(first.x - second.x);
  const y = Math.abs(first.y - second.y);
  const z = Math.abs(first.z - second.z);
  return Math.max(x, y, z);
};

const initialPosition = { x: 0, y: 0, z: 0 };
let highestDistance = 0;
const currentPos = input.reduce((accumulated, current) => {
  const move = getMove(current);
  const newDistance =  {
    x: accumulated.x + move.x,
    y: accumulated.y + move.y,
    z: accumulated.z + move.z,
  };
  const distance = getDistance(initialPosition, newDistance);
  if (distance > highestDistance) {
    highestDistance = distance;
  }
  return newDistance;
}, initialPosition);

const answer1 = getDistance(initialPosition, currentPos);
console.log('Answer for part 1 is', answer1);
console.log('Answer for part 2 is', highestDistance);
