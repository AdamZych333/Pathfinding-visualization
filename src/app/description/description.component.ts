import { Component } from '@angular/core';
import { BlockService } from '../block.service';
import { Block } from '../utils/model/selector-options';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.sass']
})
export class DescriptionComponent {
  blocks: Block[];

  constructor(blockService: BlockService) {
    this.blocks = blockService.blocks;
    console.log(this.blocks);
   }

}
