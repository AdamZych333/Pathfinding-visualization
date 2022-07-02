import { Component } from '@angular/core';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent {
  placeables: Option[] = [
    {value: 'wall', viewValue: 'Wall'},
    {value: 'empty', viewValue: 'Empty'},
    {value: 'start', viewValue: 'Start'},
    {value: 'end', viewValue: 'End'},
  ]
  selectedOption: Option = this.placeables[0];
}
