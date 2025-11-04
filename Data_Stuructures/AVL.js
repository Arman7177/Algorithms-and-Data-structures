const Queue = require('./Queue.js');

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}
class AVL {
    constructor(value) {
        if (value === undefined || value === null) {
            this.root = null;
            return;
        }
        this.root = new Node(value);
    }
    //Private Helpers
    _getHeight(node) {
        return node ? node.height : 0;
    }
    _update(node) {
        return (
            1 + Math.max(this._getHeight(node.left),this._getHeight(node.right))
        ); 
    }
    _balanceFactor(node) {
        return this._getHeight(node.left) - this._getHeight(node.right);
    }
    _rightRotate(node) {
        let newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;

        node.height = this._update(node);
        newRoot.height = this._update(newRoot);

        return newRoot;
    }
    _leftRotate(node) {
        let newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;

        node.height = this._update(node);
        newRoot.height = this._update(newRoot);

        return newRoot;
    }
    _insert(node,value) {
        if (!node) {
            return new Node(value);
        }
        if (value < node.data) {
            node.left = this._insert(node.left,value);
        }
        else if (value > node.data) {
            node.right = this._insert(node.right,value);
        } else {
            return node;
        }

        node.height = this._update(node);
        const bf = this._balanceFactor(node);

        if (bf > 1 && value < node.left.data) {
            node = this._rightRotate(node);
        }
        if (bf < -1 && value > node.right.data) {
            node = this._leftRotate(node);
        }
        if (bf > 1 && value > node.left.data) {
            node.left = this._leftRotate(node.left);
            return this._rightRotate(node);
        }
        if (bf < -1 && value < node.right.data) {
            node.right = this._rightRotate(node.right);
            return this._leftRotate(node);
        }
        return node;
    }
    _remove(node,value) {
        if (!node) return null;

        if (value < node.data) {
            node.left = this._remove(node.left,value);
        } else if (value > node.data) {
            node.right = this._remove(node.right,value);
        } else {
            if (!node.left && !node.right) {
                return null;
            } else if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            }
            const min = this.getMin(node.right);
            node.data = min;
            node.right = this._remove(node.right,min);
        }
        node.height = this._update(node);
        const bf = this._balanceFactor(node);

        if (bf > 1 && this._balanceFactor(node.left) >= 0) {
            return this._rightRotate(node); 
        }
        if (bf > 1 && this._balanceFactor(node.left) < 0) {
            node.left = this._leftRotate(node.left);
            return this._rightRotate(node);
        }
        if (bf < -1 && this._balanceFactor(node.right) <= 0) {
            return this._leftRotate(node); 
        }
        if (bf < -1 && this._balanceFactor(node.right) > 0) {
            node.right = this._rightRotate(node.right);
            return this._leftRotate(node);
        }
        return node;
    }

    //Public Helpers
    getMin(node) {
        if (!node) return null
        while (node.left) {
            node = node.left;
        }
        return node.data;
    }
    getMax(node = this.root) {
        if (!node) return null;
        while (node.right) {
            node = node.right;
        }
        return node.data;
    }
    insert(value) {
        this.root = this._insert(this.root,value);
    }
    remove(value) {
        this.root = this._remove(this.root,value);
    }
    search(value) {
        let node = this.root;
        while (node) {
            if (node.data === value) return node;
            node = value > node.data ? node.right : node.left; 
        }
        return null;
    }

    level_order() {
    if (!this.root) return;
    const q = new Queue(1000);
    let out = '';
    q.enqueue(this.root);

    while (!q.isEmpty()) {
      const level = q.getSize();
      for (let i = 0; i < level; ++i) {
        const node = q.dequeue();
        out += node.data + ' ';
        if (node.left) q.enqueue(node.left);
        if (node.right) q.enqueue(node.right);
      }
    }
    console.log(out);
  }

}
let avl = new AVL();
avl.insert(30);
avl.insert(10);
avl.insert(20);


avl.level_order()


