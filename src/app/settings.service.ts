import { Injectable } from '@angular/core';
import { Placeable } from './utils/selector-options';

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
