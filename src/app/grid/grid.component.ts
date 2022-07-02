import { Component, OnInit} from '@angular/core';
import { Color, SettingsService } from '../settings.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {
  readonly WIDTH: number = 70;
  readonly HEIGHT: number = 20;
  fields: string[][] = [];

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.newBoard();
  }
  
  newBoard(){
    for(let i = 0; i < this.HEIGHT; i++){
      this.fields[i] = [];
      for(let j = 0; j < this.WIDTH; j++){
        this.fields[i][j] = Color.EMPTY;
      }
    }
  }

  onFieldClick(x: number, y: number){
    const selectedOption = this.settingsService.getSelectedPlaceable();
    const type = selectedOption != null? selectedOption.type: '';
    if(selectedOption?.value === 'start'){
      const start = this.findField(e => e == Color.START);
      if(start !== null) this.fields[start.x][start.y] = Color.EMPTY;
    }
    else if(selectedOption?.value === 'end'){
      const start = this.findField(e => e == Color.END);
      if(start !== null) this.fields[start.x][start.y] = Color.EMPTY;
    }
    this.fields[x][y] = type != undefined? type: this.fields[x][y];
  }

  private findField(condition: (field: string) => boolean){
    for(let i = 0; i < this.HEIGHT; i++){
      for(let j = 0; j < this.WIDTH; j++){
        if(condition(this.fields[i][j])) return {x: i, y: j};
      }
    }
    return null;
  }

}
