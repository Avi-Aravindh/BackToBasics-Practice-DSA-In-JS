import Comparator from '../../utils/Comparator';

import Node from './node';

export default class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value) {
    let node = new Node(value, this.head);
    this.head = node;
  }

  append(value) {
    const newNode = new Node(value);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
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

  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
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

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
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
