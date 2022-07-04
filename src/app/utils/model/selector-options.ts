import { FieldColor } from "../constants/field-color";

export interface Option {
    value: string;
    viewValue: string;
  }
  
export class Block implements Option{
    value: string;
    viewValue: string;
    type: FieldColor;
    constructor(value: string, viewValue: string, type: FieldColor){
        this.value = value;
      this.viewValue = viewValue;
      this.type = type;
    }
}