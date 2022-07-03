import { Component } from '@angular/core';
import { FieldsService } from '../fields.service';
import { SettingsService } from '../settings.service';
import { Algorithm } from '../utils/algorithms';
import { FieldColor } from '../utils/field-color';
import { Option, Placeable } from '../utils/selector-options';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent {
  placeables: Placeable[] = [
    new Placeable('wall', 'Wall', FieldColor.WALL),
    new Placeable('empty', 'Empty', FieldColor.EMPTY),
    new Placeable('start', 'Start', FieldColor.START),
    new Placeable('end', 'End', FieldColor.END),
  ]
  algorithms: Option[] = [
    {value: 'A*', viewValue: Algorithm.ASTAR},
    {value: 'bfs', viewValue: Algorithm.BFS},
    {value: 'dfs', viewValue: Algorithm.DFS},
    {value: 'dijkstra', viewValue: Algorithm.DIJKSTRA},
  ];

  selectedPlaceable: Placeable = this.placeables[0];
  selectedAlgorithm: Option = this.algorithms[0];

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
