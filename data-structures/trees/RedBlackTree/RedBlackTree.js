import BinarySearchTree from '../BinarySearchTree/BinarySearchTree';

export default class RedBlackTree extends BinarySearchTree {
  insert(value) {
    const newNode = super.insert(value);
    if (this.root === null) {
      this.root = newNode;
    }
    this.setNodeColor(newNode, 'red');
    this.balance(newNode);
    return newNode;
  }

  balance(node) {
    // if there is no parent, this is root. Root is always black
    if (!node.parent) {
      this.setNodeColor(node, 'black');
      return;
    }

    // If parent is black, there is nothing to be done.
    if (this.isNodeBlack(node.parent)) {
      return;
    }

    // If parent is red, then look for uncle's color start checking for uncle's colors

    if (this.isNodeRed(node.parent)) {
      let parent = node.parent;
      let grandParent = parent.parent;
      const uncle =
        grandParent && grandParent.left === parent
          ? grandParent.right
          : grandParent.left;

      // If uncle is there and if uncle is red, change parent and uncle to black and grandparent to red
      // then balance grandparent
      if (uncle && this.isNodeRed(uncle)) {
        this.setNodeColor(parent, 'black');
        this.setNodeColor(uncle, 'black');
        this.setNodeColor(grandParent, 'red');
        this.balance(grandParent);
        return;
      }

      // If there is no uncle or if the uncle is black, then rotations & recolor of parent and grandparent begins.

      if (!uncle || (uncle && this.isNodeBlack(uncle))) {
        if (grandParent.balanceFactor >= 2) {
          // console.log("bf >=2", node.value, node.left.value, node.left.balanceFactor, node.parent.value)
          if (parent.balanceFactor <= -1) {
            let leftNode = node.parent;
            let leftRightNode = node;

            // break the links;
            grandParent.left = null;

            leftNode.right = null;
            leftNode.parent = null;

            leftRightNode.parent = null;

            // setup the leftRight node now;
            grandParent.left = leftRightNode;
            leftRightNode.parent = grandParent;

            if (!leftRightNode.left) {
              leftRightNode.left = leftNode;
              leftNode.parent = leftRightNode;
            } else {
              leftNode.right = leftRightNode.left;
              leftRightNode.left = leftNode;
              leftNode.parent = leftRightNode;
            }

            node = leftNode;
            parent = leftRightNode;
          }

          // separate nodes
          grandParent.left = null;
          parent.parent = null;

          // rotate
          if (grandParent.parent) {
            if (grandParent.parent.left === grandParent) {
              grandParent.parent.left = parent;
            } else {
              grandParent.parent.right = parent;
            }
            parent.parent = grandParent.parent;
          } else {
            this.root = parent;
          }

          if (!parent.right) {
            parent.right = grandParent;
            grandParent.parent = parent;
          } else {
            grandParent.left = parent.right;
            parent.right.parent = grandParent;
            parent.right = grandParent;
            grandParent.parent = parent;
          }

          this.setNodeColor(
            parent,
            parent.meta.get('color') === 'black' ? 'red' : 'black'
          );
          this.setNodeColor(
            grandParent,
            grandParent.meta.get('color') === 'black' ? 'red' : 'black'
          );
          this.balance(grandParent);
        } else if (grandParent.balanceFactor <= -2) {
          // console.log("bf <= -2", node.value, node.right.value, node.left)

          if (parent.balanceFactor >= 1) {
            let rightNode = parent;
            let rightLeftNode = node;

            // separate the nodes
            grandParent.right = null;
            rightNode.parent = null;

            rightNode.left = null;
            rightLeftNode.parent = null;

            // add the right left node;
            grandParent.right = rightLeftNode;
            rightLeftNode.parent = grandParent;

            if (!rightLeftNode.right) {
              rightLeftNode.right = rightNode;
              rightNode.parent = rightLeftNode;
            } else {
              rightNode.left = rightLeftNode.right;
              rightLeftNode.right = rightNode;
              rightNode.parent = rightLeftNode;
            }
            node = rightNode;
            parent = rightLeftNode;
          }

          // separate;
          grandParent.right = null;
          parent.parent = null;

          // rotate;
          if (grandParent.parent) {
            if (grandParent.parent.left === grandParent) {
              grandParent.parent.left = parent;
            } else {
              grandParent.parent.right = parent;
            }
            parent.parent = grandParent.parent;
          } else {
            this.root = parent;
          }

          if (!parent.left) {
            parent.left = grandParent;
            grandParent.parent = parent;
          } else {
            grandParent.right = parent.left;
            parent.left.parent = grandParent;
            parent.left = grandParent;
            grandParent.parent = parent;
          }
          this.setNodeColor(
            parent,
            parent.meta.get('color') === 'black' ? 'red' : 'black'
          );
          this.setNodeColor(
            grandParent,
            grandParent.meta.get('color') === 'black' ? 'red' : 'black'
          );
          this.balance(grandParent);
        }
      }
    }
  }

  remove(value) {
    if (this.root.traverseInOrder().indexOf(value) === -1) {
      throw err;
    }
  }
  setNodeColor(node, color) {
    return node.meta.set('color', color);
  }

  isNodeColored(node) {
    return node.meta.has('color');
  }

  isNodeRed(node) {
    return node.meta.get('color') == 'red' ? true : false;
  }

  isNodeBlack(node) {
    return node.meta.get('color') == 'black' ? true : false;
  }
}
