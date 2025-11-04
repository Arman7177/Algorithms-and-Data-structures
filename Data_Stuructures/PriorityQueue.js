class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    //helpers
    _parent(i) {
        return Math.floor((i - 1) / 2);
    }
    _left(i) {
        return 2 * i + 1;
    }
    _right(i) {
        return 2 * i + 2;
    }
    shiftUp(i) {
        while (i > 0) {
            let parent = this._parent(i);
            if (this.heap[i] < this.heap[parent]) {
                [this.heap[parent],this.heap[i]] = [this.heap[i],this.heap[parent]];
                i = parent;
            } else break;
        }
    }
    size () {
        return this.heap.length;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    peek () {
        return this.heap[0];
    }
    shiftDown(i) {
        let n = this.heap.length;
        while (true) {
            let left = this._left(i);
            let right = this._right(i);
            let smallest = i;
            if (left < n && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < n && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if (smallest !== i) {
                [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
                i = smallest;
            } else {
                break;
            }
        }
    }
    push(elem) {
        this.heap.push(elem);
        this.shiftUp(this.heap.length - 1)
    }
    pop () {
        if (this.isEmpty()) {
            throw new Error('Underflow')
        }
        const root = this.heap[0];
        const last = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.shiftDown(0)
        }
        return root;
    }
}