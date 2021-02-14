import Node from './node';

export default class LinkedList {
  constructor() {
    this.head = null;
  }

  prepend(value) {
    let node = new Node(value, this.head);
    this.head = node;
  }

  append(value) {
    let newNode = new Node(value, null);
    if (!this.head) {
      this.prepend(value);
      return;
    }
    let currentNode = this.head;

    while (currentNode) {
      if (!currentNode.next) {
        currentNode.next = newNode;
        return;
      }
      currentNode = currentNode.next;
    }
  }

  deleteHead() {
    if (!this.head) {
      return;
    }
    this.head = this.head.next;
  }

  deleteTail() {
    if (!this.head) {
      return;
    }
    let currentNode = this.head;
    while (currentNode) {
      if (!currentNode.next.next) {
        currentNode.next = null;
        return;
      }
      currentNode = currentNode.next;
    }
  }

  find(value, cb = undefined) {
    let index = -1;
    if (!this.head) {
      return index;
    }
    let currentNode = this.head;
    while (currentNode) {
      index++;
      if (cb && cb(currentNode.value)) {
        return currentNode;
      }
      if (currentNode.value === value) {
        return index;
      }
      currentNode = currentNode.next;
    }

    return -1;
  }

  removeDuplicates() {
    let newSet = new Set();
    if (!this.head) {
      return;
    }
    let currentNode = this.head;
    newSet.add(currentNode.value);
    while (currentNode.next) {
      if (newSet.has(currentNode.next.value)) {
        currentNode.next = currentNode.next.next;
      } else {
        newSet.add(currentNode.next.value);
        currentNode = currentNode.next;
      }
    }
  }

  reverse() {
    if (!this.head) {
      return;
    }
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
    }
    this.head = prevNode;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
