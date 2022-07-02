import { Component } from '@angular/core';
import { Color, FieldsService } from '../fields.service';
import { Placeable, SettingsService } from '../settings.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent {
  placeables: Placeable[] = [
    new Placeable('wall', 'Wall', Color.WALL),
    new Placeable('empty', 'Empty', Color.EMPTY),
    new Placeable('start', 'Start', Color.START),
    new Placeable('end', 'End', Color.END),
  ]
  algorithms: string[] = [
    'A*',
    'BFS',
    'DFS',
    'Dijkstra'
  ]
  selectedPlaceable: Placeable = this.placeables[0];
  selectedAlgorithm: string = this.algorithms[0];

  constructor(private settingsService: SettingsService, private fieldsService: FieldsService){
    settingsService.setSelectedPlaceable(this.selectedPlaceable);
  }

  onPlaceableChange(){
    this.settingsService.setSelectedPlaceable(this.selectedPlaceable);
  }

  onClearClick(){
    this.fieldsService.createBoard();
  }
}
