class Queue {
    constructor(capacity = 10) {
        this.arr = new Array(capacity).fill(null);
        this.cap = capacity;
        this.front = 0;
        this.rear = 0;
        this.size = 0;
    }
    isEmpty() {
        return this.size === 0;
    }
    isFull() {
        return this.size === this.cap;
    }
    enqueue(elem) {
        if (this.isFull()) throw new Error('Queue is full');
        this.arr[this.rear] = elem;
        this.rear = (this.rear + 1) % this.cap;
        this.size++; 
    }
    dequeue() {
        if (this.isEmpty()) throw new Error('Queue is empty');
        let res = this.arr[this.front];
        this.front = (this.front + 1) % this.cap;
        this.size--;
        return res; 
    }
}