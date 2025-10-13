class DynamicArray {
    #size = 0;
    #capacity = 0;
    #arr = null;
    #CAP_EXPONENT = 2;

    constructor(cap = 0) {
        if (cap < 0 || !Number.isInteger(cap)) {
            throw new Error('Initial capacity must be a non-negative integer');
        }
        this.#capacity = cap;
        this.#arr = new Uint32Array(cap);
    }
    static from(iterable) {
        const arr = new DynamicArray();
        for (const val of iterable) {
            arr.pushBack(val);
        }
        return arr;
    }
    size() {
        return this.#size;
    }
    capacity() {
        return this.#capacity;
    }
    empty() {
        return this.#size === 0 ? true : false;
    }
    reserve(n) {
        if(n > this.#capacity) {
            this.resize(n)
        }
    }
    shrinkToFit() {
        if(this.#size !== this.#capacity) {
            this.resize(this.#size);
        }
    }
    clear() {
        this.#size = 0
    }
    set(i, value) {
        if (i < 0 || i >= this.#size) {
            throw new Error('Out of range');
        }
        if (typeof value !== 'number' || value < 0 || !Number.isInteger(value)) {
            throw new Error('Only unsigned 32-bit integers are allowed');
        }
        this.#arr[i] = value;
    }
    front() {
        if(this.empty()) {
            throw new Error('Array is Empty')
        }
        return this.#arr[0];
    }
    back() {
        if(this.empty()) {
            throw new Error('Array is Empty')
        }
        return this.#arr[this.#size - 1];
    }
    toArray() {
        return this.#arr.slice(0,this.#size)
    }
    swap(i, j) {
        if ((i < 0 || i >= this.#size) || (j < 0 || j >= this.#size)) {
            throw new Error('Out of range');
        }
        [this.#arr[i],this.#arr[j]] = [this.#arr[j],this.#arr[i]]
    }
    values() {
        let arr = [];
        for(let i = 0; i < this.#size; ++i) {
            arr.push(this.#arr[i]);
        }
        return arr;
    }
    keys() {
        let arr = [];
        for(let i = 0; i < this.#size; ++i) {
            arr.push(i);
        }
        return arr;
    }
    entries() {
        let i = 0;
        return {
            [Symbol.iterator]: () => ({
                next: () => {
                    if (i < this.#size) {
                        return { value: [i, this.#arr[i++]], done: false };
                    }
                    return { done: true };
                }
            })
        };
    }
    forEach(fn) {
        if(typeof fn !== 'function') {
            throw new Error('fn is not a function')
        }
        for(let i = 0; i < this.#size; ++i) {
            fn(this.#arr[i],i,this)   
        }

    }
    map(fn) {
        if(typeof fn !== 'function') {
            throw new Error('fn is not a function')
        }
        let arr = new DynamicArray(this.#size)
        for(let i = 0; i < this.#size; ++i) {
            arr.pushBack(fn(this.#arr[i],i,this))   
        }
        return arr;
    }
    filter(fn) {
        if(typeof fn !== 'function') {
            throw new Error('fn is not a function')
        }
        let res = new DynamicArray(this.#size);
        for(let i = 0; i < this.#size; ++i) {
            if(fn(this.#arr[i],i,this)) {
              res.pushBack(this.#arr[i]);
            } 
        }
        return res;
    }
    some(fn) {
        if(typeof fn !== 'function') {
            throw new Error('fn is not a function')
        }
        
        for(let i = 0; i < this.#size; ++i) {
            if(fn(this.#arr[i],i,this)) {
              return true;
            } 
        }
        return false;
    }
    every(fn) {
        if(typeof fn !== 'function') {
            throw new Error('fn is not a function')
        }
        
        for(let i = 0; i < this.#size; ++i) {
            if(!fn(this.#arr[i],i,this)) {
              return false;
            } 
        }
        return true;
    }
    insert(pos, value) {
        if (typeof value !== 'number' || value < 0 || !Number.isInteger(value)) {
            throw new Error('Only unsigned 32-bit integers are allowed');
        }

        if(pos < 0 || pos > this.#size) {
            throw new Error('Out of Range');
        }
        if(this.#size === this.#capacity) {
            this.resize( this.#capacity > 0 ? this.#capacity * this.#CAP_EXPONENT : 1);
        }
        for(let i = this.#size; i > pos; --i) {
            this.#arr[i] = this.#arr[i - 1];
        }

        this.#arr[pos] = value
        this.#size++
    }

    resize(new_cap,fill = 0) {
         if (typeof fill !== 'number' || fill < 0 || !Number.isInteger(fill)) {
            throw new Error('Fill value must be a non-negative integer');
        }
        const tmp = new Uint32Array(new_cap);
        for(let i = 0; i < this.#size; ++i) {
            tmp[i] = this.#arr[i]
        }
        for(let i = this.#size; i < new_cap; ++i) {
            tmp[i] = fill;
        }
        this.#capacity = new_cap;

        this.#arr = tmp;
    }


    pushBack(elem) {
        if (typeof elem !== 'number' || elem < 0 || !Number.isInteger(elem)) {
            throw new Error('Only unsigned 32-bit integers are allowed');
        }

        if(this.#size === this.#capacity) {
            this.resize(this.#size * this.#CAP_EXPONENT);
        }
        this.#arr[this.#size++] = elem;
    }
    popBack() {
        if(this.#size == 0) {
            throw new Error('Cannot pop from empty array');
        }
        this.#size--;
    }

    at(index) {
        if(index < 0 || index >= this.#size) {
            throw new Error('Out of Range');
        }
        return this.#arr[index]; 
    }
    erase(pos) {
        if(pos < 0 || pos >= this.#size) {
           throw new Error('Out of Range');
        }

        for(let i = pos; i < this.#size -1; ++i) {
            this.#arr[i] = this.#arr[i + 1];
        }
        this.#size--;
    }
    find(fn) {
        if(typeof fn !== 'function') {
            throw new Error('fn is not a function');
        }
        for (let i = 0; i < this.#size; ++i) {
            if (fn(this.#arr[i],i,this)) {
                return this.#arr[i]
            }
        }
        return undefined;
    }
    findIndex(fn) {
        if(typeof fn !== 'function') {
            throw new Error('fn is not a function');
        }
        for (let i = 0; i < this.#size; ++i) {
            if (fn(this.#arr[i],i,this)) {
                return i;
            }
        }
        return -1;
    }
    includes(value) {
        for (let i = 0; i < this.#size; ++i) {
            if(value === this.#arr[i]) {
                return true;
            }
        }
        return false;
    }
    reduce(fn, init) {
        if (typeof fn !== 'function') {
            throw new Error('fn is not a function')
        }

        let accumulator;
        let startIndex = 0;

        if(init !== undefined) {
            accumulator = init;
        } else {
            if(this.#size === 0) {
                throw new Error('Reduce of empty array with no initial value');
            }
            accumulator = this.#arr[0];
            startIndex = 1;
        }
        for (let i = startIndex; i < this.#size; ++i) {
            accumulator = fn(accumulator,this.#arr[i],i,this);
        }
        return accumulator;
    }

    [Symbol.iterator]() {
        const collection = this.#arr;
        const collection_length = this.#size;
        let index = 0;

        return {
            next() {
                if(index < collection_length) {
                    return {value: collection[index++], done: false}
                }
                return {value: undefined, done: true}
            }
        }
    }
}