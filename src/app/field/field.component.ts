import { Component, Input } from '@angular/core';
import { SettingsService } from '../settings.service';
import { FieldColor } from '../utils/field-color';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})
export class FieldComponent {
  @Input() bgColor: string = FieldColor.EMPTY;
  hoverColor: string = '';

  constructor(private settingsService: SettingsService){}

  changeOutline(){
    const type: string | undefined = this.settingsService.getSelectedPlaceable()?.type;
    this.hoverColor = type != undefined? type: '';
  }

  resetOutline(){
    this.hoverColor = '';
  }
}
