import { Injectable } from '@angular/core';
import { AlgorithmsService } from './algorithms.service';
import { BlockService } from './block.service';
import { Block, Option } from './utils/model/selector-options';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  prevSelectedPlaceable: Block | null = null;
  selectedPlaceable: Block;
  selectedAlgorithm: Option;

  constructor(blockService: BlockService, algorithmsSerive: AlgorithmsService) {
    this.selectedPlaceable = blockService.getPlaceables()[0];
    this.selectedAlgorithm = algorithmsSerive.algorithms[0];
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

  getSelectedAlgorithm(){
    return this.selectedAlgorithm;
  }

  setSelectedAlgorithm(selectedAlgorithm: Option){
    this.selectedAlgorithm = selectedAlgorithm;
  }
}
