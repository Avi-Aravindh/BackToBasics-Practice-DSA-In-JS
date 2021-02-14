import BinaryTreeNode from '../BinaryTreeNode';
import Comparator from '../../../utils/Comparator';

export default class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value = null, compareFunction = undefined) {
    super(value);

    this.compareFunction = compareFunction;
    this.nodeValueComparator = new Comparator(compareFunction);
  }

  insert(value) {
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value;
      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value);
      } else {
        const newNode = new BinarySearchTreeNode(value, this.compareFunction);
        this.setLeft(newNode);
        return newNode;
      }
    }

    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value);
      } else {
        const newNode = new BinarySearchTreeNode(value, this.compareFunction);

        this.setRight(newNode);
        return newNode;
      }
    }
  }

  contains(value) {
    return this.traverseInOrder().indexOf(value) > -1;
  }

  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }

  find(value) {
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value)) {
      if (!this.left) {
        return null;
      }
      return this.left.find(value);
    }

    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      if (!this.right) {
        return null;
      }
      return this.right.find(value);
    }
  }

  remove(value) {
    let nodeToBeDeleted = this.find(value);
    if (!nodeToBeDeleted) {
      throw Error;
    }
    if (!nodeToBeDeleted.parent) {
      if (nodeToBeDeleted.right) {
        nodeToBeDeleted.value = nodeToBeDeleted.right.value;
        nodeToBeDeleted.right = nodeToBeDeleted.right.right;
        return;
      }

      if (nodeToBeDeleted.left) {
        nodeToBeDeleted.value = nodeToBeDeleted.left.value;
        nodeToBeDeleted.left = nodeToBeDeleted.left.left;
        return;
      }
      nodeToBeDeleted.value = null;
    }

    if (!nodeToBeDeleted.left && !nodeToBeDeleted.right) {
      nodeToBeDeleted.parent &&
        nodeToBeDeleted.parent.removeChild(nodeToBeDeleted);
      nodeToBeDeleted.parent = null;
      return true;
    }

    if (nodeToBeDeleted.left && nodeToBeDeleted.right) {
      let nextMin = nodeToBeDeleted.find(
        nodeToBeDeleted.right.traverseInOrder()[0]
      );

      // nextmin is on the left side of right node
      if (
        nodeToBeDeleted.right.left &&
        nextMin.value < nodeToBeDeleted.right.value
      ) {
        nodeToBeDeleted.value = nextMin.value;
        nextMin.parent.removeChild(nextMin);
        nextMin.parent = null;
      } else {
        // nextMin is actually the right node since there is no left child
        // then just change the value and bypass right node

        nodeToBeDeleted.value = nextMin.value;
        nodeToBeDeleted.right = nextMin.right;
        nextMin.parent = null;
      }
    }
    // now for node with one child
    else {
      nodeToBeDeleted.value = nodeToBeDeleted.left
        ? nodeToBeDeleted.left.value
        : nodeToBeDeleted.right.value;
      if (nodeToBeDeleted.left) {
        nodeToBeDeleted.left.parent = null;
      }
      if (nodeToBeDeleted.right) {
        nodeToBeDeleted.right.parent = null;
      }

      nodeToBeDeleted.left = null;
      nodeToBeDeleted.right = null;
    }
  }
}
