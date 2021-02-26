import { euclideanAlgorithm } from '../euclidean-algorithm/euclideanalgo';

export default function leastCommonMultiple(numA, numB) {
  if (numA === 0 || numB === 0) {
    return 0;
  }

  let product = Math.abs(numA * numB);
  return product / euclideanAlgorithm(numA, numB);
}
