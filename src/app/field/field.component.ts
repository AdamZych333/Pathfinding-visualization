import { Component, Input } from '@angular/core';
import { Color, SettingsService } from '../settings.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})
export class FieldComponent {
  @Input() bgColor: string = Color.EMPTY;
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
