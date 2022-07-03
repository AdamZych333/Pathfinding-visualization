export interface Option {
    value: string;
    viewValue: string;
  }
  
export class Placeable implements Option{
    value: string;
    viewValue: string;
    type: string;
    constructor(value: string, viewValue: string, type: string){
        this.value = value;
      this.viewValue = viewValue;
      this.type = type;
    }
}