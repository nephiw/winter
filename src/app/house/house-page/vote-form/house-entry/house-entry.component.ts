import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectableEntry } from '@common/models';

@Component({
  selector: 'bc-house-entry',
  templateUrl: './house-entry.component.html',
  styleUrls: ['./house-entry.component.less']
})
export class HouseEntryComponent {
  @Input() public house: SelectableEntry;
  @Input() public idx: number;
  // tslint:disable-next-line: no-output-native
  @Output() select: EventEmitter<SelectableEntry> = new EventEmitter();
}
