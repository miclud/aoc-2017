'use strict';

const getNextDirection = (currentDirection) => {
  const nextDirectionMap = {
    right: 'up',
    up: 'left',
    left: 'down',
    down: 'right'
  };
  return nextDirectionMap[currentDirection];
}

const getDirectionValue = (direction) => {
  const directionValueMap = {
    left: -1,
    right: 1,
    up: 1,
    down: -1
  };
  return directionValueMap[direction];
}

const getNextCoordinates = (direction, x, y) => {
  if (direction === 'left' || direction === 'right') {
    x = x + directionVal;
  } else {
    y = y + directionVal;
  }
};

const mustChangeDirection = (currentThreshold, currentCoordinates, direction) => {
  if (direction === 'left' || direction == 'right') {
    return currentThreshold === Math.abs(currentCoordinates.x);
  }
  return currentThreshold === Math.abs(currentCoordinates.y);
}

const updateCoordinates = ({ x, y }, direction) => {
  const directionVal = getDirectionValue(direction);

  if (direction === 'left' || direction === 'right') {
    x = x + directionVal;
  } else {
    y = y + directionVal;
  }
  return { x, y }
}

const isChecked = (checked, x, y) => {
  return checked.find(input => input === `${x},${y}`);
}

const getSum = (coordinateSystem, { x, y }) => {
  let sum = 0;
  const changes = [1, -1];
  let checked = [];

  changes.forEach((xChange) => {
    let changedX = x + xChange;
    if (!isChecked(checked, changedX, y)) {
      sum += getValFromSystem(coordinateSystem, changedX, y);
      checked.push(`${x},${y}`);
    }
    changes.forEach((yChange) => {
      let changedY = y + yChange;
      if (!isChecked(checked, changedX, changedY)) {
        sum += getValFromSystem(coordinateSystem, changedX, changedY);
        checked.push(`${changedX},${changedY}`);
      }
      if (!isChecked(checked, x, changedY)) {
        sum += getValFromSystem(coordinateSystem, x, changedY);
        checked.push(`${x},${changedY}`);
      }
    });
  });
  return sum;
}

const getValFromSystem = (system, x, y) => {
  if (system[x] && system[x][y]) {
    return system[x][y];
  }
  return 0;
};

const getCoordinates = (numItems) => {
  let current = 1;
  let coordinates = { x: 0, y: 0 };
  let direction = 'right';
  let round = 1;
  let sum = 1;
  let coordinateSystem = {
    0: { 0: sum }
  };

  while (current < numItems) {
    coordinates = updateCoordinates(coordinates, direction);

    if (sum < numItems) {
      sum = getSum(coordinateSystem, coordinates);

      if (!coordinateSystem[coordinates.x]) {
        coordinateSystem[coordinates.x] = { [coordinates.y]: 0 };
      }
      coordinateSystem[coordinates.x][coordinates.y] = sum;
    }

    if (mustChangeDirection(round, coordinates, direction)) {
      direction = getNextDirection(direction);

      if (direction === 'right') {
        round++;
      }
    }
    current++;
  }

  return { coordinates, sum };
}

const getNumSteps = ({ x, y }) => {
  const xSteps = Math.abs(0 - x);
  const ySteps = Math.abs(0 - y);
  return xSteps + ySteps;
};

const input = 347991;
const { coordinates, sum } = getCoordinates(input);

const answer1 = getNumSteps(coordinates);
console.log("Answer for part 1 is:", answer1); // => 480
console.log("Answer for part 2 is:", sum); // => 349975
