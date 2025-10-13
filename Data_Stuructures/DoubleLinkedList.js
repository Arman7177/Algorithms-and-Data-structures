class Node {
    constructor(value,next = null,prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
class DoubleLinkedList {
    #head = null;
    #tail = null;
    #size = 0;
    #MAGIC_NUMBER = 0;
    constructor(iterables) {
        if (typeof iterables[Symbol.iterator] === 'function') {
            for (let item of iterables) {
                let newNode = new Node(item);
                if (!this.#head) {
                    this.#head = newNode;
                    this.#tail = newNode;
                } else {
                    this.#tail.next = newNode;
                    this.#tail = newNode;
                    newNode.prev = this.#tail;
                }
                this.#size++
            }
        } else {
            throw new Error('Provided value is not iterable');
        }
    }
    size() {
        return this.#size;
    }
    isEmpty() {
        return this.#size === this.#MAGIC_NUMBER;
    }
    clear() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }
    push_front(value) {
        let newNode = new Node(value);
        if (!this.#size) {
            this.#tail = newNode;
        } else {
            newNode.next = this.#head;
            this.#head.prev = newNode;
        }
        this.#head = newNode;
        this.#size++
    }
    push_back(value) {
        let newNode = new Node(value);
        if (!this.#size) {
            this.#head = newNode;
        } else {
            this.#tail.next = newNode;
            newNode.prev = this.#tail;
        }
        this.#tail = newNode;
        this.#size++
    }
    pop_front() {
        if (!this.#size) return null;
        const node = this.#head.value;
        if (this.#size > 1) {
            this.#head.prev = null;
        } else {
            this.#head = this.#tail = null;
        }
        this.#size--;
        return node;
    }
    pop_back() {
        if (!this.#head) return null;
        let node = this.#tail;
        if (this.#head === this.#tail) {
            this.#head = null;
            this.#tail = null;
            return;
        } else {
            this.#tail = this.#tail.prev;
            this.#tail.next = null;
            node.prev = null;
        }
        this.#size--;
        return node;
    }
    front() {
        return this.#head ? this.#head.value : null;
    }
    back() {
        return this.#tail ? this.#tail.value : null;
    }
    at(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('Out of range');
        }
        if (!this.#head) return this.#head;
        let current = this.#head;
        for (let i = 0; i < index; ++i) {
            current = current.next;
        }
        return current.value;
    }
    insert(index, value) {
        if (index < 0 || index >= this.#size) {
            throw new Error('Out of range');
        }
        if (index === 0) {
            this.push_front();
        }
        if (index === this.#size) {
            this.push_back();
        }
        let newNode = new Node(value);
        let current = this.#head;
        for (let i = 0; i < index - 1; ++i) {
            current = current.next;
        }
        newNode.next = current.next;
        newNode.prev = current;
        current.next.prev = newNode;
        current.next = newNode;
        this.#size++
    }
    erase(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('Out of range');
        }
        if (index === 0) {
            this.pop_front();
            return;
        }
        if (index === this.#size - 1) {
            this.pop_back();
            return;
        }
        let current = this.#head;
        for (let i = 0; i < index - 1; ++i) {
            current = current.next;
        }
        let nodeToRemove = current.next;
        current.next = nodeToRemove.next;
        nodeToRemove.next.prev = current;
        this.#size--
    }
    remove(value, equals = Object.is) {
        if (!this.#head) return null;
        let current = this.#head;
        while (current) {
            if (equals(current.value,value)) {
                let nodeToRemove = current;
                if (nodeToRemove === this.#head) {
                    this.pop_front();
                } else if(nodeToRemove === this.#tail) {
                    this.pop_back()
                } else {
                    nodeToRemove.prev.next = nodeToRemove.next;
                    nodeToRemove.next.prev = nodeToRemove.prev;
                    this.#size--;
                }
                current = nodeToRemove.next;
                nodeToRemove.prev = null;
                nodeToRemove.next = null;
            } else {
                current = current.next;
            }
        }
        return null;
    }
    reverse() {
    if (!this.#head || !this.#head.next) return this.#head;
    let current = this.#head;
    this.#tail = current;
    while (current) {
        let temp = current.next;
        current.next = current.prev;
        current.prev = temp;
        if (!temp) {
            this.#head = current;
        }
        current = temp;
    }
    return this.#head;
    }
    sort(compareFn) {
        let items = [...this]; 

        if (typeof compareFn === 'function') {
            items.sort(compareFn);
        } else {
            items.sort();
        }

        this.clear();
        for (let item of items) {
            this.push_back(item);
        }
    }

    merge(other, compareFn = (a, b) => a - b) {
        let dummy = new Node(null);
        let current = dummy;

        let list1 = this.#head;
        let list2 = other.#head;

        while (list1 && list2) {
            if (compareFn(list1.value, list2.value) <= 0) {
                current.next = list1;
                list1.prev = current;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2.prev = current;
                list2 = list2.next;
            }
            current = current.next;
        }

        let rest = list1 ? list1 : list2;
        if (rest) {
            current.next = rest;
            rest.prev = current;
        }

        this.#head = dummy.next;
        if (this.#head) this.#head.prev = null;

        this.#tail = null;
        this.#size = 0;
        let tmp = this.#head;
        while (tmp) {
            this.#tail = tmp;
            this.#size++;
            tmp = tmp.next;
        }

        other.clear();
    }

    [Symbol.iterator]() {
    let current = this.#head;

        return {
            next() {
                if(current) {
                    let value = current.value;
                    current = current.next;
                    return {value, done: false};
                }
                else {
                    return {value: undefined, done: true};
                }
            }
        }
    }
}