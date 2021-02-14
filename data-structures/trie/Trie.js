import TrieNode from './TrieNode';

export default class Trie {
  constructor() {
    this.head = new TrieNode('*');
  }
  addWord(word) {
    const characters = Array.from(word);
    let currentNode = this.head;
    for (let i = 0; i < characters.length; i++) {
      if (currentNode) {
        currentNode = currentNode.addChild(
          characters[i],
          i === characters.length - 1
        );
      }
    }
    return this;
  }

  doesWordExist(word) {
    const characters = Array.from(word);
    let currentNode = this.head;
    for (let i = 0; i < characters.length; i++) {
      if (!currentNode.hasChild(characters[i])) {
        return false;
      }
      currentNode = currentNode.getChild(characters[i]);
    }

    if (currentNode.isCompleteWord) {
      return true;
    } else {
      return false;
    }
  }

  suggestNextCharacters(characters) {
    const chars = Array.from(characters);

    let currentNode = this.head;
    for (let i = 0; i < chars.length; i++) {
      if (currentNode.hasChild(chars[i])) {
        currentNode = currentNode.getChild(chars[i]);

        if (i === chars.length - 1) {
          return currentNode.suggestChildren();
        }
      } else {
        return null;
      }
    }
  }

  deleteWord(word) {
    if (!this.doesWordExist(word)) {
      return null;
    }

    const characters = Array.from(word);
    let currentNode = this.head;
    for (let i = 0; i < characters.length; i++) {
      if (!currentNode.hasChild(characters[i])) {
        return false;
      }
      currentNode = currentNode.getChild(characters[i]);
    }

    if (currentNode.isCompleteWord) {
      currentNode.isCompleteWord = false;
    }
  }
}
