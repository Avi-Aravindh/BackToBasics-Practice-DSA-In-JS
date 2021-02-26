export function euclideanAlgorithm(numA, numB) {
  if (numA === 0 && numB === 0) {
    return 0;
  }
  if (numA === 0 || numB === 0) {
    return numA > 0 ? numA : numB;
  }
  if (numA < 0) {
    numA = numA * -1;
  }
  if (numB < 0) {
    numB = numB * -1;
  }

  let remainder = numA % numB;
  return euclideanAlgorithm(numB, remainder);
}
export function euclideanAlgorithmIterative(numA, numB) {
  if (numA === 0 && numB === 0) {
    return 0;
  }

  if (numA < 0) {
    numA = numA * -1;
  }
  if (numB < 0) {
    numB = numB * -1;
  }

  while (numA > 0 && numB > 0) {
    let temp = numB;
    numB = numA % numB;
    numA = temp;
  }

  return numA > 0 ? numA : numB;
}
