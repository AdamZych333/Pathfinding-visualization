import { Injectable } from '@angular/core';
import { FieldsService } from './fields.service';
import { RepainterService } from './repainter.service';
import { Algorithm } from './utils/algorithms';
import { astar } from './utils/algorithms/A-star';
import { bfs } from './utils/algorithms/bfs';
import { dfs } from './utils/algorithms/dfs';
import { dijkstra } from './utils/algorithms/dijkstra';
import { Field } from './utils/field';
import { FieldColor } from './utils/field-color';
import { Grid } from './utils/grid';
import { Node } from './utils/node';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {
  constructor(private fieldService: FieldsService, private repainter: RepainterService) {}

  startAlgorithm(name: string){ 
    this.restartPaint();
    const startField: {x: number; y: number} | null = this.fieldService.findField(e => e.getColor() == FieldColor.START);
    const endField: {x: number; y: number} | null = this.fieldService.findField(e => e.getColor() == FieldColor.END);
    if(startField == null || endField == null) return;
    const grid = new Grid(this.fieldService, this.repainter);
    const startNode: Node = grid.nodes[startField.x][startField.y];
    const endNode: Node = grid.nodes[endField.x][endField.y];
    let path: Node[] = [];
    switch(name){
      case Algorithm.ASTAR:
        path = astar(grid, startNode, endNode);
        break;
      case Algorithm.BFS:
        bfs();
        break;
      case Algorithm.DFS:
        dfs();
        break;
      case Algorithm.DIJKSTRA:
        dijkstra();
        break;
    }

    this.paintPath(path);
  }

  private paintPath(path: Node[]){
    for(let node of path){
      this.repainter.addToQueue({x: node.x, y: node.y, color: FieldColor.PATH});
    }
  }

  private restartPaint(){
    for(let i = 0; i < this.fieldService.getFields().length; i++){
      for(let j = 0; j < this.fieldService.getFields()[i].length; j++){
        let field: Field = this.fieldService.getField(i, j);
        if(field.getColor() !== FieldColor.WALL && field.getColor() !== FieldColor.START && field.getColor() !== FieldColor.END){
          this.fieldService.setField(i, j, FieldColor.EMPTY);
        }
      }
    }
  }

}
