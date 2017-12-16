'use strict';

const { knotHash, createHash } = require('./Utils/KnotHash');
const lengths = [183, 0, 31, 146, 254, 240, 223, 150, 2, 206, 161, 1, 255, 232, 199, 88];

const calculated = createHash(lengths, 1);
const answer1 = calculated[0] * calculated[1];
console.log('Answer for part 1 is', answer1); // => 15990

const input2 = '183,0,31,146,254,240,223,150,2,206,161,1,255,232,199,88';
const answer2 = knotHash(input2);
console.log('Answer for part 2 is', answer2); // => 90adb097dd55dea8305c900372258ac6
