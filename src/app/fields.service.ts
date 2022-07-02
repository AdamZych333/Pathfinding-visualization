import { Injectable } from '@angular/core';
import { Color } from './settings.service';

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
        this.fields[i][j] = Color.EMPTY;
      }
    }
    this.fields[0][0] = Color.START;
    this.fields[this.HEIGHT-1][this.WIDTH-1] = Color.END;
  }

  getFields(): string[][]{
    return this.fields;
  }

  getField(x: number, y: number){
    return this.fields[x][y];
  }

  setField(x: number, y: number, color: string){
    if(this.fields[x][y] == Color.START || this.fields[x][y] == Color.END) return;
    if(color === Color.START){
      const start = this.findField(e => e == Color.START);
      if(start !== null) this.fields[start.x][start.y] = Color.EMPTY;
    }
    else if(color === Color.END){
      const end = this.findField(e => e == Color.END);
      if(end !== null) this.fields[end.x][end.y] = Color.EMPTY;
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
