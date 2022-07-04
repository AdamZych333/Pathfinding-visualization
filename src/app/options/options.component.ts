import { Component } from '@angular/core';
import { AlgorithmsService } from '../algorithms.service';
import { BlockService } from '../block.service';
import { FieldsService } from '../fields.service';
import { RepainterService } from '../repainter.service';
import { SettingsService } from '../settings.service';
import { Option, Block } from '../utils/model/selector-options';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent {
  selectedAlgorithm: Option;
  algorithms: Option[];
  placeables: Block[];
  maxSliderValue: number = 100;

  constructor(public settingsService: SettingsService, private fieldsService: FieldsService, private algorithmsService: AlgorithmsService, private repainter: RepainterService, blockService: BlockService){
    this.selectedAlgorithm = settingsService.getSelectedAlgorithm();
    this.algorithms = algorithmsService.algorithms;
    this.placeables = blockService.getPlaceables();
  }

  onClearClick(){
    this.fieldsService.createBoard();
    this.repainter.restart();
  }

  onStartClick(){
    this.algorithmsService.startAlgorithm(this.selectedAlgorithm.value);
  }

  onAlgorithmChange(){
    this.settingsService.setSelectedAlgorithm(this.selectedAlgorithm);
  }

  onSliderChange(event: any){
    this.settingsService.setAlgorithmDelay(this.maxSliderValue - event.value);
  }
}
