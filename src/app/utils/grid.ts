import { Action } from "rxjs/internal/scheduler/Action";
import { FieldsService } from "../fields.service";
import { RepainterService } from "../repainter.service";
import { FieldColor } from "./field-color";
import { Node } from "./node";

export class Grid{
    nodes: Node[][] = [];
    private gridWidth: number = 0;
    private gridHeight: number = 0;
    fieldsService: FieldsService;
    repainter: RepainterService;

    constructor(fieldsService: FieldsService, repainter: RepainterService){
        this.fieldsService = fieldsService;
        this.repainter = repainter;
        this.createGrid();
    }

    createGrid(){
        this.nodes = []
        this.gridWidth = this.fieldsService.getFields().length;
        this.gridHeight = this.fieldsService.getFields()[0].length;
        for(let i = 0; i < this.gridWidth; i++){
          this.nodes.push([]);
          for(let j = 0; j < this.gridHeight; j++){
            const walkable = this.fieldsService.getField(i, j).getColor() !== FieldColor.WALL
            this.nodes[i].push(new Node(i, j, walkable));
          }
        }
    }

    getNeighbours(node: Node): Node[] {
        let neighbours: Node[] = [];
        const x = [1, -1, 0, 0];
        const y = [0, 0, 1, -1];
        
        for(let i = 0; i < x.length; i++){
            const neighbourX = node.x + x[i];
            const neighbourY = node.y + y[i];
            if(neighbourX >= 0 && neighbourX < this.gridWidth && neighbourY >= 0 && neighbourY < this.gridHeight){
                neighbours.push(this.nodes[neighbourX][neighbourY])
            }
        }

        return neighbours;
    }

    repaintField(node: Node, color: FieldColor){
        this.repainter.addToQueue({x: node.x, y: node.y, color: color});
    }
}