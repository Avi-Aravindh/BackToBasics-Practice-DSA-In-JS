import Node from './node';

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    let newNode = new Node(value, this.head, null);
    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
  }

  append(value) {
    let newNode = new Node(value, null, this.tail);
    if (this.tail) {
      this.tail.next = newNode;
    }
    // this.tail.next = newNode;
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    let deletedNode;
    while (currentNode) {
      if (currentNode.value === value) {
        deletedNode = currentNode;
        if (!currentNode.previous) {
          if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
          } else {
            currentNode.next.previous = null;
            this.head = currentNode.next;
          }
        } else if (!currentNode.next) {
          currentNode.previous.next = null;
          this.tail = currentNode.previous;
        } else {
          currentNode.previous.next = currentNode.next;
          currentNode.next.previous = currentNode.previous;
        }
      }

      currentNode = currentNode.next;
    }
    return deletedNode;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedNode = this.tail;
    // Tail has values before it
    if (this.tail.previous) {
      this.tail.previous.next = null;
      this.tail = this.tail.previous;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedNode;
  }

  deleteHead() {
    // no head
    if (!this.head) {
      return null;
    }

    // head is the only node || head and tail are same
    const deletedNode = this.head;
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.head.next.previous = null;
      this.head = this.head.next;
    }

    return deletedNode;
  }

  reverse() {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    while (currentNode) {
      let tempNext = currentNode.next;
      currentNode.next = currentNode.previous;
      currentNode.previous = tempNext;
      currentNode = tempNext;
    }

    let tempTail = this.tail;
    this.tail = this.head;
    this.head = tempTail;
  }

  fromArray(array) {
    this.head = null;
    this.tail = null;
    array.map((value) => this.append(value));
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
