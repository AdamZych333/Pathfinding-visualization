import { Component } from '@angular/core';
import { FieldsService } from '../fields.service';
import { Field } from '../utils/model/field';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent {  
  fields: Field[][] = [];

  constructor(fieldsService: FieldsService) {
    this.fields = fieldsService.getFields();
  }
  
}
