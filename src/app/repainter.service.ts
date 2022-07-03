import { Injectable } from '@angular/core';
import { FieldsService } from './fields.service';
import { FieldColor } from './utils/field-color';

interface Action{
  x: number, y: number, color: FieldColor
}

@Injectable({
  providedIn: 'root'
})
export class RepainterService {
  DELAY: number = 10;
  queue: Action[] = [];

  constructor(private fieldsService: FieldsService) {
      setInterval(() => this.repaintFromQueue(), this.DELAY);
      this.restart();
  }

  restart(){
    this.queue = [];
  }

  addToQueue(next: Action){
      this.queue.push(next);
  }

  private repaintFromQueue(){
      if(this.queue.length === 0) return;
      const action = this.queue[0];
      this.queue = this.queue.filter(e => e != action);

      this.fieldsService.setField(action.x, action.y, action.color);
  }
}
