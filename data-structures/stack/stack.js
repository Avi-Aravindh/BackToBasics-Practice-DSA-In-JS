import LinkedList from '../linked-list/LinkedList';

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    return this.linkedList.head ? this.linkedList.head.value : null;
  }

  push(value) {
    this.linkedList.prepend(value);
  }

  pop() {
    let value = this.peek();
    this.linkedList.deleteHead();
    return value;
  }

  toArray() {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value);
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
