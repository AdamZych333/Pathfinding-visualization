import { Injectable } from '@angular/core';
import { RepainterService } from './repainter.service';
import { Algorithm } from './utils/algorithms';
import { FieldColor } from './utils/field-color';
import { Placeable, Option } from './utils/selector-options';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  placeables: Placeable[] = [
    new Placeable('wall', 'Wall', FieldColor.WALL),
    new Placeable('empty', 'Empty', FieldColor.EMPTY),
    new Placeable('start', 'Start', FieldColor.START),
    new Placeable('end', 'End', FieldColor.END),
  ]
  algorithms: Option[] = [
    {value: Algorithm.ASTAR, viewValue: 'A*'},
    {value: Algorithm.BFS, viewValue: 'BFS'},
    {value: Algorithm.DFS, viewValue: 'DFS'},
    {value: Algorithm.DIJKSTRA, viewValue: 'Dijkstra'},
  ];

  prevSelectedPlaceable: Placeable | null = null;
  selectedPlaceable: Placeable = this.placeables[0];
  selectedAlgorithm: Option = this.algorithms[0];

  constructor(private repainter: RepainterService) { }

  setSelectedPlaceable(selectedPlaceable: Placeable){
    this.prevSelectedPlaceable = this.selectedPlaceable;
    this.selectedPlaceable = selectedPlaceable;
  }

  rollBackSelectedPlaceable(){
    if(this.prevSelectedPlaceable != null){
      this.selectedPlaceable = this.prevSelectedPlaceable;
      this.prevSelectedPlaceable = null;
    }
  }

  getSelectedPlaceable(){
    return this.selectedPlaceable;
  }

  getPlaceablesOptions(){
    return this.placeables;
  }

  getAlgorithmsOptions(){
    return this.algorithms;
  }

  getSelectedAlgorithm(){
    return this.selectedAlgorithm;
  }

  setSelectedAlgorithm(selectedAlgorithm: Option){
    this.selectedAlgorithm = selectedAlgorithm;
  }

  getPlaceableByColor(color: FieldColor){
    return this.placeables.find(p => p.type === color);
  }

  setAlgorithmDelay(delay: number){
    this.repainter.changeDelay(delay);
  }

  setPlaceableByColor(color: FieldColor){
    const placeable = this.placeables.find(p => p.type == color);
    if(placeable != undefined)
      this.selectedPlaceable = placeable;
  }
}
