export function isEven(number) {
  return (number & 1) === 0;
}
export function bothSameSign(num1, num2) {
  return (num1 ^ num2) >= 0;
}
export function swapTwoNumbers(x, y) {
  x = x ^ y;
  y = x ^ y;
  x = x ^ y;
  return [x, y];
}

export function isPowerofTwo(num) {
  return (num & (num - 1)) === 0;
}
export function findParity(n) {
  let counter = 1;
  while (n) {
    n = n & (n - 1);
    if (n !== 0) {
      counter++;
    }
  }
  return (counter & 1) === 0 ? 'even' : 'odd';
}
export function turnOffKthbit(num, k) {
  let mask = ~(1 << (k - 1));
  return num & mask;
}
export function turnOnKthBit(num, k) {
  let mask = 1 << (k - 1);
  return num | mask;
}
export function getBit(num, k) {
  let mask = 1 << (k - 1);
  let result = num & mask;
  return result !== 0 ? 1 : 0;
}

export function setBit(num, k) {
  let mask = 1 << (k - 1);
  return num | mask;
}

export function countSetBits(n) {
  let counter = 1;
  if (n === 0) {
    return 0;
  }
  while (n) {
    n = n & (n - 1);
    if (n !== 0) {
      counter++;
    }
  }

  return counter;
}
