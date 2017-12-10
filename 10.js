'use strict';

const lengths = [183, 0, 31, 146, 254, 240, 223, 150, 2, 206, 161, 1, 255, 232, 199, 88];

const createHash = (list, lengths, rounds) => {
  let skipSize = 0;
  let listLength = list.length;
  let currentPos = 0;

  for (let round = 0; round < rounds; round++) {
    lengths.forEach(length => {
      let subList = [];
      let end = currentPos + length;

      if (typeof list[end] === 'undefined') {
        let fromStart = end - listLength;
        let first = list.slice(currentPos);
        let second = list.slice(0, fromStart);
        subList = first.concat(second);
      } else {
        subList = list.slice(currentPos, end);
      }
      subList.reverse();
      let index = currentPos;
      subList.forEach((entry) => {
        if (typeof list[index] === 'undefined') {
          index = 0;
        }
        list[index] = entry;
        index++;
      });

      currentPos += (length + skipSize);
      while (currentPos > listLength) {
        currentPos  = currentPos - listLength;
      }
      skipSize++;
    });
  }
  return list;
};

const createList = (length) => {
  let list = [];
  for (let i = 0; i < length; i++) {
    list.push(i);
  }
  return list;
};

const getDenseHash = (sparseHash) => {
  let dense = [];
  let res = 0;
  let denseHash = [];
  let count = 0;
  sparseHash.forEach(number => {
    res = res ^ number;
    count++;
    if (count === 16) {
      denseHash.push(res);
      res = 0;
      count = 0;
    }
  });
  return denseHash;
};

const list = createList(256);

const calculated = createHash(list, lengths, 1);
const answer1 = calculated[0] * calculated[1];
console.log('Answer for part 1 is', answer1); // => 15990

const toAdd = [17, 31, 73, 47, 23];
const list2 = createList(256);

const input2 = '183,0,31,146,254,240,223,150,2,206,161,1,255,232,199,88';
let lengthsAsAscii = input2.split('').map(c => c.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
const sparseHash = createHash(list2, lengthsAsAscii, 64);
let denseHash = getDenseHash(sparseHash);
let answer2 = '';

denseHash.forEach(number => {
  let hax = number.toString(16);
  if (hax.length === 1) {
    hax = "0".concat(hax);
  }
  answer2 = answer2.concat(hax);
})

console.log('Answer for part 2 is', answer2); // => 90adb097dd55dea8305c900372258ac6