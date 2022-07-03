import { Component } from '@angular/core';
import { FieldsService } from '../fields.service';
import { SettingsService } from '../settings.service';
import { FieldColor } from '../utils/field-color';
import { Placeable } from '../utils/selector-options';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent {  
  fields: string[][] = [];
  prevPlaceable: Placeable | null = null;

  constructor(private settingsService: SettingsService, private fieldsService: FieldsService) {
    this.fields = fieldsService.getFields();
  }

  onMouseEnter(event:any, x: number, y: number){
    if(event.which !== 1) return;
    const selectedOption = this.settingsService.getSelectedPlaceable();
    const type = selectedOption != null? selectedOption.type: '';
    if(type != undefined)
      this.fieldsService.setField(x, y, type);
  }

  onMouseDown(event:any, x: number, y: number){
    this.onMouseEnter(event, x, y);
    this.prevPlaceable = this.settingsService.getSelectedPlaceable();
    if(this.fieldsService.getField(x, y) === FieldColor.END){
      const placeable = this.settingsService.getPlaceableByColor(FieldColor.END);
      if(placeable != undefined)
        this.settingsService.setSelectedPlaceable(placeable)
    }
    else if(this.fieldsService.getField(x, y) === FieldColor.START){
      const placeable = this.settingsService.getPlaceableByColor(FieldColor.START);
      if(placeable != undefined)
        this.settingsService.setSelectedPlaceable(placeable)
    }
  }

  onMouseUp(){
    if(this.prevPlaceable != null)
      this.settingsService.setSelectedPlaceable(this.prevPlaceable);
  }

}
