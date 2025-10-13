class Deque {
    #map
    #size = 0;
    constructor(initialBucket = 4, initialBlockSize = 8) {
        if (initialBucket < 2) {
            throw new Error('Needed at least 2 buckets');
        }
        const mid = Math.floor(initialBucket / 2);
        this.#map = new Array(initialBucket).fill(null);
        this.blockSize = initialBlockSize;
        this.headBlock = mid - 1;
        this.headIndex = this.blockSize - 1;
        this.tailBlock = mid;
        this.tailIndex = 0;
    }
    size() {
        return this.#size;
    }
    isEmpty() {
        return this.#size === 0;
    }
    clear() {
        this.#map.fill(null);
        this.#size = 0;

        const mid = Math.floor(this.#map.length / 2);
        this.headBlock = mid;
        this.headIndex = this.blockSize - 1;
        this.tailBlock = mid - 1;
        this.tailIndex = 0;
    }
    pushBack(value) {
        if (!this.#map[this.tailBlock]) {
            this.#map[this.tailBlock] = new Array(this.blockSize).fill(null);
        }
        this.#map[this.tailBlock][this.tailIndex] = value;

        if (this.tailIndex === this.blockSize - 1) {
            if (this.tailBlock >=  this.#map.length - 1) {
                const old = this.#map;
                const newLength = old.length * 2;
                const next = new Array(newLength).fill(null);
                const offset = Math.floor((newLength - old.length) / 2);

                for (let i = 0; i < old.length; ++i) {
                    next[i + offset] = old[i];
                }

                this.#map = next;
                this.headBlock += offset;
                this.tailBlock += offset;
            }
            this.tailBlock++;
            this.tailIndex = 0;
        } else {
            this.tailIndex++;
        }
        ++this.#size
    }
    pushFront(value) {
        if (!this.#map[this.headBlock]) {
            this.#map[this.headBlock] = new Array(this.blockSize).fill(null);
        }
        this.#map[this.headBlock][this.headIndex] = value;

        if (this.headIndex === 0) {
            if (this.headBlock === 0) {
                const old = this.#map;
                const newLength = old.length * 2;
                const next = new Array(newLength).fill(null);
                const offset = Math.floor((newLength - old.length) / 2);

                for (let i = 0; i < old.length; ++i) {
                    next[i + offset] = old[i];
                }

                this.#map = next;
                this.headBlock += offset;
                this.tailBlock += offset;
            }
            this.headBlock--
            this.headIndex = this.blockSize - 1;
        } else {
            this.headIndex--;
        }
        ++this.#size
    }
    popFront() {
        if (this.#size === 0) return undefined;

        if (!this.#map[this.headBlock]) {
            this.#map[this.headBlock] = new Array(this.blockSize).fill(null);
        }

        const value = this.#map[this.headBlock][this.headIndex];
        this.#map[this.headBlock][this.headIndex] = null;

        --this.#size;

        if (this.headIndex === this.blockSize - 1) {
            this.headBlock++
            this.headIndex = 0;
        } else {
            this.headIndex++
        }
        return value;

    }
    popBack() {
        if (this.#size === 0) return undefined;

        if (!this.#map[this.tailBlock]) {
            this.#map[this.tailBlock] = new Array(this.blockSize).fill(null);
        }

        const value = this.#map[this.tailBlock][this.tailIndex];
        this.#map[this.tailBlock][this.tailIndex] = null;

        --this.#size;

        if (this.tailIndex === 0) {
            this.tailBlock--
            this.tailIndex = this.blockSize - 1;
        } else {
            this.tailIndex--
        }
        return value;

    }
    front() {
        if (this.#size === 0) return undefined;

        return this.#map[this.headBlock][this.headIndex]
    }
    back() {
       if (this.#size === 0) return undefined;

        return this.#map[this.tailBlock][this.tailIndex] 
    }
    at(index) {
        if (index < 0 || index >= this.size) {
            throw new RangeError('Index out of range');
        }

        let block = this.headBlock;
        let pos = this.headIndex;

        let offset = index;

        pos += offset;
        block += Math.floor(pos / this.blockSize);
        pos = pos % this.blockSize;

        return this.#map[block][pos];
    }

    insert(index, value) {
        if (index < 0 || index > this.#size) {
            throw new RangeError('Index out of range');
        }

        if (index === 0) {
            this.pushFront(value);
            return;
        }
        if (index === this.#size) {
            this.pushBack(value);
        return;
        }

        let remaining = index;
        let block = this.headBlock;
        let pos = this.headIndex + 1; 

   
        while (remaining > 0) {
            let spaceInBlock = this.blockSize - pos;
            if (remaining <= spaceInBlock) {
                pos += remaining;
                remaining = 0;
            } else {
                remaining -= spaceInBlock;
                block++;
                pos = 0;
            }
        }

    
        let currentBlock = block;
        let currentPos = pos;

        let carry = value;

        while (true) {
            if (!this.#map[currentBlock]) this.#map[currentBlock] = new Array(this.blockSize).fill(null);

        
            let temp = this.#map[currentBlock][currentPos];
            this.#map[currentBlock][currentPos] = carry;
            carry = temp;

            currentPos++;
            if (currentPos >= this.blockSize) {
                currentPos = 0;
                currentBlock++;
            }

            if (carry === null) break; 
        }

        this.#size++;
    }
    erase(index) {
        if (index < 0 || index >= this.#size) {
            throw new RangeError('Index out of range');
        }
        if (index === 0) {
            this.popFront();
            return;
        }
        if (index === this.#size - 1) {
            this.popBack();
            return;
        }

        let remaining = index;
        let block = this.headBlock;
        let pos = this.headIndex + 1; 

        while (remaining > 0) {
            let spaceInBlock = this.blockSize - pos;
            if (remaining < spaceInBlock) {
                pos += remaining;
                remaining = 0;
            } else {
                remaining -= spaceInBlock;
                block++;
                pos = 0;
            }
        }

        let currentBlock = block;
        let currentPos = pos;

        while (true) {
            if (!this.#map[currentBlock]) break;

            let nextBlock = currentBlock;
            let nextPos = currentPos + 1;
            if (nextPos >= this.blockSize) {
                nextPos = 0;
                nextBlock++;
                if (nextBlock >= this.#map.length) break;
            }

            this.#map[currentBlock][currentPos] = this.#map[nextBlock][nextPos];

            currentBlock = nextBlock;
            currentPos = nextPos;

            if (currentBlock === this.tailBlock && currentPos === this.tailIndex) {
                this.#map[currentBlock][currentPos] = null;
                break;
            }
        }

        this.#size--;
    }
    remove(value, equals = Object.is) {
        if (this.#size === 0) return;

        let block = this.headBlock;
        let pos = this.headIndex + 1; 
        let count = 0; 

            while (count < this.#size) {
            if (this.#map[block][pos] !== null && equals(this.#map[block][pos], value)) {
            
                let currentBlock = block;
                let currentPos = pos;

                while (true) {
                    let nextBlock = currentBlock;
                    let nextPos = currentPos + 1;

                    if (nextPos >= this.blockSize) {
                        nextPos = 0;
                        nextBlock++;
                        if (nextBlock >= this.#map.length) break;
                    }

                    this.#map[currentBlock][currentPos] = this.#map[nextBlock][nextPos];

                    currentBlock = nextBlock;
                    currentPos = nextPos;

                    if (currentBlock === this.tailBlock && currentPos === this.tailIndex) {
                        this.#map[currentBlock][currentPos] = null;
                        break;
                    }
                }

                this.#size--;
                continue;
            }
            pos++;
            if (pos >= this.blockSize) {
                pos = 0;
                block++;
            }
            count++;
        }
    }


    visualize() {
        for (let i = 0; i < this.#map.length; ++i) {
            const bucket = this.#map[i];
        if (!bucket) continue;

            const display = bucket
                .map((elem) => (elem === null ? '.' : elem))
                .join(' ');
            console.log(`Bucket_${i}: [ ${display}]`);
        }
    }
    [Symbol.iterator]() {
        let block = this.headBlock;
        let pos = this.headIndex + 1; 
        let count = 0; 
        const size = this.#size;
        const map = this.#map;
        const blockSize = this.blockSize;
        const tailBlock = this.tailBlock;
        const tailIndex = this.tailIndex;

        return {
            next() {
                if (count >= size) {
                    return { value: undefined, done: true };
                }

                const value = map[block][pos];

            
                pos++;
                if (pos >= blockSize) {
                    pos = 0;
                    block++;
                }

                count++;
                return { value, done: false };
            }
        }
    }

}

