import { Component, Input } from '@angular/core';
import { FieldsService } from '../fields.service';
import { SettingsService } from '../settings.service';
import { Field } from '../utils/model/field';
import { FieldColor } from '../utils/constants/field-color';
import { BlockService } from '../block.service';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';
import { RepainterService } from '../repainter.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass'],
  animations: [
    trigger('color', [
      state('empty', style({
        backgroundColor: FieldColor.EMPTY
      })),
      state('wall', style({
        backgroundColor: FieldColor.WALL
      })),
      state('start', style({
        backgroundColor: FieldColor.START
      })),
      state('end', style({
        backgroundColor: FieldColor.END
      })),
      state('open', style({
        backgroundColor: FieldColor.OPEN
      })),
      state('closed', style({
        backgroundColor: FieldColor.CLOSED
      })),
      state('path', style({
        backgroundColor: FieldColor.PATH
      })),
      transition('* => empty', [
        sequence([
          style({
            borderRadius: "50%"
          }),
          animate('0s', style({
            borderRadius: "0%"
          }))
        ])
      ]),
      transition('* => wall', [
        sequence([
          style({
            backgroundColor: FieldColor.WALL,
            opacity: 0.1,
          }),
          animate('0.2s', style({
            opacity: 1,
          }))
        ])
      ]),
      transition('* => start', [
        sequence([
          style({
            backgroundColor: FieldColor.START,
            opacity: 0.1,
          }),
          animate('0.2s', style({
            opacity: 1,
          }))
        ])
      ]),
      transition('* => end', [
        sequence([
          style({
            backgroundColor: FieldColor.END,
            opacity: 0.1,
          }),
          animate('0.2s', style({
            opacity: 1,
          }))
        ])
      ]),
      transition('* => open', [
        sequence([
          style({
            backgroundColor: FieldColor.OPEN,
            opacity: 0.1,
          }),
          animate('0.5s', style({
            opacity: 1,
          }))
        ])
      ]),
      transition('open => closed', [
        sequence([
          style({
            backgroundColor: FieldColor.OPEN,
          }),
          animate('0.5s', style({
            backgroundColor: FieldColor.CLOSED,
          }))
        ])
      ]),
      transition('* => path', [
        sequence([
          style({
            backgroundColor: FieldColor.PATH,
            opacity: 0.1,
          }),
          animate('0.2s', style({
            opacity: 1,
          }))
        ])
      ]),
    ])
  ]
})
export class FieldComponent{
  @Input() field: Field | null = null;
  hoverColor: string = '';
  constructor(private repainter: RepainterService, private settingsService: SettingsService, private fieldsService: FieldsService, private blockService: BlockService) {}

  changeOutline(){
    const type: string | undefined = this.settingsService.getSelectedPlaceable()?.type;
    this.hoverColor = type != undefined? type: '';
  }

  resetOutline(){
    this.hoverColor = '';
  }

  getTrigger(){
    if(this.field == null) return ''
      
    return this.blockService.getBlockByColor(this.field.getColor());
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
      const placeable = this.blockService.getBlockByColor(color);
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
