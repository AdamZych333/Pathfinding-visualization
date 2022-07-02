import { Injectable } from '@angular/core';

interface Option {
  value: string;
  viewValue: string;
}

export class Placeable implements Option{
  value: string;
  viewValue: string;
  color: string;
  constructor(value: string, viewValue: string, color: string){
    this.value = value;
    this.viewValue = viewValue;
    this.color = color;
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
