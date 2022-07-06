import { Component } from '@angular/core';
import { AlgorithmsService } from '../algorithms.service';
import { BlockService } from '../block.service';
import { FieldsService } from '../fields.service';
import { MazeService } from '../maze.service';
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

  constructor(private mazeService: MazeService, public settingsService: SettingsService, private fieldsService: FieldsService, public algorithmsService: AlgorithmsService, blockService: BlockService){
    this.selectedAlgorithm = settingsService.getSelectedAlgorithm();
    this.algorithms = algorithmsService.algorithms;
    this.placeables = blockService.getPlaceables();
  }

  onClearClick(){
    this.algorithmsService.resetAlgorithm();
    this.fieldsService.clearBoard();
  }

  onStartClick(){
    this.algorithmsService.startAlgorithm(this.selectedAlgorithm.value);
  }

  onStopClick(){
    this.algorithmsService.startAlgorithm(this.selectedAlgorithm.value);
  }

  onResetClick(){
    this.algorithmsService.resetAlgorithm();
    this.fieldsService.createBoard();
  }

  onAlgorithmChange(){
    this.settingsService.setSelectedAlgorithm(this.selectedAlgorithm);
    if(this.algorithmsService.finnished)
      this.algorithmsService.startAlgorithm(this.selectedAlgorithm.value);
  }

  onSliderChange(event: any){
    this.algorithmsService.delay = 2*(this.maxSliderValue - event.value);
  }

  onGenerateMazeClick(){
    if(!this.algorithmsService.running)
      this.mazeService.generateMaze()
  }
}
