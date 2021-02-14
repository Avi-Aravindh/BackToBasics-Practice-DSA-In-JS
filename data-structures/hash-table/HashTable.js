import LinkedList from '../linked-list/LinkedList';

const defaultTableSize = 32;
export default class HashTable {
  constructor(tableSize = defaultTableSize) {
    this.buckets = Array(tableSize)
      .fill(null)
      .map(() => new LinkedList());
    this.keys = {};
  }

  hash(key) {
    const hash = Array.from(key).reduce(
      (acc, keyValue) => acc + keyValue.charCodeAt(0),
      0
    );

    return hash % this.buckets.length;
  }

  set(key, value) {
    let index = this.hash(key);
    this.keys[key] = index;

    let currentLinkedList = this.buckets[index];
    let currentNode = currentLinkedList.head;
    while (currentNode) {
      if (currentNode.value.key === key) {
        currentNode.value.value = value;
        return;
      }
      currentNode = currentNode.next;
    }
    this.buckets[index].append({ key, value });
  }

  get(key) {
    if (Object.keys(this.keys).indexOf(key) === -1) {
      return undefined;
    }
    let index = this.hash(key);
    let currentLinkedList = this.buckets[index];
    let currentNode = currentLinkedList.head;

    while (currentNode) {
      if (currentNode.value.key === key) {
        return currentNode.value.value;
      }
      currentNode = currentNode.next;
    }
    return undefined;
  }

  delete(key) {
    // no key
    if (Object.keys(this.keys).indexOf(key) === -1) {
      return null;
    }

    // key is there
    let index = this.hash(key);

    let currentLinkedList = this.buckets[index];
    let currentNode = currentLinkedList.head;

    // key is at first
    if (currentNode.value.key === key) {
      currentLinkedList.deleteHead();
      delete this.keys[key];
      return;
    }

    while (currentNode) {
      if (currentNode.next && currentNode.next.value.key === key) {
        currentNode.next = currentNode.next.next;
        delete this.keys[key];
      }
      currentNode = currentNode.next;
    }
    // key is at last

    // key is in middle

    // remove key
  }

  has(key) {
    return Object.keys(this.keys).indexOf(key) > -1;
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  getValues() {
    let values = [];
    this.buckets.map((bucket) => {
      bucket.toArray().map((node) => {
        values.push(node.value.value);
      });
    });
    return values;
  }
}
