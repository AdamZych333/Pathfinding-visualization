import { Injectable } from '@angular/core';
import { FieldColor } from './utils/constants/field-color';
import { Block } from './utils/model/selector-options';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  blocks: Block[] = [
    new Block('wall', 'Wall', FieldColor.WALL),
    new Block('empty', 'Empty', FieldColor.EMPTY),
    new Block('start', 'Start', FieldColor.START),
    new Block('end', 'End', FieldColor.END),
    new Block('open', 'To be visited', FieldColor.OPEN),
    new Block('closed', 'Visited', FieldColor.CLOSED),
    new Block('path', 'Path', FieldColor.PATH),
  ]

  getPlaceables(){
    return this.blocks.filter(b => b.value == 'wall' || b.value == 'empty' || b.value == 'start' || b.value == 'end');
  }

  getBlockByColor(color: FieldColor){
    return this.blocks.find(b => b.type === color);
  }

  getBlockByValue(value: string){
    return this.blocks.find(b => b.value === value);
  }

  constructor() { }
}
