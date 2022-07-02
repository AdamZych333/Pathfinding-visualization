import { Component } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass']
})
export class FieldComponent {
  hoverColor: string = '';

  constructor(private settingsService: SettingsService){}

  changeOutline(){
    const color: string | undefined = this.settingsService.getSelectedPlaceable()?.color;
    this.hoverColor = color != undefined? color: '';
  }

  resetOutline(){
    this.hoverColor = '';
  }
}
