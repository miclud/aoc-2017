'use strict';

const input = require('./input/08');

const doStuff = (input) => {
  let values = new Map();
  let inputRows = input.trim().split('\n');
  let condition = '';
  let numRows = 0;
  let highestHeld = 0;

  inputRows.forEach(row => {
    let conditionValue = 0;  
    let rowItems = row.split(' ');
    let variable = rowItems[0];
    let variableValue = 0;
    let action = rowItems[1];
    let actionValue = Number.parseInt(rowItems[2], 10);
    let conditionVariable = rowItems[4];
    let newValue = 0;

    if (values.has(conditionVariable)) {
      conditionValue = values.get(conditionVariable);
    }
    condition = rowItems.slice(4).toString().replace(/[,]/g, ' ').trim();
    condition = condition.replace(conditionVariable, conditionValue);

    if (eval(condition)) {
      if (values.has(variable)) {
        variableValue = values.get(variable);
      }

      if (action === 'inc') {
        newValue = variableValue + actionValue;
      } else {
        newValue = variableValue - actionValue;
      }
      if (newValue > highestHeld) {
        highestHeld = newValue;
      }
      values.set(variable, newValue);
    }
  });
  
  console.log('Answer for part 2', highestHeld); // => 5347
  return values;
}

let values = doStuff(input);
let highest = 0;
values.forEach((entry) => {
  if (entry > highest) {
    highest = entry;
  }
});

console.log('Answer for part 1', highest); // => 4163