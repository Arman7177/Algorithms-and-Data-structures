class TreeNode {
    constructor(data = 0) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class Queue {
    constructor() {
        this.items = []; 
    }
    enqueue(elem) {
        this.items.push(elem)
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
    getSize() {
        return this.items.length;
    }
}
class BST {
    constructor() {
        this.root = null;
    }
    
    // ====INSERT====

    // Recursive Insert
    _insert(node,data) {
        if (!node) return new TreeNode(data);
        if (data < node.data) node.left = this._insert(node.left,data);
        else if (data > node.data) node.right = this._insert(node.right,data);
        return node;
    }
    insert(data) {
        this.root = this._insert(this.root,data);
    }

    // Iterative Insert
    iterativeInsert(data) {
        const newNode = new TreeNode(data);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (data < current.data) {
                if (!current.left) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else if (data > current.data) {
                if (!current.right) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            } else {
                break;
            }
        }
        return this.root;
    }
    // ====SEARCH====

    // Recursive Search
    search(node,key) {
        if (!node) return false;
        if (key === node.data) return true;
        if (key < node.data) return this.search(node.left,key);
        return this.search(node.right,key); 
    }
    // Iterative Search
    iterativeSearch(key) {
        let current = this.root;

        while (current) {
            if (key === current.data) return true;
            if (key < current.data) current = current.left;
            else current = current.right;
        }
        return false;
    }
    // ====FIND MIN / MAX====
    findMin(node = this.root) {
        if (!node) return null;
        while (node.left) node = node.left
        return node.data;
    }
    findMax(node = this.root) {
        if (!node) return null;
        while(node.right) node = node.right;
        return node.data;
    }
    // ====REMOVE====

    // Recursive Remove
    _remove(node,key) {
        if (!node) return null;

        if (key < node.data) node.left = this._remove(node.left,key);
        else if (key > node.data) node.right = this._remove(node.right,key);
        else {
            if (!node.left && !node.right) {
                return null;
            } else if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            }
            const min = this.findMin(node.right);
            node.data = min;
            node.right = this._remove(node.right,min);
        }
        return node;
    }
    remove(key) {
        this.root = this._remove(this.root,key);
    }

    // ====TRAVERSALS====

    // Recursive
    inorder(node = this.root, res = []) {
        if (!node) return res;
        this.inorder(node.left,res);
        res.push(node.data);
        this.inorder(node.right,res);
        return res;
    }
    preorder(node = this.root, res = []) {
        if (!node) return res;
        res.push(node.data);
        this.preorder(node.left,res);
        this.preorder(node.right,res);
        return res;
    }
    postorder(node = this.root, res = []) {
        if (!node) return res;
        this.postorder(node.left,res);
        this.postorder(node.right,res);
        res.push(node.data);
        return res;
    }
    // Iterative
    iterativeInorder() {
        let res = [];
        let stack = [];
        let current = this.root;

        while (current || stack.length > 0) {
            while (current) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            res.push(current.data);
            current = current.right;
        }
        return res;
    }
    iterativePreorder() {
        if (!this.root) return res;
        let res = [];
        let stack = [this.root];

        while (stack.length > 0) {
            let node = stack.pop();
            res.push(node.data);
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        return res;
    }
    iterativePostorder() {
        if (!this.root) return res;
        let res = []
        let stack1 = [this.root];
        let stack2 = [];

        while (stack1.length > 0) {
            let node = stack1.pop();
            stack2.push(node);
            if (node.right) stack1.push(node.right);
            if (node.left) stack1.push(node.left);
        }
        while (stack2.length > 0) {
            res.push(stack2.pop().data);
        }
        return res;
    }
    // ==== LEVEL ORDER (BFS) ====
    level_order() {
        if (!this.root) return null;
        let que = new Queue();
        que.enqueue(this.root);
        let result = [];

        while (!que.isEmpty()) {
            let levelSize = que.getSize();
            let level = [];
            for (let i = 0; i < levelSize; ++i) {
                let node = que.dequeue();
                level.push(node.data);
                if (node.left) que.enqueue(node.left);
                if (node.right) que.enqueue(node.right);
            }
            result.push(level)
        }
        return result;
    }

    // ==== HEIGHT ===
    getHeight(node = this.root) {
        if (!node) return 0;
        return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }

    // ==== COUNT NODES / LEAVES ====
    countNodes(node = this.root) {
        if (!node) return 0;
        return 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }
    countLeaves(node = this.root) {
        if (!node) return 0;
        if (!node.left && !node.right) return 1;
        return this.countLeaves(node.left) + this.countLeaves(node.right); 
    }
    // ===== CHECK IF BALANCED =====
    isBalanced(node = this.root) {
        const check = (n) => {
            if (!n) return 0;
            const left = check(n.left);
            if (left === -1) return -1;
            const right = check(n.right);
            if (right === -1) return -1;
            if (Math.abs(left - right) > 1) return -1;
            return 1 + Math.max(left, right);
        };
        return check(node) !== -1;
    }
    print() {
        console.log('Inoreder',this.inorder(this.root))
        console.log('Preoreder',this.preorder(this.root))
        console.log('Postoreder',this.postorder(this.root))
    }
}


let bst = new BST();
[1,2,3,,5].forEach(v => bst.insert(v));
bst.print()