'use strict';

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  add(val) {
    let node = {
      value: val,
      next: null
    };
    let current = null;
  
    if (!this.head) {
      this.head = node;
    }
    else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  };

  get(num) {
    let nodeToCheck = this.head;
    let count = 0;
    
    if(num > this.length) return "Doesn't Exist!"
    
    while(count < num) {
      nodeToCheck = nodeToCheck.next;
      count++;
    }
    
    return nodeToCheck;
  };
}

module.exports = LinkedList;