'use strict';

const input = require('./input/07');

const createStructure = (input) => {
  let structure = new Map();
  let inputRows = input.trim().split('\n');
  inputRows.forEach(row => {
    let cleanRow = row.replace(/[()]/g, '').replace(/,/g, '');
    let rowItems = cleanRow.split(' ');
    let name = rowItems[0].trim();
    let weight = Number.parseInt(rowItems[1]);
    let children = [];
    if (rowItems.length > 2) {
      children = rowItems.slice(3);
    }
    let data = {
      name,
      weight,
      children,
    };

    structure.set(name, data);
  });
  return structure;
}
const createParentLinks = (structuredInput) => {
  let parents = new Map();
  structuredInput.forEach((data, name) => {
    if (data.children.length > 0) {
      data.children.forEach(child => {
        parents.set(child, name);
      });
    }
  });
  return parents;
}

const sortByWeight = (input) => {
  let sortedStructure = [];
  let r = input.sort((first, second) => {
    let diff = first.weight - second.weight;

    if (diff > 0) {
      return -1;
    } if (diff < 0) {
      return 1;
    }
    return diff;
  });
  return r;
};

const getOrphan = (parentOverview, structure) => {
  let orhpan = null;
  structure.forEach((data, name) => {
    if (!parentOverview.has(name)) {
      orhpan = name;
    }
  });
  return orhpan;
}

const getChildWeight = (node, structure) => {
  let sum = node.weight;
  node.children.forEach(child => {
    sum += getChildWeight(structure.get(child), structure);
  })
  return sum;
};

const structure = createStructure(input);
const parentOverview = createParentLinks(structure);
const answer1 = getOrphan(parentOverview, structure);

const getSortedChildSums = (root, structure) => {
  let childSums = new Map();

  structure.get(root).children.forEach(child => {
    let childData = structure.get(child);
    let childSum = getChildWeight(childData, structure);
    childSums.set(childData.name, childSum);
  });

  let overview = [];
  childSums.forEach((value, name) => {
    overview.push({ name, weight: value });
  });
  return sortByWeight(overview);
}

const getNodeWeightNeedingAdjustment = (root, structure) => {
  let diff = -1;
  let currentRoot = root;
  let highest = null;
  let rest = null;
  let largeDiff = 0;
  while (diff !== 0) {
    const sorted = getSortedChildSums(currentRoot, structure);
    const highest = sorted[0];
    const rest = sorted[1];

    diff = highest.weight - rest.weight;
    if (currentRoot === root) {
      largeDiff = diff;
    }

    if (diff > 0) {
      currentRoot = highest.name;
    }
  }

  return structure.get(currentRoot).weight - largeDiff;
};

console.log('Answer is for part 1 is', answer1); // => veboyvy

const nodeNeedingCorrectnes = getNodeWeightNeedingAdjustment(answer1, structure);
const answer2 = nodeNeedingCorrectnes;
console.log('Answer for part 2 is', answer2); // => 749
