import { FieldColor } from "../constants/field-color";
import { Grid } from "../model/grid";
import { Node } from "../model/node";

export function astar(grid: Grid, startNode: Node, endNode: Node): Node[]{
    console.log("astar");
    let open: Node[] = [];
    let closed: Node[] = [];
    startNode.gCost = 0;
    startNode.hCost = startNode.getDistance(endNode);
    open.push(startNode);

    while(open.length > 0){
        const currentNode: Node = open.reduce((prev, curr) => {
            return prev.getFCost() < curr.getFCost() || prev.getFCost() === curr.getFCost() && prev.gCost < curr.gCost? prev: curr;
        });

        open = open.filter(node => node != currentNode);
        closed.push(currentNode);
        grid.repaintField(currentNode, FieldColor.CLOSED);

        if(currentNode == endNode) return currentNode.retecePath(startNode);

        for(let neighbour of grid.getNeighbours(currentNode)){
            if(!neighbour.walkable || closed.includes(neighbour)) continue;

            const newNeighbourCost: number = currentNode.gCost + currentNode.getDistance(neighbour);
            const isNotInOpen: boolean = !open.includes(neighbour);
            if(newNeighbourCost < neighbour.gCost || isNotInOpen){
                neighbour.gCost = newNeighbourCost;
                neighbour.hCost = neighbour.getDistance(endNode);
                neighbour.parent = currentNode;

                if(isNotInOpen){
                    open.push(neighbour);
                    grid.repaintField(neighbour, FieldColor.OPEN);
                }
            }
        }    
    }

    return [];
}