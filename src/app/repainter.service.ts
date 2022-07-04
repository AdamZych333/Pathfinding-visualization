import { Injectable } from '@angular/core';
import { FieldsService } from './fields.service';
import { FieldColor } from './utils/constants/field-color';

interface Action{
  x: number, y: number, color: FieldColor
}

@Injectable({
  providedIn: 'root'
})
export class RepainterService {
  delay: number = 0;
  queue: Action[];
  timer: ReturnType<typeof setTimeout> = setTimeout(() => this.repaintFromQueue(), this.delay);


  constructor(private fieldsService: FieldsService) {
    this.queue = [];
  }

  restart(){
    this.queue = [];
    this.startTimer()
  }

  addToQueue(next: Action){
      this.queue.push(next);
  }

  stopTimer(){
    clearTimeout(this.timer);
  }

  startTimer(){
    this.timer = setTimeout(() => this.repaintFromQueue(), this.delay);
  }

  changeDelay(delay: number){
    this.delay = delay;
  }

  private repaintFromQueue(){
    if(this.queue.length === 0) {
      this.startTimer()
      return;
    }
    const action = this.queue[0];
    this.queue = this.queue.filter(e => e != action);
    this.fieldsService.setField(action.x, action.y, action.color);
  
    this.startTimer()
  }
}
