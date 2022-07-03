import { Component, Input, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { SettingsService } from '../settings.service';
import { Field } from '../utils/field';
import { FieldColor } from '../utils/field-color';
import { Placeable } from '../utils/selector-options';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})
export class FieldComponent implements OnInit{
  @Input() field: Field | null = null;
  hoverColor: string = '';

  constructor(private settingsService: SettingsService, private fieldsService: FieldsService) {}

  ngOnInit(): void {
  }

  changeOutline(){
    const type: string | undefined = this.settingsService.getSelectedPlaceable()?.type;
    this.hoverColor = type != undefined? type: '';
  }

  resetOutline(){
    this.hoverColor = '';
  }

  onMouseEnter(event:any){
    if(this.field == null || this.field.getColor() == FieldColor.START || this.field.getColor() == FieldColor.END || event.which !== 1) return;
    const selectedOption = this.settingsService.getSelectedPlaceable();
    const color = selectedOption != null? selectedOption.type: '';
    if(color == '') return;
    
    if(color === FieldColor.START || color == FieldColor.END){
      const field = this.fieldsService.findField(e => e.getColor() == color);
      if(field !== null) field.setColor(FieldColor.EMPTY);
    }
    this.field.setColor(color);
    
  }

  onMouseDown(event:any){
    if(this.field == null) return;
    this.onMouseEnter(event);
    const color = this.field.getColor();
    if(color === FieldColor.END || color === FieldColor.START){
      const placeable = this.settingsService.getPlaceableByColor(color);
      if(placeable != undefined)
        this.settingsService.setSelectedPlaceable(placeable)
    }
  }

  onMouseUp(){
    if(this.field == null) return;
    const color = this.field.getColor();
    if(color === FieldColor.END || color === FieldColor.START)
      this.settingsService.rollBackSelectedPlaceable();
  }
}
