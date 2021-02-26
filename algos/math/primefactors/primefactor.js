export function primeFactors(n) {
  let factors = [];

  for (let i = 2; i <= n; i++) {
    while (n % i == 0) {
      n = n / i;
      factors.push(i);
    }
  }

  return factors;
}
