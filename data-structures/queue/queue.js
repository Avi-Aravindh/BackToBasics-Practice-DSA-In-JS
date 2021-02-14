import LinkedList from '../linked-list/LinkedList';

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    return this.linkedList.head ? this.linkedList.head.value : null;
  }

  enqueue(value) {
    this.linkedList.append(value);
  }

  dequeue() {
    let value = this.peek();
    this.linkedList.deleteHead();
    return value;
  }

  toString(callback) {
    // Return string representation of the queue's linked list.
    return this.linkedList.toString(callback);
  }
}
