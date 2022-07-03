export class Node{
    walkable: boolean;
    x: number;
    y: number;
    gCost: number = Number.MAX_SAFE_INTEGER;
    hCost: number = Number.MAX_SAFE_INTEGER;
    parent: Node | null = null;

    constructor(x: number, y: number, walkable: boolean){
        this.x = x;
        this.y= y;
        this.walkable = walkable;
    }

    getFCost(){
        return this.gCost + this.hCost;
    }

    getDistance(nodeB: Node){
        return Math.abs(this.x - nodeB.x) + Math.abs(this.y - nodeB.y);
    }

    retecePath(startNode: Node){
        const path: Node[] = [];
        let currentNode: Node = this;

        while(currentNode != startNode){
            path.push(currentNode);
            if(currentNode.parent == null) return [];
            currentNode = currentNode.parent;
        }

        return path.reverse();
    }
}