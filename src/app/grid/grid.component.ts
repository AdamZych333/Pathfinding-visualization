import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {
  readonly WIDTH: number = 70;
  readonly HEIGHT: number = 20;
  fields: any[][] = [];

  constructor() {}

  ngOnInit(): void {
    this.newBoard();
  }
  
  newBoard(){
    this.fields = Array(this.HEIGHT).fill(Array(this.WIDTH).fill(null));
  }
}
