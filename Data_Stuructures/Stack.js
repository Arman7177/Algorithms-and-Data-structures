class Stack {
    constructor(capacity = 10) {
        this.arr = new Array(capacity).fill(null);
        this.cap = capacity;
        this.size = 0;
    }
    isEmpty() {
        return this.size === 0;
    }
    isFull() {
        return this.size === this.cap;
    }
    push(elem) {
        if (this.isFull()) {
            throw new Error('Stack is full');
        }
        this.arr[this.size++] = elem;
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.arr[--this.size];
    }
}