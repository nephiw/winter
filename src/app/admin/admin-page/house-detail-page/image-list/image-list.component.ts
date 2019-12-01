import { Component, Output, EventEmitter, Input } from '@angular/core';
import { HouseEntry } from '@app/common/models';

@Component({
  selector: 'bc-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.less']
})
export class ImageListComponent {
  @Output() public deletePath: EventEmitter<string> = new EventEmitter();
  @Input() public house: HouseEntry;
}
