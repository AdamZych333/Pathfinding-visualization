import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})
export class GridComponent implements OnInit {
  @Input() width: Number = 10
  @Input() height: Number = 10

  constructor() { }

  ngOnInit(): void {
  }

}
