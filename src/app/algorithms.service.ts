import { Injectable } from '@angular/core';
import { FieldsService } from './fields.service';
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
  delay: number = 0;
  toAnimate: {field: Field, color: FieldColor}[] = [];
  running: boolean = false;
  finnished: boolean = false;

  constructor(private fieldService: FieldsService) {}

  startAlgorithm(name: string){
    this.running = true;
    this.toAnimate = [];
    this.fieldService.clearBoard();
    const startField: Field | null = this.fieldService.findField(e => e.getColor() == FieldColor.START);
    const endField: Field | null = this.fieldService.findField(e => e.getColor() == FieldColor.END);
    if(startField == null || endField == null) return;
    switch(name){
      case Algorithm.ASTAR:
        this.toAnimate = this.astar(startField, endField);
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
    
    console.log(this.finnished)
    this.finnished? this.animateMovesImmidietly(): this.animateMoves();    
  }

  resetAlgorithm(){
    this.toAnimate = [];
    this.fieldService.clearBoard();
    this.running = false;
    this.finnished = false;
  }

  private animateMoves(){
    setTimeout(() => {
      const move = this.toAnimate[0];
      this.toAnimate = this.toAnimate.filter(e => e != move);
      if(move == undefined) return;
      this.fieldService.setField(move.field.x, move.field.y, move.color);
      if(this.toAnimate.length > 0)
        this.animateMoves();
      else{
        this.running = false;
        this.finnished = true;
      }
    }, this.delay);
  }

  private animateMovesImmidietly(){
    for(let move of this.toAnimate){
      this.fieldService.setField(move.field.x, move.field.y, move.color);
    }
    this.running = false;
  }

  astar(start: Field, end: Field): {field: Field, color: FieldColor}[]{
    const toAnimate: {field: Field, color: FieldColor}[] = [];
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
      toAnimate.push({field: current, color: FieldColor.CLOSED});

      if(current == end){
        this.fieldService.retecePath(current, start).forEach(e => {
          toAnimate.push({field: e, color: FieldColor.PATH});
        });
        return toAnimate;
      } 

      for(let neighbour of this.fieldService.getNeighbours(current)){
        if(!neighbour.isWalkable() || closed.includes(neighbour)) continue;

        const newNeighbourCost: number = current.gCost + current.getDistance(neighbour);
        const isNotInOpen: boolean = !open.includes(neighbour);
        if(newNeighbourCost < neighbour.gCost || isNotInOpen){
          neighbour.gCost = newNeighbourCost;
          neighbour.hCost = neighbour.getDistance(end);
          neighbour.parent = current;

          if(isNotInOpen){
            open.push(neighbour);
            toAnimate.push({field: neighbour, color: FieldColor.OPEN});
          }
        }
      }    
    }
    return toAnimate;
  }
}
