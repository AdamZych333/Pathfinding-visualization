import { Component } from '@angular/core';
import { AlgorithmsService } from '../algorithms.service';
import { FieldsService } from '../fields.service';
import { SettingsService } from '../settings.service';
import { Option, Placeable } from '../utils/selector-options';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent {
  selectedPlaceable: Placeable;
  selectedAlgorithm: Option;
  algorithms: Option[];
  placeables: Placeable[];

  constructor(private settingsService: SettingsService, private fieldsService: FieldsService, private algorithmsService: AlgorithmsService){
    this.selectedPlaceable = settingsService.getSelectedPlaceable();
    this.selectedAlgorithm = settingsService.getSelectedAlgorithm();
    this.algorithms = settingsService.getAlgorithmsOptions();
    this.placeables = settingsService.getPlaceablesOptions();
  }

  onPlaceableChange(){
    this.settingsService.setSelectedPlaceable(this.selectedPlaceable);
  }

  onClearClick(){
    this.fieldsService.createBoard();
  }

  onStartClick(){
    this.algorithmsService.startAlgorithm(this.selectedAlgorithm.value);
  }

  onAlgorithmChange(){
    this.settingsService.setSelectedAlgorithm(this.selectedAlgorithm);
  }
}
