import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HouseEntry } from 'common/models/house-entry';

@Component({
  selector: 'bc-house-entry',
  templateUrl: './house-entry.component.html',
  styleUrls: ['./house-entry.component.less']
})
export class HouseEntryComponent {
  @Input() house: HouseEntry;
  @Output() select: EventEmitter<HouseEntry> = new EventEmitter();

  public hideMe(event): void {
    event.target.setAttribute('hidden', 'hidden');
  }
}
