import { Injectable } from '@angular/core';
import { FieldsService } from './fields.service';
import { FieldColor } from './utils/constants/field-color';
import { Field } from './utils/model/field';

@Injectable({
  providedIn: 'root'
})
export class MazeService {
  constructor(private fieldsService: FieldsService) { }

  // randomized prim's algorithm
  generateMaze(){
    this.fieldsService.removeWalls()
    const start: Field | null = this.fieldsService.findField(e => e.getColor() == FieldColor.START);
    const end: Field | null = this.fieldsService.findField(e => e.getColor() == FieldColor.START);
    if(start == null || end == null) return;

    const maze: Field[] = [start];
    let open: Field[] = [...this.fieldsService.getNeighbours(start)]
    while(open.length > 0){
      const current = open[Math.floor(Math.random() * open.length)];
      if(this.fieldsService.getNeighbours(current).filter(e => maze.includes(e)).length == 1){
        maze.push(current);
      open.push(...this.fieldsService.getNeighbours(current).filter(e => !maze.includes(e)));
      }
      open = open.filter(e => e != current);
    }

    
    for(let row of this.fieldsService.fields){
      for(let field of row){
        if(!maze.includes(field)) this.fieldsService.setField(field.x, field.y, FieldColor.WALL);
      }
    }
  }
}
