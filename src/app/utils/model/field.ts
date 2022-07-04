import { FieldColor } from "../constants/field-color";

export class Field{
    private color: FieldColor = FieldColor.EMPTY;
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    setColor(color: FieldColor){
        this.color = color;
    }

    getColor(){
        return this.color;
    }
}