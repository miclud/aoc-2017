"use strict";

const buffer = require("./input/20");

// const buffer = `
// p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
// p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
// p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
// p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>
// `;

const parseInput = input => {
  const particles = input
    .trim()
    .split("\n")
    .map(row => {
      return row.split(">,").map(item => {
        return item
          .replace(/(\w=\<)/g, "")
          .replace(">", "")
          .trim()
          .split(",")
          .map(r => {
            return Number.parseInt(r, 10);
          });
      });
    });
  return particles;
};

const getParticleDestination = ([position, velocity, acceleration]) => {
  const updatedVelocity = updateCoordinates(velocity, acceleration);
  const updatedPostion = updateCoordinates(position, updatedVelocity);
  return [updatedPostion, updatedVelocity, acceleration];
};

const updateCoordinates = ([x1, y1, z1], [x2, y2, z2]) => {
  return [x1 + x2, y1 + y2, z1 + z2];
};

let parsed = parseInput(buffer);

const calculateDistance = ([x, y, z]) => {
  return Math.abs(x) + Math.abs(y) + Math.abs(z);
};
const updateAll = input => {
  let updated = [];
  let locations = new Set();
  input.forEach(element => {
    const r = getParticleDestination(element);
    const distance = calculateDistance(element[0]);
    updated.push(r);
    locations.add(distance);
  });
  return updated;
};

const getClosest = input => {
  let closestDistance = 1000000;
  let closestParticle = -1;
  const distances = new Map();
  input.forEach((particleData, num) => {
    const distance = calculateDistance(particleData[0]);
    distances.set(num, distance);
  });

  return distances;
};

const getAverageDistance = iterations => {
  const distances = new Map();
  iterations.forEach((iterationDistances, iteration) => {
    iterationDistances.forEach((distance, particle) => {
      let sum = 0;
      if (distances.has(particle)) {
        sum = distances.get(particle) + distance;
      } else {
        sum = distance;
      }
      distances.set(particle, sum);
    });
  });

  let lowest = 100000000;
  let lowestItem = -1;
  const numIterations = iterations.size;
  distances.forEach((value, key) => {
    const average = value / numIterations;
    if (average < lowest) {
      lowest = average;
      lowestItem = key;
    }
  });
  console.log(`item: ${lowestItem}, distance: ${lowest}`); // => 150
};

const limit = 1200;
let numTicks = 1;
const distances = new Map();

while (numTicks < limit) {
  parsed = updateAll(parsed);
  const newDistances = getClosest(parsed);
  // const newDistances = getGeneralDistances(parsed);
  distances.set(numTicks, newDistances);
  numTicks++;
}
const a = distances.get(numTicks - 1);
console.log(a.size);
getAverageDistance(distances);
