export const combineWithoutRepetitions = (arr, length) => {
  if (length > arr.length) {
    return [];
  }

  let allCombinations = getAllCombinations(arr);
  return allCombinations.filter((combination) => combination.length === length);
};

const getAllCombinations = (arr) => {
  if (arr.length === 0) {
    return [[]];
  }

  let firstElement = arr[0];
  let restCombinations = getAllCombinations(arr.slice(1));
  let combiningWithFirstRest = [];
  restCombinations.forEach((combination) => {
    combiningWithFirstRest.push([firstElement, ...combination]);
  });

  return [...combiningWithFirstRest, ...restCombinations];
};

export const combineWithRepetitions = (arr, length) => {
  if (length > arr.length) {
    return [];
  }

  let allCombinations = getAllCombinationsWithRepitition(arr, length);
  return allCombinations.filter((combination) => combination.length === length);
};

const getAllCombinationsWithRepitition = (arr, length) => {
  if (arr.length === 0) {
    return [[]];
  }

  let firstElement = arr[0];
  let restCombinations = getAllCombinationsWithRepitition(arr.slice(1), length);
  let combiningWithFirstRest = [];
  restCombinations.forEach((combination) => {
    combiningWithFirstRest.push([
      Array(length - combination.length).fill(firstElement),
      ...combination,
    ]);
  });

  return [...combiningWithFirstRest, ...restCombinations];
};
