import { Injectable } from '@angular/core';
import { FieldsService } from './fields.service';
import { RepainterService } from './repainter.service';
import { Algorithm } from './utils/constants/algorithms';
import { bfs } from './utils/algorithms/bfs';
import { dfs } from './utils/algorithms/dfs';
import { dijkstra } from './utils/algorithms/dijkstra';
import { Field } from './utils/model/field';
import { FieldColor } from './utils/constants/field-color';
import { Option } from './utils/model/selector-options';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {
  algorithms: Option[] = [
    {value: Algorithm.ASTAR, viewValue: 'A*'},
    {value: Algorithm.BFS, viewValue: 'BFS'},
    {value: Algorithm.DFS, viewValue: 'DFS'},
    {value: Algorithm.DIJKSTRA, viewValue: 'Dijkstra'},
  ];

  constructor(private fieldService: FieldsService, private repainter: RepainterService) {}

  startAlgorithm(name: string){ 
    this.fieldService.clearBoard()
    const startField: Field | null = this.fieldService.findField(e => e.getColor() == FieldColor.START);
    const endField: Field | null = this.fieldService.findField(e => e.getColor() == FieldColor.END);
    if(startField == null || endField == null) return;
    let path: Field[] = [];
    switch(name){
      case Algorithm.ASTAR:
        path = this.astar(startField, endField);
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

  private paintPath(path: Field[]){
    for(let field of path){
      this.repainter.addToQueue({x: field.x, y: field.y, color: FieldColor.PATH});
    }
  }

  private astar(start: Field, end: Field): Field[]{
    console.log("astar");
    let open: Field[] = [];
    let closed: Field[] = [];
    start.gCost = 0;
    start.hCost = start.getDistance(end);
    open.push(start);

    while(open.length > 0){
      const current: Field = open.reduce((prev, curr) => {
          return prev.getFCost() < curr.getFCost() || prev.getFCost() === curr.getFCost() && prev.gCost < curr.gCost? prev: curr;
      });


      open = open.filter(f => f != current);
      closed.push(current);
      this.repainter.addToQueue({x: current.x, y: current.y, color: FieldColor.CLOSED});

      if(current == end) return current.retecePath(start);

      for(let neighbour of this.fieldService.getNeighbours(current)){
        if(!neighbour.isWalkable() || closed.includes(neighbour)) continue;

        const newNeighbourCost: number = current.gCost + current.getDistance(neighbour);
        const isNotInOpen: boolean = !open.includes(neighbour);
        if(newNeighbourCost < neighbour.gCost || isNotInOpen){
          neighbour.gCost = newNeighbourCost;
          neighbour.hCost = neighbour.getDistance(end);
          neighbour.parent = current;

          if(isNotInOpen){
            console.log(neighbour)
            open.push(neighbour);
            this.repainter.addToQueue({x: neighbour.x, y: neighbour.y, color: FieldColor.OPEN});
          }
        }
      }    
  }

  return [];
}
}
