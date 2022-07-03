import { Component } from '@angular/core';
import { FieldsService } from '../fields.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent {  
  fields: string[][] = [];

  constructor(private settingsService: SettingsService, private fieldsService: FieldsService) {
    this.fields = fieldsService.getFields();
  }

  onFieldClick(event:any, x: number, y: number){
    if(event.which !== 1) return;
    const selectedOption = this.settingsService.getSelectedPlaceable();
    const type = selectedOption != null? selectedOption.type: '';
    if(type != undefined)
      this.fieldsService.setField(x, y, type);
  }

  

}
