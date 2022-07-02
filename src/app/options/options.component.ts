import { Component } from '@angular/core';
import { FieldsService } from '../fields.service';
import { Color, Placeable, SettingsService } from '../settings.service';

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
  selectedOption: Placeable = this.placeables[0];

  constructor(private settingsService: SettingsService, private fieldsService: FieldsService){
    settingsService.setSelectedPlaceable(this.selectedOption);
  }

  onPlaceableChange(){
    this.settingsService.setSelectedPlaceable(this.selectedOption);
  }

  onClearClick(){
    this.fieldsService.createBoard();
  }
}
