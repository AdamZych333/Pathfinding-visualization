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
    if(color === FieldColor.START){
      const start = this.findField(e => e.getColor() == FieldColor.START);
      if(start !== null) this.fields[start.x][start.y].setColor(FieldColor.EMPTY);
    }
    else if(color === FieldColor.END){
      const end = this.findField(e => e.getColor() == FieldColor.END);
      if(end !== null) this.fields[end.x][end.y].setColor(FieldColor.EMPTY);
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
}
