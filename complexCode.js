/*
Filename: complexCode.js
Description: This complex JavaScript code demonstrates a unique implementation of a linked list data structure with various operations.
*/

class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(val) {
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  prepend(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    if (this.length === 0) {
      this.tail = newNode;
    }
    this.length++;
  }

  insert(index, val) {
    if (index >= this.length) {
      this.append(val);
    } else if (index === 0) {
      this.prepend(val);
    } else {
      const newNode = new Node(val);
      const leader = this.traverseToIndex(index - 1);
      const temp = leader.next;
      leader.next = newNode;
      newNode.next = temp;
      this.length++;
    }
  }

  remove(index) {
    if (index === 0) {
      this.head = this.head.next;
      if (this.length === 1) {
        this.tail = null;
      }
    } else {
      const leader = this.traverseToIndex(index - 1);
      const unwantedNode = leader.next;
      leader.next = unwantedNode.next;
      if (index === this.length - 1) {
        this.tail = leader;
      }
    }
    this.length--;
  }

  traverseToIndex(index) {
    let current = this.head;
    let count = 0;
    while (count !== index) {
      current = current.next;
      count++;
    }
    return current;
  }

  search(val) {
    let current = this.head;
    while (current !== null) {
      if (current.value === val) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  reverse() {
    if (this.length <= 1) {
      return;
    }

    let first = this.head;
    this.tail = this.head;
    let second = first.next;

    while (second !== null) {
      const temp = second.next;
      second.next = first;
      first = second;
      second = temp;
    }

    this.head.next = null;
    this.head = first;
  }
}

// Usage example
const linkedList = new LinkedList();
linkedList.append(10);
linkedList.append(20);
linkedList.append(30);
linkedList.prepend(5);
linkedList.insert(2, 15);
linkedList.remove(3);
console.log(linkedList.search(20));
linkedList.reverse();
console.log(linkedList);