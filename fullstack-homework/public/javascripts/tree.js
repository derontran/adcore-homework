class Tree { 
    constructor() {
        let nodeData = { 
            id: '0',
            name: 'dummy node',
            description: 'dummy description',
            parent: null, 
            read_only: '0',
            children: []
        };
        this.root = nodeData; 
    }
    
    addNode(node, parent) {
        // Find the parent
        let p = this.findNodeById(parent)
        if (p !== null) {
            // let newNode = new Node(data)
            // newNode -> has no [] 
            // newNode.parent = parent;
            p.children.push(node)
            return node; 
        }
        return null;
    }

    findNodeById(id) {
        const queue = [this.root]
        while (queue.length !== 0) {
            let length = queue.length; 
            for (let i = 0 ; i < length ; i++) {
                const node = queue.shift() 
                if (node.id === id) {
                    return node;
                }
                for (let child of node.children) {
                    queue.push(child)
                }
            }
        }
        return null;
    }

    /**
     *  when deleting a node, we will remove all its children as well.
     * @param {*} id 
     */
    deleteNode(id) {
        /***
         * 
         *                  1  
         *          2       3       4 
         *      5 
         *   6
         *   [1] => children [2,3,4]
         *   [2] => childeren [5]
         * parent2.children.remove(5)
         */
        let node = this.findNodeById(id)
        let parentId = node.parent; 
        if (node.read_only === '1' || parentId === null ) {
            return false;
        }
        
        let parent = this.findNodeById(parentId)
        parent.children = parent.children.filter(e => e.id !== id)
        return true;
    }

    updateNode(id, name) {
        let node = this.findNodeById(id); 
        if (node.read_only === '1') {
            return false;
        }
        node.name = name;
        return true;
    }

    convertToJson() {
        const result = []
        const queue = [this.root]
        // BFS
        while (queue.length !== 0) {
            let length = queue.length; 
            for (let i = 0 ; i < length ; ++i) {
                const node = queue.shift() 
                let arr = []
                for (let child of node.children) {
                    result.push(child)
                    queue.push(child)
                }
                
            }
        }
        return result;
    }

}

module.exports = {
    Tree
}