import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectableEntry } from 'common';

@Component({
  selector: 'bc-house-entry',
  templateUrl: './house-entry.component.html',
  styleUrls: ['./house-entry.component.less']
})
export class HouseEntryComponent {
  @Input() house: SelectableEntry;
  @Output() select: EventEmitter<SelectableEntry> = new EventEmitter();

  public hideMe(event): void {
    event.target.setAttribute('hidden', 'hidden');
  }
}
