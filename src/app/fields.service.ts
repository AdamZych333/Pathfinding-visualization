import { Injectable } from '@angular/core';
import { FieldColor } from './utils/field-color';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  readonly WIDTH: number = 70;
  readonly HEIGHT: number = 35;
  fields: string[][] = [];

  constructor() { 
    this.createBoard()
  }

  createBoard(){
    for(let i = 0; i < this.HEIGHT; i++){
      this.fields[i] = [];
      for(let j = 0; j < this.WIDTH; j++){
        this.fields[i][j] = FieldColor.EMPTY;
      }
    }
    this.fields[0][0] = FieldColor.START;
    this.fields[this.HEIGHT-1][this.WIDTH-1] = FieldColor.END;
  }

  getFields(): string[][]{
    return this.fields;
  }

  getField(x: number, y: number){
    return this.fields[x][y];
  }

  setField(x: number, y: number, color: string){
    if(this.fields[x][y] == FieldColor.START || this.fields[x][y] == FieldColor.END) return;
    if(color === FieldColor.START){
      const start = this.findField(e => e == FieldColor.START);
      if(start !== null) this.fields[start.x][start.y] = FieldColor.EMPTY;
    }
    else if(color === FieldColor.END){
      const end = this.findField(e => e == FieldColor.END);
      if(end !== null) this.fields[end.x][end.y] = FieldColor.EMPTY;
    }
    this.fields[x][y] = color;
  }

  findField(condition: (field: string) => boolean){
    for(let i = 0; i < this.HEIGHT; i++){
      for(let j = 0; j < this.WIDTH; j++){
        if(condition(this.fields[i][j])) return {x: i, y: j};
      }
    }
    return null;
  }
}
