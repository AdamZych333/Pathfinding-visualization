import { FieldColor } from "../constants/field-color";

export class Field{
    private color: FieldColor = FieldColor.EMPTY;
    x: number;
    y: number;
    gCost: number = Number.MAX_SAFE_INTEGER;
    hCost: number = Number.MAX_SAFE_INTEGER;
    parent: Field | null = null;

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

    getFCost(){
        return this.gCost + this.hCost;
    }

    getDistance(fieldB: Field){
        return Math.abs(this.x - fieldB.x) + Math.abs(this.y - fieldB.y);
    }

    isWalkable(){
        return this.color !== FieldColor.WALL;
    }
}