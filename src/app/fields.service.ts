import { Injectable } from '@angular/core';
import { Field } from './utils/model/field';
import { FieldColor } from './utils/constants/field-color';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  readonly WIDTH: number = 55;
  readonly HEIGHT: number = 25;
  fields: Field[][] = [];

  constructor() { 
    this.createBoard()
  }

  createBoard(){
    for(let i = 0; i < this.HEIGHT; i++){
      this.fields[i] = [];
      for(let j = 0; j < this.WIDTH; j++){
        this.fields[i][j] = new Field(i, j);
      }
    }
    this.fields[0][0].setColor(FieldColor.START);
    this.fields[this.HEIGHT-1][this.WIDTH-1].setColor(FieldColor.END);
  }

  getFields(): Field[][]{
    return this.fields;
  }

  getField(x: number, y: number){
    return this.fields[x][y];
  }

  setField(x: number, y: number, color: FieldColor){
    if(this.fields[x][y].getColor() == FieldColor.START || this.fields[x][y].getColor() == FieldColor.END) return;
    if(color === FieldColor.START || color === FieldColor.END){
      const start = this.findField(e => e.getColor() == color);
      if(start !== null) this.fields[start.x][start.y].setColor(FieldColor.EMPTY);
    }
    this.fields[x][y].setColor(color);
  }

  findField(condition: (field: Field) => boolean){
    for(let i = 0; i < this.HEIGHT; i++){
      for(let j = 0; j < this.WIDTH; j++){
        if(condition(this.fields[i][j])) return this.fields[i][j];
      }
    }
    return null;
  }

  clearBoard(){
    for(let i = 0; i < this.HEIGHT; i++){
      for(let j = 0; j < this.WIDTH; j++){
        const field: Field = this.fields[i][j];
        if(field.getColor() === FieldColor.CLOSED || field.getColor() === FieldColor.OPEN || field.getColor() === FieldColor.PATH)
          field.setColor(FieldColor.EMPTY);
      }
    }
  }

  getNeighbours(field: Field): Field[] {
    let neighbours: Field[] = [];
    const x = [1, -1, 0, 0];
    const y = [0, 0, 1, -1];

    for(let i = 0; i < x.length; i++){
        const neighbourX = field.x + x[i];
        const neighbourY = field.y + y[i];
        if(neighbourX >= 0 && neighbourX < this.HEIGHT && neighbourY >= 0 && neighbourY < this.WIDTH){
            neighbours.push(this.fields[neighbourX][neighbourY])
        }
    }

    return neighbours;
  }

  retecePath(current: Field, startField: Field){
    const path: Field[] = [];

    while(current != startField){
        path.push(current);
        if(current.parent == null) return [];
        current = current.parent;
    }

    return path.reverse();
}
}
