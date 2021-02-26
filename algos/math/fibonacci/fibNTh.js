// let memoize = {};

export default function fibonacciNth(n, memoize = {}) {
  // memoize
  //   if (n === 1) {
  //     return 1;
  //   }
  //   if (n === 0) {
  //     return 0;
  //   }
  //   if (n in memoize) {
  //     return memoize[n];
  //   } else {
  //     memoize[n] = fibonacciNth(n - 1, memoize) + fibonacciNth(n - 2, memoize);
  //   }
  //   return memoize[n];

  // Binet's formula

  const sqrt5 = Math.sqrt(5);
  const phi = (1 + sqrt5) / 2;

  return Math.floor(phi ** n / sqrt5 + 0.5);
}
