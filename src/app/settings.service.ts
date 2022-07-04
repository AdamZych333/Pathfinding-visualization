import { Injectable } from '@angular/core';
import { BlockService } from './block.service';
import { RepainterService } from './repainter.service';
import { Algorithm } from './utils/constants/algorithms';
import { FieldColor } from './utils/constants/field-color';
import { Block, Option } from './utils/model/selector-options';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  algorithms: Option[] = [
    {value: Algorithm.ASTAR, viewValue: 'A*'},
    {value: Algorithm.BFS, viewValue: 'BFS'},
    {value: Algorithm.DFS, viewValue: 'DFS'},
    {value: Algorithm.DIJKSTRA, viewValue: 'Dijkstra'},
  ];

  prevSelectedPlaceable: Block | null = null;
  selectedPlaceable: Block;
  selectedAlgorithm: Option = this.algorithms[0];

  constructor(private repainter: RepainterService, blockService: BlockService) {
    this.selectedPlaceable = blockService.getPlaceables()[0];
   }

  setSelectedPlaceable(selectedPlaceable: Block){
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

  getAlgorithmsOptions(){
    return this.algorithms;
  }

  getSelectedAlgorithm(){
    return this.selectedAlgorithm;
  }

  setSelectedAlgorithm(selectedAlgorithm: Option){
    this.selectedAlgorithm = selectedAlgorithm;
  }

  setAlgorithmDelay(delay: number){
    this.repainter.changeDelay(delay);
  }

  // setPlaceableByColor(color: FieldColor){
  //   const placeable = this.placeables.find(p => p.type == color);
  //   if(placeable != undefined)
  //     this.selectedPlaceable = placeable;
  // }
}
