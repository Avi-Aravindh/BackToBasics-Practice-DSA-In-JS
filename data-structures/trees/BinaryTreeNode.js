import Comparator from '../../utils/Comparator';
import HashTable from '../hash-table/HashTable';

export default class BinaryTreeNode {
  constructor(value = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;

    this.meta = new HashTable();
    this.Comparator = new Comparator();
  }

  get leftHeight() {
    if (!this.left) {
      return -1;
    }
    return this.left.height;
  }

  get rightHeight() {
    if (!this.right) {
      return -1;
    }
    return this.right.height;
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight) + 1;
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  /* get parent's sibling */
  get uncle() {
    // if no parent
    if (!this.parent) {
      return undefined;
    }
    // if no grandparent
    if (!this.parent.parent) {
      return undefined;
    }
    // if no sibling
    let grandparent = this.parent.parent;
    return grandparent.left && grandparent.right
      ? grandparent.left.value === this.parent.value
        ? grandparent.right
        : grandparent.left
      : undefined;
    // if sibling
  }

  setLeft(node) {
    if (!node) {
      this.left = null;
    } else {
      node.parent = this;
      this.left = node;
    }

    return this;
  }

  setRight(node) {
    if (!node) {
      this.right = null;
    } else {
      node.parent = this;
      this.right = node;
    }
    return this;
  }

  setValue(value) {
    this.value = value;
  }
  traverseInOrder() {
    let results = [];
    if (this.left) {
      results.push(...this.left.traverseInOrder());
    }
    results.push(this.value);
    if (this.right) {
      results.push(...this.right.traverseInOrder());
    }

    return results;
  }

  removeChild(node) {
    if (!this.left && !this.right) {
      return false;
    }
    if (
      this.left &&
      this.left.value !== node.value &&
      this.right &&
      this.right.value !== node.value
    ) {
      return false;
    }

    if (this.left && this.left.value === node.value) {
      this.left.parent = null;
      this.left = null;
      return true;
    } else {
      this.right.parent = null;
      this.right = null;
      return true;
    }
  }

  replaceChild(nodeToReplace, replacementNode) {
    // no left or right
    if (!this.left && !this.right) {
      return false;
    }
    // no left or right with matching parent value
    if (
      this.left &&
      this.left.value !== nodeToReplace.value &&
      this.right &&
      this.right.value !== nodeToReplace.value
    ) {
      return false;
    }
    // if replcement node is null, don't do anything
    if (!replacementNode) {
      return false;
    }

    // replace
    if (this.left && this.left.value === nodeToReplace.value) {
      this.left.parent = null;
      this.left = replacementNode;
      return true;
    } else {
      this.right.parent = null;
      this.right = replacementNode;
      return true;
    }
  }

  static copyNode(sourceNode, destinationNode) {
    // no source or no destination
    if (!sourceNode || !destinationNode) {
      return null;
    }
    // copy source to destination

    for (let key of Object.keys(sourceNode)) {
      destinationNode[key] = sourceNode[key];
    }
    // destinationNode.left = sourceNode.left;
    // destinationNode.value = sourceNode.value;
    // destinationNode.right = sourceNode.right;
    // destinationNode.meta = sourceNode.meta;
    // destinationNode.Comparator = sourceNode.Comparator;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.traverseInOrder().toString();
  }
}
