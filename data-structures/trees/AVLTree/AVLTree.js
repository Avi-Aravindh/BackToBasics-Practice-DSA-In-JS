import BinarySearchTree from '../BinarySearchTree/BinarySearchTree';

export default class AVLTree extends BinarySearchTree {
  insert(value) {
    super.insert(value);
    let currentNode = this.root.find(value);
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }
  }

  balance(node) {
    if (node.balanceFactor >= 2) {
      if (node.left.balanceFactor <= -1) {
        let leftNode = node.left;
        let leftRightNode = node.left.right;

        // break the links;
        node.left = null;

        leftNode.right = null;
        leftNode.parent = null;

        leftRightNode.parent = null;

        // setup the leftRight node now;
        node.left = leftRightNode;
        leftRightNode.parent = node;

        if (!leftRightNode.left) {
          leftRightNode.left = leftNode;
          leftNode.parent = leftRightNode;
        } else {
          leftNode.right = leftRightNode.left;
          leftRightNode.left = leftNode;
          leftNode.parent = leftRightNode;
        }
      }

      const leftNode = node.left;
      node.left = null;
      if (node.parent) {
        leftNode.parent = node.parent;
        node.parent.left = leftNode;
      } else {
        this.root = leftNode;
      }
      if (!leftNode.right) {
        leftNode.right = node;
      } else {
        node.left = leftNode.right;
        leftNode.right.parent = node;
        leftNode.right = node;
      }
    } else if (node.balanceFactor <= -2) {
      if (node.right.balanceFactor >= 1) {
        let rightNode = node.right;
        let rightLeftNode = node.right.left;

        // separate the nodes
        node.right = null;
        rightNode.parent = null;

        rightNode.left = null;
        rightLeftNode.parent = null;

        // add the right left node;
        node.right = rightLeftNode;
        rightLeftNode.parent = node;

        if (!rightLeftNode.right) {
          rightLeftNode.right = rightNode;
          rightNode.parent = rightLeftNode;
        } else {
          rightNode.left = rightLeftNode.right;
          rightLeftNode.right = rightNode;
          rightNode.parent = rightLeftNode;
        }
      }

      const rightNode = node.right;
      node.right = null;
      if (node.parent) {
        node.parent.right = rightNode;
        rightNode.parent = node.parent;
      } else {
        this.root = rightNode;
      }
      if (!rightNode.left) {
        rightNode.left = node;
      } else {
        node.right = rightNode.left;
        rightNode.left.parent = node;
        rightNode.left = node;
      }
    }
  }
}
