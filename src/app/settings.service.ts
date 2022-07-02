import { Injectable } from '@angular/core';

export const enum Color{
  WALL = 'hsla(0, 0%, 30%, 1)',
  EMPTY = 'white',
  START = 'green',
  END = 'red',
}

interface Option {
  value: string;
  viewValue: string;
}

export class Placeable implements Option{
  value: string;
  viewValue: string;
  type: string;
  constructor(value: string, viewValue: string, type: string){
    this.value = value;
    this.viewValue = viewValue;
    this.type = type;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  selectedPlaceable: Placeable | null = null;

  constructor() { }

  setSelectedPlaceable(selectedPlaceable: Placeable){
    this.selectedPlaceable = selectedPlaceable;
  }

  getSelectedPlaceable(){
    return this.selectedPlaceable;
  }
}
