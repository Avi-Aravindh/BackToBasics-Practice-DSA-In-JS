export default function sieveOfEratosthenes(num) {
  let array = Array(num + 1).fill(true);
  array[0] = false;
  array[1] = false;
  let results = [];

  let i = 2;
  while (i < array.length) {
    let j = i + 1;
    while (j < array.length) {
      if (j % i === 0) {
        array[j] = false;
      }
      j++;
    }
    i++;
  }
  array.map((value, index) => {
    if (value) {
      results.push(index);
    }
  });

  return results;
}
