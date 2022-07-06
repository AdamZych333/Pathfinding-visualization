import { Component, Input } from '@angular/core';
import { FieldsService } from '../fields.service';
import { SettingsService } from '../settings.service';
import { Field } from '../utils/model/field';
import { FieldColor } from '../utils/constants/field-color';
import { BlockService } from '../block.service';
import { AlgorithmsService } from '../algorithms.service';
import { normal } from '../utils/animations/field-animation';
import { immidiate } from '../utils/animations/field-immidiate-animation';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass'],
  animations: [
    normal,
    immidiate
  ]
})
export class FieldComponent{
  @Input() field: Field | null = null;
  hoverColor: string = '';

  constructor(private algorithmService: AlgorithmsService, private settingsService: SettingsService, private fieldsService: FieldsService, private blockService: BlockService) {}

  changeOutline(){
    const type: string | undefined = this.settingsService.getSelectedPlaceable()?.type;
    this.hoverColor = type != undefined? type: '';
  }

  resetOutline(){
    this.hoverColor = '';
  }

  getNormalTrigger(){
    // console.log("1: "+this.algorithmService.finnished)
    if(this.algorithmService.finnished || this.field == null) return ''
    return this.blockService.getBlockByColor(this.field.getColor());
  }

  getImmidiateTrigger(){
    // console.log("2: "+this.algorithmService.finnished)
    if(!this.algorithmService.finnished || this.field == null) return ''
    return this.blockService.getBlockByColor(this.field.getColor());
  }

  onMouseEnter(event:any){
    if(this.algorithmService.running || this.field == null || this.field.getColor() == FieldColor.START || this.field.getColor() == FieldColor.END || event.which !== 1) return;
    const selectedOption = this.settingsService.getSelectedPlaceable();
    const color = selectedOption != null? selectedOption.type: '';
    if(color == '') return;
    
    if(color === FieldColor.START || color == FieldColor.END){
      const field = this.fieldsService.findField(e => e.getColor() == color);
      if(field !== null && this.field.getColor() != FieldColor.WALL) {
        field.setColor(FieldColor.EMPTY);
        this.field.setColor(color);
      }
    }else{
      this.field.setColor(color);
    }
    if(this.algorithmService.finnished)
      this.algorithmService.startAlgorithm(this.settingsService.getSelectedAlgorithm().value);
  }

  onMouseDown(event:any){
    if(this.algorithmService.running || this.field == null) return;
    this.onMouseEnter(event);
    const color = this.field.getColor();
    if(color === FieldColor.END || color === FieldColor.START){
      const placeable = this.blockService.getBlockByColor(color);
      if(placeable != undefined)
        this.settingsService.setSelectedPlaceable(placeable)
    }
  }

  onMouseUp(){
    if(this.algorithmService.running || this.field == null) return;
    const color = this.field.getColor();
    if(color === FieldColor.END || color === FieldColor.START)
      this.settingsService.rollBackSelectedPlaceable();
  }
}
