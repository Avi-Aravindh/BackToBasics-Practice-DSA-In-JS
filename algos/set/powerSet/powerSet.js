export default function bwPowerSet(set) {
  const combinations = [[]];

  const total = 2 ** set.length;
  for (let i = 0; i < total; i++) {
    for (let j = i; j < set.length; j++) {
      let temp = set.slice(i, j + 1);
      // console.log(set.slice(i,j+1))
      combinations.push(temp);
    }
  }

  if (combinations.length !== total) {
    combinations.push([set[0], set[set.length - 1]]);
  }

  //     if(!combinations.find(c=>c===[set[0], set[set.length-1]])){

  //     }
  return combinations;

  //   const totalCombinations = 2 ** set.length;
  //   const combinations = [];
  //   for (let i = 0; i < totalCombinations; i++) {
  //     let temp = [];
  //     for (let j = 0; j < set.length; j++) {
  //       if (i & (1 << j)) {
  //         temp.push(set[j]);
  //       }
  //     }
  //     combinations.push(temp);
  //   }

  //   return combinations;
}
