export default function fibonacci(num) {
  return fibRecursion(num);
}

function fibRecursion(n) {
  if (n === 1) {
    return [1];
  }
  if (n === 0) {
    return [0];
  }

  let fib1 = fibRecursion(n - 1);
  let fib2 = fibRecursion(n - 2);
  let result = fib1[fib1.length - 1] + fib2[fib2.length - 1];
  let array = [...fib1, result];
  return array;
}
