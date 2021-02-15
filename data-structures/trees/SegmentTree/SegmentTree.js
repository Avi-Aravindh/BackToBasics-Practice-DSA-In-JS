function powerOfTwo(x) {
  return (Math.log(x) / Math.log(2)) % 1 === 0;
}

export default class SegmentTree {
  constructor(inputArray, operation, operationFallBack) {
    this.inputArray = inputArray;
    this.operation = operation;
    this.operationFallBack = operationFallBack;

    this.segmentTree = this.initSegmentTree(inputArray);
    this.buildSegmentTree();
  }

  initSegmentTree(inputArray) {
    let segmentTreeLength;
    if (powerOfTwo(inputArray.length)) {
      segmentTreeLength = inputArray.length * 2 - 1;
    } else {
      const currentPower = Math.floor(Math.log2(inputArray.length));
      const nextPower = currentPower + 1;
      const nextPowerValue = 2 ** nextPower;
      segmentTreeLength = nextPowerValue * 2 - 1;
    }
    return new Array(segmentTreeLength).fill(null);
  }

  buildSegmentTree() {
    let left = 0;
    let right = this.inputArray.length - 1;
    let position = 0;
    this.buildRecursively(left, right, position);
  }
  buildRecursively(left, right, position) {
    // if left and right are same, then we are done. Move value from inputarray to position;
    if (left === right) {
      this.segmentTree[position] = this.inputArray[left];
      return;
    }

    // If not break the array and keep moving down
    let mid = Math.floor((left + right) / 2);
    this.buildRecursively(left, mid, this.getLeftChildIndex(position));
    this.buildRecursively(mid + 1, right, this.getRightChildIndex(position));

    this.segmentTree[position] = this.operation(
      this.segmentTree[this.getLeftChildIndex(position)],
      this.segmentTree[this.getRightChildIndex(position)]
    );
  }

  rangeQuery(queryMin, queryMax) {
    let leftIndex = 0;
    let rightIndex = this.inputArray.length - 1;
    let position = 0;
    return this.rangeQueryRecursion(
      leftIndex,
      rightIndex,
      position,
      queryMin,
      queryMax
    );
  }

  rangeQueryRecursion(leftIndex, rightIndex, position, queryMin, queryMax) {
    // full overlap -> the query range covers the index
    if (queryMin <= leftIndex && queryMax >= rightIndex) {
      return this.segmentTree[position];
    }

    // no overlap --> query's min is greater than index max or query's max is less than index min
    if (queryMin > rightIndex || queryMax < leftIndex) {
      return this.operationFallBack;
    }

    // partial overlap. Same strategy as build. Recursively break and keep going down
    let mid = Math.floor((leftIndex + rightIndex) / 2);
    let leftOperation = this.rangeQueryRecursion(
      leftIndex,
      mid,
      this.getLeftChildIndex(position),
      queryMin,
      queryMax
    );
    let rightOperation = this.rangeQueryRecursion(
      mid + 1,
      rightIndex,
      this.getRightChildIndex(position),
      queryMin,
      queryMax
    );

    return this.operation(leftOperation, rightOperation);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }
}
