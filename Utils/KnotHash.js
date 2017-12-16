'use strict';

const createHash = (input, rounds) => {
  let list = [...Array(256).keys()];

  let skipSize = 0;
  let listLength = list.length;
  let currentPos = 0;

  for (let round = 0; round < rounds; round++) {
    input.forEach(length => {
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

const getHexHash = (denseHash) => {
  let hash = '';
  denseHash.forEach(number => {
    let hax = number.toString(16);
    if (hax.length === 1) {
      hax = "0".concat(hax);
    }
      hash = hash.concat(hax);
  })
  return hash;
};

const knotHash = (input) => {
  const salts = [17, 31, 73, 47, 23];
  let inputAsAscii = input.split('').map(c => c.charCodeAt(0)).concat(salts);
  const sparseHash = createHash(inputAsAscii, 64);
  let denseHash = getDenseHash(sparseHash);
  return getHexHash(denseHash);
}


module.exports = {
  knotHash,
  createHash
};
