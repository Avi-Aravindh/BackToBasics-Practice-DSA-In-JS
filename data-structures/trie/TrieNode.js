import HashTable from '../hash-table/HashTable';

export default class TrieNode {
  constructor(character, isCompleteWord = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable();
  }

  addChild(character, isCompleteWord = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    const childNode = this.children.get(character);
    childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;
    return childNode;
  }

  getChild(character) {
    return this.children.get(character);
  }

  hasChildren() {
    return Object.keys(this.children.keys).length > 0;
  }

  hasChild(character) {
    let keys = Object.keys(this.children.keys);
    return keys.indexOf(character) > -1;
  }

  removeChild(character) {
    let child = this.getChild(character);
    if (child && !child.isCompleteWord && !child.hasChildren()) {
      this.children.delete(character);
    }

    return this;
  }

  suggestChildren() {
    return [...this.children.getKeys()];
  }

  toString() {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
    const isCompleteString = this.isCompleteWord ? '*' : '';

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
