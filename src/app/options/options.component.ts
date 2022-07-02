import { Component } from '@angular/core';
import { Placeable, SettingsService } from '../settings.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent {
  placeables: Placeable[] = [
    new Placeable('wall', 'Wall', 'black'),
    new Placeable('empty', 'Empty', 'white'),
    new Placeable('start', 'Start', 'green'),
    new Placeable('end', 'End', 'red'),
  ]
  selectedOption: Placeable = this.placeables[0];

  constructor(private settingsService: SettingsService){
    settingsService.setSelectedPlaceable(this.selectedOption);
  }

  onPlaceableChange(){
    this.settingsService.setSelectedPlaceable(this.selectedOption);
  }
}
