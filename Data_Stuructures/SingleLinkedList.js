class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class SingleLinkedList {
  #head = null;
  #tail = null;
  #size = 0;
  
constructor(iterable = []) {
    if(typeof iterable[Symbol.iterator] === 'function') {
        for (let item of iterable) {
            let newNode = new Node(item);
                
            if(!this.#head) {
                this.#head = newNode;
                this.#tail = newNode;
            } else {
                this.#tail.next = newNode;
                this.#tail = newNode;
            }
            this.#size++; 
        }
    } else {
        throw new Error("Provided value is not iterable")
    }
}
static from(iterable) {
    let list = new SingleLinkedList();
    for (let item of iterable) {
        list.push_back(item);
    }
    return list;
}
print() {
    let current = this.#head;

    while(current) {
        console.log(current.value);
        current = current.next;
    }
}
size() {
    return this.#size;
}
isEmpty() {
    return this.#size === 0;
}
clear() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
}
push_front(value) {
    let newNode = new Node(value);
    newNode.next = this.#head;
    this.#head = newNode;

    if (!this.#tail) {
        this.#tail = newNode;
    }
    this.#size++;
}
push_back(value) {
    let newNode = new Node(value);

    if(!this.#head) {
        this.#head = newNode;
        this.#tail = newNode;
    } else {
        this.#tail.next = newNode;
        this.#tail = newNode;
    }
    this.#size++;
}

pop_front() {
    if(!this.#head) return this.#head;

    this.#head = this.#head.next;

    if (!this.#head) this.#tail = null
    this.#size--;
}
pop_back() {
    if (!this.#head) return;

    if (this.#head === this.#tail) {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
        return;
    }
    let current = this.#head;
    while (current.next !== this.#tail) {
        current = current.next;
    }
    current.next = null;
    this.#tail = current;
    this.#size--;
}

front() {
    return this.#head ? this.#head.value : null;
}
back() {
    return this.#tail ? this.#tail.value : null;
}

at(index) {
     if (index < 0 || index >= this.#size) {
        throw new Error('Index out of range');
    }

    let current = this.#head;
    for (let i = 0; i < index; ++i) {
        current = current.next;
    }
    return current.value;
}

insert(index, value) {
    if (index < 0 || index > this.#size) {
        throw new Error('Index out of range');
    }
    if (index === 0) {
        this.push_front(value);
        return;
    }
    if (index === this.#size) {
        this.push_back(value);
        return;
    }
    let newNode = new Node(value);
    let current = this.#head;

    for (let i = 0; i < index - 1; ++i) {
        current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode
    this.#size++;
}
erase(index) {
    if (index < 0 || index >= this.#size) {
        throw new Error('Index out of range');
    }

    if (index === 0) {
        this.pop_front();
        return
    }
    if (index === this.#size - 1) {
        this.pop_back();
        return
    }
    let current = this.#head;
    for (let i = 0; i < index - 1; ++i) {
        current = current.next;
    }
    current.next = current.next.next;
    this.#size--
}
remove(value, equals = Object.is) {
    if (!this.#head) return null;

    if (equals(this.#head.value, value)) {
        this.pop_front();
        if (!this.#head) return
    }
    let current = this.#head;
    while (current.next) {
        if (equals(current.next.value, value)) {
            if (current.next === this.#tail) {
                this.#tail = current;
            }
            current.next = current.next.next;
            this.#size--;
            continue;
        }
        current = current.next;
    }
    return null;
}
reverse() {
    if(!this.#head || !this.#head.next) return this.#head;

    let current = this.#head;
    let next = null;
    let prev = null;

    this.#tail = this.#head;

    while (current) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    this.#head = prev
    return this.#head;
}
toArray() {
    let arr = [];
    let current = this.#head;
    while (current) {
        arr.push(current.value);
        current = current.next;
    }
    return arr;
}

sort(compareFn) {
    let items = [...this];

    if (typeof compareFn === 'function') {
        items.sort(compareFn);
    } else {
        items.sort()
    }
    
    this.clear();
    for (let item of items) {
        this.push_back(item);
    }
}
merge(other,compareFn = ((a,b) => a - b)) {
    let dummy = new Node(null);
    let current = dummy;

    let list1 = this.#head;
    let list2 = other.#head;

    while (list1 !== null && list2 !== null) {
        if (compareFn(list1.value,list2.value) <= 0) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next
        }
        current = current.next;
    }
    current.next = list1 !== null ? list1 : list2;

    this.#head = dummy.next
    this.#tail = null;
    this.#size = 0;

    let tmp = this.#head;
    while (tmp) {
        this.#tail = tmp;
        this.#size++;
        tmp = tmp.next;
    }
    other.clear()
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