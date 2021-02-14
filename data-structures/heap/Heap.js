import Comparator from '../../utils/Comparator';

export default class Heap {
  constructor(comparatorFunction) {
    if (new.target === Heap) {
      throw new TypeError('no direct instance');
    }
    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.hasParent(childIndex)
      ? this.heapContainer[this.getParentIndex(childIndex)]
      : null;
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = tmp;
  }

  peek() {
    return this.heapContainer.length > 0 ? this.heapContainer[0] : null;
  }

  isEmpty() {
    return this.heapContainer.length === 0;
  }

  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }
    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }
    let value = this.heapContainer[0];

    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();
    return value;
  }

  heapifyUp() {
    let currentIndex = this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    while (this.hasLeftChild(currentIndex)) {
      let smallestIndex = currentIndex;
      if (this.leftChild(currentIndex) <= this.heapContainer[currentIndex]) {
        smallestIndex = this.getLeftChildIndex(currentIndex);
      }
      if (
        this.rightChild(currentIndex) < this.heapContainer[currentIndex] &&
        this.rightChild(currentIndex) < this.leftChild(currentIndex)
      ) {
        smallestIndex = this.getRightChildIndex(currentIndex);
      }
      if (smallestIndex === currentIndex) {
        break;
      } else {
        this.swap(smallestIndex, currentIndex);
        currentIndex = smallestIndex;
      }
    }
  }

  find(value, comparator = this.compare) {
    let indexes = [];
    if (this.heapContainer.indexOf(value) === -1) {
      return indexes;
    }
    this.heapContainer.map((val, index) => {
      if (comparator.equal(val, value)) {
        indexes.push(index);
      }
    });

    return indexes;
  }

  remove(item, comparator = this.compare) {
    const removeIndexes = this.find(item, comparator);
    if (!removeIndexes) {
      return this;
    }

    for (let i = 0; i < removeIndexes.length; i++) {
      if (removeIndexes[i] === this.heapContainer.length - 1) {
        this.heapContainer.pop();
        break;
      } else {
        this.heapContainer[removeIndexes[i]] = this.heapContainer.pop();
        if (removeIndexes[i] === 0) {
          this.heapifyDown();
        } else {
          this.heapifyUp();
        }
      }
    }
    return this;
  }

  toString() {
    return this.heapContainer.toString();
  }
}
