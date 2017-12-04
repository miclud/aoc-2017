'use strict';

const input = require('./input/04');

const arrayInput = input.trim().split('\n');

const getNumValid = (arrayInput, treatWord = null) => {
  let valid = 0;
  arrayInput.forEach(passphrase => {
    const hash = {};
    const words = passphrase.split(' ');
    let isValid = false;

    words.forEach(word => {
      if (typeof treatWord === "function") {
        word = treatWord(word);
      }
      if (hash[word]) {
        isValid = true;
        return false;
      } else {
        hash[word] = 1;
      }
    });

    if (!isValid) {
      valid++;
    }
  });
  return valid;
};

const sortAphabetically = (word) => {
  return word.split('').sort().join('');
}

const answer1 = getNumValid(arrayInput);
console.log('Answer for part 1 is:', answer1); // => 337

const answer2 = getNumValid(arrayInput, sortAphabetically);
console.log('Answer for part 2 is:', answer2); // => 231